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

struct ImportProdItem {
	1:required string id;
	2:required i32 status; # 0: 等待入库, 1: 正在入库 2: 完成入库
	3:required i32 ezbuy;
	4:required i32 prime;
	5:required i32 unprocess;
	6:required string downloadUrl;
	7:required i64 uploadDate;
	8:required string title;
	9:required i32 total;
}

struct ImportProdListResult {
	1:required list<ImportProdItem> result;
	2:required i32 total;
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

	# 商品导入
	ImportProdListResult ListImportProd(1:i32 offset, 2:i32 limit);
	bool StartImportProd(1:string id);
}
