package main

import (
	"seed.com/common/db/mongo"
	"seed.com/logic"
)

func main() {
	defer func() {
		mongo.Shutdown()
	}()
	logic.Start()
}
