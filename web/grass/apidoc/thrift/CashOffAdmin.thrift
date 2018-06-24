namespace go ezbuy.apidoc.gen.CashOffAdmin
namespace webapi api

struct CashOffZone{
    1: required string name;
    2: required string zoneKey;
    3: required list<string> supportCountry;
    4: required i64 startTime;
    5: required i64 endTime;
    6: required string color;
    7: required string description;
}

struct CashOffZoneRresponse{
    1: required list<CashOffZone> zones;
    2: required i32 total;
}

struct ZoneTiTle{
    1: required string coutryCode;
    2: required string title;
}

struct ZoneBanner{
    1: required string countryCode;
    2: required Banner banner;
}

struct Banner{
    1: required string bannerPC;
    2: required string bannerMobile;
    3: required string bannerBackend;
}

struct ZoneBottomBanner{
    1: required string countryCode;
    2: required list<string> bottomKeys;
}

struct BottomBannerResponse{
    1: required string countryCode;
    2: required list<BottomBanner> banners;
}

struct BottomBanner{
    1: required string zoneKey;
    2: required BannerWithStatus banner;
}

struct BannerWithStatus{
    1: required string bannerPC;
    2: required i32 bannerPCStatus; // 小于0 失效 ,0 正常, 1 未开始
    3: required string bannerMobile;
    4: required i32 bannerMobileStatus;

}

struct ZoneVoucher{
    1: required string countryCode;
    2: required list<i32> voucherTypeIds;
    3: required string zoneCopy;
}

struct ZoneVoucherDetail{
    1: required string countryCode;
    2: required list<Voucher> vouchers;
    3: required string zoneCopy;
}

struct DisplayCategory{
    1: required i32 categoryId;
    2: required string categoryName;
}

struct Product{
    1: required string name;
    2: required string picture;
    3: required string activeUrl;
    4: required double originPrice;
    5: required double price;
    6: required string refId;  //商品唯一id。不显示
    7: optional bool isDisabled; // 满减二期商品需要
    8: required bool isCashOff;  //当前时间是否为满减
    9: required i64 gpid;
}

struct ShowCategory{
    1: required DisplayCategory category;
    2: required string categoryIcon;
    3: required string color;
}

struct Voucher{
    1: required i32 voucherTypeId;
    2: required i32 leftCount;
    3: required string image;
    4: required i32 start;
    5: required i32 end;
}

struct VoucherCollection{
    1: optional string collectionId;
    2: required list<Voucher> vouchers;
    3: required i64 expireTime;
    4: required string coutryCode;
    5: required string cashOffCopy;
}

struct VoucherCollectionResponse{
    1: required i32 total;
    2: required list<VoucherCollection> collections;
}

struct ProductResponse{
    1: required i32 total;
    2: required list<Product> products;
}

struct CBanner{
    1: required string bannerPC;
    2: required string bannerMobile;
}

struct CashOffBanner{
    1: required string coutryCode;
    2: required CBanner banner;
}

struct UploadRecord{
    1: required string uploadTime; //上传时间
    2: required string uploadBy;  //上传者
    3: required i32 total;  //总数
    4: required i32 okCount;  // 成功数量
    5: required string filePath;
    6: required i32 status; //  0: 正在导入   1: 导入成功  2: 正在删除  3: 已经删除
    7: optional string expireTime; //失效时间
}

struct UploadRecordResponse{
    1: required i32 total;
    2: required list<UploadRecord> records;
}



