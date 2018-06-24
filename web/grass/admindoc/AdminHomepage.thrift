namespace go ezbuy.homepage.trpc.adminhomepage
namespace java com.daigou.sg.rpc.collection
namespace objc TRCollection
namespace javascript TRPC

include "WebHomepage.thrift"

struct TAdminHomepageBanner {
    1:required string name;
    2:required i32 bannerType;
    3:required string picture;
    4:optional string linkAddress;
    5:required bool visible;
    6:required i64 startAt;
    7:required i64 endAt;
}


struct TAdminNewHomepageBanner {
    1:required string name;
    2:required i32 bannerType;
    3:required string picture;
    4:required string linkAddress;
    5:required i64 startAt;
    6:required i64 endAt;
    7:required string countryCode;
    8:required string id;
}

struct TAdminHomepageBannerList {
    1:required string id;
    2:required list<TAdminHomepageBanner> banners;
    3:required bool removed;
    4:required string countryCode;
}

struct TAdminHomepageBestSellerProducts {
    1:required string id;
    2:required string originCode;
    3:required list<WebHomepage.TWebHomepageProduct> products;
    4:required bool removed;
}

struct TAdminHomepageCategoryCollections {
    1:required string id;
    2:required list<WebHomepage.TWebHomepageCategoryCollection> collections;
    3:required bool removed;
}

struct TAdminHomepagePromotionProducts {
    1:required string id;
    2:required i32 topCategoryId;
    3:required WebHomepage.TWebHomepageCampaign promotionBanner;
    4:required list<WebHomepage.TWebHomepageProduct> products;
    5:required bool removed;
}

struct TAdminUploadInfo {
    1:required string token;
    2:required string baseUrl;
}

service AdminHomepage {
    /// <summary>
    /// 获取主页轮播的编辑历史
    /// </summary>
    /// <returns>主页轮播的编辑历史</returns>
    list<TAdminHomepageBannerList> GetBannerListHistory(1:string countryCode);

    /// <summary>
    /// 添加主页轮播记录
    /// </summary>
    /// <param name="banners">主页轮播数据</param>
    void AddBannerList(1:string countryCode, 2:list<TAdminHomepageBanner> banners);

    /// <summary>
    /// 删除主页轮播记录
    /// </summary>
    /// <param name="id">轮播记录 id</param>
    void DeleteBannerList(1:string id);

    /// <summary>
    /// 获取合作卖家商品的编辑历史
    /// </summary>
    /// <param name="originCode">采购国家代码</param>
    /// <returns>合作卖家商品的编辑历史</returns>
    list<TAdminHomepageBestSellerProducts> GetBestSellerProductsHistory(1:string originCode);

    /// <summary>
    /// 添加合作卖家商品记录
    /// </summary>
    /// <param name="originCode">采购国家代码</param>
    /// <param name="products">商品信息数据</param>
    void AddBestSellerProducts(1:string originCode, 2:list<WebHomepage.TWebHomepageProduct> products);

    /// <summary>
    /// 删除合作卖家商品记录
    /// </summary>
    /// <param name="id">合作卖家商品记录 id</param>
    void DeleteBestSellerProducts(1:string id);

    /// <summary>
    /// 获取分类集合的编辑历史
    /// </summary>
    /// <returns>分类集合的编辑历史</returns>
    list<TAdminHomepageCategoryCollections> GetCategoryCollectionsHistory();

    /// <summary>
    /// 添加分类集合记录
    /// </summary>
    /// <param name="collections">分类集合数据</param>
    void AddCategoryCollections(1:list<WebHomepage.TWebHomepageCategoryCollection> collections);

    /// <summary>
    /// 删除分类集合记录
    /// </summary>
    /// <param name="id">分类集合 id</param>
    void DeleteCategoryCollections(1:string id);

    /// <summary>
    /// 获取促销商品的编辑历史
    /// </summary>
    /// <param name="topCategoryId">分类 Id</param>
    /// <returns>促销商品的编辑历史</returns>
    list<TAdminHomepagePromotionProducts> GetPromotionProductsHistory(1:i32 topCategoryId);

    /// <summary>
    /// 添加促销商品记录
    /// </summary>
    /// <param name="topCategoryId">分类 Id</param>
    /// <param name="products">商品信息数据</param>
    void AddPromotionProducts(1:i32 topCategoryId, 2:WebHomepage.TWebHomepageCampaign promotionBanner, 3:list<WebHomepage.TWebHomepageProduct> products);

    /// <summary>
    /// 删除促销商品记录
    /// </summary>
    /// <param name="id">促销商品记录 id</param>
    void DeletePromotionProducts(1:string id); 

    /// <summary>
    /// 获取图片上传 token
    /// </summary>
    TAdminUploadInfo GetUploadInfo();

    list<TAdminNewHomepageBanner> GetNewHomeBannerList(1:string countryCode , 2:i32 bannerType , 3:i32 offset , 4:i32 limit);

    string AddNewHomeBanner(1:TAdminNewHomepageBanner banner);

    bool UpdateNewHomeBanner(1:TAdminNewHomepageBanner banner);

    bool DeleteNewHomeBanner(1:string id);

}
