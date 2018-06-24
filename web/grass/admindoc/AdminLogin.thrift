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
	TUserReply login(1: string username, 2: string password),
	TBoolReply logout(1: string username),

	TBoolReply createUser(1: string username, 2: string password),
	#TBoolReply deleteUser(1: string username),
	TBoolReply changePassword(1: string username, 2: string password, 3: string newPassword),
	TBoolReply assignSystemsToUser(1: string username, 2: list<string> systems),
	#TBoolReply deleteSystemsOfUser(1: string username, 2: list<string> systems),
	TUsersReply getUsers(),

	TBoolReply createSystem(1: string system),
	#TBoolReply deleteSystem(1: string system),
	TSystemsReply getSystems()
}
