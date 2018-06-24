namespace java com.daigou.sg.rpc.collection
namespace objc TRCollection
namespace javascript TRPC
namespace swift TRCollection
include "Common.thrift"

struct TCollection {
	2: required string id;			// collection唯一标识
	3: required string name;		// collection名称
	4: required i32 productCount;	// collection包含商品数量
	5: optional string pic1;		// 产品图片1
	6: optional string pic2;		// 产品图片2
	7: optional string pic3;		// 产品图片3
}

struct TCollectionForList {
	2: required string id;				// collection唯一标识
	3: required string name;			// collection名称
	5: optional TProductSimple p1;		// 产品1
	6: optional TProductSimple p2;		// 产品2
	7: optional TProductSimple p3;		// 产品3
	8: optional TProductSimple p4;		// 产品4
	9: required i32 productCount;	// collection包含商品数量
}

struct TProductSimple {
	2: required string url;			// 商品url
	3: required string name;		// 商品名称
	4: required string price;		// 商品价格，带货币符号
	5: required string picture;		// 商品图片
	6: required i32 favouriteCount;
	7: required string originCode;	//采购国家
	8: required string vendorName;	//卖家名字
	9: required string enName;		//商品英文名称
	10: required string customerLocalPrice;	//顾客本地货币商品价格，带货币符号
	11: required bool isEzBuy;	//是否是EzBuy商品
	12: optional string originCountry;              // 商品来源地国家，可根据此选择要展示的国旗
    13: required string originalLocalUnitPrice;     //汇率转换后的商品原始价格
    14: required string discountRate;               //折扣率  例如 50% off
    15: required bool isCashOffProduct;             //是否是满减商品
    16: optional string cashOffColor;				// #123456
	17: required Common.TIcon icon;                 //# 右上角标
}

service Collection {
	list<TCollection> GetFeatured(1:string originCode, 2:i32 offset, 3:i32 limit),
	list<TCollectionForList> GetFeaturedForList(1:string originCode, 2:i32 offset, 3:i32 limit),
	list<TProductSimple> GetProducts(1:string id, 2:i32 offset, 3:i32 limit),
	TCollection GetCollection(1:string id)
}
