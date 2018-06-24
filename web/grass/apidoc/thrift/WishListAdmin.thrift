namespace go ezbuy.apidoc.gen.WishListAdmin

struct Activity{
    1: optional string id; //
    2: required string name; //活动名
    3: required i32 commitCount;  //活动期间最多的提交数
    4: required string startTime;   //活动开始时间，cimmotcount自动设置为当前的commitcount
    5: required string expireTime;  //结束时间  结束时间清除cimmitCount
    6: required string countryCode;
    7: required i32 monthlyPrimeCommitCount;
    8: required i32 yearlyPrimeCommitCount;
    9: required string spcialLink;
    10: required list<string> termConditions;
    11: required string description;
    12: required string banner;
    13: required string bannerMobile;
}

struct ActivityCondition{
    1: required bool isSetTimeAddCart;  //是否设置定时才能加入购物车
    2: optional string addCartTime; //加入购物车的时间
    3: required bool isSetTimeCheckout; // 是否设置时间才能结账 isSetTimeAddCart、isSetTimeCheckout最多只能设置一个为true
    4: optional string checkoutTime; //结账时间
    5: required string countryCode;
}

struct PrimeProduct{
    1: required string id;  //商品数据库的id  用作唯一标识
    2: required string refId;
    3: required string userId;  //用户id
    4: required string name;   //商品名称
    5: required string picture;  //商品图片
    6: required i64 cid;    //淘宝id
    7: required double price;  //价格
    8: required string url;    //淘宝链接
    9: required i32 primeShipment;  //运输方式
    10: required i32 status;   //状态 0: 未配置  1: approved   2: reject
    11: required string submitTime;
    12: required string checkTime;
    13: required string activityId; //活动id
    14: required bool isActivityCid;
}

struct PrimeProductPage{
    1: required i32 total;
    2: required list<PrimeProduct> products;
}

struct Reply{
    1: required i32 code;
    2: required string msg;
}

struct ActivityPage{
    1: required i32 total;
    2: required list<Activity> activitys;
}

struct CheckProduct{
    1: required string productId;
    2: required i32 status;
    3: required i32 primeShipment;
}

service WishListAdmin{

    Reply ActivityConditionConfig(1:ActivityCondition activityCondition),

    ActivityCondition GetActivityCondition(1:string countryCode),

    //配置活动
    Reply ActivityCinfig(1:Activity activity),

    //code
    // 0: ok
    // -1001:删除失败
    // -2001:没有这个活动
    // －2002: 活动正在进行中
    Reply RemoveActivity(1:string activityId),

    ActivityPage ListActivityPage(1:i32 limit, 2:i32 offset, 3:string countryCode),

    Activity GetActivityDetail(1:string activityId),



    /**
    * 审核一个商品
    * code : -1:审核错误  -2:商品cid不允许通过 0:ok
    * productId 商品唯一标识
    * status   审核状态  0: 待审核 1: approved  2:reject
    * primeShipment 0:未知运输方式 1:空运  2:海运
    */
    Reply CheckPrimeProduct(1:string productId, 2:i32 status, 3:i32 primeShipment),


    /**
    * 批量审核商品
    * -1:审核错误  -2:商品cid不允许通过 0:ok
    * productIds 商品唯一标识集合
    * status   审核状态    0: 待审核 1: approved  2:reject
    * primeShipment  1:空运  2:海运
    */
    Reply BulkCheckoutPrimeProduct(1:list<string> productIds, 2:i32 status, 3:i32 primeShipment),

    /**
    * 批量审核商品
    * -1:审核错误  -2:商品cid不允许通过 0:ok
    * products 需要审核的商品集合
    */
    Reply BulkCheckoutSinglePrimeProduct(1:list<CheckProduct> products ),


    /**
    * 查询商品
    * userId 用户id
    * url   商品链接
    * status  0: 待审核 1: approved  2:reject 3: all
    * activityId "":查询所有的活动的数据
    * 根据activity查询的参数：userId,url,status,activityId,limit,offset
    * 查询所有的数据 startTime,endtime countrycode  
    */
    PrimeProductPage ListPrimeProduct(1:string userId, 2:string url, 3:string productName, 4:i32 status, 5:string activityId, 6:string startTime, 7:string endTime, 8:string countryCode, 9:i32 limit, 10:i32 offset)

}
