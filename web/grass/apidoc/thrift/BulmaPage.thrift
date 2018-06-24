namespace go ezbuy.apidoc.gen.BulmaPage


//组件
//----组件开始

//Mobile

struct AreaBarMobile{
    1: required string text;
    2: required string backgroundColor;
}

struct VideoMobile{
    1: required string videoUrl;
    2: required string backgroundColor;
}

struct ProductsWithViewMoreMobile{
    1: required list<ProductElement> products;
    2: required string backgroundColor;
}

struct SmallBannerMobileModlue{
    1: required list<string> linkAddress;
}

struct RegisterMobileModlue{
    1: required string bgImage;
    2: required string linkAddress;
}
struct HeaderMobileModlue{
    1: required string linkAddress;
}

struct FooterMobileModlue{
    1: required string linkAddress;
}

struct QuickGuildMobileModlue{
    1: required list<QuickGuildMobileQuestionElement> quickGuild;
}

struct BannerMobileModlue{
    1: required string picture;
    2: required string linkAddress;
}


struct ProductsFourPerGroupMobileModlue{
    1: required list<ProductsFourPerGroupMobileElement> products;
}

struct ProductCommonModelue{
    1: required list<ProductElement> products;
}

struct TagsOnProductsMobileModlue{
    1: required list<TagsOnProductsMobileElement> data;
}

struct FullPageWidthMobileModlue{
    1: required list<ProductElement> products;
}

struct ProductsFourPerGroupMobileElement{
    1: required string name1;
    2: required string name2;
    3: required i32 favoriteCount;
    4: required i32 reviewCount;
    5: required double price;
    6: required double originPrice;
    7: required string picture;
    8: required string linkAddress;
    9: required bool isSoldOut;
    10: required string discountRate;
}

struct QuickGuildMobileQuestionElement{
    1: required string question;
    2: required list<QuickGuildMobileAnswerElement> answers;
}

struct NoGapBannerFiveRatioThree{
    1: required string picture;
    2: optional string linkAddress;
}

struct NoGapBannerTwoRatioOne{
    1: required string picture;
    2: optional string linkAddress;
}

struct QuickGuildMobileAnswerElement{
    1: required string title;
    2: required string answer;
}

struct TagsOnProductsMobileElement{
    1: required string Tag;
    2: required list<MobileProductElement> products;
}

struct MobileProductElement{
    1: required string name;
    2: required i32 favoriteCount;
    3: required i32 reviewCount;
    4: required double price;
    5: required double originPrice;
    6: required string picture;
    7: required string linkAddress;
    8: required double length;
    9: required double width;
    10: required bool isSoldOut;
    11: required string discountRate;
}

//Pc start

struct AreaBar{
    1: required string text;
    2: required string backgroundColor;
}

struct VideoWithTwoProducts{
    1: required string videoUrl;
    2: required list<ProductElement> products;
}

struct FourProductsOneRowSwipe{
    1: required list<ProductElement> products;
}

struct LoginDialogModlue{
    1: required string picture;
    2: required string linkAddress;
}

struct IntroduceModlue{
    1: required list<QuickGuildQuestionElement> quickGuild;
}

struct BannerFourPerGroupModlue{
    1: required list<BannerFourPerGroupElement> banners;
}

struct BannerEightPerGroupModlue{
    1: required list<BannerElement> banners;
}

struct RegisterModlue{
    1: required string bgImage;
    2: required string linkAddress;
}

struct BannerModlue{
    1: required string picture;
    2: required string linkAddress;
}

struct BannerProductModlue{
    1: required list<BannerProductElement> data;
}

struct TagsOnProductsModlue{
    1: required list<TagsOnProductsElement> data;
}

struct CountDownClockModlue{
    1: required string startTime;
    2: required string endTime;
    3: required list<ProductCutDownElement> products;
}

struct ProductsFourPerGroupModlue{
    1:required list<ProductWithOriginPriceElement> products;
}

struct BannerWithFourProductsModlue{
    1:required list<BannerWithFourProductsElement> data;
}
struct TagBannerWithEightProductsPerGroupModlue{
    1:required list<TagBannerWithEightProductsPerGroup> data;
}

struct TagBannerWithEightProductsPerGroup{
    1:required string tag;
    2:required list<TagBannerWithEightProductsPerGroupElement> data;
}

struct BannerFourPerGroupElement{
    1: required string name1;
    2: required string name2;
    3: required string picture;
    4: required string linkAddress;
}

