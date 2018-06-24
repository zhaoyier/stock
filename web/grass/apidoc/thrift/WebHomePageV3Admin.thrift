namespace go gen.webHomepageV3Admin
namespace webapi api



struct TChannel{
    1:required string channelName;
    2:required list<TProduct> productList;
    3:required string id;
    4:required string channelLink;
}

struct TPool{
    1:required string catalogCode;
    2:required string channelLink;
    3:required bool isBlocked;
    4:required list<TProduct> productList;
}

struct TFloor{
    1:required string floorName;  //楼层名
    2:required list<TChannel> channels;  //tab 列表
    3:required string floorNameLink;   // 楼层链接
    4:required string parentFloorId;  // 父楼层id
    5:required list<THotword> hotwords;	 // 热词列表
    6:required string imageURL;     //图片链接
    7:required string linkURL;  //链接地址     default: ''
    8:required string id; // 楼层唯一id
    9:required string iconURL; // 楼层对应的icon 图片地址
    10:required bool isActive; // 楼层是否激活
    11:required list<TBanner> banners;// hottab 中的banner列表
    12:required string color;
    13:required i32 activityId; //活动ID
}

struct THotword{
    1:required string name;
    2:required string link;
    3:required bool isLight;
    4:required string id;
}

struct TProduct{
    1:required string refId;
    2:required string url;
    3:required string picture;
    4:required string name;
    5:required string originCode;
    6:required string originName;
    7:required string vendorName;
    8:required double discountValue;
    9:required double originPrice;
    10:required double price;
    11:required bool isCashOff;
    12:required string id;
    13:required i64 gpid;
}

struct TproductFromSearch{
    1:required string url;
    2:required string name;
    3:required double price;
    4:required double originPrice;
    5:required string picture;
    6:required double discountValue;
    7:required bool isCashOff;
    8:required string vendorName;
    9:required string originCode;
    10:required string refId;
    11:required string originName;
    12:required string cashOffKey;
    13:required i64 gpid;
    14:required bool isBlocked;
}

struct TBanner{
    1:required string id; // 唯一id
    2:required string nation;         //国家CODE    default: SG
    3:required string lang;         //语言        default: en
    4:required string areaName;  //区域名称
    5:required string name;         //图片名称
    6:required string imageURL;     //图片链接
    7:required string link;  //链接地址     default: ''
    8:required bool visible;         //是否显示     default: false
    9:required bool newWindow;      //新窗口打开   default: false
    10:required i64 startAt;  // 开始时间
    11:required i64 endAt;
    12:required i32 activityId;
}

struct TResult {
    1:required string message
    2:required bool result
    3:required string id
}
struct TResultProList {
    1:required string message
    2:required bool result
    3:required list<TproductFromSearch> productList
}

struct TResultPro {
    1:required string message
    2:required bool result
    3:required TproductFromSearch product
}
struct TResultPool {
    1:required string message
    2:required bool result
    3:required TPool pool
}

service WebHomePageV3Admin{
    // 获取floor列表 parentFloorId 为空表示第一层
    // list<TFloor> GetFirstFloors()
    list<TFloor> GetFloorsByParentId(1:string nation,2:string parentFloorId)

    // 添加楼层   // 不需设置 TFloor 结构中的list 元素
    TResult AddFloor(1:string nation,2:TFloor floor)

    // 更新楼层 // 不需设置 TFloor 结构中的list 元素
    TResult UpdateFloor(1:string nation,2:TFloor floor)

    // 删除楼层
    TResult DeleteFloor(1:string nation,2:string id)

    // 移动楼层
    TResult MoveFloor(1:string nation,2:string id,3:string nextId)

    // 获取楼层
    TFloor GetFloorById(1:string id)

    // 更新热词
    TResult UpdateHotword(1:string nation,2:string floorId,3:THotword hotword)

    // 添加热词
    TResult AddHotword(1:string nation,2:string floorId,3:THotword hotword)

    // 删除热词
    TResult DeleteHotword(1:string nation,2:string floorId,3:string id)

    // 设置热词顺序
    TResult SortHotwords(1:string nation,2:string floorId,3:list<string> ids)

    // 更新channel  // 需设置productlist 元素,空则清除productlist
    TResult UpdateChannel(1:string nation,2:string floorId,3:TChannel channel)

    // 添加channel
    TResult AddChannel(1:string nation,2:string floorId,3:TChannel channel)

    // 删除channel
    TResult DeleteChannel(1:string nation,2:string floorId,3:string id),

    // 设置channel顺序
    TResult SortChannels(1:string nation,2:string floorId,3:list<string> ids)

    // 刷新管理端缓存数据
    TResult RefreshCache(1:string nation,2:string parentFloorId)

    // 搜索指定展示类目下的商品集合
    TResultProList ListProductsByCondition(1:i32 cid, 2:i32 limit, 3:i32 offset, 4:string language,5:optional bool isEzSeller),

    // 搜索url 指定的商品
    TResultPro FindProductByUrl(1:string url,2:string language),

    // 添加hottab 中的banner
    TResult AddHotTabBanner(1:string floorId,2:TBanner banner),

    // 删除hottab 中的banner
    TResult DeleteHotTabBanner(1:string floorId,2:string id),

    // 更新hottab 中的banner
    TResult UpdateHotTabBanner(1:string floorId,2:TBanner banner),

    // 设置hottab 中的banner顺序
    TResult SortHotTabBanners(1:string floorId,2:list<string> ids),

    // 更新hottab 中的banner列表
    TResult UpdateHotTabBanners(1:string floorId,2:list<TBanner> banners),

    // 添加商品到商品池
    TResult AddProducts2Pool(1:string channelLink,2:string catalogCode,3:list<TProduct> products),

    // 将商品池中的商品添加到黑名单
    TResult RemoveProductsFromPool(1:string channelLink,2:string catalogCode,3:list<TProduct> products),

    // 获取指定国家指定的channelLink 的商品池， isBlocked 是否屏蔽
    TResultPool GetPool(1:string channelLink,2:string catalogCode,3:bool isBlocked),

    //查询指定商品是否soldout
    TResult IsProductSoldout(1:string refId,2:optional string gpid),

    //从池中查询指定的商品
    TResultPool GetProductFromPool(1:string refId,2:optional string gpid),

    //从商品池直接移除，但不会添加到黑名单中
    TResult DeleteProductsFromPool(1:string channelLink,2:string catalogCode,3:list<i64> gpids),
}

