package utils

import (
	"github.com/gin-gonic/gin"
)
func ParseReq(req interface{}) (interface{}, error) {
	var c *gin.Context
	err := c.BindJSON(&req)
	return req, err
}
