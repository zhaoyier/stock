namespace go rpc.orderremark

struct TResult {
    // Return
    1: required i32 Code // code -1 表示有错误或者失败，具体看msg
    2: required string Msg // msg 返回内容
}

// 列表结果
struct TOrderRemarkView{
    1: required list<TOrderRemark> Rows // 数据
    2: required i32 Total //总数
}

// 消息推送
struct TOrderRemark {
    1: required string RemarkFlag  // 备注标记
    2: required string CreateDate  // 创建日期
    3: required i32 RemarkType  // 备注类型
    4: required string StepName  // 步骤名称
    5: required string CreateBy  // 创建人
    6: required string Remark  // 备注内容
    7: required i32 OrderRemarkId  // 备注id
    8: required string Attachment  // 附件
}

service OrderRemark {
    // 读取订单备注列表
    // 订单id
    TOrderRemarkView GetOrderRemarkList(1:i32 orderId, 2:i32 pageSize, 3:i32 pageIndex)

}

