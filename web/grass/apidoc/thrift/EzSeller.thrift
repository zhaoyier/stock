namespace go ezbuy.apidoc.gen.ezseller
namespace webapi api

enum ShopApprovalFormType {
    Unknown,
    Personal,
    Organization,
    Normal,
    Self,
    MaxLimit,
}

enum ShopApprovalFormStatus {
    Unknown,
    Applied,
    Approved,
    Denied,
    MaxLimit,
}

enum APIExceptionErrCode {
    Unknown,
    AccountNotFound,
    AccountOperationTooOften,
    AccountUnauthorizedOperation,
    AccountInvalidEmailOrUsername,
    AccountInvalidPassword,
    AccountInvalidResetToken,
    AccountWrongPassword,
    ShopInvalidApprovalForm,
    ShopInvalidShopName,
    ShopDuplicateApprovalRequest,
    AdminInvalidShopApprovalForm,
    ProductNotFound,
    ImportSubTaskNotFound,
    ImportSubTaskUnCommitable,
    ImportSubTaskProductNotFound,
    ImportSubTaskProductCommitted,
    OrderNotFound,
    OrderItemNotFound,
    MirrorProductAlreadyLinked,
    InvalidImportFile,
    BillNotFound,
    TransferNotFound,
    DuplicateTransferRequest,
    CategoryNotFound,
    ShopNotFound,
    InvalidServiceFeeRate,
    InvalidOriginCode,
    BadRequest,
    InvalidOriginCode,
    PackageNotFound,
    AnnouncementNotFound,
    AnnouncementNotEditable,
    ExportTaskNotFound,
    AccountInvalidPhoneOrUsername,
    VeriCodeIncorrect,
    IntervalTime,
    CatagoryHasSub,
    CatagoryHasAnn,
    ParsingPage,
    PhoneNotUnique,
    MaxLimit,
}

enum ActionResultCode {
    Ok,
    Error
}

enum ProductShipmentInfo {
    Unknown,
    Normal,
    Sensitive,
    MaxLimit,
}

enum ProductSellType {
    Unknown,
    Normal,
    MirrorProduct,
    MirrorProductBase,
    MaxLimit,
}

enum ProductSource {
    Unknown,
    Published,
    Imported,
    Migrate,
    Uploaded,
    Amwayed,
    Openapi, // openapi 发布的商品
    MaxLimit,
}

enum ImportTaskState {
    Unknown,
    Pending,
    Processing,
    Finished,
    MaxLimit,
}

enum ImportTaskType {
    Unknown,
    Product,
    Shop,
    MaxLimit,
}

enum ImportSubTaskState {
    Unknown,
    Pending,
    Processing,
    Succeeded,
    Failed,
    Committed,
    MaxLimit,
}

enum OrderStatus {
    Unknown,
    Pending,                        // "待处理"  代替原来的 Activated
    Cancelled,                      // "已取消"
    Finished,                       // "已完成"
    UnPaid,                         // 这个状态用户不可知
    Dispatched,                     // "已发货"
    ArrivedWarehouse,               // "已抵达仓库"
    MaxLimit,
}

enum OrderItemType {
    Unknown,
    Normal,
    Return,
    ReOrdered,
    MaxLimit,
}

enum OrderItemStatus {
    Unknown,
    Pending,
    Dispatched,
    Cancelled,
    Returned,
    ReturnConfirmed,
    Finished,
    UnPaid,
    ArrivedWarehouse,
    MaxLimit,
}

enum OrderRemarkSource {
    Unknown,
    Buyer,
    Internal,
    MaxLimit,
}

enum OrderWarehouse {
    Unknown,
    CNShangHai,
    CNGuangZhou,
    American,
    Taiwan,
    SGLocal,
    MYLocal,
    KRIncheon,
    MaxLimit,
}

enum OrderOperation {
    Unknown,
    Create,
    Dispatch,
    Cancel,
    Remark,
    ReturnConfirm,
    Finish,
    MaxLimit,
}

enum MessageType {
    Unknown,
    Stockout,      # 缺货登记
    MaxLimit,
}


enum SendBy {
    Unknown,
    seller,      # 卖家发送的消息
    supporter,   # ezbuy客服发送的消息
    MaxLimit,
}


enum ExportFileLanguage {
    Unknown,
    CN,
    EN,
    MaxLimit,
}

enum ExportFileType {
    Unknown,
    OrderItems,
    ERPBillDetail,
    UserBillOrderItems,
    UserBillOrders,
    AdminOpProductList,
    AdminOpOrderList,
    ShopOrderList, # 店铺订单导出
    ShopPickList,
    WarehouseExportInformation,
    UserUploadProducts,
    ShopExportSkus,
    MaxLimit,
}

// 导出文件的任务状态
enum ExportFileTaskState {
    Unknown,
    Done,
    Exec,
    Duplicate
}

enum ImportFileType {
    Unknown,
    OrderDispatch,
    MaxLimit,
}

enum OrderDispatchImportError {
    Unknown,
    InvalidRowData,                         // 当前行数据格式不正确
    OrderUnchangable,                       // 订单非待发货状态
    EmptyTrackProvider,                     // 行内无物流商信息
    EmptyTrackNum,                          // 行内无运单号
    MultipleTrackInfoForSingleOrder,        // 同一个订单出现多组不同的快递信息
    OrderNotFound,                          // 指定的订单不存在
    MaxLimit,
}

enum AdminMirrorProductOrderListSort {
    Unknown,
    CreatedAtAsc,
    CreatedAtDesc,
    FinishedAtAsc,
    FinishedAtDesc,
    MaxLimit,
}

enum Activity {
    Unknown,                // 0 未知
    FlashSale,              // 1 闪购
    CashOff,                // 2 满减
    FriendsDeal,            // 3 拼团
    FreeShipping,           // 4 包邮
    MNCashOff,              // 5 满件减
    MaxLimit,               // 上限
    Mixed = 200000,         // 200000 混合
}

enum BillStatus {
    Unknown,
    Pending,                    // 财务侧, 待处理
    Approved,                   // 财务侧, 已审核
    Appealled,                  // 卖家侧, 卖家申诉
    Confirmed,                  // 卖家侧, 确认订单, 由 TransferAdd 行为附带
    FinancePending,             // 运营侧, 待财务确认
    MaxLimit
}

enum TransferStatus {
    Unknown,
    Pending,                    // 卖家侧, 发起提现请求, 待处理
    Rejected,                   // 财务侧, 已拒绝
    Transferred,                // 财务侧, 已完成转账操作
    Approved,                   // 财务侧, 已批准
    Transferring,               // 财务侧, 已确认；卖家状态转账中
    MaxLimit
}

enum BillRemarkType {
    Unknown,
    Normal,                     // 普通备注, 双方可见
    Internal,                   // 内部备注, 财务侧可见
    Appealling,                 // 申诉备注, 双方可见
    Transfer,                   // 转账备注, 双方可见
    MaxLimit
}

// 订单结算状态
enum OrderBillStatus {
    Unknown,                                // 限位
    Pending,                                // 进行中
    Billable,                               // 可结算
    BillConfirmed,                          // 已结算
    MaxLimit                                // 限位
}

enum BillOperationType {
    Unknown,
    Approve,                    // 审核通过
    Appeal,                     // 发起申诉
    OpAppealDispose,            // 运营对申诉订单处理通过
    MaxLimit
}

enum BillPeriod {
    Unknown,
    Never,
    Monthly,
    Weekly,
    Daily,
    ShortTerm,
    HalfMonth, # 每半个月执行一次，即每个月的1，15号执行
    MaxLimit,
}

enum SortType {
    None = 0,
    ASC,
    DESC
}

enum SellerPackageState {
	Unknown = 0
	ShopPendingDelivery = 1 // 待卖家发货
	ShopDelivered = 2       // 卖家已发货
	WarehouseReceived = 3   // 中转仓已收货
	WarehouseShipped = 4    // 中转仓已发货
	UserCancelled = 5       // 用户已取消
	ArriveDestination = 6   // 到达目的仓库
	PendingDelivery = 7     // 待目的仓库发货
	Delivering = 8          // 目的仓库已发货
	Delivered = 9           // 用户已收货
	Completed = 10          // 用户已结束，评价结束
	MaxLimit
}

enum ShopPackageFilterState {
    Unknown = 0
    ShopPendingDelivery = 1 // 待卖家发货
    ShopDelivered = 2       // 卖家已发货
    UserCancelled = 3       // 用户已取消
    MaxLimit
}

enum WarehousePackageFilterState {
    Unknown = 0
    WaitingForReceiving = 1
    WarehouseReceived = 2 // 中转仓已收货
    WarehouseShipped = 3
    MaxLimit
}

enum TransferAccountChangeStatus {
    Unknown = 0
    Normal = 1
    Pending = 2
    Rejected = 3
    Cancelled = 4
    Succeed = 5
    PendingSucceed = 6
}

enum TransferAccountChangeField {
    Unknown = 0
    BankName = 1
    AccountNumber = 2
    AgencyName = 3
    AgencyAddress = 4
    AccountName = 5
    Phone = 6
    BankSwiftCode = 7
    BeneficiaryBankAddress = 8
    BeneficiaryName = 9
}

enum TransferAccountChangeOp {
    Unknown = 0
    UserUnknown = 1000
    Apply = 1001
    Modify = 1002
    Cancel = 1003

    OpUnknown = 2000
    Reject = 2001
    Approve = 2002
}

const string OriginCodeCN = "CN"
const string OriginCodeTW = "TW"
const string OriginCodeUS = "US"
const string OriginCodeSGLocal = "SGLocal"
const string OriginCodeMYLocal = "MYLocal"
const string OriginCodeKOREA = "KR"
const string OriginCodeJAPAN = "JP"

exception APIException {
    1:required APIExceptionErrCode errCode
    2:required string errMessage
}

// 代表一个事件动作的返回
struct ActionResult {
    1:required ActionResultCode code
    2:required string message
}

// 店铺注册过程
enum ShopRegisterStep {
    Unknown,
    NewRegister, // 新注册未申请开店
    AppliedPening, // 申请开店待审核
    ApplyApproved, // 申请通过
    ApplyDenied, // 拒绝申请
    MaxLimit

}
struct ShopBase {
    1:required i32 shopId
    2:required string shopName
    3:required string shopSlug
    4:required bool isApproved
    5:required bool approvalProcessing
    6:required string originCode
    7:required bool isShutDown
    8:required bool firstSignin
    9:required ShopRegisterStep step
}

struct UserShopIndexDataGet {
    // 近30天
    1:required UserShopIndexSales lastThirtyDays
    // 昨天
    2:required UserShopIndexSales lastDay
    // 订单状态
    3:required UserShopIndexOrderStatus orderStatus
    // 商品状态
    4:required UserShopIndexProductStatus productStatus
    // 通知
    5:required list<UserShopIndexAnnouncement> announcements
    // 商品排行
    6:required list<UserShopIndexProduct> productRank

}

struct UserShopIndexSales {
    1:required i64 AddCartCount
    2:required i64 orderCount
    3:required i64 paidCount
    4:required double salesAmount
}

struct UserShopIndexOrderStatus {
    1:required i64 pendingCount
    2:required i64 overTimeCount
    3:required i64 dispatchedCount
    4:required i64 warehouseRcvdCount // 到达转运仓
    5:required i64 pendingSendCount   // 到达目的仓
}

struct UserShopIndexProductStatus {
    1:required i64 onSaleCount
    2:required i64 offSaleCount
}

struct UserShopIndexAnnouncement {
    1:required i32 announcementId
    2:required string title
    3:required i64 time
}

struct UserShopIndexProduct {
    1:required i64 productId
    2:required string productName
    3:required i32 salesCount
}

struct LoginFieldCheckResult {
    1:required bool exists
    2:required bool inValid
}

struct AccountBase {
    1:required i32 userId
    2:required string username
    3:required string token
    4:optional ShopBase shop
    5:required bool isActivated
}

struct AccountForgetPasswordResult {
    1:required string email
    2:required bool isSent
}

struct AccountForgetPasswordByPhoneResult {
    1:required bool isPhoneExists
    2:required bool isCodeValid
    3:required string token
    4:required list<string> usernames
}

struct Contact {
    1:required string name
    2:required string phone
}

struct ShopApprovalFormGetResult {
    1:required string appliedShopName
    #2:required string appliedMainCats # 废弃
    2:required string registerPhone # 注册手机号
    3:required ShopApprovalFormType type
    4:required ShopApprovalFormStatus status
    5:required ShopApprovalRequesterInfo requester
    6:optional ShopApprovalFormPersonal personalForm
    7:optional ShopApprovalFormOrganization orgForm
    8:optional string refuseMark   // 审核拒绝原因
}

