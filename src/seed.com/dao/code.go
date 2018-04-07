package dao

import (
	"sync"

	"seed.com/proto/stock"
)

const (
	codeTblName   = "`code`"
	codeFields    = "id, name, exchange, createTime"
	insertCodeSQL = "INSERT INTO " + codeTblName + " (" + codeFields + ") VALUES(?, ?, ?, FROM_UNIXTIME(?))"
)

//SaveCodeData 记录代码数据
func SaveCodeData(data *stock.CodeData, wg *sync.WaitGroup) error {
	wg.Add(1)
	db, sql := _init(insertCodeSQL)
	args := []interface{}{data.GetId(), data.GetName(), data.GetExchange(), data.GetCreateTime()}
	if _, err := db.Insert(sql.String(), args...); err != nil {
		//log.Errorf("[SaveFundsData] 记录数据失败: %s", err.Error())
	}
	wg.Done()
	return nil
}
