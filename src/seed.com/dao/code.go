package dao

import (
	"fmt"
	"sync"

	"seed.com/proto/stock"
)

const (
	codeTblName = "`code`"
	codeFields  = "id, exchange, name, fxzl, wsfxsl, issue, purchase, peissuea, industry, " +
		"mainbusin, zzf, security, listing, industrype, closing, mzyqhl, sl, createTime, updateTime"
	insertCodeSQL = "INSERT INTO " + codeTblName + " (" + codeFields + ") VALUES(?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?), ?, ?, ?, ?, ?, FROM_UNIXTIME(?), ?, ?, ?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?))"
	selectCount   = "select count(*) from code"
)

//SaveCodeData 记录代码数据
func SaveCodeData(data *stock.CodeData, wg *sync.WaitGroup) error {
	wg.Add(1)
	db, sql := _init(insertCodeSQL)
	args := []interface{}{data.GetId(), data.GetExchange(), data.GetName(), data.GetFxzl(), data.GetWsfxsl(), data.GetIssue(),
		data.GetPurchase(), data.GetPeissuea(), data.GetIndustry(), data.GetMainbusin(), data.GetZzf(), data.GetSecurity(),
		data.GetListing(), data.GetIndustrype(), data.GetClosing(), data.GetMzyqhl(), data.GetSl(), data.GetCreateTime(),
		data.GetUpdateTime()}
	if _, err := db.Insert(sql.String(), args...); err != nil {
		fmt.Println("===>>001:", err, args)
		//log.Errorf("[SaveFundsData] 记录数据失败: %s", err.Error())
	}
	wg.Done()
	return nil
}

//GetCodeTotal 查询股票代码总数
func GetCodeTotal() {
	db, sql := _init(selectCount)
	res, err := db.Query(sql.String())
	if err != nil {
		fmt.Println("[GetCodeTotal] ")
	}
	fmt.Println("====>>002:", res)
}
