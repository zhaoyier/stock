namespace go api

# errcode: 0 正确; 1 一般性错误; 100 没有中奖; 101 用户次数用完

struct TUserActionResult {
	1:required i32 errCode;
    2:optional string errMsg;
	3:required i32 type;
	4:optional string desc;
}

struct TVoucherInfo {
	1:required i32 type;
	2:required string desc;
}

struct TUserGameSt {
	1:required i32 errCode;
    2:optional string errMsg;
	3:required i32 userCnt;
	4:optional list<TVoucherSt> voucherst;
}

struct TVoucherSt {
	1:required i32 type;
	2:optional string desc;
	3:required i32 cnt;
}

# 各接口根据cookie判断用户
service SlotMachine {
	# 用户抽奖接口
	TUserActionResult UserAction(),

	# 获取用户抽奖次数和奖券情况
	TUserGameSt UserGetGameSt(),

	bool ClearCache(),
}
