# Homepage API

```thrift

struct Category {
    1: required i32 id;
    3: required string name;             // category名称
    4: required string picture;          // 图片
}

struct MineSimpleInfo {
    2: required string pendingPayment;            // 
    3: required i32 orderBuyForMeCount;           // 
    4: required i32 orderShipForMeCount;          // 
    5: required i32 parcelCount;                  // 
    6: required i32 favouriteCount;               // 
    7: required string memberShip;                // 
}

service Xiamen {
    list<Category> Category.GetHomePageCategories(1:i32 offset, 2:i32 limit, 3:string originCode),
    list<Category> Category.GetTopLevelCategories(1:string originCode),
    list<Category> Category.GetSubCategories(1:int categoryId),
    list<ProductSimple> Category.GetProducts(1:int id, 2:i32 offset, 3:i32 limit),

    list<ProductSimple> RecentPurchase.GetProducts(1:i32 offset, 2:i32 limit),

    string Homepage.GetSplash(),

    # mine tab
    MineSimpleInfo User.GetMine(),
}
```
