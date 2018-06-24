namespace csharp Zen.DataAccess.MYShipment
namespace objc TRMYShipment
namespace java com.daigou.sg.rpc.my.customer
namespace javascript TRPC
namespace swift TR

struct TSelfStation {
	1:required i32 id;					//自取点id
	2:required string stationName;		//自取点名
	3:required string stationAddress;	//自取点地址
	4:required string telephone;		//联系电话
	5:required double maxWeight;		//最大派送重量
	6:required i32 aheadOfDay;			//提前派送天数
	7:required double longitude;		//经度
	8:required double latitude;			//维度
	9:required string mapUrl;			//地图
}

/*
特殊deliveryMethodCode列表(有空格):
	Home Delivery
	McDonald
*/
struct TMYCollectionMethod {
	1:required string deliveryMethodCode;	//派送方式编号
	2:required string deliveryMethodName;	//派送方式
	3:required string desc;					//描述
	4:optional double minFee;				//最小费用
	5:optional double minWeight;			//最小收费重量
	6:optional double maxFee;				//最大费用
	7:optional double maxWeight;			//最大收费重量
	8:optional double nightMaxWeight;		//晚上最大送货重量
	9:optional bool hasSubMethods;			//是否有子派送方式
	10:optional list<TSelfStation> stations;	//派送站点
}

struct TArrivedOrder {
	1: required i32 id;				        //订单Id
	2: required string orderNumber; 		//订单号
	3: required string productName			//商品名称
	4: required string productImage;		//图片信息
	5: required string originCode;			//采购地区
	6: required string vendorName;			//卖家名称
	7: required string warehouseCode;		//仓库Code
	8: required string shipmentTypeId;		//运输方式Id
	9: required string altShipmentTypeName;	//运输方式显示
	10:optional string orderDiscount; 		//享受折扣信息
	11:optional double chargeWeight; 		//chargeWeight
	12:optional double orderWeight; 		//orderWeight
}

struct TArrivedBill {
	1:required double totalWeight; 	//总重量
	2:required double chargeWeight; //ChargeWeight
	3:required double totalFee; //总费用
	4:required list<TArrivedBillDetails> packageBillDetails;
	5:required double prepay;   //余额
	6:required i32 arrivedBillStatus; //0：ok,1：coupon未找到，2:Coupon Code是否过期，4: coupon 已使用，8：该会员的等级适用于此Coupon，16: 此coupon 未开启
}

//账单明细
struct TArrivedBillDetails {
	1:required string billCategoryName; 	//账单名称
	1:required double total; 				//费用
}

//此实体有两个用途
//1:用来提交获取账单时，不需要输入selfStationName，shipToName，shipToPhone，licenseNumber
//2:用来生成账单，则需要所有属性
struct TSubmitParcel {
	1: required list<i32> orderIds;			//订单Ids集合
	2: required string shipmentTypeCode; 	//运输方式Code
	3: required string originCode; 			//采购地区
	4: required string warehouseCode; 		//仓库Code
	5: required string localDeliveryMethod; //用户本地派送, Home / SelfCollection
	6: optional i32 customerAddressId;		// 用户地址Id, for Home
	7: optional i32 selfStationId;			// 自取点类型Id , Mac / 电器
	8: optional string shipToName;			// 收货人, for self
	9:optional string shipToPhone;			// 收货人电话, for self
	10:optional string licenseNumber;		//车牌号, for self, mac
	11:optional string periodName;			//送货时间段
	12:optional string coupon;				//折扣券
	13:optional i32 credit;  				//积分
	14:optional bool insurance;  			//保险
}

///创建账单的状态
struct TCreatedPaymentBillStatus{
    1: required bool status;				//状态
	2: required i32 shipmentId; 			//运输方式Id
	3: required bool isPayed; 				//是否已付款
	4: required string paymentNumber; 		//付款号
	5: required string submitMessage;		//提交消息
}

///创建积分信息
struct TCredit{
    1: required i32 credit;				//积分
	2: required i32 offset; 			//积分对应的面值
	3: required string imageUrl;		//图片信息
	4: required string title;			//名称		
}


service MYShipment {	

	/// <summary>
	/// 提交马来账单
	/// </summary>
	/// <param name="TSubmitParcel"></param>
	/// <returns>
	///</returns>
	TCreatedPaymentBillStatus UserSubmitShipment(1:TSubmitParcel submitParcel),

	list<TMYCollectionMethod> GetCollectionMethods(),
	list<TMYCollectionMethod> GetCollectionMethodsByOrigin(1: string originCode),

	list<TMYCollectionMethod> GetCollectionSubMethods(1: string deliveryMethodCode),

	list<string> GetStationTimes(1: i32 stationId),

	list<TArrivedOrder> UserGetArrivedOrders(1:string shipmentTypeCode, 2: string originCode, 3:string warehouseCode),

	TArrivedBill UserGetArrivedOrdersBill(1:list<i32> orderIds, 2:string shipmentTypeCode, 3:string originCode,
            4:string warehouseCode, 5:string localDeliveryMethod, 6:i32 customerAddressId, 7: i32 stationId, 8: string coupon, 9: i32 credit),

	list<TCredit> UserGetCredits(),

	string UserGetPackageLogisticsStatus(1:i32 packageId),

    //获取马来需要提交的订单
    list<TArrivedOrder> UserGetMYShipForMeArrivedOrders(1:string shipmentTypeCode, 2: string originCode, 3:string warehouseCode),

	//获取马来的账单
	TArrivedBill UserGetMYShipForMeArrivedOrdersBill(1:list<i32> orderIds, 2:string shipmentTypeCode, 3:string originCode,
            4:string warehouseCode, 5:string localDeliveryMethod, 6:i32 customerAddressId, 7: i32 stationId, 8: string coupon, 9: i32 credit,10: bool insurance),
    //提交马来的账单
	TCreatedPaymentBillStatus UserSubmitMYShipForMeShipment(1:TSubmitParcel submitParcel),
}
