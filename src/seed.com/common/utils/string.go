package utils

import (
	"strconv"
	"strings"
	"time"
)

//Trim 删除字符中指定
func Trim(s string, keys ...string) string {
	for _, v := range keys {
		s = strings.Replace(s, v, "", -1)
	}
	return s
}

// FormatInt32 int32转字符串
func FormatInt32(val int32) string {
	return strconv.FormatInt(int64(val), 10)
}

//FormatInt64 int64转字符串
func FormatInt64(val int64) string {
	return strconv.FormatInt(val, 10)
}

//FormatInt int转字符串
func FormatInt(val int) string {
	return strconv.FormatInt(int64(val), 10)
}

//ParseFloat32 字符串转32浮点数
func ParseF32(str string) float32 {
	val, err := strconv.ParseFloat(str, 64)
	if err != nil {

	}
	return float32(val)
}

//ParseFloat64 字符串转64位浮点数
func ParseF64(str string) float64 {
	val, err := strconv.ParseFloat(str, 64)
	if err != nil {

	}
	return val
}

//ParseFloat2Int32 字符串转整数
func ParseFloat2Int32(str string) int32 {
	val, err := strconv.ParseFloat(str, 64)
	if err != nil {

	}
	return int32(val * 100)
}

// ParseI64 将字符串转int64
func ParseI64(str string) int64 {
	val, err := strconv.ParseFloat(str, 64)
	if err != nil {

	}
	return int64(val * 100)
}

//FormatStockCode 股票代码转换
func FormatStockCode(val int) string {
	base := strconv.FormatInt(int64(val), 10)
	if len(base) < 6 {
		switch 6 - len(base) {
		case 1:
			return "0" + base
		case 2:
			return "00" + base
		case 3:
			return "000" + base
		case 4:
			return "0000" + base
		case 5:
			return "00000" + base
		default:
			return base
		}
	}
	return base
}

//ParseDate 日期转时间戳
func ParseDate(date string) int64 {
	tm, _ := time.Parse("2006-01-02", strings.Split(date, "T")[0])
	//fmt.Println("==>>date:", date)
	return tm.Unix()
}

//CheckExchange 判断交易所
func CheckExchange(code string) string {
	c, _ := strconv.ParseInt(code, 10, 64)
	if c < 600000 {
		return "sz"
	}
	return "sh"
}

func Atoi(str string) int {
	val, _ := strconv.Atoi(str)
	return val
}

func Atoi64(str string) int64 {
	val, _ := strconv.Atoi(str)
	return int64(val)
}

