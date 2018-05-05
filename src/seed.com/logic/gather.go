//Package logic 采集百度股市通数据
package logic

import (
	"fmt"
	"runtime"
	"sync"

	"seed.com/dao"
	"seed.com/proto/stock"
)

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
	// bd.GetBaiduStockData(&stock.CodeByOffsetData{
	// 	Id:       "002339",
	// 	Exchange: "sz",
	// }, nil)
}

//GetStockCode 查询股票代码数据
func (bd *BaiduData) GetStockCode() error {
	//初始化翻页总数
	bd.total, _ = dao.GetCodeTotal()
	for bd.offset < bd.total {
		bd.offset += bd.size
		fmt.Println("=====>>offset:", bd.offset)
		// 翻页查询数据
		codeList, err := dao.GetCodeByOffset(bd.offset, bd.size)
		if err != nil {

		}
		wg := &sync.WaitGroup{}
		// 根据查询数据抓取网页数据
		for i := 0; i < len(codeList); i++ {
			wg.Add(1)
			go bd.GetBaiduStockData(codeList[i], wg)
		}
		wg.Wait()
	}
	return nil
}

//GetBaiduStockData 查询百度基本数据
func (bd *BaiduData) GetBaiduStockData(data *stock.CodeByOffsetData, wg *sync.WaitGroup) {
	_crawlBasicMessage(data.GetId(), data.GetExchange())
	_getHTTPJSON(data.GetId(), data.GetExchange())
	if wg != nil {
		wg.Done()
	}
}

//GetBaiduFundData 查询百度资金信息
func (bd *BaiduData) GetBaiduFundData() error {
	return nil
}
