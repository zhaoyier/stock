namespace go featurecollection.trending.trpc.collection


struct TCollection{
	1:required string id 
	2:required string name 
	3:required double order 
	4:required i32 productCount 
	5:required string pic1 
	6:required string pic2 
	7:required string pic3 
	8:required string originCode 
	9:required bool isActive  
}

struct TStringReply{
	1:required list<TCollection>  ProList
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
}

struct TAddReply{
	1:required string Ret
	2:required bool  isSuccess
}

struct TUpdateReply{
	1:required i16 code
	2:required string ret
}

struct TCollectionReply{
	1:required TCollection result
}

struct TEditProductReply{
	1:required string result
	2:required bool isSuccess
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

service FeatureCollection {
	TStringReply GetCollections(1:i32 limit,2:i32 offset,3:string originCode)
	TAddReply AddCollection(1:string name,2:string originCode)
    TUpdateReply UpdateName(1:string name,2:string collectionId)
    TUpdateReply UpdatePrime(1:string collectionId,2:bool isPrime)
    TUpdateReply UpdateActive(1:string collectionId,2:bool active)
    TCollectionReply GetCollection(1:string collectionId)
    TUpdateReply UpdatePic(1:string collectionId,2:string imageKey,3:string pickey)
    TEditProductReply DoSort(1:string prevId,2:string nextId,3:string sortId)
    TUpdateReply UpdatePrice(1:string collectionId)
    list<TCollectionForList> GetFeaturedForList(1:string originCode, 2:i32 offset, 3:i32 limit),
}
