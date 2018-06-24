namespace go rpc.trackingorder.trackingorderservice

//Common----------------Struct-----Start

struct TStaff{
    1: required i32 UserId;                                 //跟单员UserId
    2: required i32 StaffId;                                //跟单员StaffId
    3: required string RealName;                            //跟单员姓名
}

struct TResult{
    1: required i32 Code;                                   //返回的结果Code【-1表示失败，1表示成功】
    2: required string Msg;                                 //返回的结果消息，一般失败会有消息
}

struct TPurchaseType{
    1: required string PurchaseType;                        //服务类型【数据库值】
    2: required string PurchaseTypeName;                    //服务类型【字面值】
}

struct TOrderStatus{
    1: required i32 OrderStatusId;                                  //订单状态Id
    2: required string OrderStatusCode;                             //订单状态Code
    3: required string OrderStatusName;                             //订单状态名称
}

struct TIssueLabel{
    1: required i32 IssueLabelId;                                   //问题标签Id
    2: required string Label;                                       //问题标签
}

struct TTaobaoAccount{
    1: required i32 TaobaoAccountId;                                //淘宝账号Id
    2: required string TaobaoAccountNickName;                       //淘宝账号昵称
}

struct TAllResult{
    1: required i32 Code;                                   //返回的结果Code【-1表示失败，1表示成功】
    2: required string Msg;                                 //返回的结果消息，一般失败会有消息
    3: required TTaskPoolResultForPurchaseTypeStatistics TaskPoolResultForPurchaseTypeStatistics;                       //任务池，根据采购类型的分组统计
    4: required list<TTaskPoolResultForOrderStatusStatistics> TaskPoolResultForOrderStatusStatisticses;                 //任务池，根据订单状态的分组统计
    5: required list<TStaff> AllStaffsForTaskPool;                                                                      //任务池，所有人员列表
    6: required list<TTaskPoolAssignedResult> TaskPoolResultForAssigned;                                                //任务池，已分配的任务统计
}

//Common----------------Struct-----End

//任务池页面----------------Struct-----Start

struct TTaskPoolUnAssignedCondition{
    1: required string PurchaseType;                        //服务方式
    2: required i32 TaobaoAccountId;                        //淘宝账号Id
    3: required string TaobaoAccountNickName;               //淘宝账号
    4: required string WarehouseCode;                       //仓库Code
    5: required string WarehouseName;                       //仓库名
    6: required string AltWarehouseName;                    //仓库别名
    7: required i32 ShipmentTypeId;                         //运输方式Id
    8: required string ShipmentTypeName;                    //运输方式名
    9: required string AltShipmentTypeName;                 //运输方式别名
}

struct TTaskPoolAssignedCondition{
    1: required string PurchaseType;                        //服务方式
    2: required string TaskStatusCode;                      //任务状态Code
    3: required string TaskStatusName;                      //任务状态名
    4: required i32 UserId;                                 //跟单员UserId
    5: required i32 StaffId;                                //跟单员StaffId
    6: required string RealName;                            //跟单员姓名
}


struct TTaskPoolUnAssignedResult{
    1: required string PurchaseType;                        //服务方式
    2: required i32 TaobaoAccountId;                        //淘宝账号Id
    3: required string TaobaoAccountNickName;               //淘宝账号
    4: required string WarehouseCode;                       //仓库Code
    5: required string WarehouseName;                       //仓库名
    6: required string AltWarehouseName;                    //仓库别名
    7: required i32 ShipmentTypeId;                         //运输方式Id
    8: required string ShipmentTypeName;                    //运输方式名
    9: required string AltShipmentTypeName;                 //运输方式别名
    10: required i32 Cnt;                                   //当前分组条件的数量
}

struct TTaskPoolAssignedResult{
    1: required string PurchaseType;                        //服务方式
    2: required string TaskStatusCode;                      //任务状态Code
    3: required string TaskStatusName;                      //任务状态名
    4: required i32 UserId;                                 //跟单员UserId
    5: required i32 StaffId;                                //跟单员StaffId
    6: required string RealName;                            //跟单员姓名
    7: required i32 Cnt;                                    //当前分组条件的数量
}

struct TConditionsAndStaffs{
    1: required list<TTaskPoolUnAssignedCondition> Conditions;   //批量分配任务时的条件
    2: required list<TStaff> Staffs;                             //批量分配任务时的跟单员
}

