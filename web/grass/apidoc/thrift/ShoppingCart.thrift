namespace * ShoppingCart
namespace csharp Zen.DataAccess.ShoppingCart
namespace java com.daigou.sg.rpc.shoppingcart
namespace objc TRCart
namespace javascript TRPC
namespace swift TR
namespace go ezbuy.apidoc.gen.shoppingcart


include "Product.thrift"
include "Common.thrift"

struct TAgentProduct {
	1: required i64 id;						//代购商品id
	2: required string vendorName;			//卖家名称
	3: required string productName;			//商品名称
	4: required string url;					//商品url
	5: required double price;				//单价
	6: required i32 qty;					//数量
	7: optional i64 cid;					//商品对应淘宝id
	8: required double internalShipmentFee;	//国内运费
	9: optional i32 shipmentTypeId;			//运输方式
	10: optional string remark;				//商品备注
	11: optional string productImage;		//商品图片
	12: required bool insured;				//保险
	13: optional string warehouseCode;		//仓库
	14: required string originCode;			//采购国家
	15: optional double weight;				//重量
	16: optional double volumeWeight;		//体积重
	17: optional string skuProperties;		//sku编号
	18: optional string sku;				//sku名称
	19: required string shopName			//店铺名称
	20: optional string purchaseSource;		//采购来源
	21: optional i64 skuId;					//sku id
	22: optional string skuImg;				//sku图片
	23: optional string altShipmentTypeName;//运输方式英文名
	24: optional string shipmentTypeCode;	//运输方式编号
	25: required bool isEZBuy;				//是否是EZBuy商品
	26: required string category;			//用来统计商品来自哪个版块
    27: required bool isFlashProduct;		//加入购物车时是否为flash商品
    28: required bool isCashOffProduct;		//是否为满减商品
	29: required i32 purchaseSourceId;		//采购来源ID
}

struct TBasketItem {
	1: required i32 id;								//购物车商品项id
	2: required TAgentProduct agentProduct;			//代购商品
	3: required bool isFavorite;					//是否收藏
	4: required double rebateDiscount;				//返利折扣
	5: required double localShipmentFee;			//新币国内运费
	6: required double localUnitPrice;				//新币单价
	7: optional double gstFee;						//新币gst
	8: optional double handlingFee;					//美国手续费
	9: required bool selectStatus;					//是否选中
	10: optional double specialHandlingFeePercent;	//美国手续费比例
	11: required double subTotal;					//商品总价
	12: optional string sellerDiscount;				//合作卖家国际运费折扣
	13: required bool canSelected;					//是否可以购买
	14: required bool isFlashSales;					//是否是闪购商品
	15: required bool isSensitive;					//是否是敏感商品
	16: required string cashOffDiscount;			//满减折扣文案
	17: required string cashOffKey;					//满减折扣key
	18: optional bool isFreeShipping;				//是否包邮
}

struct TCartSummary {
	1:required list<TBasketItemSummary> vendors;		//卖家列表
	2:required double totalAmount;					//总金额
	3:required double customerPrepay;				//客户预付款余额
	4:required double shippingAmount;				//运费合计
	5:required i32 totalItemCount;					//总个数
	6:required i32 selectedItemCount;				//选中个数
	7:required string authorizeForBalance;			//授权差额补齐上线金额
}

struct TBasketItemSummary {
	1:required string vendorName;				//卖家名字
	2:required double subTotal;					//商品总额
	3:required list<TBasketItem> basketItems;	//商品列表
	4:required i32 totalItemCount;				//总个数
	5:required i32 selectedItemCount;			//选中个数
	6:required double totalShipmentFee;			//总运费
	7:required double localTotalShipmentFee;	//汇率转换后的总运费
}

struct TCartProduct {
	1:optional i64 cid;						//淘宝商品分类id
	2:required string vendorName;			//卖家名
	3:required string productName;			//商品名
	4:required double unitPrice;			//单价
	5:required double shippingFee;			//运费
	6:required string productUrl;			//商品url
	7:required string productImage;			//商品图片
	8:required string originCode;			//采购国家
	9:required string shopName;				//店铺名
	10:required string location;			//卖家地址
	12:required bool isShippingFee;			//是否免国内运费
	15:required string specialHandlingFeeMessage;	//美国商品手续费描述
	16:required double specialHandlingFeePercent;	//美国商品手续费
	17:optional list<string> propertyNames;			//商品规格描述
	19:optional list<string> descriptionImages;		//商品详细图片
	23:optional bool isEZBuy;  //是否是特殊商品
}

