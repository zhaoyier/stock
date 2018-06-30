package router

import (
	"github.com/gin-gonic/gin"
	"seed.com/skcenter/handler"
	"seed.com/common/jsonp"
)

var router *gin.Engine

func RegisterRouters()  {
	router = gin.Default()
	router.Use(jsonp.Jsonp())

	accountGroup := router.Group("/account")
	{
		accountGroup.POST("/login", handler.Login)
	}
	// apiGroup := router.Group("")
}

func Start(address string) {
	router.Run(address)
}
