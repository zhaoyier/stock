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
)

func main()  {
	var date string = "2018-5-15"

	// dates := strings.Split(date, " ")
	// fmt.Println("====>>001:", dates)
	getDelay(getDateList(date))
	// fmt.Println("==>>:", )
}

func getDateList(date string) (delay []string) {
	delay = make([]string, 6)
	switch true {
	case strings.Contains(date, " "):
		list := strings.Split(date, " ")
		l1, l2 := strings.Split(list[0], "-"), strings.Split(list[1], ":")
		for i := len(l1)-1; i >= 0; i-- {
			delay[3-len(l1)+i] = l1[i]
		}
		for i := len(l2)-1; i >= 0; i-- {
			delay[6-len(l2)+i] = l2[i]
		}
		break
	case strings.Contains(date, "-"):
		list := strings.Split(date, "-")
		for i := len(list)-1; i >= 0; i-- {
			delay[3-len(list)+i] = list[i]
		}
		break
	case strings.Contains(date, ":"):
		list := strings.Split(date, ":")
		for i := len(list)-1; i >= 0; i-- {
			delay[6-len(list)+i] = list[i]
			fmt.Println("===>>001:")
		}
		break
	}
	return delay
}

func getDelay(date []string)  {
	t := time.Now()
	fmt.Println("====>>>001:", date)
	if num, _ := strconv.ParseInt(date[0], 0, 10); num == 0 {
		fmt.Println("====>>>002:", num, strconv.FormatInt(int64(t.Year()), 10))
		date[0] = strconv.FormatInt(int64(t.Year()), 10)
	}
	if num, _ := strconv.ParseInt(date[1], 0, 10); num == 0 {
		date[1] = strconv.FormatInt(int64(t.Month()), 10)
	}
	if num, _ := strconv.ParseInt(date[2], 0, 10); num == 0 {
		date[2] = strconv.FormatInt(int64(t.Day()), 10)
	}
	if num, _ := strconv.ParseInt(date[3], 0, 10); num == 0 {
		date[3] = strconv.FormatInt(int64(t.Hour()), 10)
	}
	if num, _ := strconv.ParseInt(date[4], 0, 10); num == 0 {
		date[4] = strconv.FormatInt(int64(t.Minute()), 10)
	}
	if num, _ := strconv.ParseInt(date[5], 0, 10); num == 0 {
		date[5] = strconv.FormatInt(int64(t.Second()), 10)
	}

	str := strings.Join(date[:3], "-")+" "+strings.Join(date[3:], ":")
	fmt.Println("====>>>009:", date, str)

}