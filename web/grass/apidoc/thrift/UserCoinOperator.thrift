namespace go ezbuy.apidoc.usercoinoperator

enum AdminFileType {
	None = 0,
	BatchOperateUserCoin = 1,
	MaxLimit = 2
}

service UserCoinOperator {
	// coin可为负
	bool OperateUserCoin(1:string catalogCode, 2:string nickname, 3:i32 coin, 5:string service, 5:string note);

	string AdminDownloadFile(1:AdminFileType fileType)

	// fileKey：七牛file key
	// 返回错误消息列表，若为空，则表示上传成功
	list<string> AdminBatchOperateUserCoin(1:string fileKey, 2:string note)
}
