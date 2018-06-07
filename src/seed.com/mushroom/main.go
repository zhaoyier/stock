package main

import (
	"runtime"
	// "seed.com/mushroom/timer"
	"seed.com/mushroom/task"
	"seed.com/common/log"
)

func main() {
	defer log.Shutdown()
	// cpu多核
	runtime.GOMAXPROCS(runtime.NumCPU())
	// 定时器1，传入两个参数
	//timer.SetTimer("baidu", 3, task.StarBaiduTask, []string{"hello", "world"})
	//// 定时器2，不传参数
	//// timer.SetTimer("callback2", 6, task.Callback2, nil)
	//// 移除定时器
	////timer.Delete(timer.TimerMap["callback2"])
	////运行计时器
	//timer.Run()

	task.StarBaiduTask(nil)
}
