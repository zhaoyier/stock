namespace objc TRCheckout
namespace java com.daigou.sg.rpc.checkout
namespace csharp Zen.DataAccess.CheckoutModule.Entity
namespace javascript TRPC
namespace swift TR
namespace go ezbuy.apidoc.gen.checkout

include "ShoppingCart.thrift"
include "Common.thrift"

// 账单明细项目
struct TBillDetail {
	1:required string billCategoryName; 				//账单名称
	2:required double total; 							//费用
}

// 购物车checkout账单
struct TCartBill {
	1:required bool isEzBuy; 					        //此次付款是否是ezShipping
	2:required i32 productCount; 						//账单中的商品总数
	3:required i32 sensitiveProductCount; 				//账单中的敏感商品总数
	4:required double totalFee;   						//总费用，已转为采购地区的的货币
	5:required double prepay;							//余额
	6:required list<TBillDetail> billDetails; 			//包裹账单明细列表
	7:required bool isCouponValid;						//Coupon如果有输入，是否有效
	8:required double weight;							//商品重量
	9:required list<string> validVoucherCodes; 			//基于现在voucher中调整后可用的voucher
}

struct TCollectStation {
	1:required i32 id;					//自取点id
	2:required string stationName;		//自取点名
	3:required string stationAddress;	//自取点地址
	4:required string telephone;		//联系电话
	5:required double maxWeight;		//最大派送重量
	6:required i32 aheadOfDay;			//提前派送天数
	7:required double longitude;		//经度
	8:required double latitude;			//维度
	9:required string imageUrl;			//图片地址，这里应该是一个七牛的图片key, 也就是说客户端可以随意获取自己想要的规格
	10:required string desc;    		//描述信息
	11:required string shortDesc;    	//简要描述信息
	12:optional string originalFee;
	13:optional string deliveryFee;
	14:optional bool isFree;
	15:optional string unavailableReason;
	16:optional bool isUnavailable;
}

struct TDeliveryAddress {
	1:required i32 addressID;
	2:required string deliveryMethodCode;
	3:required string deliveryMethodName;
	4:required string deliveryTypeCode;	// 根配送方式的Code，如Home，Warehouse等
	5:required string address;
	6:required string recipient;
	7:required string phone;
	8:optional list<TDeliveryMethodExtension> deliveryMethodExtensions;
	9:required double maxWeight; // 重量限制
	10:optional Common.TCommonOptionItemWithId pickupPeriod; //时间段Id和名字
}

/*
deliveryMethodCode列表:
	History
	Home
	TaisengOffice
	McDonald
	MRT
	Neighbourhood
	Warehouse
*/
struct TDeliveryMethod {
	1:required string deliveryMethodCode;	//派送方式编号
	2:required string deliveryMethodName;	//派送方式名称
	3:required string desc;					//描述
	4:optional double minFee;				//最小费用
	5:optional double minWeight;			//最小收费重量
	6:optional double maxFee;				//最大费用
	7:optional double maxWeight;			//最大收费重量
	8:optional double nightMaxWeight;		//晚上最大送货重量
	9:optional bool hasSubMethods;			//是否有子派送方式
	10:optional list<TCollectStation> stations;	//派送站点
	11:optional list<TDeliveryMethodExtension> deliveryMethodExtensions; //送货点的扩展
	12:optional bool isFree;				//是否免费
 	13:optional string deliveryFeeInfo;		//派送费描述
	14:optional list<TDeliveryMethod> subMethods;
}

//选择派送方式的扩展
struct TDeliveryMethodExtension{
	1:required string type; 				//扩展的控件类型，目前只有麦当劳有用到，需要输入车牌信息，是个输入框。其默认值为：input
	2:required string name; 				//显示名称
	3:required string value; 				//名称对应的值
}