struct ShopApprovalRequesterInfo {
    1:required string realName
    2:required string identifierNum
    3:required string phone
    4:optional string aliShopUrl
    5:optional string email
    6:optional string qqNumber
}

struct ShopApprovalFormResponsibleInfo {
    1:required string realName
    2:required string identifierNum
    3:required list<string> approvalImages
    4:optional ShopApprovalFormIDImage idImages
}

struct ShopApprovalFormBankInfo {
    1:required string bankName
    2:required string agencyAddress
    3:required string agencyName
    4:required string accountNumber
    5:required string beneficiaryName
    6:required string swiftCode
    7:required string companyRegistrationNumber
    8:required string accountName
}

struct ShopApprovalFormOrgInfo {
    1:required string orgName
    2:required list<string> approvalImages
    3:required string legalRepresentativeName
    4:required string bizRegistrationNumber
    5:optional ShopApprovalFormOrgCredentials approvalCrts // CN注册企业上证书
}

struct ShopApprovalFormOrgCredentials {
    1:required bool combined
    2:optional string combinedBusinessLicense  // 三证合一
    3:optional string businessLicense          // 营业执照
    4:optional string orgCodeCrt               // 组织机构代码证
    5:optional string taxRegistrationCrt       // 税务登记证
    6:required string bankAccountCrt           // 银行卡开户证明
}

struct ShopApprovalFormIDImage {
    1:required string front       // 身份证正面
    2:required string opposite    // 身份证背面
    3:required string handHeld    // 手持
}

// 注册店铺资料
struct ShopApprovalFormShopSurvey {
    1:required string mainCat // 主营类目
    2:required string stockChan // 进货渠道
    3:required ShopApprovalFormAddress warehouseAddr // 仓库地址
    4:required string prodCount // 可上架商品数
    5:required string awareChan // 了解到ezbuy的渠道
    6:optional ShopApprovalFormSrcPlat srcPlat // 来源平台
    7:optional list<string> samplePics // 样品商品图片
}

// 仓库地址
struct ShopApprovalFormAddress {
    1:required list<string> areasCode
    2:required list<string> areasVal
    3:required string address
}

// 店铺来源平台
struct ShopApprovalFormSrcPlat {
    1:required list<string> platform
    2:required string shopUrl
}

struct ShopApprovalFormPersonal {
    1:required ShopApprovalFormResponsibleInfo responsibleInfo
    2:required ShopApprovalFormBankInfo bankInfo
    3:required ShopApprovalFormShopSurvey surveyInfo
}

struct ShopApprovalFormOrganization {
    1:required ShopApprovalFormResponsibleInfo responsibleInfo
    2:required list<Contact> contacts
    3:required ShopApprovalFormOrgInfo orgInfo
    3:required ShopApprovalFormBankInfo bankInfo
    5:required ShopApprovalFormShopSurvey surveyInfo
}

struct AdminShopApprovalListFilter {
    1:optional ShopApprovalFormStatus status
    2:optional ShopApprovalFormType type
    3:optional string shopName
    4:optional string originCode
    5:optional string mainCat
    6:optional string qqNumber
    7:optional i64 createdFrom
    8:optional i64 createdTo
}

struct AdminShopApprovalFormListItem {
    1:required string formId
    2:required string email // decrepted
    3:required string username
    4:required string shopName
    5:required ShopApprovalFormType type
    6:required i64 createdAt
    7:required ShopApprovalFormStatus status
    8:required i32 shopId
    9:required string originCode
    10:required string account   // 注册账号、邮箱或手机（CN）
    11:required string mainCats // 主营类目
    12:required string qqNumber // 卖家qq号
}

struct AdminShopApprovalFormListResult {
	1:required i32 total
	2:required list<AdminShopApprovalFormListItem> list
}

struct AdminShopApprovalDetail {
    1:required string formId
    2:required string email
    3:required string username
    4:required string shopName
    5:required ShopApprovalFormType type
    6:optional ShopApprovalFormPersonal personalForm
    7:optional ShopApprovalFormOrganization orgForm
    8:required ShopApprovalFormStatus status
    9:required ShopApprovalRequesterInfo requester
    10:required i32 shopId
    11:required string originCode
    12:required string warehouseAddress
    //13:required string appliedMainCats // 废弃
}

struct AdminShopApprovalOplog {
    1:required i32 status
    2:required i64 time
    3:required string operator
    4:required string remark
}

struct SkuProp {
    1:required i32 propId
    2:required string propName
    3:required list<SkuValue> values
}

struct SkuValue {
    1:required i32 valueId
    2:required string valueName
    3:optional string image
}

struct ProductSimple {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:required string primaryImage
    5:required bool isOnSale
    6:required string url
    7:required double price
    #8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
    10:required ProductSellType sellType
    11:optional bool forcedOffSale
    12:optional list<OpProductOperationLog> opLogs
    13:required i32 soldCount # 商品销量
    14:required bool isStocked # 现货 true, 预售 false
    15:required ProductShipmentInfo shipment
}

struct UserProductListResult {
    1:required i32 total;
    2:required i32 onSaleCount;
    3:required list<ProductSimple> products;
}

struct ProductBase {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:optional string description
    5:required string primaryImage
    6:optional list<string> images
    7:required bool isOnSale
    #8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
    10:required ProductShipmentInfo shipmentInfo
    11:required map<string, string> attributes
    12:required ProductSellType sellType
    13:required string url
    14:required list<SkuProp> skuProps
    15:required string enName
    16:required bool isStocked                      # 现货 true, 预售 false
    17:required bool forceOffSale
    18:required bool committed
    19:required ProductSource source                # 商品来源
    20:required bool isSku                          # 是否sku级别商品
}

struct ProductDetail {
    1:required ProductBase base
    2:required list<ProductSku> skus
}

struct ProductSkuVolume {
    1:required i32 length
    2:required i32 width
    3:required i32 height
}

struct ProductSku {
    1:required i32 skuId
    2:required string name
    3:optional string skuImage
    4:optional list<string> images
    5:required bool isOnSale
    6:required map<string, string> attributes
    7:required double price
    8:optional double originalPrice
    9:required double weight
    #10:required ProductShipmentInfo shipmentInfo
    11:required i32 quantity
    12:required double shippingFee
    13:required ProductSkuVolume volume
    14:required string sellerSkuId
}

struct ImportTask {
    1:required string taskId
    2:required ImportTaskType type
    3:required string url
    4:required string name
    5:required ImportTaskState state
    6:required string remark
    7:required i32 totalCount
    8:required i32 fetchedCount
    9:required i32 failedCount
    10:required i64 createdAt
    11:required i64 updatedAt
    12:optional string subTaskIdForQuickView
}

struct ImportTaskListResult {
    1:required i32 total
    2:required i32 offset
    3:required list<ImportTask> data
}

struct ImportSubTask {
    1:required string subTaskId
    2:required string productUrl
    3:required string productName
    4:required ImportSubTaskState state
}

struct UserProductListFilter {
    1:optional bool isOnSale
    2:optional ProductSellType sellType
    3:optional bool quantityLow
    4:optional string productName
    5:optional bool unCommitted
    6:optional SortType soldCountSortType
    7:optional double minPrice // 价格区间
    8:optional double maxPrice
    9:optional i64 minCreateDate // 创建时间区间
    10:optional i64 maxCreateDate
    11:optional bool isStocked
}

struct UserProductQuickChange {
    1:optional bool isOnSale
    2:optional string name
    3:optional ProductShipmentInfo shipment
    4:optional bool shouldTranslateName // 仅在 CN 卖家生效
}

struct UserImportSubTaskListFilter {
    1:optional bool succeeded
}

struct Order {
    1:required string orderNum
    2:required string productName
    3:required OrderStatus status
    4:required double shippingFee
    5:required double totalAmount
    6:required list<OrderItemSimple> items
    7:required list<OrderRemark> remarks
    8:required OrderWarehouse warehouse
    9:required ProductSellType sellType
    10:required i64 createdAt
    11:required i64 finishedAt
    12:required OrderTrack track
    13:required string primaryImage
    14:required bool dispatchDelayed
    15:required i64 expectedDispatchAt
    16:required string productUrl
    17:required SellerPackageState packageState
    18:required double paidAmount
}

struct OrderListResult {
    1:required i32 total // 总数量
    2:required i32 offset // 当前结果对应的偏移量
    3:required list<Order> data
}

struct ProductSimpleInfo{
    1:required string productName
    2:required i32 productId
}

struct OrderItemSimple {
    1:required i32 orderItemId
    2:required string skuName
    3:required i32 quantity
    4:required double unitPrice
    5:required double totalAmount
    6:required OrderItemStatus status
    7:required OrderItemType type
    8:optional OrderTrack track
    #9:required list<OrderRemark> remarks
    9:required double unitOriginalPrice
    10:required double unitDiscount
    11:required double unitCashOff
    12:required string sellerSkuId
    13:required double totalCashOff
    14:required double itemPaidAmount
}

struct OrderItem {
    1:required i32 orderItemId
    2:required string productName
    3:required string orderNum
    4:required string skuName
    5:required i32 quantity
    6:required double unitPrice
    7:required double totalAmount
    8:required list<string> attrs
    9:required OrderItemStatus status
    10:required OrderItemType type
    11:optional OrderTrack track
    12:required ProductSellType sellType
    #12:required list<OrderRemark> remarks
    13:required double unitOriginalPrice
    14:required double unitDiscount
    15:required double unitCashOff
    16:required string sellerSkuId
}

struct OrderItemGroup {
    1:required string orderNum
    2:required ProductSellType sellType
    3:required string productName
    4:required list<OrderItem> items
    5:required list<OrderRemark> remarks
    6:required OrderWarehouse warehouse
    7:required OrderStatus status
    8:required OrderTrack track
    9:required string primaryImage
    10:required i64 createdAt
    11:required i64 paidAt
    12:required bool dispatchDelayed
    13:required i64 expectedDispatchAt
    14:required string productUrl
}

struct OrderItemGroupListResult {
    1:required i32 total
    2:required i32 offset
    3:required list<OrderItemGroup> data
}

struct OrderRemark {
    1:required string text
    2:required OrderRemarkSource source
    3:required string createdBy
    4:required i64 createdAt
}

struct OrderHistory {
    1:required OrderOperation operation
    2:required string operator
    3:required i64 createdAt
    4:optional string text
}

struct OrderTrack {
    1:required string provider
    2:required string trackingNum
    3:required i64 trackId
}

struct OrderDetail {
    1:required Order order
    2:required list<OrderHistory> history
}

struct UserOrderListFilter {
    1:optional OrderWarehouse warehouse
    2:optional SellerPackageState packageState
    3:optional ProductSellType sellType
    4:optional string orderNum
    5:optional i64 productId
    6:optional string productUrl
    7:optional i64 minCreateDate
    8:optional i64 maxCreateDate
    9:optional OrderBillStatus billStatus
}

struct UserOrderItemListFilter {
    1:optional OrderWarehouse warehouse
    2:optional OrderItemStatus status
    3:optional ProductSellType sellType
    4:optional OrderItemType itemType
    5:optional string trackingProvider
    6:optional string trackingNum
    7:optional string orderNum
    8:optional i32 productId
}

struct UserPackingListFilter {
    1:optional list<string> pkgNumbers
    2:optional list<i64> pkgIds
}

struct OrderTrackDetail {
    1:required string provider
    2:required string trackingNum
    3:required i32 itemCount
    4:required i64 createdAt
    5:required i64 updatedAt
}

struct OrderTrackDetailListFilter {
    1:optional string provider
    2:optional string trackingNum
}

struct UserEzChoiseProductListFilter {
    1:optional bool isOnSale
    2:optional string productName
}

# 缺货登记
const string SendByEzseller = "seller"
const string SendByEzbuySupporter = "ezbuySupporter"

enum SesssionStatus {
    Unknown,
    Processing,
    Closed,
    MaxLimit,
}

struct OrderInfo {
    1:required string sellerSkuId
    2:required string skuName
    3:required double unitPrice
    4:required i32 quantity
    5:required OrderWarehouse warehouse
}

struct BaseInfo {
    1:required string orderNum
    2:required MessageType msgType
}

struct SellerFeedbackFilter {
    1:optional OrderWarehouse warehouse
    2:optional MessageType msgType
    3:optional string shopName
    4:optional i64 stime
    5:optional i64 etime
    6:optional SesssionStatus Closed
    7:optional string orderNum
    8:optional Region region
}

struct SellerFeedback {
    1:required i32 orderId
    1:required string orderNum
    2:required OrderWarehouse warehouse
    3:required string shopName
    4:required MessageType msgType
    5:required i32    Closed
    6:required i64    lastReplyTime
    7:required string lastReplyItem
    8:required string lastEzbuySender
    9:required string newEzOrderId
    10:required string newEzOrderItemId
}

