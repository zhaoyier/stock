namespace go ezbuy.apidoc.gen.ezproduct
namespace webapi api
namespace swift TR

include "Product.thrift"
include "Common.thrift"

enum ProductDetailEntrance {
    Unknown,
    Normal,
    MaxLimit,
}

enum EzProductAPIExceptionErrCode {
    Unknown,
    ProductBlocked,
    ProductOutOfStock,
    MaxLimit,
}

const string WarehouseShanghai = "ShangHai"
const string WarehouseGuangzhou = "GuangZhou"

exception EzProductAPIException {
    1:required EzProductAPIExceptionErrCode errCode
    2:required string errMessage
}

struct TTranslation {
    1:optional string EN
    2:optional string CN
    3:optional string MY
    4:optional string TH
    5:optional string ZHTW
}

struct TPrice {
    1:required double unitPrice
    2:optional double originalPrice
    3:optional double discount
    4:required string symbol
}

struct TCat {
    1:required i32 dcid;
    2:required string dcname;
}

struct TShippingFee {
    1:required TPrice fee
    2:required TPrice localFee
}

struct TProductEta {
    1:required i32 minimumDays
    2:required i32 maximumDays
}

struct TProduct {
    1:required string refId
    2:required string productName
    3:required TTranslation productNameTrans
    4:required string productUrl
    5:required string primaryImage
    6:required list<string> images
    7:required string vendorName
    8:optional string brandName
    9:optional string description
    10:required list<TProperty> properties
    11:required list<TProductSku> skus
    12:required string originCode
    13:required TPrice price
    14:required bool isPrime
    15:required bool isEzbuy
    16:required TProductExtra extra
    17:required TPrice localPrice
    18:optional list<string> descAttrs
    19:required string shopName
    20:optional TShippingFee domesticShippingFee
    21:required string originCountry
    22:optional TProductEta primeEta
	42:optional TProductEta ezbuyEta
    23:required bool containGSTFee
    24:required bool isBlockDetail
    25:required bool isShowSeller
    26:required i64 gpid
    27:required i64 cid
    28:required bool isBuyforme
    29:required list<TCat> tCats
	30:required string notice;
	31:required i32 pcid; # 发布类目
	32:required string defaultShippingName;
	34:required string defaultShippingFee;
	33:required string gstFee;
	35:required string primeShippingName;
	36:required i32 primeShipmentType;
	40:required i32 ezbuyShipmentType;

	37:required string specialHandlingFeeMessage;
	38:required double specialHandlingFeePercent;
	39:optional string unavailableReason;
    50:required i64 sellerProductCount;
    41:required double exchangeRate;
    43:required string selectedSkuId;
    44:optional TJoinPrimeInfo joinPrime;
    45:required list<Common.TTitleIcon> titleIcons;
    // 废弃
    46:required string sellerBanner;
	47:required Common.TTable ruleTable;
	// 取代 sellerBanner
	48:required Product.TProductBanner banner;
	49:required bool useSellerShop;
	51:required bool disableRemark;       // 禁用备注
}

struct XDetailMNCashoff {
	1:required string tagImg;
	2:required string url;
	3:required string name;
}

struct TProductExtra {
    1:optional TProductExtraFlashSale flashSale
    2:optional TProductExtraCashOff cashOff
    3:optional TProductExtraFreeShipping freeShipping
    4:optional TProductExtraPremium premium;
	5:required XDetailMNCashoff mncashoff;
	6:optional TProductExtraFastDelivery fastDelivery;
}

struct TProductExtraFlashSale {
    1:required bool available
    2:required TPrice price
    3:required i64 beginAt
    4:required i64 endAt
    5:required i32 quantity
    6:required i32 orderLimit
    7:required TPrice localPrice
    8:required bool couponAvailable
    9:required i64 beginTS
    10:required i64 endTS
    11:required string settingId
}

struct TProductExtraCashOff {
    1:required bool available
    2:optional string cashOffZoneKey
    3:optional string cashOffZoneName
    4:optional string cashOffTagColor
    5:required string link
}

struct TProductExtraFreeShipping {
    1:required bool available
    2:required string url
    3:required string name
}

struct TProductExtraPremium {
    1: required bool available
    2: required string bannerUrl
}

struct TProperty {
    1:required string prop
    2:required TTranslation propTrans
    3:required list<TProperyItem> propItems
    4:required string propId
}

struct TProperyItem {
    1:required string value
    2:required TTranslation valueTrans
    3:required string propValue
    4:required TTranslation propValueTrans
    5:optional string imageUrl
    6:required string valueId
}

struct TProductSku {
    1:required string skuId
    2:required TPrice price
    3:required i32 quantity
    4:required list<string> propValues
    5:optional double estWeight
    6:optional double estVolumeWeight
    7:required TPrice localPrice
    8:required list<string> propIds
    9:required string skuUrl
    11:required map<string,string> skuTitle
    12:required list<string> imgs
}

service EzProduct {
    TProduct GetProduct(1:string catalogCode, 2:string identifier, 3:ProductDetailEntrance entrance, 4:string src, 5:Product.TProductUserInfo userInfo, 6:bool loadLocal) throws (1:EzProductAPIException exception)
}

struct TJoinPrimeInfo {
	1:required string url;
    2:required string title;   // 使用 %s 占位给 params 填充
    3:required list<string> params;
}

struct TProductExtraFastDelivery {
    1: required bool available
    2: required string bannerUrl
}
