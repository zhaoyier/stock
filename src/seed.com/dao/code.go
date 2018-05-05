package dao

import (
	"fmt"
	"sync"

	"seed.com/proto/stock"
	"seed.com/utils"
)

const (
	codeTblName = "`code`"
	codeFields  = "id, exchange, name, fxzl, wsfxsl, issue, purchase, peissuea, industry, " +
		"mainbusin, zzf, security, listing, industrype, closing, mzyqhl, sl, createTime, updateTime"
	insertCodeSQL      = "INSERT INTO " + codeTblName + " (" + codeFields + ") VALUES(?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?), ?, ?, ?, ?, ?, FROM_UNIXTIME(?), ?, ?, ?, ?, FROM_UNIXTIME(?), FROM_UNIXTIME(?))"
	selectCount        = "select count(1) as count from code"
	selectCodeByOffset = "select id, name, exchange from code limit ?,?"
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
func GetCodeTotal() (int, error) {
	db, sql := _init(selectCount)
	res, err := db.Query(sql.String())
	if err != nil {
		fmt.Println("[GetCodeTotal] ")
		return 0, err
	}

	return utils.Atoi(res[0]["count"]), nil
}

//GetCodeByOffset 根据偏移量翻页查询数据
func GetCodeByOffset(offset, size int) ([]*stock.CodeByOffsetData, error) {
	db, sql := _init(selectCodeByOffset)
	args := []interface{}{offset, size}
	res, err := db.Query(sql.String(), args...)
	if err != nil {
		fmt.Println("[GetCodeByOffset] 数据库查询失败:", err)
		return nil, err
	}
	list := make([]*stock.CodeByOffsetData, 0, 0)
	for _, v := range res {

		data := &stock.CodeByOffsetData{
			Id:       v["id"],
			Name:     v["name"],
			Exchange: v["exchange"],
		}
		fmt.Println("====>>code:", data)
		list = append(list, data)
	}
	return list, nil
}
