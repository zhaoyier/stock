namespace * Product
namespace csharp Zen.DataAccess.Product
namespace java com.daigou.sg.webapi.product
namespace objc TR
namespace javascript TRPC
namespace swift TR
namespace go ezbuy.apidoc.gen.product
namespace webapi api

include "Common.thrift"

struct TShippingFee {
	1:required string warehouse;	//仓库
	2:required double fee;			//运费
	3:required double localFee;	//汇率转换后的运费
}

struct TProduct {
	1:optional i64 cid;						//淘宝商品分类id
	2:required string vendorName;			//卖家名
	3:required string productName;			//商品名
	4:required double unitPrice;			//单价
	5:required double shippingFee;			//推荐展示国内运费
	6:required string productUrl;			//商品url
	7:required string productImage;			//商品图片
	8:required string originCode;			//采购国家
	9:required string shopName;				//店铺名
	10:required string location;			//卖家地址
	11:required string aroundwWarehouse;	//附近仓库
	12:required bool isShippingFee;			//是否免国内运费
	13:required i32 favoritesItemId;		//收藏商品id
	14:required i32 favoriteCatId;			//收藏分类id
	15:required string specialHandlingFeeMessage;	//美国商品手续费描述
	16:required double specialHandlingFeePercent;	//美国商品手续费
	17:optional list<string> propertyNames;			//商品规格描述
	18:required list<TShippingFee> shippingFees;		//各仓库运费
	19:optional list<string> descriptionImages;		//商品详细图片
	20:optional list<TCharacteristicGroup> characteristicGroups; //可选sku列表
	21:optional list<TSku> skus;			//商品sku列表
	22:optional list<string> itemImgs;
	23:optional bool isEZBuy;  //是否是特殊商品
	24:required string priceSymbol; //货币符号
	25:required string localUnitPrice;	//汇率转换后的价格
	26:required double localShipmentFee;		//汇率转换后的运费
	27:optional string errMsg;				//错误信息
}

struct TProductExtension {
	1:optional i64 cid;						//淘宝商品分类id
	2:required string vendorName;			//卖家名
	3:required string productName;			//商品名
	4:required double unitPrice;			//单价
	5:required double shippingFee;			//运费
	70:required double localShippingFee;	//推荐展示国内运费(本地价格)
	6:required string productUrl;			//商品url
	7:required string productImage;			//商品图片
	8:required string originCode;			//采购国家
	9:required string shopName;				//店铺名
	10:required string location;			//卖家地址
	11:required string aroundwWarehouse;	//附近仓库
	12:required bool isShippingFee;			//是否免国内运费
	13:required i32 favoritesItemId;		//收藏商品id
	14:required i32 favoriteCatId;			//收藏分类id
	15:required string specialHandlingFeeMessage;	//美国商品手续费描述
	16:required double specialHandlingFeePercent;	//美国商品手续费
	17:optional list<string> propertyNames;			//商品规格描述
	18:required list<TShippingFee> shippingFees;		//各仓库运费
	19:optional list<string> descriptionImages;		//商品详细图片
	20:optional list<TCharacteristicGroup> characteristicGroups; //可选sku列表
	21:optional list<TSku> skus;			//商品sku列表
	22:optional list<string> itemImgs;
	23:optional bool isEZBuy;  //是否是特殊商品
	24:required string priceSymbol; //货币符号
	25:required string localUnitPrice;	//汇率转换后的价格
	26:required double localShipmentFee;		//汇率转换后的运费
	27:optional string errMsg;				//错误信息
	28:optional string eta;					//ETA时间范围
	29:optional bool displayShippingIcon;	//是否 显示 icon（特殊运输方式要显示icon）
	30:optional string altProductName;		//商品英文名称
	31:optional list<TCharacteristicGroup> altCharacteristicGroups; //可选英文sku列表
	32:required bool primeAvailable;		//是否支持prime模式购买
    33:required bool isShippedBySea;            //是否使用海运
    34:required bool isContainGSTFee;            //是否会收取GST费用
    35:required TFlashSalesInfo flashSalesInfo;  //闪购相关信息
    36:required double originalUnitPrice;		//商品的原始价格
    37:required string originalLocalUnitPrice;	//汇率转换后的商品原始价格
    38:required string discountRate;            //折扣率  例如 50% off
    39:required bool isCashOffProduct;          //是否是满减商品
    40:optional TGroupBuyInfo groupbuyInfo;		//团购相关信息
    41:optional string shareUrl;				//分享链接
    42:optional string productGroupName;			//产品组名称
    43:optional string productGroupURL;				//产品组链接（暂只支持http）
	44:optional string cashOffCategoryName; //满减商品的分类名
	45:optional string defaultShippingName; //推荐运输方式名
	46:optional string defaultShippingFee; //推荐运输方式费用
	47:optional TFriendsDealInfo friendsDealInfo;	//拼团相关信息
	48:optional string rawImage;			//商品原始图片
	49:optional i32 productStock;			//商品没有sku情况的，商品库存值
	50:required double exchangeRate;		// 实际汇率
	51:required i64 gpid;                   // gpid
	52:required TFreeShippingInfo freeShippingInfo;    // 是否免运费
	53:optional string primeEta;
	54:optional string ezbuyEta;
	55:required string notice;  //  详情页的提示
    56:required string htmlStr; //html字符串
	57:required TSellerInfo sellerInfo; //卖家信息
	58:optional string originCountry;   // 来源国家名,可根据此选择要展示的国旗
	59:optional string originInfo;      // 来源国家信息
	60:required string selectedSkuId;
	62:optional TJoinPrimeInfo joinPrime; //提示用户是否加入Prime, 如果链接为nil, 则不展示.
	63:optional TPremium premium;
	64:required string brand;
	65:required list<TCat> category;
	66:required list<Common.TTitleIcon> titleIcons;
	// 废弃
	67:required string sellerBanner;
	68:required Common.TTable ruleTable;  // 尺码表
	// 取代 sellerBanner
	69:required TProductBanner banner;
	70:required bool disableRemark;       // 禁用备注
}

