namespace csharp Zen.DataAccess.PartnerShop
namespace java com.daigou.sg.rpc.partnershop
namespace objc TRPartnerShop
namespace javascript TRPC
namespace swift TR

struct TSellerCategory {
	1:required i32 id;					//分类id
	2:required string categoryName;		//分类中文名
	3:required string altCategoryName;	//分类英文名
}

struct TSellerCategoryNew {
    1:required i32 sellerCategoryId;	//分类id
    2:required string categoryName;		//分类名
    3:required list<string> bannerPics; // Banner图片地址
}

struct TSeller {
	1:required i32 id;				//卖家id
	2:required string shopTitle;	//店铺名
	3:required string sellerName;	//卖家名
	4:required string logoImage;	//logo图标
	5:required string shopUrl;		//店铺地址
	6:required double normalDiscount//普通会员返利折扣
	7:required double svipDiscount;	//svip会员返利折扣
	8:required double vipDiscount;	//vip会员返利折扣
	9:required double isFreeShipping;//免国内运费
	10:optional double discountValue;//国际运费折扣
	11:required string altRemark;	 //卖家描述
}

struct TSellerWithPics {
	1:required i32 id;				//卖家id
	2:required string shopTitle;	//店铺名
	3:required string sellerName;	//卖家名
	4:required string logoImage;	//logo图标
	5:required string shopUrl;		//店铺地址
	6:required double normalDiscount//普通会员返利折扣
	7:required double svipDiscount;	//svip会员返利折扣
	8:required double vipDiscount;	//vip会员返利折扣
	9:required double isFreeShipping;//免国内运费
	10:optional double discountValue;//国际运费折扣
	11:required string altRemark;	 //卖家描述
	12:optional list<string> pics;   //店家图片地址
}

struct TSellerProduct {
	1:required string productName;	//商品名
	2:required string productUrl;	//商品url
	3:required string priceWithSymbol;	//单价
	4:required string productImage;	//商品图片
}

struct TSellerWithProducts {
	1:required TSeller seller;					//卖家信息
	2:required list<TSellerProduct> products;	//卖家商品
}

struct TSellerWithBannerAndProducts {
    1:required TSeller seller;					//卖家信息
    2:required list<TSellerProduct> products;	//卖家商品
    3:optional string bannerPic                 //卖家Banner图片地址
}

service PartnerShop {
	
	/// <summary>
	/// 获取首页合作卖家
	/// </summary>
	/// <param name="offset">数据的起始位置</param>
	/// <param name="limit">一次请求要获取的个数</param>
	/// <param name="originCode">采购国家</param>
	/// <returns>合作卖家分类</returns>
	list<TSeller> GetHomePageSellers(1:i32 offset, 2:i32 limit, 3:string originCode),
	list<TSellerWithPics> GetNewHomePageSellers(1:i32 offset, 2:i32 limit, 3:string originCode),

	/// <summary>
	/// 获取合作卖家分类
	/// </summary>
	/// <param name="originCode">采购国家</param>
	/// <returns>合作卖家分类</returns>
	list<TSellerCategory> GetSellerCategories(1:string originCode),

    /// <summary>
    /// 获取合作卖家分类（新）
    /// </summary>
    /// <param name="originCode">采购国家</param>
    /// <returns>合作卖家分类</returns>
    list<TSellerCategoryNew> GetNewSellerCategories(1:string originCode),

	/// <summary>
	/// 根据分类获取合作卖家
	/// </summary>
	/// <param name="sellerCategoryId">分类id</param>
	/// <param name="originCode">采购国家</param>
	/// <param name="offset">数据的起始位置</param>
	/// <param name="limit">一次请求要获取的个数</param>
	/// <returns>合作卖家</returns>
	list<TSeller> GetSellersByCategory(1:i32 sellerCategoryId, 2:string originCode, 3:i32 offset, 4:i32 limit),

	/// <summary>
	/// 根据分类获取合作卖家
	/// </summary>
	/// <param name="sellerCategoryId">分类id</param>
	/// <param name="originCode">采购国家</param>
	/// <param name="offset">数据的起始位置</param>
	/// <param name="limit">一次请求要获取的个数</param>
	/// <returns>合作卖家</returns>
	list<TSellerWithProducts> GetSellerProductsByCategory(1:i32 sellerCategoryId, 2:string originCode, 3:i32 offset, 4:i32 limit),

    /// <summary>
    /// 根据分类获取合作卖家（新）
    /// </summary>
    /// <param name="sellerCategoryId">分类id</param>
    /// <param name="originCode">采购国家</param>
    /// <param name="offset">数据的起始位置</param>
    /// <param name="limit">一次请求要获取的个数</param>
    /// <returns>合作卖家</returns>
    list<TSellerWithBannerAndProducts> GetSellerWithProductsByCategory(1:i32 sellerCategoryId, 2:string originCode, 3:i32 offset, 4:i32 limit),

	/// <summary>
	/// 根据卖家获取商品
	/// </summary>
	/// <param name="sellerId">卖家id</param>
	/// <param name="offset">数据的起始位置</param>
	/// <param name="limit">一次请求要获取的个数</param>
	/// <returns>商品</returns>
	list<TSellerProduct> GetProductsBySeller(1:i32 sellerId, 2:i32 offset, 3:i32 limit)
}
