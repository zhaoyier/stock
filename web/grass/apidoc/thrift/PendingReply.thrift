// This API is only implemented in webapi
namespace go ezbuy.apidoc.gen.pendingreply
namespace java com.daigou.sg.webapi.reply.pending
namespace swift TR

include 'EzShipment.thrift'
include 'Common.thrift'

enum TPendingRepleyDomain {
	All = 0
	ProcessingOrder = 1
	Shipment = 2
}

struct TPendingReplyItem {
	1: required string message;
	2: required Common.TRelatedType relatedType; 
	3: optional Common.TOrderSimple order;		// Only available when domain is ProcessingOrder
	4: optional EzShipment.TPackage parcel;	// Only available when domain is Parcel
	5: optional TOrderRemarkItem orderRemark; // Only available when domain is ProcessingOrder
	6: optional EzShipment.TParcelRemark parcelRemark; // Only available when domain is Parcel
	7: optional Common.TServiceType orderServiceType; // Only available when domain is ProcessingOrder
	8: optional list<TOrderRemarkItem> orderRemarkWeb; // Only available when domain is ProcessingOrder
	9: optional list<EzShipment.TParcelRemark> parcelRemarkWeb; // Only available when domain is Parcel
	10: required i64 OrderByDate;
}

struct TOrderRemarkItem {
	1:required i32 id;				//订单备注id
	2:required string remark;		//内容
	3:required bool needReply;		//是否需要回复
	4:optional string attachments;	//附件
	5:required string createDate;	//创建日期
	6:required string creator;		//创建者
	7:optional i32 offsetId;		//差额补齐id
	8:required bool isForRepack     // 是否是Repack相关的Reply
}

service PendingReply {
	
	i32 UserGetPendingReplyCount(1:TPendingRepleyDomain domain),
	
	list<TPendingReplyItem> UserGetPendingReplies(1:TPendingRepleyDomain domain, 2:i32 offset, 3:i32 limit)
}
