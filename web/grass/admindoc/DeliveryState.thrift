namespace go rpc.deliverystate

struct TResult {
    // Return
    // Code 返回标识
    // 		－1 表示有错误或者失败
    //		1	表示成功
    // Msg	返回内容
    1: required i32 Code
    2: required string Msg
}


struct StateInfo {
    // StateCode 省市code
    // StateName 省市名称
    1: required string StateCode
    2: required string StateName
}

struct StateRegionHistory {
    // Notes 修改值
    // UpdateBy 修改人
    // UpdateDate 修改时间
    1: required string Notes
    2: required string UpdateBy
    3: required string UpdateDate
}

struct StateRegionInfo {
    // DeliveryFee 运费费率
    // IsActive 是否有效
    // Logs 修改日志
    1: required string DeliveryFee
    2: required bool IsActive
    3: required list<StateRegionHistory> Logs
}

service DeliveryState{
	// 获取省市列表
    // catalogCode 国家
    list<StateInfo> GetStateInfo(1:string catalogCode)

    // 根据fromStateCode和toStateCode获取对应的deliveryFee
    // fromStateCode 起始state
    // toStateCode 终止state
	StateRegionInfo GetStateRegionInfo(1:string fromStateCode, 2:string toStateCode)

    // 保存fromStateCode和toStateCode对应的deliveryFee
    // fromStateCode 起始state
    // toStateCode 终止state
    // deliveryFee 对应的费率
    // isActive 是否有效
    TResult SaveStateRegionInfo(1:string fromStateCode, 2:string toStateCode, 3:double deliveryFee, 4:bool isActive)

    // 添加新的state信息
    // stateName 用于显示的state名称
    // stateCode 用于数据交互的唯一code
    // catalogCode 国家
    // deliveryFee 运费
    // status 是否有效
    TResult AddStateAndRegion(1:string stateName, 2:string stateCode, 3:string catalogCode, 4:double deliveryFee, 4:bool status)
}
