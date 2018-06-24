namespace go ezbuy.apidoc.gen.BoostAdmin

struct Category{
    1:required i64 id;
    2:required string categoryName;
    3:required i64 parentId;
}

struct Product{
    1:optional string id;
    2:required string productUrl;
    3:required string productName;
    4:required string productImage;
}

struct PageProduct{
    1:required i32 total;
    2:required list<Product> products;
}

service BoostAdmin{
    list<Category> ListCategorys(1:i64 pid);
    //boostType: "prime":prime、"ezbuy":ezbuy、"":all
    PageProduct ListProductByCid(1:i64 cid, 2:string boostType, 3:i32 limit, 4:i32 offset);

    bool AddBoostProduct(1:string productUrl, 2:i64 cid);
    bool DeleteBoostProduct(1:string id);
    bool RemoveAllBoostProductByCid(1:i64 cid, 2:string boostType);
    bool ImportBoostProduct();
    void ReSortBoostProduct(1:i64 cid);
}
