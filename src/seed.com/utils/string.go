package utils

import (
	"strconv"
	"strings"
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
func ParseFloat32(str string) float32 {
	val, err := strconv.ParseFloat(str, 32)
	if err != nil {

	}
	return float32(val)
}

//ParseFloat64 字符串转64位浮点数
func ParseFloat64(str string) float64 {
	val, err := strconv.ParseFloat(str, 32)
	if err != nil {

	}
	return val
}

//ParseFloat2Int32 字符串转整数
func ParseFloat2Int32(str string) int32 {
	val, err := strconv.ParseFloat(str, 32)
	if err != nil {

	}
	return int32(val * 100)
}
