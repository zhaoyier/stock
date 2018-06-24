// This API is only implemented in webapi
namespace go ezbuy.apidoc.gen.mine
namespace java com.daigou.sg.webapi.mine
namespace swift TR

include "Product.thrift"

struct TMineOrderStatus {
    1: double prePay; // PrePay amount without symbol
    2: i32 numberOfPendingPayment;
    3: i32 numberOfProcessing;
    4: i32 numberOfreadyToShip;
    5: i32 numberOfshipment;
    6: bool isPendingPaymentActionNeeded;
    7: bool isProcessingActionNeeded;
    8: bool isReadyToShipActionNeeded;
    9: bool isShipmentActionNeeded;
    10: i32 numberOfShoppingCart;	// count of items in ShoppingCart  add by zw 20160725
	11: string orderHistoryDesc; //用于展示OrderHistory的小红点文案，如为空字符串，则不展示小红点和文案。
	12: i32 numberOfPendingPaymentWithType;
}

struct TMineItem {
    1:required string icon;
    2:required string title;
    3:required bool unavailable;
    4:required string link;
    5:required TMineItemType type; //只有当类型是Other时候,icon title link才是有效值
}

struct TUserRenewSessionResult {
	1: required bool isAuthroized;
	2: required string message;
	3: optional string altMessage;
    
}

struct TGetForcedUpdateAPIsResult {
    1: optional list<TForcedUpdateAPI> androidAPIList;
    2: optional list<TForcedUpdateAPI> iosAPIList;
}

struct TForcedUpdateAPI {
    1: required string apiString; // eg. thrift api: Mine/UserRenewSession proto api: /chest.Favourite/Ping 客户端匹配时, 不区分大小写
    2: required i32 minSupportVersion; // eg. 910
    3: required string message;
}

enum TMineItemType {
    Other = 0
    Favorite = 1
    Credit = 2
    Voucher = 3
    Coins = 4
    ShipForMe = 5
    Enquiry = 6
    Review = 7
    FAQ = 8
    JoinPrime = 9
    ShopForFee = 10
    TalkToUs = 11
    PrimeWishList = 12    
    SURF = 13
}

enum TTabbarItemType {
    Home
    Surf
    Prime
    Cart
    Mine
}

struct TTabbarItem {
    1: required string title;
    2: required string normalUrl;
    3: required string highlightUrl;
    4: required TTabbarItemType type;
}

struct TQiniuInfo {
    1: required string token;
    2: required string urlPrefix;
}

service Mine {
    TMineOrderStatus UserGetOrderStatusInfo(),
    list<Product.TSimpleProduct> UserGetYouMayLike(),
    list<TMineItem> UserGetMineServiceList(),
	
	/// <summary>
	/// 检测当前用户是否处于登录状态
	/// </summary>
	/// <returns></returns>
	TUserRenewSessionResult UserRenewSession(1:string sessionId),
	
	/// <summary>
	/// 获取API强制升级列表
	/// </summary>
	/// <returns></returns>
	TGetForcedUpdateAPIsResult GetForcedUpdateAPIs(),

    /// <summary>
    /// 获取tabbar配置
    /// </summary>
    /// <returns></returns>
    list<TTabbarItem> UserGetTabbarItems(),
	
	/// <summary>
    /// 获取七牛配置
    /// </summary>
    /// <returns></returns>
    TQiniuInfo GetQiniuInfo(),
}