struct QuickGuildQuestionElement{
    1: required string question;
    2: required list<QuickGuildAnswerElement> answers;
}

struct QuickGuildAnswerElement{
    1: required string title;
    2: required string answer;
}

struct BannerProductElement{
    1: required BannerElement banner;
    2: required list<ProductWithOriginPriceElement> products;
}


struct TagBannerWithEightProductsPerGroupElement{
    1:required BannerElement banner;
    2:required list<ProductWithOriginPriceElement> products;
}

struct BannerWithFourProductsElement{
    1:required BannerElement banner;
    2:required list<ProductWithOriginPriceElement> products;
}

struct BannerTwoPerRow{
    1: required list<BannerElement> banners;
}

struct BannerElement {
    1: required string picture;
    2: required string linkAddress;
}

struct ProductWithOriginPriceElement{
    1: required string name;
    2: required i32 favoriteCount;
    3: required i32 reviewCount;
    4: required double price;
    5: required double originPrice;
    6: required string picture;
    7: required string linkAddress;
    8: required bool isSoldOut;
    9: required string discountRate;
}

struct ProductElement{
    1: required string name;
    2: required i32 favoriteCount;
    3: required i32 reviewCount;
    4: required double price;
    5: required double originPrice;
    6: required string picture;
    7: required string linkAddress;
    8: required bool isSoldOut;
    9: required string discountRate
}

struct TagsOnProductsElement{
    1: required string tag;
    2: required list<ProductElement> products;
}

struct ProductCutDownElement{
    1: required string name;
    2: required double originPrice;
    3: required double promotionPrice;
    4: required string picture;
    5: required i32 stock;
    6: required string linkAddress;
}

//组件结束


//平台
#struct PlatForm{
#   1: required string key;  //平台key  eg: android,ios,wp
#}

//模块
struct Section{
    1: required string type;  //模块类型
    2: required string content;  //模块内容
}

//页面
struct Page{
    1: required string title;  //标题
    2: required string platForm;
    3: required string slug;
    4: required string countryCode
    5: required list<Section> sections;
    6: required bool isPublish;
    7: required string updateDate;
    8: required string pageTitle;
    9: required string objectId;
}

struct PageIndexElemet{
    1: required string title;  //标题
    2: required string slug;
    3: required string platForm;
    4: required bool isPublish;
    5: required list<string> sectionTypes;
    6: required string updateDate;
}

struct PageIndex{
    1: required i32 total;
    2: required list<PageIndexElemet> pages;
}


//new Bulma
struct TBulmaPageShow{
    1: required string id;//唯一id
    2: required string title;
    3: required string slug;
    4: required string pageTitle;
    5: required list<string> countrys;
    6: required list<TPlatFormToSection> platformToSections;
    7: required i32 createDate;
    8: required string createBy;
}

struct TPlatFormToSection{
    1: required string platForm;
    2: required list<Section> sections;
}

struct TBulmaOnLen{
    1: required list<TBulmaPageShow> pages;
    2: required i32 count;
}


service BulmaPage{
    //获取首页
    //platForm : "PC"、"Mobile"、""
    PageIndex GetIndex(1: i32 limit, 2: i32 offset, 3:string platForm, 4: string countryCode),

    //添加page
    bool NewPage(1: TBulmaPageShow page),

    bool PageReTitle(1: string title, 2: string slug, 3:string platForm, 4:string countryCode),

    Page GetPageDetailBySlug(1:string slug, 2:string platForm, 3:string countryCode),

    bool UpdatePage(1: Page page),

    bool RemovePage(1: string slug, 2:string platForm),

    bool PublishPage(1: string slug, 2:string platForm, 3:string countryCode),

    // 解析page，并提供下载 response
    #void ParsePage(1: string slug),

    //导入
    #bool ImportPage(1: string slug, 2: binary file),

    TBulmaOnLen GetBulmaPageShow(1: i32 limit,2: i32 offset,3: string name, 4:string countryCode)

    //根据slug得到bulma
    list<Page> GetBulmaBySlug(1: string slug,2: string platForm)

    //删除单一国家
    bool  DelPageByAddition(1: string slug,2: string country,3: string platForm)

    // 给所有mgo数据刷PageId
    list<string> SyncPageId(1: list<string> slug, 2: bool isForce)
    
    void SetNumber(1: string source, 2: i32 value)
}
