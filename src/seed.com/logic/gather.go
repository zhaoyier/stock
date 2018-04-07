package logic

import (
	"encoding/json"
	"fmt"
	"strings"
	"sync"
	"time"

	defStock "seed.com/common/defs/stock"
	"seed.com/dao"
	"seed.com/proto/stock"
	pbStock "seed.com/proto/stock"
	"seed.com/utils"
)

var codeList []*stock.CodeData

func init() {
	codeList = make([]*stock.CodeData, 0, 0)
}

//CollectCode 采集代码信息
type CollectCode struct {
	concurrentCode  bool //防止别人封锁地址
	concurrentBlock bool //防止别人封锁地址
}

//NewCode 初始化采集信息
func NewCode() *CollectCode {
	return &CollectCode{
		concurrentCode:  true,
		concurrentBlock: true,
	}
}

//StartCollectCode 开始采集代码信息
func (cc *CollectCode) StartCollectCode() {
	start := time.Now().Unix()
	wg := &sync.WaitGroup{}
	wg.Add(1)
	if cc.concurrentBlock {
		go cc._sha(wg)
		// go cc._sza(wg)
		// go cc._zxb(wg)
		// go cc._cyb(wg)
	} else {
		cc._sha(wg)
		// cc._sza(wg)
		// cc._zxb(wg)
		// cc._cyb(wg)
	}
	wg.Wait()
	wgs := &sync.WaitGroup{}
	fmt.Println("====>>002:", len(codeList), time.Now().Unix()-start)
	// if len(codeList) > 400 {
	// 	codeList = codeList[0:400]
	// }

	//开始记录信息
	for _, code := range codeList {
		time.Sleep(time.Millisecond)
		dao.SaveCodeData(code, wgs)
	}
	//fmt.Println("====>>002:", len(codeList))
	wgs.Wait()
}

//_sha 采集代码信息
func (cc *CollectCode) _sha(wgb *sync.WaitGroup) {
	//wgb.Add(1)
	wgc := &sync.WaitGroup{}
	for i := defStock.SHAMin; i < defStock.SHAMax; i++ {
		wgc.Add(1)
		if !cc.concurrentCode {
			_crawlerCodeBasic(i, "sh", wgc)
		} else {
			go _crawlerCodeBasic(i, "sh", wgc)
		}
	}
	wgc.Wait()
	wgb.Done()
}

//_sza 采集代码信息
func (cc *CollectCode) _sza(wgb *sync.WaitGroup) {
	//wgb.Add(1)
	wgc := &sync.WaitGroup{}
	for i := defStock.SZAMin; i < defStock.SZAMax; i++ {
		wgc.Add(1)
		if !cc.concurrentCode {
			_crawlerCodeBasic(i, "sz", wgc)
		} else {
			go _crawlerCodeBasic(i, "sz", wgc)
		}
	}
	wgc.Wait()
	wgb.Done()
}

//_zxb 采集代码信息
func (cc *CollectCode) _zxb(wgb *sync.WaitGroup) {
	wgc := &sync.WaitGroup{}
	for i := defStock.SZZMin; i < defStock.SZZMax; i++ {
		wgc.Add(1)
		if !cc.concurrentCode {
			_crawlerCodeBasic(i, "sz", wgc)
		} else {
			go _crawlerCodeBasic(i, "sz", wgc)
		}
	}
	wgc.Wait()
	wgb.Done()
}

//_cyb 采集代码信息
func (cc *CollectCode) _cyb(wgb *sync.WaitGroup) {
	wgc := &sync.WaitGroup{}
	for i := defStock.SZCMin; i < defStock.SZCMax; i++ {
		wgc.Add(1)
		if !cc.concurrentCode {
			_crawlerCodeBasic(i, "sz", wgc)
		} else {
			go _crawlerCodeBasic(i, "sz", wgc)
		}
	}
	wgc.Wait()
	wgb.Done()
}

//_crawlerCodeBasic 爬取代码基本信息
func _crawlerCodeBasic(code int, block string, wg *sync.WaitGroup) {
	link := "http://hq.sinajs.cn/list=" + block
	body := utils.HTTPGet(link+utils.FormatStockCode(code), "GBK")
	if data := _analyseCodeData(body); data != nil {
		//fmt.Println("===>>>result:", data.String())
		codeList = append(codeList, data)
	}
	wg.Done()
}

func _analyseCodeData(body []byte) *stock.CodeData {
	infoList := strings.Split(string(body), "=")
	//fmt.Println("===>>>result:", infoList)
	if len(infoList) < 2 || len(infoList[1]) <= 10 {
		return nil
	}

	code := &stock.CodeData{
		CreateTime: time.Now().Unix(),
	}
	fmt.Println("===>>>result:", infoList)
	code.Name = strings.Split(infoList[1], ",")[0][1:]
	codeStr := strings.Split(infoList[0], "_")
	code.Exchange, code.Id = codeStr[len(codeStr)-1][:2], codeStr[len(codeStr)-1][2:]
	return code
}

//EastMoneyData 东方财富抓取基本数据
func EastMoneyData() {
	link := "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=XGSG_LB&token=70f12f2f4f091e459a279469fe49eca5&st=cbxjrgbs,securitycode&sr=-1&p=100&ps=50"
	//查询数据
	body := utils.HTTPGet(link, "utf8")
	//判断页数
	fmt.Println("====>>>0001:", string(body))
	//字符串转结构数据
	_parseEaseMoneyResponse(body)
}

//_parseEaseMoneyResponse 解析返回数据
func _parseEaseMoneyResponse(data []byte) {
	var _codeList []map[string]interface{}
	if err := json.Unmarshal(data, &_codeList); err == nil {
		for _, _code := range _codeList {
			_mapToStruct(_code)
		}
	} else {
		fmt.Println("==>>t1 err:", err)
	}
}

//_mapToStruct 映射数据
func _mapToStruct(data map[string]interface{}) {
	var _code pbStock.EastmoneyCode
	if body, err := json.Marshal(data); err != nil {
		fmt.Println("====>>>201:", err)
		return
	} else if strings.Contains(string(body), "未上市") { //判断是否未上市
		return
	} else { //解析代码基本信息
		if err := json.Unmarshal(body, &_code); err != nil {
			fmt.Println("====>>>202:", err)
			return
		}
		fmt.Println("====>>>203:", _code)
	}
}
