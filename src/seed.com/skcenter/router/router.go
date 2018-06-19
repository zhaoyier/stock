package router

import (
	"github.com/gin-gonic/gin"
	"seed.com/skcenter/handler"
)

var router *gin.Engine

func RegisterRouters()  {
	router = gin.Default()

	accountGroup := router.Group("/account")
	{
		accountGroup.POST("/login", handler.Login)
	}
	apiGroup := router.Group("")
}

func Start(address string) {
	router.Run(address)
}
