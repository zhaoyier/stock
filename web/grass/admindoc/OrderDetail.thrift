namespace go rpc.orderdetail


struct TResult {
    // Return
    // Code 返回标识
    // 		－1 表示有错误或者失败
    //		1	表示成功
    // Msg	返回内容
    1: required i32 Code
    2: required string Msg
}

service OrderDetail{
	// 修改package的eta时间
	// packageId	需要修改的packageId
	// packageEta 	修改的packageEtaDate时间
	// packageEtaStart 	修改的packageStartDate时间
	// packageEtaEnd 	修改的packageEndDate时间
	// ignoreEtaRefund	是否忽略ETA refund
	// remark		备注
	TResult ChangePackageEta(1:i32 packageId, 2:string packageEta, 3:string packageEtaStart, 4:string packageEtaEnd, 5:bool ignoreEtaRefund, 6:string remark)
}
