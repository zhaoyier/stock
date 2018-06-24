namespace objc TRParcel
namespace java com.daigou.sg.rpc.parcel
namespace csharp Zen.DataAccess.ParcelModule.Entity
namespace javascript TRPC
namespace swift TRParcel

include "Common.thrift"

struct TParcelProduct {
	1: required string name;
	2: required string desc;
	3: required string url;
	4: required string pic;
	5: required i32 quantity;
}

struct TParcelDetailItem {
	1: required string name;
	2: required string value;
	3: required bool isValueHighlighted;
}

struct TParcelSection {
	1:required string title;
	2:required list<TParcelDetailItem> items;
}

struct TParcel {
	1:required string parcelNumber;
	2:required list<TParcelSection> sections;
	3:required list<TParcelProduct> products;
}

struct TPackage {
    1:required i32 packageId;
    2:required string purchaseType;
    3:required string packageNumber;
    4:required string packageEtaDate;
    5:required string chargeWeight;
    6:required string shipmentTypeCode;
    7:required string altShipmentTypeName;
    8:required string warehouseCode;
    9:required string arrivedDate;
    10:required string shippedDate;
    11:required string collectionDate;
    12:required double totalFee;
    13:required double packageWeight;
    14:required string createDate;
    15:required bool needConfirmOffset;
    16:required string packageStatusCode;
    17:required i32 paymentBillId;
}

struct TParcelSummary {
	1:required string parcelNumber;
	2:required list<string> pics;
	3:required list<TParcelDetailItem> items;
	4:required bool hasPendingPayment;
	5:required bool canArrangeDelivery;
	5:required bool canArrangeEzbuyDelivery;
}

struct TParcelDeliveryInfo {
	1:required string deliveryMethodName;
	2:required string title;
	3:required string deliveryPic;
	4:required string address;
	5:required string recipient;
	6:required string phone;
	7:required list<string> dates; 	// 格式：dd/MM/yyyy DayOfWeek
	8:required string desc;
}

struct TParcelDeliveryInfoExt {
	1:required string deliveryMethodName;
	2:required string title;
	3:required string deliveryPic;
	4:required string address;
	5:required string recipient;
	6:required string phone;
	7:required list<string> dates; 	// 格式：dd/MM/yyyy DayOfWeek
	8:required string desc;
	9:required double weight;
	10:required string deliveryMethodCode;	//派送方式编号
	11:required i32 deliveryMethodId;	//派送方式ID
	12:optional string deliveryDate;	// 配送时间
	13:optional string deliveryTimeSlot;	// 配送时间段
	14:required bool isDateAndTimeEditable;	// 配送时间是否可以编辑
	15:required bool isDayOrNightEditable;	// 小货不选时段的配送时间是否可以编辑
	16:optional Common.TCommonOptionItemWithId pickupPeriod; // 小货不选时段的已经选取配送时间		
	17:optional list<Common.TCommonOptionItemWithId> dayOrNightPeriodList // 小货不选时段的配送时间列表
}

struct TParcelInfo {
	1:required i32 packageId;						//包裹id
	2:required string purchaseType;					//采购方式
	3:required string packageNumber;				//包裹号
	4:required string packageEtaDate;				//包裹到达预期日期
	5:required string chargeWeight;					//计费重
	6:required string shipmentTypeCode;				//运输方式编号
	7:required string altShipmentTypeName;			//运输方式名
	8:required string warehouseCode;				//仓库
	9:optional string arrivedDate;					//到达日期
	10:optional string shippedDate;					//起运日期
	11:optional string collectionDate;				//揽收日期
	12:required double totalFee;					//总费用
	13:required double packageWeight;				//包裹重量
	14:required string createDate;					//包裹生成日期
	15:required bool needConfirmOffset;
	16:required string packageStatusCode;
	17:required i32 paymentBillId;
	18:required double activePay;
	19:required string packageStatusName;
	20:required i32 shipmentId;
	21:required bool isEzShipping;
	22:required string shipmentTypeName;
	23:required string warehouseName;
	24:required string localDeliveryMethod;
	25:required string shipmentMethod;
}

struct TShipment {
	1:required i32 shipmentId;
	2:required string localDeliveryMethod;
	3:required string stationName;
	4:required string periodName;
	5:required string localDeliveryDate;
	6:required string shipToAddress;
	7:required string shipToName;
	8:required string shipToPhone;
	9:required string shipToZip;
	10:required string shipToCity;
	11:required string shipToState;
	12:required string regionName;
	13:required string regionId;
	14:required string mrtStationItemId;
	15:required string neighbourhoodStationItemId;
	16:required i32 selfStationId;
	17:required double total;
	18:required string dayOfWeek;
	19:required bool isEzShipping;
	20:required bool canBeEdited;
	21:required string paymentNumber;
	21:required list<TParcelInfo> tPackage;
}

struct TParcelDetailInfo {
	1:required i32 arrivedCount;
	2:required i32 notArrivedCount;
	3:required list<TParcelInfo> tPackage;
}

struct TPaymentBillCategory {
	1:required string billCategoryCode;		//付款明细编号
	2:required string billCategoryName;		//英文名
	3:required string altBillCategoryName;	//中文名
	4:required string total;				//金额
}

