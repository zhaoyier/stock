namespace go ezbuy.apidoc.gen.CashOff
namespace webapi api

struct CashOffZone{
    1: required string name;
    2: required string cashOffKey;
    3: required string color;
    4: required ZoneBanner banner;
}

struct CashOffZoneItem{
  1: required string name;
  2: required string cashOffKey;
  3: required string color;
  4: required string bannerImage;
  5: required bool isOld;
}

//满减
struct Voucher{
    1: required i32 voucherTypeId;
    2: required bool isDraw;
    3: required i32 leftCount;
    4: required string image;
    5: required i32 start;
    6: required i32 end;
}

struct ZoneBanner{
    1: required string bannerPC;
    2: required string bannerMobile;
    3: required string bannerBackend;
}

struct Product{
    1: required string name;
    2: required string picture;
    3: required string activeUrl;
    4: required double originPrice;
    5: required double price;
    6: required bool isCashOff;
    7: required i32 disCount;
    8: required string cashOffKey;
    9: required i64 gpid;
}

struct CashOffZoneResponse{
    1: required i32 total;
    2: required list<Product> products;
    3: required list<Voucher> vouchers;
    4: optional ZoneBanner banner;
    5: required list<CashOffZone> zones;
    6: required string title;
    7: required string color;
}

struct Category{
    1: required i32 categoryId;
    2: required string categoryName;
    3: optional string categoryIcon;
    4: optional string color;

}

struct CategoryModlue{
    1: required Category Category;
    2: required list<Product> products;
}

struct CashOffCategory{
    1: required list<Voucher> vouchers;
    2: required list<CategoryModlue> categoryModlues;
    3: required string banner;
    4: required string title;
    5: required string color;
}

struct SearchResult{
    1: required i32 total;
    2: required list<Product> products;
    3: required list<Category> subCategories;
    4: required string color;
}

struct CashOffZoneVoucherList{
    1:required string cashOffKey;
    2:required list<i32> voucherTypeId;
}




service CashOff{


  //订单使用接口
  list<CashOffZoneVoucherList> CashOffZoneVoucherMap(1:string countryCode);

  /// <summary>
  /// 满减二期专区列表，当前国家在线在线
  /// </summary>
  /// <param name="cashOffZone">添加的专区信息</param>
  list<CashOffZoneItem> GetCashOffZones();

  /// <summary>
  /// 查询老的满减专区页面(PC使用)
  /// </summary>
  CashOffCategory GetCashOffCategory();
  
  /// <summary>
  /// 查询老的满减专区页面(mobile使用)
  /// </summary>
  CashOffCategory GetCashOffCategoryMobile();

  /// <summary>
  /// 搜索满减接口(mobile使用)
  /// </summary>
  SearchResult ListCategoryCashOffProducts(1:i32 categoryId, 2:i32 limit, 3:i32 offset);


//以下接口仅仅满减二期使用

  /// <summary>
  /// 领取满减券
  /// </summary>
  /// <param name="voucherTypeId">满减券的id</param>
  bool ReceiveVoucher(1:i32 voucherTypeId)

  /// <summary>
  /// 满减二期专区详情页面pc
  /// </summary>
  /// <param name="cashOffKey">专区唯一key。(只提供给满减二期专区使用)</param>
  CashOffZoneResponse GetCashOffZoneDetail(1:string cashOffKey, 2:i32 limit, 3:i32 offset);

  /// <summary>
  /// 满减二期专区详情页面mobile
  /// </summary>
  /// <param name="cashOffKey">专区唯一key。(只提供给满减二期专区使用)</param>
  CashOffZoneResponse GetCashOffZoneDetailMobile(1:string cashOffKey, 2:i32 limit, 3:i32 offset);



}