struct SellerFeedbackResp {
    1:required list<SellerFeedback> result
    2:required i32 total
}

//批处理会话是否已经结束
struct CompletedSession {
    1:required string shopName
    2:required MessageType msgType
    3:required string orderNum
}



# “站内信”
struct MsgInstance {
    1:required string content
    2:required BaseInfo info
}

struct SessionFilter {
    1:required list<string> orderNums
    2:required SendBy sender
    3:required MessageType msgType
}

struct MessageResult {
    1:required map<string,bool> result
}

struct Chatlog {
    1:required string from
    2:required string createBy
    3:required string content
    4:required i64 ctime
}

struct ChatlogResp {
    1:required list<Chatlog> snapshoot
}

// package

struct ShopPackageListFilter {
    1:optional SellerPackageState pkgState  // 包裹实际详细状态
    2:optional string pkgNumber
    3:optional ShopPackageFilterState state // 前端界面筛选分类
    4:optional bool isStocked
    5:optional i64 pkgCreateDateStart
    6:optional i64 pkgCreateDateEnd
    7:optional i64 pkgShopDispatchDateStart
    8:optional i64 pkgShopDispatchDateEnd
    9:optional string orderNumber
}

struct PackageListResult {
    1:required i32 total
    2:required list<Package> data
}

// KR 运单信息
struct PackageTrackInfo {
    1:required string provider # 物流公司
    2:required string trackingNumber # 运单号
}

struct Package {
	1:required i32 pkgId
    2:required string pkgNumber
    3:required i64 createdAt
    4:required i64 expiredAt # 发货截止时间
    5:required i64 dispatchedAt
    6:required string state # 包裹状态名称
    7:required list<PackageOrderItem> orderItems
    8:required bool isStocked
    // KR返回运单信息
    9:optional PackageTrackInfo trackInfo
}

struct WarehousePackageListFilter {
    1:optional i32 shipmentType
    2:optional string pkgNumber
    3:optional WarehousePackageFilterState state
    4:optional string catalogCode // 包裹目的地国家
    5:optional i64 shopDeliveredStartDate
    6:optional i64 shopDeliveredEndDate
    7:optional i64 warehouseRecvStartDate
    8:optional i64 warehouseRecvEndDate
    9:optional i64 warehouseShippedStartDate
    10:optional i64 warehouseShippedEndDate
}

struct WarehousePackageListResult {
    1:required i32 total
    2:required list<WarehousePackage> data
}

struct WarehousePackage {
    1:required i32 pkgId
    2:required string pkgNumber
    3:required i32 subPackageCount
    4:required string state // 包裹状态名称
    5:required string shopName
    6:required string catalogCode // 包裹目的地国家
    7:required string shipmentTypeName
    8:required i64 shopDeliveredDate
    9:required i64 warehouseReceivedDate
    10:required i64 shippedDate // 发往目的地时间
    11:required string shipperName // 国际物流商名
    12:required string shipCode // 国际物流商提供的运单号。erp中为封箱号
}

struct PackageOrderItem {
    1:required string productName
    2:required i32 skuId
    3:required string skuName
    4:required string img
    5:required double unitPrice
    6:required i32 quantity
    7:required OrderItemStatus state
    8:required list<OrderRemark> remarks
    9:required string sellerSkuId
    10:required string productUrl
    11:required string orderNumber
    12:required double itemPaidAmount
    13:required string newOrderNum
}

struct WarehouseExportInformationItem {
	1:required string packageNumber
    2:required i32 packagesCount
    3:required double weight
    4:required list<string> packingNumbers
    5:required string shipperName
    6:required InvoiceConsignee receiver
    7:required list<string> description
    8:required list<string> pcs
    9:required double value
}

struct MirrorProductSimple {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:required string primaryImage
    5:required bool isOnSale
    6:required string url
    7:required double price
    #8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
    10:required ProductSellType sellType
}

struct MirrorProductSimple {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:required string primaryImage
    5:required bool isOnSale
    6:required string url
    7:required double price
    #8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
    10:required ProductSellType sellType
}

struct MirrorProductDetail {
    1:required ProductBase base
    2:required list<MirrorProductSku> skus
}

struct MirrorProductSku {
    1:required i32 skuId
    2:required string name
    3:optional string skuImage
    4:optional list<string> images
    5:required bool isOnSale
    6:required map<string, string> attributes
    7:required double price
    8:optional double originalPrice
    9:required double sellingPrice
    10:required double weight
    11:required i32 quantity
    12:required double shippingFee
}

struct MirrorProductProvider {
    1:required i32 productId
    2:required i32 shopId
    3:required string shopName
    4:required string productUrl
    5:required bool isOnSale
    6:required list<MirrorProductProviderSku> skus
}

struct MirrorProductCandidate {
    1:required string productName
    2:required string productUrl
    3:required i32 categoryId
    4:required i32 categoryName
}

struct MirrorProductCandidateListUrlFilter {
    1:required string url
}

struct MirrorProductCandidateListEzBuyCategoryFilter {
    1:required i32 categoryId
}

struct MirrorProductCandidateListFilter {
    1:optional MirrorProductCandidateListUrlFilter aliProductUrlFilter
    2:optional MirrorProductCandidateListUrlFilter aliPageUrlFilter
    3:optional MirrorProductCandidateListEzBuyCategoryFilter categoryFilter
}

struct MirrorProductProviderSku {
    1:required i32 skuId
    2:required string name
    3:required bool isOnSale
    4:required double price
    5:required double weight
    6:required i32 quantity
    7:required double shippingFee
}

struct MirrorProductOrder {
    1:required string orderNum
    2:required string shopName
    3:required i32 shopId
    4:required OrderStatus status
    5:required double shippingFee
    6:required double totalAmount
    7:required list<OrderItemSimple> items
    8:required list<OrderRemark> remarks
    9:required OrderWarehouse warehouse
    10:required i64 createdAt
    11:required i64 finishedAt
    12:required OrderTrack track
    13:required string productName
    14:required string primaryImage
}

struct AdminMirrorProductOrderListFilter {
    1:optional string orderNum
    2:optional string shopName
    3:optional OrderStatus status
    4:optional OrderWarehouse warehouse
}

struct UserMirrorProductSimple {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:required string primaryImage
    5:required bool isOnSale
    6:required string url
    7:required double price
    #8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
    10:required ProductSellType sellType
    11:required bool isLinked
    12:required i64 lastPushedAt
    13:required i32 linkProductId
}

struct UserMirrorProductListFilter {
    1:optional i32 categoryId
    2:optional string productName
    3:optional bool linked
}

struct ExportFile {
    1:required string fileUrl
    2:required ExportFileType type
}

struct OrderDispatchImportResult {
    1:required string orderNum
    2:required i32 rowNum
    3:required OrderDispatchImportError error
}

struct ERPBillSimple {
    1:required string billNum
    2:required string shopName
    3:required i64 createdAt
    4:required double finalAmount
    5:required double approvedAmount
    6:required list<BillRemark> remarks
    7:required BillStatus status
    8:optional list<BillOperationHistory> opHistory
    9:required double appeallingAmount
    10:required BillPeriod periodType
    11:required string originCode
    12:required bool marked
}

struct ERPBillOrder {
    1:required string orderNum
    2:required string catalogCode
    3:required OrderWarehouse warehouse
    4:required i64 createdAt
    5:required i64 arrivedAt
    6:required i64 finishedAt
    7:required i32 unitQuantity                                 // 商品数量
    9:required double unitAmount                                // 商品金额
    10:required double offsetAmount                             // 差额补齐金额
    11:required double unitAmountWithOffset                     // 差额补齐后商品金额
    12:required double shippingFee                              // 国内运费
    13:required double totalAmount                              // 总金额
    14:required double totalAmountWithOffset                    // 差额补齐后总金额
    15:required double serviceFee                               // 服务费
    16:required double finalAmount                              // 可结算金额
    17:required i32 unitQuantityWithOffset                      // 差额补齐后商品数量
    18:required string packageNum
    19:required double serviceFeeRate                           // 技术服务费费率
    20:required i64 arriveDestAt
    21:required double localDeliveryFee                         // 本地配送费
}

struct ERPBillOrderItem {
    1:required string orderItemNum
    2:required string catalogCode
    3:required OrderWarehouse warehouse
    4:required i64 createdAt
    5:required i64 arrivedAt
    6:required i64 finishedAt
    7:required i32 unitQuantity                                 // 商品数量
    9:required double unitAmount                                // 商品金额
    10:required double offsetAmount                             // 差额补齐金额
    11:required double unitAmountWithOffset                     // 差额补齐后商品金额
    12:required double shippingFee                              // 国内运费
    13:required double totalAmount                              // 总金额
    14:required double totalAmountWithOffset                    // 差额补齐后总金额
    15:required double serviceFee                               // 服务费
    16:required double finalAmount                              // 可结算金额
    17:required i32 unitQuantityWithOffset                      // 差额补齐后商品数量
    18:required string packageNum
    19:required double serviceFeeRate                           // 技术服务费费率
    20:required i64 arriveDestAt
    21:required double localDeliveryFee                         // 本地配送费
}

struct ERPBillOrderItemNew {
    1:required string orderItemNum
    2:required string catalogCode
    3:required OrderWarehouse warehouse
    4:required i64 createdAt
    5:required i64 arrivedAt
    6:required i64 finishedAt
    7:required i32 unitQuantity                                 // 商品数量
    9:required i64 unitAmount                                // 商品金额
    10:required i64 offsetAmount                             // 差额补齐金额
    11:required i64 unitAmountWithOffset                     // 差额补齐后商品金额
    12:required i64 shippingFee                              // 国内运费
    13:required i64 totalAmount                              // 总金额
    14:required i64 totalAmountWithOffset                    // 差额补齐后总金额
    15:required i64 serviceFee                               // 服务费
    16:required i64 finalAmount                              // 可结算金额
    17:required i32 unitQuantityWithOffset                      // 差额补齐后商品数量
    18:required string packageNum
    19:required double serviceFeeRate                           // 技术服务费费率
    20:required i64 arriveDestAt
    21:required i64 localDeliveryFee                         // 本地配送费
    22:required i32 prodId
    23:required string prodName
    24:required i64 billableAt
}

struct BillOperationHistory {
    1:required BillOperationType type
    2:required i64 createdAt
    3:required string createdBy
    4:required double amount
    5:required string remark
}

struct TransferAccountInfo {
    1:required string bankName
    2:required string agencyName
    3:required string agencyAddress
    4:required string accountNumber
    5:required string accountName
    6:required string phone
    7:required string beneficiaryName
    8:required string beneficiaryBankAddress
    9:required string bankSwiftCode
}

struct UserTransferAccountInfo {
    1:required TransferAccountInfo transferAccount
    2:required TransferAccountInfo changeTransferAccount
    3:required TransferAccountChangeStatus changeStatus
    4:required string rejectedMsg
    5:required i64 changeDate
}


struct TransferInfo {
    1:required string trackingNum
    2:required double amount
    3:required double fee                           // 手续费数额
}

struct Transfer {
    1:required string billNum
    2:required TransferStatus status
    3:required i64 createdAt
    4:required double amount
    5:required TransferAccountInfo account
    6:required string shopName
    7:required TransferInfo transferInfo
    8:required string transferredBy
    9:required list<BillRemark> remarks
    10:optional i64 approvedAt                      // 审批时间
    11:optional string approvedBy                   // 审批人
    12:required bool marked                         // 是否标记
    13:required string originCode                   // 账单所在地
}

struct BillRemark {
    1:required BillRemarkType type
    2:required string createdBy
    3:required i64 createdAt
    4:required string text
}

struct ERPBillDisposeItem {
    1:required string billNum
    2:required double suggestedAmount
    3:optional string remark
}

struct ERPBillApproveItem {
    1:string billNum
    2:double amount
    3:string remark
}

struct ERPTransferDoneItem {
    1:string billNum
    2:TransferInfo transferInfo
    3:string remark
}

struct ERPBillListFilter {
    1:optional string billNum
    2:optional string shopName
    3:optional bool approved
    4:optional BillPeriod periodType
    5:optional string originCode
    6:optional BillStatus status // 根据不同approved，匹配更具体的状态
    7:optional bool marked // 是否被标记
}

struct ERPBillListResult {
    1:required list<ERPBillSimple> bills
    2:required i32 total
}

struct ERPBillSimpleNew {
    1:required string billNum
    2:required string shopName
    3:required i64 createdAt
    4:required i64 finalAmount
    5:required i64 approvedAmount
    6:required list<BillRemark> remarks
    7:required BillStatus status
    8:optional list<BillOperationHistory> opHistory
    9:required i64 appeallingAmount
    10:required BillPeriod periodType
    11:required string originCode
    12:required bool marked
    13:required i64 adjustmentAmount
}