struct TSellerInfo {
	1:required string sellerName;		//卖家名称
	2:required string sellerCopy;			//卖家跳转文案
	3:required string sellerProductUrl;	//卖家商品链接
}

struct TFriendsDealInfo {
	1:required bool friendsDealAvailable;				//是否支持拼团模式
	2:required i64 beginTimeSpan;					//当前时间距离拼团开始间隔毫秒数
	3:required i64 endTimeSpan;						//当前时间距离拼团结束间隔毫秒数
	4:required string price;						//商品的拼团价格
	5:required string originalPrice;				//后台设置的商品原价
	6:required i32 stock;							//商品的库存数量
	7:required i32 soldStock;						//已经售出的sku库存之和
	8:required i32 usableStock;						//当前可用的sku库存之和
	9:required i32 minUnit;							//最小成团人数
	10:required i32 buyLimit;						//每个人购买的数量限制
	11:required string shippingMethodeDescription; 				//国际物流方式描述
	12:optional TFriendsDealGroupInfo friendsDealGroupInfo;	//当前拼团参与信息
	13:optional string eventId;					//拼团活动ID
	14:optional Common.TCommonItem shareableItem;
	15:optional list<TSku> singleMemberSkus;  // 一人团sku
	16:optional double singleMemberPrice; // 单人购买价
	17:required bool supportSingleGroup; // 是否支持一人团
    18:optional double singleMemberOriginPrice; // 单人购买产地价
}

//小团的订单状态
enum TFriendsDealGroupStatus {
	Other = 0	// 未知
	Joinable = 1	// 可参与
	Succeed = 2     // 已成团,可去列表
	WaitingForOthers = 3  // 已购买，等待成团
	Expired = 4     // 已过期
	StaffUnPay = 5  // 等待全团支付
    StartNew = 6  // 已成团，可开新团
}

struct TFriendsDealGroupInfo {
   1:required list<TFriendsDealCustomerInfo> customers; //当前小团参与人信息
   2:required i64 groupEndTimeSpan;							//当前时间距当前小团结束间隔毫秒数
   3:required TFriendsDealGroupStatus status;
   4:required string statusMessage;
}

struct TFriendsDealCustomerInfo {
	1:required i32 customerId;		//用户id
	2:required string imageURL; //用户头像
	3:required string name;	//用户名称
	4:required bool isCaptain;		//是否是团长
}

struct TFlashSalesInfo{
    1:required bool flashSalesAvailable;		 //是否支持闪购模式购买
	2:required i64 beginTimeSpan;					//当前时间距离闪购开始间隔毫秒数
	3:required i64 endTimeSpan;						//当前时间距离闪购结束间隔毫秒数
	4:required double flashSalesPrice;	//商品的闪购价格
	5:required i32	  stock;	//设置商品的库存数量
	6:required string settingId; //闪购id
}

