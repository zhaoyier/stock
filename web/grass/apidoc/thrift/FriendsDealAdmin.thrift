namespace go apigen.friendsDealAdmin


struct TGroupBuySetting {
    1:required string id;            //团购活动id
    2:required string name;         //团购活动名称
    3:required i64 startTime        //活动开始时间
    4:required i64 endTime        //活动结束时间
    5:required bool    isActive;        //是否启用
    6:required string nation;   //支持国家
    //7:required list<TGroupBuyProduct> products;//团购商品集合
}

struct TGroupBuyResult {
    1:required string message;
    2:required bool result;
}

struct TGroupBuyProduct{
    1:required string productUrl;    //商品标准url
    2:required string rebateUrl;    //商品返利url
    3:required string productImage; //商品图片
    4:required list<TProductSku> skuStocks;    //sku库存,没有sku以商品refid作为sku
    5:required string tag;            //团购商品分类
    6:required i32 maxBuy;            //限制单个用户可以购买的数量限制
    7:required i32 minPersons;// 成团人数
    8:required double virtualPrice;        //运营定价虚拟 rmb,没有就用原价
    9:required double groupPrice; // 成团价格 rmb = 商品价格+运费+代购费 //运输方式所有商品同国家相同，运费再计算，代购费为4% 商品价+运费
    10:required double actualPrice; // 运营定价实际
    11:required double transportFee;//运费
    12:required double agentFee;//代购费
    13:required string settingId;//所属团购id
    14:required string productId;//商品id
    15:required i32 totalStock; //总库存
    16:required double price;// 商品库中的商品价
    17:required bool isActive;// 商品上下架
    18:required string originUrl;// 原始商品url
    19:required double weight; // 商品重量
    20:required i64 startTime;
    21:required i64 endTime;
    22:required double actualOriginPrice;//运营产地定价
    23:required string originCode; // 商品原产地
    24:required i64 pcid;//发布类目id
    25:required i64 tcid;//淘宝类目id
    26:required double exchange; //商品库提供的汇率
    27:required string refId;
    28:required TSinglePrice singlePrice;
    29:required bool isExcel;
    30:required bool disableSingle; // 禁止单人团
    31:required i64 gpid;
    32:required string productName;
    33:required i32 groupTimeoutHours; // 小团定时超时小时数
    34:required bool canVirtual; // 虚拟成团开关，默认 false
    35:required bool isHiden;// 隐藏活动商品，不在列表页显示
    45:required i32 createLimitTimes; // 开团次数限制
    46:required i32 allLimitTimes; // 入团次数限制
}

struct TSinglePrice {
    1:required double groupPrice; // 成团价格 rmb = 商品价格+运费+代购费 //运输方式所有商品同国家相同，运费再计算，代购费为4% 商品价+运费
    2:required double groupOriginPrice; // 成团价格 rmb = 商品价格+运费+代购费 //运输方式所有商品同国家相同，运费再计算，代购费为4% 商品价+运费
    3:required double actualPrice; // 运营定价实际
    4:required double actualOriginPrice;//运营产地定价
    5:required double transportFee;//运费
    6:required double agentFee;//代购费
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
    3:required bool isActive; // 激活
}


struct TGroupBuyRateResult {
    1:required string message;
    2:required bool result;
    3:required double price;
}

// banner 区域
struct TBanner {
    //1: required i32 index; // 位置
    1: required string name; 
    2: required string imageURL;
    3: required i64 startAt;
    4: required i64 endAt;
    5: required bool visible;  // 可视？
    6: required string ezbuyProtocol;    // 点击行为，可以为空，或者ezbuy协议格式的跳转链接，其他返回错误
    7: required string id;// banner元素的唯一id
    8: required string platform; // "H5" / "WEB"
}

struct TTimeoutOrderMember {
    1: required string Id;
    2: required i32 CustomerId;
    3: required i32 PaymentBillId;
    4: required i32 Qty;
    5: required string CatalogCode;
    6: required bool IsCaptain;
    7: required bool IsPayed;
    8: required bool IsCannceled; 
    9: optional list<string> OrderNumber;
    10: required string CreateDate;
    11: required string UpdateDate;
    12: required list<TOrder> Orders;
}

struct TOrder {
    1: required i32 OrderId;
    2: required string OrderNumber;
    3: required i32 PaymentBillId;
    4: required i32 CustomerId;
    5: required i32 OrderStatusId;
    6: required string OPurchaseType;
    7: required i32 PackageStatusId;
    8: required string OriginCode;
    9: required string PPurchaseType;
    10: required string Notes;
    11: required string NewOrderStatusName;
    12: required string OldOrderStatusName;
    13: required i32 OrderHistoryId;
    14: required i32 PackageId;
    15: required i32 OrderItemId;
    16: required i32 Qty;
    17: required string ProductRemark;
    18: required i64 SkuId;
    19: required string Sku;
    20: required double SkuPrice;
    21: required string WareHouseCode;
    22: required string ProductUrl;
}