struct TBasketItemDetail {
	1: required i32 id;							//购物车商品项id
	2: required TCartProduct product;				//商品明细
	3: optional string warehouseCode;			//仓库
	4: optional i32 shipmentTypeId;				//运输方式
	5: optional string shipmentTypeCode;		//运输方式编号
	6: required i32 qty;						//数量
	7: optional string remark;					//商品备注
	8: required bool insured;					//保险
	9: required string originCode;				//采购国家
	10: optional string skuProperties;			//sku名称
	11: optional string sku;					//sku编号
	12: required double unitPrice;				//商品单价
	13: required double internalShipmentFee;	//国内运费
	14: required string url;					//商品地址
	15: required i32 agentProductId;			//代购商品id
}

struct TTransactionDetail {
	1:required string transactionId;			//交易ID
	2:required list<TAgentProduct> agentProducts;			//付款的商品集合
	3:required double total;					//一次交易的总价
    4:required bool isEZBuy;					//一次交易的类型
}

//用于修改购物车中商品数量
struct TCartItemQuantity {
    1:required i32 basketItemID;
    2:required i32 quantity;
}

struct TCartItemDetail {
    1:required Product.TProductExtension productExtension;
    2:required string SKUProperties;    //修改SKU时,用来初始化SKU曾经的选中项
    3:required string remark;    //add to cart 时填写的remark,在修改SKU页面用于初始化
    4:required i32 quantity;    //同上
    5:required string warehouse;    //buy for me 可能会选择过仓库,所以这里传回做初始化
    6:optional string purchaseSource; //购买来源
}

struct TEditCartItemResult {
    1:required string message;
    2:required bool status;
}

struct TEditCartItemAttribute {
    1:required i32 basketItemID;
    2:required i32 quantity;
    3:required string SKU;
    4:required string SKUProperties;
    5:required string remark;
}

// 编辑购物车的信息
struct TModifyCartItem {
	1:required string cartId;					// 需要编辑的购物车id
	2:required i64 qty;							// 修改后数量，比如原来是3，增加1，则传入4
	3:optional i64 newSkuId; 					// 新的skuId，如果不修改，则默认为原值
	4:optional string remark;					// 更新用户商品备注
}

// 编辑购物车的信息
struct TModifyCustomizeCartItem {
	1:required string cartId;					// 需要编辑的购物车id
	2:required i64 qty;							// 修改后数量，比如原来是3，增加1，则传入4
	3:optional i64 newSkuId; 					// 新的skuId，如果不修改，则默认为原值
	4:required string productName, 							// 商品名
	5:required string vendorName, 							// 卖家名
	6:required string url,									// 用户填入的链接
    7:required double unitPrice, 							// 用户填写的buyforme来源地价格
    8:optional double internalExpressFee,					// 国内运费
	9:optional string remark,								// 选填，用户备注
}

// 编辑购物车数量
struct TModifyCartQtyItem {
	1:required string cartId;
	2:required i64 qty;
}

// 购物车卖家分组信息
struct TCartItem {
    1: required string vendorName;                              //卖家名称
    2: required list<TCartProductInfo> products;                 //商品列表
    3: required string region;                              	//商品来源地 CN,US,KR,TW...
}

// 购物车商品信息
struct TCartProductInfo {
    1: required string cartId;                                  //购物车商品项id
    2: required double price;                                   //商品单价
    3: required double regionPrice;                             //商品来源地单价
    4: required string productName;                             //商品名称
    5: required string url;                                     //商品url
    6: optional string productImage;                            //商品图片
    7: required i32 qty;                                        //数量
    8: optional string skuName;                                 //sku名称
    9: optional TCartProductExtraInfo extraInfo;				//商品的额外信息
    10: optional string remark;									//用户商品备注
    11: optional double internalExpressFee;						//国内运费
	12: optional double shippingFee;							//国际运费
	13: required i64 	gpid;
	14: required Common.TServiceType serviceType;				//商品类型
	15: required i64 skuId;										//skuId
	16: optional string originalProductName;					//商品原始名称，用于GA
}

// 购物车附加信息
struct TCartProductExtraInfo {
    1: optional list<i32> tags;                                 //[1 == BuyForMe, 2 == CashOff, 3 == Gst, 4 == isSensitive 是否显示敏感标签文案， 5 == isFreeShipping 是否包邮活动, 6 == isOffSale 是否下架, 7 == isShowStock 是否展示库存]
    2: optional double gst;                                     //新币gst
    3: optional double handlingFee;                             //美国手续费
    4: optional double specialHandlingFeePercent;               //美国手续费比例
    5: optional string sellerDiscount;                          //合作卖家国际运费折扣
	6: optional string cashOffDiscount;							//满减折扣的文案
	7: optional string cashOffKey;								//满减折扣的key
	8: optional i32 stockLeft;										//剩余库存
	9: optional string tagMsg;										//标签文案
    10: optional list<TCartViewExt> cartViewExts; 				// 购物车视图标签信息
}

