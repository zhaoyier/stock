namespace go trpc
namespace swift TR
namespace java com.daigou.sg.webapi.spm

enum TProductDeatilType {
    Noraml = 1
    Flash = 2
    FriendsDealEvent = 3
    FriendsDealGroup = 4
}

struct TBrowseEvent {
    1: required string spm
    2: required string url
}

struct TBrowseProductDetailEvent {
    1: required string spm
    2: required i64 gpid
    3: optional string productUrl
    4: required TProductDeatilType productType
}

struct TCheckoutEvent {
    1: required string spm
    2: required i64 gpid

}

struct TSearchEvent {
    1: required string spm
    2: required string keyword
}

service SPM {

    // 记录用户浏览的webview的行为
    Common.TResult UserLogBrowseWebEvent(1: required TBrowseEvent browseEvent),
    // 记录用户浏览商品详情页的行为
    Common.TResult UserLogBrowseProductDetailEvent(1: required TBrowseProductDetailEvent browseProductEvent),
    // 记录用户checkout的行为
    Common.TResult UserLogCheckoutEvent(1: required TCheckoutEvent checkoutEvent),
    // 记录用户Search的行为
    Common.TResult UserLogSearchEvent(1: required TSearchEvent searchEvent),
 
}
