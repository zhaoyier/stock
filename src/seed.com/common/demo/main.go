package main

import (
	"time"
	"seed.com/common/timer"
)

func main()  {
	tw := timer.New(time.Second, 3600, func(data timer.TaskData) {

	})

	tw.AddTimer(2*time.Second, 1, 1, timer.TaskData{"uid": "111"})

	tw.Start()


}
