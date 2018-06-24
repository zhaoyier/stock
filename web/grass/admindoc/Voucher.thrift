namespace go trpc

struct TBaseForm {
	1: string catalogCode,
	2: string name,
	3: string startDate, //in format of 20161231
	4: string endDate, //in format of 20161231
	5: i32 totalCount,
	6: string picture, //上传至七牛的图片
	7: string description, //voucher的描述
	8: i32 days,//持续天数,0表示不根据持续时间
	9: string pictureColor,  // 格式：#FFFFFF
	10: i32 countPerCustomer,  // 每人最多可领多少张，0表示没有限制，默认没有限制
}

struct TRebateVoucherForm {
	1: TBaseForm baseForm,
	// 1: Other, 2: Buy4Me, 4: Ship4Me, 8: Ezbuy, 16: Prime
	2: i32 serviceType,
	3: double gapAmount,
	4: double rebateAmount,
}

struct TCashVoucherForm {
	1: TBaseForm baseForm,
	// 1: Other, 2: Buy4Me, 4: Ship4Me, 8: Ezbuy, 16: Prime
	2: i32 serviceType,
	3: double mininumAmount,
	4: double rebateAmount,
	5: bool isFirstOrder,
}

struct TRegisterForm{
	1: TBaseForm baseForm,
	// 1: Other, 2: Buy4Me, 4: Ship4Me, 8: Ezbuy, 16: Prime
	2: i32 serviceType,
	3: double mininumAmount,
	4: double rebateAmount,
	5: bool isFirstOrder,
}

struct TAgentFeeForm{
 1: TBaseForm baseForm,
	// 1: Other, 2: Buy4Me, 4: Ship4Me, 8: Ezbuy, 16: Prime
 2: i32 serviceType,
 3: double offLimit,   // 减免上限  预留字段
 4: double offPercent,  // 折扣百分比  ,前端传小数
 5: bool isFirstOrder,	
}


struct TStatResult {
	1: i32 id,
	2: string Name,
	3: i32 createCount,
	4: i32 givenCount,
	5: i32 usedCount,
	6: string picture, //上传至七牛的图片
	7: string description, //voucher的描述
	8: i32 duration, //持续时间
	9: string pictureColor,  // 格式：#FFFFFF
	10: i32 countPerCustomer,  // 每人最多可领多少张，0表示没有限制，默认没有限制
	11: double firstAmount,
	12: double secondAmount,
	13: optional bool isFirstOrder,
	14: i32 serviceType,
	15: i32 startDate,
	16: i32 endDate,
}

struct TVoucherUsage {
	1: string id,
	2: bool isGiven,
	3: bool isUsed,
	4: string givenChanel,
	5: string customer,
}

struct TVoucherToUser {
	1: string id,
	2: string name,
	3: i32 amount
}

struct TVoucherTotalCountLog {
	1: i32 delta,
	2: string createDate,
}

struct TCustomer {
	1: i32 customerId,
	2: string email,
	3: string catalogCode,
	3: string nickname,
}

struct TCustomerVoucher {
	1: i32 voucherId,
	2: i32 voucherTypeId,
	3: string voucherName,
	4: string picture,
	5: string description,
}

struct TUpdateVoucherParam	{
	1: i32 voucherTypeId
	2: string endDate
}

struct TVoucherResult {
	1:required string message;
	2:required bool result;
}

struct TCustomerTag{
	1:required string tagName;
	2:required i32 customerTagId;
	3:required string catalogCode;
	4:required i32 customerCounts;
}

struct TFailure{
	//1:required string nickName;
	2:required i32 customerId;
	3:required string failureReason;
}
enum TaskState {
	Running = 1,
	Success = 2,
	Failed = 3,
	PartialSuccess = 4
}
enum TaskType {
	File = 1, // excel 发送方式
	Rule = 2, // 普通方式
	Tag = 3, // 分组批量发送
}
struct TTask {
	1:required string id;
	2:required TaskType type;
	3:required string name;
	4:required string catalogCode;
	5:required i32 voucherTypeId;
	6:required i64 createDate; // unit: second
	7:required i64 startDate;
	8:required i64 endDate;
	9:required TaskState state;
	10:required string note;
	11:required i32 expectedCounts;
	12:required i32 actualCounts;
	13:required i32 failureCounts;
	14:required string tagName;
	15:required i32 customerTagId;
	16:required list<TFailure> failureList;
	17:required string file;
}
struct TVoucherToCustomers{
	////1:required i32 channelId;
    2:required i32 voucherTypeId;
    3:required list<i32> customerIds;
    4:required string catalogCode;
    5:required TaskType taskType;
    6:required string taskName;
    7:required string tagName;
    8:required i32 customerTagId;
}

service Voucher {
	bool AddRebateVoucher(1:TRebateVoucherForm data),
	bool AddCashVoucher(1:TCashVoucherForm data),
	bool AddPrimeTrialVoucher(1:TBaseForm data),
    bool AddAgentFeeVoucher(1:TAgentFeeForm data),
	bool AddRegisterVoucher(1:TRegisterForm data),
	bool DeleteVoucher(1:i32 id),
	bool UpdateVoucherTotalCount(1:i32 id, 2:i32 delta),
	list<TVoucherTotalCountLog> GetVoucherTotalCountLog(1:i32 id),
	// voucherCategory参数
	// 0: 满减券, 1: 红包券,注册现金劵 2: prime体验券, 3:agentFee券
	list<TStatResult> GetStats(1:i32 voucherCategory, 2:i32 limit, 3:i32 offset, 4:string catalogCode),
	list<TVoucherUsage> GetVoucherUsage(1:i32 id, 2:i32 limit, 3:i32 offset),

	TCustomer GetCustomer(1:string nickname, 2:string catalogCode),
	list<TCustomerVoucher> GetCustomerVouchers(1:string nickname, 2:string catalogCode),
	// 空字符串表示成功，否则返回出错提示
	string AdminGiveVoucher(1:string nickname, 2:string catalogCode, 3:i32 voucherTypeId),

	//更新voucher结束时间
	bool UpdateVoucher(1:TUpdateVoucherParam param),
	
	// 按照分组批量发券
	TVoucherResult GiveVouchersByTag(1:i32 customerTagId,2:i32 voucherTypeId,3:string catalogCode,4:string taskName),
	
	// 获取用户分组列表
	list<TCustomerTag>GetTags(1:string catalogCode),
	
	// 获取发券任务列表  // 0,1,2,3,4 TaskState
	list<TTask>GetTaskList(1:string catalogCode,2:i32 TaskState),
	
	// 按照ids 批量发券
	TVoucherResult GiveVoucherToCustomers(1:TVoucherToCustomers vtc),
	
	//excel 批量导入发券;  form-data-->  ["catalogCode":"xxx"],["taskName":"xxx"],["voucherTypeId":number], 上传文件对应 "file"字段
	TVoucherResult GiveVouchersByExcel(),
}
