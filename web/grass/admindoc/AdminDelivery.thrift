namespace go trpc

struct TBoolReply {
    1:required bool data;
    2:optional string errMsg;
}

struct TCommission {
    1:required double pickUp; # 取货佣金
    2:required double web; # web注册佣金
    3:required double app; # app注册佣金
    4:required double firstPercent; # 首单佣金百分比
    5:required double unFirstPercent; # 非首单佣金百分比
    6:required double placeOrder; # 注册用户下单佣金
    7:required double normalCommission; # 普通订单佣金百分比
}

struct TUser {
    1:required string objectId
    2:required string userName
    3:required string typeName
    4:optional TCommission commission
    5:optional string identUrl
    6:optional TStationOnId idOnName
    7:optional bool isGiveVoucher
    8:optional double itemPrice
    9:optional double ezbuyApportionPrice
    10:optional string customerName
    11:optional string phone
    12:optional bool isOpen
    13:required bool isPartTime
}

struct TSelfStation {
    1:required string name
    2:required double pkgWeight
    3:required double chargeWeight
    4:required double maxWeight
}

struct TBonusRecord {
    1:required string id //商家id
    2:required string name //商家名
    2:required double bonus //金额
    3:required i32 date //时间
}

struct TStationOnId {
    1:required i32 id //selfStationId
    2:required string stationName //站点名
}


service EZDelivery {
    //用户注册
    TBoolReply UserRegister(1:string username, 2:string password, 3:string catelog,4:string userType,5:TCommission data,6:string identUrl,7:TStationOnId idOnName,6:bool isGiveVoucher,7:double itemPrice,8:double ezbuyApportionPrice,9:string customerName,10:string phone,11:bool isOpen, 12:bool isPartTime)

    //获取用户
    list<TUser> GetUserByType(1:string userType,2:string catelog,3:i32 offset,4:i32 limit)

    //根据用户得到站点
    list<string> GetStationsByUserId(1:string userId)

    //删除站点
    TBoolReply DelStation(1:string catelog,2:string stationName,3:string userName)

    //删除用户
    TBoolReply DelUser(1:string catelog,2:string userName)

    //用户更新
    TBoolReply UpdateUser(1:string userName,2:string catelog,3:TCommission commission,4:string identUrl,5:TStationOnId idOnName,6:bool isGiveVoucher,7:double itemPrice,8:double ezbuyApportionPrice,9:string customerName,10:bool isOpen, 11:bool isPartTime, 12: string phone)

    //站点更新
    TBoolReply UpdateStationByUser(1:string userName,2:string catelog,3:string stationName,4:string newStationName)

    //更新密码
    TBoolReply UpdateUserPassword(1:string userName,2:string catelog,3:string password)

    //更新电话
    TBoolReply UpdateUserPhone(1:string userName,2:string catelog,3:string phone)

    //增加Station
    TBoolReply AddStationByUser(1:string userName,2:string catelog,3:string stationName)

    //根据输入字符查找站点
    // stationType: "partnershop"或""
    list<TStationOnId> GetStationByStr(1:string vague, 2:string catelog, 3:string stationType)

    //查看站点详情
    list<TSelfStation> GetSelfStations(1:string catelog)

    //送佣金给卖家
    TBoolReply GetBonusToShop(1:string id,2:double bonus)

    //查看送佣金记录
    list<TBonusRecord> GetBonusRecord(1:string id)

}
