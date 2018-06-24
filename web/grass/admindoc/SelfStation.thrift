namespace go rpc.selfstation

struct TDistrictType {
    1: required i32 districtTypeId,
    2: required string districtTypeName,
}

struct TSelfStation {
    1: required i32 selfStationId,
    // 新加坡此参数传0
    2: required i32 districtTypeId,
    // catalogCode: "SG", "MY", "TH", "ID"
    3: required string catalogCode,
    4: required string stationName,
    5: required string stationAddress,
    6: required string telephone,
    7: required string postcode,
    8: required i32 maxWeight,
    9: required double longitude,
    10: required double latitude,
    11: required i32 endOfHour,
    12: required string stationLabel,
    // 是否开启
    13: required bool isActive,
    14: required string timeSlot,
}

struct TSelfStationPickupPeriod {
    1: required i32 pickupPeriodId,
    2: required i32 selfStationId,
    // 格式："5:30PM-8:00PM"，"10:00AM-12:00PM"
    3: required string pickupPeriod,
    // "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    4: required string dayOfWeek,
    5: required i32 endOfHour,
    // 是否开启
    6: required bool isActive,
}

service SelfStation {
    // catalogCode: "SG", "MY", "TH", "ID"
    list<TDistrictType> FindDistrictTypes(1:string catalogCode),

    // isClosed:0表示关闭,1表示未关闭
    list<TSelfStation> FindSelfStations(1:string catalogCode,2:i32 isClosed),

    // 新建或更新
    TSelfStation PostSelfStation(1:TSelfStation station),

    string DeleteSelfStation(1:i32 selfStationId),

    // 新建或更新
    string PostPickupPeriods(1:list<TSelfStationPickupPeriod> periods),

    list<TSelfStationPickupPeriod> FindStationPickupPeriods(1:i32 selfStationId),

    string DeletePickupPeriods(1:list<i32> periodIds),
}