struct ERPBillListNewResult {
    1:required list<ERPBillSimpleNew> bills
    2:required i32 total
}

struct ERPBillDetailFilter {
    1:optional bool withOffset
}

struct ERPBillOrderItemFilter {
    1:optional bool withOffset
}

struct ERPBillDetailResult {
    1:required list<ERPBillOrder> orders
    2:required string shopName
}

struct ERPShop {
    1:required i32 shopId
    2:required string shopName
}

struct ERPShopSearchListReq {
    1:required string shopName
}

struct ERPShopSearchListResp {
    1:required list<ERPShop> shops
}

struct ERPBillOrderItemResult {
    1:required list<ERPBillOrderItemNew> orderItems
    2:required string shopName
    3:required i32 total
}

struct ERPTransferFilter {
    1:optional TransferStatus status
    2:optional string shopName
    3:optional string bankName
    4:optional string billNum
    5:optional bool approved                        // 筛选已审批的提现申请, 与 status 不共存,  status 优先
    6:optional bool approvedByMe                    // 筛选当前用户审批的提现申请, approved 为 true 的情况下生效
    7:optional string accountName                   // 筛选收款人姓名
    8:optional bool marked // 是否被标记
    9:optional string originCode                    // 筛选转账单国家
}

struct ERPTransferListResult {
    1:required list<Transfer> transfers
    2:required i32 total
}

struct UserBillSimple {
    1:required string billNum
    2:required i64 rangeStart
    3:required i64 rangeEnd
    4:required double orderTotalAmount
    5:required i32 orderQuantity
    6:required double finalAmount
    7:required double approvedAmount
    8:required BillStatus status
    9:required list<BillRemark> remarks
    10:required bool appealable
    11:required bool transferable
    12:required double appeallingAmount
    13:optional TransferStatus transferStatus
    14:required BillPeriod periodType
    15:required double localDeliveryFee
    16:required i64 createdAt
    17:required i64 adjustmentAmount
}

struct UserBillListFilter {
    1:optional BillPeriod periodType
}

struct UserBillListResult {
    1:required i32 total
    2:required i32 offset
    3:required list<UserBillSimple> data
}

struct UserBillOrder {
    1:required string orderNum
    2:required double totalAmount
    3:required double offsetAmount
    4:required double totalAmountWithOffset
    5:required i64 createdAt
    6:required i64 finishedAt
    7:required OrderWarehouse warehouse
    8:required OrderTrack track
    9:required double shippingFee
    10:required double serviceFee
    11:required double finalAmount
    12:required string packageNum
    13:required double localDeliveryFee
}

struct UserBillOrderItem {
    1:required string orderNum
    2:required string productName
    3:required string skuName
    4:required i32 quantity
    5:required double unitPrice
    6:required double unitDiscount
    7:required double unitCashOff
    8:required double unitOriginalPrice
    9:required double totalAmount
    10:required double serviceFee
    11:required double finalAmount
    12:required string packageNum
    13:required double totalCashOff
    14:required double localDeliveryFee
}

struct UserBillNewOrderItem {
    1:required string orderNum
    2:required i64 totalAmount
    3:required i64 offsetAmount
    4:required i64 totalAmountWithOffset
    5:required i64 createdAt
    6:required i64 finishedAt
    7:required OrderWarehouse warehouse
    8:required OrderTrack track
    9:required i64 shippingFee
    10:required i64 serviceFee
    11:required i64 finalAmount
    12:required string packageNum
    13:required i64 localDeliveryFee
}

struct UserBillOrderResult {
    1:required list<UserBillOrder> orders
}

struct UserBillNewOrderItemResult {
    1:required list<UserBillNewOrderItem> orders
}

struct UserBillOrderItemResult {
    1:required list<UserBillOrderItem> items
}

struct UserBillProductResult {
    1:required list<UserBillOrderItem> items
}

struct AdminOpProductSimple {
    1:required i32 productId
    2:required string productUrl
    3:required string productName
    4:required string primaryImage
    5:required string price
    6:required AdminOpProductStatus status
    7:required string shopName
    8:required string originCode
    9:required bool isStocked                           # 现货 true, 预售 false
    10:required bool isDeleted
    11:required i32 categoryId
    12:required i64 aliCid
    13:optional string categoryLeaf
    14:required string weight
    15:required string originalPrice
    16:required i32 soldCount
    17:required string CreateDate
    18:required ProductShipmentInfo shipmentInfo
}

enum AdminOpProductStatus {
    Unknown,
    OnSale,        // 在售
    OffSale,       // 下架
    ForcedOffSale, // 强制下架
    IsDeleted,     // 店铺删除商品
    MaxLimit
}

struct AdminOpProductListFilter {
    1:optional i32 shopId                               // 和 shopName 同时存在的时候,  shopId 优先
    2:optional string shopName
    3:optional string productName
    4:optional string productUrl
    5:optional AdminOpProductStatus status
    6:optional double minPrice
    7:optional double maxPrice
    8:optional ProductSource productSource
    10:optional bool isStocked
    11:optional ExportFileLanguage lang
    12:optional string originCode
    13:optional i64 createdAtFrom
    14:optional i64 createdAtTo
}


struct ProductSkuPrice {
    1:required i64 productId
    1:required list<SkuPrice> skuPrices
}

struct SkuPrice {
    1:required i64 skuId
    2:required double price       // 平台价
    3:optional double taobaoPrice // 淘宝价
}

struct AdminOpProductListResult {
    1:required list<AdminOpProductSimple> products
    2:required i32 count
}

struct AdminOpOrderItemSimple {
    1:required i32 orderItemId
    2:required string skuName
    3:required i32 skuId
    4:required i32 quantity
    5:required double unitPrice
    6:required OrderItemStatus status
    7:required OrderItemType type
    8:required double unitOriginalPrice
    9:required double unitDiscount
    10:required double unitCashOff
    11:required Activity activity
    12:required string originCode
    13:required double totalCashOff
}

struct AdminOpOrderSimple {
    1:required string orderNum
    2:required i32 orderId
    3:required i32 shopId
    4:required string shopName
    5:required i32 productId
    6:required string productUrl
    7:required string productName
    8:required OrderStatus status
    9:required double shippingFee
    10:required double totalAmount
    11:required list<AdminOpOrderItemSimple> items
    12:required list<OrderRemark> remarks
    13:required OrderWarehouse warehouse
    14:required ProductSellType sellType
    15:required i64 createdAt
    16:required i64 finishedAt
    17:required i64 dispatchedAt
    18:required i64 arrivedAt
    19:required string primaryImage
    20:required OrderTrack track
    21:required i64 expectedDispatchAt
    22:required bool dispatchDelayed
    23:required SellerPackageState packageState
    24:required i64 paidAt
    25:required double paidAmount  // 实付金额
}

struct AdminOpOrderItemSimpleNew {
    1:required string orderNum          // 老订单号
    2:required string orderItemId
    3:required string shopName
    4:required i32 productId
    5:required string productName
    6:required string skuName
    7:required OrderItemTrackStatus status      // 订单状态
    8:required double totalAmount               // 总金额
    9:required i64 createdAt                    // 订单创建时间，新订单逻辑付款时间和创建时间相等
    10:required i64 finishedAt                  // 订单完成时间
    11:required i64 dispatchedAt                // 订单发货时间
    12:required i64 arrivedAt                   // 订单到达仓库时间
    13:required i64 expectedDispatchAt          // 发货截止时间
    14:required bool dispatchDelayed            // 订单是否超时发货
    15:required string newOrderNum              // 新订单编号
    16:required double unitAmount               // 单价
    17:required i32 qty                         // 数量
    18:required Region region                   // 货源地国家
    19:required i64 stockInQty                  // 实收数量
}

struct AdminOpOrderListFilter {
    1:optional i32 shopId                       // 和 shopName 同时存在的时候,  shopId 优先
    2:optional string shopName
    3:optional i64 createdAtFrom
    4:optional i64 createdAtTo
    5:optional i64 finishedAtFrom
    6:optional i64 finishedAtTo
    7:optional SellerPackageState packageState
    8:optional i32 productId                    // 和 productUrl 同时存在的时候,  productId 优先
    9:optional string productUrl
    10:optional bool dispatchDelayedOnly        // 仅列出延迟发货的
    11:optional ExportFileLanguage lang
    12:optional string OriginCode
    13:optional i64 paidAtFrom
    14:optional i64 paidAtTo
}

struct AdminOpOrderListFilterNew {
    1:optional i32 shopId                       // 和 shopName 同时存在的时候,  shopId 优先
    2:optional string shopName
    3:optional i64 createdAtFrom
    4:optional i64 createdAtTo
    5:optional i64 finishedAtFrom
    6:optional i64 finishedAtTo
    7:optional OrderItemTrackStatus orderItemTrackStatus
    8:optional i32 productId                    // 和 productUrl 同时存在的时候,  productId 优先
    9:optional string productUrl
    10:optional bool dispatchDelayedOnly        // 仅列出延迟发货的
    11:optional ExportFileLanguage lang
    12:optional Region prodRegion               // 发货地国家
    13:optional string orderNum                 // 新老订单号
}

struct AdminOpOrderListResult {
    1:required list<AdminOpOrderSimple> orders
    2:required i32 count
}

struct AdminOpOrderListResultNew {
    1:required list<AdminOpOrderItemSimpleNew> orderItems
    2:required i32 count
}

enum OpProductOperationLogType {
    Unknown,
    ForcedOffSale,
    ForcedOffSaleCancelled,
    MaxLimit
}

struct OpProductOperationLog {
    1:required OpProductOperationLogType type
    2:required string text
    3:required string operator
    4:required i64 createdAt
}

struct AdminOpProductOperationLogListFilter {
    1:optional OpProductOperationLogType type
}

struct AdminOpProductOperationLogListResult {
    1:required list<OpProductOperationLog> operationLogs
    2:required i32 total
}

// history of rate
struct AdminOpServiceFeeRateHistory {
    1:required string username
    2:required i64 opTime
    3:optional string category
    4:optional map<string, list<double>> shop
    5:optional double exRate
    6:optional double curRate
}

struct AdminOpServiceFeeRateHistoryResp {
    1: required i64 total
    2: required i64 offset
    3: required i64 limit
    3: optional list<AdminOpServiceFeeRateHistory> result
}

struct AdminOpRemarkListResult {
    1:required list<OrderItemRemark> remarks
}

enum ProductChangeLogField {
    Unknown,
    Name,
    EnName,
    PrimaryImage,
    SkuIds,
    SkuPrice,
    SkuOnSale,
    SkuQuantity,
    IsDeleted,
    SkuOriginalPrice,
    SellerSkuId,
    SkuWeight,
    ShipmentInfo,
    MaxLimit
}

struct ProductChangeLogEntry {
    1:required ProductChangeLogField field
    2:optional i32 skuId
    3:required string valBefore
    4:required string valAfter
}

struct ProductChangeLog {
    1:required i32 productId
    2:required string createdBy
    3:required i64 createdAt
    4:required list<ProductChangeLogEntry> entries
}

struct AdminOpProductChangeLogListFilter {
    1:optional list<ProductChangeLogField> fields
}

struct AdminOpProductChangeLogListResult {
    1:required list<ProductChangeLog> changeLogs
    2:required i32 total
}

struct ExportFileSubmitResult {
    1:optional string errMessage
    2:optional ExportFileTaskState  state
    3:optional string file // mongo record ObjectID
}

struct AdminOpShopSimple {
    1:required string shopName
    2:required i32 shopId
    3:required bool disabled
    4:required string originCode
    5:required bool isApproved
    6:required bool isShutDown
}

struct AdminOpShopListFilter {
    1:optional string shopName
    2:optional bool isShutDown
    3:optional bool isApproved
    4:optional bool isDisabled
    5:optional string originCode
}

enum AdminOpShopListSort {
    Unknown,
    ShopIdAsc,
    ShopIdDesc,
    ShopNameAsc,
    ShopNameDesc,
    MaxLimit
}

struct AdminOpShopListResult {
    1:required i32 total
    2:required list<AdminOpShopSimple> shops
}

enum AdminOpShopType {
    Unknown,
    PauseBusiness,
    StartBusiness
}

struct AdminOpShopLog {
    1:required i32 shopId
    2:required i64 operatedAt
    3:required string operatorName
    4:required AdminOpShopType type
    5:required string remark
}

struct AdminOpShopLogsResult {
    1:required i32 total
    2:required list<AdminOpShopLog> logs
}

struct AdminOpServiceFeeRateItem {
    1:required double rate
    2:required bool inherited
    3:optional string inheritedCategoryName
    4:optional i32 inheritedCategoryId
}

struct AdminOpServiceFeeRateShopSetting {
    1:required i32 shopId
    2:required string shopName
    3:required AdminOpServiceFeeRateItem rateItem
}

