namespace go ezbuy.apidoc.simpleregisterlogin

struct TResult {
	1:required i32 errCode;
	2:required string errMsg;
}

service SimpleRegisterLogin {
	TResult Login(1:string emailOrNickname, 3:string password);
	TResult Register(1:string email, 3:string password,  4:string nickname, 5:string mobile);
}
