package dao

import (
	"seed.com/common/log"
	"seed.com/proto/stock"
)

const (
	codeTblName   = "`code`"
	codeFields    = "id, name, exchange, createTime"
	insertCodeSQL = "INSERT INTO " + codeTblName + " (" + codeFields + ") VALUES(?, ?, ?, FROM_UNIXTIME(?))"
)

//SaveCodeData 记录代码数据
func SaveCodeData(dataList []*stock.CodeData) error {
	db, sql := _init(insertCodeSQL)
	for _, data := range dataList {
		args := []interface{}{data.GetId(), data.GetName(), data.GetExchange(), data.GetCreateTime()}
		if _, err := db.Insert(sql.String(), args...); err != nil {
			log.Errorf("[SaveFundsData] 记录数据失败: %s", err.Error())
		}
	}

	return nil
}
