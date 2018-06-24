namespace * Prepay
namespace java com.daigou.sg.rpc.prepay
namespace swift TR
namespace go ezbuy.apidoc.prepay

include 'Common.thrift'

struct TDealHistory {             // 提现/转账/充值记录
    1:required string id;         // 交易ID
    2:required i64 date;          // 日期, Unix 时间戳
    3:required double number;     // 金额
    4:optional TStatus status;    // 状态,只有 TopUp 和 Withdraw 才有
}

enum TStatus {                    // 状态
    Cancel = 0                    // 已取消
    Pending = 1                   // 正在处理
    Comfirmed = 2                 // 处理完成
    Reject = 3                    // 被拒绝
}

service UserPrepay {

    list<TDealHistory> UserGetTopUpHistory(1:i32 limit, 2:i32 offset),      // 获取该用户充值历史

    list<TDealHistory> UserGetTransationHistory(1:i32 limit, 2:i32 offset), // 获取用户转账历史

    list<TDealHistory> UserGetWithdrawHistory(1:i32 limit, 2:i32 offset)    // 获取用户提现历史

    Common.TCommonResult UserCancelWithdraw(1:string id),                   // Pending状态可以撤销提现请求
 }
