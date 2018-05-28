package logic

import (
	"encoding/json"
	"fmt"
	"strings"
	"sync"
	"time"

	"seed.com/mushroom/dao"
	pbStock "seed.com/mushroom/proto/stock"
	"seed.com/utils"
)

var codeList []*pbStock.CodeData

func init() {
	codeList = make([]*pbStock.CodeData, 0, 0)
}

//EastMoney 东方财富网
type EastMoney struct {
	//页数
	page int32
	//大小
	size int32
	//结束
	finished bool
	//URL
	url string
}

//NewEast 新建东方财富
func NewEast() *EastMoney {
	return &EastMoney{
		page:     1,
		size:     50,
		finished: false,
		url:      "http://dcfm.eastmoney.com/em_mutisvcexpandinterface/api/js/get?type=XGSG_LB&token=70f12f2f4f091e459a279469fe49eca5&st=purchasedate,securitycode&sr=-1",
	}
}

//Start 开始采集
func (em *EastMoney) Start() {
	for !em.finished {
		em._eastCodeData(em.page, em.size)
	}
}

func (em *EastMoney) _eastCodeData(page, size int32) {
	url := em.url + "&p=" + utils.FormatInt32(page) + "&ps=" + utils.FormatInt32(size)
	//查询数据
	body := utils.HTTPGet(url, "utf8")
	if len(body) <= 2 || !strings.Contains(string(body), "[{") {
		em.finished = true
	}
	//fmt.Println("====>>101:", string(body))
	//分析数据
	list := _parseEaseMoneyResponse(body)
	//存储数据
	wg := &sync.WaitGroup{}
	for _, data := range list {
		code := &pbStock.CodeData{
			Id:         data.GetSecuritycode(),
			Exchange:   utils.CheckExchange(data.GetSecuritycode()),
			Name:       data.GetSecurityshortname(),
			Fxzl:       data.GetFxzl(),
			Wsfxsl:     data.GetWsfxsl(),
			Issue:      data.GetIssueprice(),
			Purchase:   utils.ParseDate(data.GetPurchasedate()), //TODO
			Peissuea:   data.GetPeissuea(),
			Industry:   data.GetINDUSTRY(),
			Mainbusin:  data.GetMAINBUSIN(),
			Zzf:        data.GetZzf(),
			Security:   data.GetSecuritycode(),
			Listing:    utils.ParseDate(data.GetListingdate()), //TODO
			Industrype: data.GetINDUSTRYPE(),
			Closing:    data.GetClose(),
			Mzyqhl:     data.GetMzyqhl(),
			Sl:         data.GetSl(),
			CreateTime: time.Now().Unix(),
			UpdateTime: time.Now().Unix(),
		}

		//fmt.Println("==>>001:", code.String(), data.GetFxzl(), data.GetWsfxsl())
		dao.SaveCodeData(code, wg)
	}
	wg.Wait()
	//更新页码信息
	em.page = em.page + 1
	// if em.page >= 2 {
	// 	em.finished = true
	// }
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