struct TTaskReAssignCondition{
    1: required list<i32> OrderIds;                                 //重新分配的任务订单列表
    2: required i32 NewUserId;                                      //准备分给的新的UserId
    3: required string Remark;                                      //重新分配的原因
}

struct TTaskPoolResultForPurchaseTypeStatistics{
    1: required i32 CountForEzbuyAssign;                            //Ezbuy待分配数量
    2: required i32 CountForEzbuyProcess;                           //Ezbuy当天已处理数量
    3: required i32 CountForPrimeAssign;                            //Prime待分配数量
    4: required i32 CountForPrimeProcess;                           //Prime当天已处理数量
    5: required i32 CountForAgentAssign;                            //Agent待分配数量
    6: required i32 CountForAgentProcess;                           //Agent当天已处理数量
    7: required i32 CountForTotalAssign;                            //Total待分配数量
    8: required i32 CountForTotalProcess;                           //Total当天已处理数量
}

struct TTaskPoolResultForOrderStatusStatistics{
    1: required string PurchaseType;                        //服务方式
    2: required i32 OrderStatusId;                          //订单状态Id
    3: required string OrderStatusCode;                     //订单状态Code
    4: required string OrderStatusName;                     //订单状态Name
    5: required string AltOrderStatusName;                  //订单状态别名
    6: required string WarehouseCode;                       //仓库Code
    7: required string WarehouseName;                       //仓库名
    8: required string AltWarehouseName;                    //仓库别名
    9: required i32 ShipmentTypeId;                         //运输方式Id
    10: required string ShipmentTypeCode;                    //运输方式Code
    11: required string ShipmentTypeName;                    //运输方式名
    12: required string AltShipmentTypeName;                 //运输方式别名
    13: required i32 Cnt;                                   //当前分组条件的数量
}

struct TTaskPoolBatchAssignConditionItem{
    1: required TTaskPoolResultForOrderStatusStatistics ConditionForThisItem;           //勾选的统计项
    2: required i32 NewNumForThisItem;                                                  //勾选的统计项的新值
}

struct TTaskPoolBatchAssignCondition{
    1: required list<TTaskPoolBatchAssignConditionItem> ConditionItems;                 //勾选的统计项列表
    2: required list<TStaff> Staffs;                                                    //待分配人员列表
}



//任务池页面----------------Struct-----End

//列表页面----------------Struct-----Start

struct TTaskStatusCount{
    1: required string TaskStatusCode;                              //任务状态Code
    2: required string TaskStatusName;                              //任务状态名
    3: required i32 Cnt;                                            //任务数量
}

struct TIssueLabelCount{
    1: required i32 IssueLabelId;                                   //问题标签Id
    2: required string Label;                                       //问题标签
    3: required i32 Cnt;                                            //任务数量
}

struct TTaskOrderStatusStatistics{
    1: required string PurchaseType;                                //服务类型
    2: required string WarehouseCode;                               //仓库Code
    3: required string WarehouseName;                               //仓库名称
    4: required i32 ShipmentTypeId;                                 //运输方式Id
    5: required string ShipmentTypeCode;                            //运输方式Code
    6: required string ShipmentTypeName;                            //运输方式名称
    7: required i32 OrderStatusId;                                  //订单状态Id
    8: required string OrderStatusCode;                             //订单状态Code
    9: required string OrderStatusName;                             //订单状态名称
    10: required i32 Cnt;                                           //任务数量
    11: required list<TTaobaoAccount> TaobaoAccounts;               //淘宝下单账号列表
}

struct TShipmentType{
    1: required i32 ShipmentTypeId;                                 //运输方式Id
    2: required string ShipmentTypeCode;                            //运输方式Code
    3: required string ShipmentTypeName;                            //运输方式名称
    4: required string AltShipmentTypeName;                         //运输方式别名
}

struct TWarehouse{
    1: required i32 WarehouseId;                                    //仓库Id
    2: required string WarehouseCode;                               //仓库Code
    3: required string WarehouseName;                               //仓库名称
}

