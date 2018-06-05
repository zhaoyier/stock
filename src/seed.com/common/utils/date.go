package utils

import (
	"strconv"
	"strings"
	"time"

	"fmt"
	"regexp"
)

// GetDelay 根据日期计算时间戳
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


// GetDiffTime 获取时间差
func GetDiffTime(date string) time.Duration {
	if ok1, ok2 := strings.Contains(date, "-"), strings.Contains(date, ":"); ok1 || ok2 {
		tm := time.Now()
		dd := strings.Split(regexp.MustCompile(`\s|:`).ReplaceAllString(date, "-"), "-")
		if ok := strings.Contains(dd[0], "x"); ok {
			dd[0] = strconv.Itoa(tm.Year())
		}
		if ok := strings.Contains(dd[1], "x"); ok {
			dd[1] = strconv.Itoa(int(tm.Month()))
		}
		if ok := strings.Contains(dd[2], "x"); ok {
			dd[2] = strconv.Itoa(tm.Day())
		}
		if ok := strings.Contains(dd[3], "x"); ok {
			dd[3] = strconv.Itoa(tm.Hour())
		}
		if ok := strings.Contains(dd[4], "x"); ok {
			dd[4] = strconv.Itoa(tm.Minute())
		}
		if ok := strings.Contains(dd[5], "x"); ok {
			dd[5] = strconv.Itoa(tm.Second())
		}
		return time.Date(atoi(dd[0]), time.Month(atoi(dd[1])), atoi(dd[2]), atoi(dd[3]), atoi(dd[4]), atoi(dd[5]), 0, time.Local).Sub(time.Now())
	} else {
		return time.Duration(atoi(date))
	}
}

func getDate(date string) time.Time {
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

	return time.Date(dates[0], time.Month(dates[1]), dates[2], dates[3], dates[4], dates[5], 0, time.Local)
}

func getDateList(date string) (delay [6]int) {
	delay = [6]int{0, 0, 0, 0, 0, 0}
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
		num, _ := strconv.Atoi(date)
		tm := time.Now().Add(time.Duration(num)*time.Second)
		delay = [6]int{tm.Year(), int(tm.Month()), tm.Day(), tm.Hour(), tm.Minute(), tm.Second()}
		fmt.Println("===>>001:", delay)
		break
	}
	return delay
}

func atoi(s string) int {
	num, _ := strconv.Atoi(s)
	return num
}