struct TFreeShippingInfo{
    1:required bool freeShippingAvailable;		 //是否支持免邮
    2:required string url;
    3:required string name;
}

struct TGroupBuyInfo {
	1:required bool groupbuyAvailable;		//是否支持团购模式购买
	2:required i64 beginTimeSpan;			//当前时间距离团购开始间隔毫秒数
	3:required i64 endTimeSpan;				//当前时间距离团购结束间隔毫秒数
	4:required i32 totalStock;				//团购每个sku的库存值之和
	5:required i32 soldStock;				//团购当前已经售出的sku库存之和
	6:required i32 usableStock;				//团购当前可用的sku库存之和
	7:required list<TGroupBuyItemsInfo>	info;	//团购阶梯
	8:required string deposit;				//团购定金
}

struct TGroupBuyItemsInfo {
	1:required i32 priority;				//达成团购的优先级 prioriry越低表示优先级越高
	2:required string localPrice;			//团购价格
	3:required i32 minQty;					//最低成团数量
	4:required double percent;				//百分比
}


struct TSimpleProduct {
	1:required string productName;			//商品名
	2:required string productUrl;			//商品url
	3:required string productImage;			//商品图片
	4:required string originCode;			//采购国家
	5:required bool isEZBuy;  //是否是特殊商品
	6:required string localUnitPrice;	//汇率转换后的价格
    7:required string originalLocalUnitPrice;	//汇率转换后的商品原始价格
    8:required string discountRate;            //折扣率  例如 50% off
    9:required bool isCashOffProduct;          //是否是满减商品
    10: optional string cashOffColor;				// #123456
    11: optional string originCountry;      // 来源国家名,可根据此选择要展示的国旗
    12: required i64 gpid;                  // gpid
    13: required bool isPrime;
	14: required bool isFreeShipping;
	15: required string originalProductName;   // 原商品名
	22: required string mncashoffImg;          // 满N减N图片
	23: required Common.TIcon icon;            # 商品右上角标
	24: required list<Common.TTitleIcon> titleIcons;
}

struct TSku {
	1:required string price;		//价格
	2:required string properties;	//sku组合编号
	3:required string propertiesName;//sku名字
	4:required i64 quantity;		//数量
	5:required i64 skuId;			//sku Id
	6:required i64 skuSpecId;
	7:required string status;
	8:required i64 withHoldQuantity;
	9:required double originalPrice;
	10:required string skuUrl;
	11:required list<string> imgs;
	12:required string localPrice;
	13:required double exchange;
}

struct TCharacteristic {
	1:required string propkey;		//标识id
	2:required string actualValue;	//实际值
	3:required string remark;		//描述
	4:required string imageUrl;		//图片url
	5:required bool isSelected;		//是否选中
}

struct TCharacteristicGroup {
	1:required string name;		//标识id
	2:required list<TCharacteristic> characteristics;
}

struct TProductReviewDetail {
	1: required i32 id;					// 商品评论的id，默认为0
	2: required string productUrl;		// 商品url
	3: required i32 userId;				// 用户id
	4: required i32 rating;				// 满意度
	5: optional i32 helpfulCount;		// 此条评论的采纳数
	6: required string comment;			// 商品评论内容
	7: optional string pictures;		// `图片key`数组，即客户端可以自行计算出所需的任意规格的图片url
	8: required bool setHelpful;		//用户是否设置过helpful
	9: required string nickName;		//用户昵称
	10:required string headPortraits;	//用户头像
	11:optional string sku;				//商品sku
	12:required string createDate;		//创建日期
}

struct TProductReviewCount {
	1: required i32 all;		// 某个商品所有评论的个数
	2: required i32 hasPhoto;	// 某个商品含有图片评论的个数
}

struct SearchFilterField {
	1: required string name;
	2: required i32 productCount;
}

struct SearchFilter {
	1: required string name;
	2: required list<SearchFilterField> fields;
	3: required bool emphasized; 	// 是否需要强调，客户端可能有特殊表现形式
}

struct SearchFilterCond {
	1: required string filterName;
	2: required string fieldName;
}

struct SearchSortCond {
	1: required string sort;
	2: required bool isDesc;
}

struct TSortOption {
	1: required string code; // 排序标识
	2: required string name; // 排序名称，用户显示
	3: optional string descTitle; // 降序名称
	4: optional string ascTitle;  // 升序名称
}

struct SearchResult {
	1: list<TSimpleProduct> products;
	2: list<string> sorts;
	3: list<SearchFilter> filters;
	4: list<TSortOption> sortOptions; // 可用排序选项
}

