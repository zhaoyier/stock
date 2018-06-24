namespace go featurecollection.trending.trpc.product

struct TCollectionProductStruct{
	1:required string id 
	2:required string url 
	3:required string name 
	4:required string picture 
	5:required double price 
	6:required string collectionId 
	7:required double order 
	8:required bool isRemove 
	9:required string refId
}


struct TCollectionProduct{
	1:required TCollectionProductStruct product
	2:required double weight
}

struct TEditProductReply {
	1:required string result
	2:required bool isSuccess
}

struct TReplyProsByColl{
	1:required list<TCollectionProduct> products
	2:required string id
	3:required i32 productNum
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

service FeatureCollection {
   TReplyProsByColl GetProducts(1:string collectionId,2:i32 offset,3:i32 limit)
   TEditProductReply UpdateProduct(1:string productId,2:string name,3:string url,4:double price,5:string picture,6:bool isRemove,7:double weight)
   TEditProductReply DeleteProduct(1:string productId)
   TEditProductReply AddProduct(1:TCollectionProductStruct product)
   TEditProductReply ProductDoSort(1:string prevId,2:string nextId,3:string sortId)
   list<TProductSimple> GetFeatureProducts(1:string collectionId,2:i32 offset,3:i32 limit)
}
