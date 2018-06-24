/// <summary>
/// implements by c#
/// </summary>

namespace * RedPacket
namespace csharp Zen.DataAccess.RedPacket
namespace javascript TRPC
namespace go redpackets

struct TQRUser {
	1:required string id;				
	2:required string userName;
	3:required string identId;
	4:required string catalog;
	5:required i32 shareAmount;
	6:required i32 registerAmount;
	7:required i32 clickAmount;
	8:required string phoneNumber;
	9:required list<string> shareIncensees;
	10:required list<i32> registerIncensees;
	11:required double amount;
	12:required string url;
	13:required string qRCodeDownloadUrl;
	14:required i32 overOrderAmount;
	15:required i32 overPaymentAmount;	
	16:required bool isGiveVoucher;
	17:required bool isGiveGift;
	18:required i32 voucherId;
}

struct TPrimeMembershipDiscountUser {
	1:required string id;				
	2:required string userName;
	3:required string identId;
	4:required string catalog;
	5:required double amount;
	6:required i32 status;
	7:required i32 membershipType;
	8:required string createDate;
	9:required string createBy;
	10:required string updateDate;
	11:required string updateBy;
	12:required i32 hasPaidAmount;
	13:required i32 orderAmount;
	14:required i64 startTime;
	15:required i64 endTime;
}

struct TPrimeMembershipDiscountUserList {
	1:required i32 total;				
	2:required list<TPrimeMembershipDiscountUser> users;
}

struct TQRUserList {
	1:required i32 Total;				
	2:required list<TQRUser> QRList;
}

service RedPacket_WebAPI {

	/// <summary>
	/// 新增一个QR user
	/// </summary>
	bool UserAddQRUser(1:string userName, 2:string catalog, 3:string phoneNumber, 4:double amount, 5:bool isGiveVoucher, 6:bool isGiveGift, 7:i32 voucherId),

	/// <summary>
	/// 编辑一个QR user
	/// </summary>
	bool UserUpdateQRUser(1:string id, 2:string userName, 3:string phoneNumber, 4:double amount, 5:bool isGiveVoucher, 6:bool isGiveGift, 7:i32 voucherId),

	/// <summary>
	/// 删除一个QR user
	/// </summary>
	bool UserDeleteQRUser(1:string id),
	
	/// <summary>
	/// 获取QRUser list
	/// </summary>
	TQRUserList UserGetQRUserList(1:string catalog, 2:i32 offset, 3:i32 limit),
	
	/// <summary>
	/// 新增一个PrimeMembershipDiscountUser
	/// </summary>
	bool UserAddPrimeMembershipDiscountUser(1:string userName, 2:string catalog, 3:i32 membershipType, 4:double amount, 5:i64 startTime, 6:i64 endTime),

	/// <summary>
	/// 编辑一个PrimeMembershipDiscountUser
	/// </summary>
	bool UserUpdatePrimeMembershipDiscountUser(1:string id, 2:string userName, 3:i32 status, 4:double amount, 5:i64 startTime, 6:i64 endTime),

	/// <summary>
	/// 删除一个PrimeMembershipDiscountUser
	/// </summary>
	bool UserDeletePrimeMembershipDiscountUser(1:string id),
	
	/// <summary>
	/// 获取PrimeMembershipDiscountUser
	/// </summary>
	TPrimeMembershipDiscountUserList UserGetPrimeMembershipDiscountUserList(1:string catalog, 2:i32 offset, 3:i32 limit),

}
