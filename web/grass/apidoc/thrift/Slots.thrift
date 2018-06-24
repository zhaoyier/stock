namespace go ezbuy.apidoc.slots

enum PrizeType {
	None,
	Coin,
	Voucher,
	Other
}

struct TSlots {
	1:required string id;
	2:required i32 coin;
	3:required list<Prize> prizes;
	4:required string pcBannerUrl;
	5:required string mobileBannerUrl;
	6:required i32 version;
}

struct Prize {
	1:required string id;
	2:required i32 prizeType; # 1-金币 2-优惠券 3-其他
	3:required i64 intValue;
	4:required string strValue;
	5:required string picURL;
	6:required i32 startDate;
	7:required i32 endDate;
	8:required i64 left;
}

struct ActionRsp {
	1:required i32 errCode; # 0-正常，1-一般性错误，2-version失效，3-用户金币不足, 4-券分配失败
	2:required string errMsg;
	3:required Prize prize;
}

service Slots {
	# 各接口首先根据catalogCode获取国家，，再获取此国家最新的游戏id
	# 若catalogCode为空，则根据url获取国家

	TSlots Slots(1:string catalogCode), // SG MY TH AU ID
	string GetBanner(1:string catalogCode, 2:i16 platform); // platform: 0-PC; 1-Mobile
	i32 ValidGameTimes(1:string catalogCode),
	ActionRsp Action(1:string catalogCode, 2:i32 version);
	list<string> Winners(1:string catalogCode, 2:i32 offset, 3:i32 limit);
}
