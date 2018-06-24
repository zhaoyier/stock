namespace go ezbuy.apidoc.gen.groupbuyadmin


struct TGroupBuySetting {
	1:required string id;			//团购活动id
	2:required string name; 		//团购活动名称
	3:required i64 startTime		//活动开始时间
	4:required i64 endTime		//活动结束时间
	5:required bool	isActive;		//是否启用
	6:required list<string> countries;//支持国家
	7:required list<TGroupBuyProduct> products;//团购商品集合
}

struct TGroupBuyResult {
	1:required string message;
	2:required bool result;
}

struct TGroupBuyProduct{
	1:required string productUrl;	//商品标准url
	2:required string rebateUrl;	//商品返利url
	3:required string productImage; //商品图片
	4:required list<TGroupBuyProductItem> productItems;	//团购阶梯属性
	5:required double prepay;		//定金金额
	6:required list<TProductSku> skuStocks;	//sku库存,没有sku以商品refid作为sku
	7:required string tag;			//团购商品分类
	8:required i32 limit;			//限制单个用户可以购买的数量限制
}

struct TGroupBuyProductItem {
	1:required i32 minQty;		//达成团购的最小人数
	2:required double price;	//要支付的商品金额
	3:required i32 priority;	//达成团购的优先级 prioriry越低表示优先级越高
}

struct TProductSku{
	1:required string skuId;
	2:required string skuName;
	3:required i32 stock;
}

struct TGroupBuySettingResponse{
	1:required i32 total;
	2:required list<TGroupBuySetting> groupBuySettings;
}

struct TGroupBuyTag{
	1:required i32 index;    // 位置
	2:required string tagName;  // tag 类目名
}

// banner 区域
struct TBanner {
	//1: required i32 index; // 位置
	1: required string name; 
	2: required string imageURL;
	3: required i64 startAt;  
	4: required i64 endAt;
	5: required bool visible;  // 可视？
	6: required string ezbuyProtocol;	// 点击行为，可以为空，或者ezbuy协议格式的跳转链接，其他返回错误
	7: required string id;// banner元素的唯一id
}

service GroupBuyAdmin {

	//新增团购活动
	TGroupBuyResult	AddGroupBuySetting(1:TGroupBuySetting setting),

	//删除团购活动
	TGroupBuyResult DeleteGroupBuySetting(1:string settingId),

	//开启或者关闭团购活动
	TGroupBuyResult EnableGroupBuySetting(1:string settingId),

	//新增团购商品
	TGroupBuyResult AddGroupBuyProduct(1:string settingId, 2:TGroupBuyProduct product),

	//根据id获取团购活动
	TGroupBuySetting GetGroupBuySettingById(1:string settingId),

	//删除团购活动里的一个商品
	TGroupBuyResult DeleteGroupBuyProduct(1:string settingId, 2:string productUrl),

	//修改团购活动里的一个商品
	TGroupBuyResult UpdateGroupBuyProduct(1:string settingId, 2:TGroupBuyProduct product),

	//获取团购活动列表
	TGroupBuySettingResponse GetGroupBuySettingList(1:i32 offset, 2:i32 limit),

	//获取一个团购活动的商品列表(不分页)
	list<TGroupBuyProduct> GetGroupBuyProductList(1:string settingId),

	//获取一个团购商品的信息
	TGroupBuyProduct GetProductInfo(1:string settingId, 2:string productUrl),
	
	// 插入和更新团购页面的tag
	TGroupBuyResult UpdateTag(1:string nation,2:i32 index,3:string tagName),
	
	// 获取团购页面的tags  
	list<TGroupBuyTag> GetTags(1:string nation),
	
	// 删除团购页面的tag
	TGroupBuyResult DeleteTag(1:string nation,2:i32 index),
	
	// 获取banner 列表
	list<TBanner> GetBanners(1:string nation),
	
	// 更新banner
	TGroupBuyResult UpdateBanner(1:string nation,2:TBanner banner),
	
	// 删除banner
	TGroupBuyResult DeleteBanner(1:string nation,2:string id),
	
	// 插入banner  // nextId 为下一个banner 的id，若为“”则为添加到最后
	TGroupBuyResult InsertBanner(1:string nation,2:TBanner banner,3:string nextId)
	
	// 导入excel 数据 ， formvalue 中settingId 字段赋值
	TGroupBuyResult ImportGroupbuyExcel(),
	
}
