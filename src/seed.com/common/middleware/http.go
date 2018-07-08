package middleware

import (
	// "froad.com/server/common/log"
	"seed.com/common/utils"
	"github.com/gin-gonic/gin"
	"net/http"
	// "runtime/debug"
	"time"
)

func HandleAll(c *gin.Context) {
	if c.Request.RequestURI == "/ping" || c.Request.RequestURI == "/" { //for nginx's heart beat
		c.Status(http.StatusOK)
		c.Abort()
		return
	}
	st := time.Now()
	//log.Info("Got HTTP request: { Method: ", c.Request.Method, " URI: ", c.Request.RequestURI, " Header: ", c.Request.Header, " }")
	//log.Trace("Content:", *c.Request)

	//clientID := utils.GetClientID(c)
	//if len(clientID) == 0 {
	//	// log.Critical("can not get clientID.")
	//	c.AbortWithStatus(http.StatusBadRequest)
	//	return
	//}
	defer func() {
		if e := recover(); e != nil {
			// log.Critical("panic in req:", c.Request, " err:", e, " stack:", string(debug.Stack()))
			c.AbortWithStatus(utils.StatusBizErr)
		}
		if time.Now().Unix()-st.Unix() >= 2 {
			// log.Debug("接口超时: ", c.Request.RequestURI, " 耗时:", time.Now().Unix()-st.Unix())
		}
	}()
	c.Next()

	resp, exists := c.Get(utils.ResponseKey)
	if !exists {
		if len(c.Errors) <= 0 {
			// log.Error("request not handled properly. method:", c.Request.Method, " URI:", c.Request.RequestURI)
			c.Status(http.StatusNotFound) //TODO:what should it be?
			return
		}
		// log.Debug("business failure: ", c.Errors.String())
		c.JSON(utils.StatusBizErr, utils.Resp{
			Code:    utils.Failed,
			Message: c.Errors.Last().Error(),
		})
		return
	}

	switch resp.(type) {
	case utils.Resp:
		status := http.StatusOK
		if resp.(utils.Resp).Code != utils.Success {
			status = utils.StatusBizErr
		}
		// log.Debugf("status:%d | resp:%+v | time:%s", status, resp, time.Since(st).String())
		c.JSON(status, resp)
	case utils.File:
		// log.Debug("Response file with status:", http.StatusOK)
		c.Status(http.StatusOK)
	default:
		// log.Errorf("Unknown resp type, please DO NOT change the response structure: %+v", resp)
		c.Status(http.StatusNotFound)
	}
}
