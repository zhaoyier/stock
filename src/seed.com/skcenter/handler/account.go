package handler

import (
	"github.com/gin-gonic/gin"
	"seed.com/proto/account"
	"fmt"
	"net/http"
	"seed.com/skcenter/data"
)

func Login(c *gin.Context)  {
	var req account.AccountLoginReq

	if err := c.BindJSON(&req); err != nil {
		fmt.Println("[Login] 请求参数错误:", err)
		return
	}

	fmt.Println("[Login] 请求参数:", req.String())
	n, err := data.Test()
	fmt.Println("==>>001:", n, err)
	resp := account.AccountLoginResp{}
	resp.Result = &account.Result{
		Code: 0,
		Message: "succeed",
	}
	

	c.JSON(http.StatusOK, resp)
}
