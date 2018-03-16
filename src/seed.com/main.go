package main

import (
	"seed.com/common/db/mongo"
	"seed.com/logic"
)

func main() {
	defer func() {
		mongo.Shutdown()
	}()
	//logic.Start()
	//fmt.Println("===>>>", utils.HTTPGet("http://hq.sinajs.cn/list=sh600139", "GBK"))
	logic.QueryCodeData()
}
