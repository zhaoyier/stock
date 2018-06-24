namespace go ezbuy.apidoc.gen.CastleBlack
namespace webapi api.castleblack

# Update 2016.04.27
#   1.  增加 ProductListResult, OrderListResult, ImportTaskListResult 用于分页
#   2.  修改 ProductList, ProductListPublic, OrderList, ImportTaskList 的返回值类型

# Update 2016.04.25
#   1.  ProductBase 增加 url 用于公开接口展示
#   2.  增加方法 ProductListPublic

# Update 2016.04.22
#   1.  移除 Product, ProductSimple
#   2.  增加 ProductBase, ProductDetail, ProductSku
#   3.  修改方法 ProductList ProductAdd ProductUpdate ProductGet 的参数和返回
#   4.  增加方法 ProductSkuAdd ProductSkuUpdate ProductSkuRemove

const string ImportTaskTypeProduct = "Product";
const string ImportTaskTypeShop = "Shop";

const string ImportTaskStatePending = "Pending"
const string ImportTaskStateFinished = "Finished"

const i32 ProductShipmentNormal = 1
const i32 ProductShipmentSensitive = 2

const string OrderStatePayConfirmed = "PayConfirmed"
const string OrderStateCancelled = "Cancelled"
const string OrderStateDispatched = "Dispatched"
const string OrderStateArrived = "Arrived"

struct ListQuery {
    1:required i32 offset // 偏移量
    2:required i32 limit // 返回的数据量
    3:required list<string> sort // 排序方式 , CreatedAt -CreatedAt,
    4:optional string keyword; // 搜索关键字
}

struct Seller {
    1:required i32 sellerId
    2:required string name
    3:required string shopName
    4:required string cookie
    5:required bool logged
}

struct ProductListFilter {
    1:optional i32 sellerId
    2:optional i64 categoryId
    3:optional string saleRegion
}

struct ProductSimple {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:required string primaryImage
    5:required bool isOnSale
    6:required string url
    7:required double price
    8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
}

struct ProductBase {
    1:required i32 pid
    2:required i64 categoryId
    3:required string name
    4:optional string description
    5:required string primaryImage
    6:optional list<string> images
    7:required bool isOnSale
    8:required list<string> saleRegion # 销售区域
    9:required string originCode # 跟货币价格计算有关
    10:required double price
    11:required double weight
    12:required i32 shipmentInfo
    13:required map<string, string> attributes
    14:optional i32 quantity
}

struct ProductDetail {
    1:required ProductBase base
    2:required list<ProductSku> skus
}

struct ProductSku {
    1:required string skuId
    2:required string name
    3:optional list<string> images
    4:required bool isOnSale
    5:required map<string, string> attributes
    6:required double price
    7:required double weight
    8:required i32 shipmentInfo
    9:required i32 quantity
}

struct ImportTask {
    1:required string id
    2:required string type
    3:required string url
    4:required string state
    5:required string remark
    6:required i32 totalCount
    7:required i32 fetchedCount
    8:required i32 failedCount
    9:required i64 createdAt
    10:required i64 updatedAt
}

struct OrderFilter {
    1:required string state
    2:required i64 startAt // 时间戳, 单位秒
    3:required i64 endAt // 时间戳, 单位秒
}

struct OrderPurchase {
    1:required i32 productId
    2:required string name
    3:required map<string, string> propertyValues
    4:required i32 quantity
    5:required string remark
}

struct OrderDelivery {
    1:required string provider
    2:required string sn
}

struct Order {
    1:required i32 orderId
    2:required OrderPurchase purchase
    3:required OrderDelivery delivery
    4:required string address
    5:required i64 createdAt
    6:required i64 updatedAt
    7:required string state
    8:required string remark
}

// 各个 List 接口的输出结构
struct ProductListResult {
    1:required i32 total
    2:required list<ProductSimple> data
}

struct OrderListResult {
    1:required i32 total
    2:required list<Order> data
}

struct ImportTaskListResult {
    1:required i32 total
    2:required list<ImportTask> data
}

