namespace go ezbuy.apidoc.coinvoucherex

struct TVoucher {
	1:required string id;
	2:required i64 voucherID;
	3:required string name;
	4:required string pictureURL;
	5:required i32 coin;
	6:required i32 left; # 为0时，券不可用
	7:required i32 leftChance; # 没有可用兑换次数
	8:required i64 startDate;
	9:required i64 endDate;
	10:required string valueName; # 券金额描述，包括货币符号
	11:required string description; # 券描述
}

service CoinVoucherEx {
	// 此接口不一定登录，因此当有可用cookie时，会显示与用户相关的信息
	// 否则显示一般意义上的信息
	list<TVoucher> GetVouchers(1:string catalogCode),

	// 此接口需要登录，因此根据用户cookie，获取所在国家
	// id不是券id，而是优惠券兑换的映射记录id
	// 1-兑换成功 2-一般意义兑换失败 3-金币不够 4-券分配失败
	i32 Exchange(1:string catalogCode, 2:string id),
}
