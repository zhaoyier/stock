package dao

import (
	"bytes"
	"time"

	"seed.com/common/db/mysql"
	"seed.com/common/log"
	"seed.com/common/utils"
	"seed.com/proto/stock"
)

const (
	basicTblName   = "`basic`"
	fundsTblName   = "`funds`"
	basicFields    = "code, exchange, date, origin, opening, closing, volume, highest, lowest, inside, outside, turnover, trading, amplitude, entrust, amountRatio, circulated, total, peRatio, pbRatio, income, per, equity, flow, createTime"
	fundsFields    = "code, exchange, date, origin, mainInflow, retailInflow, mainNet, mainPCT, mainOutflow, retailOutflow, retailNet, retailPCT, outflow, createTime"
	insertBasicSQL = "INSERT INTO " + basicTblName + " (" + basicFields + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?))"
	insertFundsSQL = "INSERT INTO " + fundsTblName + " (" + fundsFields + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?))"
)

func _init(sql string) (*mysql.DBHandler, bytes.Buffer) {
	db := mysql.NewDBHandler()
	var buff bytes.Buffer
	buff.WriteString(sql)
	return db, buff
}

//SaveBasic 记录基本数据
func SaveBasic(code, exc, origin string, data *stock.BasicData) error {
	db, sql := _init(insertBasicSQL)
	args := []interface{}{code, exc, utils.GetTodyDate(), origin, data.GetOpening(), data.GetClosing(), data.GetVolume(), data.GetHighest(),
		data.GetLowest(), data.GetInside(), data.GetOutside(), data.GetTurnover(), data.GetTrading(), data.GetAmplitude(),
		data.GetEntrust(), data.GetAmountRatio(), data.GetCirculated(), data.GetTotal(), data.GetPeRatio(), data.GetPbRatio(),
		data.GetIncome(), data.GetPer(), data.GetEquity(), data.GetFlow(), time.Now().Unix()}
	if _, err := db.Insert(sql.String(), args...); err != nil {
		log.Errorf("[SaveBasic] 记录数据失败: %s", err.Error())
		return err
	}
	return nil
}

//SaveFundsData 记录资金数据
func SaveFundsData(code, exc, origin string, data *stock.FundsData) error {
	db, sql := _init(insertFundsSQL)
	// fmt.Println("===>>>>data:", data, data.GetRetailInflow())
	args := []interface{}{code, exc, utils.GetTodyDate(), origin, data.GetMainInflow(), data.GetRetailInflow(), data.GetMainNet(), data.GetMainPCT(), data.GetMainOutflow(), data.GetRetailOutflow(), data.GetRetailNet(), data.GetRetailPCT(), data.GetOutflow(), time.Now().Unix()}
	if _, err := db.Insert(sql.String(), args...); err != nil {
		log.Errorf("[SaveFundsData] 记录数据失败: %s", err.Error())
		return err
	}
	return nil
}
