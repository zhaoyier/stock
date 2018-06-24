namespace * CmsHome

include "./CmsCommon.thrift"

// 幕布
struct Curtain {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.ImageValue backImage;
    3: required CmsCommon.ImageValue contentImage;
    4: required CmsCommon.PrimaryValue name;
}

struct CmsBannerItem {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.InputValue link;
    3: required CmsCommon.ImageValue image;
    4: required CmsCommon.BooleanValue newTab; // 是否新窗口打开
}

// 热门频道;品牌馆;国家馆
struct CmsBanner {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.PrimaryValue name;
    3: required CmsCommon.RangeTimeValue rangeTime;
    4: required list<CmsBannerItem> bannerItems;
}

// 首屏增加背景图配置 cmskey: home_background
struct CmsBackground {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.ImageValue image;
    3: required CmsCommon.PrimaryValue name;
    4: required CmsCommon.RangeTimeValue rangeTime;
}

// 时间轴
struct CmsTimeline {
    1: required CmsCommon.ImageValue image;
    2: required CmsCommon.PrimaryValue id;
    3: required CmsCommon.PrimaryValue name;
}


struct CmsMagicAreaItem {
    1: required CmsCommon.NumberValue left;
    2: required CmsCommon.NumberValue top;
    3: required CmsCommon.NumberValue width;
    4: required CmsCommon.NumberValue height;
    5: required CmsCommon.InputValue link;
}

// magic banner
struct  CmsMagicBanner {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.ImageValue image;
    3: required list<CmsMagicAreaItem> MagicAreaItems
    4: required CmsCommon.PrimaryValue name;
}

// 控制模块顺序 & 显示
struct CmsHomeModuleItem {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.BooleanValue isActive;
    3: required CmsCommon.PrimaryValue name;
    4: required CmsCommon.ImageValue defaultIcon;
    5: required CmsCommon.ImageValue hoverIcon;
    6: required CmsCommon.ColorValue themeColor;
}

// 首屏banner 是否展示大促 & [模块控制显示 & 顺序] cmskey: home_show_modules
struct CmsHomeModule {
    1: required list<CmsHomeModuleItem> homeOrderModuleItems;
    2: required CmsCommon.BooleanValue homeFirstIsEday; // 首屏banner是否显示成一张
}


// 首屏增加背景图配置 cmskey: home_background
// 首页 magic banner 模块 cmskey: home_magic_banner
// 首页 六宫格banner ---热门频道 cmskey: home_six_banners
// 首页 四宫格banner ---热门频道 cmskey: home_four_banners
// 首页 三宫格banner ---热门频道 cmskey: home_three_banners
// 首页 幕布展示效果 cmskey: home_curtain
// 首屏banner是否展示大促 & [模块控制显示 & 顺序] cmskey: home_show_modules

// TODO 1。闪购 2. 时间轴

// 注意： 1. 楼层要放在模块顺序排列中