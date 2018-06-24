namespace go rpc.app.homepageAdmin

// app 首页配置管理后台
// 除了banner 以外的区域
enum TViewType {
    Other = 0     // 含banner
    Activity = 1  // 活动
    ShoppingGuide = 2  //导购
    Hot= 3 // 热卖
    TopBanner = 4
    BelowFlashBanner = 5
    TrendingBanner = 6
    Floor = 7
    TimeLineBanner = 8
    PrimeRecentPurchase = 9
}

// banner 区域
struct TBanner {
    1: required i32 index; // 位置
    2: required string name;
    3: required string imageURL;
    4: required i64 startAt;
    5: required i64 endAt;
    6: required bool visible;  // 可视？
    7: required string ezbuyProtocol;	// 点击行为，可以为空，或者ezbuy协议格式的跳转链接，其他返回错误
    8: required string id; // 唯一id
    9: required i32 activityId
}

struct TView {
    1: required string id; // 唯一id
    2: required TViewType typeval;
    3: required string name;
    4: required string imageURL;
    5: required string ezbuyProtocol;	// 点击行为，可以为空
    6: optional string areaName;
    7: optional i64 startAt;  // 开始时间
    8: optional i64 endAt;
    9: optional list<TFloorEntity> floorEntities;
    10: required string areaLink; // 区域link
    11: required i32 activityId
}

enum TFloorEntityType {
    Product = 1
    Banner = 2
}

enum TWhere {
    Shop = 0;
    Prime = 1;
    PrimeLogin = 2;
}

struct TFloorEntity {
    // 标记商品或banner
    1: required TFloorEntityType type;
    2: required string name;
    3: required string imageURL;
    4: required string link;
    5: required string price; // 后端处理货币符号及印尼价格进制
    6: required string oriPrice;
    7: required string discount; // 后端处理折扣信息
}

service HomepageAdmin {
    // 暂时未使用
    TBanner GetBanner(1:string Nation,2:i32 index),
    // 获取banner 列表
    list <TBanner> GetBanners(1:string Nation),
    // 更新banner
    bool UpdateBanner(1:string Nation,2:TBanner banner),
    // 删除banner
    bool DeleteBanner(1:string Nation,2:string id),
    // 暂时未用
    TView GetView(1:string Nation,2:i32 index),
    // 更新view
    bool UpdateView(1:string Nation,2:TView view),
    // 删除view
    bool DeleteView(1:string Nation,2:string id),
    // 获取views 列表
    list <TView> GetViews(1:string Nation,2:TViewType typeval, 3:TWhere where),
    // 更新 区域链接 ，例如more 的link
    bool UpdateAreaMoreLink(1:string Nation,2:TViewType typeval,3:string Name,4:string Link, 5:TWhere where),
    // 插入view  // nextId 为下一个banner 的id，若为“”则为添加到最后，若不为空表示移动到nextid前面	, view.id 若为空表示插入，view.id 不为空表示移动
    bool InsertView(1:string Nation,2:TView view,3:string nextId, 4:TWhere where),
    // 获取区域列表 （where：0/1）
    list <TViewType> GetViewsOrder(1:string Nation, 2:TWhere where),
    // 设置区域显示顺序,order为type的排序数组
    bool SetViewsOrder(1:string Nation,2:list<i32> order, 3:TWhere where),
    // 向floor导入商品或banner, formvalue "ID"
    bool ImportEntitiesToFloor(),
}
