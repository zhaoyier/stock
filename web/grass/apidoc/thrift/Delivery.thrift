namespace go trpc
namespace java com.daigou.selfstation.rpc.selfstation
namespace csharp SelfStation.Website.Controllers.Interfaces
namespace swift TR

struct TLoginResult {
    1: required bool isSuccessful;
    2: required string token;
    3: required list<string> StationNames;
    4: required string userType;
    5: required bool isPartTime;
}

struct TParcelSection {
    1: required string name;
    2: required string value;
}

struct TParcel {
    1:required string userName;
    2:required string phone;
    3:required string parcelNumber;
    4:required string status;
    5:required list<TParcelSection> sections;
    6:required i32 customerId;
}

struct TServer {
    1:required string name;
    2:required string url;
}

struct TCollectionStation{
    1:required i32 stationId;
    2:required string stationName;
}

struct TDeliveryMethod{
    1:required string deliveryCode;
    2:required string deliveryName;
    3:required list<TCollectionStation> collectionStations;     //deliveryMethod对应的详细StationName
}


//  DeliveryMethod包括
//  Home,送货上门
//  Subway,地铁站取货
//  NeighbourhoodStation,邻里社区取货
//  SelfCollection,仓库自取
//  Other,其他
struct TSubPackage{
    1:required string nickName;         //用户id
    2:required string parcelNum;
    3:required string shelfNum;
    4:required double Weight;
    5:required i32 packageCount;
    6:required i32 boxCount;
    7:required list<string> boxNums;    //打印箱号列表
    8:required bool isLocked;           //是否锁定
    9:required i32 customerId;
    10:required i32 shipmentId;
    11:required i32 packageId;
    12:required i32 deliveryHouse;      //136 138
    13:required string packageScanLabelColor;   //对应标记的color
    14:required bool isModifyed;
    15:required bool isHandCreated;
    16:required string remark;
    17:required string boxNum;          //箱号
    18:optional string shipToName;       // 安排配送时设置的收件人名
    19:optional string shipToPhone;      // 安排配送时设置的收件人电话
    20:optional TParcelPaymentInfo paymentInfo;  // 包裹的支付信息
    21:optional TParcelStationInfo station;  // 派送点信息, 目前只对邻里类型输出
    22:required string deliveryColor;
    23:required bool isBag;
    24:required string deliveryMethod;       // 取货方式
    25:required string bagColor;         // rgb值，例如："#FFFFFF"
    26:required list<string> skuImages;
    27:required string packageStatusName; //包裹状态
}

struct TFindSubPackageResult{
    1:required i32 totalPackageCount;
    2:required i32 totalBoxCount;
    3:required list<TSubPackage> subPackages;
}

struct TPrintLogInfo{
    1:required string createBy;          //创建者
    2:required string createDate;        //创建日期
    3:required string note;              //note
}

struct TSaveSubPkgInfo{
    1:required string subPkgNum;        //二级包裹号
    2:required string BP;
    3:required i32 pkgId;
    4:required i32 shipmentId;
}

struct TSaveResult{
    1:required bool isSucceeded;
    2:required list<TSaveResultMsg> msgs;
}

struct TSaveResultMsg{
    1:required string userName;
    2:required string subPkgNum;
    3:required string faildMsg;
}

struct TOrderRemark {
    1:required i32 orderRemarkId
    2:required string remark
}

struct TOrderRemarksResult {
    1:required list<TOrderRemark> remarks
    2:optional string error
}

struct TParcelPaymentInfo {
    1:required double payableAmount    // 当前包裹应收金额
    2:required double prepay           // 包裹 所属 Customer 的预付款余额
    3:required double pendingTopUp     // 包裹 所属 Customer 的待确认金额
}

// https://ezbuy.sg/Help/QuickGuide#Delivery_NeighborhoodCollection
struct  TParcelStationInfo {
    // 大点
    1:required string stationName
    // 小点
    2:required string stationItemName
    // 排序（A, B, C...）
    3:required string sortBy
}

struct TReceiptPayment {
    1:required string type
    2:required double actualPay
}

enum TFuzzySearchType {
    nickName = 0
    phone = 1
    email = 2
    parcelNumber = 3
}

struct TDelivery {
    1:required i32 deliveryNum
    2:required double deliveryUnitPrice
    3:required double totalPrice
}

struct TRegist {
    1:required i32 num
    2:required double registUnitPrice
    3:required double totalPrice
    4:required i32 registType //0表示Web 1表示App
}

struct TSales {
    1:required i32 saleOrder
    2:required double revenue
    3:required string rate //比率
    4:required double totalPrice
    5:required bool isFirst //是否为首单
}

