namespace go ezbuy.apidoc.ezspiderweb

service EZSpiderWeb {
	string Listen(1:string url, 2:string taskType, 3:string storeId, 4:string storeName, 5:list<string> productIds, 6:string errMsg), // id: task id; type: task type
}