// 购物车Checkout所需要的参数
struct TCartCheckoutInfo {
	1: required string checkoutType; 		//checkout类型，ezbuy / buy4me
	2: required string originCode; 			//采购地区
	3: optional string shippingMethod; 		//国际物流方式,
	4: optional string deliveryMethod; 		//用户本地派送,Home，MRT，SelfCollection，Neighbourhoodstation，TaisengOffice
	5: optional i32 deliveryMethodId;		//本地派送是Home，
											//那么deliveryMethodId=CustomerAddressId，
											//是MRT，那么deliveryMethodId=stationId,
											//是Warehouse，deliveryMethodId=stationId
											//是Neighbourhoodstation，deliveryMethodId=stationId
	7:optional string receipient;			// 收货人
	8:optional string phone;				// 收货人电话
	9:optional string coupon;				//折扣券
	10:optional i32 credit;  				//积分 - 需要抵扣的当地货币金额如果不需要抵扣，则为0
	11:optional string deliveryDate			//派送日期
	12:optional string deliveryTimeSlot;	//送货时间段
	13:optional bool insured;  				//保险
	14:optional string warehouse;  			//仓库
	15:optional bool isAuthorizeBalance;  	//buy4me 是否允许差额补齐
	16:optional list<TDeliveryMethodExtension> deliveryMethodExtensions; //送货点的扩展信息
	17:optional bool isDeferPay;			//是否延迟付款
	18:optional i32 pickupPeriodId;			//时间段Id
}



// 生成商品账单返回的状态
struct	TCheckoutResult {
    1: required bool status;				//状态
	2: required i32 shipmentId; 			//运输方式Id
	3: required bool isPayed; 				//是否已付款
	4: required string paymentNumber; 		//付款号
	5: required string submitMessage;		//提交消息
	6: required string transactionId;		//付款号
	7: required double topupAmout;
	8: required string paymentIDs;			//付款ID, 逗号分割同paymentNumber
	9: required string encryptShipmentId;	//加密的shipmentID
	10:required string encryptPaymentNumbers;//加密的paymentNumbers
	11:required string encryptPackageIds;	//加密的packageids
	12:required string encryptPaymentId;	//加密的paymentid
	13:optional string friendsDealGroupId;  //拼团的groupid
	14:required bool isCreditCardOnly;      //待付款订单是否只能用信用卡支付
	15:required string billIds;	
	16:required string billType;
	17:required string newOrderId;  //先给拼团用的。
}

struct TCheckoutForm {
	1: required bool isEzBuy;
	2: required i32 sensitiveItemCount;
	3: required string shippingMethodCode;      // 以“UNAVAILABLE”的特定值指定不可提交的Shipping Method
	4: required string shippingMethodName;      // 在非一次付款过程中，如所有商品shipping method都有选择，但是不是完全相同的情况下，shippingMethodName为“Multiple”，shippingMethodCode为“”；如有商品没有选择shipping method，shippingMethodName为“2 Unselected”（2替换为没有选择shipping method的商品数量），shippingMethodCode为“UNAVAILABLE”
	5: required string shippingMethodDesc;
	6: required string deliveryMethod;
	7: required i32 deliveryMethodId;
	8: required string deliveryMethodName;
	9: required string deliveryMethodDesc;
	10: required bool insured;
	11: required i32 credit;
	12: optional string receipient;
	13: optional string phone;
	14: required i32 itemCount;
	15: optional double weight;
	16: required bool containsFlashSalesProduct;	//当前购物车中是否包含闪购商品
	17: required string msg;						//返回消息，为空说明可以提交，否则提示msg
	18: required list<TCartShippingMethodResult> shippingMethodGroup // 根据originCode分组的shippingmethod
}

struct TCartShippingMethod {
	1: required string code;
	2: required string name;  // buy4me中，如所有商品shipping method都有选择，但是不是完全相同的情况下，shippingMethodName为“Multiple”，available为true；如有商品没有选择shipping method，shippingMethodName为“2 Unselected”（2替换为没有选择shipping method的商品数量），available为false
	3: required string desc;
	4: required double cost;
	5: required bool available;
	6: optional i64 latestETA; // 最晚到达日期，timestamp from 1970，缺省或者为负数表示没有eta
}

struct TCartWarehouseAddress{
	1: required string code;
	2: required string name;
	3: required bool available;
}

struct TCartShippingMethodResult {
	1: required list<TCartShippingMethod> methods;
	2: required list<i32> sensitiveCartItemIds;
	3: required string originCode;
}

struct TCartWarehouseAddressResult {
	1: required list<TCartWarehouseAddress> warehouseItems;
	2: required string originCode;
}

