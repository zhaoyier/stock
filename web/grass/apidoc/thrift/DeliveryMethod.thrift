namespace go trpc.deliverymethod
namespace java com.daigou.sg.webapi.deliverymethod
namespace swift TR

include "Common.thrift"

// 域名：http://gitlab.1dmy.com/65daigou/apidoc/blob/master/client_domain.md
// 验证方式：cookie

///////// 派送方法，后端聚合整理后给app和前端展示 ////////////////

struct TDeliveryStation {
	1: i64  id;
	2: string  stationName;
	3: string  stationAddress;
	4: string  telephone;
	5: double  maxWeight;
	6: bool  isFree;
	7: string  deliveryFee;
	// 是否置灰不可用
	8: bool  isUnavailable;
	// 置灰不可用的原因
	9: string  unavailableReason;
	10: string  deliveryMethodCode;
	// 收件人的电话
	11: optional string  shipToPhone;
	// 收件人的名字
	12: optional string  shipToName;
	13: string  imgUrl;
	14: string  timeSlot;
	15: double longitude;
	16: double latitude;
	17: string originalFee; // 原价 be: 可能搞活动
	18: string knowMoreLink;
}

struct THomePickupPeriod {
	1: i32 periorId;
	2: string periodName;
}

struct THomeAddress {
	1: i32 id;
	2: string address;
	3: string userName;
	4: string telephone;
	5: string deliveryFee;
	// 是否置灰不可用
	6: bool  isUnavailable;
	// 置灰不可用的原因
	7: string  unavailableReason;
	8: string  deliveryMethodCode;
	// 是否不完整，需要补充信息
	9: bool  isImcomplete;
}

struct TRegionState {
	1: string regionName;
	2: list<string> stateNames;
}

struct  TDeliveryMethods {
	// 是否根据收费区分
	1: bool isSeparated;
	// 免费的派送方式的长度
	2: i32 freeLen;
	// 是否是叶子节点
	3: bool isLeaf;
	4: list<TDeliveryMethods> subMethods;
	5: double maxWeight;
	6: list<TDeliveryStation> stations;
	7: string methodName;
	// 是否置灰不可用
	8: bool  isUnavailable;
	// 置灰不可用的原因
	9: string  unavailableReason;
	10: bool isFree;
	11: string  deliveryFee;
	12: string desc;
	13: optional string originalFee;  // 前端维护
}

struct  TRecentDeliveryAddresses {
	1: list<TDeliveryStation> stations;
	2: list<THomeAddress> homeAddresses;
	3: list<THomePickupPeriod>  pickupPeriods; // 是否有数据，表示是否是小货。
	4: list<TDeliveryStation> recommendedStations; // 推荐站点列表
}

struct  TDeliveryMethodArgs {
	1: double weight;
	2: string originCode;
	3: string previousMethod;
	4: string packageNumber;
}

struct TCustomerAddress {
	1: i32  id;
	2: string  addressToName;
	3: string  addressToPhone;
	4: string  block;
	5: string  street;
	6: string  unit;
	7: string  postcode;
	8: string  company;
	9: string  building;
	10: string  state;    // state/province
	11: string  city;
	12: string  shipToAddress1;
	13: string  district;
	14: string  subDistrict;
	15: string  address;
	16: bool  isMajor;
	17: string  region;
	18: string  floor;
	19: string  shipToAddress2;
	20: string destCode;
}

struct TCancelledPackage {
	1: string  packageNumber;
	// 派送日期，unix timestamp
	2: i64  deliveryDate;
	// 派送时间段id
	3: i64  pickupPeriodId;
	// 是否直接取消派送
	4: bool  isCancelled;
	// 是否是放在家门口
	5: bool  isFrontDoor;
}

service DeliveryMethod {
	// 派送类型树结构
	TDeliveryMethods UserGetDeliveryMethods(1: TDeliveryMethodArgs methodArgs),

	// 最近派送地址
	TRecentDeliveryAddresses UserGetRecentDeliveryAddresses(1: TDeliveryMethodArgs methodArgs),

	// 派送上门区域和state
	list<TRegionState> UserGetHomeRegionStates(),

	// 新增或修改送货上门地址
	Common.TCommonResult UserPostCustomerAddress(1: TCustomerAddress address),

	// 删除送货上门地址
	string UserDelCustomerAddress(1: i32 id);

	// 获取送货上门地址详情
	TCustomerAddress UserGetCustomerAddress(1: i32 id);

	// 获取所有送货上门地址详情
	list<TCustomerAddress> UserGetAllCustomerAddress();

	// 取消派送
	Common.TCommonResult UserCancelDelivery(1: TCancelledPackage p);
}
