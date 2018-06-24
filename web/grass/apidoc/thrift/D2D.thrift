namespace go trpc
namespace java com.daigou.selfstation.rpc.selfstation

struct TDriver {
	1: string name,
	2: double longitude,
	3: double latitude,
	4: string telephone,
	5: i32 driverNo,
	6: string remark,
	7: double maxWeight,
	8: string catalogCode,
	9: list<string> postCodeGroupIDs,
	// day: 白天
	// night: 晚上
	// big: 大货
	10: list<string> shifts,

	// 以下字段是只读的
	11: list<string> postCodes,
	12: list<TPostCodeGroup> postCodeGroups,
	13: string workingHours,
	// KL: 吉隆坡自营派送
	// JB: JB自营派送
	// Penang: Penang自营派送
	14: string districtName,
	15: bool isStation,
}

struct TFilter {
	1: string catalogCode,
	// KL: 吉隆坡自营派送
	// JB: JB自营派送
	// Penang: Penang自营派送
	2: string districtName,
	// day: 白天
	// night: 晚上
	// big: 大货
	3: string shift,
	// 默认0，即今天
	// 格式：20160131
	4: i32 dateInt,
	// 时间段
	5: string periodName,
	6: i32 driverNo,
	7: bool isStation,
}

struct TPostCode {
	1: string ID,
	2: string postCode,
	3: double longitude,
	4: double latitude,
	5: string catalogCode,
}

struct TPostCodeGroup {
	1: string ID,
	2: string name,
	3: list<string> postCodes,
	4: string catalogCode,
}

struct TShipment {
	1: i32 shipmentId,
	2: string parcelNo,
	3: string memo,
	4: double weight,
	5: string remark,
	6: bool isCancelled,
}

struct TDeliveryJob {
	1: string ID,
	2: i32 priority,
	3: i32 customerId,
	4: string customerName,
	5: string address,
	6: string postCode,
	7: string telephone,
	8: i32 deliveryDate,
	9: string catalogCode,
	10: list<TShipment> shipments,
	11: string driverName,
	12: i32 driverNo,
	13: string smsStatus,
	14: string status,
	15: string source,
	16: i32 rating,
	17: bool isLocked,
	18: double latitude,
	19: double longitude,
	20: string nickname,
	21: string signatureImage,
	22: string remark,
	23: string smsContent,
	24: string eta,
	25: string shift,
	26: bool isOrdered,
	27: string periodName,
	28: i32 remarkTime,
	29: string smsSendContent,
	30: i32 smsSendTime,
	31: string smsSendCreateBy,
	32: optional list<string> subPkgShelfInfos ,
	33: string remarkImage,
	34: i32 signTime,
	// 这里将司机的号码也带上
	35: string phone,
	36: bool isSent,
}

struct TDeliveryJobSMS {
	1: string jobID,
	2: string telephone,
	3: string eta,
	4: string customerName,
	5: string driverName,
	6: string catalogCode,
	7: string driverTelephone,
	8: string shift,
	9: string deliveryDate,
}

struct TCoordinate {
	1: double longitude,
	2: double latitude,
}

struct TDeliveryJobRoute {
	1: string status,
	2: list<TCoordinate> route,
	// 除第一个任务外所需的派送时间
	3: i32 timeWithoutFirstJob,
	4: string driverName,
	5: string driverPhone,
	6: string eta,
}

struct TBoxNo {
	1: string boxNo,
	2: string driverName,
	3: string qrcode,
}

struct TTemplate {
  1:string title,
  2:string content,
}

struct TLocation {
    1: double longitude,
    2: double latitude,
}

struct TCoordinate {
    1: double  latitude,
    2: double  longitude,
}

struct TBatchSendSmsToDriverReq {
	1: string driverName,
	2: i32 driverNo,
	// 司机的电话号码
	3: string phone,
	4: string shift,
	5: i32 deliveryDate,
}

struct TUserGetAssignedDriverReq {
	1: i32 deliveryDate,
	2: string shift,
}

struct TUserFindSubPkgOfDeliveryJobsResp {
	1: string userName,
	2: i32 priority,
	3: string subPackageNumber,
	4: string boxNumber,
	5: bool isScanned,
}

enum TDeliveryPeriod {
	day = 0,
	night =1,
}

struct TGetPkgWithoutDeliveryDateReq {
	1: TDeliveryPeriod deliveryPeriod,
	2: double maxWeight,
	3: double minWeight,
}

struct TPkgInfoResp {
	1: string pkgNumber,
	2: i64 date,
	3: string shiptoAddr,
	4: i32 shipmentId,
	5: string telephone,
	6: string zipcode,
	7: double weight,
	8: string shipmentType,
}

struct TPkgInfosResp {
	1: list<TPkgInfoResp> pkgInfoResp,
	2: string msg,
}