struct AdminOpServiceFeeRateSettings {
    1:required AdminOpServiceFeeRateItem common
    2:optional list<AdminOpServiceFeeRateShopSetting> shops
}

struct AdminOpServiceFeeRateShopUpdateItem {
    1:required i32 shopId
    3:required double exRate
    4:required double curRate
}

struct AdminOpJdBalanceResult {
    1:required string result
}

// 拣货单
struct PickListItem {
    1:string packageNumber
    2:i32 skuId
    3:string productName
    4:string skuInfo
    5:i32 quantity
    6:string sellerSkuId
}

struct Invoice {
    1:required string username
    2:required string packageNumber
    3:required i32 boxCnt
    4:required i32 pkgCnt
    5:required list<InvoiceSubPkgNumber> subPkgNumbers
    6:required InvoiceWarehouse warehouse
    7:required InvoiceSender sender
    8:required InvoiceConsignee receiver
    9:required list<InvoiceItem> items
    10:required double total
    11:required string localDeliveryMethod
    12:required list<OrderItem> orderItems
    13:required string deliveryStationCode
}

struct InvoiceSubPkgNumber {
    1:string subPkgNumber
    2:string hblNumber
}

struct InvoiceConsignee {
    1:string username
    2:string mobile
    3:string ZIPCode
    4:string address
}

struct InvoiceSender {
    1:string username
    2:string mobile
    3:string ZIPCode
    4:string address
    5:string provider // 物流商
}

struct Shipper {
    1:i32 shipperId
    2:string name
}

struct InvoiceWarehouse {
    1:string name
    2:string originCountry
    3:string destination
    4:string exportDate // 2006-01-02
}

struct InvoiceItem {
    1:required string description
    2:required i32 qty
    3:required string unitType
    4:required double unitPrice
    5:required double total
    6:required double itemPaidAmount
}

struct ShipmentType {
	1:required i32 id
	2:required string code
	3:required string name
	4:required string enName
}

struct AnnouncementDetail {
    1:required string title
    2:required string content
}

struct AdminOpAnnouncementDetail {
    1:required i32 announcementId
    2:required AnnouncementDetail detail
    3:required bool published
    4:required i64 createdAt
    5:required i64 updatedAt
    6:required i64 publishedAt
}

struct AdminOpAnnouncementSimple {
    1:required i32 announcementId
    2:required string title
    3:required bool published
    4:required i64 publishedAt
    5:required i64 updatedAt
}

struct AdminOpAnnouncementListFilter {
    1:optional i64 publishedAtFrom
    2:optional i64 publishedAtTo
    3:optional string title
    4:optional bool published
}

struct AdminOpAnnouncementListResult {
    1:required i32 total
    2:required list<AdminOpAnnouncementSimple> results
}

struct UserAnnouncementSimple {
    1:required i32 announcementId
    2:required string title
    3:required bool viewed
    4:required i64 publishedAt
}

struct ProductsFromSourceResult {
    1:required i32 total
    2:required list<ProductBase> results
}

struct UserDailyReportFilter {
    1:required i64 rangeStart
    2:required i64 rangeEnd
}

struct UserDailyReport {
    1:required UserDailyReportItem summary
    2:required list<UserDailyReportItem> details
}

struct UserShopStatisticsReq {
    1:required i64 rangeStart
    2:required i64 rangeEnd
}

struct UserShopStatisticsResp {
    1:required i64 addToCartCount
	2:required i64 vendorOrderAmount
	3:required i64 orderTotalCount
	4:required i64 orderCancelCount
	5:required i64 orderCustomerCount
	6:required i64 orderPayCount
	7:required i64 orderCashOffCount
	8:required i64 orderFlashSalesCount
	9:required i64 orderFreeShippingCount
    10:required i64 orderFriendsDealCount
	11:required i64 orderOtherCount
    12:required map<SortOption,list<ProductItem>> productLists
}

enum SortOption {
	None = 0,
	ADDTOCARTCOUNT = 1001,
	TOTALORDERCCOUNT = 1002,
	CUSTOMERORDERAMOUNT = 1003
}

struct ProductItem {
	1:required string productImg
	2:required string productName
	3:required i64 productId
	4:required i64 vendorOrderAmount
	5:required i64 orderTotalCount
	6:required i64 addToCartCount
	7:required i64 date
}

struct UserDailyReportDate {
    1:required i32 year
    2:required i32 month
    3:required i32 day
}

struct UserDailyReportItem {
    1:optional UserDailyReportDate date
    2:required i64 paidCount
    3:required double paidAmount
    4:required i64 canceledCount
    5:required double canceledAmount
    6:required i64 billableCount
    7:required double billableAmount
}

//////////
// 账户信息
//////////
struct SellerInfo {
	1:required string storeName
	2:required string storeUrl
	3:required string contactPerson
	4:required string contactPhone
	5:required string originCode
	6:required string warehouseAddress
}

enum NotificationType {
	None = 0,
	ShippingReminder = 1,
	MaxLimit = 2
}

enum NotificationChannel {
	None = 0,
	Email = 1,
	Phone = 2,
	MaxLimit = 4
}

struct AccountNotificationSetting {
	1:required string channelValue
	2:required list<AccountNotification> notifications
}

struct AccountNotification {
	1:required NotificationType notification;
	2:required bool subscribed;
}

enum ExportTaskType {
    AdminOpProductList = 1, // 运营 商品列表
    AdminOpOrderList = 2, // 运营 订单列表

    ShopDispatchItemOrderGroupList = 1001, // 待发货订单明细
    ShopOrderList = 1003,                  // 订单明细
    ShopBillOrderItem = 1004,              // 账户管理 / 产品明细 / 导出
    ShopBillOrder = 1005,                  // 账户管理 / 订单明细 / 导出
    ShopPackingList = 1007                 // 拣货单 导出
    ShopProductAnalyticsReport = 1008      // 单品分析 导出

    ErpBatchBill = 2001;                   // 账单导出
    ErpTransferCardInfo = 2002;            // 转账单银行卡信息导出
}

enum ExportTaskStatus {
    Unknown = 0,
    Pending = 1,            // 待处理
    Processing = 2,         // 处理中
    Succeeded = 3,          // 成功
    Failed = 4,             // 失败
    Paused = 5,             // 暂停
    Cancelled = 6,          // 取消
}

struct ExportTask {
    1:required string id                          // 任务 id
    2:required ExportTaskType taskType            // 任务类型
    3:required ExportTaskStatus status            // 任务状态
    4:required i64 createdAt                      // 创建时间
    5:required string createBy                    // 创建人
    6:required string fileUrl                     // 下载地址
    7:required string err                         // 错误信息
}

struct ExportTaskResult {
    1:required string id
    2:required bool isAlreadyExists
    3:required ExportTaskType taskType
}

struct UserExportTaskListFilter {
    1:optional ExportTaskType taskType
    2:optional string id
    3:optional i64 createdAtFrom
    4:optional i64 createdAtTo
}

struct ERPExportTaskListFilter {
    1:optional ExportTaskType taskType
    2:optional string id
    3:optional i64 createdAtFrom
    4:optional i64 createdAtTo
}

struct UserExportTaskListResult {
    1:required i32 total
    2:required list<ExportTask> tasks
}

struct ERPExportTaskListResult {
    1:required i32 total
    2:required list<ExportTask> tasks
}

struct AdminExportTaskListFilter {
    1:optional ExportTaskType taskType
    2:optional string id
}

struct AdminExportTaskListResult {
    1:required i32 total
    2:required list<ExportTask> tasks
}
//============================导入任务中心=======================

struct ImportTaskResult {
    1:required string id
    2:required bool isAlreadyExists
    3:required NewImportTaskType taskType
}

enum NewImportTaskType {
	ImportTaskTypeUnknown = 0;

	ImportTaskTypeShopOrderDispatch = 1001;			// 发货
}

struct ImportTaskItemError{
    1:required string global
    2:required list<ImportTaskItemLineError>lines
}

struct ImportTaskItemLineError{
    1:required i32 num
	2:required string object
	3:required string message
}

struct NewImportTask{
    1:required string id                          // 任务 id
    2:required NewImportTaskType taskType         // 任务类型
    3:required ExportTaskStatus status            // 任务状态
    4:required i64 createdAt                      // 创建时间
    5:required string createBy                    // 创建人
    6:required string fileUrl                     // 文件地址
    7:optional ImportTaskItemError error
}


struct UserImportTaskListFilter{
    1:optional NewImportTaskType taskType
    2:optional string id
    3:optional i64 createdAtFrom
    4:optional i64 createdAtTo
}

struct UserImportTaskListResult{
    1:required i32 total
    2:required list<NewImportTask> tasks
}

struct ImportTaskRetry{
    1:required string id
}

struct UserImportTaskRetryResult{
    1:required string id
}

struct UserMirrorProductListResult {
    1:required i32 total
    2:required list<UserMirrorProductSimple> list
}

struct UserImportSubTaskListResult {
    1:required i32 total
    2:required list<ImportSubTask> list
}

// ====单品分析======
struct UserGetProductAnalyticsResult {
    1:required list<UserGetProductAnalyticsItem> items
}

struct UserGetProductAnalyticsItem {
    1:optional UserDailyReportDate date
    2:required i64 AddToCartCount // 加购件数
    3:required i64 FavouriteCount // 收藏人数
    4:required i64 SalesAmount //销售额
    5:required i64 TotalOrderCount // 订单数
    6:required i64 CashoffCount // 满减订单数
    7:required i64 FlashSalesCount // 闪购订单数
    8:required i64 FreeShippingCount // 包邮订单数
    9:required i64 FriendsDealCount // 拼团订单数
    10:required i64 OtherOrdersCount // 其他订单数
}

struct UserGetProductAnalyticsFilter {
   1:required i64 rangeStart
   2:required i64 rangeEnd
   3:required i32 productId
}

struct UserSearchProductAnalyticsFilter {
    1:optional string keyword
    2:optional string url
    3:optional i32 offset
    4:optional i32 limit
}

struct UserSearchProductAnalyticsResult {
    1:optional list<UserSearchProductAnalyticsItem> items
}

struct UserSearchProductAnalyticsItem {
    1:required i32 productId
    2:required string productName
    3:required string imageUrl
}

struct UserOrderListNewFilter {
    1:optional string orderNum
    2:optional i64 paymentTimeStart
    3:optional i64 paymentTimeEnd
    4:optional OrderWarehouse warehouse
    5:optional string productName
    6:optional string productUrl
    7:optional string sellerSkuId
    8:optional i64 deliveryTimeStart
    9:optional i64 deliveryTimeEnd
    10:optional string trackingNum
    12:optional OrderItemTrackStatus orderItemTrackStatus
    13:optional list<string> orderNumList
    14:optional OrderItemSortBy orderItemSortBy
    15:optional i64 billDateStart
    16:optional i64 billDateEnd
    17:optional i64 cancelDateStart
    18:optional i64 cancelDateEnd
}

struct NewOrderListResult {
    1:required map<OrderItemTrackStatus, i64> orderCount
    2:required list<NewOrder> data
}

enum OrderItemTrackStatus {
	Unknown = 0;
	// 对应 (1000, 2000) 的订单类型
	Cancelled = 1000001; // 取消
	Pending = 1003000; // 待发货; 对应 PURCHASING_ORDER;
	Dispatched = 1004000; // 已发货; 对应 PURCHASING_SEND_OUT;
	WarehouseReceived =1006000; // 采购仓库已入库; 对应 PURCHASING_GET;
	PendingDelivery = 1016000; // 待派送; 对应 PENDING_SEND;
    OrderItemTrackStatusDelivered = 1009000;	   // 用户签收; 对应 Delivered
	Completed = 1021000;       // 已完成; 对应 FINISH;

	// 对应 (2000, 3000) 的订单类型
	ReturnPending = 2001000;    // 退件-待发货
	ReturnDispatched = 2002000; // 退件-已发货
	ReturnCompleted = 2011000;  // 退件-已收件
}

enum OrderItemRemarkSource {
	Unknown = 0;
	Customer = 100; // ezbuy 用户
	EzbuyOp = 200;       // ezbuy 运营
	EzSeller = 300;      // 卖家
}

enum OrderItemSortBy {
    Unknown
    PaymentTimeDESC,
    PaymentTimeASC,
    OrderDispatchTimeDESC,
    CancelDateDESC
}

enum Region {
    Unknown = 0;
    CN = 1;
    TW = 2;
    US = 3;
    KR = 4;
    JP = 5;
    SG = 100000000;
    MY = 200000000;
    TH = 300000000;
    ID = 400000000;
    PK = 600000000;
    TWC = 700000000;
}

