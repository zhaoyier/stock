namespace go ezbuy.apidoc.gen.PrimeFloor

struct Product{
    1:optional string id;
    2:required string productImage;
    3:required string productName;
    4:required string productUrl;
    5:required string fileImage;
    6:required double unitPrice;
    7:required string originCode;
}

struct Category{
    1:required i32 categoryId;
    2:required string categoryName;
}

struct CategoryFloor{
    1:required i32 categoryId;
    2:required list<Product> products;
}

struct CategoryPublishFloor{
    1:required i32 id;
    2:required list<Product> products;
}


service PrimeFloor{
    list<Category> ListCategorys();
    bool AddCategoryFloor(1:i32 categoryId);
    bool AddFloorProduct(1:i32 categoryId, 2:Product product);
    CategoryFloor GetCategoryFloorById(1:i32 categoryId);
    bool SortCategoryFloor(1:i32 preId, 2:i32 nextId, 3:i32 sortId);
    list<CategoryFloor> ListCategoryFloors();

    bool UpdateFloorProduct(1:Product product);
    bool RemoveFloorProduct(1:string productId);

    bool RemoveCategoryFloor(1:i32 categoryId);
    bool PublishPrimeFloor();
    bool ImportFloorProduct();

    #list<CategoryPublishFloor> PrimeCategoryFloors();
}
