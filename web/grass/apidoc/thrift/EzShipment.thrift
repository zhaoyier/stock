namespace * EzShipment
namespace go ezbuy.apidoc.gen.ezshipment
namespace javascript TRPC
namespace java com.daigou.sg.rpc.ezshipment
namespace swift TRShipment

include "Common.thrift"
include "PrimeOrder.thrift"

enum TPackageAction {
	None = 0
	ArrangeDelivery = 1
	Acknowledge = 2
	Pay = 3
	ConfirmTheDelivery = 4
}

struct TPackage {
	1:required i32 id;						//包裹id
	2:required string purchaseType;			//采购方式
	3:required string packageNumber;		//包裹号
	4:required string packageEtaDate;		//包裹到达预期日期
	5:required string chargeWeight;			//计费重
	6:required string shipmentTypeCode;		//运输方式编号
	7:required string altShipmentTypeName;	//运输方式名
	8:required string warehouseCode;		//仓库
	9:optional string arrivedDate;			//到达日期
	10:optional string shippedDate;			//起运日期
	11:optional string collectionDate;		//揽收日期
	12:required double totalFee;			//总费用
	13:required double packageWeight;		//包裹重量
	14:required string createDate;			//包裹生成日期
	15:required string status;
	16:optional TPackageAction action;
	17:required i32 itemCount;
	18:optional list<string> itemPics;
	19:optional Common.TServiceType serviceType;
	20:required i32 paymentID;
	21:required string paymentNumber;
	22:optional Common.TCommonItem relatedItem;
	23:optional string packageIdEncryption;
	24:optional string shiptoname;
	25:optional string shiptophone;
	26:optional string localDeliveryMethod;
	27:required bool hasOtherParcels;
	28:required string billType;
	29:required string billId;
	30:required i32 shipmentId;
}

struct TPackageDetail {
	1:required TPackage package;						//包裹信息
	3:required list<Common.TOrderSimple> orders;				//订单列表
	4:optional list<TParcelRemark> remarks;	//备注
	5:required bool deliveryEditable;
	6:optional list<PrimeOrder.TTitleValueItem> deliveryInfos;
	7:optional list<PrimeOrder.TTitleValueItem> billInfos;
	8:optional string imageUrl; //非Home类型的站点图片
	9:required bool canCancelDelivery; //能否取消小货不选日期的包裹
	10:required i64  deliveryDate; //小货不选日期包裹的派送日期
	11:required i32  pickupPeriodId; //小货不选日期包裹的时间段Id
}

struct TParcelRemark {
	1:required i32 id;				//备注id
	2:required string remark;		//内容
	3:required bool needReply;		//是否需要回复
	4:optional string attachments;	//附件
	5:required string createDate;	//创建日期
	6:required string creator;		//创建者
}

struct TShipmentDomain {
	1:required string name;//筛选条件名称
	2:required string code;//筛选条件的Code
	3:required i32 count;//筛选条件所对应的shipment数量
}

struct TLimitationDamages{
	1:required bool isDelayed; //是否是赔付包裹
	2:required bool hasClaimedCompensation; //是否已领取赔付
	3:required double amount; //赔付总额
	4:required double amountLocal; //赔付总额RMB
	5:required list<TOrderLimitationDamages> orderInfo;
}

struct TOrderLimitationDamages{
	1:required i32 orderId; 
	2:required string orderNumber; 
	3:required double amount; 
	4:required double amountLocal; //赔付总额RMB
	5:required list<TOrderLog> orderLogs;
}

struct TOrderLog{
	1:required i32 id; 
	2:required string orderStatus; 
	3:required string updateDate; 
}

struct TPackageGroup{
	1:required list<TPackage> packages; 
	2:required bool isShowOtherParcelsButton;
	3:required TPackageAction action;
}


service EzShipment {

	/// <summary>
	/// 获取包裹明细
	/// </summary>
	/// <param name="packageId">包裹id</param>
	/// <returns>包裹明细</returns>
	TPackageDetail GetPackageDetail(1:i32 packageId),
	
	/// <summary>
	/// 获取包裹明细
	/// </summary>
	/// <param name="packageNo">包裹号</param>
	/// <returns>包裹明细</returns>
	TPackageDetail GetPackageDetailByNo(1:string packageNo),
	
	/// <summary>
	/// 获取包裹列表
	/// </summary>
	/// <param name="packageId">包裹id</param>
	/// <returns>包裹明细</returns>
	list<TPackage> UserGetShipmentPackages(1:i32 offset, 2:i32 limit),

	/// <summary>
	///通过Domain获取包裹列表
	/// </summary>
	/// <param name="packageId">包裹id</param>
	/// <returns>包裹明细</returns>
	list<TPackage> UserGetShipmentPackagesByDomain(1:string filterDomainCode,2:i32 offset, 3:i32 limit),

	/// <summary>
	///通过Domain获取包裹Group列表
	/// </summary>
	list<TPackageGroup> UserGetShipmentPackageGroupsByDomain(1:string filterDomainCode,2:i32 offset, 3:i32 limit),
	
	/// <summary>
	///通过包裹Id获取关联包裹列表
	/// </summary>
	TPackageGroup UserGetRelatedPackages(1:i32 packageId),
	
	/// <summary>
	///通过获取Acknowledge包裹列表
	/// </summary>
	/// <returns>包裹列表</returns>
	list<TPackage> UserGetAcknowledgeShipmentPackages(1:i32 offset, 2:i32 limit),
	
	/// <summary>
	///获得筛选条件
	/// </summary>
	/// <return>筛选条件Domain</returns>
	list<TShipmentDomain> UserGetShipmentDomain(),
	
	/// <summary>
	/// 确认收货
	/// </summary>
	Common.TCommonResult UserConfirmTheDelivery(1:i32 packageId),
	
	TLimitationDamages UserGetPackageLimitationDamages(1:i32 packageId),

}
