namespace * ProductReview
namespace java com.daigou.sg.rpc.productreview
namespace objc TRProductReview
namespace javascript TRPC
namespace swift TR

struct TReview {
	1: required string id;                     // 商品评论的id，默认为0
	2: required string productUrl;             // 商品url
	3: required i32 userID;                    // 用户id
	4: required i32 rating;                    // 满意度
	5: optional i32 helpfulCount;              // 此条评论的采纳数
	6: required string comment;                // 商品评论内容
	7: optional list<string> pictures;         // `图片key`数组，即客户端可以自行计算出所需的任意规格的图片url
	8: required string createDate;             // 评论时间
	9: required string nickName;               // 用户昵称
	10: optional string profilePic;            // 用户头像
	11: optional bool hasSetHelpful;           // 是否设置过有帮助
	12: optional string sku;                   // 商品sku
	13: optional i32 orderId;                  // 关联订单id
	14: optional i32 packageId;                // 关联包裹id
}

struct TReviewStat {
	1: required i32 all;        // 某个商品所有评论的个数
	2: required i32 hasPhoto;   // 某个商品含有图片评论的个数
}

service ProductReview {
	/// <summary>
	/// 添加商品评论
	/// </summary>
	/// <param name="obj">商品评论的具体信息</param>
	string UserReviewProduct(1:TReview obj),

	/// <summary>
	/// 设置商品评论的采纳数
	/// </summary>
	/// <param name="productReviewDetailId">商品评论的id</param>
	/// <param name="helpful">是否采纳</param>
	void UserSetProductReviewHelpful(1:string productReviewDetailId, 2:bool helpful)

	/// <summary>
	/// 获取商品评论列表
	/// </summary>
	/// <param name="offset">商品评论的起始位置</param>
	/// <param name="limit">一次请求要获取的商品评论个数</param>
	/// <returns>商品评论列表</returns>
	list<TReview> UserGetReviews(1:i32 offset, 2:i32 limit), 

	/// <summary>
	/// 获取用户自身评论数
	/// </summary>
	/// <returns>用户自身评论数</returns>
	i32 UserGetReviewCount(),

	/// <summary>
	/// 添加商品评论
	/// </summary>
	/// <param name="obj">商品评论的具体信息</param>
	string ReviewProduct(1:TReview obj),

	/// <summary>
	/// 获取商品评论列表
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <param name="mustHasPhoto">用于过滤商品评论是否包含图片</param>
	/// <param name="offset">商品评论的起始位置</param>
	/// <param name="limit">一次请求要获取的商品评论个数</param>
	/// <returns>商品评论列表</returns>
	list<TReview> GetReviews(1:string productUrl, 2:bool mustHasPhoto, 3:i32 offset, 4:i32 limit), 

	/// <summary>
	/// 获取商品评论列表
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <param name="rating">满意度</param>
	/// <param name="offset">商品评论的起始位置</param>
	/// <param name="limit">一次请求要获取的商品评论个数</param>
	/// <returns>商品评论列表</returns>
	list<TReview> GetReviewsByRating(1:string productUrl, 2:i32 rating, 3:i32 offset, 4:i32 limit), 

	/// <summary>
	/// 获取某个商品的评论个数
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <returns>商品的评论个数</returns>
	TReviewStat GetReviewStat(1:string productUrl),
	
	 /// <summary>
	/// 根据包裹id获取评论
	/// </summary>
	/// <param name="packageId">包裹id</param>
	/// <returns>商品评论列表</returns>
	list<TReview> GetPackageReview(1:i32 packageId)
}
