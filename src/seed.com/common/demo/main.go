package main

import (
	// "time"
	"strings"
	"fmt"
	//"strconv"
	//"math"
	//"time"
	"time"
	"strconv"
	"seed.com/common/utils"
)

func main()  {
	var date string = "2018-5-1 x:x:1"

	fmt.Println("==>>:", utils.GetDiffTime(date))
}

func getDateList(date string) (delay []int) {
	delay = make([]int, 6)
	switch true {
	case strings.Contains(date, " "):
		list := strings.Split(date, " ")
		l1, l2 := strings.Split(list[0], "-"), strings.Split(list[1], ":")
		for i := len(l1)-1; i >= 0; i-- {
			delay[3-len(l1)+i], _ = strconv.Atoi(l1[i])
		}
		for i := len(l2)-1; i >= 0; i-- {
			delay[6-len(l2)+i], _ = strconv.Atoi(l2[i])
		}
		break
	case strings.Contains(date, "-"):
		list := strings.Split(date, "-")
		for i := len(list)-1; i >= 0; i-- {
			delay[3-len(list)+i], _ = strconv.Atoi(list[i])
		}
		break
	case strings.Contains(date, ":"):
		list := strings.Split(date, ":")
		for i := len(list)-1; i >= 0; i-- {
			delay[6-len(list)+i], _ = strconv.Atoi(list[i])
		}
		break
	default:
		delay[5], _ = strconv.Atoi(date)
		break
	}
	return delay
}

func GetDelay(date string) int64 {
	te, dates := time.Now(), getDateList(date)
	if dates[0] == 0 {
		dates[0] = te.Year()
	}
	if dates[1] == 0 {
		dates[1] = int(te.Month())
	}
	if dates[2] == 0 {
		dates[2] = te.Day()
	}
	if dates[3] == 0 {
		dates[3] = te.Hour()
	}
	if dates[4] == 0 {
		dates[4] = te.Minute()
	}
	if dates[5] == 0 {
		dates[5] = te.Second()
	}

	return time.Date(dates[0], time.Month(dates[1]), dates[2], dates[3], dates[4], dates[5], 0, time.Local).Unix()
}