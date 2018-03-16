package dao

import (
	"bytes"
	"time"

	"gopkg.in/mgo.v2/bson"
	"seed.com/common/db/mongo"
	"seed.com/common/db/mysql"
	defDB "seed.com/common/defs/db"
	"seed.com/common/log"
	"seed.com/proto/stock"
)

const (
	basicTblName   = "`basic`"
	fundsTblName   = "`funds`"
	basicFields    = "code, exchange, opening, closing, volume, highest, lowest, inside, outside, turnover, trading, amplitude, entrust, amountRatio, circulated, total, peRatio, pbRatio, income, per, equity, flow, createTime"
	fundsFields    = "code, mainInflow, retailInflow, mainOutflow, retailOutflow, createTime"
	insertBasicSQL = "INSERT INTO " + basicTblName + " (" + basicFields + ") VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, FROM_UNIXTIME(?))"
	insertFundsSQL = "INSERT INTO " + fundsTblName + " (" + fundsFields + ") VALUES(?, ?, ?, ?, ?, FROM_UNIXTIME(?))"
)

//UpdateFundsData 更新资金信息
func UpdateFundsData(code string, data *stock.DBFundsData) error {
	db := mongo.NewDBCollection(defDB.DBStock, defDB.TbStockFunds)
	//先查询，后更新
	query := db.Find(bson.M{"_id": code})
	if count, err := query.Count(); err != nil {
		log.Errorf("[UpdateFundsData] 查询资金信息失败: %s", err.Error())
		return err
	} else if count == 0 { //插入
		dbFunds := &DBFunds{
			ID:     code,
			Funds:  make([]*stock.DBFundsData, 0, 0),
			Create: time.Now().Unix(),
			Update: time.Now().Unix(),
		}
		dbFunds.Funds = append(dbFunds.Funds, data)
		if err := db.Insert(dbFunds); err != nil {
			log.Errorf("[UpdateFundsData] 记录资金信息失败: %s", err.Error())
			return err
		}
		return nil
	} else { //更新
		funds := &DBFunds{
			Update: time.Now().Unix(),
		}
		if err := query.One(funds); err != nil {
			log.Errorf("[UpdateFundsData] 查询资金信息失败: %s", err.Error())
			return err
		}
		//判断是否重复
		for _, v := range funds.Funds {
			if v.GetDate() == data.GetDate() {
				log.Errorf("[UpdateFundsData] 数据重复不做更新: %s", data.GetDate())
				return nil
			}
		}
		funds.Funds = append(funds.Funds, data)
		if err := db.Update(bson.M{"_id": code}, funds); err != nil {
			log.Errorf("[UpdateFundsData] 更新资金信息失败: %s", err.Error())
			return err
		}
		return nil
	}
}

func _init(sql string) (*mysql.DBHandler, bytes.Buffer) {
	db := mysql.NewDBHandler()
	var buff bytes.Buffer
	buff.WriteString(sql)
	return db, buff
}

//SaveBasic 记录基本数据
func SaveBasic(code, exc string, data *stock.BasicData) error {
	db, sql := _init(insertBasicSQL)
	args := []interface{}{code, exc, data.GetOpening(), data.GetClosing(), data.GetVolume(), data.GetHighest(),
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
func SaveFundsData(code string, data *stock.FundsData) error {
	db, sql := _init(insertBasicSQL)
	args := []interface{}{code, data.GetMainInflow(), data.GetRetailInflow(), data.GetMainOutflow(), data.GetRetailOutflow(), time.Now().Unix()}
	if _, err := db.Insert(sql.String(), args...); err != nil {
		log.Errorf("[SaveFundsData] 记录数据失败: %s", err.Error())
		return err
	}
	return nil
}
