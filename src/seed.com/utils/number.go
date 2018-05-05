package utils

import "strconv"

//Atoi parses a string to int32 ignoring the potential error, use it with caution
func Atoi(str string) int {
	val, _ := strconv.Atoi(str)
	return val
}
