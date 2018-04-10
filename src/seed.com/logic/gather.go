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

//_parseEaseMoneyResponse 解析返回数据
func _parseEaseMoneyResponse(data []byte) []*pbStock.EastMoneyData {
	var _codeList []map[string]interface{}
	_codeDataList := make([]*pbStock.EastMoneyData, 0, 0)
	if err := json.Unmarshal(data, &_codeList); err == nil {
		for _, _code := range _codeList {
			if code := _mapToStruct(_code); code != nil {
				_codeDataList = append(_codeDataList, code)
			}
		}
	} else {
		fmt.Println("==>>t1 err:", err)
	}

	return _codeDataList
}

//_mapToStruct 映射数据
func _mapToStruct(data map[string]interface{}) *pbStock.EastMoneyData {
	//fmt.Println("====>>>200:", data)
	_code := &pbStock.EastMoneyData{}
	body, err := json.Marshal(data)
	if err != nil {
		fmt.Println("====>>>201:", err)
		return nil
	}
	//fmt.Println("====>>>202:", string(body))
	if strings.Contains(string(body), "待上市") { //判断是否未上市
		return nil
	}
	if strings.Contains(string(body), "未开板") { //判断是否未上市
		return nil
	}

	if strings.Contains(string(body), "\"INDUSTRYPE\":\"-\"") {
		body = []byte(strings.Replace(string(body), "\"INDUSTRYPE\":\"-\"", "\"INDUSTRYPE\":-1", 1))
	}

	if strings.Contains(string(body), "\"Close\":\"-\"") {
		body = []byte(strings.Replace(string(body), "\"Close\":\"-\"", "\"Close\":-1", 1))
	}

	if strings.Contains(string(body), "\"mzyqgs\":\"-\"") {
		body = []byte(strings.Replace(string(body), "\"mzyqgs\":\"-\"", "\"mzyqgs\":-1", 1))
	}

	if strings.Contains(string(body), "\"kb\":\"-\"") {
		return nil
	}

	//解析代码基本信息
	if err := json.Unmarshal(body, _code); err != nil {
		fmt.Println("====>>>208:", err, string(body))
		return nil
	}
	return _code
}
