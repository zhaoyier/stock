namespace csharp Zen.DataAccess.Shipment
namespace java com.daigou.sg.rpc.shipment
namespace objc TRShipment
namespace javascript TRPC
namespace swift TR

struct TShipmentDeliveryMethod {
	1:required string deliveryMethodCode;	//派送方式编号
	2:required string deliveryMethodName;	//派送方式
	3:required string description;			//描述
	4:required double minFee;				//最小费用
	5:required double minWeight;			//最小收费重量
	6:required double maxFee;				//最大费用
	7:required double maxWeight;			//最大收费重量
	8:required double nightMaxWeight;		//晚上最大送货重量
	9:required string deliveryFee;
	10:required list<TShipmentCollectStation> stations;
}

struct TShipmentCollectStation {
	1:required i32 id;					//自取点id
	2:required string stationName;		//自取点名
	3:required string stationAddress;	//自取点地址
	4:required string telephone;		//联系电话
	5:required double maxWeight;		//最大派送重量
	6:required i32 aheadOfDay;			//提前派送天数
	7:required i32 endOfDay;
	8:required double longitude;		//经度
	9:required double latitude;			//维度
	10:required string selfStationType;
	11:required string catalogCode;
	12:required string status;
	13:required string imageUrl;	    //图片地址，这里应该是一个七牛的图片key,

}

struct TDeliveryTime {
	1:required string date;				//送货日期
	2:required string dayOfWeek;		//送货星期
	3:required list<string> periodList;	//送货时间段
}

struct TSelfStation {
	1:required i32 id;					//自取点id
	2:required string stationName;		//自取点名
	3:required string stationAddress;	//自取点地址
	4:required string telephone;		//联系电话
	5:required double maxWeight;		//最大派送重量
	6:required i32 aheadOfDay;			//提前派送天数
	7:required string longitude;		//经度
	8:required string latitude;			//维度
	9:required string mapUrl;			//地图
}

struct TNeighbourhoodStation {
	1:required i32 id;				//邻里取货点id
	2:required string stationName;	//邻里取货点名
	3:required string telephone;	//联系电话
	4:required double maxWeight;	//最大派送重量
}

struct TNeighbourhoodStationItem {
	1:required string ids;		//邻里详细取货点id列表
	2:required string itemName;	//邻里详细取货点名
	3:required string postcode;	//邮编
	4:required string time;		//派送时间段
	5:required string longitude;//经度
	6:required string latitude;	//维度
	7:required string mapUrl;	//地图
}

struct TNeighbourhoodStationItemDeliveryTime {
	1:required i32 neighbourhoodStationItemId;	//邻里详细取货点id
	2:required TDeliveryTime deliveryTime;		//派送时间
}

struct TArrangeDeliveryResult {
	1:required string Message;
	2:required string MessageChs;
	3:required bool IsSuccess;
	4:required string ReturnNumber;
}

struct TNeighbourhoodDeliveryTime {
	1:required i32 neighbourhoodStationId;
	2:required string neighbourhoodStationItemId;
	3:required list<TNeighbourhoodSelfPickDates> selfPickDates;
}

struct TNeighbourhoodSelfPickDates {
	1:required i32 neighbourhoodStationItemId;
	2:required string dateSort;
	3:required string date;
	4:required string dayOfWeek;
	5:required string periodList;
}

