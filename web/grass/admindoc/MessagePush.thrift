namespace go rpc.messagepush

struct TResult {
    // Return
    1: required i32 Code // code -1 表示有错误或者失败，具体看msg
    2: required string Msg // msg 返回内容
}

// 列表结果
struct TMessagePushView{
    1: required list<TMessagePush> Rows // 数据
    2: required i32 Total //总数
}

// 消息推送
struct TMessagePush {
    1: required string NickName  // 会员名
    2: required string MessageType  // 消息类型
    3: required string Caption  // 消息标题
    4: required bool IsRead  // 已读
    5: required bool IsInformed  // 已通知
    6: required string OrderNumber  // 订单号
    7: required string PackageNumber  // 包裹号
    8: required string TopUpNumber  // 充值号
    9: required string StationName  // 送货地铁站
    10: required string DeliveryDate  // 送货日期
    11: required string PeriodName  // 送货时间段
    12: required string AppReference  // 链接
    13: required string Message  // 消息内容
}

service MessagePush {
    // 读取messagePush列表
    // messageType 消息类型
    // nickName 会员昵称
    // catalogCode 国家
    TMessagePushView GetMessageList(1:string messageType, 2:string nickName, 3:string catalogCode, 4:i32 pageSize, 5:i32 pageIndex)

    // 根据nickName添加推送
    // nickName 会员昵称
    // catalogCode 国家
    // message 消息内容
    // appReference 链接
    TResult AddMessageWithNickName(1:string nickName, 2:string catalogCode, 3:string message, 4:string appReference)

    // 根据catalogCode添加推送
    // catalogCode 国家
    // message 消息内容
    // appReference 链接
    TResult BatchAddMessageWithCountry(1:string catalogCode, 2:string message, 3:string appReference)

    // 批量添加推送
    // fileName 批量上传文件地址
    // catalogCode 国家
    // message 消息内容
    // appReference 链接
    TResult BatchAddMessageWithExcel()

    // IMPORTANT 不作为一种具体实现，而是作为一种规则定义。
    // 根据templateName获取对应的模版文件
    // PushMessageToNickName : 获取只包含nickName一列的excel表
    // oneway void GetExcelTemplateByName(1:string templateName)
}

