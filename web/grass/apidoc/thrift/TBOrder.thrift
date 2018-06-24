namespace * TBOrder
namespace go ezbuy.apidoc.gen.tborder
namespace webapi api

struct ShipmentObj {
	1:required string invoice
	2:required string company
	3:required bool isComplete
	4:required string date
}

struct Order {
	1:required string tid
	2:required bool isTaobao
}

struct SetOrderStat {
	1:required i32 success1h
	2:required i32 successTotal
}

struct ProcessHistory {
	1:required i32 total
	2:required i32 setOrder
}

struct PatchInfo {
	1:required string sellerAddress
	2:required string nickName
}

struct VersionResp {
	1:required bool hasNew
	2:optional string downloadUrl
}

service TBOrder {
	string TransformOrder(1:string taobaoAccount, 2:string tid, 3:bool isTaobao)
	string AddSplitOrder(1:string taobaoAccount, 2:string tid, 3:bool isTaobao)
	string AddPatchInfo(1:string taobaoAccount, 2:string tid, 3:PatchInfo patchInfo)
	list<Order> GetOrder(1:string taobaoAccount)
	string SubmitNewVersion(1:string version, 2:string downloadUrl)
	VersionResp SetVersion(1:string taobaoAccount, 2:string version)
	string SetOrder(1:string taobaoAccount, 2:string tid, 3:list<ShipmentObj> shipmentObjs)
	string DelOrder(1:string taobaoAccount, 2:string tid, 3:string reason)
	SetOrderStat GetSetOrderStat(1:string taobaoAccount)
	ProcessHistory GetProcessHistory(1:string taobaoAccount)
}
