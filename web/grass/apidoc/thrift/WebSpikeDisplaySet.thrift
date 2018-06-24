namespace go ezbuy.apidoc.gen.WebSpikeDisplaySet
namespace webapi api

include "AdminSpikeDisplaySet.thrift"

struct ProductPrice {
    1:optional double SG
    2:optional double MY
    3:optional double AU
    4:optional double ID
}

struct ProductSimple {
    1:required string refId
    2:required string productName
    3:required string productUrl
    4:optional string altProductName
    5:optional string vendorName
    6:required ProductPrice price
    7:required string productImage
    8:required bool isPrime
}


struct PropertyValue{
    1:required string property
    2:required list<string> values
}


service WebSpikeDisplaySet {
    /// <summary>
    /// 数据接口, 获取展示类目中的商品列表
    /// </summary>
    /// <param name="displaySetId">展示类目 Id</param>
    /// <param name="skip">商品列表起始位置</param>
    /// <param name="limit">列表返回的商品数量限制</param>
    /// <returns>商品列表</returns>
    list<ProductSimple> ProductList(1:i32 displaySetId, 2:i32 skip, 3:i32 limit) throws (1:AdminSpikeDisplaySet.Exception exception)

    //显示展示类目属性
    //cid:类目id
    //propertvalueLimityLimit:属性显示数目
    //:属性值显示数目
    list<PropertyValue> PropertyValueGet(1:i32 cid, 2:i32 propertyLimit, 3:i32 valueLimit)throws (1:AdminSpikeDisplaySet.Exception exception)
}
