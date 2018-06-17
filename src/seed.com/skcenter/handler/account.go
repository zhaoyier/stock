package handler

import (
	"github.com/gin-gonic/gin"
	"seed.com/proto/account"
	"fmt"
	"net/http"
)

func Login(c *gin.Context)  {
	var req account.AccountLoginReq

	if err := c.BindJSON(&req); err != nil {
		fmt.Println("[Login] 请求参数错误:", err)
		return
	}

	fmt.Println("[Login] 请求参数:", req.String())

	resp := account.AccountLoginResp{}
	resp.Result = &account.Result{
		Code: 0,
		Message: "succeed",
	}

	c.JSON(http.StatusOK, resp)
}
