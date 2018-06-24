namespace * PrimeOrder
namespace csharp Zen.DataAccess.Order
namespace javascript TRPC
namespace objc TR
namespace java com.daigou.sg.rpc.primeorder
namespace swift TR
namespace go ezbuy.apidoc.gen.primeorder

struct TPrimeOrderDetail{
	1:required i32 id;					//订单id
	2:required string orderNumber;		//订单号
	3:required string productImage;		//商品图片
	4:required string productName;		//商品名称
	5:optional bool gstFee;				//GST费
	6:required bool insured;			//保险
	7:required i32 qty;					//数量
	8:optional string sellerDiscount;	//合作卖家国际运费折扣
	9:required i32 packageId;
	10:required string unitPrice;  	    //产品单价
	11:required string sku;				//Sku信息
	12:required string remark;          //商品备注
	13:required string productUrl; //商品链接地址
	14:required list<TPrimeOrderRemark> orderRemarks;
	15:required bool isRejected;
	16:required list<TOffset> offsets;
	17:required string originCode;      //产品来源
	18:required string domesticShippingFee; //国内运费
}

struct TPrimeOrderRemark {
	1:required i32 id;				//订单备注id
	2:required string remark;		//内容
	3:required bool needReply;		//是否需要回复
	4:optional string attachments;	//附件
	5:required string createDate;	//创建日期
	6:required string creator;		//创建者
	7:optional i32 offsetId;		//差额补齐id
	8:required i32 remarktype;
}

struct TOffset {
	1:required i32 id;				//差额补齐id
	2:required string balanceType;	//类型
	3:required double localTotal;	//总额
	4:required string note;			//备注
	5:required string createDate;	//创建日期
	6:required bool   canCancel;	//是否可以取消
}

struct TPrimePaymentBill {
	1:required i32 id;						//付款id
	2:required string paymentNumber;		//付款号
	3:required string total;				//金额
	4:required string chargeWeight;			//计费重
	5:required string packageWeight;		//重量
	6:required list<TPrimePaymentBillCategory> paymentBillDetails	//付款明细项
	7:required string paymentStatus;		//付款状态: 待支付（unpaid）, 已支付（paid），已取消（cancelled）
	8:required string createDate;			//创建时间
	9:required string paymentType;			//付款类型
}

struct TPrimePaymentBillCategory {
    1:required string billCategoryCode;
    2:required string billCategoryName;
    3:required string altBillCategoryName;
    4:required string total;
}

struct TTitleValueItem {
	1:required string title;
	2:required string value;
}

struct TPrimeShipment {
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
	22:required string status;						// 状态标识：通常（normal），可安排（arrangable），已安排（arranged），已完成等待评论（acknowledgable），已完成已评论（acknowledged）
	23:required list<TPrimeOrderDetail> tOrder;
	24:required list<string> packageNumbers;
	25:required list<TTitleValueItem> shipmentDetailItems;
	26:required string eta;	  						//预计到达时间
	27:required string statusDisplayText;			//状态显示文本
	28:required list<i32> packageIds;
	29:required i32 pickupPeriodId; //小货不选日期包裹的时间段Id
	30:required bool canEdit; 
	31:required bool canCancel; 
}

struct TPrimeOrder{
	1:required TPrimePaymentBill paymentBill;
	2:required list<TPrimeShipment> shipments;
}

service PrimeOrder {

	/// <summary>
	/// 获取Prime Order列表
	/// </summary>
	/// <returns>Prime Order列表</returns>
	list<TPrimeOrder> UserGetPrimeOrderList(1:i32 offset, 2:i32 limit),

	/// <summary>
	/// 获取Prime Order详情
	/// </summary>
	/// <returns>Prime Order详情</returns>
	TPrimeOrder UserGetPrimeOrderDetail(1:i32 primeOrderId),

    /// <summary>
    /// 获取用户处于Pending Reply状态的Prime订单
    /// </summary>
    list<TPrimeOrderDetail> UserGetPrimePendingReplyOrders(1:i32 offset, 2:i32 limit),

    /// <summary>
    /// 获取用户处于Pending Reply状态的Prime订单的总数量
    /// </summary>
    i32 UserGetCountOfPrimePendingReplyOrders(),
	
	/// <summary>
    /// 获取Prime Order列表总数量
    /// </summary>
    i32 UserGetPrimeOrderCount()
}
