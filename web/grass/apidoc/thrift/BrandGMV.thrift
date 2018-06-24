namespace go ezbuy.apidoc.brandgmv

struct TOrderData {
	1:required string country
	2:required string brandName
	3:required string productName
	4:required string productUrl
	5:required double productPrice
	6:required i32 productCount
	7:required i32 purchaseTime
	8:required i32 orderId
}

struct TDataOnTotal{
	1:required list<TOrderData> orderDatas;
	2:required i32 total;
}

service BrandGmv{
	//导入excel
	bool ImportBrandExcel()

	//得到数据
	TDataOnTotal  GetBrandData(1:i32 offset,2:i32 limit)
}
