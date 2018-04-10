package logic

import (
	"fmt"
	"strconv"
)

func StrReplace() {

}

func Todo() {
	// fmt.Println("===>>001:")
	// body := []byte(`[{"ChangePercent":"-","Close":-1,"INDUSTRY":"-","INDUSTRYPE":-1,"MAINBUSIN":"-","Update":"2018-04-10 23:33:13","Url":"http://topic.eastmoney.com/dhn2010/","ZgsmsOrYxs":"AN201203020004754782","applyont":50000,"applyontMoney":500000,"averagelow":"-","bkpe":"-","cbxjrgbs":30.46667,"companycode":"80167841","financecode":"3622","fxzl":67000000,"issueprice":22,"issuepriceMoney":1100000,"jg1":"-","jg2":"-","jg3":"-","kb":"-","listingdate":"2011-03-08T00:00:00","lwr":1.01728,"lwrandate":"2011-03-02T00:00:00","mzyqgs":500,"mzyqhl":"-","newPrice":"-","pe1":"-","pe2":"-","pe3":"-","peissuea":51.16,"purchasedate":"2011-02-25T00:00:00","sc":"cyb","securitycode":"300186","securityshortname":"大华农","sgrqrow":1419,"sgzs":402160000,"sl":"-","subcode":"300186","totaliiqrplaceoff":"-","wsfxsl":53800000,"wszqjkr":"2011-02-25T00:00:00","ycwssgsx":53500,"ycwssgzj":535000,"zzf":"-"}]`)
	// //fmt.Println("===>>002:", body)
	// t := _parseEaseMoneyResponse(body)

	c, _ := strconv.ParseInt("000301", 10, 64)
	fmt.Println("===>>009:", c)
}
