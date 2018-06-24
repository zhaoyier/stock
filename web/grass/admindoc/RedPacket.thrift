/// <summary>
/// implements by c#
/// </summary>

namespace * RedPacket
namespace csharp Zen.DataAccess.RedPacket
namespace javascript TRPC

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
}

service RedPacket {

	/// <summary>
	/// 新增一个QR user
	/// </summary>
	bool UserAddQRUser(1:string userName, 2:string catalog, 3:string phoneNumber, 4:double amount),

	/// <summary>
	/// 编辑一个QR user
	/// </summary>
	bool UserUpdateQRUser(1:string id, 2:string userName, 3:string phoneNumber, 4:double amount),

	/// <summary>
	/// 删除一个QR user
	/// </summary>
	bool UserDeleteQRUser(1:string id),
	
	/// <summary>
	/// 获取QRUser list
	/// </summary>
	list<TQRUser> UserGetQRUserList(1:string catalog),

}
