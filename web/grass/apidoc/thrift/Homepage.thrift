namespace java com.daigou.sg.webapi.homepage
namespace objc TRHomepage
namespace javascript TRPC
namespace swift TR

struct TMineSimpleInfo {
	2: required string pendingPayment;		// 等待付款金额
	3: required i32 orderBuyForMeCount;		// 正在处理的代购订单数
	4: required i32 orderShipForMeCount;	// 正在处理的自助购订单数
	5: required i32 parcelCount;			// 正在处理的包裹数
	6: required i32 favouriteCount;			// 收藏的商品数
	7: required string memberShip;			// 用户等级
	8: required i32 primeCount;			    // 正在处理的prime订单
}

service Homepage {
	string GetSplash(),
	TMineSimpleInfo UserGetMine()
}
