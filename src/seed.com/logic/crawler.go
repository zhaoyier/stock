package logic

import (
	"encoding/json"
	"io/ioutil"
	"net/http"
	"strings"
	"sync"
	"time"

	"github.com/PuerkitoBio/goquery"
	"seed.com/common/log"
	"seed.com/dao"
	"seed.com/proto/stock"
	"seed.com/utils"
)

// 获取网页文档
func _getWebPageDocument(url string) (*goquery.Document, error) {
	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Errorf("[_getWebPageDocument] 爬取网页失败: %v", err)
		return nil, err
	}
	return doc, nil
}

// 抓取基本信息
func _crawlBasicMessage(code, exc string) {
	url := "https://gupiao.baidu.com/stock/" + exc + code + ".html"
	doc, err := goquery.NewDocument(url)
	if err != nil {
		log.Errorf("[_getWebPageDocument] 爬取网页失败: %v", err)
		return
	}

	message := &stock.BasicData{}
	//计算日期
	date := time.Now().Format("2006-01-02")
	message.Date = strings.Join(strings.Split(date, "-"), "")
	//解析基本信息
	doc.Find(".bets-content .line1 dl").Each(func(i int, s *goquery.Selection) {
		value := s.Find("dd").Text()
		switch i {
		case 0:
			message.Opening = utils.ParseFloat2Int32(value)
		case 1:
			message.Volume = _getFormatAmount(value)
		case 2:
			message.Highest = utils.ParseFloat2Int32(value)
		case 4:
			message.Inside = _getFormatAmount(value)
		case 5:
			message.Trading = _getFormatAmount(value)
		case 6:
			message.Entrust = _getFormatAmount(value)
		case 7:
			message.Circulated = _getFormatAmount(value)
		case 8:
			message.PeRatio = utils.ParseFloat2Int32(value)
		case 9:
			message.Income = utils.ParseFloat2Int32(value)
		case 10:
			message.Equity = _getFormatAmount(value)
		}
	})
	doc.Find(".bets-content .line2 dl").Each(func(i int, s *goquery.Selection) {
		value := s.Find("dd").Text()
		switch i {
		case 0:
			message.Closing = utils.ParseFloat2Int32(value)
		case 1:
			message.Turnover = _getFormatAmount(value)
		case 2:
			message.Lowest = utils.ParseFloat2Int32(value)
		case 4:
			message.Outside = _getFormatAmount(value)
		case 5:
			message.Amplitude = _getFormatAmount(value)
		case 6:
			message.AmountRatio = utils.ParseFloat2Int32(value)
		case 7:
			message.Total = _getFormatAmount(value)
		case 8:
			message.PbRatio = utils.ParseFloat2Int32(value)
		case 9:
			message.Per = utils.ParseFloat2Int32(value)
		case 10:
			message.Flow = _getFormatAmount(value)
		}
	})

	if err := dao.SaveBasic("600139", "sz", message); err != nil {
		log.Errorf("[_getHTTPJSON] 记录数据失败:%s", err.Error())
		return
	}

	return
}

func _getHTTPJSON(code, exchange string) {
	url := "https://gupiao.baidu.com/api/stocks/stockfunds?from=pc&os_ver=1&cuid=xxx&vv=100&format=json&stock_code="
	url += exchange + code + "&timestamp=" + utils.FormatInt64(time.Now().Unix()*1000)

	if response, err := http.Get(url); err != nil {
		log.Errorf("[_getHTTPJSON] 查询JSON数据失败: %s", err.Error())
		return
	} else if body, err := ioutil.ReadAll(response.Body); err != nil {
		log.Errorf("[_getHTTPJSON] 读取JSON数据失败: %s", err.Error())
		return
	} else {
		funds := &stock.Funds{}
		json.Unmarshal(body, &funds)
		if funds.GetErrorNo() != 0 {
			log.Errorf("[_getHTTPJSON] 返回数据错误: %s", funds.GetErrorMsg())
			return
		}
		if err := dao.SaveFundsData(code, funds.GetFundsData()); err != nil {
			log.Errorf("[_getHTTPJSON] 记录数据失败:%s", err.Error())
		}
	}
}

//AmountUnitSplit 价格和单位拆分
func _getFormatAmount(str string) int32 {
	bs := []byte(str)
	valueList := make([]byte, 0, 0)
	for _, v := range bs {
		switch v {
		case 46:
			valueList = append(valueList, v)
		case 45, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57:
			valueList = append(valueList, v)
		default:
		}
	}
	amount := utils.ParseFloat2Int32(str[0:len(valueList)])
	unit := str[len(valueList):]
	if unit == "亿" {
		return amount * 10000
	} else if unit == "万" {
		return amount
	} else if unit == "万手" {
		return amount
	} else if unit == "亿手" {
		return amount * 10000
	} else if unit == "%" {
		return amount
	}

	log.Warnf("[_getFormatAmount] 单位异常: %s", unit, unit == "%")
	return amount
}

func _traverseCode() {
	//查询代码
	//查询数据
	wg := sync.WaitGroup{}
	wg.Add(3)
	go func() {
		_crawlBasicMessage("002145", "sz")
		_getHTTPJSON("002145", "sz")
		wg.Done()
	}()
	go func() {
		wg.Done()
	}()
	go func() {
		wg.Done()
	}()
	wg.Wait()
}

//Start 开始测试
func Start() {
	_traverseCode()
}
