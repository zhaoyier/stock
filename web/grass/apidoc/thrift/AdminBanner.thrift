namespace go gen.adminBanner
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
    12:required i32 index;// 备用
    13:required i32 activityId;
    14:required list<TClickArea> clickAreas; // MagicBanner click areas
    15:required list<TUserGroup> userGroups; //会员标签
    16:string updatedBy;
    17:optional bool isDefault; //是否为默认banner，默认为true
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
	3:required string id;
}

struct TUserGroup{
    1:required i32 userGroupId;
    2:required string userGroupName;
}

struct TUpdateBannerSettingResult{
    1:required bool result;
    2:required string message;
}

struct TGetBannerSettingResult{
    1:required i32 result;
    2:required string message;
}

service AdminBanner{
	// 插入banner  // nextId 为下一个banner 的id，若为“”则为添加到最后
    TBannerResult InsertBanner(1:string nation,2:TBanner banner,3:string nextId);
	// 更新banner
    TBannerResult UpdateBanner(1:string nation,2:TBanner banner);
	// 删除banner
    TBannerResult DeleteBanner(1:string nation,2:string id);
	// 添加banner
	TBannerResult AddBanner(1:string nation,2:TBanner banner);
	// 移动banner  nextId 为移动后 下个banner的id
	TBannerResult MoveBanner(1:string nation,2:TBanner banner,3:string nextId);
    // 获取banner列表 ； 1 国家；2 语言；3 banner区域名字；4:会员标签；5：跳转链接
    list<TArea> GetBanners(1:string nation, 2: string lang,3: list<string> areaName, 4:i32 userGroupId, 5:string link, 6:optional bool isDefault);
    // 用excel文件上传banner
    TBannerResult ImportExcelBanner();
    //更新前台banner的最大展示数量
    TUpdateBannerSettingResult UpdateBannerSetting(1:string nation, 2:string areaName, 3:i32 maxSize);
    //查看当前areaName的banner setting
    TGetBannerSettingResult GetBannerSetting(1:string nation, 2:string areaName);
}
