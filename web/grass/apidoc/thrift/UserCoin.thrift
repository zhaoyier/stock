namespace go ezbuy.apidoc.usercoin
namespace swift TR
namespace java com.daigou.sg.webapi.usercoin

enum TCoinRecordDomain {
	All = 0
	Used = 1
	Gained = 2
	Expired = 3
}

struct TCoinRecord {
	1:required i64 id;
	2:required i64 timestamp; # 单位为秒, since 1970
	3:required i32 amount;
	4:required string note; # 备注
	5:required string noteSpec;
}

# 各接口根据url获取区域，根据cookie获取用户
service UserCoin {
	list<TCoinRecord> UserGetCoinRecord(1:TCoinRecordDomain domain, 2:i32 offset, 3:i32 limit),

	i32 UserGetCoinCount(),

	i32 UserGetCoinRecordCount(1:TCoinRecordDomain domain)
}
