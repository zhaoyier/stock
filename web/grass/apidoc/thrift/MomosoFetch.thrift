// test api: http://api-test.momoso.com/fuhao/ezbuy/item/432435
// test api: http://api-test.momoso.com/fuhao/ezbuy/order/2315206

namespace go ezbuy.apidoc.gen.MomosoFetch

struct MomosoProductPrice {
    1:required double china_price // momoso 售价
    2:required double original_price // 美国官网原价
    3:required double us_price // 美国官网售价
}

struct MomosoProductSpec {
    1:required i32 item_id
    2:required map<string, double> price_details
    3:required list<string> images // 图片列表
    4:required bool available // 是否可购买
    5:required map<string, string> attributes
    6:required i32 sku
}

struct MomosoProductColorImage {
    1:required string name
    2:required string value
}

struct MomosoProductBrand {
    1:required string logo
    2:required string en
}

struct MomosoImageSize {
    1:required double height
    2:required double width
}

struct MomosoProductDetail {
    1:required i32 id
    2:required string title
    3:required string main_category // 主分类
    4:required string sub_category // 子分类
    5:required string mall // 商城
    6:required string status // 是否可够买 NEW/MOD true, DEL false
    7:required double weight // 商品重量
    8:required i32 quota_limit // 单个订单限购数量
    9:required map<string, double> price // 售价
    10:required string description_en // 英文描述
    11:required string primary_image // 性别分类
    12:required string sex_tag
    13:required list<string> attribute_list
    14:required list<MomosoProductSpec> specs
    15:required list<string> details
    16:required list<map<string, string>> color_images
    17:required map<string, string> brand
    18:required MomosoImageSize primary_image_size
}

struct MomosoProductDetailResponse {
    1:required MomosoProductDetail item
    2:required string message
    3:required string error
}

struct MomosoOrderRequestItem {
    1:required i32 item_id
    2:required i32 sku
    3:required i32 quantity
}

struct MomosoCreateOrderResponse {
    1:required double final
    2:required string message
    3:required MomosoOrderDetail order
    4:required double shipping_fee
    5:required string error
}

struct MomosoOrderEntry {
    1:required string item_id
    2:required string order_entry_id
    3:required string sku
    4:required string status
    5:required string provider
    6:required string utn
}

struct MomosoOrderDetail {
    1:required list<MomosoOrderEntry> entries
    2:required string order_id
}

struct MomosoOrderDetailResponse {
    1:required MomosoOrderDetail order
    2:required string message
    3:required string error
}

service MomosoFetch {
    MomosoProductDetailResponse GetProductDetail(1: i32 id)
    MomosoOrderDetailResponse GetOrderDetail(1: i32 id)
    MomosoCreateOrderResponse CreateOrder(1:list<MomosoOrderRequestItem> entries, 2:string req_id)
}
