package data

import (
	"bytes"
	"seed.com/common/db/mysql"
)


func _init(sql string) (*mysql.DBHandler, bytes.Buffer) {
	db := mysql.NewDBHandler()
	var buff bytes.Buffer
	buff.WriteString(sql)
	return db, buff
}