struct TQueryCondition{
    1: required string PurchaseType;                                //服务类型
    2: required i32 OrderStatusId;                                  //订单状态Id
    3: required string PoPlaceDateStart;                            //后台下单时间，起始
    4: required string PoPlaceDateEnd;                              //后台下单时间，截止
    5: required string LastLogisticsUpdateDateStart;                //物流最后更新时间，起始
    6: required string LastLogisticsUpdateDateEnd;                  //物流最后更新时间，截止
    7: required string WarehouseCode;                               //仓库Code
    8: required i32 ToUserId;                                       //跟单员Id
    9: required string EtaStart;                                    //Eta，起始
    10: required string EtaEnd;                                     //Eta，截止
    11: required string PoNumber;                                   //采购单号
    12: required i32 ShipmentTypeId;                                //运输方式Id
    13: required i32 IssueLabelId;                                  //跟单标签Id
    14: required string SignaturedDateStart;                        //仓库签收日期，起始
    15: required string SignaturedDateEnd;                          //仓库签收日期，截止
    16: required i32 OuterOrderEnum;                                //外网订单[1:是,0:都不选,-1:否]
    17: required i32 LastLogisticsStatus;                           //物流状态[1:有,0:全部,-1:无]
    18: required string TaskStatusCode;                             //任务状态Code
    19: required i32 TaobaoAccountId;                               //淘宝账号Id
}

struct TLoadOnPageCondition{
    1: required TQueryCondition Condition;
    2: required i32 Limit;                                          //每次返回的数量
    3: required i32 Offset;                                         //偏移量，从0开始
    4: required string IsNeedPrintTempLog;                            //是否需要打印临时log
}

struct TOrderTracking{
    1: required i32 OrderTrackingId;                                //运单表Id
    2: required i32 OrderId;                                        //订单Id
    3: required string ShipperName;                                 //物流商
    4: required string TrackingNo;                                  //运单号
    5: required string TrackingStatus;                              //物流状态
    6: required string SyncDate;                                    //同步时间
    7: required bool IsDefault;                                     //是否默认
    8: required string CreateBy;                                    //创建人
    9: required string CreateDate;                                  //创建时间
    10: required string UpdateBy;                                   //修改人
    11: required string UpdateDate;                                 //修改时间
}

struct TQueryResultForOrder{
    1: required i32 OrderId;                                        //订单Id
    2: required string OrderNumber;                                 //订单号
    3: required i32 OrderStatusId;                                  //订单状态Id
    4: required string OrderStatusCode;                             //订单状态Code
    5: required string OrderStatusName;                             //订单状态名称
    6: required i32 CustomerId;                                     //会员Id
    7: required string NickName;                                    //会员昵称
    8: required string ProductName;                                 //商品名称
    9: required string ProductUrl;                                  //商品Url
    10: required string PriceSymbol;                                //货币符号
    11: required double UnitPrice;                                  //单价
    12: required double GstFee;                                     //Gst费用
    13: required double InternalShipmentFee;                        //国内运费
    14: required i32 Qty;                                           //数量
    15: required i32 ActualQty;                                     //实际数量
    16: required bool AuthorizeForBalance;                          //是否授权
    17: required double AuthorizeBalance;                           //授权金额
    18: required i32 ShipmentTypeId;                                //运输方式Id
    19: required string ShipmentTypeCode;                           //运输方式Code
    20: required string ShipmentTypeName;                           //运输方式Name
    21: required string WarehouseCode;                              //仓库Code
    22: required string WarehouseName;                              //仓库名称
    23: required string AltWarehouseName;                           //仓库别名
    24: required string WayBill;                                    //运单号
    25: required string PoNumber;                                   //采购单号
    26: required string VendorName;                                 //来源商家
    27: required string CorrectVendorName;                          //正确商家
    28: required i32 TaobaoAccountId;                               //淘宝账号Id
    29: required string TaobaoAccountNickName;                      //淘宝账号
    30: required string ProductSku;                                 //ProductSku
    31: required string PoPlaceDate;                                //采购下单时间
    32: required string SignatueDate;                               //签收日期
    33: required string ArriveShanghaiDate;                         //入库时间
    34: required i32 PackageId;                                     //包裹Id
    35: required bool IsFiltered;                                   //是否是被筛选出来的
    36: required string VerifyProductPayDate;                       //商品付款时间
    37: required i32 AgentProductId;                                //AgentProductId
    38: required TOrderTracking OrderTracking;                      //物流信息
    39: required TOrderRemark ProductRemark;                        //商品备注
    40: required TOrderRemark RecivingRemark;                       //收货备注
    41: required TOrderRemark FrontRemark;                          //前台备注
    42: required string RowColorValue;                              //行背景颜色值
    43: required string TaskAssignRemark;                           //任务分配备注
    44: required string ReceiveAssign;                              //收货分组人
    45: required bool   Is17Huo;                                    //是否为17huo商品
    46: required bool   IsFreeShipping;                             //是否包邮
}

