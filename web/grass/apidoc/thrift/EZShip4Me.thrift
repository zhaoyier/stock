namespace * EZShip4Me
namespace java com.daigou.sg.webapi.ezship4me
namespace swift TR
namespace go ezbuy.apidoc.gen.ezship4me
namespace webapi api

include "Common.thrift"

struct TShip4MeOriginInfo {
	1: required string originCode;
	2: required list<string> availableWarehouseCodes;
	3: required list<Common.TCommonOptionItem> courierCompanies;
	4: required list<Common.TCommonOptionItem> thirdPartySources;
}

struct TShip4MeOrderInfo {
	1: required string originCode;
	2: required string warehouseCode;
	3: required string courierCompanyCode;
	4: required string trackingNo;
	5: optional string memo;
	6: optional string thirdPartySourceCode;
	7: optional string thirdPartyOrderNo;
	8: optional bool hasPhotoService;
	9: optional bool hasRepackService;
}

service EZShip4Me {

	TShip4MeOriginInfo GetShip4MeOriginInfo(1:string originCode),
	
	Common.TCommonResult UserSubmitShip4MeOrder(1:TShip4MeOrderInfo info),
	
	Common.TCommonResult UserUpdateShip4MeOrder(1:i32 orderID, 2:TShip4MeOrderInfo info),
	
	TShip4MeOrderInfo UserGetShip4MeOrderInfo(1:i32 orderID),
	
	list<Common.TCommonValueItemsGroup> UserGetShip4MeWarehouseAddresses(1:string originCode),
	
	Common.TPhoneVerificationCodeResult UserSendShip4MeVerificationCode(1:string phone),
	
	Common.TCommonResult UserVerifyShip4MePhone(1:string phone, 2:string code),

	Common.TCommonResult UserSaveShipForMeOrderPrice(1:list<i32> orderIDs, 2:list<double> prices)

}
