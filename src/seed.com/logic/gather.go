//Package logic 采集百度股市通数据
package logic

import (
	"runtime"

	"seed.com/dao"
)

//BaiduData 构造百度数据结构
type BaiduData struct {
	//页数
	page int32
	//大小
	size int32
	//总数
	total int32
	//基本信息URL
	basicURL string
	//资金信息URL
	fundURL string
}

//NewBaiduData 新建百度数据类
func NewBaiduData() *BaiduData {
	return &BaiduData{
		page: 1,
		size: int32(runtime.NumCPU()),
	}
}

//Start 开始采集百度数据
func (bd *BaiduData) Start() {
	bd.GetStockCode()
}

//GetStockCode 查询股票代码数据
func (bd *BaiduData) GetStockCode() error {
	//初始化翻页总数
	dao.GetCodeTotal()
	return nil
}

//GetBaiduBasicData 查询百度基本数据
func (bd *BaiduData) GetBaiduBasicData() error {
	return nil
}

//GetBaiduFundData 查询百度资金信息git
func (bd *BaiduData) GetBaiduFundData() error {
	return nil
}
