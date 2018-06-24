namespace go ezbuy.apidoc.gen.AdminProduct

enum EzbuyShipmentType {
    UNKNOWN     # 未知运输方式
    NORMAL      # 正常
    SENSITIVE   # 敏感
    SEA         # 海运
}

struct AdminProductSku {
    1:required string skuId
    2:required string name
    3:required list<string> images
    4:required double weight  //精准重量
    5:required double price   
    6:required i32 quantity
    7:required map<string, string> attributes
    8:required double estWeight // 预估重量
    9:required double pkgWeight // 商品源重量，抓取来的重量
    10:required double spuEstWeight // spu 预估重  
    11:required double cidModelWeight // cid 模型重量
    12:required double primeWeight     // prime重量 
    13:required i64 grossUpdateDate // 精准重量更新时间
}


struct AdminProductDetail {
    1:required string name
    2:required string refId
    3:required string url
    4:required string enName
    5:required string vendorName
    6:required string brandName
    7:required i64 cid
    8:required double weight
    9:required double price
    10:required string productImage
    11:required i32 buyCount
    12:required double internalShipmentFee # 废弃
    13:required string originCode
    14:required string stateCode
    15:required list<string> sellType
    16:required bool isPrime
    17:required bool isEzbuy
    18:required bool isTranslated
    19:required bool isOnSale
    20:required bool isSeller
    21:required i64 syncDate
    22:required i64 fetchDate
    23:required string sellerId
    24:required EzbuyShipmentType shipmentInfo  # ezbuy shipment
    25:required list<AdminProductSku> skus
    26:required string descriptionText
    27:required list<string> descriptionImages
    28:required bool isBoost
    29:required bool isManuallyFetchFee # 使用手动设置的国内运费
    30:required double internalShippingFeeGZ # 到广州的国内运费
    31:required double internalShippingFeeSH # 到上海的国内运费
    32:required i32 primeShippingType # prime 商品的运输方式
    33:required i64 gpid
    34:required string crumbs
    35:required map<string,bool> prime # 只显示  不允许修改，修改prime是修改isprime字断
    36:required map<string,bool> blockIndex
    37:required map<string,bool> blockDetail
    38:required string blockHit
    39:required list<string> banHit
    40:required bool isSellerProduct
    41:required string updateBy
    42:required i32 pcid
    43:required map<string,bool> forceNotBan  #强制解开屏蔽
}

struct AdminProductSearchByRefIdQuery {
    1:required string refId
    2:required i32 offset
    3:required i32 limit
}

service AdminProduct {
    list<AdminProductDetail> SearchByRefId(1:AdminProductSearchByRefIdQuery query)
    AdminProductDetail GetDetail(1:string refId)
    bool AddSku(1:string refId, 2:AdminProductSku sku)
    bool UpdateDetail(1:AdminProductDetail detail)
    bool UpdateSku(1:AdminProductSku sku)
}
