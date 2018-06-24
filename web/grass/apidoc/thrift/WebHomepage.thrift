//  Update: 2016.03.02
//      - 修改 TWebHomepageCampaign
//      - 添加 TWebHomepageCampaignText
//      - 修改 TWebHomepageCategoryCollection

namespace go trpc.webhomepage
namespace java com.daigou.sg.rpc.collection
namespace objc TRCollection
namespace javascript TRPC

struct TWebHomepageBanner {
    1:required i32 bannerType;
    2:required string picture;
    3:optional string linkAddress;
    4:required string bannerId;
    5:required i32 activityId;
}

struct TWebHomepageCampaign {
    1:required string picture;
    2:optional string linkAddress;
    3:optional string name;
}

struct TWebHomepageCampaignText {
    1:required string name;
    2:required string linkAddress;
}

#struct TWebHomepageCategory {
#    1:required i32 id;
#    2:required string name;
#    3:required string image;
#    4:optional list<TWebHomepageCategory> subCategories;
#}

struct TWebHomepageProduct{
    1:required i32 id;
    2:required string name;
    3:required string url;
    4:required double price;
    5:required string image;
    6:required string originCode;
    7:required double exchange;
    8:required double localPrice;
}

struct TWebHomepageCategoryCollection{
    1:required TWebHomepageCampaign campaign;
    2:required TWebHomepageCampaignText firstLevelCampaignText;
    3:required list<TWebHomepageCampaignText> secondLevelCampaignTexts;
    4:required list<TWebHomepageCampaign> thirdLevelCampaigns;
}

struct TWebHomepagePromotion{
    1:required i32 topCategoryId;
    2:required TWebHomepageCampaign promotionBanner;
    3:required list<TWebHomepageProduct> products;
}


struct TFixedBannerImage{
    1:required string key
    2:required string name
    3:required string linkAddress
    4:required string picture
    5:required string countryCode
    6:required string id
    7:required i32 activityId
}

service WebHomepage{

    /// <summary>
    /// 获取合作卖家商品
    /// </summary>
    /// <param name="originCode">采购国家</param>
    /// <returns>合作卖家商品</returns>
    list<TWebHomepageProduct> GetSellerProducts(1:string originCode),


    /// <summary>
    /// 获取首页所需的所有分类集合
    /// </summary>
    /// <returns>合作卖家商品</returns>
    list<TWebHomepageCategoryCollection> GetCategoryCollections(),


    /// <summary>
    /// 获取首页的Banner列表
    /// </summary>
    /// <returns>Banner列表</returns>
    list<TWebHomepageBanner> GetBannerList(1:string countryCode),



    /// <summary>
    /// 获取促销信息和改分类下的商品信息
    /// </summary>
    /// <param name="topCategoryId">顶级分类ID</param>
    /// <returns>优惠和产品信息</returns>
    TWebHomepagePromotion GetMenuItemByTopCategoryId(1:i32 topCategoryId),


    /// <summary>
    /// 获取固定广告图片信息
    /// </summary>
    /// <param name="topCategoryId">要查询的key列表</param>
    /// <param name="countryCode">国家代码</param>
    /// <returns>固定广告图片信息的集合</returns>
    list<TFixedBannerImage> GetFixedBannerImagesByKeys(1:list<string> keys,2:string countryCode),


    /// <summary>
    /// 根据类型，获取固定广告图片信息
    /// </summary>
    /// <param name="typeId">typeId</param>
    /// <param name="countryCode">国家代码</param>
    /// <returns>固定广告图片信息的集合</returns>
    list<TFixedBannerImage> GetFixedBannerImagesByTypeId(1:i32 typeId , 2:string countryCode),



    /// <summary>
    /// 根据国家获取首页Banner信息
    /// </summary>
    /// <param name="countryCode">国家代码</param>
    /// <returns>固定广告图片信息的集合</returns>
    list<TWebHomepageBanner> GetHomepageBanners(1:string countryCode),
}