struct TPaymentBill {
	1:required i32 id;						//付款id
	2:required string paymentNumber;		//付款号
	3:required string total;				//金额
	4:required string chargeWeight;			//计费重
	5:required string packageWeight;		//重量
	6:required list<TPaymentBillCategory> paymentBillDetails	//付款明细项
	7:required string paymentStatus;		//付款状态
	8:required string createDate;			//创建时间
	9:required string paymentType;			//付款类型
}

struct TOrder{
	1:required i32 orderId;					//订单id
	2:required string orderNumber;			//订单号
	3:required string productImage;			//商品图片
	4:required string productName;			//商品名称
	5:optional bool gstFee;					//GST费
	6:required bool insured;				//保险
	7:optional string sellerDiscount;		//合作卖家国际运费折扣
	8:required double weight;
	9:required double volumeWeight;
	10:required string wayBill;
	11:required string alternative;
	12:required string shipperName;
	13:required string vendorName;
	14:required string originCode;
	15:required string warehouseCode;
	16:required i32 shipmentTypeId;
	17:required i32 purchaseSourceId;
	18:required string payDate;
}

struct TOrderDetailRemark {
	1:required i32 orderRemarkId;				//订单备注id
	2:required string remark;					//内容
	3:required bool needReply;					//是否需要回复
	4:optional string attachment;				//附件
	5:required string createDate;				//创建日期
	6:required string creator;					//创建者
	7:optional i32 offsetId;					//差额补齐id
	8:required string remarkFlag;
}

struct TPackageDetail {
	1:required TPackage tPackage;						//包裹信息
	2:required TPaymentBill paymentBill;		//账单信息
	3:required list<TOrder> orders;				//订单列表
	4:optional list<TOrderDetailRemark> orderRemarks;	//备注
}

struct TPaymentBillCategory {
    1:required string billCategoryCode;
    2:required string billCategoryName;
    3:required string altBillCategoryName;
    4:required string total;
}

struct TPackageInfo {
    1:required TPackage tPackage;
    2:required list<TPaymentBillCategory> paymentItems;
}

struct TCustomerComment {
	1:required i32 customerCommentId;				
	2:required string serviceComment;					
	3:required string serviceQuality;					
	4:optional string caption;				
	5:required string comment;				
	6:required list<TParcelInfo> packages; 	
}

struct TInvoiceInfo {
	1:required string payDate;
	2:required i32 paymentBillId;
	3:required string paymentNumber;
	4:required string payStatus;
	5:required string chargeWeight;
	6:required string createDate;
	7:required list<TPaymentBillCategory> packageBillDetail;
	8:required i32 packageId;
	9:required string packageNumber;
	10:required string packageWeight;
	11:required string productTotalPrice;
	12:required string total;
}

struct TParcelSummaryItem {
	1:required i32 packageCount;
	2:required i32 sortBy;
	3:required string statusCode;
	4:required string statusName;
}

struct TArrangeDeliveryBill {
	1:required double totalFee;						//总费用
	2:required list<TPackageInfo> packageBills;	    //包裹账单列表
	3:required bool couponUsed;						//折扣券是否可使用
	4:required string couponErrorMessage;			//折扣券错误信息
	5:required double prepay;
}

service Parcel {
	list<TParcelSummaryItem> UserGetParcelSummary(),
	list<TParcelInfo> UserGetParcelByStatusCode(1:string statusCode, 2:i32 offset, 3:i32 limit),
	list<TShipment> UserGetParcelPendingPayment(1:i32 offset, 2:i32 limit),
	list<TShipment> UserGetPendingCollectionParcel(1:i32 offset, 2:i32 limit),
	TPackageDetail UserGetParcelDetail(1:string packageNumber),

	TParcelDetailInfo UserFindForDelivery(1:i32 offset, 2:i32 limit),
	list<TParcelSummary> UserGetParcelSummaryList(1:i32 offset, 2:i32 limit),
	TParcel UserGetParcel(1:string parcelNumber),
	TParcelDeliveryInfo UserGetParcelDeliveryInfo(1:string parcelNumber),
	list<string> UserGetDeliveryTimeSlots(1:string parcelNumber, 2:string date),
	string UserArrangeParcelDelivery(1:string parcelNumber, 2:string recipient, 3:string phone, 4: string deliveryDate, 5: string timeSlot),
	list<TParcelInfo> UserGetAcknowledgeParcels(),
	list<TCustomerComment> UserGetCompletedPackageWithComment(),
	TArrangeDeliveryBill UserGetBuyForMeFeeByPackageIds(1:list<i32> packageId, 2:string deliveryMethod, 3:i32 voucherId, 4:string couponCode),
	TArrangeDeliveryBill GetBuyForMeFeeByPackageIds(1:list<i32> packageId,2:string deliveryMethod,3:i32 voucherId,4:string couponCode),
	TInvoiceInfo UserGetInvoiceByPackageId(1:i32 packageId),
	bool UserSaveAcknowledge(1:list<i32> packageIds, 2:string level, 3:string subject, 4:string comment),
	TParcelDeliveryInfoExt UserGetParcelDeliveryInfoWithWeight(1:string parcelNumber),

	list<string> UserGetDeliveryDates(1:string parcelNumber , 2:string deliveryMethod , 3:i32 deliveryMethodId),
	list<string> UserGetDeliveryTimeSlotsByDeliveryMethod(1:string parcelNumber , 2:string deliveryMethod , 3:i32 deliveryMethodId, 4:string date),
}
