namespace go spike.signin.trpc.signin

struct TSignInReward{
	1:required string rid;
	2:required string rewardInfo;
	3:required i32 days;
	4:required bool isContinue;
	5:required i64 startDate;
	6:required i64 endDate;
}

struct TSignIn{
	1:required i32 count;
	2:required list<string> rid;
	3:required list<i64> signDates;
	4:required i32 errCode;
}

service CustomerSignIn{
	//签到
	bool UserDoSignIn()

	//签到信息
	TSignIn UserSignInInfo()

	//获取所有奖励
	list<TSignInReward> GetAllReward()

	//奖励
	TSignInReward GetRewardById(1:string rid)

	//编辑奖励
	bool EditReward(1:TSignInReward signInReward)

	//增加奖励
	bool AddReward(1:TSignInReward signInReward)

}
