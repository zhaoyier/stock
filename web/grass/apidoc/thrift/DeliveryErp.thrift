namespace go trpc.deliveryerp
namespace java com.daigou.selfstation.rpc.selfstation.erp


struct TScanOrderInfo {
   1:required string shelfNumber;
   2:required string orderNumber;
}

struct TBatchScanResponse {
   1:required string reason;
   2:required string shelfNumber;
   3:required string orderNumber;

}

struct TPicker {
    1: required string id,
    2: required string pickerName,
}

struct TBoxNumAndDeliveryMethod {
    1: required string boxNumber,
    2: required string deliveryMethod,
    3: required string name,
    4: required string seq,
    5: required i32 stationId,
}

struct TLocalSaleGroupPurchasePkgShelf {
    1: required string productName,
    2: required string productSKU,
    3: required string shelfNo,
}

struct TUserScanLocalSaleGroupPurchaseReq {
    1: required list<TLocalSaleGroupPurchasePkgShelf> pkgShelves,
    // Unix timestamp
    2: required i64 endTime,
    3: required bool isUpdateP2B,
}

struct TUserScanLocalSaleGroupPurchasePkgVirtualShelfReq {
    1: required list<string> pkgNos,
    2: required string boxNumber,
    3: required string shelfNo,
    4: required list<string> images,
    5: required bool isUpdateP2B,
    6: required bool isUpdateB2P,
}

struct TIdCodeDetail {
   1:required string IdCode;
   2:required string Telephone;
   3:required string CreateDate;
}

struct TIdCodeDetails {
   1:required list<TIdCodeDetail> IdCodeDetail;
   2:required i32 Total;
}

struct LocalSellerPackage {
    1: string subPkgNo;
    2: string packageNumber;
    3: string deliveryMethod;
    4: string shelfNumber;
    5: bool isCollected;
    6: string createBy;
    7: i64 createDate;
    8: string nickName;
    9: string shopName;
}

struct LocalSellerPackageReust {
    1: list<LocalSellerPackage> localSellerPackages;
    2: i32 count;
}

struct InventoryRecordFilter {
    1: required i64 DateStart;
    2: required i64 DateEnd;
    3: required string opUserId;
}

struct TGetInventoryRecordResp {
    1: required string SerialNumber;
    2: required string Handler;
    3: required list<string> SystemRecords;
    4: required i64 InventoryTime;
    5: required list<string> InventoryProfit;
    6: required list<string> InventoryLoss;
    7: required string ShelfLabel;
}

struct TShipmentPkg {
    1: required string PkgNo;
    2: required string PkgStatus;
    // 采购国家
    3: required string OriginCode;
    // 运输方式
    4: required string ShipmentTypeName;
    5: required i32 ShipmentId,
    6: required i32 PkgId,
}

service DeliveryErp {

    // 国内扫描上架
    string UserScanToShelfInner(1: string shelfNumber, 2: string orderNumber),

    // 理货架
    string ArrangeShelf(1: string shelfNumber, 2: string orderNumber),

    //国内扫描上架-批量
    list<TBatchScanResponse> UserBatchScanToShelfInner(1: list<TScanOrderInfo> scanOrderInfo),

    //生成箱号
    list<TBoxNumAndDeliveryMethod> GenBoxNumber(1: list<i32> stationIds, 2: string date),

    //获取箱号
    list<TBoxNumAndDeliveryMethod> GetBoxNumbersByStationIds(1: list<i32> stationIds, 2: string date),

    //问题件扫描
    string FlawOrderScan(1: string shelfNum, 2: string wayBillNum),
    // 获取拣货员列表
    list<TPicker> UserGetPickers(),

    // 获取箱号对应的拣货员，返回null的话表示箱号还没绑定拣货员
    TPicker UserGetPickerByBoxNumber(1: string boxNumber),

    // 重新绑定箱号和拣货员
    string UserReBindPickingBoxNumbers(1: string boxNumber, 2: string pickerId),

    // 解除新绑定箱号和拣货员
    string UserUnBindPickingBoxNumber(1: string boxNumber, 2: string pickerId),

    string UserBindBoxNumberPackage(1:string boxNumber, 2: string packageNumber),

    // ptl出货扫描
    string UserPtlOutScan(1: string subPkgNo, 2: string pickingBoxNo, 3: string deliveryBoxNo, 4: string pickerId, 5: bool isForceSave),

    // ptl进货扫描多层分拣
    string UserPtlInScanNew(1: string subPkgNo, 2: i32 stage),


    // 本地卖家拼团自动上架
    string UserScanLocalSaleGroupPurchase(1: TUserScanLocalSaleGroupPurchaseReq purchaseReq),

    // 本地卖家拼团包裹批量上架
    string UserScanLocalSaleGroupPurchaseVirtualShelf(1: TUserScanLocalSaleGroupPurchasePkgVirtualShelfReq purchaseReq),

    // 上传短信验证码
    string UploadIdCode(1: string telephone, 2: string msg),

    // 获取验证码详情
    TIdCodeDetails GetIdCodeDetails(1:string telephone, 2:i32 page),

    // 解除所有绑定箱号和拣货员
    string UserUnBindAllPickingBoxNumber(),

    // 展示本地揽收的包裹
    LocalSellerPackageReust UserGetLocalSellerPackage(1: string catalogCode, 2: i64 startDate, 3: i64 endDate, 4: bool isCollected, 5: i32 offset, 6: i32 limit),

    // 盘点功能查询
    list<TGetInventoryRecordResp> GetInventoryRecord(1:InventoryRecordFilter filter),

    // 获取同一个shipment下的所有一级包裹
    list<TShipmentPkg> UserGetShipmentPkgs(1: string pkgNo),

    // 将一个shipment下的一级包裹拆出去
    string UserSplitShipmentPkgs(1: list<TShipmentPkg> pkgs),
}
