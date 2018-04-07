package main

import (
	"runtime"

	"seed.com/logic"
)

func main() {
	defer func() {
		//mongo.Shutdown()
	}()
	runtime.GOMAXPROCS(runtime.NumCPU())
	// code := logic.NewCode()
	// code.StartCollectCode()
	logic.EastMoneyData()
}
