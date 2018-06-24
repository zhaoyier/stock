namespace go spike.newSignin.trpc


struct TDayToCoin{
	1:required i32 day
	2:required i32 coinCount
}

struct TBoolReply{
	1:required bool isSuccess
	2:required string msg
}

struct TNewSignIn{
	1:required string country
	2:required i32 days
	3:required list<TDayToCoin> dayToCoins
}

struct TCountOnCustomerId{
	1:required i32 customerId
	2:required i32 coinCount
	3:required i32 signInCount
	4:required bool isSignIn
}

service CustomerNewSignIn{
	//编辑签到
	TBoolReply EditNewSignIn(1:TNewSignIn newSignIn)

	//得到签到信息
	list<TNewSignIn>  GetAllNewSignIn()

	//增加
	TBoolReply AddNewSignIn(1:TNewSignIn newSignIn)

	//前台页面

	//签到
	TBoolReply UserDoSignIn()

	//得到Reward根据国家
	TNewSignIn  GetRewardByCountry(1:string country)

	//得到用户的金币
	TCountOnCustomerId  GetCoinCountById()

}
