package main

import (
	"runtime"

	"seed.com/logic"
)

func main() {
	runtime.GOMAXPROCS(runtime.NumCPU())
	// logic.EastMoneyData()
	// east := logic.NewEast()
	// east.Start()
	//logic.Start()
	baidu := logic.NewBaiduData()
	baidu.Start()
}
