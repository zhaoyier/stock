namespace go ezbuy.apidoc.gen.FlashData

struct TShowFlashData{
	1:required string url
	2:required string name
	3:required string price
	4:required string discountPrice
	5:required string picture
	6:required string discount
	7:required bool isChoiceProduct
}

service FlashSaleData{
	//显示数据
	list<TShowFlashData> GetShowFlashData(1:i32 limit,2:i32 offset,3:string area)
}
