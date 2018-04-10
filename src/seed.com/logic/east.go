package logic

import (
	"strings"
	"sync"
	"time"

	"seed.com/dao"
	pbStock "seed.com/proto/stock"
	"seed.com/utils"
)

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
		em._crawlerCodeData(em.page, em.size)
	}
}

func (em *EastMoney) _crawlerCodeData(page, size int32) {
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
