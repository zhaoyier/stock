namespace * OrderHistory
namespace java com.daigou.sg.webapi.order.history
namespace swift TR
namespace go ezbuy.apidoc.gen.orderhistory

include 'Common.thrift'

struct TOrderHistoryPackage {
	1:required i32 packageID;					//包裹ID
	2:required string packageNumber;		//包裹号
	3:required list<Common.TOrderSimple> orders;		// orders
	4:required string total;		// 总费用（带货币符号的字符串）
	5:required Common.TServiceType serviceType;
	6:required bool hasReviewed;
	7:required i32 paymentBillID; //付款ID
}

struct TLimitationDamageResult {
	1:required bool result;
	2:required string message;
}
	
service OrderHistory {
	
	/// <summary>
	/// 获取Order History Package列表
	/// </summary>
	/// <returns>Order History Package列表</returns>
	list<TOrderHistoryPackage> UserGetOrderHistoryPackages(1:i32 offset, 2:i32 limit),
	
	/// <summary>
	/// 获取取消的Order
	/// </summary>
	/// <returns>获取取消的Order/returns>
	list<Common.TOrderSimple> UserGetCanceledOrders(1:i32 offset, 2:i32 limit),
	
	TLimitationDamageResult UserGiveLimitationDamages(1:i32 packageId),
}
