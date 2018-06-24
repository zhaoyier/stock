namespace java com.daigou.sg.rpc.register
namespace objc TRRegister
namespace javascript TRPC
namespace swift TR

struct TUpdateUserCouponStatus {
	1: required bool status;			//coupon是否有效
	2: required string message;			//提示消息
}

struct TUserScanQRStatus {
	1: required i32 status;			    //0:ok, 1:customer used, 2:invalid customer
	2: required string message;			//提示消息
	3: required double amount;
}

struct TUserReferralInfo  {
	1: required string referralLink;			    
	2: required string total;			
	3: required string registrationTotal;
	4: required string fristOrderTotal;			
	5: required string registrationNum;
	6: required string fristOrderNum;		
}

service Register {
	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewUserSG(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password),


	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewLandingUserSG(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs),

	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewLandingUserMY(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs),

	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewLandingUserAU(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs),


	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewUserMY(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs),


	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	i32 ValidateInfo(1:string email, 2:string username),

	bool NeedPhoneValidation(),

	// Return Values:
	// 0: ok
	// 1: phone used
	// 2: Invalid phone
	// 4: System Busy
	i32 SendCode(1: string phone),

	TUpdateUserCouponStatus UserUpdateCustomerCoupon(1: string coupon),

	// Return Values:
	// true: ok
	// false: error
	bool RedPacketShared(1:string identId, 2:string redPacketOriginCode),

	// Return Values:
	// 0: ok
	// 1: phoneNumber is used and id is sql customer
	// 2: phoneNumber id shared
	// 4: identId error
	i32 RedPacketVerify(1:string identId, 2:string phoneNumber, 3:string redPacketOriginCode),

	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewRedPacketUserSG(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string identId),

	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewRedPacketUserMY(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string identId),

	// Return Values:
	// true: ok
	// false: error
	bool AddQRScanCount(1:string identId, 2:string originCode),

	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewQRUserSG(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string identId),

	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewQRUserMY(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string identId),
	
	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewQRUserTH(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string identId),
	
	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	i32 NewQRUserID(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string identId),

	// Return Values:
    // 0: ok
    // 1: Customer has used
    // 2: Customer is invalid
    // 4: Url is invalid
    // 8: Scan country inconsistent
    // 16: Need complete moblie
    // 32: Register out of qRCode time
	TUserScanQRStatus UserScanQR(1:string identId, 2:string originCode),
	
	// Return Values:
	// 0: ok
	// 1: Customer not login
	// 2: Invalid identId
	// 4: Invalid Customer
	// 8: Customer have scaned
	// 16: Customer not map identId
	// 32:Scan country inconsistent
	// 64:Register out of qRCode time
	i32 UserRegisterScanQR(1: string identId, 2:string area),
	
	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	// 512: Invalid invitationId
	i32 UserInvitationRegisterSG(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string invitationId),
	
	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	// 512: Invalid invitationId
	i32 UserInvitationRegisterMY(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string invitationId),
	
	// Return Values:
	// 0: ok
	// 1: Email used
	// 2: Invalid Email
	// 4: Username used
	// 8: Invalid Username
	// 16: phone used
	// 32: Invalid phone
	// 64: Invalid code
	// 128: Invalid Password
	// 256: register error
	// 512: Invalid invitationId
	i32 UserInvitationRegisterTH(1:string email, 2:string username, 3: string phone, 4: string code, 5: string password, 6: string knowUs, 7: string invitationId),
	
	//获取邀请注册对应信息
	TUserReferralInfo UserGetReferralInfo(),
}
