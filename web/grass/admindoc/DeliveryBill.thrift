namespace go rpc.deliverybill

struct TPackageItem {
    1: required string productName,
    2: required i32 qty,
    3: required double unitPrice,
    4: required double subTotal,
}

struct TPackageDeliveryBill {
    // 封箱号
    1: required string packingCode,
    // 运输类型：sea(海运)， air(空运)
    2: required string shipmentType,
    3: required string shipToName,
    4: required string nickname,
    5: required string address,
    6: required string userId,
    7: required string packageNumber,
    8: required string deliveryBillNumber,
    9: required string postcode,
    10: required string phone,
    11: optional list<TPackageItem> packageItems,
    12: optional list<TSubPackageDeliveryBill> subBills,
    13: required i32 b,
    14: required i32 p,
}

struct TSubPackageDeliveryBill {
    1: required string subPackageNumber,
    2: required string subBillNumber,
}

struct TShippedPackage {
    1: required string packageNumber,
    1: required i32 shipmentId,
    3: required string shipToName,
    4: required string shipToAddress,
    5: required string shipToPhone,
    6: required string shipToZip,
}

struct TSyncShippedPackageToNimResult {
    1: required string errCode,
    2: required list<string> packageNumbers,
}

struct TDeliveryBillNumberCount {
    1: required i32 billNoCount,
    2: required i32 subBillNoCount,
}

struct TNimPackageDeliveryBill {
    1: required string billNo,
    2: required string shipToAddress,
    3: required string shipToName,
    4: required string shipToPhone,
    5: required string zone,
    6: required string route,
    7: required string nimDest,
    8: required list<TBarcode> barcode,
    9: required string CurDate,
    10: required string PkgNumber,
    11: required string BpVal,
    12: required string shipToZip,
}

struct TBarcode {
    1: required string bcNo,
    2: required string bcRunNo,
    3: required string subPackageNumber,
}


service DeliveryBill {
    // 导入马邮主运单，传excel文件，excel以"file"为文件名上传
    string ImportDeliveryBillNumberMY(),

    // 导入马邮子运单，传excel文件，excel以"file"为文件名上传
    string ImportSubDeliveryBillNumberMY(),

    // 查询可用运单数
    i32 CountDeliveryBillNumberMY(),

    // 查询可用运单数
    TDeliveryBillNumberCount GetDeliveryBillNumberCount(),

    // 打印面单
    TPackageDeliveryBill PrintPackageDeliveryBill(1:i32 packageId),

    // 查询已经起运的包裹地址
    // 日期格式："2016-01-31"
    list<TShippedPackage> FindShippedPackage(1:string fromDate, 2:string toDate),

    // 更新起运包裹信息
    string UpdateShippedPackage(1:TShippedPackage shippedPackage),

    // 同步包裹信息
    // 日期格式："2016-01-31"
    list<TSyncShippedPackageToNimResult> SyncShippedPackageToNim(1:string fromDate, 2:string toDate),

    // 打印NimExpress面单
    TNimPackageDeliveryBill PrintNimPackageDeliveryBill(1:i32 packageId),
}
