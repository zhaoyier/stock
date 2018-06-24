namespace go rpc.autoplaceorder

struct TAutoPlaceOrderInfo{
	1: required i32 OrderId;					//订单Id
	2: required string OrderNumber;				//订单号
	3: required string VendorName;				//商家名称
	4: required double UnitPrice;				//单价
	5: required i32 Qty;						//数量
	6: required i32 ActualQty;					//真实数量
	7: required double SubTotal;				//小计
	8: required string ProductUrl;				//商品链接
	9: required double InternalShipmentFee;		//国内运费
	10: required bool IsContainOffsets;			//是否包含差额补齐
	11: required double AuthorizeBalance;		//授权金额
	12: required string ProductRemark;			//商品备注
	13: required string SkuInfos;				//sku信息
	14: required bool IsBuyForMe;				//是否代购订单
	15: required string ProductName;			//商品名称
	16: required i32 CustomerId;				//CustomerId
}

struct TParamForAutoPlaceOrder{
	1: required i32 OrderId;								//订单Id
	2: required string PoNumber;							//淘宝的下单账号
	3: required i32 ResultStatus;							//自动拍单的结果状态[1：成功，-1：失败]
	4: required string Message;								//自动拍单结果信息
	5: required double ProductFeeFromTb;					//在淘宝付的商品费
	6: required double InternalShipmentFeeFromTb;			//在淘宝付的国内运费
}

service AutoPlaceOrder{
	list<TAutoPlaceOrderInfo> LoadAutoPlaceOrderInfo(1:i32 cnt,2:string pwd,3:string warehouseCode,4:i32 customerId,5:string catalogCode,6:i32 shipmentTypeId,7:string purchaseType)

	string AutoPlaceOrder(1:list<TParamForAutoPlaceOrder> params,2:string pwd)

	string SetPurchaseAutoPlacePwd(1:string pwd)

	string GetRemainderInPurchaseAutoPlacePwd(1:string pwd)

	string UpdatePurchaseAutoPlacePwd(1:string pwd,2:string newPwd)
}