// 购物车列表信息
struct TCartSummaryInfo {
    1:required list<TCartItem> cartItems;                       //卖家列表
}

// 添加购物车req
struct TAddCartReq {
	1:required i64 gpid,									// 商品gpid
	2:required i64 skuId,									// 如果没有skuId，可给默认值0
	3:required string url,									// 商品访问时的链接
	4:required i64 qty,										// 所有服务类型必填
	5:required Common.TServiceType serviceType,				// 所有服务类型必填
	6:optional string remark,								// 选填，用户备注
	7:optional string purchaseSource,						// 选填，商品加购来源入口
}


struct TAddCustomizeCartReq {
	1:required string productName, 							// 商品名
	2:required string vendorName, 							// 卖家名
	3:required string region, 								// 商品来源地
	4:optional i64 skuId,									// 如果没有skuId，可给默认值0
	5:required string url,									// 用户填入的链接
    6:required double unitPrice, 							// 用户填写的buyforme来源地价格
    7:optional double internalExpressFee,					// 国内运费
	8:required i64 qty,										// 所有服务类型必填
	9:required Common.TServiceType serviceType,				// 默认是buyforme
	10:optional string remark,								// 选填，用户备注
	11:optional string purchaseSource,						// 选填，商品加购来源入口
}

// 修改购物车
struct TModifyCartReq {
	1:required list<TModifyCartItem> modifyItems
}

// 修改购物车
struct TModifyCustomizeCartReq {
	1:required list<TModifyCustomizeCartItem> modifyCustomizeItems
}

struct TModifyCartQtyReq {
	1:list<TModifyCartQtyItem> modifyCartQtyItems
}

// 删除购物车
struct TDeleteCartReq {
	1:required list<string> cartIds
}

// 获取购物车req
struct TGetCartReq {
	1:required i64 cartType									// cartType ===> 1: prime cart ; 2: not prime
}

// 获取购物车prime
struct TGetCartResp {
	1:required TCartSummaryInfo cartSummaryInfo
	2:optional Common.TCommonResult result
	3:optional TCartViewExt cartViewExt
}

// 购物车视图方面相关信息
struct TCartViewExt {
    1:required TCartViewTag cartViewTag
    2:optional string title // 提供标题
    3:optional list<string> titleParams // title中的参数
    4:optional string link // 提供可配置的链接参数
}

// 购物车外层视图标签枚举
enum TCartViewTag {
    DefaultTag = 0	// 全局默认值
    PrimeMemberPush = 1 // 在购物车最外层显示prime member push

    ActDefault = 100 // 普通活动，活动默认位置
    ActDiscount = 101 // 折扣
    ActCashOff = 102 // 满减
    ActFreeShipping = 103 // 包邮
}

