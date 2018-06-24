// This API is only implemented in webapi
namespace go ezbuy.apidoc.gen.pendingpayment
namespace java com.daigou.sg.webapi.payment.pending
namespace swift TR

include "PrimeOrder.thrift"
include "EzShipment.thrift"
include "Common.thrift"

struct TPaymentSimple {
	1: required i32 paymentID; // 老ID字段需要废弃，要使用paymentIdStr来支持多Id
	2: required string paymentNumber;
	3: required i32 itemCount;
	4: required double totalAmount; // amount without symbol
	5: required Common.TServiceType serviceType;
	6: required Common.TRelatedType paymentType;
	7: required i64 timeLeft; // seconds remaining, negative if no time limit
	8: required string status;
	9: optional list<string> itemPics;
	10: required string createdDate;
	11: optional string name;
	12: required bool paid;
	13: required list<i32> relatedPaymentIDs;
	14: optional string amountDesc;
	15: optional bool friendsDeal;
	16: optional bool creditPayOnly;
	17: required string encryptPaymentId;
	18: required string billType;
	19: required string billId;
	20: required string paymentIdStr; //多Id,用逗号隔开
}

struct TPaymentDetail {
	1: required TPaymentSimple info;
	2: optional list<Common.TOrderSimple> relatedOrders; //
	3: optional list<PrimeOrder.TTitleValueItem> orderSummaryInfo; // 通用的OrderSummary
	4: optional list<EzShipment.TPackageDetail> relatedParcels; //
	5: required double prePay;
}

struct TPendingPaymentResult {
	1: required list<TPaymentSimple> payments;
	2: required double prePay;
	3: required i32 totalCount;
}

struct TPaymentActionReq {
	1: required list<TPaymentWithType> payments;
}

struct TPaymentWithType {
	1: required string billId;
	2: required string billType;
}

service PendingPayment {

	TPendingPaymentResult UserGetPendingPayments(1:i32 offset, 2:i32 limit);
	
	TPendingPaymentResult UserGetPendingPaymentsWithType(1:i32 offset, 2:i32 limit);

	// return "" if no error; if error, just alert
	string UserCancelPendingPayments(1:list<i32> paymentIDs);

	// return "" if no error; if error, just alert
	string UserPayPendingPayments(1:list<i32> paymentIDs);

	Common.TCommonResult UserCancelPendingPaymentsWithType(1:TPaymentActionReq paymentActionReq);

	Common.TCommonResult UserPayPendingPaymentsWithType(1:TPaymentActionReq paymentActionReq);
	
	TPaymentDetail UserGetPendingPaymentDetail(1:i32 paymentID);
	
	TPaymentDetail UserGetPendingPaymentDetailWithType(1:string billId, 2:string billType);
}
