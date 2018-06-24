namespace go ezbuy.apidoc.googleadwordsconversion

struct TExecResult {
	1:required string errCode;
	2:required i64 taskId;
}

service GoogleAdwordsConversion {
	TExecResult Exec();

	// 下载csv接口单独写
	// void Download(1:i64 taskId);
	// void DownloadLatest();
}
