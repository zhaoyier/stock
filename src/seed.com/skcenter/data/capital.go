package data

import (
	"seed.com/common/utils"
)

const selectCount = "select count(1) as count from code"

const (
	codeTblName = "funds"
	codeFields = ""
)

func Test() (int, error) {
	db, sql := _init(selectCount)
	res, err := db.Query(sql.String())
	if err != nil {
		// fmt.Println("[GetCodeTotal] ")
		return 0, err
	}

	return utils.Atoi(res[0]["count"]), nil
}

func GetOneDay() {

}