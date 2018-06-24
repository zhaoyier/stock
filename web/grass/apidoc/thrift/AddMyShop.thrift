namespace go trpc

struct TShopInfo{
	1:required string companyName
	2:required string inChargeName
	3:required string address
	4:required string bussinessType
	5:required string telephone
}

struct TBoolMsg{
	1:required string msg
	2:required bool flag
}

service MyShopContact{
	TBoolMsg SubmitShopInfo(1:TShopInfo info)
}
