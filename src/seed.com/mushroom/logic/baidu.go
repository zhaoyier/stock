//Package logic 采集百度股市通数据
package logic

import (
	"fmt"
	"runtime"
	"sync"

	"encoding/json"
	"io/ioutil"
	"net/http"
	"time"
	"math"

	"github.com/PuerkitoBio/goquery"
	"seed.com/common/log"
	cutils "seed.com/common/utils"
	"seed.com/mushroom/dao"
	"seed.com/proto/stock"
	"seed.com/utils"
)

const Origin = "baidu"

//BaiduData 构造百度数据结构
type BaiduData struct {
	//页数
	offset int
	//大小
	size int
	//总数
	total int
	//基本信息URL
	basicURL string
	//资金信息URL
	fundURL string
}

//NewBaiduData 新建百度数据类
func NewBaiduData() *BaiduData {
	return &BaiduData{
		offset: 0,
		size:   runtime.NumCPU(),
	}
}

//Start 开始采集百度数据
func (bd *BaiduData) Start() {
	bd.GetStockCode()
}

//GetStockCode 查询股票代码数据
func (bd *BaiduData) GetStockCode() error {
	//初始化翻页总数
	bd.total, _ = dao.GetCodeTotal()
	for bd.offset < bd.total {
		bd.offset += bd.size
		// 翻页查询数据
		codeList, err := dao.GetCodeByOffset(bd.offset, bd.size)
		if err != nil {
			fmt.Println("[GetStockCode] failed:", err)
			continue
		}
		wg := &sync.WaitGroup{}
		// 根据查询数据抓取网页数据
		for i := 0; i < len(codeList); i++ {
			wg.Add(1)
			go bd.GetBaiDuStockData(codeList[i], wg)
		}
		wg.Wait()
	}
	return nil
}

//GetBaiduStockData 查询百度基本数据
func (bd *BaiduData) GetBaiDuStockData(data *stock.CodeByOffsetData, wg *sync.WaitGroup) {
	baiDuBasicData(data.GetId(), data.GetExchange())
	// baiDuFunds(data.GetId(), data.GetExchange())
	if wg != nil {
		wg.Done()
	}
}

// 抓取基本信息
func baiDuBasicData(code, exc string) error {
	url := "https://gupiao.baidu.com/stock/" + exc + code + ".html"
	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Errorf("[_getWebPageDocument] 爬取网页失败: %v", err)
		return err
	}
	message := &stock.BasicData{}
	//计算日期
	message.Date = cutils.GetTodyDate()
	//解析基本信息
	doc.Find(".bets-content .line1 dl").Each(func(index int, s *goquery.Selection) {
		value := s.Find("dd").Text()
		switch index {
		case 0:
			message.Opening = utils.ParseFloat2Int32(value)
		case 1:
			message.Volume = getFormatAmount(value)
		case 2:
			message.Highest = utils.ParseFloat2Int32(value)
		case 4:
			message.Inside = getFormatAmount(value)
		case 5:
			message.Trading = getFormatAmount(value)
		case 6:
			message.Entrust = getFormatAmount(value)
		case 7:
			message.Circulated = getFormatAmount(value)
		case 8:
			message.PeRatio = utils.ParseFloat2Int32(value)
		case 9:
			message.Income = utils.ParseFloat2Int32(value)
		case 10:
			message.Equity = getFormatAmount(value)
		}
	})
	doc.Find(".bets-content .line2 dl").Each(func(i int, s *goquery.Selection) {
		value := s.Find("dd").Text()
		switch i {
		case 0:
			message.Closing = utils.ParseFloat2Int32(value)
		case 1:
			message.Turnover = getFormatAmount(value)
		case 2:
			message.Lowest = utils.ParseFloat2Int32(value)
		case 4:
			message.Outside = getFormatAmount(value)
		case 5:
			message.Amplitude = getFormatAmount(value)
		case 6:
			message.AmountRatio = utils.ParseFloat2Int32(value)
		case 7:
			message.Total = getFormatAmount(value)
		case 8:
			message.PbRatio = utils.ParseFloat2Int32(value)
		case 9:
			message.Per = utils.ParseFloat2Int32(value)
		case 10:
			message.Flow = getFormatAmount(value)
		}
	})
	if err := dao.SaveBasic(code, exc, Origin, message); err != nil {
		log.Errorf("[baiDuBasicData] 记录数据失败:%s", err.Error())
		return err
	}

	baiDuFunds(code, exc, message)

	return nil
}

func baiDuFunds(code, exc string, basic *stock.BasicData) error {
	url := "https://gupiao.baidu.com/api/stocks/stockfunds?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code="
	url += exc + code + "&timestamp=" + utils.FormatInt64(time.Now().Unix()*1000)
	if response, err := http.Get(url); err != nil {
		log.Errorf("[baiDuFunds] 查询JSON数据失败: %s", err.Error())
		return err
	} else if body, err := ioutil.ReadAll(response.Body); err != nil {
		log.Errorf("[baiDuFunds] 读取JSON数据失败: %s", err.Error())
		return err
	} else {
		funds := &stock.Funds{}
		json.Unmarshal(body, &funds)
		if funds.GetErrorNo() != 0 {
			log.Errorf("[baiDuFunds] 返回数据错误: %s", funds.GetErrorMsg())
			_, err := fmt.Printf("Code: %s|Exchange: %s 解析失败!", code, exc)
			return err
		}
		// 计算净值
		funds.FundsData.MainNet = funds.GetFundsData().GetMainInflow() - funds.GetFundsData().GetMainOutflow()
		funds.FundsData.RetailNet = funds.GetFundsData().GetRetailInflow() - funds.GetFundsData().GetRetailOutflow()
		funds.FundsData.MainPCT = int32((funds.GetFundsData().GetMainNet() / float64(basic.GetTotal())) * 100)
		funds.FundsData.RetailPCT = int32((funds.GetFundsData().GetRetailNet() / float64(basic.GetTotal())) * 100)
		funds.FundsData.Outflow = funds.FundsData.MainNet + funds.FundsData.RetailNet;
		if math.Abs(float64(funds.FundsData.MainPCT)) > 100 {
			funds.FundsData.MainPCT = 0
		}

		if math.Abs(float64(funds.FundsData.RetailPCT)) > 100 {
			funds.FundsData.RetailPCT = 0
		}

		if err := dao.SaveFundsData(code, exc, Origin, funds.GetFundsData()); err != nil {
			log.Errorf("[baiDuFunds] 记录数据失败:%s", err.Error())
			return err
		}
	}
	return nil
}

func getFormatAmount(str string) int64 {
	bs := []byte(str)
	valueList := make([]byte, 0, 0)
	for _, v := range bs {
		switch v {
		case 46:
			valueList = append(valueList, v)
			break
		case 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57:
			valueList = append(valueList, v)
			break
		default:
		}
	}
	amount := utils.ParseI64(str[0:len(valueList)])
	unit := str[len(valueList):]
	if unit == "亿" {
		return amount * 100000000
	} else if unit == "万" {
		return amount * 10000
	} else if unit == "万手" {
		return amount * 10000
	} else if unit == "亿手" {
		return amount * 100000000
	} else if unit == "手" {
		return amount
	} else if unit == "%" {
		return amount
	} else {
		return 0
	}
	fmt.Println("====>>001:", string(valueList), unit)
	log.Warnf("[getFormatAmount] 单位异常: %s|%d", unit, amount)
	return amount
}