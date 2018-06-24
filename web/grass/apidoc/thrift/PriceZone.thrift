namespace go zonetrpc


struct TZone{
	1:required string zid;
	2:required list<TCountryToTitle> countryToTitle;//国家
	3:required string zoneName;//专区名 （唯一）
	4:required double minPrice;//最小价格  当价格填写为0时表示为不限制价格
	5:required double maxPrice;//最大价格
	6:required i32 storeCount;//库存数量
	7:required i32 limitCount;//显示商品数量限制
	8:required i32 updateTime;//刷新时间 单位minuter
	9:required list<string> categorys;//类目
	10:required bool isShow;//是否显示
	11:required i32 sourceId;//源id
}

struct TCountryToTitle{
	1:required string country
	2:required string title
}

struct TBanner{
	1:required string bannerId;
	1:required string bannerName;
	2:required string bannerImg;
	3:required string url;
	4:required string country;
	5:required bool isShow;
	6:required string platform;
}

struct TBoolReply{
	1:required bool isSuccess
	2:required string ret
}

struct TBoolReplyAndSourceId{
	1:required bool isSuccess
	2:required string ret
	3:required i32 sourceId
}

struct TProduct{
	1:required string id
	2:required string zId
	3:required string name
	4:required string url
	5:required string price
	6:required string originPrice
	7:required string originCode
	8:required double weight
	9:required string picture
	10:required bool isRemove
	11:required i32 transportType
	12:required string category //所在类目
	13:required double order //排序
	14:required i32 isShowStage //是否满足显示前台
	15:optional double discountRate //折扣比例
	16:required string originName  //商品原名
	17:required string vendorName  //供应商名
	18:required bool isPrime //isPrime
	19:required i64 gpid
}

struct TExchange{
	1:required string catalogCode
	2:required double exchangeRate
}

struct TProductsAndCount{
	1:required list<TProduct> products
	2:required i32 count
}


service PriceZone{
	//后台
	//得到所有专区
	list<TZone> GetZone()

	//增加专区
	TBoolReplyAndSourceId AddZone(1:TZone zone)

	//编辑专区(根据专区名与国家唯一)
	TBoolReply EditZone(1:TZone zone)

	//删除专区
	TBoolReply  DeleteZone(1:string zid)//专区的唯一Id

	//excel导入专区商品
	//excel格式为(专区名,国家,类目,url,weight,运输方式(normal,special),isPrime)
	TBoolReply ImportZoneProduct()

	//得到一个类目下的商品
	TProductsAndCount GetProducts(1:string zid,2:string category,3:i32 offset,4:i32 limit,5:i32 param)

	//编辑商品
	TBoolReply EditProduct(1:string productId,2:string name,3:string url,4:double price,5:string picture,6:bool isRemove,7:double weight,8:i32 transportType,9:bool isPrime)

	//排序商品
	TBoolReply ProductDoSort(1:string prevId,2:string nextId,3:string sortId)

	//置顶
	TBoolReply ChangeTop(1:list<string> productIds,2:string zid,3:string category)

	//增加商品
	TBoolReply AddProduct(1:string zid,2:string category,3:string url,4:double weight,5:i32 shipmentInfo,6:bool isPrime)

	//删除
	TBoolReply  DeleteProduct(1:list<string> productIds,2:string zid,3:string category)

	//得到Zone 前台
	list<TZone> GetZoneByShow(1:string country)

	//得到Product 前台
	TProductsAndCount GetProductsByShow(1:string zid,2:string category,3:i32 offset,4:i32 limit,5:string originCode)

	//得到汇率
	list<TExchange> GetExchageByCountry(1:string country)

	//AddBanner
	TBoolReply  AddBanner(1:TBanner banner)

	//EditBanner
	TBoolReply  EditBanner(1:TBanner banner)

	//得到所有Banner
	list<TBanner> GetBanners()

	//Banner显示前台
	list<TBanner> GetBannersByPlatform(1:string originCode,2:string platform)

	//删除Banner
	TBoolReply DeleteBanner(1:string bannerId)

	//手动刷新商品
	TBoolReply HandleFreshProductByZid(1:string zid)

	//得到重量
	TBoolReply ImportGetIsHaveWeight()
}