struct TPlaceOrder {
    1:required i32 customerCount //下单用户量
    2:required double placeOrder //下单佣金
    3:required double orderTotal //下单总金额
}

struct TMyJoinReply {
    1:required TDelivery delivery
    2:required list<TRegist> regist
    3:required list<TSales> sales
    4:required double totalPrice
    5:required TPlaceOrder order
}

struct TPDTSmsTemplate {
    1:required string title
    2:required string content
}

struct TPDTSmsMessage {
    1:required i32 customerId
    2:required string phoneNumber
    3:required string deliveryMethod
    4:required string stationName
}

struct TPickingJob {
    1: required string id,
    2: required string deliveryMethod,
    3: required string stationOrDriver,
    4: required string deliveryPeriod,
    // 格式：20160131
    5: required i32 deliveryDate,
    // pending: 待开始, picking: 进行中, done: 已完成
    6: required string status,
    // 序号
    7: required i32 order,
    8: required i32 b,
    9: required i32 p,
    10: required string name,
}

struct TPickingJobFilter{
    // pending: 待开始, picking: 进行中, done: 已完成
    1:required string status;
}

struct TPickingSubPkgFilter{
    1:required bool isPicked;
}

struct TPickingJobDetail {
    1: required string id,
    2: required string deliveryMethod,
    3: required string stationOrDriver,
    4: required string deliveryPeriod,
    5: required i32 deliveryDate,
    6: required string status,
    7: required string name,
    8: required i32 bTodo,
    9: required i32 bDone,
    10: required i32 pTodo,
    11: required i32 pDone,
    // 任务开始时间（unix timestamp）
    12: required i64 startTime,
    13: required i32 pickerDeadlineHour,
    14: required i32 pickerDeadlineMinute,
    // 预计完成时间（Estimated Time of Completion）
    15: required i32 etcHour,
    16: required i32 etcMinute,
    17: required list<TSubPackage> subPkgs;
    // 打印箱号列表，查询未拣货的包裹时才返回
    18: optional list<string> boxNums,
}

struct TPicker {
    1: required string id,
    2: required string pickerName,
}

struct TSiblingSubPkgs {
    1: required list<string> subPkgNumbers,
    2: required string deliveryMethod,
    3: required string stationName,
    4: required string deliveryDate,
}

struct TNameIdPair {
    1: required i64 id,
    2: required string name,
}

struct TSubPkgFilter {
    1:required string deliveryDate;
    2:required bool isPicked;
    3:required bool isSigned;
    4:required bool showShipmentDetail;
    5:required bool showPaymentInfo;
    6:required i64 deliveryTypeId;
    7:optional i64 regionId;
    8:optional i64 stationId;
    9:optional i64 periodId;
    10:optional string periodType;
    11:optional string deliveryMan;
    12:optional i64 stationTypeId;
    // ptl拣货分组
    13: i64 ptlGroupId;
    14:optional list<i64> regionIds;
    15:optional list<i64> stationIds;
}

struct TSubPkgs {
    1:required i32 b;
    2:required i32 p;
    3:required list<TSubPackage> subPkgs;
    4:optional list<string> boxNums;
}

struct TSubPkgInfo {
    1:required string customerName;
    2:required string BorP;
    3:required string subPkgNumber;
    4:required string deliveryMethod;
}

struct TScanOrderInfo {
   1:required string shelfNumber;
   2:required string orderNumber;
}

struct TBatchScanResponse {
   1:required string reason;
   2:required string shelfNumber;
   3:required string orderNumber;

}

struct TEzCollectionSubPkg{
    1: required string packageNumber; // 一级包裹号
    2: required string subPackageNumber; // 保持和前端展示的一致，对应的就是subpkg
    3: required string shelfNo; // 表示商家的货架号
    4: required string boxNo; // 装箱号or封箱号
    5: required i32 status; // 包裹的状态,使用id来表示, 4表示arrived，20 ready For delivery,7/18表示完成
    6: required i32 reachTime; // 封箱签收时间
    7: required i32 shelfTime; // 上架时间
    8: required i32 day; //在架
    9: required i32 chargeWeight // 使用称重，使用g来表示
    10: required bool isPayed // 是否支付，用于前端标注颜色
    11: required i64 confirmTime // 签收时间
    12: required  string nickName // 用户昵称
}

struct TEzCollectionFilter {
    1: required string phone;
    2: required string nickName;
    3: required string parcelNumber;
}


struct TEzCollectionSubPkgResp{
    1: i32 count; // 总数
    2: list<TEzCollectionSubPkg> subpkgs;
}