struct TProductUserInfo {
	1: required i32 customerId; // 用户ID
	2: required bool isPrime; // 用户是否是prime
}

service Product {

	/// <summary>
	/// 获取商品明细
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <returns>商品明细</returns>
	TProduct GetProductDetail(1:string productUrl, 2:string purchaseSource),

	/// 客户端自行处理缓存时间，30分钟？
	list<string> GetHotSearch(),

	SearchResult Search(1:string keyword, 2:list<SearchFilterCond> filters, 3:SearchSortCond sort, 4:i32 offset, 5:i32 limit),
	/// 同上
	SearchResult SearchByCategory(1:i32 categoryId, 2:list<SearchFilterCond> filters, 3:SearchSortCond sort, 4:i32 offset, 5:i32 limit),

	SearchResult SearchByCategoryAndKeyword(1:i32 categoryId, 2:string keyword, 3:list<SearchFilterCond> filters, 4:SearchSortCond sort, 5:i32 offset, 6:i32 limit),

	SearchResult SearchBySeller(1:i32 sellerId, 2:string keyword, 3:list<SearchFilterCond> filters, 4:SearchSortCond sort, 5:i32 offset, 6:i32 limit),

	// 通用搜索
	SearchResult SearchByDomain(1:string keyword, 2:string domain, 3: list<SearchFilterCond> filters, 4:SearchSortCond sort, 5:i32 offset, 6:i32 limit)

	/// <summary>
	/// 获取商品评论列表
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <param name="hasPhoto">用于过滤商品评论是否包含图片</param>
	/// <param name="offset">商品评论的起始位置</param>
	/// <param name="limit">一次请求要获取的商品评论个数</param>
	/// <returns>商品评论列表</returns>
	list<TProductReviewDetail> GetReviews(1:string productUrl, 2:bool hasPhoto, 3:i32 offset, 4:i32 limit),

	/// <summary>
	/// 获取某个商品的评论个数
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <returns>商品的评论个数</returns>
	TProductReviewCount GetReviewCount(1:string productUrl),

	/// <summary>
	/// 设置商品评论的采纳数
	/// </summary>
	/// <param name="productReviewDetailId">商品评论的id</param>
	/// <param name="helpful">是否采纳</param>
	void SetHelpful(1:i32 productReviewDetailId, 2:bool helpful),

	/// <summary>
	/// 获取商品明细
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <returns>商品明细</returns>
	TProductExtension GetPrimeProductDetail(1:string productUrl, 2:string purchaseSource, 3:TProductUserInfo userInfo),

	/// <summary>
	/// 获取团购商品明细
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <param name="groupbuyNo">团购活动标示</param>
	/// <param name="purchaseSource">来源</param>
	/// <returns>商品明细</returns>
	TProductExtension GetGroupBuyProductDetail(1:string productUrl, 2:string groupbuyNo, 3:string purchaseSource),

	/// <summary>
	/// 获取Prime商品分类
	/// </summary>
	/// <returns>商品分类</returns>
	SearchResult SearchByPrimeCategory(1:i32 categoryId, 2:list<SearchFilterCond> filters, 3:SearchSortCond sort, 4:i32 offset, 5:i32 limit),

	SearchResult SearchByPrimeCategoryAndKeyword(1:i32 categoryId, 2:string keyword, 3:list<SearchFilterCond> filters, 4:SearchSortCond sort, 5:i32 offset, 6:i32 limit),

	/// <summary>
	/// Prime专区的搜索
	/// </summary>
	SearchResult PrimeSearch(1:string keyword, 2:list<SearchFilterCond> filters, 3:SearchSortCond sort, 4:i32 offset, 5:i32 limit),

	/// <summary>
	/// 获取拼团商品明细
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <param name="settingId">商品Id</param>
	/// <returns>商品明细</returns>
	TProductExtension GetFriendsDealProductDetail(1:string productUrl, 2:string eventId),

	/// <summary>
	/// 通过小团ID进入的拼团
	/// </summary>
	/// <param name="小团ID"></param>
	TProductExtension GetFriendsDealProductGroupDetail(1:string groupId),
}

struct TJoinPrimeInfo {
	1:required string url;
    2:required string title;   // 使用 %s 占位给 params 填充
    3:required list<string> params;
}

struct TPremium {
    1: required bool available
    2: required string bannerUrl
}

struct TCat {
    1:required i32 dcid;
    2:required string dcname;
}

struct TProductBanner {
    1:required string img;
    2:required string link;
    3:required string text;
}
