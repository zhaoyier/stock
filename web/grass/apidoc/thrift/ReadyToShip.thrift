// This API is only implemented in webapi
namespace go ezbuy.apidoc.gen.readytoship
namespace java com.daigou.sg.webapi.readytoship
namespace swift TR
namespace csharp EZRPC.ReadyToShip.Entity

include 'Checkout.thrift'
include 'Common.thrift'

struct TReadyToShipGroup {
	1: required i32 itemsCount;
	2: required Common.TServiceType serviceType;
	3: required string warehouseCode;
	4: required string shippingMethodCode;
	5: required string shippingMethodName;
	6: required list<string> itemsPics;
	7: required string status;
	8: required i32 freeStorageDays;
	9: required i32 chargedStorageDays;
	10: required double storageFee;
	11: required i32 notArrivedItemCount;
}

struct TReadyToShipOrderItem {
	1: required double weight;
	2: required i32 storageDays;
	3: optional string memoToSelf;	// Ship4Me提交中的个人备注
	4: optional double declareValue; 
	5: optional bool isDeclareValueEditable;
	6: optional list<string> availableShippingMethodCodes; 	// 可用的国际运输方式，如果所有方式都可用，请返回空数组
	7: required Common.TOrderSimple relatedOrder;
	8: required list<Common.TOrderSimple> relatedOrderWeb;
	9: optional string promotion; // 折扣信息
}

struct TBuy4MeCheckoutInfo {
	1: required list<i32> orderIDs;
	2: required string warehouseCode;
	3: required string shippingMethodCode;
	4: optional Checkout.TCartCheckoutInfo info;
}

struct TShip4MeCheckoutInfo {
	1: required list<i32> orderIDs;
	2: required double declareValues;
	3: required string warehouseCode;
	4: optional Checkout.TCartCheckoutInfo info;
}

service ReadyToShip {

	list<TReadyToShipGroup> UserGetReadyToShipGroups(1:i32 offset, 2:i32 limit),
	
	list<TReadyToShipOrderItem> UserGetReadyToShipItems(1:Common.TServiceType serviceType, 2:string warehouseCode, 3:string shippingMethodCode, 4:i32 offset, 5:i32 limit),
	
	Checkout.TCheckoutResult UserSubmitBuy4MeItems(1:TBuy4MeCheckoutInfo info, 2:bool payNow),
	
	Checkout.TCheckoutResult UserSubmitShip4MeItems(1:TShip4MeCheckoutInfo info, 2:bool payNow),
	
	Checkout.TCartBill UserGetBuy4MeItemsBills(1:TBuy4MeCheckoutInfo info),

	Checkout.TCartBill UserGetShip4MeItemsBills(1:TShip4MeCheckoutInfo info),
	
	list<Checkout.TDeliveryMethod> UserGetBuy4MeDeliveryMethods(1:TBuy4MeCheckoutInfo info),
	
	list<Checkout.TDeliveryMethod> UserGetShip4MeDeliveryMethods(1:TShip4MeCheckoutInfo info),
	
	list<Checkout.TCartShippingMethod> UserGetShip4MeShippingMethods(1:TShip4MeCheckoutInfo info),
	
	list<string> UserGetBuy4MeItemsDates(1:TBuy4MeCheckoutInfo info, 2:string deliveryMethod, 3:i32 deliveryMethodId),
	
	list<string> UserGetBuy4MeItemsDeliveryTimeSlots(1:TBuy4MeCheckoutInfo info, 2:string deliveryMethod, 3:i32 deliveryMethodId, 4:string date),
	
	list<string> UserGetShip4MeItemsDates(1:TShip4MeCheckoutInfo info, 2:string deliveryMethod, 3:i32 deliveryMethodId),
	
	list<string> UserGetShip4MeItemsDeliveryTimeSlots(1:TShip4MeCheckoutInfo info, 2:string deliveryMethod, 3:i32 deliveryMethodId, 4:string date)
}
