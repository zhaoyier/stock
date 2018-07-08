package handler

import (
	"github.com/gin-gonic/gin"
	"seed.com/proto/capital"
	"seed.com/common/utils"
	// "seed.com/skcenter/utils"
	"fmt"
)

func CapitalFlow(c *gin.Context) {
	req := &capital.CapitalFlowReq{}
	if err := c.BindJSON(req); err != nil {
		c.Set(utils.ResponseKey, utils.Resp{
			Code: utils.Failed,
			Message: err.Error(),
		})
		return
	}

	// req, err := utils.ParseReq(&capital.CapitalFlowReq{})
	fmt.Println("==>>:", req)
}

func CapitalFlowHistory(c *gin.Context) {

}