struct TQueryResultForPackage{
    1: required i32 CustomerId;                                     //会员Id
    2: required string NickName;                                    //会员昵称
    3: required i32 PackageId;                                      //包裹Id
    4: required string PackageNumber;                               //包裹号
    5: required string PackageEtaDate;                              //Eta
    6: required string WarehouseCode;                               //仓库Code
    7: required string WarehouseName;                               //仓库名称
    8: required i32 ShipmentTypeId;                                 //运输方式Id
    9: required string ShipmentTypeName;                            //运输方式名称
    10: required i32 ArriveOrderCount;                              //已到订单数
    11: required i32 NotArriveOrderCount;                           //未到订单数
    12: required string VerifyProductPayDate;                       //商品付款时间
    13: required string FirstOrderArriveDate;                       //首单入库时间
    14: required list<TQueryResultForOrder> Orders;                 //包裹下的订单列表
}

struct TLoadOnPageResultForOrder{
    1: required list<TQueryResultForOrder> Result;
    2: required i32 TotalCount;
}

struct TLoadOnPageResultForPackage{
    1: required list<TQueryResultForPackage> Result;
    2: required i32 TotalCount;
}

//列表页面----------------Struct-----End

//处理页面----------------Struct-----Start

struct TOrderRemark{
    1: required i32 OperOrderRemarkId;                              //跟单Remark主键Id
    2: required i32 OrderRemarkId;                                  //订单备注Id
    3: required i32 OrderId;                                        //订单Id
    4: required i32 RemarkType;                                     //备注类型Id
    5: required string Remark;                                      //备注内容
    6: required string CreateBy;                                    //创建人
    7: required string UpdateBy;                                    //修改人
    8: required string CreateDate;                                  //创建时间
    9: required string UpdateDate;                                  //修改时间
    10: required string Attachment;                                 //附件路径
    11: required i32 Action;                                        //按钮显示【0，无】【1，修改】【2，删除】【3，修改删除】
}

struct TPackageId{
    1: required i32 PackageId;                                      //包裹Id
    2: required list<i32> OrderIds;                                 //订单Id列表
}

struct TPackageInfoWithProcessingPage{
    1: required i32 PackageId;                                      //包裹Id
    2: required string PackageEtaDate;                              //包裹Eta时间
    3: required string PackageEtaStart;                             //包裹Eta开始
    4: required string PackageEtaEnd;                               //包裹Eta结束
}

struct TOrderInfoWithProcessingPage{
    1: required i32 OrderId;                                        //订单Id
    2: required i32 OrderStatusId;                                  //订单状态ID
    3: required string OrderStatusCode;                             //订单状态Code
    4: required string OrderStatusName;                             //订单状态名称
    5: required string WayBill;                                     //运单号
    6: required i32 ShipmentTypeId;                                 //运输方式Id
    7: required string ShipmentTypeCode;                            //运输方式Code
    8: required string ShipmentTypeName;                            //运输方式名称
    9: required string AltShipmentTypeName;                         //运输方式别名
    10: required list<TIssueLabel> IssueLabels;                     //跟单任务打钩标签列表
    11: required i32 DelayDays;                                     //延迟处理天数
    12: required string OffTheShelfReason;                          //下架原因
    13: required list<TOrderRemark> OrderRemarks;                   //备注信息
}

