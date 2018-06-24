namespace go gen.banner
namespace webapi api

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
    12:required i32 index;
    13:required i32 activityId;
    14:required list<TClickArea> clickAreas; // MagicBanner click areas
    15:required list<TUserGroup> userGroups; //会员标签
    16:required bool isDefault; //默认banner
}


struct TClickArea{
    1:required string link;
    2:required string type;
    3:required TClickAreaShape area;
}

struct TClickAreaShape{
    1:required double left;
    2:required double top;
    3:required double width;
    4:required double height;
}

struct TArea{
    1:required string areaName;
    2:required list<TBanner> banners;
}

struct TBannerResult {
	1:required string message;
	2:required bool result;
}

struct TUserGroup{
    1:required i32 userGroupId;
    2:required string userGroupName;
}

service Banner{
    // 获取banner列表 ； 1 语言；2 banner区域名字；
    list<TArea> GetBanners(1: string lang,2: list<string> areaName);
}
