namespace go ezbuy.apidoc.gen.AdminLogin

struct TUserReply {
	1: required i32 code;
	2: required string msg;
	2: optional TUser data;
}

struct TUsersReply {
	1: required i32 code;
	2: required string msg;
	2: optional list<TUser> data;
}

struct TBoolReply {
	1: required i32 code;
	2: required string msg;
	2: optional bool data;
}

struct TSystemsReply {
	1: required i32 code;
	2: required string msg;
	2: optional list<string> data;
}

struct TUser {
	1: required string username;
	2: optional list<string> systems; // system names, each system name is unique
}

struct TSystem {
	1: required string id;
	2: required string name;
}

service Login {
	TUserReply Login(1: string username, 2: string password),
	TBoolReply Logout(1: string username),

	TBoolReply CreateUser(1: string username, 2: string password),
	TBoolReply DeleteUser(1: string username),
	TBoolReply ChangePassword(1: string username, 2: string password, 3: string newPassword),
	TBoolReply AssignSystemsToUser(1: string username, 2: list<string> systems),
	#TBoolReply deleteSystemsOfUser(1: string username, 2: list<string> systems),
	TUsersReply GetUsers(),
	list<TUser> QueryUser(1:string keyword, 2:i32 offset, 3:i32 limit);

	TBoolReply CreateSystem(1: string system),
	#TBoolReply deleteSystem(1: string system),
	TSystemsReply GetSystems();
}
