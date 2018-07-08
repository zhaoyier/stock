package utils

const (
	// <<<< 错误码号段 <<<<
	// 6000~8999 逻辑层（web 后端） 错误码号段
	// 1000～5999 && 9000～9999 服务层（server 后端） 错误码号段
	// >>>> 错误码号段 >>>>

	// <<<< 兴化预热红包 <<<<
	// GotThisRedPacketBefore = "6000"
	// >>>> 兴化预热红包 >>>>

	// <<<< Web 后端各模块通用错误码 <<<<
	// Web 后端各模块 公共服务 公用错误码
	Success           = "0000"
	LoginTimeout      = "300"
	Failed            = "7999"
	Timeout           = "7998" // '超时‘
	Exception         = "7997" // '异常‘
	ParamInvalid      = "7996" // ’验签失败‘
	SignInvalid       = "7995" // '报文验签未通过'
	BankCardInvalid   = "7994" // '销户提醒'
	MobileInvalid     = "7993" // '绑定手机号'
	VipRenewalInvalid = "7992" // 'VIP资格超10年期限'
	UserInvalid       = "7991" // '用户不存在'

	SmsCodeInvalid      = "7989" // '短信验证码验证失败'
	BankCardSignInvalid = "7988" // '银行签约四要数验证失败'
	SignCountLimmit     = "7987" // '达到银行签约失败验证次数'

	PermissionDenied = "7798" // 权限不足

	// product / presell
	CouldNotDeliver = "7970" // 订单不能配送

	//跳转请求
	Forward  = "6301"
	Relocate = "6302"

	//seckill
	BuyLimitExceed = "6700"
	VIPSeckill     = "6710"
	ExperienceVIP  = "6720"

	//thrift
	TSuccess   = "0000"
	TTimeout   = "7000"
	TException = "7001"
	// >>>> 公共服务 通用错误码 >>>>
)

//Context中存储的由框架填充的字段key
const (
	HeaderReferer     = "referer"
	ClientIDKey       = "clientID"
	MemberCodeKey     = "memberCode"
	OpenIDKey         = "openID"
	SourcePlatformKey = "sourcePlatform"
	ResponseKey       = "resp"
	UserIDKey         = "uid"
)

//custom http status
const (
	StatusBizErr = 608
)

// check request from where
const (
	ReqFromKey     = "reqFrom"
	ReqFromAPP     = "appBoutique"
	ReqFromCbankWX = "cbankWXBoutique"
	ReqFromPC      = "pcBoutique"
)

//Platform
const (
	PlatformAPP    = "1"
	PlatformWechat = "2"
	PlatformPC     = "3"
)

//Business
const (
	BusinessBoutique = "2"
)

//Product Type
const (
	//商品
	ProductTypeNormal        = 1
	ProductTypePresell       = 2
	ProductTypeSeckill       = 3
	ProductTypePointExchange = 4

	//VIP资格
	ProductTypeVIP = 100

	//虚拟业务
	ProductTypePhoneCharge = 200
)

//监控常量
const (
	//异常监控点
	MonitorPreSellEList       = "b574" //有效预售列表
	MonitorPreSellEExpired    = "b001" //过期预售商品列表
	MonitorPreSellEByDate     = "b576" //根据时间查询预售信息
	MonitorPreSellEPreOrder   = "b580" //预售预下单
	MonitorPreSellEDetail     = "b578" //预售商品详情
	MonitorPreSellEConfirm    = "b581" //预售确认订单
	MonitorPreSellECreate     = "b700" //预售创建订单
	MonitorPreSellNowCostTime = "b816" //查询当前预售期耗时
	MonitorPreSellNowError    = "b817" //查询当前预售期出错

	MonitorOrdinaryEConfirm     = "b808" //普通商品立即购买确认订单
	MonitorOrdinaryECartConfirm = "b809" //普通商品购物车确认订单
	MonitorOrdinaryECreate      = "b810" //普通商品创建订单
	MonitorMyOrderECancel       = "b811" //我的订单取消订单
	MonitorMyOrderEConfirm      = "b812" //我的订单确认收货
	MonitorMyOrderELogistics    = "b813" //我的订单查看物流
	MonitorMyOrderEDetail       = "b814" //我的订单查看订单详情
	MonitorMyOrderEOrderList    = "b815" //我的订单查看订单列表

	//耗时监控
	MonitorPreSellTList     = "b573" //有效期预售列表耗时
	MonitorPreSellTExpired  = "b001" //过期预售商品列表
	MonitorPreSellTByDate   = "b575" //根据时间查询预售信息
	MonitorPreSellTPreOrder = "b579" //预售预下单
	MonitorPreSellTDetail   = "b577" //预售商品详情
	MonitorPreSellTConfirm  = "b001" //预售确认订单
	MonitorPreSellTCreate   = "b698" //预售创建订单

	MonitorOrdinaryTConfirm     = "b001" //普通商品立即购买确认订单
	MonitorOrdinaryTCartConfirm = "b001" //普通商品购物车确认订单
	MonitorOrdinaryTCreate      = "b001" //普通商品创建订单
	MonitorMyOrderTCancel       = "b001" //我的订单取消订单
	MonitorMyOrderTConfirm      = "b001" //我的订单确认收货
	MonitorMyOrderTLogistics    = "b001" //我的订单查看物流
	MonitorMyOrderTDetail       = "b001" //我的订单查看订单详情
	MonitorMyOrderTOrderList    = "b001" //我的订单查看订单列表
)

var ShippingExceptionStatus = map[int32]string{
	101: "发货延误",
	102: "揽收延误",
	103: "物流异常",
}

var LogisticsStatus = map[string]string{
	"0": "在途中",
	"1": "已揽收",
	"2": "疑难件",
	"3": "已签收",
	"4": "拒收",
	"5": "同城派送中",
	"6": "拒收",
	"7": "转单",
}

var MyOrderLogisticsStatus = map[string]string{
	"0": "在途中",
	"1": "已揽收",
	"2": "疑难件",
	"3": "已签收",
	"4": "退（拒）签",
	"5": "同城派送中",
	"6": "退回",
	"7": "转单",
}

var ConfirmStatus = map[string]string{
	"200": "准备发货",
	"201": "已发货",
	"202": "出库中",
	"203": "用户确认收货",
	"204": "系统自动收货",
	"205": "已自提",
	"206": "取消发货",
	"207": "暂不发货",
}
