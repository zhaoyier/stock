package task

import (
	"seed.com/mushroom/logic"
)

func StarBaiduTask(args interface{})  {
	baidu := logic.NewBaiduData()
	baidu.Start()
}
