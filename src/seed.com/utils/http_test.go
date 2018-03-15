package utils

import (
	"fmt"
	"testing"
)

func TestHTTPGet(t *testing.T) {
	data := HTTPGet("http://hq.sinajs.cn/list=sh600606", "gbk")
	fmt.Println(string(data))
}
