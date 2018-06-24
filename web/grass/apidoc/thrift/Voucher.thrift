namespace * Voucher
namespace java com.daigou.sg.rpc.tvoucher
namespace csharp BizDrops.DataAccess.Finance
namespace javascript TRPC
namespace swift TR


// 优惠券
struct TMyVoucher {
	1: required string code;	// 业务内标识
	2: required bool available;	// 是否可选（基于当前选择）
	3: required bool expired; 	// 是否过期
	4: required string name; 	// 名称
	5: required string desc; 	// 描述
	6: optional string pic; 	// 图片地址
	7: required string firstAmount; 	// 满多少
	8: required string secondAmount; 	// 减多少
	9: required bool isUsed;
	10: required i64 startDate;
	11: required i64 endDate;
	12: required string url;
	13: required i32 voucherTypeId;
}

struct TMyVoucherGroup {
	1: required string name;	// 组名
	2: required list<TMyVoucher> vouchers;	// 优惠券
}

struct TMyTypeVoucher {
	1: required string code;	// 业务内标识
	2: required bool available;	// 是否可选（基于当前选择）
	3: required bool expired; 	// 是否过期
	4: required string name; 	// 名称
	5: required string desc; 	// 描述
	6: optional string pic; 	// 图片地址
	7: required string firstAmount; 	// 满多少
	8: required string secondAmount; 	// 减多少
	9: required bool isUsed;
	10: required i64 startDate;
	11: required i64 endDate;
	12: required i32 category; 	// 券的类型：0 -> 满减券， 1 -> 红包券，2 -> prime体验券，3 -> agentFee券
}

service Voucher {
	/// <summary>
	/// 读取用户的voucher列表
	/// </summary>
	/// <returns>优惠券 name 0: 满减券, 1: 红包券, 2: prime体验券</returns>
	list<TMyVoucherGroup> UserGetMyVouchers(),

	/// <summary>
	/// 根据请求类型读取用户的 voucher 列表
	/// </summary>
	list<TMyTypeVoucher> UserGetAllVouchersByType(1: i32 typeCode), // typeCode: 0 -> all, 1 -> unused, 2 -> used, 3 -> expired
}
