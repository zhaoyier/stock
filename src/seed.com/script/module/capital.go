package module

import (
	"bytes"
	"fmt"
	"seed.com/common/db/mysql"
	"seed.com/common/utils"
)

var (
	total = 1
	offset = 0
)
const (
	selectCount = "select count(1) as count from funds"
	selectFundsByOffset = "select fs.id, bc.total, fs.mainInflow, fs.mainOutflow, fs.retailInflow, fs.retailOutflow from basic as bc, funds as fs where bc.id=fs.id limit ?, 10"
	updateFundsByID = "update funds set mainNet=?, mainPCT=?, retailNet=?, retailPCT=? where id=?"
)

func _init(sql string) (*mysql.DBHandler, bytes.Buffer) {
	db := mysql.NewDBHandler()
	var buff bytes.Buffer
	buff.WriteString(sql)
	return db, buff
}

// 查询总条数
func GetTotalRecord()  {
	db, sql := _init(selectCount)
	res, err := db.Query(sql.String())
	if err != nil {
		fmt.Println("[GetCodeTotal] ")
		return
	}
	total = utils.Atoi(res[0]["count"])
}

// 计算主力和散户流入流出的净值
func CalNetvalue()  {
	db, sql := _init(selectFundsByOffset)
	args := []interface{}{offset}
	res, err := db.Query(sql.String(), args...)

	for k, v := range res {
		fmt.Println("===>>001:", k, v["id"], err)
		mn := utils.ParseF64(v["mainInflow"]) - utils.ParseF64(v["mainOutflow"])
		rn := utils.ParseF64(v["retailInflow"]) - utils.ParseF64(v["retailOutflow"])
		var mp, rp int32 = 0, 0
		if v["total"] != "0" {
			mp = int32((int64(mn) / utils.ParseI64(v["total"])) * 10000)
		}
		if v["total"] != "0" {
			rp = int32((int64(mn) / utils.ParseI64(v["total"])) * 10000)
		}

		UpdateFunds(utils.Atoi64(v["id"]), mn, rn, mp, rp)
	}
}

// 更新数据
func UpdateFunds(id int64, mn, rn float64, mp, rp int32) {
	db, sql := _init(updateFundsByID)
	args := []interface{}{mn, mp, rn, rp, id}
	res, err := db.Update(sql.String(), args...)
	fmt.Println("[UpdateFunds] result:", id, mn, rn, mp, rp, res, err)

}