enum Reason {
    UNKNOWN = 0;
    EZSELLER_OPER_TIMEOUT = 301; // 卖家缺货/虚假或超时发货
	EZSELLER_OPER_MISSING = 302; // 卖家错漏发
	EZSELLER_OPER_BAD_PRODUCT = 303; // 商品破损/质量问题/物流问题-卖家原因
	EZSELLER_OPER_TRANSPORT_MISSING = 304; // 商品残损/丢失-ezbuy 物流/仓库原因
	EZSELLER_OPER_TRANSPORT_OTHER = 305; // 仓配其他售后问题
	EZSELLER_OPER_CUSTOMER = 306; // 顾客原因退单
}

struct NewOrder {
    1:required string productImg
    2:required string orderId
    3:required string orderNum
    4:required string productId
    5:required string sellerSkuId
    6:required string productName
    7:required string skuName
    8:required list<Activity> activity
    9:required double unitPrice
    10:required i64 quantity
    11:required OrderWarehouse warehouse
    12:required OrderItemTrackStatus orderStatus
    13:required i64 expectedDispatchAt
    15:required list<OrderItemRemark> userRemark
    16:required list<OrderItemRemark> sellerRemark
    17:required string orderGroupNum
    18:required i64 createdAt
    19:required i64 billDate
    20:required Region cusRegion
    21:required double paidAmount
    22:required i64 stockInQty
    23:required Reason reason
    24:required i64 trackTime
    25:required i64 ticketId
    26:required i64 cancelDate
}

struct OrderItemRemark{
    1:required string remark
    2:required i64 createdAt
    3:required string userName
    4:required OrderItemRemarkSource source
}

struct AdminTransferAccountChangeListFilter {
    1:required string shopName
    2:required Region region
    3:required TransferAccountChangeStatus status
    4:required string userName
    5:required bool deal
}

struct AdminTransferAccountChangeListResultItem {
    1:required string userName
    2:required string shopName
    3:required Region region
    4:required i64 createdAt
    5:required TransferAccountChangeStatus status
    6:required string id
    7:required i64 updatedAt
}

struct AdminTransferAccountChangeListResult {
    1:required list<AdminTransferAccountChangeListResultItem> results
    2:required i32 total
}

struct AdminTransferAccountChangeInfoResult {
    1:required TransferAccountInfo transferAccount
    2:required TransferAccountInfo changeTransferAccount
    3:required ShopApprovalFormType ShopType
}

struct AdminTransferAccountChangeLogEntry {
    1:required TransferAccountChangeField field
    2:required string valBefore
    3:required string valAfter
}

struct AdminTransferAccountChangeLogItem {
    1:required i64 date
    2:required string userName
    3:required TransferAccountChangeOp op
    4:required list<AdminTransferAccountChangeLogEntry> entries
    5:required string remark
}

struct AdminTransferAccountChangeLogResult {
    1:required list<AdminTransferAccountChangeLogItem> results
    2:required i32 total
}

struct AdminAnnouncementCataItem {
    1:required i32 cId
    2:required string cVal
}

struct AdminAnnouncementCata {
    1:required AdminAnnouncementCataItem pCata
    2:required list<AdminAnnouncementCata> sCatas
}

struct AdminAnnouncementCataListResult {
    1:required list<AdminAnnouncementCata> Catas
}

struct AdminAnnouncementCataGetResult{
    1:required AdminAnnouncementCataItem pCata
    2:required list<AdminAnnouncementCataItem> sCata
}

struct AdminAnnouncementUpdateReq {
    1:required string title
    2:required string content
    3:required i32 catagoryId
    4:required list<string> OriginCodes
    5:required string fileKey
    6:required bool publish
    7:optional i32 announcementId
}

enum AdminAnnouncementOriginType {
    Unknown
    All
    Shop
}

enum AdminAnnouncementOp {
    Unknown
    Save
    Publish
    Delete
}

struct AdminAnnouncementLog {
    1:required AdminAnnouncementOp op
    2:required string accountName
    3:required i64 date
}

struct AdminAnnouncementLogResult {
    1:required list<AdminAnnouncementLog> logs
    2:required i32 total
}

struct AdminAnnouncementShopItem {
    1:required i32 shopId
    2:required string shopName
    3:required string originCode
}

struct AdminAnnouncementShopListFilter {
    1:required string shopName
}

struct AdminAnnouncementShopListResult {
    1:required list<AdminAnnouncementShopItem> shops
    2:required i32 total
}

struct AdminAnnouncementListFilter {
    1:optional i64 publishedAtFrom
    2:optional i64 publishedAtTo
    3:optional string title
    4:optional i32 catagoryId
    5:optional bool published
}

enum AdminAnnouncementStatus {
    Unknown
    Published
    UnPublished
    Deleted
}

struct AdminAnnouncementListItem {
    1:required i64 publishedAt
    2:required i64 createdAt
    3:required string title
    4:required string cataVal
    5:required list<string> originCodes
    6:required i32 announcementId
    7:required AdminAnnouncementStatus status
}

struct AdminAnnouncementListResult {
    1:required list<AdminAnnouncementListItem> announcements
    2:required i32 total
}

struct AdminAnnouncementGetResult {
    1:required string title
    2:required string content
    3:required list<AdminAnnouncementCataItem> catas
    4:required list<string> originCodes
    5:required string fileKey
}

enum ShopMailType {
    Unknown
    SellerSkuStock
    ProductOffSale
    AdminOffSale
    SellerOffSale
    BillApprove
    OrderCancel
}

struct UserShopMailListFilter {
    1:optional i64 createdAtFrom
    2:optional i64 createdAtTo
    3:optional string content
    4:optional bool readStatus
}

struct UserShopMailListItem {
    1:required i32 mailId
    2:required i64 createdAt
    3:required string content
    4:required bool readStatus
    5:required string enContent
}

struct UserShopMailListResult {
    1:required list<UserShopMailListItem> lists
    2:required i32 total
}

struct UserShopMailReadReq {
    1:optional i32 mailId
    2:optional bool allMark
}

struct UserAnnouncementListFilter {
    1:optional i32 catagoryId
    2:optional string title
    3:optional i64 publishedAtFrom
    4:optional i64 publishedAtTo
}

struct UserAnnouncementListItem {
    1:required i32 announcementId
    2:required string title
    3:required string cataVal
    4:required bool readStatus
    5:required i64 publishedAt
}

struct UserAnnouncementListResult {
    1:required list<UserAnnouncementListItem> lists
    2:required i32 total
}

struct UserAnnouncementGetResult {
    1:required i32 announcementId
    2:required string cataVal
    3:required string title
    4:required string content
    5:required i64 publishedAt
}

struct UserAnnouncementReadReq {
    1:optional i32 announcementId
    2:optional bool allMark
}

struct UserAnnAndMailCountResult {
    1:required i32 announcementCount
    2:required i32 mailCount
}

struct UserAnnouncementDetail {
    1:required i32 announcementId
    2:required AnnouncementDetail detail
    3:required bool viewed
    4:required i64 publishedAt
}

struct AccountForgetPasswordUserNameResult {
    1:required bool result
    2:required string token
}


