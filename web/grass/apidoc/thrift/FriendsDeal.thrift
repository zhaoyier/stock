namespace go apigen.friendsDeal

struct TGroupBuyProduct{
	1:required string productUrl;	//商品标准url
//	2:required string rebateUrl;	//商品返利url
	3:required string productImage; //商品图片
//	4:required list<TProductSku> skuStocks;	//sku库存,没有sku以商品refid作为sku
	5:required string tag;			//团购商品分类
//	6:required i32 maxBuy;			//限制单个用户可以购买的数量限制
	7:required i32 minPersons;// 成团人数
	8:required double virtualPrice;		//运营定价虚拟 rmb
	9:required double groupPrice; // 成团价格 rmb = 商品价格+运费+代购费 //运输方式所有商品同国家相同，运费再计算，代购费为4% 商品价+运费
//	10:required double actualPrice; // 运营定价实际
//	11:required double transportFee;//运费
//	12:required double agentFee;//代购费
	13:required string settingId;//所属团购id
	14:required string productId;//商品id
	15:required i32 totalStock; //总库存
    16:required double price;// 商品库中的商品价
	17:required bool isActive;// 商品上下架
	18:required string originUrl;// 原始商品url
//	19:required double weight; // 商品重量
	20:required i64 startTime;
	21:required i64 endTime;
	22:required string productName;// 商品名字
	23:required i32 currentStock; //当前库存
	24:required i32 currentJoinCount;//当前参团人数
	//   25:required i32 groupbuyStatus; // 团购当前状态，0：未开始，1：进行中，2：已结束
	26:required i32 currentSold; // 当前售出数
	27:required list<string> currentSkuStock;  // 当前各sku 库存
	28:required bool isNew; // 是否是最新一期活动商品
	29:required bool isHot; // 是否是 sold deals 数量排名前三的商品
	30:required string discountRate;  // 折扣信息
	31:required string originCode;
	32:required string originCountry;
	33:required string originInfo;
	34:required i64 gpid;
	35:required string originalProductName; // 原始商品名
}

struct TSearchCondition{
	1:required i32 searchType;	//0:hot	1:starting on	2:comming soon
	2:required string tag;		//商品在后台设置的tag，为空表示all
//	3:required i32 offset;   // 请求列表起始索引
	3:required i32 limit;  // 一次请求列表数量
	4:required string productId; // 列表最后一个商品的id,为空"",代表初始请求
	5:required i32 sortType; // 排序方式  0: 活动开始时间距离当前时间最近的商品显示在最前面
	6:required string nation; // 国家
  	7:required list<string> top3Ids; //当前top3 id，只在productid不为空的情况下有效
}

struct TGroupBuyTag{
	1:required i32 index;    // 位置
	2:required string tagName;  // tag 类目名
	3:required bool isActive; // 激活
}


service FriendsDeal {

  //获取分类
  list<TGroupBuyTag>GetTags(1:string nation),
  //获取团购列表数据
  list<TGroupBuyProduct> GetGroupBuyProducts(1:TSearchCondition condition),
  //获取团购订单提示状态
 // TGroupBuyOrderStatus GetOrderStatus(1:i32 uid),

}
