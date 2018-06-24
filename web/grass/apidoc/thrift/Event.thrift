namespace go rpc.gospm.event
namespace swift TR
namespace java com.daigou.sg.webapi.spm

service Event {

	//-------------------------- UserLog ---------------------------------------------
	// 记录用户在app内打开ezbuyapp://web的协议行为
	void BrowseWeb(1:TEventBrowseWeb eventArgs),

	// 记录用户浏览商品详情页的行为
	void BrowseProductDetail(1:TEventBrowseProductDetail eventArgs),

	// 记录用户浏览了选择sku界面的行为
	void BrowseSelectSku(1:TEventBrowseSelectSku eventArgs),

	// 记录用户进行checkout的行为-> 进入Summary界面
	void Checkout(1:TEventCheckout eventArgs),

	// 记录用户在Summary界面点pay的行为, 传入transactionId进行关联
	void Purchase(1:TEventPurchase eventArgs),

	// 记录用户分享商品的行为
    void Shared(1:TEventShared eventArgs),

	// 记录用户搜索商品的行为
    void Search(1:TEventSearch eventArgs),

	// 记录类目
	void Category(1:TEventCategory eventArgs),
}

struct TEventBrowseWeb {
	1:required string ezspm;
}

struct TEventBrowseProductDetail {
	1:required string ezspm;
	2:required i64 gpid;
}

struct TEventBrowseSelectSku {
	1:required string ezspm;
	2:required i64 gpid;
}

struct TEventCheckout {
	1:required string ezspm;
	2:required list<i64> gpids;
}

struct TEventPurchase {
	1:required string ezspm;
	2:required list<i64> gpids;
	3:required string transactionId;
}

struct TEventShared {
	1:required string ezspm;
	2:required i64 gpid;
}

struct TEventSearch {
	1:required string ezspm;
	2:required string keyword;
}

struct TEventCategory {
	1:required string ezspm;
	2:required i64 categoryId;
}
