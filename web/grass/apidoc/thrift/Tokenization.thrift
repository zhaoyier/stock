namespace go  ezbuy.apidoc.gen.tokenization
namespace java com.daigou.sg.webapi.tokenization
namespace swift TR

include "Common.thrift"

// 信用卡信息描述
struct TCardTokenDesc {
    1: required string cardToken               // 信用卡 token，也就是创建source时候返回的ID,用于后续使用 (创建3dsource)
    2: required string cardIIN		        // 卡的前6位，用于标识发卡机构
    3: required string cardLast4	     // 卡的后4位
    4: required i32 expireYear 			// 卡的过期时间
    5: required i32 expireMonth
    6: required string brand		    // 发卡机构, 服务器返回时会替换成  icon url
    7: required bool threeDSecure           // 是否支持 3d secure
    8: required string cardFinger           // 信用卡指纹，用来标识唯一一张信用卡
    9: optional i64 fee			   // 信用卡的手续费,作为传入参数时候可置为空
}

// 用于保存token的必要用户信息
struct TWalletCardInfo {
    1: required TCardTokenDesc  cardToken
    2: required i32 payType

    3: optional string addressCity
    4: optional string addressCountry
    5: optional string addressLine1
    6: optional string addressLine2
    7: optional string addressState
    8: optional string addressZip
}

// 支付类型
enum TPaymentMethodType {
	CreditCard = 0 // Stripe
	IBanking = 1
	EBanking = 2
	ATM = 3
	Doku = 4
	Amex = 5
	TwoCTwoP = 6
	Line = 7
    //  ApplePay = 8
    //  AndroidPay = 9
    //......V2 接口启用下面3个新枚举
    OsPay  = 8      // androidPay|applePay
    RDP = 10
    Bank = 11 // 2017/07/24 新加坡合并i banking和 ATM
    Stripe = 12 // V2接口弃用 CreditCard 枚举
    OneTwoThree = 13    
    BluePay = 14    
    Jazz = 15
}

struct TPaymentMethod {
    1: required i32 payType // 值解释: 4 strip 13 RDP // 前端 strip 和 RDP 银行卡合并显示
    2: required string name
    3: required string stub         // 随机字段，用于防止重复提交
    4: required list<string> icon
    5: required TPaymentMethodType methodType
    6: optional list<TCardTokenDesc> cardList             // 用户已经保存的信用卡列表
    7: optional string desc; // 支付方式说明
    8: optional i32 feeRateMilli; // 支付手续费率，千分数
    9: optional bool isDefault;   // 默认支付方式
}

struct TCardTokenDescResp {
    1: required Common.TCommonResult result	 		// 操作状态
    2: required TCardTokenDesc tokenDesc		// 卡信息
}

struct TWalletPayFee {
    1: required Common.TCommonResult result
    2: required i64 payFee
}

struct TWalletBank {
    1: required string code
    2: required string name
    3: required string account
    4: required string link
    5: required string desc
    6: optional TWalletBankStatus status
    7: required string icon
    8: required string note // 文案
}

enum TWalletBankStatus {
    Unavailable = 1
    Recommended = 2
}

struct TWalletBankListResp {
    1: required Common.TCommonResult result
    2: required list<TWalletBank>  banks
}

service PaymentTokenization {

    list<TPaymentMethod> UserGetPaymentMethodList(1: required list<i64> billID, 2: required i64 billAmount)   // 传入账单ID， 返回所有支付方式,以及信用卡信息,确保该请求的cookie中包含customerId
    TCardTokenDescResp UserSaveCardSource(1:required TWalletCardInfo info) // 保存card source 信息
    TWalletPayFee  CaculatePayFee(1: required list<i64> billID, 2: required i64 billAmount, 3: required i32 payType)  //传入payType(TPaymentMethod中的payType)和amount 计算fee
    Common.TCommonResult UserDeleteCardSource(1:required i32 payType, 2: required string cardToken)     //  删除保存的卡片
    TWalletBankListResp UserGetBankList()   // 获取银行信息, sg需要有65_customer的cookie来获取custoemrid
    list<TPaymentMethod> UserGetPaymentMethodListV2(1: required list<i64> billID, 2: required i64 billAmount)   // 传入账单ID， 返回所有支付方式,以及信用卡信息,确保该请求的cookie中包含customerId
    TWalletBankListResp UserGetBankListV2()   // 获取银行信息, sg需要有65_customer的cookie来获取custoemrid
}