service D2D {
	string AddDriver(1:TDriver driver),
	string DeleteDriver(1:i32 driverNo),
	string DeleteDrivers(1:list<i32> driverNos),
	string UpdateDriver(1:TDriver driver),
	TDriver FindDriverByNo(1:i32 driverNo),
	list<TDriver> FindDrivers(1:TFilter filter),
	TCoordinate PostcodeToCoordinate(1:string catalogCode, 2:string postcode),

	string AddPostCode(1:TPostCode postCode),
	string DeletePostCode(1:string id),
	string UpdatePostCode(1:TPostCode postCode),
	TPostCode FindPostCodeByID(1:string id),
	TPostCode FindPostCodeByCode(1:string catalogCode, 2:string code),
	list<TPostCode> FindPostCodes(1:string catalogCode, 2:i32 offset, 3:i32 limit),

	string AddPostCodeGroup(1:string catalogCode, 2:string name, 3:list<string> postCodes),
	string DeletePostCodeGroup(1:string id),
	string UpdatePostCodeGroup(1:TPostCodeGroup postCodeGroup),
	TPostCodeGroup FindPostCodeGroup(1:string id),
	list<TPostCodeGroup> FindPostCodeGroups(1:string catalogCode, 2:i32 offset, 3:i32 limit),

	list<TDeliveryJob> FindDeliveryJobs(1:TFilter filter, 2:bool isAssigned),
	list<TDeliveryJob> FindDriverDeliveryJobs(1:TFilter filter, 2:i32 driverNo),
	string UpdateDeliveryJob(1:TDeliveryJob job),
	string AddDeliveryJob(1:TDeliveryJob job),
	string AssignDeliveryJobs(1:list<string> jobIds, 2:i32 driverNo),
	string ReorderDeliveryJobs(1:list<string> jobIds),
	string UpdateDeliveryJobsLockStatus(1:list<string> ids, 2:bool isLocked),
	string DeleteDeliveryJobs(1:list<string> ids),
	string SyncPendingDeliveryJobs(1:TFilter filter),
	string AssignDeliveryJobsAutomatically(1:list<string> ids),
	string ConfirmInBatch(1:list<string> ids),
	list<TDeliveryJobSMS> PreviewSMS(1:list<string> ids),
	string SendSMS(1:list<TDeliveryJobSMS> msgs),
	TDeliveryJobRoute FindDeliveryJobRoute(1:string id),
	i32 FindDeliveryJobsNew(1:TFilter filter),
	string UpdateJobsShift(1:list<string> ids, 2:string shift),
	list<string> BatchSendSmsToDriver(1: list<TBatchSendSmsToDriverReq> msgs),

	// 日期格式：20161231
	list<TBoxNo> PrintBoxNo(1:list<string> driverNames, 2:i32 deliveryDate, 3:i32 fromIndex, 4:i32 toIndex),

	string Migrate(),
	string SyncDrviers(),

	//备份恢复
	string RestoreDataByBackup(1:string createBy, 2:i64 startTime, 3:string reqId)


	////////////////////////////////app接口 使用Delivery的登录接口////////////////
	list<TDeliveryJob> UserFindDeliveryJobs(1:TFilter filter),
	list<string> UserGetAssignedDriver(1:TUserGetAssignedDriverReq filter),
	// 获取该司机分配任务下的所有二级包裹号(如果标红为找不到的，司机端将不可见这些一级包裹)
	// 如果用户取消了某一个包裹，那么取消的包裹也显示在终端上。
	list<TUserFindSubPkgOfDeliveryJobsResp> UserFindSubPkgOfDeliveryJobs(1:TFilter filter),


	bool UserSyncLocation(1:TLocation location),
	// 获取上传图片去七牛的token使用Delivery的接口

    // 签收
 	string UserSignParcelReceived(1: string jobId, 2: string signatureImageKey, 3: i32 rating),

	// 添加备注和备注图片
	string UserAddRemark(1: string jobId, 2: string remark, 3: string remarkImage),

	//发送信息
	string UserSendSmsMsg(1:list<string> jobIds,2:TTemplate template),

 	//获取备注模板
	list<TTemplate> UserGetReMarkTemplates(),

	//获取短息模板
	list<TTemplate> UserGetSMSTemplates(),

	//邮编搜索
	TPostCode PostCodeSearch(1: string catalogCode, 2: string postcode),

	//获取没有派送时间的包裹
	TPkgInfosResp GetPkgWithoutDeliveryDate(1: TDeliveryPeriod deliveryPeriod),

	//获取没有派送时间的包裹新
	TPkgInfosResp GetPkgWithoutDeliveryDateNew(1: TGetPkgWithoutDeliveryDateReq getPkgWithoutDeliveryDateReq),

	//设置没有派送时间的包裹的派送时间
	string SetPkgWithoutDeliveryDate(1: list<i32> shipmentIds,2: i64 date, 3: bool sendNotification),
}
