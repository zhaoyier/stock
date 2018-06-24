const defaultPackage = {
	data: [],
	total: 0,
	limit: 10,
	offset: 0
};

const defaultResult = {
	data: [],
	total: 0,
};

const defaultFilter = {
	pkgNumber: "",
	startTime: null,
	endTime: null,
	startTimeDispatched: null,
	endTimeDispatched: null,
	typeOf: "All",
	transactionStatus: "All",
	orderNumber: ""
};

const countryUnit = {
	"CN": "￥",
	"SGLocal": "S$",
	"MYLocal": "M$",
	// "KR": "₩",
	"KR": "W",
	"US": "$"
};

const sellerPackageState = [
	{
		key: 0,
		val: "All",
		describe: "All"
	}, {
		key: 1,
		val: "ShopPendingDelivery",
		describe: "Pending Supplier‘s Dispatching"
	}, {
		key: 2,
		val: "ShopDelivered",
		describe: "Dispatched by Supplier"
	}, {
		key: 3,
		val: "WarehouseReceived",
		describe: "WarehouseReceived"
	}, {
		key: 4,
		val: "WarehouseShipped",
		describe: "WarehouseShipped"
	}, {
		key: 5,
		val: "UserCancelled",
		describe: "UserCancelled"
	}, {
		key: 6,
		val: "ArriveDestination",
		describe: "ArriveDestination"
	}, {
		key: 7,
		val: "PendingDelivery",
		describe: "PendingDelivery"
	}, {
		key: 8,
		val: "Delivering",
		describe: "Delivering"
	}, {
		key: 9,
		val: "Delivered",
		describe: "Delivered"
	}, {
		key: 10,
		val: "Completed",
		describe: "Completed"
	}
];

const TabPaneKey = {
	1: "waitingPackageData",
	2: "dispatchedPackageData",
	3: "cancelledPackageData"
};

const LogisticCompanyItems = [
	"CJ express",
	"Logen Express",
	"Postbox",
	"CU Post",
	"Korea Post",
	"Seller’s Own Track",
	"Others"
];

const JPlogisticCompanyItems = [
	"Sagawa Express",
	"Nippon Express",
	"Truth Logistics",
	"Yamato Transportation",
	"JP Post",
	"Seller’s Own Track",
	"Others",
];


export {
	defaultPackage,
	defaultFilter,
	defaultResult,
	countryUnit,
	sellerPackageState,
	TabPaneKey,
	LogisticCompanyItems,
	JPlogisticCompanyItems,
};
