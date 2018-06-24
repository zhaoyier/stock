namespace go ezbuy.apidoc.gen.PrimeFloor

enum CountryCode {
    Default, //0  新加坡，马来
    TH,      //1   泰国
}

struct Product{
    1:optional string id;
    2:required string productImage;
    3:required string productName;
    4:required string productUrl;
    5:required string fileImage;
    6:required double unitPrice;
    7:required string originCode;
	8:required double price;
    9:required i64 gpid
}

struct Category{
    1:required i32 categoryId;
    2:required string categoryName;
}

struct CategoryFloor{
    1:required i32 categoryId;
    2:required string name
    3:required list<Product> products;
}

struct SubCategory{
    1:required i32 categoryId;
    2:required string categoryName;
    3:required i32 count;
}

struct CategoryPublishFloor{
    1:required i32 id;
    2:required string name;
    3:required list<Product> products;
    4:required list<SubCategory> subCategories
    5:required i32 total;
}


service PrimeFloor{

    list<Category> ListCategorys();
    bool AddCategoryFloor(1:i32 categoryId, 2:CountryCode country);
    bool AddFloorProduct(1:i32 categoryId, 2:Product product, 3:CountryCode country);
    CategoryFloor GetCategoryFloorById(1:i32 categoryId, 2:CountryCode country);
    bool SortCategoryFloor(1:i32 preId, 2:i32 nextId, 3:i32 sortId, 4:CountryCode country);
    list<CategoryFloor> ListCategoryFloors(1:CountryCode country);

    bool UpdateFloorProduct(1:Product product);
    bool RemoveFloorProduct(1:string productId);

    /**
    sortId: 待排序的id
    prevId：排序后前一位的id，没有传递"",
    nextId:排序后后一位的id，没有传递"",
    */
    bool SortFloorProduct(1:string sortId, 2:string prevId, 3:string nextId);

    bool RemoveCategoryFloor(1:i32 categoryId, 2:CountryCode country);
    bool PublishPrimeFloor(1:CountryCode country);
    bool ImportFloorProduct();

    list<CategoryPublishFloor> PrimeCategoryFloors();
}
