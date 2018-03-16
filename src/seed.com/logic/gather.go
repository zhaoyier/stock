package logic

import (
	"fmt"
	"strings"
	"sync"
	"time"

	defStock "seed.com/common/defs/stock"
	"seed.com/dao"
	"seed.com/proto/stock"
	"seed.com/utils"
)

var codeList []*stock.CodeData

func init() {
	codeList = make([]*stock.CodeData, 0, 0)
}

//QueryCodeData 定时查询代码数据
func QueryCodeData() {
	link := "http://hq.sinajs.cn/list=sh"
	// body := utils.HTTPGet("http://hq.sinajs.cn/list=sh600139", "GBK")
	// codeList = append(codeList, _analyseCodeData(body))

	wg := sync.WaitGroup{}
	wg.Add(3)
	go func() {
		for i := defStock.SHAMin; i < defStock.SHAMax; i++ {
			if i/100 == 602 {
				continue
			}
			body := utils.HTTPGet(link+utils.FormatInt(i), "GBK")
			if data := _analyseCodeData(body); data != nil {
				codeList = append(codeList, data)
			}
		}
		wg.Done()
	}()
	go func() {
		wg.Done()
	}()
	go func() {
		wg.Done()
	}()
	wg.Wait()
	fmt.Println("===>>>302:", len(codeList), codeList)
	dao.SaveCodeData(codeList)
}

func _analyseCodeData(body []byte) *stock.CodeData {
	codeList := strings.Split(string(body), "=")
	if len(codeList[1]) <= 10 {
		return nil
	}

	code := &stock.CodeData{
		CreateTime: time.Now().Unix(),
	}
	fmt.Println("====>>>3101:", codeList, len(codeList[1]))
	code.Name = strings.Split(codeList[1], ",")[0][1:]
	codeStr := strings.Split(codeList[0], "_")
	code.Exchange, code.Id = codeStr[len(codeStr)-1][:2], codeStr[len(codeStr)-1][2:]
	return code
}
