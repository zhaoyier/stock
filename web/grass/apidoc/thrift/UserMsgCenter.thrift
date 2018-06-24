namespace java com.daigou.sg.rpc.message
namespace javascript TRPC
namespace swift TR

service UserMsgCenter {

	// userId, title 不为空
	bool UserAppNotificationHandled(1:i32 userId, 2:string title, 3:string content, 4:string url);
}
