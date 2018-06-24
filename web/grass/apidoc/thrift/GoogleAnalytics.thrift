namespace go ezbuy.apidoc.googleanalytics

struct ProductGAInfo {
	1:required string id;
	2:required string name;
	3:required double price;
	4:required string brand;
	5:required string mainCategory;
	6:required string subCategory;
	7:required string subSubCategory;
	8:optional i32 qty;
	9:optional string sku;
	10:required double exchange;
}

struct AutionField {
	1:required i64 id; // 订单 id
	2:required string paymentNumber; // 付款号
	3:required string affiliation;
	4:required string revenue;
	5:required string tax;
	6:required string shipping;
	7:required string coupon;
	8:required ProductGAInfo product;
}

struct PaymentInfo {
	1:required string paymentNumber; // 付款号
	2:required i32 total;            // 金额 x100
	3:required string paymentType;  // ship4me buy4me ezbuy prime primemembership other
	3:required string paymentMethod;
}

struct TopUpPaymentInfo {
	1:required i32 total; // 金额 x100
	2:required string paymentMethod;
	3:required list<PaymentInfo> paymentInfo;
}

// 购物车类型
enum CartType {
    Normal,
    Prime,
}

struct PurchaseGAInfo {
	1:required list<AutionField> autionFields;
	2:required string localDelivery;
	3:required string paymentMethod;
	4:required string purchaseType;
}

service GoogleAnalytics {
	ProductGAInfo GetProductGAInfo(1:string productUrl);

	ProductGAInfo GetProductGAInfoByBasket(1:i32 cartId, 2:CartType cartType);

	// argType: billId, billNo, pkgId, shipId ...
	PurchaseGAInfo GetPurchaseGAInfo(1:string argType, 2:string argVal);

	list<PurchaseGAInfo> GetPurchaseGAInfos(1:string topUpNumber);

	// 用户 id 从 cookie 中获取
	list<ProductGAInfo> GetProductGAInfosWhenCheckout(1:CartType cartType);

	list<ProductGAInfo> GetProductGAInfoByBasketIds(1:list<i32> cartIds, 2:CartType cartType);

	TopUpPaymentInfo GetTopUpPaymentInfo(1:string topUpNumber);
}