struct TConditionWithProcessingPage{
    1: required list<i32> OrderIds;                                 //Agent订单列表
    2: required list<TPackageId> PackageIds;                        //EzBuy、Prime的包裹列表
    3: required string DelayDays;                                   //延迟处理天数【空，数字】
    4: required string PackageEtaDate;                              //包裹Eta日期
    5: required string PackageEtaStart;                             //包裹Eta起始
    6: required string PackageEtaEnd;                               //包裹Eta结束
    7: required i32 OrderStatusId;                                  //订单状态ID
    8: required string OrderStatusCode;                             //订单状态Code
    9: required string OrderStatusName;                             //订单状态名称
    10: required string WayBill;                                    //运单号
    11: required list<TIssueLabel> IssueLabels;                     //跟单任务打钩标签列表
    12: required TOrderRemark FrontRemark;                          //前台备注，有Id则为修改，无Id则为新增
    13: required TOrderRemark ProductRemark;                        //商品备注，有Id则为修改，无Id则为新增
    14: required TOrderRemark RecivingRemark;                       //收货备注，有Id则为修改，无Id则为新增
    15: required i32 Action;                                        //【0，不执行】【1，保存】【2，保存并发送邮件】
    16: required string OffTheShelfReason;                          //下架原因
    17: required string ShipperName;                                //物流商
    18: required bool IsProcessed;                                  //是否标记为已处理
}

//处理页面----------------Struct-----End

//Job----------------Struct-----Start

struct TJobParam{
    1: required i32 DaysForPoPlace;                                     //已下单状态，距离下单的天数
    2: required i32 DaysForDispatchedPlace;                             //已发货状态，距离下单的天数
    3: required i32 DaysForDispatchedSync;                              //已发货状态，距离最后物流更新的天数
    4: required i32 DaysForPendingInspection;                           //已签收状态，距离签收的天数
    5: required string CreateBy;                                        //创建人[作为传入参数时，放空字符串]
    6: required string CreateDate;                                      //创建时间[作为传入参数时，放空字符串]
    7: required string UpdateBy;                                        //修改人[作为传入参数时，放空字符串]
    8: required string UpdateDate;                                      //修改时间[作为传入参数时，放空字符串]
}

struct TResultForJobParam{
    1: required i32 Code;                                               //返回的结果Code【-1表示失败，1表示成功】
    2: required string Msg;                                             //返回的结果消息，一般失败会有消息
    3: required TJobParam JobParam;                                     //job运行的参数配置
}

struct TResultForJobParamHistory{
    1: required i32 Code;                                               //返回的结果Code【-1表示失败，1表示成功】
    2: required string Msg;                                             //返回的结果消息，一般失败会有消息
    3: required list<TJobParam> JobParamHistory;                        //job运行的参数配置历史
}

//Job----------------Struct-----End