struct TPrimeCartCheckoutInfo{
	1: required string deliveryMethod; 		//用户本地派送,Home，MRT，SelfCollection，Neighbourhoodstation，TaisengOffice
	2: required i32 deliveryMethodId;		//本地派送是Home，
											//那么deliveryMethodId=CustomerAddressId，
											//是MRT，那么deliveryMethodId=stationId,
											//是Warehouse，deliveryMethodId=stationId
											//是Neighbourhoodstation，deliveryMethodId=stationId
	3:required string receipient;			// 收货人
	4:required string phone;				// 收货人电话
	5:optional list<TDeliveryMethodExtension> deliveryMethodExtensions; //送货点的扩展信息
	6:optional string coupon;				// 优惠券信息
	7:optional bool isDeferPay;				//是否延迟付款
}

struct TTopupResult{
	1:required string htmlRequest;
	2:required string message;
	3:required bool enableTopup;
	4:optional string topUpNumber;
	5:optional double amount;
}

struct TReArrangeDeliveryInfo{
	1:required string deliveryMethod; 		//用户本地派送,Home，MRT，SelfCollection，Neighbourhoodstation，TaisengOffice
	2:required i32 deliveryMethodId;		//本地派送是Home，
											//那么deliveryMethodId=CustomerAddressId，
											//是MRT，那么deliveryMethodId=stationId,
											//是Warehouse，deliveryMethodId=stationId
											//是Neighbourhoodstation，deliveryMethodId=stationId
	3:required string receipient;			// 收货人
	4:required string phone;				// 收货人电话
	5:optional list<TDeliveryMethodExtension> deliveryMethodExtensions; //送货点的扩展信息
	6:required string parcelNumber;			//需要重新安排的包裹号
	7:optional string deliveryDate			//派送日期
	8:optional string deliveryTimeSlot;		//送货时间段
	9:optional i32 pickupPeriodId;			//时间段Id
}

struct TReArrangeDeliveryResult{
	1:required string message;
	2:required bool status;
}

// 优惠券
struct TCheckoutVoucher {
	1: required string code;	// 业务内标识
	2: required bool available;	// 是否可选（基于当前选择）
	3: required bool expired; 	// 是否过期
	4: required string name; 	// 名称
	5: required string desc; 	// 描述
	6: optional string pic; // 图片地址
}

struct TCheckoutVoucherGroup {
	1: required string name;	// 组名
	2: required list<TCheckoutVoucher> vouchers;	// 优惠券
}

struct TGroupBuyCheckoutInfo {
	1:required string groupbuyNo
	2:required ShoppingCart.TAgentProduct agentProduct
	3:required TCartCheckoutInfo checkoutInfo
}

struct TComCartCheckoutSubmission {
	1: required TComCartCheckoutInfo checkoutInfo;
	2: optional bool isDeferPay;			//是否延迟付款
}

struct TComCartBill {
	1:required TComCartCheckoutInfo checkoutInfo;
	2:required double totalFee;   						//总费用，已转为采购地区的的货币
	3:required double prepay;							//余额
	4:required list<TBillDetail> billDetails; 			//包裹账单明细列表
}

struct TOriginCheckoutInfo {
	1: required string originCode; 			//采购地区
	2: optional TCartShippingMethod shippingMethod; 		//国际物流方式,
	3: optional string warehouse;  			//仓库
	4: optional i32 weight;  // 重量
}

struct TComCartCheckoutInfo {
	1: required Common.TServiceType serviceType;
	2: optional TDeliveryAddress deliveryAddress;
	3: required TSencondaryCheckoutInfo sencondaryInfo;
	4: optional list<TOriginCheckoutInfo> originCheckoutInfos;
	5: required bool warehouseRequired;
	6: required bool shippingMethodRequired;
	7: required bool deliveryMethodRequired;
}

struct TDisabledGroup {
	1: required string warehouseCode;
	2: required string shippingMethodCode;
}

struct TComCartCheckoutForm {
	1: required TComCartCheckoutInfo checkoutInfo;
	2: required list<double> weights;
	3: optional list<TCartShippingMethodResult> shippingMethods;
	4: required list<ShoppingCart.TBasketItem> items;
	5: optional string errorMessage;
	6: required list<TCartWarehouseAddressResult> warehouses;
	7: required list<TDisabledGroup> disabledGroup; // 禁用的组合
}

struct TSencondaryCheckoutInfo {
	1: optional bool insured;
	2: optional bool insuranceEnabled;
	3: optional i32 credit;
	4: optional bool creditEnabled;
	5: optional list<string> voucherCodes;
	6: optional bool voucherEnabled;
	7: optional string coupon;
	8: optional bool couponEnabled;
	9: optional bool isAuthorizeBalance;
	10: optional bool authorizeBalanceEnabled;
 }

