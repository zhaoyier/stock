package utils

import (
	"bytes"
	"fmt"
	"io/ioutil"
	"net/http"

	chinese "golang.org/x/text/encoding/simplifiedchinese"
	"golang.org/x/text/transform"
)

//HTTPGet Http Get请求
func HTTPGet(url, encode string) []byte {
	resp, err := http.Get(url)
	if err != nil {
		fmt.Println("[HTTPGet] 查询链接失败: ", err.Error())
		return nil
	}

	defer resp.Body.Close()
	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		fmt.Println("[HTTPGet] 读取响应消息失败: ", err.Error())
		return nil
	}
	fmt.Println("======>>>201:", body)
	switch encode {
	case "gbk", "GBK":
		data, err := ioutil.ReadAll(transform.NewReader(bytes.NewReader(body), chinese.GBK.NewDecoder()))
		if err != nil {
			fmt.Println("[HTTPGet] 响应消息转码失败: ", err.Error())
			return nil
		}
		return data
	default:
		return body
	}
}

// HTTPPost Http Post 请求
func HTTPPost(url string) {
	//http.NewRequest()
}
