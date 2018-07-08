package router

import (
	"github.com/gin-gonic/gin"
	"seed.com/skcenter/handler"
	"seed.com/common/jsonp"
	"seed.com/common/middleware"
)

var router *gin.Engine

func RegisterRouters()  {
	router = gin.Default()
	router.Use(jsonp.Jsonp())
	router.Use(middleware.HandleAll)

	accountGroup := router.Group("/account")
	{
		accountGroup.POST("/login", handler.Login)
	}
	capitalGroup := router.Group("/capital")
	{
		capitalGroup.POST("/flow", handler.CapitalFlow)
	}
}

func Start(address string) {
	router.Run(address)
}