service ShoppingCart {

	/// <summary>
	/// 添加商品到购物车
	/// </summary>
	/// <param name="agentProduct">购物车商品</param>
	/// <returns>购物车商品id</returns>
	i32 UserAddNewBasketItem(1:TAgentProduct agentProduct),
	string UserAddToCart(1:TAgentProduct agentProduct),

	/// <summary>
	/// 删除购物车商品
	/// </summary>
	/// <param name="basketItemId">购物车商品id</param>
	void UserDeleteBasketItem(1:i32 basketItemId),

	/// <summary>
	/// 获取购物车商品列表
	/// </summary>
	/// <param name="originCode">采购国家</param>
	/// <returns>购物车商品列表</returns>
	TCartSummary UserGetCartSummary(1:string originCode),

	/// <summary>
	/// 获取合并购物车商品列表
	/// </summary>
	/// <returns>合并购物车商品列表</returns>
	TCartSummary UserGetCartCombineSummary(),

	/// <summary>
	/// 获取要购买的购物车商品列表
	/// </summary>
	/// <param name="originCode">采购国家</param>
	/// <returns>要购买的购物车商品列表</returns>
	TCartSummary UserGetCheckOutSummary(1:string originCode),

	/// <summary>
	/// 选择购物车商品项
	/// </summary>
	/// <param name="basketItemIds">购物车商品项id</param>
	/// <param name="selected">是否选中</param>
	/// <param name="originCode">采购国家</param>
	/// <returns>购物车商品项</returns>
	TCartSummary UserSetBasketItemSelected(1:list<i32> basketItemIds, 2:bool selected, 3:string originCode),

	/// <summary>
	/// 选择合并购物车商品项
	/// </summary>
	/// <param name="basketItemIds">购物车商品项id</param>
	/// <param name="selected">是否选中</param>
	/// <returns>合并购物车商品项</returns>
	TCartSummary UserSetCombineBasketItemSelected(1:list<i32> basketItemIds, 2:bool selected),

	/// <summary>
	/// 添加商品回购物车
	/// </summary>
	/// <param name="orderId">订单id</param>
	/// <returns>代购商品id</returns>
	i32 UserAddProductBackToCart(1:i32 orderId),

	/// <summary>
	/// 删除Prime购物车商品
	/// </summary>
	/// <param name="basketItemId">购物车商品id</param>
	void UserDeletePrimeBasketItem(1:i32 basketItemId),

	/// <summary>
	/// 获取Prime购物车商品列表
	/// </summary>
	/// <returns>购物车商品列表</returns>
	TCartSummary UserGetPrimeCartSummary(),

	/// <summary>
	/// 获取要购买的Prime购物车商品列表
	/// </summary>
	/// <returns>要购买的购物车商品列表</returns>
	TCartSummary UserGetPrimeCheckOutSummary(),

	/// <summary>
	/// 选择Prime购物车商品项
	/// </summary>
	/// <param name="basketItemIds">购物车商品项id</param>
	/// <param name="selected">是否选中</param>
	/// <returns>购物车商品项</returns>
	TCartSummary UserSetPrimeBasketItemSelected(1:list<i32> basketItemIds, 2:bool selected),

	/// <summary>
	/// 添加商品到Prime购物车
	/// 由于有种情况（prime会员 在 非prime专区 购买一件prime商品，这时算buy4me点商品）
	/// </summary>
	/// <param name="agentProduct">购物车商品</param>
	/// <returns>购物车商品id</returns>
	string UserAddToPrimeCart(1:TAgentProduct agentProduct),

	/// <summary>
    /// 获取付款的商品列表
    /// </summary>
    /// <param name="paymentNumbers">付款号</param>
    /// <returns>交易详情列表</returns>
    list<TTransactionDetail> UserGetPaymentProducts(1:string paymentNumbers),

	// type [“PrimeCart”,"NormalCart", "BuyForMeCart"] 不区分大小写
	// NormalCart 和 BuyForMeCart 是等价的，用于兼容旧接口，优先使用 NormalCart
    TEditCartItemResult UserDeleteCartItem(1:list<i32> basketItemIDs, 2:string type),

	/// <summary>
	/// 将商品从购物车移动到收藏夹
	/// </summary>
	// type [“PrimeCart”,"NormalCart"] 不区分大小写
    TEditCartItemResult UserMoveCartItemToFavorite(1:list<i32> basketItemIDs, 2:string type),

	// type [“PrimeCart”,"NormalCart"] 不区分大小写
    TEditCartItemResult UserEditCartItemQuantity(1:list<TCartItemQuantity> tCartItemQuantityList, 2:string type),

    TEditCartItemResult UserEditCartItemAttribute(1:TEditCartItemAttribute tEditCartItemAttribute, 2:string type),

    TCartItemDetail UserGetCartItemDetail(1:i32 basketItemID, 2:string type),

	/*------------------- cart 3.0 -------------------*/
	// 添加购物车
	Common.TCommonResult UserAddCart(1:TAddCartReq addCartReq),

	// 添加用户定制化商品，buyforme
	Common.TCommonResult UserAddCustomizeCart(1:TAddCustomizeCartReq addCustomizeCartReq),

	// 修改购物车
	// modifyItems ===> 修改购物车信息
	Common.TCommonResult UserModifyCart(1:TModifyCartReq modifyCartReq),

	// 修改用户定制化商品 buyforme
	Common.TCommonResult UserModifyCustomizeCart(1:TModifyCustomizeCartReq modifyCustomizeCartReq),

	// 修改购物车商品数量
	Common.TCommonResult UserModifyCartQty(1:TModifyCartQtyReq modifyCartQtyReq),

	// 删除购物车
	// cartIds
	Common.TCommonResult UserDeleteCart(1:TDeleteCartReq deleteCartReq),

	// 获取购物车
	TGetCartResp UserGetCart(1:TGetCartReq getCartReq),
}
