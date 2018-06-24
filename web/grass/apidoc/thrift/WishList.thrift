namespace go ezbuy.apidoc.gen.WishList

struct SubmitReply{
    1: required i32 code;
    2: required string msg;
}

struct TremConditionReturn{
    1: required list<string> termConditions;
    2: required string specialLink;
}

struct WishPrimeProduct{
    1: required string name;
    2: required string userId;
    3: required string url;
    4: required string picture;
    5: required double price;
    6: required i32 status;
    7: required double originPrice;
    8: required i32 discount;
}

struct WishPrimeProductPage{
    1: required i32 total;
    2: required list<WishPrimeProduct> products;
}

struct ActicityDetail{
    1: required list<string> termConditions;
    2: required string specialLink;
    3: required string description;
    4: required string banner;
    5: required string bannerMobile;
    6: required string name;
}

struct VerifyReply{
    1: required i32 code;
    2: required bool canAddCart;
    3: required bool canCheckout;
    4: required string msg;
}

struct RestCommitReply{
    1: required i32 restCommit;
    2: required i32 totalCommit;
}

service WishList{

    //提交prime商品
    //code: 
    // 0: ok
    // -1001: Server busy, please try again later
    // -2001:no activity
    // -2002: You have reached max submission quota for this event.
    // -2003: Please enter a valid Taobao/Tmall URL.
    // -2004: This is already a Prime eligible product
    // -2005: already submit this product
    // -2006: buy yearly prime
    // -2007: This item has been submitted by others and is pending to approve. Notify me once it's approved?
    // -2008: This item is not eligible for Prime.
    SubmitReply SubmitPrimeUrl(1:string url),

    //订阅商品  url: 商品链接   没有cookie不能订阅
    bool SubscribeProduct(1:string url),

    //查看剩余提交次数
    RestCommitReply GetSubmitLeftCount(),

    //查看当前审核状态
    list<WishPrimeProduct> GetWishPrimeProducts(),

    //查看所有的提交prime
    //refreshTime  当前页面的刷新时间（10位时间戳格式）
    WishPrimeProductPage ListAllAddPrimeProductsNew(1:i32 limit, 2:i32 offset, 3:i64 refreshTime),

    //查看所有的提交prime
    WishPrimeProductPage ListAllAddPrimeProducts(1:i32 limit, 2:i32 offset)

    //查看当前商品的状态
    VerifyReply VerifyPrimeProducts(1:string refId)

    //string
    ActicityDetail ActicityDetail()

    TremConditionReturn TremConditionString()

}
