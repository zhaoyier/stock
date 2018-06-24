namespace go trendingShow

struct TCollection {
	1: required string id;			// collection唯一标识
	2: required string name;		// collection名称
	3: required i32 productCount;	// collection包含商品数量
	4: optional string pic1;		// 产品图片1
	5: optional string pic2;		// 产品图片2
	6: optional string pic3;		// 产品图片3
	7: required string originCode;  //collectionOriginCode
}

struct TCollectionForList {
	1: required string id;				// collection唯一标识
	2: required string name;			// collection名称
	3: optional TProductSimple p1;		// 产品1
	4: optional TProductSimple p2;		// 产品2
	5: optional TProductSimple p3;		// 产品3
	6: optional TProductSimple p4;		// 产品4
	7: required i32 productCount;	// collection包含商品数量
}

struct TProductSimple {
	1: required string url;			// 商品url
	2: required string name;		// 商品名称
	3: required string price;		// 商品价格，带货币符号
	4: required string picture;		// 商品图片
	5: required string oriPrice;   //淘宝原价格
	6: required string discountRate;  //折扣率  例如 50% off
	7: required string vendorName;  //品牌名
	8: required string originCode;  //product originCode
	9: required string originName; //商品原始名
}

struct TCollectionProduct {
	1:required TCollection collection;
	2:required list<TProductSimple> product;
}

service Collection {
	list<TCollection> GetFeatured(1:string originCode, 2:i32 offset, 3:i32 limit),
	list<TCollectionForList> GetFeaturedForList(1:string originCode, 2:i32 offset, 3:i32 limit),
	TCollectionProduct GetProducts(1:string id, 2:i32 offset, 3:i32 limit,4:string originCode),
}