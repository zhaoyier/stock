namespace go ezbuy.apidoc.gen.Eday

//商品
struct Product{
    1:required string name;
    2:required string picture;
    3:required string activeUrl;
    4:required double originPrice;
    5:required double price;
    6:required bool isCashOff;
    7:required i32 disCount;
    8:required string cashOffKey;
}

struct CashOffCategory{
    1:required i32 categoryId;
    2:required string categoryName;
    3:required i32 count;
    4:required list<Product> products;
}

struct Category{
    1:required i32 categoryId;
    2:required string categoryName;
}

struct DsiCountOff{
    1:required i32 disCountType; //1:gte,2：gt
    2:required double disCountValue; //［0，1）
}

struct SearchCondition{
    1:required i32 categoryId;
    2:required string key;  //cashOff:满减
    3:optional DsiCountOff disCountOff;  
}


//满减
struct Voucher{
    1:required i32 voucherTypeId;
    2:required bool isDraw;
    3:required i32 leftCount;
    4:required string image;
    5:required i64 start;
    6:required i64 end;
}

struct ShowVoucher{
    1:required i32 voucherTypeId;
    2:required bool isDraw;
    3:required i32 leftCount;
    4:required string picture;
}

struct CashOffZone{
    1:required string cashOffKey;
    2:required string bannerImage;
    3:required string color;
    4:required string name;
    5:required bool isOld;
}

struct CashOffZoneProductResponse{
    1:required list<Product> products;
    2:required i32 total;
}

struct CashOffZoneVoucherList{
    1:required string cashOffKey;
    2:required list<i32> voucherTypeId;
}

service Eday{

    //查看代金券信息
    list<Voucher> ListVouchers(),

    list<ShowVoucher> ListAllVouchers(),

    //领取代金券
    bool ReceiveVoucher(1:i32 voucherTypeId),

    //满减专区 pc 16个 mobile 8个  platForm: pc/mobile   key:cashOff 满减
    list<CashOffCategory> ListCategories(1:string key, 2:string platForm),

    //查询
    // key cashOff:满减
    list<Product> ListProductByCondition(1:SearchCondition searchCondition, 2:i32 limit, 3:i32 offset),


    //查询子分类
    // key cashOff:满减
    list<Category> ListCategorByPid(1:i32 parentId),

    //满减专区 pc 8个 mobile 4个  platForm: pc/mobile   key:cashOff 满减
    list<CashOffCategory> ListEdayCategory(1:string key, 2:string platForm),
   

    //新满减专区开始

    // 满减专区
    list<CashOffZone> ListCashOffZone();

    // 查询专区的voucher
    list<Voucher> ListCashOffZoneVoucher(1:string cashOffKey);

    //专区详情页面
    CashOffZoneProductResponse  CashOffZoneDetail(1:string cashOffKey, 2:i32 limit, 3:i32 offset);

    //查询可用的代金券
    list<CashOffZoneVoucherList>  CashOffZoneVoucherMap(1:string countryCode);




}