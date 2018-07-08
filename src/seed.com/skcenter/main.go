package main

import (
	"runtime"
	"seed.com/skcenter/router"
)

func main()  {
	runtime.GOMAXPROCS(runtime.NumCPU())

	router.RegisterRouters()

	router.Start(":12101")
}

