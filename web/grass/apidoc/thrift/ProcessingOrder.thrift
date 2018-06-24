// This API is only implemented in webapi
namespace go ezbuy.apidoc.gen.processingorder
namespace java com.daigou.sg.webapi.order.processing
namespace swift TR

include 'Common.thrift'

struct TProcessingOrderGroup {
	1: required i32 itemCount;
	2: required string totalAmount;
	3: required Common.TServiceType serviceType;
	4: required string status;
	5: required list<Common.TOrderSimple> sampleOrders;
	6: required bool hasMoreOrders;
	7: optional i32 paymentID;
	8: optional string paymentNumber;
	9: optional string additionalDescription;
	10: optional string maxCreatedDate;
	11: optional Common.TCommonItem relatedItem;
	12: optional string billId;
	13: optional string billType;
}


service ProcessingOrder {

	list<TProcessingOrderGroup> UserGetProcessingOrderGroups(1:i32 offset, 2:i32 limit),

	list<Common.TOrderSimple> UserGetProcessingOrdersByServiceType(1:Common.TServiceType serviceType, 2:i32 offset, 3:i32 limit)
}