service CastleBlack {
    /// <summary>
    /// 卖家登录
    /// </summary>
    /// <param name="username">登录用户名</param>
    /// <param name="password">登录密码</param>
    /// <returns>登录结果信息</returns>
    Seller SellerLogin(1:string username, 2:string password)

    /// <summary>
    /// 卖家登录
    /// </summary>
    /// <param name="sellerId">卖家 id, 前端可忽略</param>
    /// <param name="old">旧密码</param>
    /// <param name="new">新密码</param>
    /// <returns>修改是否成功</returns>
    bool SellerUpdatePassword(1:i32 sellerId, 2:string oldpw, 3:string newpw)

    /// <summary>
    /// 获取商品列表
    /// </summary>
    /// <param name="listQuery">列表请求参数</param>
    /// <returns>商品列表</returns>
    ProductListResult ProductList(1:i32 sellerId, 2:ListQuery listQuery)

    /// <summary>
    /// 获取商品列表公共接口
    /// </summary>
    /// <param name="listQuery">列表请求参数</param>
    /// <returns>商品列表</returns>
    ProductListResult ProductListPublic(1:ListQuery listQuery, 2:ProductListFilter filter, 3:string originCode)

    /// <summary>
    /// 发布商品
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="data">商品数据</param>
    /// <returns>商品数据</returns>
    ProductDetail ProductAdd(1:i32 sellerId, 2:ProductBase data, 3:list<ProductSku> skus)

    /// <summary>
    /// 获取商品数据
    /// </summary>
    /// <param name="pid">商品id</param>
    /// <returns>商品数据</returns>
    ProductDetail ProductGet(1:i32 pid)

    /// <summary>
    /// 更新商品数据
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="data">商品数据</param>
    /// <returns>商品数据</returns>
    ProductDetail ProductUpdate(1:i32 sellerId, 2:ProductBase data, 3:list<ProductSku> skus)

    /// 废弃
    /// <summary>
    /// 添加商品 Sku
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="productId">商品 id</param>
    /// <param name="data">sku 数据</param>
    /// <returns>商品 Sku 数据</returns>
    ProductSku ProductSkuAdd(1:i32 sellerId, 2:i32 productId, 3:ProductSku data)

    /// 废弃
    /// <summary>
    /// 添加商品 Sku
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="productId">商品 id</param>
    /// <param name="data">要批量增加的 sku 数据</param>
    /// <returns>商品 Sku 数据</returns>
    list<ProductSku> ProductSkuAddMulti(1:i32 sellerId, 2:i32 productId, 3:list<ProductSku> data)

    /// 废弃
    /// <summary>
    /// 更新商品 Sku 数据
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="productId">商品 id</param>
    /// <param name="data">sku 数据</param>
    /// <returns>商品 Sku 数据</returns>
    ProductSku ProductSkuUpdate(1:i32 sellerId, 2:i32 productId, 3:ProductSku data)

    /// 废弃
    /// <summary>
    /// 更新商品 Sku 数据
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="productId">商品 id</param>
    /// <param name="data">sku 数据</param>
    /// <returns>商品 Sku 数据</returns>
    list<ProductSku> ProductSkuUpdateMulti(1:i32 sellerId, 2:i32 productId, 3:list<ProductSku> data)

    /// <summary>
    /// 移除商品 Sku 数据
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="productId">商品 id</param>
    /// <param name="skuId">sku id</param>
    /// <returns>移除成功与否</returns>
    bool ProductSkuRemove(1:i32 sellerId, 2:i32 productId, 3:string skuId)

    /// <summary>
    /// 列出数据导入任务
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="listQuery">列表请求参数</param>
    /// <returns>导入任务列表</returns>
    ImportTaskListResult ImportTaskList(1:i32 sellerId, 2:ListQuery listQuery)

    /// <summary>
    /// 添加数据导入任务
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="taskType">导入类型</param>
    /// <param name="url">导入 url</param>
    /// <returns>导入任务数据</returns>
    ImportTask ImportTaskAdd(1:i32 sellerId, 2:string taskType, 3:string url)

    /// <summary>
    /// 列出订单
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="listQuery">列表请求参数</param>
    /// <param name="filter">订单过滤参数</param>
    /// <returns>订单列表</returns>
    OrderListResult OrderList(1:i32 sellerId, 2:ListQuery listQuery, 3:OrderFilter filter)

    /// <summary>
    /// 关闭订单
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="orderId">订单 id</param>
    /// <param name="remark">备注</param>
    /// <returns>订单数据</returns>
    Order OrderClose(1:i32 sellerId, 2:i32 orderId, 3:string remark)

    /// <summary>
    /// 更新订单快递信息
    /// </summary>
    /// <param name="sellerId">卖家  id, 前端可以忽略</param>
    /// <param name="orderId">订单 id</param>
    /// <param name=" delivery">快递信息</param>
    /// <returns>订单数据</returns>
    Order OrderDeliveryUpdate(1:i32 sellerId, 2:i32 orderId, 3:OrderDelivery delivery)
}
