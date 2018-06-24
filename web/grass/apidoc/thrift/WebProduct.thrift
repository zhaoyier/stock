namespace go ezbuy.apidoc.gen.WebProduct

struct WebProductImageSize {
    1:required double height
    2:required double width
}

struct WebProductDetail {
    1:required string name
    2:required string refId
    3:required string url
    4:required string enName
    5:required string vendorName
    6:required string brandName
    8:required double weight
    9:required double price
    10:required double originPrice
    11:required string productImage
    12:required WebProductImageSize productImageSize
    13:required string originCode
    14:required list<string> sellType
    15:required bool isPrime
    16:required bool isOnSale
}

struct WebProductQuery {
    1:required string sellType
    2:required string mainCategory
    3:required string subCategory
    4:required string brandName
    5:required string sexTag
    6:required i32 offset
    7:required i32 limit
    8:required list<string> sort
    9:required string catalogCode
}

struct WebProductBrandItem {
    1:required string name
    2:required string logo
}

struct WebProductBrand {
    1:required string key
    2:required list<WebProductBrandItem> brands
}

service WebProduct {
    list<WebProductDetail> GetProductList(1: WebProductQuery query)
    list<WebProductBrand> GetBrandList(1: string sellType)
}