service CashOffAdmin{

    // list  zones
    #bool SaveCashOffConfig(1:CashOffConfig config);

    /// <summary>
    /// 添加满减专区二期
    /// </summary>
    /// <param name="cashOffZone">添加的专区信息</param>
    CashOffZone SaveCashOffZone(1:CashOffZone cashOffZone);

    /// <summary>
    /// 更新满减专区二期
    /// </summary>
    /// <param name="cashOffZone">更新后的专区信息（必须是存在的）</param>
    CashOffZone UpdateCashOffZone(1:CashOffZone cashOffZone);

    /// <summary>
    /// 删除满减专区二期
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    bool RemoveCashOffZone(1:string zoneKey);

    /// <summary>
    /// 根据国家配置满减专区二期的banner
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="banner">banner信息</param>
    bool CashOffZoneBanner(1:string zoneKey, 3:ZoneBanner banner);

    /// <summary>
    /// 根据国家查看满减专区二期的banner
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="banner">banner信息</param>
    list<ZoneBanner> GetCashOffZoneBanner(1:string zoneKey)

    /// <summary>
    /// 根据国家配置满减专区二期底部显示的banner（调用ListCashOffZoneWithCountry添加）
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="bottomBanner">底部banner配置</param>
    bool CashOffZoneBottomBanner(1:string zoneKey, 2:ZoneBottomBanner bottomBanner)

    /// <summary>
    /// 根据国家查看可配置配置满减专区二期底部显示的banner（提供给添加底部banner使用）
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="country">国家的代码</param>
    list<CashOffZone> ListCashOffZoneWithCountry(1:string zoneKey, 2:string country);


    /// <summary>
    /// 根据国家查询满减专区二期底部显示的banner
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="bottomBanner">底部banner配置</param>
    list<BottomBannerResponse> GetCashOffZoneBottomBanner(1:string zoneKey);

    /// <summary>
    /// 满减专区二期商品的导入
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="filePath"> 上传excel到七牛返回的path </param>
    bool CashOffZoneImportProduct(1:string zoneKey, 2:string filePath);

    /// <summary>
    /// 满减专区二期通过导入来删除
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="file"> 需要的满减文件 </param>
    bool CashOffZoneImportRemoveProduct();

    /// <summary>
    /// 后台展示满减专区二期的商品
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    /// <param name="limit"> 每页显示数量 </param>
    /// <param name="offset"> 位移 </param>
    ProductResponse CashOffZoneProducts(1:string zoneKey, 2:i32 limit, 3:i32 offset);

    /// <summary>
    /// 满减专区二期添加单个商品
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    /// <param name="productUrl"> 商品链接(ezbuy、tmall、taobao)</param>
    /// <param name="internalProductUrl"> 返利链接（可以不填写传递 ""） </param>
    /// <param name="discount"> 卖家结算折扣（可以不填写传递 1.0 即没有折扣） </param>
    bool CashOffZoneAddProduct(1:string zoneKey, 2:string productUrl, 3:string internalProductUrl, 4:double discount);

    /// <summary>
    /// 满减专区二期删除单个商品
    /// </summary>
    /// <param name="zoneKey">满减专区的唯一标志key</param>
    /// <param name="productUrl"> 商品链接(ezbuy、tmall、taobao) </param>
    bool CashOffZoneRemoveProduct(1:string zoneKey, 2:string productUrl);

    /// <summary>
    /// 满减专区二期配置voucher
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    /// <param name="zoneVoucher"> 配置的满减专区的满减券 </param>
    bool CashOffZoneVoucher(1:string zoneKey, 2:ZoneVoucher zoneVoucher);

    /// <summary>
    /// 满减专区二期后台查看配置voucher
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    list<ZoneVoucherDetail> GetCashOffZoneVoucher(1:string zoneKey);

    /// <summary>
    /// 满减专区二期后台设置是否显示voucher数量
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    /// <return bool> 返回是否显示满减优惠券数量，false为不显示，true为显示
    bool GetZoneVoucherCountDisplay(1:string zoneKey);

    /// <summary>
    /// 满减专区二期后台设置是否显示voucher数量
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    /// <return i32> 返回状态码，0为正常
    i32 SetZoneVoucherCountDisplay(1:string zoneKey, 2:bool isDisplay);

    /// <summary>
    /// 满减专区二期列表
    /// </summary>
    /// <param name="status"> 状态 －1:all  0:未开始  1:正在进行 2:过期 </param>
    /// <param name="limit"> limit </param>
    /// <param name="offset"> offser </param>
    CashOffZoneRresponse ListCashOffZone(1:i32 status, 2:i32 limit, 3:i32 offset);

    /// <summary>
    /// 获取满减专区二期信息
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    CashOffZone GetCashOffZoneByKey(1:string zoneKey);

    /// <summary>
    /// 获取满减专区二期页面title
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    list<ZoneTiTle> ListZoneTiTle(1:string zoneKey);

    /// <summary>
    /// 配置满减二期title
    /// </summary>
    /// <param name="zoneKey"> 满减专区的唯一标志key </param>
    /// <param name="titles"> 每个国家显示的title（如果没有配置。传递空 ""） </param>
    bool CashOffZoneTiTle(1:string zoneKey, 2:list<ZoneTiTle> titles);

    /// <summary>
    /// 批量删除满减商品
    /// </summary>
    bool CashOffZoneProductBulkRemove(1:string zoneKey, 2:list<string> refIds);

    /// <summary>
    /// 全部删除满减商品
    /// </summary>
    bool CashOffZoneProductRemoveAll(1:string zoneKey);
   
    /// <summary>
    /// 批量下架满减商品（前台不显示）
    /// </summary>
    bool CashOffZoneProductBulkDisable(1:string zoneKey, 2:list<string> refIds);

    /// <summary>
    /// 单品下架满减商品（前台不显示）
    /// </summary>
    bool CashOffZoneProductDisable(1:string zoneKey, 2:string refId);


    /// <summary>
    /// 批量显示满减商品（前台显示）
    /// </summary>
    bool CashOffZoneProductBulkShow(1:string zoneKey, 2:list<string> refIds);

    /// <summary>
    /// 显示满减商品（前台显示）
    /// </summary>
    bool CashOffZoneProductShow(1:string zoneKey, 2:string refId);

    /// <summary>
    /// 批量提前置顶
    /// </summary>
    bool CashOffZoneProductBulkTop(1:string zoneKey, 2:list<string> refids)

    /// <summary>
    ///  单品提前置顶
    /// </summary>
    bool CashOffZoneTopProduct(1:string zoneKey, 2:string refId);

    /// <summary>
    ///  修改商品的图片
    /// </summary>
    bool CashOffZoneUpdateProduct(1:string zoneKey, 2:string refId, 3:string picture);

    /// <summary>
    /// 查看满减专区二期商品上传记录
    /// </summary>
    UploadRecordResponse ListCashoffZoneUploadRecords(1:string zoneKey, 2:i32 limit, 3:i32 offset);

    /// <summary>
    /// 满减二期商品的操作
    /// </summary>
    /// <param name="op"> 暂定 op 1:删除  </param>
    bool CashOffZoneUploadZoneRecordOp(1:string filePath, 3:i32 op);

//=======================================================================//
    // old cashoff 满减一期

    //基于没有原型图 
    // 券的配置：（分国家），可以给个入口进入。然后分国家显示配置
    //分类显示： 部分国家。入口进入，接口配置
    //分类下商品是和分类绑定在一起的。直接在分类显示那个入口进入配置就ok

    /// <summary>
    /// 查看满减一期的信息（只能修改颜色）
    /// </summary>
    string GetOldCashOffZoneColor();

    /// <summary>
    /// 修改满减一期的颜色
    /// </summary>
    bool UpdateOldCashOffZone(1:string color);

    /// <summary>
    /// 获取满减一期配置的分类的信息
    /// </summary>
    list<ShowCategory> GetCashOffCategory();

    /// <summary>
    /// 配置满减一期显示的类目的信息
    /// </summary>
    /// <param name="categoryId"> 显示分类的id </param>
    /// <param name="categoryIcon"> mobile显示的icon的图片的地址 </param>
    bool UpdateShowCategory(1:i32 categoryId, 2:string categoryIcon, 3:string color, 4:bool disabled);

    /// <summary>
    /// 查看满减一期的分类的信息
    /// </summary>
    /// <param name="categoryId"> 显示分类的id </param>
    ShowCategory GetShowCategory(1:i32 categoryId)

    /// <summary>
    /// 满减一期前台分类顺序
    /// </summary>
    /// <param name="prevId"> 排序前一个分类的id（如果sortId排在最前，传递－1） </param>
    /// <param name="nextId"> 需要排序的分类的后一个分类的id（如果sortId排在最后，传递－1） </param>
    /// <param name="sortId"> 需要排序的分类的id </param>
    bool SortShowCategory(1:i32 prevId, 2:i32 nextId, 3:i32 sortId)

    // <summary>
    /// 满减一期分类下添加显示商品，用作首页随机显示使用()
    /// </summary>
    /// <param name="categoryId"> 分类的id </param>
    /// <param name="productUrl"> 商品的链接（tmall，taobao，ezbuy） </param>
    bool ShowCategoryAddProduct(1:i32 categoryId, 2:string productUrl);

    /// <summary>
    ///删除在满减一期首页随机显示商品
    /// </summary>
    /// <param name="productUrl"> 商品的链接（tmall，taobao，ezbuy） </param>
    bool ShowCategoryRemoveProduct(1:string productUrl);

    /// <summary>
    ///满减一期上传分类显示的商品
    /// </summary>
    /// <param name="filePath"> 上传七牛后返回的path </param>
    /// <param name="categoryId"> 分类的id </param>
    ///  前端文案显示每个类目最多上传100个商品
    bool ShowCategoryImportProduct(1:i32 categoryId, 2:string filePath);

    /// <summary>
    ///满减一期首页分类下随机显示的商品的集合
    /// </summary>
    /// <param name="categoryId"> 分类的id </param>
    ProductResponse GetShowCategoryProducts(1:i32 categoryId, 2:i32 limit, 3:i32 offset);



    /// <summary>
    ///上传满减一期的商品
    /// </summary>
    /// <param name="filePath"> 上传七牛后返回的path </param>
    bool CashOffImportProduct(1:string filePath, 2:i64 expireTime);


}