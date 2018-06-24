namespace java com.daigou.sg.webapi.apphomepage
namespace objc TRHomepage
namespace javascript TRPC
namespace swift TR
namespace go rpc.app.homepage

struct THomePageEntrance {
    1: required string name;
    2: required string imageURL;
    3: optional string link;			//支持http ezbuyapp协议
    // 如果是floor 类型的区域，下面的结构体就是滑动列表的单元格
    4: optional list<TFloorEntity> floorEntities; // floor entrances
    5: optional string desc;
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

struct THomePageArea {
    1: required TShowArea type;
    2: required string name;
    3: required list<THomePageEntrance> entranceList;
    4: required TGroupLayoutInfo groupLayoutInfo;
    5: optional string link;			// 支持http ezbuyapp 协议
}

struct TGroupLayoutInfo {
    1: required TLayoutType layoutType;		// 布局模式，可用值[Activity,Grid,Banner](Banner暂不考虑)
    2: required i32 columnCount;
    3: required double cellRatio;			// 单元格长款比例：width : height
    4: optional string titleColor; 			// #123456，缺省使用默认颜色
    5: required i32 bottomGap;					// Area间距, 单位pt
    6: optional TFloorEntitiesLayoutInfo floorEntitiesLayoutInfo; // floor的Entities约束
}

struct TFloorEntitiesLayoutInfo {
    1: required double cellRatio; // 单元格长款比例：width : height
    2: required double screenCount; //一屏显示多少个
    2: required double margin; //每个单元格的间距
}

enum TFloorEntityType {
    Product = 1
    Banner = 2
}

// UI上需要在特殊的位置显示
enum TShowArea {
    Other = 0
    Activity = 1
    ShoppingGuide = 2
    Hot= 3
    TopBanner = 4
    BelowFlashBanner = 5
    TrendingBanner = 6
    Floor = 7
    TimeLineBanner = 8
    PrimeRecentPurchase = 9
}

enum TLayoutType {
    Other = 0
    Activity = 1
    Grid = 2
    Banner = 3
    List = 4
    Floor = 5
    PurchaseGrid = 6
}

struct TParam {
    1: optional bool hasFloor;
}

service AppHomePage {
    list<THomePageArea> GetHomePageShowArea();
    list<THomePageArea> GetHomePageAreas(1:optional TParam param);
    list<THomePageArea> GetPrimeHomePageAreas();
}
