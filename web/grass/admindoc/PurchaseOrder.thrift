namespace go rpc.purchaseorder


struct TResult {
    // Return
    // Code 返回标识
    // 		－1 表示有错误或者失败
    //		1	表示成功
    // Msg	返回内容
    1: required i32 Code
    2: required string Msg
}

///<summary>
/// 不同serviceType下的订单量
///</summary>
struct ServiceOrderCount{
	1: required string ServiceTypeName
	2: required i32 OrderCount
}

///<summary>
/// 不同仓库下的订单量
///</summary>
struct WarehouseOrderInfo {
	1: required string WarehouseName
	2: required list<ServiceOrderCount> ServiceOrderCount

}

struct TPurchaseOrderCount {
	1: required i32 prime,
	2: required i32 ezbuy,
	3: required i32 b4m,
	4: required i32 total,
}

struct TVendorSource {
    // "tmall", "taobao", "others"
	1: required string name,
	2: required double priceLowerLimit,
}

struct TPurchaseOrderCountFilter {
	1: optional list<TVendorSource> vendorSource,
    // "TW", "US", "CN"
	2: optional list<string> originCode,
	3: optional bool hasRemarks,
	4: optional string time,
}

service PurchaseOrder{
	/// <summary>
	///		获取不同采购员不同仓库不同serviceType的对应的订单量
	/// <returns name=""></returns>
	/// </summary>
    list<WarehouseOrderInfo> GetWarehouseOrderInfo()

    TPurchaseOrderCount GetPurchaseOrderCount(1:TPurchaseOrderCountFilter filter)

    void TagPurchaseOrders(1:TPurchaseOrderCountFilter filter, 2:bool isOverWrite, 3:string tagName)

    map<string, i32> GetPurchaseOrdersTagCount()

    void DeletePurchaseOrderTags(1:list<string> tagNames)
}
