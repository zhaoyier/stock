/// <summary>
/// implements by go
/// </summary>

namespace * Favorite
namespace csharp Zen.DataAccess.Favorite
namespace javascript TRPC
namespace java com.daigou.sg.rpc.favorite
namespace swift TR
namespace go ezbuy.apidoc.gen.favorite


include "Product.thrift"
include "Common.thrift"

struct TFavoriteItem {
	1:required Common.TProductCommon product;	//商品信息
}

struct TFavoriteCategory {
	1:required i32 id;		//分类id
	2:required string name;	//分类名
	3:required i32 productCount; //分类里面的商品数量
	4:required string productImage; //分类的封面产品图
}

struct TFavoriteResult {
	1:required string message;
	2:required bool result;
}

service Favorite {

	/// <summary>
	/// 用户获取某个商品是否是收藏商品
	/// </summary>
	/// <returns>是否是收藏商品</returns>
	bool UserGetProductIsFavorite(1:string productUrl),

	/// <summary>
	/// 获取所有的收藏商品
	/// </summary>
	/// <returns>收藏的商品</returns>
	list<TFavoriteItem> UserGetAllFavoriteItems(1:i32 offset, 2:i32 limit),

	/// <summary>
	/// 获取收藏夹分类
	/// </summary>
	/// <returns>收藏夹分类</returns>
	list<TFavoriteCategory> UserGetAllFavoriteCategory(),

	/// <summary>
	/// 新增收藏夹分类
	/// </summary>
	/// <param name="favoriteCategory">收藏夹分类信息</param>
	/// <returns>收藏夹分类id</returns>
	TFavoriteResult UserAddNewFavoriteCategory(1:string favoriteCategoryName),

	/// <summary>
	/// 修改收藏夹分类
	/// </summary>
	/// <param name="favoriteCategory">收藏夹分类信息</param>
	TFavoriteResult UserUpdateFavoriteCategory(1:TFavoriteCategory favoriteCategory),

	/// <summary>
	/// 删除收藏夹分类
	/// </summary>
	/// <param name="favoriteCategoryId">收藏夹分类id</param>
	TFavoriteResult UserDeleteFavoriteCategory(1:i32 favoriteCategoryId),

	/// <summary>
	/// 根据分类获取收藏夹商品
	/// </summary>
	/// <param name="favoriteCategoryId">收藏夹分类id</param>
	/// <returns>收藏夹商品</returns>
	list<TFavoriteItem> UserGetFavoriteItemsByCategoryId(1:i32 offset, 2:i32 limit, 3:i32 favoriteCategoryId),

	/// <summary>
	/// 新增收藏夹商品
	/// </summary>
	/// <param name="product">商品信息</param>
	/// <returns>结果</returns>
	TFavoriteResult UserAddNewFavoriteItem(1:Product.TProductExtension product),

	/// <summary>
	/// 用户批量删除收藏商品
	/// </summary>
	/// <param name="favoriteProductUrls">收藏商品的URL</param>
	/// <returns>结果</returns>
	TFavoriteResult UserDeleteFavoriteItems(1:list<string> favoriteProductUrls),

	/// <summary>
	/// 批量删除某一收藏夹商品
	/// </summary>
	/// <param name="favoriteProductUrls">收藏商品的URL</param>
	/// <param name="favoriteCategoryId">收藏类别ID</param>
	/// <returns>结果</returns>
	TFavoriteResult UserDeleteFavoriteItemsByCategoryId(1:list<string> favoriteProductUrls, 2:i32 favoriteCategoryId),

	/// <summary>
	/// 更改收藏夹商品分类
	/// </summary>
	/// <param name="favoriteItemIds">收藏夹商品列表</param>
	/// <param name="newFavoriteCategoryId">新收藏夹分类id</param>
	TFavoriteResult UserMoveFavoriteItems(1:list<string> favoriteProductUrls, 2:i32 newFavoriteCategoryId),

}
