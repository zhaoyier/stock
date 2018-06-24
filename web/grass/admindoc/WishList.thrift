namespace go ezbuy.apidoc.gen.WishList

struct SubmitReply{
    1: required i32 code;
    2: required string msg;
}

struct WishPrimeProduct{
    1: required string name;
    2: required string userId;
    3: required string url;
    4: required string picture;
    5: required double price;
    6: required i32 status;
}

struct WishPrimeProductPage{
    1: required i32 total;
    2: required list<WishPrimeProduct> products;
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
    // -1001: server error
    // -2001:no activity
    // -2002: no commit any more
    // -2003: not from taobao or tmall
    // -2004: already is prime product
    // -2005: already submit this product
    SubmitReply SubmitPrimeUrl(1:string url),

    //查看剩余提交次数
    RestCommitReply GetSubmitLeftCount(),

    //查看当前审核状态
    list<WishPrimeProduct> GetWishPrimeProducts(),

    //查看所有的提交prime
    WishPrimeProductPage ListAllAddPrimeProducts(1:i32 limit, 2:i32 offset)

    //查看当前商品的状态
    VerifyReply VerifyPrimeProducts(1:string refId)

}
