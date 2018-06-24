namespace go ezbuy.apidoc.voucherbcp

enum VoucherBcpParam{
	SUCCESS = 1
	PARTIAL_SUCCESS = 2
	SYSTEM_ERROR = 3
}

struct VoucherStruct{
	1:required i32 voucherTypeId
	2:required i32 isGiven
	3:required i32 isUsed
	4:required i32 paymentBillId
	5:required string createDate
	6:required string updateDate
	7:required i32 customerId
	8:required i32 giveChannel
}

struct TBoolReply {
	1:required bool isSuccess
	2:required string msg
	3:required i32 code
}

service VoucherBcp {
	TBoolReply BcpVoucherToDB(1:string file),
	TBoolReply LoadInVoucher(1: i64 voucherTypeId, 2: i64 endDate, 3: list<i64> customerIds),
}
