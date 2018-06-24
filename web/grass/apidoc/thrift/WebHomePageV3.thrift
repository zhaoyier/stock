namespace go gen.webHomepageV3
namespace webapi api

struct TChannel{
    1:required string channelName;
    2:required list<TProduct> productList;
    3:required string channelLink;
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
    10:required list<TBanner> banners; // hottab 中的banner列表
    11:required string color;
    12:required i32 activityId;
}

struct THotword{
    1:required string name;
    2:required string link;
    3:required bool isLight; // 高亮
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
    12:required i64 gpid;
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
}

service WebHomePageV3{
    // 获取floor列表 parentFloorId 为空表示第一层
    // list<TFloor> GetFirstFloors()
    list<TFloor> GetFloorsByParentId(1:string catalogCode,2:string parentFloorId)
}