struct TFriendsDealCheckoutInfo {
	1:required string eventId;
	2:required ShoppingCart.TAgentProduct agentProduct;
	3:required TCartCheckoutInfo checkoutInfo;
	4:required string groupId;
	5:required bool isSingleGroup;
}

/*------------------- cart 3.0 -------------------*/
// 获取用户的checkout信息请求值
struct TGetCheckoutInfoReq {
	1:required list<string> cartIds,		// cartIds 用户选中的购物车id
	2:required Common.TServiceType serviceType;	// serviceType
    3:required TFlashsalesProduct flashsalesProduct; // 闪购商品信息
    4:optional TVersion version; // 特殊版本
}

// 购物车外层视图标签枚举
enum TVersion {
    DefaultVersion = 0	// 全局默认值
    OrderStage4 = 1 //  废弃
    SplitDelivery = 2 // 201709
}

struct TFlashsalesProduct {
    1:required i64 gpid;
    2:required string skuId;
    3:required string url;
    4:required i64 qty;
    5:required string remark;
    6:required string region;
    7:required string settingId;
}

// 获取用户的checkout信息返回值
struct TGetCheckoutInfoResp {
	1:required Common.TCommonResult result;	// 通用返回消息
	2:required TCheckoutInfo info; 			// checkout信息
}

// 获取用户checkout账单请求值
struct TModifyCheckoutBillReq {
	1:required TCheckoutInfo checkoutInfo;
}

// 获取用户checkout账单返回值
struct TModifyCheckoutBillResp {
	1:required Common.TCommonResult result;			// 通用返回消息
	2:required double totalFee;						// 总额
	3:required list<TBillDetail> billDetails;		// 账单信息
	4:required TCheckoutInfo info;					// checkout信息
	5:required double prepay;						// 预付款余额
}

// 获取针对账单可用的优惠券请求值
struct TGetCheckoutVoucherReq {
	1:required TCheckoutInfo checkoutInfo;
}

// 获取针对账单可用的优惠券返回值
struct TGetCheckoutVoucherResp {
	1:required list<TCheckoutVoucherGroup> voucherGroups; 	// 优惠券分组信息
}

// 用户进行checkout操作请求值
struct TMakeCheckoutReq {
	1:required bool isDeferPay;		// 是否延迟付款
	2:required TCheckoutInfo info; 	// checkout信息
}

// 用户进行checkout操作返回值 （再议）
struct TMakeCheckoutResp {
	1:required Common.TCommonResult result;		// 通用返回消息
	2:required i32 shipmentId;
	3:required bool isPayed;
	4:required string paymentNo;
	5:required string submitMsg;
	6:required string transactionId;
	7:required i64 topupAmout;
	8:required string paymentIds;
	9:required string friendsDealGroupId;
	10:required bool isCreditCardOnly;
	11:required TPaymentResp paymentRespForWeb;
}

struct TPaymentResp {
	1: required string encryptPaymentId;  // 加密后的付款号 多个用逗号隔开
	2: required string encryptPaymentNos; // 加密后的订单号 多个用逗号隔开
	3: required string encryptShipmentId; // 加密后的shipmentId 多个逗号隔开
	4: required string encryptPackageId;  // 加密后的包裹Id 多个逗号隔开
}

// 用户的checkout信息
struct TCheckoutInfo {
	1:required Common.TServiceType serviceType; 				// 服务类型
	2:required TElementInfo elementInfo;		// 前端显示元素控制
	3:required list<TRegionInfo> regionInfos;	// 商品来源相关信息
	4:optional TDeliveryAddress deliveryAddress;
    5:required TFlashsalesProduct flashsalesProduct; // 闪购商品信息
}

// 采购地区信息
struct TRegionInfo{
	1:required string region;								// 采购来源地区
	2:required list<TCartShippingMethod> shippings;			// 运输方式
	3:required list<TCartWarehouseAddress> warehouses;		// 仓库信息
	4:required double weight;								// 该地区所有商品重量
	5:required list<string> cartIds;						// 购物车id
	6:optional TCartShippingMethod shipping;				//用户已经选择的 shipping
	7:optional TCartWarehouseAddress warehouse;				//用户已经选择的 warehouse
	8:optional TDeliveryAddress deliveryAddress;			// elementInfo中的isMultiDelivery 为true时，使用该数据源，否则使用TCheckoutInfo的TDeliveryAddress
	9:optional i32 groupId; 								//  分组唯一Id

}

