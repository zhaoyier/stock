package utils

import (
	"github.com/gin-gonic/gin"
	"strings"
)

func GetClientID(c *gin.Context) string {
	clientID, ok := c.Get(ClientIDKey)
	if ok {
		return clientID.(string)
	}
	subStrings := strings.Split(c.Request.Header.Get(HeaderReferer), "/")
	if len(subStrings) < 4 {
		return ""
	}
	c.Set(ClientIDKey, subStrings[3])
	return subStrings[3]
}

func GetUserID(c *gin.Context) string {
	uid, ok := c.Get(UserIDKey)
	if ok {
		return uid.(string)
	}
	userid := c.Request.Header.Get(UserIDKey)
	c.Set(UserIDKey, userid)
	return userid
}

func GetString(c *gin.Context, key string) (string, bool) {
	v, exist := c.Get(key)
	if !exist {
		return "", false
	}
	return v.(string), true
}

func IsReqFromWechat(c *gin.Context) bool {
	reqFrom := c.Request.Header.Get(ReqFromKey)
	if len(reqFrom) == 0 {
		//没有设置reqFrom默认微信端请求
		return true
	}
	return false
}

func IsReqFromAPP(c *gin.Context) bool {
	reqFrom := c.Request.Header.Get(ReqFromKey)
	if strings.Compare(reqFrom, ReqFromAPP) == 0 {
		return true
	}
	return false
}

func IsReqFromCbankWX(c *gin.Context) bool {
	reqFrom := c.Request.Header.Get(ReqFromKey)
	if strings.Compare(reqFrom, ReqFromCbankWX) == 0 {
		return true
	}
	return false
}

func IsReqFromPC(c *gin.Context) bool {
	reqFrom := c.Request.Header.Get(ReqFromKey)
	if strings.Compare(reqFrom, ReqFromPC) == 0 {
		return true
	}
	return false
}

func GetPlatform(c *gin.Context) string {
	reqFrom := c.Request.Header.Get(ReqFromKey)
	switch reqFrom {
	case ReqFromAPP:
		return PlatformAPP
	case ReqFromCbankWX, "":
		return PlatformWechat
	case ReqFromPC:
		return PlatformPC

	}
	return ""
}
