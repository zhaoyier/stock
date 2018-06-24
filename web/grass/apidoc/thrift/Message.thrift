/// <summary>
/// implements by go
/// </summary>

namespace * CustomerMessage
namespace csharp Zen.DataAccess.CustomerMessage
namespace java com.daigou.sg.rpc.message
namespace javascript TRPC
namespace swift TR

include 'ReadyToShip.thrift'

enum TMessageType {
	Normal              = 0
	OrderPending        = 1
	OrderArrived        = 2
	ParcelArrangeable   = 3
	Enquiry             = 4
	Web                 = 5
	ParcelPending       = 6
	FirebaseCallback    = 7
}

struct TMessage {
	1:required i32 id;				//消息id
	2:required string messageType;	//消息类型
	3:required string message;		//内容
	4:required bool isRead;			//是否已读
	5:optional i32 orderId;			//订单id, OrderPending使用
	6:optional i32 packageId;		//包裹id, ParcelArrangeable, ParcelPending使用
	7:optional string url;			//相关网址
	8:required string updateDate;	//更新日期
	9:required TMessageType type;
	10:optional ReadyToShip.TReadyToShipGroup readyToShipGroup;	// OrderArrived使用
}

service CustomerMessage {

	/// <summary>
	/// 获取未读消息总数
	/// </summary>
	/// <returns>未读消息总数</returns>
	i32 UserGetUnreadMessageCount(),

	/// <summary>
	/// 获取消息列表
	/// </summary>
	/// <param name="offset">起始位置</param>
	/// <param name="limit">读取个数</param>
	/// <returns>消息列表</returns>
	list<TMessage> UserGetMessages(1:i32 offset, 2:i32 limit),

	/// <summary>
	/// 设置消息已读
	/// </summary>
	/// <param name="messageId">消息id</param>
	void UserSetMessageRead(1:i32 messageId),

	/// <summary>
	/// 批量设置消息已读
	/// </summary>
	/// <param name="messageIDs">消息集合</param>
	void UserSetMessagesRead(1:list<i32> messageIDs),

	/// <summary>
	/// 设置所有消息已读
	/// </summary>
	/// <returns>设置结果</returns>
	bool UserSetAllMessagesRead(),

	/// <summary>
	/// 批量删除消息
	/// </summary>
	/// <param name="messageIDs">消息集合</param>
	/// <returns>删除结果</returns>
	bool UserDeleteMessages(1:list<i32> messageIDs),
}
