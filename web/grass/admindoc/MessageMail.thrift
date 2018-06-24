namespace go rpc.messagemail

struct TResult {
    // Return
    1: required i32 Code // code -1 表示有错误或者失败，具体看msg
    2: required string Msg // msg 返回内容
}

// 列表结果
struct TMessageMailView{
    1: required list<TMessageMail> Rows // 数据
    2: required i32 Total //总数
}

// 消息推送
struct TMessageMail {
    1: required string MailTo  // 收件人邮件地址
    2: required string Subject  // 邮件标题
    3: required bool IsMailed  // 是否已经发送
    4: required string CreateDate  // 创建日期
    5: required string MailDate  // 发送日期
    6: required string MailBody  // 正文
}

service MessageMail {
    // 读取messageMail列表
    // messageType 消息类型
    // nickName 会员昵称
    // catalogCode fromdate
    TMessageMailView GetMailList(1:string mailTo, 2:string subject, 3:string fromDate, 4:string toDate, 5:string catalogCode, 6:i32 pageSize, 7:i32 pageIndex)

}

