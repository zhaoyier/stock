namespace go trpc
namespace java com.daigou.selfstation.rpc.vehicle

// app 正式站点：pdt.65daigou.com
// app 测试站点：delivery.65emall.net

// erp 正式站点：int.ezbuy.sg
// erp 测试站点：uerp.65emall.net

// User开头的接口是用户接口
// Admin开头的接口是后台接口

struct TQueueNo {
    // 是否可以装货
    1: required bool isLoading,
    2: required string no,
    3: required bool isBReady,
    4: required bool isPReady,
    5: required string cageNum,
    // 是否已经进入队列
    6: required bool isInQueue,
    7: required string timeSlot,
    8: required i32 bTotal,
    9: required i32 pTotal,
    10: required i32 bRed,
    11: required i32 pRed,
    12: required i32 bTodo,
    13: required i32 pTodo,
}

struct TDriverQueueNo {
    1: required string no,
    2: required string driverName,
    3: required string driverId,
    4: required i64 queueTimeStamp,
    5: required string timeSlot,
    6: required bool isBReady,
    7: required bool isPReady,
    8: required i32 deliveryDate,
}

struct TShippingManage {
    //day,night(小货),big(大货)
    1: required string goodsDetail,
    2: required i32 deliveryDate,
    3: required string period,
    4: required string timeSlot,
    5: required string ironCageNo,
    6: required i32 isFinishLoading,
}

struct TReplyData {
    1: required i32 id,
    2: required string timeSlot,
    3: required string loadingBay,
    4: required string driverNo,
    5: required string driverName,
    6: required string tel,
    7: required string weight,
    8: required i32 sumB,
    9: required i32 sumP,
    10: required i32 unDoneB,
    11: required i32 unDoneP,
    12: required i32 lableRedB,
    13: required i32 lableRedP,
    14: required i32 scanLoadingB,
    15: required i32 scanLoadingP,
    16: required string ironCageNo,
    17: required bool isFinishLoading,
}

service Vehicle {
    // 装货排队
    // 日期格式：2006-01-31
    string UserQueueForLoading(1:string timeSlot, 2:i32 deliveryDate),

    // 查询排队情况
    TQueueNo UserGetQueueNo(1:i32 deliveryDate),

    // 完成装货
    string UserDoneLoading(1:i32 deliveryDate),

    //显示timeSlot
    list<string> UserGetTimeSlots(),


    ////////////////////////////////////////////////////////////////////////////
    //                              admin分割线                                //
    ////////////////////////////////////////////////////////////////////////////

    // 设置装货区域数量
    string AdminSetLoadingQueueCount(1:i32 count),

    // 查询正在装货的队列
    list<TDriverQueueNo> AdminGetLoadingQueue(),

    // 查询正在等待装货的队列
    list<TDriverQueueNo> AdminGetWaitingQueue(),

    // 释放车位
    string AdminReleaseQueueNo(1:TDriverQueueNo queueNo),

    // 释放所有车位
    string AdminCleanAllQueues(),

    // 选择BReady还是PReady
    string AdminChoseReady(1:TDriverQueueNo queueNo),



    ////////送货上门

    //选择铁笼号
    string AdminUpdateCageNo(1:i32 driverNo, 2:i32 deliveryDate, 3:string ironCageNo)

    // 送货上门出货管理
    list<TReplyData> AdminGetShipmentsByAddition(1:TShippingManage param)

    //返回可用的铁笼号
    list<string> AdminGetCageNoOnAvailable()

}