service Shipment {
	/// <summary>
	/// 安排取货
	/// </summary>
	/// <param name="purchaseType">采购方式</param>
	/// <param name="packageIds">包裹id</param>
	/// <param name="localDeliveryMethod">派送方式</param>
	/// <param name="stationName">取货点名</param>
	/// <param name="deliveryDate">取货日期</param>
	/// <param name="periodName">取货时间段</param>
	/// <param name="shipToName">收货人</param>
	/// <param name="shipToPhone">收货电话</param>
	/// <param name="stationId">取货点id</param>
	/// <param name="couponCode">折扣码</param>
	/// <param name="voucherId">抵用券id</param>
	/// <returns>派送信息id</returns>
	TArrangeDeliveryResult UserArrangeDelivery(1:string purchaseType, 2:list<i32> packageIds, 3:string localDeliveryMethod, 4:string stationName, 5:string deliveryDate, 6:i32 customerAddressId,
        7:string periodName, 8:string shipToName, 9:string shipToPhone, 10:string couponCode, 11:i32 voucherId, 12:string neighbourhoodStationItemId, 13:i32 selfStationId),

	/// <summary>
	/// 重新安排取货
	/// </summary>
	/// <param name="shipmentId">派送信息id</param>
	/// <param name="localDeliveryMethod">派送方式</param>
	/// <param name="stationName">取货点名</param>
	/// <param name="deliveryDate">取货日期</param>
	/// <param name="periodName">取货时间段</param>
	/// <param name="shipToName">收货人</param>
	/// <param name="shipToPhone">收货电话</param>
	/// <param name="stationId">取货点id</param>
	TArrangeDeliveryResult UserReArrangeDelivery(1:string periodName, 2:string localDeliveryMethod, 3:string shipTophone, 4:string shipToName,
            5:string shipmentId,6:string neighbourhoodStationItemId, 7:string customerAddressId, 8:i32 selfStationId, 9:string deliveryDate, 10:string stationName)

	/// <summary>
	/// 获取本地派送方式
	/// </summary>
	/// <param name="deliveryMethodName">派送方式</param>
	/// <returns>本地派送方式</returns>
	list<TShipmentDeliveryMethod> UserFindLocalDeliveryMethod(1:string deliveryMethodName, 2:i32 offset, 3:i32 limit),

	/// <summary>
	/// 获取马来的派送方式
	/// </summary>
	/// <param name="deliveryMethodName">派送方式</param>
	/// <returns>本地派送方式</returns>
	list<TShipmentDeliveryMethod> FindMYDeliveryMethod(),

	/// <summary>
	/// 获取送货上门派送日期
	/// </summary>
	/// <param name="packageIds">包裹id列表</param>
	/// <returns>送货上门派送日期</returns>
	list<TDeliveryTime> UserFindHomeDeliveryDates(1:list<string> packageIds),

	/// <summary>
	/// 获取邻里取货点
	/// </summary>
	/// <returns>邻里取货点</returns>
	list<TNeighbourhoodStation> FindNeighbourhoodStations(),

	/// <summary>
	/// 获取邻里详细取货点
	/// </summary>
	/// <param name="neighbourhoodStationId">邻里取货点id</param>
	/// <returns>邻里详细取货点</returns>
	list<TNeighbourhoodStationItem> UserFindNeighbourhoodStationItems(1:i32 neighbourhoodStationId),

	/// <summary>
	/// 获取邻里详细取货点派送日期
	/// </summary>
	/// <param name="neighbourhoodStationId">邻里取货点id</param>
	/// <param name="neighbourhoodStationItemId">邻里详细取货点id</param>
	/// <returns>邻里详细取货点派送日期</returns>
	TNeighbourhoodDeliveryTime UserFindNeighbourhoodDeliveryDates(1:i32 neighbourhoodStationId, 2:string neighbourhoodStationItemId),

	/// <summary>
	/// 获取上门自取点
	/// </summary>
	/// <returns>上门自取点</returns>
	list<TSelfStation> FindSelfStations(),

	/// <summary>
	/// 获取上门自取派送日期
	/// </summary>
	/// <param name="selfStationId">上门自取点id</param>
	/// <returns>上门自取派送日期</returns>
	list<TDeliveryTime> FindSelfStationDeliveryDates(1:string selfStationId),

	/// <summary>
	/// 获取地铁站
	/// </summary>
	/// <returns>地铁站</returns>
	list<string> FindSubwayStations(),

	/// <summary>
	/// 获取地铁站派送日期
	/// </summary>
	/// <param name="subwayStationName">地铁站</param>
	/// <returns>地铁站派送日期</returns>
	list<TDeliveryTime> UserFindSubwayDeliveryDates(1:string subwayStationName),

	/// <summary>
	/// 获取全部上门取货的日期
	/// </summary>
	/// <param name="subwayStationName">地铁站ID</param>
	/// <returns>上门取货的日期</returns>
	list<TDeliveryTime> UserFindSelfPickDates(1:i32 selfStationId),

	/// <summary>
	/// 判断用户是否可以选择取货时间和取货时间段
	/// </summary>
	bool UserCanSelectArrangeDate(),

	/// <summary>
	/// 获取取货时间
	/// </summary>
	list<string> UserGetArrangeDeliveryDate(1:string deliveryMethodCode, 2:i32 deliveryId),

	/// <summary>
	/// 获取取货时间段
	/// </summary>
	list<string> UserGetArrangeDeliveryTimeSlots(1:string deliveryMethodCode, 2:i32 deliveryId, 3:string deliveryDate),

}
