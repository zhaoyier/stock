namespace go rpc.picking

struct TDeadline {
    // 唯一标示
    1: required string id,
    // "Subway", "NeighbourhoodStation", "Home", "SelfCollection"
    2: required string deliveryMethod,
    3: required string stationOrDriver,
    4: required string deliveryPeriod,
    // 0-23
    5: required i32 adminDeadlineHour,
    // 0-59
    6: required i32 adminDeadlineMinute,
    7: required i32 pickerDeadlineHour,
    8: required i32 pickerDeadlineMinute,

}

struct TPickerEfficiency {
    1: required string id,
    2: required string pickerId,
    3: required string pickerName,
    // 每小时可以拣多少个b
    4: required i32 b,
    // 每小时可以拣多少个p
    5: required i32 p,
    6: required string deliveryMethod,
}

struct TUnassignedJob {
    1: required string id,
    2: required string deliveryMethod,
    3: required string stationOrDriver,
    4: required string deliveryPeriod,
    5: required i32 b,
    6: required i32 p,
    // 格式：20160131
    7: required i32 deliveryDate,
}

struct TJobProgress {
    1: required string id,
    2: required string deliveryMethod,
    3: required string stationOrDriver,
    4: required string deliveryPeriod,
    // pending: 待开始, picking: 进行中, done: 已完成
    5: required string status,
    6: required string pickerId,
    7: required string pickerName,
    8: required i32 bTodo,
    9: required i32 bDone,
    10: required i32 pTodo,
    11: required i32 pDone,
    // 任务生成时间（unix timestamp）
    12: required i64 ctime,
    13: required i32 pickerDeadlineHour,
    14: required i32 pickerDeadlineMinute,
    // 预计完成时间（Estimated Time of Completion）
    15: required i32 etcHour,
    16: required i32 etcMinute,
    17: required string jobName,
}

struct TPicker {
    1: required string id,
    2: required string pickerName,
    3: required bool isCheckedIn,
}

struct TPickerJobSummary {
    1: required string id,
    2: required i32 bTodo,
    3: required i32 bDone,
    4: required i32 pTodo,
    5: required i32 pDone,
    6: required string pickerName,
}

struct TSubPackage {
    1: required string id,
    2: required string nickname,
    3: required string subPackageNumber,
    4: required string shipToPhone,
    5: required string shipToName,
    6: required i32 deliveryDate,
}

service Picking {
    list<TDeadline> GetDeadline(),
    // 新建或更新，id为空表示新增，否则表示更新
    string PostDeadline(1:TDeadline deadline),

    list<TPickerEfficiency> GetPickerEfficiency(),
    string PostPickerEfficiency(1:TPickerEfficiency efficiency),

    string SyncSubPackages(1:i32 deliveryDate),
    list<TSubPackage> GetSubPackages(1:i32 deliveryDate),
    string DeleteSubPackages(1:list<string> ids),

    list<TUnassignedJob> GetUnassignedJobs(1:i32 deliveryDate),
    list<TPicker> GetPickers(),
    // 获取今天拣货员的概况
    list<TPickerJobSummary> GetPickerJobSummary(1:i32 deliveryDate),
    string AssignJobsToPickers(1:list<string> jobIds, 2:list<string> pickerIds),
    list<TJobProgress> GetJobProgress(),
    string CancelJob(1:string id),
    string SplitJob(1:string jobId, 2:list<string> pickerIds),
    list<TSubPackage> GetJobSubPackages(1:string jobId),

    // 导出excel(根据封箱号 GET Method)
    // string ExportExcelByPackingCode(1:string packingCode),

    // 导出excel(根据日期 GET Method)
    // string ExportExcelOnAssignSGPostByDate(1:string scanDate)
}