service EzSeller {
    AccountBase AccountSignin(1:string username, 2:string password) throws (1:APIException exception)
    AccountBase AccountRegister(1:string email, 2:string username, 3:string password) throws (1:APIException exception)
    AccountBase AccountResetPassword(1:string token, 2:string newpass) throws (1:APIException exception)
     //  CN 手机注册成功 生成未审核店铺
    AccountBase AccountRegisterByPhone(1:string phone, 2:string username,3:string password, 4:string vericode) throws (1:APIException exception)
    bool AccountCanSigninByPhone(1:string phone) throws (1:APIException exception)
    AccountForgetPasswordUserNameResult AccountForgetPasswordUserName(1:string token, 2:string username, 3:string phone) throws (1:APIException exception)

    bool AccountValidEmail(1:string email) throws (1:APIException exception)
    bool AccountValidUsername(1:string username) throws (1:APIException exception)
    bool AccountValidPassword(1:string password) throws (1:APIException exception)
    LoginFieldCheckResult AccountValidPhone(1:string phone) throws (1:APIException exception)

    AccountForgetPasswordResult AccountForgetPassword(1:string username) throws (1:APIException exception)
    // CN 手机用户忘记密码
    AccountForgetPasswordByPhoneResult AccountForgetPasswordByPhone(1:string phone, 2:string vericode) throws (1:APIException exception)

    bool UserAccountUpdatePassword(1:string oldpass, 2:string newpass) throws (1:APIException exception)

    // CN首页数据
    UserShopIndexDataGet UserShopIndexDataGet() throws (1:APIException exception)
    // CN 获取申请单数据
    ShopApprovalFormGetResult UserShopApprovalFormGet() throws (1:APIException exception)
    // CN 创建/编辑申请单数据
    bool UserShopApprovalPersonalUpsert(1:string shopName, 2:ShopApprovalRequesterInfo requester, 3:ShopApprovalFormPersonal form, 4:string originCode) throws (1:APIException exception)
    bool UserShopApprovalOriganizationUpsert(1:string shopName, 2:ShopApprovalRequesterInfo requester, 3:ShopApprovalFormOrganization form, 4:string originCode) throws (1:APIException exception)
    // 设置审核通过店铺首次登陆状态
    bool UserShopSetEverSignIn() throws (1:APIException exception)
    bool UserShopValidShopName(1:string shopName)
    bool UserShopApprovalPersonal(1:string shopName, 2:ShopApprovalRequesterInfo requester, 3:ShopApprovalFormPersonal form, 4:string originCode) throws (1:APIException exception)
    bool UserShopApprovalOrganization(1:string shopName, 2:ShopApprovalRequesterInfo requester, 3:ShopApprovalFormOrganization form, 4:string originCode) throws (1:APIException exception)
    ActionResult UserShopCreate(1:SellerInfo sellerInfo, 2:ShopApprovalFormOrgInfo bizInfo, 3:ShopApprovalFormBankInfo bankInfo) throws (1:APIException exception)
    list<string> BankListOfOrigin(1:string originCode) throws (1:APIException exception)
    ShopBase UserShopShutDown(1:bool shutDown) throws (1:APIException exception)

    ProductDetail UserProductDetail(1:i32 productId) throws (1:APIException exception)
    ProductDetail UserProductUpdate(1:ProductBase data, 2:list<ProductSku> skus) throws (1:APIException exception)
    ProductDetail UserUnCommitedProductDetail(1:i32 productId) throws (1:APIException exception)
    ProductDetail UserUnCommitedProductUpdate(1:ProductBase data, 2:list<ProductSku> skus) throws (1:APIException exception)
    UserProductListResult UserProductList(1:i32 offset, 2:i32 limit, 3:UserProductListFilter filter) throws (1:APIException exception)
    bool UserProductQuickUpdate(1:list<i32> productId, 2:UserProductQuickChange change) throws (1:APIException exception)
	list<ActionResult> UserProductBatchDelete(1:list<i32> pids) throws (1:APIException exception) // 店铺批量删除商品，pid为卖家端商品id，非gpid
    bool UserImportEzbuyProducts(1:list<string> urls) throws (1:APIException exception)

    bool UserImportTaskAdd(1:list<string> urls, 2:ImportTaskType taskType) throws (1:APIException exception)
    ImportTaskListResult UserImportTaskList(1:i32 offset, 2:i32 limit) throws (1:APIException exception)
    UserImportSubTaskListResult UserImportSubTaskList(1:string taskId, 2:i32 offset, 3:i32 limit, 4:UserImportSubTaskListFilter filter) throws (1:APIException exception)
    ProductDetail UserImportSubTaskProductDetail(1:string subTaskId) throws (1:APIException exception)
    ProductDetail UserImportSubTaskProductUpdate(1:string subTaskId, 2:ProductBase data, 3:list<ProductSku> skus) throws (1:APIException exception)

    ExportFile UserUploadProductsExport(1:i32 categoryId) throws (1:APIException exception) // 下载模板，categoryId为一级类目id
	list<string> UserUploadProducts(1:string fileKey) throws (1:APIException exception) // fileKey为七牛文件地址。返回string，若为空，则表示成功
	ProductsFromSourceResult UserProductsFromSource(1:ProductSource src, 2:bool committed, 3:i32 offset, 4:i32 limit) throws (1:APIException exception)

    // 卖家侧, 订单管理 -> 查看订单
    OrderListResult UserOrderList(1:i32 offset, 2:i32 limit, 3:UserOrderListFilter filter) throws (1:APIException exception)
    list<ProductSimpleInfo> UserGetProductSimpleInfo(1:string productName) throws (1:APIException exception)

    // 卖家侧，订单管理 -> 查看物流详情
    list<OrderTrack> GetUserOrderShipment(1:string orderItemId) throws (1:APIException exception);
    // 卖家侧，订单管理 -> 已到转运仓库 ->追加运单号
    bool AppendUserOrderShipmentNumber(1:string orderItemId, 2:OrderTrack track) throws (1:APIException exception);

    // 卖家侧, 订单查看订单
    NewOrderListResult UserOrderListNew(1:i32 offset, 2:i32 limit, 3:UserOrderListNewFilter filter) throws (1:APIException exception)

    // 卖家侧, 订单管理 -> 查看订单 -> 行 -> 查看详情
    OrderDetail UserOrderDetail(1:string orderNum) throws (1:APIException exception)
    // 卖家侧取消订单, 废弃
    bool UserOrderCancel(1:list<string> orderNums, 2:string remark) throws (1:APIException exception)
    // 卖家侧, item 级别列表, 废弃
    list<OrderItem> UserOrderItemList(1:i32 offset, 2:i32 limit, 3:UserOrderItemListFilter filter) throws (1:APIException exception)
    // 卖家侧, 发货管理 -> 查看待发货/已发货订单
    OrderItemGroupListResult UserOrderItemGroupList(1:i32 offset, 2:i32 limit, 3:UserOrderItemListFilter filter) throws (1:APIException exception)
    // 卖家侧, 发货管理 -> 查看待发货订单 -> 行 -> 发货
    bool UserOrderDispatch(1:string orderNum, 2:OrderTrack track) throws (1:APIException exception)
    bool UserOrderDispatchNew(1:string orderNum, 2:OrderTrack track) throws (1:APIException exception)
    // 卖家侧, 发货管理 -> 查看已发货订单 -> 行 -> 修改运单
    bool UserOrderTrackUpdate(1:string orderNum, 2:OrderTrack track) throws (1:APIException exception)
    bool UserOrderTrackUpdateNew(1:string orderNum, 2:list<OrderTrack> tracks) throws (1:APIException exception)
    // 卖家侧, item 级别发货, 废弃
    bool UserOrderItemDispatch(1:list<i32> orderItemIds, 2:OrderTrack track) throws (1:APIException exception)
    // 卖家侧, item 级别更新物流信息, 废弃
    bool UserOrderItemTrackUpdate(1:list<i32> orderItemIds, 2:OrderTrack track) throws (1:APIException exception)
    // 卖家侧, item 级别 退回件确认, 废弃
    bool UserOrderItemReturnConfirm(1:list<i32> orderItemIds) throws (1:APIException exception)
    // 卖家侧, item 级别 备注添加, 废弃
    bool UserOrderItemRemarkAdd(1:i32 orderItemId, 2:string remark) throws (1:APIException exception)
    // 卖家侧, 订单管理 -> 查看订单 -> 行 -> 添加备注
    bool UserOrderRemarkAdd(1:string orderNum, 2:string remark) throws (1:APIException exception)
    bool UserOrderRemarkAddNew(1:string orderNum, 2:string remark) throws (1:APIException exception)
    // 卖家侧, 运单级别详情列表, 废弃
    list<OrderTrackDetail> UserOrderTrackDetailList(1:i32 offset, 2:i32 limit, 3:OrderTrackDetailListFilter filter) throws (1:APIException exception)
    // 卖家侧, KR/LOCAL 拣货单
    list<PickListItem> UserPickList(1:list<i32> pkgIds) throws (1:APIException exception)
    // 卖家侧, KR/LOCAL 拣货单导出
    ExportFile UserPickListExport(1:list<i32> pkgIds) throws (1:APIException exception)
    // 卖家侧, 缺货登记
    bool UserOrderStockout(1:BaseInfo baseInfo, 2:list<OrderInfo> orderInfos) throws (1: APIException exception)
    bool UserOrderStockoutTmp(1:BaseInfo baseInfo, 2:list<OrderInfo> orderInfos) throws (1: APIException exception)
    // 卖家侧, 缺货已登记...
    list<string> UserOrderHasExisted(1:BaseInfo baseInfo) throws(1:APIException exception)
    list<string> UserOrderHasExistedTmp(1:BaseInfo baseInfo) throws(1:APIException exception)
    // ERP侧, 缺货已登记...
    list<string> ErpUserOrderHasExisted(1:BaseInfo baseInfo) throws(1:APIException exception)

    // Package
    // 卖家侧, KR/LOCAL 包裹列表 KR额外返回运单信息
    PackageListResult UserPackageList(1:ShopPackageListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    // 卖家侧, KR/LOCAL 按包裹发货 KR需填写运单信息
    ActionResult UserPackageDispatch(1:i32 pkgId, 2:PackageTrackInfo trackInfo) throws (1:APIException exception)
    // 卖家侧, KR 修改运单信息
    ActionResult UserAlterPackageTrackInfo(1:i32 pkgId, 2:PackageTrackInfo trackInfo) throws (1:APIException exception)
    // 卖家侧, LOCAL 批量按包裹发货; KR使用导入批量发货
    list<ActionResult> UserBatchPackageDispatch(1:list<i32> pkgIds) throws (1:APIException exception) // 只返回有错误的结果
	list<ShipmentType> UserGetShipmentTypes(1:string catelogCode) throws (1:APIException exception)

    // 卖家侧, 导出发货列表, 被 UserOrderItemGroupExportTask 替代
    ExportFile UserOrderItemGroupExport(1:UserOrderItemListFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)

    // 卖家侧, 导入发货列表, 被 UserOrderDispatchImportTask 替代
    list<OrderDispatchImportResult> UserOrderDispatchImport(1:string fileKey) throws (1:APIException exception)

    AdminShopApprovalFormListResult AdminShopApprovalFormList(1:i32 offset, 2:i32 limit, 3:AdminShopApprovalListFilter filter) throws (1:APIException exception)
    AdminShopApprovalDetail AdminShopApprovalDetail(1:string formId) throws (1:APIException exception)
    bool AdminShopApprove(1:string formId) throws (1:APIException exception)
    bool AdminShopDeny(1:string formId, 2:string remark) throws (1:APIException exception)
    list<AdminShopApprovalOplog> AdminShopApprovalOplog(1:string formId) throws (1:APIException exception)



    list<MirrorProductCandidate> AdminMirrorProductCandidateList(1:MirrorProductCandidateListFilter filter) throws (1:APIException exception)
    bool AdminMirrorProductFetch(1:list<string> urls) throws (1:APIException exception)
    MirrorProductDetail AdminMirrorProductDetail(1:i32 productId) throws (1:APIException exception)
    MirrorProductDetail AdminMirrorProductUpdate(1:ProductBase data, 2:list<MirrorProductSku> skus) throws (1:APIException exception)
    list<MirrorProductSimple> AdminMirrorProductList(1:i32 offset, 2:i32 limit, 3:UserEzChoiseProductListFilter filter) throws (1:APIException exception)
    list<MirrorProductProvider> AdminMirrorProductProviderList(1:i32 productId) throws (1:APIException exception)
    list<MirrorProductOrder> AdminMirrorProductOrderList(1:i32 productId, 2:AdminMirrorProductOrderListFilter filter, 3:AdminMirrorProductOrderListSort sort, 4:i32 offset, 5:i32 limit) throws (1:APIException exception)

    UserMirrorProductListResult UserMirrorProductList(1:i32 offset, 2:i32 limit, 3:UserMirrorProductListFilter filter) throws (1:APIException exception)
    ProductDetail UserMirrorProductLink(1:i32 productId) throws (1:APIException exception)
    bool UserMirrorProductUnLink(1:i32 productId) throws (1:APIException exception)

    ERPBillListResult ERPBillList(1:i32 offset, 2:i32 limit, 3:ERPBillListFilter filter) throws (1:APIException exception)
    ERPBillListNewResult ERPBillListNew(1:i32 offset, 2:i32 limit, 3:ERPBillListFilter filter) throws (1:APIException exception)
    ERPBillDetailResult ERPBillDetail(1:string billNum, 2:ERPBillDetailFilter filter) throws (1:APIException exception)
    ERPBillOrderItemResult ERPBillOrderItemList(1:string billNum, 2:ERPBillOrderItemFilter filter, 3:i32 offset, 4:i32 limit) throws (1:APIException exception)
    ExportFile ERPBillDetailExport(1:string billNum) throws (1:APIException exception)
    ERPTransferListResult ERPTransferList(1:i32 offset, 2:i32 limit, 3:ERPTransferFilter filter) throws (1:APIException exception)
    // 账单审批老接口，废弃
    bool ERPBillApprove(1:string billNum, 2:double amount, 3:string remark) throws (1:APIException exception)
    // 账单处理接口，运营使用，处理申诉订单，后进入待财务确认状态
    bool ERPBillDispose(1:required ERPBillDisposeItem disposeItem) throws (1:APIException exception)
    // 账单批量确认接口，财务使用，处理待财务确认、待审核订单，后进入已审核状态
    bool ERPBillBatchApprove(1:required list<ERPBillApproveItem> approveItems) throws (1:APIException exception)
    // 账单批量标记接口
    bool ERPBillBatchMark(1:required list<string> billNums) throws (1:APIException exception)
    // 转账单审批老接口，废弃
    bool ERPTransferCheck(1:string billNum) throws (1:APIException exception)
    // 转账老接口，废弃
    bool ERPTransferApprove(1:string billNum, 2:TransferInfo transferInfo, 3:string remark) throws (1:APIException exception)
    // 转账单批量审批接口  pending => approved
    bool ERPTransferBatchApprove(1:list<string> billNums) throws (1:APIException exception)
    // 转账单（财务）批量确认接口 确认后，卖家侧状态转账中 approved => transfering
    bool ERPTransferBatchConfirm(1:list<string> billNums) throws (1:APIException exception)
    // 转账单（财务）批量转账接口，转账后，卖家侧状态已转账 transfering => transferred
    bool ERPTransferBatchTransferred(1:list<ERPTransferDoneItem> items) throws (1:APIException exception)
    // 转账单批量标记接口
    bool ERPTransferBatchMark(1:list<string> billNums) throws (1:APIException exception)
    // 根据商家名称模糊查询列表
    ERPShopSearchListResp ERPShopSearchList(1:ERPShopSearchListReq req) throws (1:APIException exception)


    UserBillListResult UserBillList(1:i32 offset, 2:i32 limit, 3:UserBillListFilter filter) throws (1:APIException exception)
    bool UserBillAppeal(1:string billNum, 2:double amount, 3:string remark) throws (1:APIException exception)
    UserTransferAccountInfo UserTransferAccountInfo() throws (1:APIException exception)
    bool UserTransferAccountInfoUpdate(1:string password, 2:TransferAccountInfo info) throws (1:APIException exception)
    bool UserTransferAccountInfoUpdateCancel(1:string password) throws (1:APIException exception)
    bool UserBillTransferAdd(1:string billNum, 2:string accountName) throws (1:APIException exception)
    Transfer UserBillTransferInfo(1:string billNum) throws (1:APIException exception)
    UserBillOrderResult UserBillOrderList(1:string billNum) throws (1:APIException exception)
    UserBillNewOrderItemResult UserBillNewOrderItemList(1:string billNum, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    ExportFile UserBillOrderListExport(1:string billNum) throws (1:APIException exception)
    UserBillOrderItemResult UserBillOrderItemList(1:string billNum) throws (1:APIException exception)
    UserBillProductResult UserBillProductList(1:string billNum) throws (1:APIException exception)
    ExportFile UserBillOrderItemListExport(1:string billNum) throws (1:APIException exception)

    // 公告 & 站内信
    UserShopMailListResult UserShopMailList(1:i32 offset, 2:i32 limit, 3:UserShopMailListFilter filter) throws (1:APIException exception)
    bool UserShopMailRead(1:UserShopMailReadReq req) throws (1:APIException exception)
    UserAnnouncementListResult UserAnnouncementList(1:i32 offset, 2:i32 limit, 3:UserAnnouncementListFilter filter) throws (1:APIException exception)
    UserAnnouncementGetResult UserAnnouncementGet(1:i32 announcementId) throws (1:APIException exception)
    bool UserAnnouncementRead(1:UserAnnouncementReadReq req) throws (1:APIException exception)
    UserAnnAndMailCountResult UserAnnAndMailCount() throws (1:APIException exception)

    // 运营平台相关接口
    AdminOpProductListResult AdminOpProductList(1:i32 offset, 2:i32 limit, 3:AdminOpProductListFilter filter) throws (1:APIException exception)
    list<ProductSkuPrice> AdminOpFetchProductSkuPrice(1:list<i64> productIds) throws (1:APIException exception)
    AdminOpOrderListResult AdminOpOrderList(1:i32 offset, 2:i32 limit, 3:AdminOpOrderListFilter filter) throws (1:APIException exception)
    AdminOpOrderListResultNew AdminOpOrderListNew(1:i32 offset, 2:i32 limit, 3:AdminOpOrderListFilterNew filter) throws (1:APIException exception)
    AdminOpRemarkListResult AdminOpRemarkList(1:i64 orderItemId) throws (1:APIException exception)
    bool AdminOpProductOffSale(1:i32 productId, 2:bool forcedOffSale, 3:string reason) throws (1:APIException exception)
    list<i64> AdminOpProductBatchOffSale(1:list<i64> productIds, 2:bool forcedOffSale) throws (1:APIException exception)
    ProductDetail AdminOpProductDetail(1:i32 productId) throws (1:APIException exception)
    AdminOpProductChangeLogListResult AdminOpProductChangeLogList(1:i32 offset, 2:i32 limit, 3:i32 productId, 4:AdminOpProductChangeLogListFilter filter) throws (1:APIException exception)
    AdminOpProductOperationLogListResult AdminOpProductOperationLogList(1:i32 offset, 2:i32 limit, 3:i32 productId, 4:AdminOpProductOperationLogListFilter filter) throws (1:APIException exception)
    ExportFile AdminOpProductListExport(1:AdminOpProductListFilter filter) throws (1:APIException exception)
    ExportFile AdminOpOrderListExport(1:AdminOpOrderListFilter filter) throws (1:APIException exception)
    ExportTaskResult AdminOpProductListExportTask(1:AdminOpProductListFilter filter) throws (1:APIException exception)
    ExportTaskResult AdminOpOrderListExportTask(1:AdminOpOrderListFilter filter) throws (1:APIException exception)
    ExportTaskResult AdminOpOrderListExportTaskNew(1:AdminOpOrderListFilterNew filter) throws (1:APIException exception)
    AdminExportTaskListResult AdminExportTaskList(1:AdminExportTaskListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    ExportTask AdminExportTask(1:string id) throws (1:APIException exception)
    AdminOpJdBalanceResult AdminOpJdBalance() throws (1:APIException exception)
    AdminTransferAccountChangeListResult AdminTransferAccountChangeList(1:AdminTransferAccountChangeListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    AdminTransferAccountChangeInfoResult AdminTransferAccountChangeInfo(1:string id) throws (1:APIException exception)
    AdminTransferAccountChangeLogResult AdminTransferAccountChangeLog(1:string id, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    bool AdminTransferAccountChangeApproved(1:string id) throws (1:APIException exception)
    bool AdminTransferAccountChangeRejected(1:string id, 2:string rejectedMsg) throws (1:APIException exception)


    // 中转仓
    bool WarehouseUserRegister(1:string username, 2:string password) throws (1:APIException exception)
    bool WarehouseUserLogin(1:string username, 2:string password) throws (1:APIException exception)
    bool WarehouseReceivePackage(1:i32 pkgId) throws (1:APIException exception)
    bool WarehouseBatchReceivePackage(1:list<i32> pkgIds) throws (1:APIException exception)
    bool WarehouseDispatchPackage(1:i32 pkgId, 2:OrderTrack shipperTrack) throws (1:APIException exception)
    bool WarehouseBatchDispatchPackage(1:list<i32> pkgIds, 2:OrderTrack shipperTrack) throws (1:APIException exception)
    WarehousePackageListResult WarehousePackageList(1:WarehousePackageListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    list<Shipper> WarehouseShipperList() throws (1:APIException exception)
    ExportFile WarehouseExportInformationExport(1:list<i32> pkgIds) throws (1:APIException exception)
	list<ShipmentType> WarehouseGetShipmentTypes(1:string catelogCode) throws (1:APIException exception)

    list<string> InvoiceGeneratePackageNumber(1:i32 pkgId, 2:i32 boxCnt, 3:i32 pkgCnt, 4:bool ignoreExists) throws (1:APIException exception)
    Invoice InvoiceGet(1:i32 pkgId) throws (1:APIException exception)

    // 文件导出
    // 1 /ExportFile/Submit
    // 2 /ExportFile/Download

    AdminOpShopListResult AdminOpShopList(1:i32 offset, 2:i32 limit, 3:AdminOpShopListFilter filter, 4:AdminOpShopListSort sort) throws (1:APIException exception)
    AdminOpShopSimple AdminOpShopShutDown(1:i32 shopId, 2:bool shutDown, 3:string remark) throws (1:APIException exception)
    AdminOpShopLogsResult GetAdminOpShopLogs(1:i32 offset, 2:i32 limit, 3:i32 shopId) throws (1:APIException exception)

    AdminOpServiceFeeRateSettings AdminOpServiceFeeRateSettings(1:i64 categoryId) throws (1:APIException exception)
    AdminOpServiceFeeRateSettings AdminOpServiceFeeRateSettingsUpdate(1:i64 categoryId, 2: double exRate, 3:double curRate) throws (1:APIException exception)
    AdminOpServiceFeeRateSettings AdminOpServiceFeeRateShopSettingsUpdate(1:i64 categoryId, 2:list<AdminOpServiceFeeRateShopUpdateItem> updates) throws (1:APIException exception)

    AdminOpServiceFeeRateHistoryResp AdminOpServiceFeeRateHistory(1:i64 offset, 2:i64 limit, 3:i64 started, 4:i64 ended) throws (1:APIException excen)

    // 新增分类
    bool AdminAddAnnouncementCata(1:i32 pCId, 2:string subVal) throws (1:APIException exception)
    // 公告分类列表
    AdminAnnouncementCataListResult AdminAnnouncementCataList() throws (1:APIException exception)
    // 通过上一级id获取下级分类
    AdminAnnouncementCataGetResult AdminAnnouncementCataGet(1:i32 pCId) throws (1:APIException exception)
    // 公告分类删除接口
    bool AdminDelAnnouncementCata(1:i32 cId) throws (1:APIException exception)
    // 公告编辑
    bool AdminAnnouncementUpdate(1:AdminAnnouncementUpdateReq req) throws (1:APIException exception)
    // 公告删除
    bool AdminAnnouncementDelete(1:i32 announcementId) throws (1:APIException exception)
    // 公告发布
    bool AdminAnnouncementPublish(1:i32 announcementId) throws (1:APIException exception)
    // 公告快速修改分类
    bool AdminAnnouncementCataUpdate(1:i32 announcementId, 2:i32 cId) throws (1:APIException exception)
    // 公告操作日志
    AdminAnnouncementLogResult AdminAnnouncementLog(1:i32 offset, 2:i32 limit, 3:i32 announcementId) throws (1:APIException exception)
    // 公告推送店家列表
    AdminAnnouncementShopListResult AdminAnnouncementShopList(1:i32 offset, 2:i32 limit, 3:i32 announcementId, 4:AdminAnnouncementShopListFilter filter) throws (1:APIException exception)
    // 公告推送店家导出接口
    ExportTaskResult AdminAnnouncementShopListExportTask(1:i32 announcementId) throws (1:APIException exception)
    // 公告列表
    AdminAnnouncementListResult AdminAnnouncementList(1:i32 offset, 2:i32 limit, 3:AdminAnnouncementListFilter filter) throws (1:APIException exception)
    // 公告内容获取
    AdminAnnouncementGetResult AdminAnnouncementGet(1:i32 announcementId) throws (1:APIException exception)

    AdminOpAnnouncementListResult AdminOpAnnouncementList(1:i32 offset, 2:i32 limit, 3:AdminOpAnnouncementListFilter filter) throws (1:APIException exception)
    AdminOpAnnouncementDetail AdminOpAnnouncementGet(1:i32 announcementId) throws (1:APIException exception)
    AdminOpAnnouncementDetail AdminOpAnnouncementUpdate(1:i32 announcementId, 2:AnnouncementDetail detail, 3:bool publish) throws (1:APIException exception)
    bool AdminOpAnnouncementDelete(1:i32 announcementId) throws (1:APIException exception)

    i32 UserAnnouncementNonViewedCount() throws (1:APIException exception)

    // Daily Report
    UserDailyReport UserDailyReportGet(1:UserDailyReportFilter filter) throws (1:APIException exception)

    UserShopStatisticsResp UserShopStatistics(1:UserShopStatisticsReq filter) throws (1:APIException exception)

    ExportFile ShopExportSkus(1:UserProductListFilter filter) throws (1:APIException exception)

    // 传入excel文件七牛地址，返回错误信息，若返回为空数组，则代表上传成功
    list<string> ShopBatchUpdateSkus(1:string fileKey) throws (1:APIException exception)

    //////////
    // notifications
    //////////

	map<NotificationChannel, AccountNotificationSetting> AccountNotifications() throws (1:APIException exception)
	bool AccountUpdateNotificationChannel(1:NotificationChannel channel, 2:string value) throws (1:APIException exception)
	bool AccountUpdateNotifications(1:map<NotificationChannel, list<NotificationType>> types) throws (1:APIException exception)
   // “站内信”
   bool SendFromEzseller(1:MsgInstance body) throws (1:APIException exception)
   bool SendFromEzsellerTmp(1:MsgInstance body) throws (1:APIException exception)
   bool SendFromEzbuySupporter(1:MsgInstance body) throws(1:APIException exception)

   MessageResult GetEzsellerNewMessage(1:SessionFilter filter) throws(1:APIException exception)
   MessageResult GetEzsellerNewMessageTmp(1:SessionFilter filter) throws(1:APIException exception)
   MessageResult GetSupporterNewMessage(1:SessionFilter filter) throws(1:APIException exception)

   //聊天记录快照,区别在于erp和ezseller的鉴权方式不同
   ChatlogResp SnapshootOfEzseller(1:string orderNum, 2:MessageType msgType) throws(1:APIException exception)
   ChatlogResp SnapshootOfEzsellerTmp(1:string orderNum, 2:MessageType msgType) throws(1:APIException exception)
   ChatlogResp SnapshootOfSupporter(1:string orderNum, 2:MessageType msgType) throws(1:APIException exception)
   SellerFeedbackResp SellerFeedback(1:i32 offset, 2:i32 limit, 3:SellerFeedbackFilter filter) throws(1:APIException exception)
   bool BatchHandleIssueOrder(1:required list<CompletedSession> info) throws(1:APIException exception)

	// 新导出接口
	ExportTaskResult UserOrderItemGroupExportTask(1:UserOrderItemListFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)
	ExportTaskResult UserOrderListExportTask(1:UserOrderListFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)
	ExportTaskResult UserBillOrderItemExportTask(1:string billNum) throws (1:APIException exception)
    ExportTaskResult UserBillProductExportTask(1:string billNum) throws (1:APIException exception)
	ExportTaskResult UserBillOrderExportTask(1:string billNum) throws (1:APIException exception)
    ExportTaskResult UserBillNewOrderItemExportTask(1:string billNum) throws (1:APIException exception)
	ExportTaskResult UserPackingListExportTask(1:UserPackingListFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)
    ExportTaskResult UserProductAnalyticsReportExportTask(1:UserGetProductAnalyticsFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)
    ExportTaskResult UserOrderItemGroupNewExportTask(1:UserOrderListNewFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)
    ExportTaskResult UserOrderListNewExportTask(1:UserOrderListNewFilter filter, 2:ExportFileLanguage language) throws (1:APIException exception)

	// 导入导出任务中心
	ExportTask UserExportTask(1:string id) throws (1:APIException exception)
	UserExportTaskListResult UserExportTaskList(1:UserExportTaskListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    //导入任务中心
    UserImportTaskListResult UserNewImportTaskList(1:UserImportTaskListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)
    UserImportTaskRetryResult UserImportTaskRetry(1:ImportTaskRetry task) throws (1:APIException exception)

    //新导入接口
    ImportTaskResult UserOrderDispatchImportTask(1:string fileKey) throws (1:APIException exception)
    // KR 填写运单并发货 导入任务
    ImportTaskResult UserPackageTrackInfoDispatchImportTask(1:string fileKey) throws (1:APIException exception)
    ImportTaskResult AdminOpRecommendProductImportTask(1:string fileKey) throws (1:APIException exception)



    // ERP 任务列表
    ExportTask ERPExportTask(1:string id) throws (1:APIException exception)
    ERPExportTaskListResult ERPExportTaskList(1:ERPExportTaskListFilter filter, 2:i32 offset, 3:i32 limit) throws (1:APIException exception)

    // ERP 导出任务
    ExportTaskResult ERPBatchBillExportTask(1:list<string> billNums, 2:string fileName) throws (1:APIException exception)
    ExportTaskResult ERPTransferCardInfoExportTask(1:list<string> billNums) throws (1:APIException exception)
    // 单品分析接口
    UserGetProductAnalyticsResult UserGetProductAnalytics(1:UserGetProductAnalyticsFilter filter) throws (1:APIException exception)

    // 单品分析搜索接口
    UserSearchProductAnalyticsResult UserSearchProductAnalytics(1:UserSearchProductAnalyticsFilter filter) throws (1:APIException exception)
    ImportTaskResult UserOrderDispatchNewImportTask(1:string fileKey) throws (1:APIException exception)
}
