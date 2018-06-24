/// <summary>
/// implements by c#
/// </summary>

namespace * Offset
namespace csharp Zen.DataAccess.Offset
namespace javascript TRPC
namespace java com.daigou.sg.rpc.offset
namespace swift TP

struct TOffset {
	1:required i32 id;				//差额补齐id
	2:required string offsetType;	//类型
	3:required string total;		//总额
	4:required string note;			//备注
	5:required string payDate;		//付款日期
}

struct TOrderOffset {
	1:required list<TOffset> offsets;	//差额补齐明细
	2:required bool canAgree;			//是否可以同意
	3:required bool canCancelOrder;		//是否可以取消订单
	4:required bool canReply;			//是否能够回复
}

struct TOffsetResult {
	1:required bool status;				
	2:required string message;			
}

service Offset {

	/// <summary>
	/// 同意订单差额补齐
	/// </summary>
	/// <param name="orderId">订单id</param>
	void UserAgreeOrderOffset(1:i32 orderId),

	/// <summary>
	/// 同意订单差额补齐
	/// </summary>
	/// <param name="orderId">订单id</param>
	TOffsetResult UserAgreeOrderOffsetWithReturn(1:i32 orderId),
	
	/// <summary>
	/// 同意包裹差额补齐
	/// </summary>
	/// <param name="packageId">包裹id</param>
	void UserAgreePackageOffset(1:i32 packageId),

	/// <summary>
	/// 获取未确认差额补齐列表
	/// </summary>
	/// <param name="orderId">订单id</param>
	/// <returns>未确认差额补齐列表</returns>
	TOrderOffset UserGetUnconfirmedOrderOffsets(1:i32 orderId),

	/// <summary>
	/// 回复订单差额补齐
	/// </summary>
	/// <param name="orderId">订单id</param>
	/// <param name="remark">回复内容</param>
	void UserReplyOrderOffset(1:i32 orderId, 2:string remark)
}