enum LocalSellerPackageStatus {
    Unknown = 0; // 未知的状态
    Collected = 1; // 快件被司机揽收（已揽收）
}

service Delivery {
    // 只有登陆成功isSuccessful为true时，token跟StationNames才可能会有值
    // Login Form: 去Mongo SelfStationAdmin.User 比对账号和密码
    //userType,如果是erp账号登录就传送erp,不传或者其他则视为默认登录方式
    TLoginResult Login(1: string username, 2: string password, 3: string catalogCode, 4: string userType),

    // 获取上传图片去七牛的token
    // Sign Form: 调用七牛API获取上传图片的token
    string UserGetUploadToken(),

    // Sign Form:确认货已送出
    //检查对应Delivery的账号是否已经支付，
    //如果已经支付更新包裹状态为Deliveried,更新订单状态为PendingPicking（SG）、WaitForPicking(MY)；
    // 更新Shipment、Package、Order状态为已派送，保存签名图片，并增加OrderHistory log记录
    string UserSetParcelReceived(1: string parcelNumber, 2: string signatureImageKey, 3: i32 rating),

    // 批量签收接口
    string UserBatchSetParcelReceived(1: list<string> parcelNumbers, 2: string  signatureImageKey, 3: i32 rating),

    // Search Parcel Form: 根据条件查找包裹清单，date必须是yyyy-MM-dd 的格式
    // 通过Shipment、Parcel、Customer、PackageLocalDeliveryLocation查找包裹清单
    list<TParcel> UserFindParcel(1: string localDeliveryMethod, 2: string stationName, 3: string date, 4: string userName, 5: string phone, 6: string parcelNumber, 7: string shelfNo, 8: i32 offset, 9: i32 limit),

    // Parcel List Form: 【UserListParcel】【setDefaultStation】
    //Station :根据国家获取SelfStation自取点的列表
    //inComing:查询Shipment、Packaged读取包裹列表；
    //arrived:查询Shipment、Packaged读取包裹列表；
    //inComing:查询Shipment、Packaged读取包裹列表；
    //completed: incoming / arrived / completed
    list<TParcel> UserListParcel(1: string stationName, 2: string status, 5: i32 offset, 6: i32 limit),

    //Sign Form:  根据扫描的包裹号显示包裹信息
    TParcel UserGetParcel(1: string parcelNumber),

    //Scan to Shelf Form -> UserPutParcelToShelf:扫描二级包裹号，更新二级包裹号对应的货架到PackageLocalDeliveryLocation；
    //首次上架：更新包裹状态到Arrived(B-SG)、ArrivedForDelivery(S-SG,S-MY)、ArrivedMalaysia(B_MY);新加坡B4M生成ArrivedBill；
    // 如果成功的话，返回空字符串；如果返回的字符串不是空，则说明有错误，直接alert给用户看
    // Step 1: 检查Package、Shipment状态(记录存在、Shipment未派送、Package状态为Shipped/ShippedFromTransit/OutForDelivery/ReadyForCollection)；
    // Step 2: 将货架信息保存到PackageLocalDeliveryLocation
    // Step 3: 检查逻辑并更新包裹状态
    // 如果包裹有到货备注OrderRemark，不更改包裹状态，提示：The parcel has arrival remark.;
    // 如果包裹超过ETA，不更改包裹状态，提示：The parcel is beyond ETA. ；
    // 如果包裹二级包裹号未全部上架，Continue；
    // 如果包裹二级包裹号已全部上架、扫描的货架号类型为ServiceCenter、包裹原状态为Shipped/ShippedFromTransit，更新包裹/订单状态为 已到达(等待派送)，如果是马来麦当劳派送则更新派送日期并发送Notification；
    // 如果包裹二级包裹号已全部上架、扫描的货架号类型为ServiceCenter、包裹原状态为OutForDelivery/ReadyForCollection，更新包裹/订单状态为 已到达(等待派送)，发送二次派送Notification；
    // 如果包裹二级包裹号已全部上架、扫描的货架号类型为SelfStation/Box、包裹原状态不等于Deliveried/Completed/Cancelled，更新包裹/订单状态为ReadyForCollection；
    // isFastArrived: 是否是极速到货
    // isFastScan: 是否是快速扫描（不检查货架派送方式是否匹配）
    string UserScanToShelf(1: string shelfNumber, 2: string parcelNumber, 3: bool isFastArrived, 4: bool isFastScan),

    //Ready For Collection Form:扫描二级包裹号，更新二级包裹号对应的货架号对应的货架到PackageLocalDeliveryLocation；
    //更新包裹状态到ReadyForCollection；更新订单状态到ReadyForCollection;
    // 如果成功的话，返回空字符串；如果返回的字符串不是空，则说明有错误，直接alert给用户看
    string UserReadyForCollection(1: string shelfNumber, 2: string subParcelNumber),

    // ezCollection 合作店铺签收封
    string UserSignEzCollectionPackageBoxNo(1: string shelfNumber, 2: string packageBoxNo);

    // 获取装箱号下面的二级包裹数量
    i32 UserGetSubPkgNoSumByPackageBoxNos(1: list<string> packageBoxNos);

    // 商家签收收到的装箱数，以及实际确认的二级包裹数, 签名。
    string UserSignQuantityOfPackageBoxNoAndSubPkgNo(1: list<string> packageBoxNos, 2: i32 subPkgNos, 3: string signature, 4: string shelfNumber);

    // 合作店铺扫描商家包裹列表展示
    // status表示包裹的状态
    // query表示通过用户的一些信息来查询
    // limit， offset分页使用
    // starttime,endtime是给用户的时间间隔显示，区间限定为两个月。
    TEzCollectionSubPkgResp UserGetEzCollectionSubPkgs(1: i32 status, 2: TEzCollectionFilter filter, 3: i32 limit 4: i32 offset, 5: i64 startTime, 6: i64 endTime)

    // partner shop 上架
    string UserScanToPartnershop(1: string shelfNumber, 2: string subParcelNumber),

    // ezbuy司机揽收本地卖家的包裹
    // 一个一个包裹签收
    string UserSignLocalSellerSubPkgNumber(1: string subPkgNumber),
    // submite之后更新司机的签名，作为日后核对的手段之一。
    string UserBatchSignLocalSellerSubPkgNumWithSignature(1: list<string> subPkgNumbers, 2: string signature),


    //My Setting Form:读取Mongo SelfStationAdmin库修改账号密码；
    // 修改密码,如果成功返回空字符串，否则直接显示错误信息
    string UserModifyPassword(1: string currentPassword, 2:string newPassword),

    //根据Living 和 Testing 来h获取线上或者测试环境的servers
    list<TServer> GetServers(1: string mode),

    //Pick Form -> Lock 更新ShipmentIsLocked 为true 或者 false;
    //设置shipment状态lock unlock （目前只支持Singapore）
    string UserSetShipmentStatus(1: list<i32> shipmentIds,2: bool isLocked),

    //获取DeliveryStation
    list<TDeliveryMethod> UserGetDeliveryMethod(),

    //获取DeliveryWarehouse 136 138 ""
    list<string> UserGetDeliveryWarehouse(),

    //获取司机list
    list<string> UserGetHomeDeliveryDrivers(),

    //pick->save 【WatSavePickPackageAction】
    //保存BP值到PackagerLocalDeliveryLocation.Box、Bag；
    //subPackageNum:二级包裹号
    //BOrP:"B"，"P"; "B"d对应的是BoxCount，”p“对应的是pacelCount
    //isForceSave:是否强制保存；
    //返回值：如果保存成功返回”“;保存失败返回失败信息字符串；
    string UserSavePickSubPackage(1: string subPackageNum,2: string BOrP,3: string boxNum,4: i32 packageId,5: i32 shipmentId,6: bool isForceSave),

    //pick->save 【WatSavePickPackageAction】：可以保存多个，如果全部保存成功就返回true，如果有不成功的就返回false并且返回错误信息列表；
    //pkgInfos：二级包裹号的信息
    //boxNum: 箱号
    //返回值：如果保存成功返回”“;保存失败返回失败信息；
    TSaveResult UserSavePickSubPackages(1:list<TSaveSubPkgInfo> pkgInfos,2: string boxNum),

    //savePackageColor "red" ,"green","blue"
    //保存颜色到PackageScanLabelColor；
    string UserSavePackageScanLabelColor(1: i32 packageId,2: string color),

    //Pick -> remark
    //获取remark详情
    list<TPrintLogInfo> UserGetRemarkInfo(1: i32 customerId,2: i32 shipmentId,3: i32 packageId),

    //Pick -> ShelfLog
    //查询PrintLogInfo
    list<TPrintLogInfo> UserGetPrintLogInfo(1:i32 packageId,2:string subPackageNumber),

    //Pick -> Scan
    //保存所扫描的Box Number到 PackageLocalDeliveryLocation.BoxNumber,更新包裹状态为ReadyForDelivery，更新订单状态为ReadyForDelivery
    // 如果成功的话，返回空字符串；如果返回的字符串不是空，则说明有错误，直接alert给用户看
    string UserPutParcelToBox(1:string boxNum,2:string subParcelNum),

    //Out For Delivery Form： Delivery 更新包裹状态为OutforDelivery，更新订单状态为OutForDelivery(SG),OutForDelivery(MY);
    string UserSetBoxOutForDelivery(1:string carLocation,2:string boxNum),

    // 司机扫描二级包裹,返回扫描的结果，包括了未到齐的包裹
    // 如果司机和捡货员实在是找不到到齐的货
    string UserScanSubPackageBeforeLoading(1:list<string> subPkgs),

    // 每一个包裹实时的上传,并且落地
    string UserScanSingleSubPackage(1: string subpkg),


    // 获取上架前需要关注的备注信息
    TOrderRemarksResult UserGetParcelRemarks(1:string parcelNumber)

    // 确认到货
    string AckArrival(1:i32 packageId),

    // 签收支持的付款类型
    list<string> UserGetReceiptPaymentTypes()

    // 查询包裹的支付情况 和 客户的余额情况
    TParcelPaymentInfo UserGetParcelPaymentInfo(1:i32 shipmentId)

    // 用户签收接口
    string UserReceipt(1:list<i32> shipmentIds, 2:i32 customerId, 3:string signatureImageKey,
         4:i32 rating, 5:TReceiptPayment payment, 6:i64 receiptTimestamp)

    // 获取用户通知短信的模板列表
    // deliveryMethod: Subway 或 NeighbourhoodStation
    list<TPDTSmsTemplate> UserPDTGetSMSTemplates(1:string deliveryMethod, 2:string stationName, 3:string timePeriodType)

    // 批量向用户发送通知取货的短信
    string UserPDTSendCustomerSMS(1:list<TPDTSmsMessage> mesages, 2:string content)

    // 根据nickName, phone, email, parcelNumber等模糊搜索用户包裹
    TFindSubPackageResult UserFuzzySearchParcels(1:TFuzzySearchType searchType, 2:string content),

    // 修改包裹展示标签颜色
    // color: "", "green", "yellow", "red", "blue"
    string UserUpdateShipmentDeliveryColor(1:i32 shipmentId, 2:string color),

    list<TPicker> UserGetPickers(),

    string UserTransferPickingJob(1:string jobId, 2:string pickerId),

    string UserStartPickingJob(1:string jobId),

    list<TPickingJob> UserGetMyPickingJobs(1:TPickingJobFilter filter),

    string UserReorderPickingJobs(1:list<string> jobIds),

    TPickingJobDetail UserGetPickingJobDetail(1:string jobId, 2:TPickingSubPkgFilter subPkgFilter),

    // picker签到
    string UserPickingCheckIn()

    TSiblingSubPkgs UserGetSiblingSubPkgs(1:string subPkgNumber),

    // 清理包裹 扫描二级包裹号,如果满足条件直接分给新加坡邮政
    string UserCleanSGParcel(1:string subPkgNumber),


   // 获取派送类型
   list<TNameIdPair> UserGetDeliveryTypes(),

   // 获取派送区域
   list<TNameIdPair> UserGetRegions(1:i64 deliveryTypeId),

   // 获取派送站点
   list<TNameIdPair> UserGetStations(1:i64 deliveryTypeId, 2:i64 regionId, 3:i64 stationTypeId),

   // 获取派送站点类型
   list<TNameIdPair> UserGetStationTypes(1:i64 regionId),

   // 获取派送时间段
   // 日期格式："2016-01-31"，默认当天
   list<TNameIdPair> UserGetDeliveryPeriods(1:i64 deliveryTypeId, 2:i64 stationId, 3:string deliveryDate),

   TSubPkgs UserGetSubPkgs(1:TSubPkgFilter filter),

   // 根据包裹号得到二级包裹号
   list<TSubPkgInfo> UserGetSubPkgInfoByPkg(1:string packageNumber)

   // 获取ptl分组
   list<TNameIdPair> UserGetPtlGroups(1:i64 deliveryTypeId),

   // 绑定拣货箱号
   string UserBindPickingBoxNumbers(1:list<string> boxNumbers),

   // 手动同步数据
   string ManualSyncShippedPkgs(1:string magic),

   // EzCollection机场主仓到货触发
   string EzCollectionPackageArrivalTrigger(1:string containerNo),

   // 盘点功能扫描
   string UploadInventoryRecord(1:string shelfLabel, 2:list<string> packageNumber),

   // 盘点功能检查货架号是否存在
   bool CheckShelfLabelExist(1:string shelfLabel),
}