service TrackingOrder{

//Common----------------Service-----Start

    ///<summary>
    ///读取跟单员列表
    ///<summary>
    list<TStaff> LoadAllStaffs(),

    ///<summary>
    ///读取所有服务类型
    ///<summary>
    list<TPurchaseType> LoadAllPurchaseTypes(),

    ///<summary>
    ///读取所有订单状态
    ///<summary>
    list<TOrderStatus> LoadAllOrderStatuses(),

    ///<summary>
    ///获取当前User对应的Staff信息
    ///<summary>
    TStaff GetCurrentStaffByUserCookie(),

    ///<summary>
    ///淘宝账号列表
    ///<summary>
    list<TTaobaoAccount> LoadTaobaoAccount(),

//Common----------------Service-----End

//任务池页面----------------Service-----Start

    ///<summary>
    ///读取任务池，还未分配的任务统计
    ///<summary>
    list<TTaskPoolUnAssignedResult> LoadTaskPoolUnAssigned(),

    ///<summary>
    ///读取任务池，还未分配的任务统计
    ///<summary>
    list<TTaskPoolUnAssignedResult> LoadTaskPoolUnAssignedByDate(1:string dateStart,2:string dateEnd),

    ///<summary>
    ///任务批量分配
    ///<summary>
    TResult TasksBatchAssign(1:TConditionsAndStaffs conditionsAndStaffs),

    ///<summary>
    ///任务批量分配
    ///<summary>
    TResult TasksBatchAssignByDate(1:TConditionsAndStaffs conditionsAndStaffs,2:string dateStart,3:string dateEnd),

    ///<summary>
    ///读取已分配任务池
    ///<summary>
    list<TTaskPoolAssignedResult> LoadTaskPoolAssigned(),

    ///<summary>
    ///读取用户所在应国家的问题标签
    ///<summary>
    list<TIssueLabel> LoadIssueLabelsByUserCookie(),

    ///<summary>
    ///读取任务池的采购类型的分组统计结果
    ///<summary>
    TAllResult LoadTaskPoolResultForPurchaseTypeStatistics(),

    ///<summary>
    ///读取任务池的订单状态的分组统计结果
    ///<summary>
    TAllResult LoadTaskPoolResultForOrderStatusStatistics(1:string dateStart,2:string dateEnd),

    ///<summary>
    ///任务池读取所有人员列表
    ///<summary>
    TAllResult LoadAllStaffsForTaskPool(),

    ///<summary>
    ///任务池批量分配
    ///<summary>
    TAllResult BatchAssignByDateForTaskPool(1:string dateStart,2:string dateEnd,3:TTaskPoolBatchAssignCondition condition),

    ///<summary>
    ///读取任务池已分配的统计
    ///<summary>
    TAllResult LoadTaskPoolForAssigned(),

//任务池页面----------------Service-----End

//列表页面----------------Service-----Start

    ///<summary>
    ///读取用户所在应国家的所有运输方式
    ///<summary>
    list<TShipmentType> LoadShipmentTypesByUserCookie(),

    ///<summary>
    ///读取用户所在应国家的所有仓库
    ///<summary>
    list<TWarehouse> LoadWarehousesByUserCookie(),

    ///<summary>
    ///读取任务的各个状态的数量
    ///<summary>
    list<TTaskStatusCount> LoadTaskStatusCount(),

    ///<summary>
    ///读取任务的各个问题标签对应的数量
    ///<summary>
    list<TIssueLabelCount> LoadIssueLabelCount(),

    ///<summary>
    ///读取任务对应订单的各个状态的统计
    ///<summary>
    list<TTaskOrderStatusStatistics> LoadTaskOrderStatusStatistics(1:string taskStatusCode,2:i32 issueLabelId),

    ///<summary>
    ///读取代购的订单列表
    ///<summary>
    list<TQueryResultForOrder> LoadPackageAndOrdersForAgent(1:TQueryCondition condition),

    ///<summary>
    ///读取一次付款的订单列表
    ///<summary>
    list<TQueryResultForPackage> LoadPackageAndOrdersForEzbuyPrime(1:TQueryCondition condition),

    ///<summary>
    ///按页读取代购的订单列表
    ///limit 或 offset 任意为负数，则返回所有数据。
    ///<summary>
    TLoadOnPageResultForOrder LoadPackageAndOrdersForAgentOnPage(1:TLoadOnPageCondition loadOnPageCondition),

    ///<summary>
    ///按页读取一次付款的订单列表
    ///limit 或 offset 任意为负数，则返回所有数据。
    ///<summary>
    TLoadOnPageResultForPackage LoadPackageAndOrdersForEzbuyPrimeOnPage(1:TLoadOnPageCondition loadOnPageCondition),

    ///<summary>
    ///任务重新分配
    ///<summary>
    TResult TasksReAssign(1:TTaskReAssignCondition taskReAssignCondition),

//列表页面----------------Service-----End

//处理页面----------------Service-----Start

    ///<summary>
    ///单个包裹Id，读取包裹信息
    ///<summary>
    TPackageInfoWithProcessingPage GetPackageInfoByPackageId(1:i32 packageId),

    ///<summary>
    ///单个订单Id，读取订单信息
    ///<summary>
    TOrderInfoWithProcessingPage GetOrderInfoByOrderId(1:i32 orderId),

    ///<summary>
    ///单个备注Id，读取备注信息
    ///<summary>
    TOrderRemark GetOrderRemarkById(1:i32 operOrderRemarkId),

    ///<summary>
    ///处理页面保存
    ///<summary>
    TResult SaveWithProcessingPage(1:TConditionWithProcessingPage condition),

    ///<summary>
    ///处理页面删除备注，只需要传OperOrderRemarkId，其他都用默认值即可
    ///<summary>
    TResult DeleteOrderRemark(1:TOrderRemark orderRemark),

//处理页面----------------Service-----End

//Job----------------Struct-----Start

    ///<summary>
    ///读取job的配置参数
    ///<summary>
    TResultForJobParam LoadJobParam(),

    ///<summary>
    ///读取job的配置参数历史
    ///<summary>
    TResultForJobParamHistory LoadJobParamHistory(),

    ///<summary>
    ///保存job的配置参数
    ///<summary>
    TResult SaveJobParam(1:TJobParam jobParam),

//Job----------------Struct-----End
}