// 提供给客户端的控制信息
struct TElementInfo{
	1:required bool insured;						// 是否使用保险
	2:required bool insuredEnabled;					// 是否显示保险
	3:required i64 credit;						// 使用积分数
	4:required bool creditEnabled;					// 是否显示积分
	5:required list<string> voucherIds;				// 使用voucher列表
	6:required bool voucherEnabled;					// 是否显示voucher
	7:required string coupon;						// 使用coupon
	8:required bool couponEnabled;					// 是否显示coupon
	9:required bool warehouseRequired;				// 是否显示仓库
	10:required bool shippingMethodRequired;		// 是否显示运输方式
	11:required bool deliveryMethodRequired;		// 是否显示派送方式
	12:required bool isAuthorizeBalance;			// 是否授权差额补齐
	13:required bool authorizeForBalanceRequired;	// 是否显示差额补齐
	14:required i64 validVoucherCount;				// 可选的优惠券数量
	15:required bool isMultiDelivery;				// 是否多地址选择
	16:required string topMessage;					// 顶端模块文案
	17:required string deliveryMessage;				// 派送模块文案
}

// 付款服务
service Checkout {

	TComCartCheckoutForm UserComGetCheckoutForm(),

	TComCartBill UserComGetCheckoutBill(1: TComCartCheckoutInfo checkoutInfo),

	list<TCheckoutVoucherGroup> UserComGetCheckoutVouchers(1: list<string> selectedCodes, 2: TComCartCheckoutInfo info),

	TCheckoutResult UserComCartCheckout(1: TComCartCheckoutSubmission submission),

  list<TDeliveryMethod> GetDeliveryMethods(),
  list<TDeliveryMethod> GetDeliveryMethodsByOrigin(1: string originCode),
  list<TDeliveryMethod> GetDeliverySubMethods(1: string deliveryMethodCode),

  TCheckoutForm UserGetCheckoutForm(1: string originCode),

  TCartShippingMethodResult UserGetCartShippingMethods(1: string originCode),

  // 批量设置是否选择购物车中商品
  void UserToggleCartItem(1: string originCode, 2: list<i32> cartItemIds, 3: bool selected),

  // 实际上就是 UserToggleCartItem + UserGetCartShippingMethods
  TCartShippingMethodResult UserToggleCartItemAndGetShippingMethods(1: string originCode, 2: list<i32> cartItemIds, 3: bool selected),

  // 获取商品的账单
  // checkoutType checkout类型，ezbuy / buy4me
  // originCode 用于区分采购的区域，有CN，TW，US
  // shippingMethod 国际物流方式，值由 UserGetCartShippingMethods 选择结果获得
  // deliveryMethod 本地派送方式，有Home，Subway，Selfcollection，Neighbourhoodstation，TaisengOffice等
  // deliveryMethodId 本地派送方式Id
  // insured 是否有保险
  // credit 需要抵扣的积分，如果不需要抵扣，则为0
  // couponCode  需要抵扣的coupon，coupon是用来抵消代购费
  TCartBill UserGetCartCheckoutBill(1: string checkoutType, 2: string originCode, 3: string shippingMethod, 4: string deliveryMethod, 5: i32 deliveryMethodId, 6: bool insured, 7: i32 credit, 8: string couponCode),
  TCartBill UserGetCartBill(1: string checkoutType, 2: string originCode, 3: string shippingMethod, 4: string deliveryMethod, 5: i32 deliveryMethodId, 6: bool insured, 7: i32 credit, 8: string couponCode, 9: string warehouse),

  // 生成账单的账单
  // checkoutInfo 生成账单所需要的参数
  TCheckoutResult UserCartCheckout(1:TCartCheckoutInfo checkoutInfo),

  /// <summary>
  /// 取消付款
  /// </summary>
  /// <param name="paymentIds">付款id集合</param>
  /// <returns>返回消息，为空说明取消成功，返回取消失败的paymentnumbers和失败原因</returns>
  string UserCancelPayments(1:list<i32> paymentIds),
    //获取prime商品的账单
  //默认有保险，默认运输方式，默认没有折扣，没有credit&coupon
  TCartBill UserGetPrimeCartBill(1:string deliveryMethod, 2:string deliveryMethodId),

  // checkout提交
  // checkoutInfo 所有checkout的设置
  TCheckoutResult UserPrimeCartCheckout(1:TPrimeCartCheckoutInfo checkoutInfo),

  // 生成账单
  // checkoutInfo 生成账单所需要的参数
  TCartBill UserNewGetPrimeCartBill(1:TPrimeCartCheckoutInfo checkoutInfo),

  TCheckoutForm UserGetPrimeCheckoutForm(),

  /// <summary>
  /// Reddot充值
  /// </summary>
  TTopupResult UserReddotTopup(1:double amount, 2:string telephone, 3:string paymentNumbers),

  /// <summary>
  /// Reddot Ebanking充值
  /// </summary>
  TTopupResult UserReddotEbankingTopup(1:double amount, 2:string telephone, 3:string paymentNumbers),

  /// <summary>
  /// IDDoku充值
  /// </summary>
  TTopupResult UserIDDokuTopup(1:double amount, 2:string telephone, 3:string paymentNumbers),

  /// <summary>
  /// Paypal充值
  /// </summary>
  TTopupResult UserPaypalTopup(1:double amount, 2:string telephone, 3:string paymentNumbers),

  //根据parcelNumber 筛选可用的送／取货方式
  list<TDeliveryMethod> UserGetDeliveryMethodsByParcel(1:string parcelNumber),

  //修改配送信息
  TReArrangeDeliveryResult UserReArrangeDelivery(1:TReArrangeDeliveryInfo rearrangeInfo)

  /// <summary>
  /// 获取优惠券信息
  /// </summary>
  /// <param name="selectedCodes">已选择的voucher code</param>
  /// <param name="info">用户当前checkout的选择信息</param>
  /// <returns>优惠券组</returns>
  list<TCheckoutVoucherGroup> UserGetCheckoutVouchers(1: list<string> selectedCodes, 2: TCartCheckoutInfo info)

  /// <summary>
  /// 获取Prime购物车中的优惠券信息
  /// </summary>
  /// <param name="selectedCodes">已选择的voucher code</param>
  /// <param name="info">用户当前prime checkout的选择信息</param>
  /// <returns>获取Prime购物车中的优惠券组</returns>
  list<TCheckoutVoucherGroup> UserGetPrimeCheckoutVouchers(1: list<string> selectedCodes, 2: TPrimeCartCheckoutInfo info)

  /// <summary>
  /// 获取用户最近使用的配送地址
  /// </summary>
  /// <returns>用户最近使用的配送地址</returns>
  list<TDeliveryAddress> UserGetRecentDeliveryAddresses(),

  //获取团购账单
  TCartBill UserGetGroupBuyBill(1:TGroupBuyCheckoutInfo info),

  //团购商品checkout
  TCheckoutResult UserGroupBuyCheckout(1:TGroupBuyCheckoutInfo info),

  /// <summary>
  /// 泰国2c2p支付
  /// <summary>
  /// <param name="total">充值金额</param>
  /// <param name="telephone">电话号码</param>
  /// <param name="paymentNumbers">付款号</param>
  /// <returns>泰国2c2p支付的内容</returns>
  TTopupResult UserDoThailandMy2c2pPayment(1:double total, 2:string telephone, 3:list<string> paymentNumbers),

  //拼团商品checkout
  TCheckoutResult UserFriendsDealCheckout(1:TFriendsDealCheckoutInfo info),

  //计算拼团商品账单
  TCartBill UserGetFriendsDealBill(1:TFriendsDealCheckoutInfo info),


	/*------------------- cart 3.0 -------------------*/
	// 获取用户的checkout信息
	TGetCheckoutInfoResp UserGetCheckoutInfo(1:TGetCheckoutInfoReq checkoutInfoReq),

	// 用户修改checkout信息，并获取对应的账单信息
	TModifyCheckoutBillResp UserModifyCheckoutBill(1:TModifyCheckoutBillReq modifyCheckoutBillReq),

	// 获取针对账单可用的优惠券
	TGetCheckoutVoucherResp UserGetCheckoutVoucher(1:TGetCheckoutVoucherReq checkoutVoucherReq),

	// 用户进行checkout操作
	TMakeCheckoutResp UserMakeCheckout(1:TMakeCheckoutReq makeCheckoutReq),
}
