package main

import (
	"seed.com/skcenter/router"
)

func main()  {
	router.RegisterRouters()

	router.Start(":12101")
}