struct TTimeoutOrder {
    1: required string Id;
    2: required string GroupBuyNo;
    3: required string Url;
    4: required string CreateDate;
    5: required string GroupId;
    6: required string RefId;
    7: required bool Status;
    8: required string UpdateDate;
    9: required string CatalogCode;
    10: required i32 ObtainStock;
    11: required string StartDate;
    12: required string EndDate;
    13: required i32 MinPersons;
    14: required i32 HandleExceptionStatus;
    15: required bool IsSuccessed;
    16: required list<TTimeoutOrderMember> Members;
    17: required string OriginCode;
    18: required i32 MaxBuy;
    19: required string ProductOriginCode;
}

struct TCondition {
    // "2017-01-01"
    1: optional string Date;
    2: optional bool IsSuccessed;
    3: optional string CatalogCode;
    4: optional list<string> Ids;
    5: optional i32 PaymentBillId;
    6: optional i32 MinPersons;
    7: optional string Query;
    8: optional bool NeedFix;
    10: optional FixType FixType;
}

enum FixType {
    Timeout = 0
    Local = 1
}

enum TShareType {
    Other = 0
    Product = 1
}

struct TGroupShare {
    1: required string title;
    2: required i32 type;
    3: required string imageURL;
    4: required string description;
}

service FriendsDealAdmin {

    //新增团购活动
    TGroupBuyResult AddGroupBuySetting(1:TGroupBuySetting setting),

    //删除团购活动
    TGroupBuyResult DeleteGroupBuySetting(1:string settingId),

    //更新团购活动
    TGroupBuyResult UpdateGroupBuySetting(1:string settingId,2:TGroupBuySetting setting),

    //开启或者关闭团购活动   规则：活动任意时刻上下架
    TGroupBuyResult EnableGroupBuySetting(1:string settingId,2:bool isActive),

    //新增团购商品  规则：随时可以添加商品，同期活动不能有相同商品
    TGroupBuyResult AddGroupBuyProduct(1:string settingId, 2:TGroupBuyProduct product),

    // 抓取指定url的商品库中的商品
    TGroupBuyProduct GetProductInfoByUrl(1:string nation, 2:string productUrl),

    // 转换src CatalogCode货币到dest CatalogCode货币
    TGroupBuyRateResult ExchangeRate(1:string src,2:string dest,3:double price,4:optional i64 pcid,5:optional i64 tcid),

    //根据id获取团购活动
    TGroupBuySetting GetGroupBuySettingById(1:string settingId),

    //删除团购活动里的一个商品
    TGroupBuyResult DeleteGroupBuyProduct(1:string settingId, 2:string productId),

    //上下架一个商品  规则：活动开始后，只能下架
    TGroupBuyResult ActiveProduct(1:string productId,2:bool isActive),

    //修改团购活动里的一个商品  规则：活动没开始，可以修改商品任意项，活动开始后 只可修改 rebateUrl、productImage、tag、virtualPrice
    TGroupBuyResult UpdateGroupBuyProduct(1:string settingId, 2:TGroupBuyProduct product),

    //获取团购活动列表
    TGroupBuySettingResponse GetGroupBuySettingList(1:i32 offset, 2:i32 limit,3:string nation),

    //获取一个团购活动的商品列表(不分页)
    list<TGroupBuyProduct> GetGroupBuyProductList(1:string settingId),

    //获取一个团购商品的信息
    TGroupBuyProduct GetProductInfo(1:string settingId, 2:string productId),

    // 插入和更新团购页面的tag
    TGroupBuyResult UpdateTag(1:string nation,2:i32 index,3:string tagName),

    // 获取团购页面的tags  
    list<TGroupBuyTag> GetTags(1:string nation),

    // 删除团购页面的tag
    TGroupBuyResult DeleteTag(1:string nation,2:i32 index),

    // 激活/关闭 tag
    TGroupBuyResult ActiveAllTag(1:string nation,2:bool isActive),

    // 获取banner 列表
    list<TBanner> GetBanners(1:string nation),

    // 更新banner
    TGroupBuyResult UpdateBanner(1:string nation,2:TBanner banner),

    // 删除banner
    TGroupBuyResult DeleteBanner(1:string nation,2:string id),

    // 插入banner  // nextId 为下一个banner 的id，若为“”则为添加到最后
    TGroupBuyResult InsertBanner(1:string nation,2:TBanner banner,3:string nextId),

    // 查看应超时退款的订单及订单成员
    list<TTimeoutOrder> GetTimeoutOrders(),

    // 根据条件查看拼团订单及订单成员
    list<TTimeoutOrder> GetOrders(1:TCondition con),

    // 导入excel 数据 ， formvalue 中settingId 字段赋值
    TGroupBuyResult ImportGroupbuyExcel(),

    // 翻译
    TGroupBuyResult TranslateProductName(),

    // 根据groupID 获取分享商品信息
    TGroupShare GetGroupShareByGroupID(1:string groupID),
}

