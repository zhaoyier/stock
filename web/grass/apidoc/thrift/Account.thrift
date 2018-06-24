namespace go trpc
namespace java com.daigou.sg.webapi.account
namespace swift TR

// 参数格式：json

// 调用方式：POST $(站点)/api/Account/$(接口)

// 正式站点：
// http://dpns.65daigou.com
// http://dpns.65daigou.com.my
// http://api.ezbuy.com
// http://api.id.ezbuy.com
// http://dpns.my.ezbuy.com
// http://dpns.au.ezbuy.com
// http://dpns.ezbuy.sg

struct TResult {
    // Return Values:
    // 0: ok
    // 30001: Email used
    // 30002: Invalid Email
    // 30003: Username used
    // 30004: Invalid Username
    // 30005: Phone used
    // 30006: Invalid phone
    // 30007: Invalid code
    // 30008: Invalid Password
    // 30009: Register error
    // 30010: 无效的access_token
    // 30011: 账号已经和facebook关联，但未设置密码
    // 30012: 账号已经和google关联，但未设置密码
    // 30013: 用户不存在
    // 30014: invalid userType, 无效的用户类型
    // 30015: email已经被占用并设置了密码，Facebook登录失败
    // 30016: email已经被占用并设置了密码，Google登录失败
    // 30017: 账号已经和google及facebook关联，但未设置密码
    // 30018: 两个第三方帐号绑定时，email不一致
    // 30019: 密码格式不对，必须是6-20个非空格字符
    // 30020: 会员已经被封杀
    // 30021: 无效的地区(area)
    // 30022: 手机验证码无效
    // 30023: 获取验证码次数过多
    // 30024: 第三方登录(facebook/google)新用户需要提供手机号码
    1: required i32 errorCode;

    2: required string errorMessage;
}

struct TUserInfo {
    1: required i32 customerId;
    2: required string customerName; // 用户email
    3: required string sessionId;
    4: optional double longitude;
    5: optional double latitude;
    6: required string deviceToken;
    7: required string nickName;
    8: required string selfHelpHandPhone;
    9: required string telephone;
    10: required bool isNew; // 第三方登录时，返回是否为新用户
}

struct TLoginInfo {
    1: required TResult result;
    2: required TUserInfo userInfo;
    3: required string customerCookie;
}

struct TForgetPasswordInfo {
    1: required TResult result;
    2: required string email;
}

struct TOauthLoginV2Params {
    1: required string area;
    2: required string userType;
    3: required string email;
    4: required string accessToken;
    5: required string userId;
    6: required string platform;
    7: required string deviceToken;
    8: required string UDID;
    9: required string deviceInfo;
    10: optional TRegisterStats stats;
}

struct TOauthLoginWithTelephoneParams {
    1: required string area;
    2: required string userType;
    3: required string email;
    4: required string accessToken;
    5: required string userId;
    6: required string platform;
    7: required string deviceToken;
    8: required string UDID;
    9: required string deviceInfo;
    10: required string telephone;
    11: required string verificationCode;
    12: optional TRegisterStats stats;
}

struct TReferrer {
    1: required i32 referrerId;
    2: required string name;
}

struct TRegisterStats {
    1:optional string identityId;
}

service Account {

    /// <summary>
    /// 用户注册
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="email">email</param>
    /// <param name="password">密码</param>
    /// <param name="userName">用户名</param>
    /// <param name="platform">注册平台</param>
    /// <param name="referrerId">可选参数: 通过什么渠道知道我们</param>
    /// <returns>用户信息</returns>
    TResult Register(1:string area, 2:string email, 3:string password, 4:string userName, 5:string platform, 6:optional i32 referrerId, 7:optional string source, 8:optional TRegisterStats stats),

    /// <summary>
    /// 用户登录
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="userNameOrEmail">email/userName</param>
    /// <param name="password">密码</param>
    /// <param name="platform">登录平台</param>
    /// <param name="deviceToken">设备token</param>
    /// <param name="UDID">UDID</param>
    /// <param name="deviceInfo">设备信息</param>
    /// <returns>登录信息</returns>
    TLoginInfo Login(1:string area, 2:string userNameOrEmail, 3:string password, 4:string platform, 5:string deviceToken, 6:string UDID, 7:string deviceInfo),

    /// <summary>
    /// oauth登录
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="userType">用户类型(facebook/google)</param>
    /// <param name="email">email</param>
    /// <param name="accessToken">accessToken</param>
    /// <param name="userId">该第三方登录的用户唯一标识</param>
    /// <param name="platform">登录平台</param>
    /// <param name="deviceToken">设备token</param>
    /// <param name="UDID">UDID</param>
    /// <param name="deviceInfo">设备信息</param>
    /// <returns>登录信息</returns>
    TLoginInfo OauthLogin(1:string area, 2:string userType, 3:string email, 4:string accessToken, 5:string userId, 6:string platform, 7:string deviceToken, 8:string UDID, 9:string deviceInfo, 10:optional TRegisterStats stats),


    /// <summary>
    /// oauth登录绑定
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="userType">用户类型(facebook/google)</param>
    /// <param name="email">email</param>
    /// <param name="password">密码</param>
    /// <param name="accessToken">accessToken</param>
    /// <param name="userId">该第三方登录的用户唯一标识</param>
    /// <param name="platform">登录平台</param>
    /// <param name="deviceToken">设备token</param>
    /// <param name="UDID">UDID</param>
    /// <param name="deviceInfo">设备信息</param>
    /// <returns>登录信息</returns>
    TLoginInfo OauthBind(1:string area, 2:string userType, 3:string email, 4:string password, 5:string accessToken, 6:string userId, 7:string platform, 8:string deviceToken, 9:string UDID, 10:string deviceInfo),

    /// <summary>
    /// 不同的oauth互相关联
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="oldUserType">已经关联的用户类型(facebook/google)</param>
    /// <param name="oldAccessToken">accessToken</param>
    /// <param name="oldUserId">唯一标识</param>
    /// <param name="newUserType">尚未关联的用户类型(facebook/google)</param>
    /// <param name="newAccessToken">accessToken</param>
    /// <param name="newUserId">唯一标识</param>
    /// <param name="platform">登录平台</param>
    /// <param name="deviceToken">设备token</param>
    /// <param name="UDID">UDID</param>
    /// <param name="deviceInfo">设备信息</param>
    /// <returns>登录信息</returns>
    TLoginInfo OauthMutualBind(1:string area, 2:string oldUserType, 3:string oldAccessToken, 4:string oldUserId, 5:string newUserType, 6:string newAccessToken, 7:string newUserId, 8:string platform, 9:string deviceToken, 10:string UDID, 11:string deviceInfo),

    /// <summary>
    /// 找回密码
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="emailOrUserId">用户的邮箱地址或者用户ID</param>
    /// <returns>结果</returns>
    TForgetPasswordInfo ForgetPassword(1:string area, 2:string emailOrUserId),

    /// <summary>
    /// 发送验证码
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="phone">手机号码</param>
    /// <returns>结果</returns>
    TResult SendPhoneVerificationCode(1:string area, 2:string phone),

    /// <summary>
    /// 注册前检查参数
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="email">email</param>
    /// <param name="password">密码</param>
    /// <param name="userName">用户名</param>
    /// <param name="platform">注册平台</param>
    /// <returns>结果</returns>
    TResult PreRegister(1:string area, 2:string email, 3:string password, 4:string userName, 5:string platform, 6:optional TRegisterStats stats),

    /// <summary>
    /// 带手机号码注册
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="email">email</param>
    /// <param name="password">密码</param>
    /// <param name="userName">用户名</param>
    /// <param name="platform">注册平台</param>
    /// <param name="telephone">手机</param>
    /// <param name="verificationCode">手机验证码</param>
    /// <param name="referrerId">可选参数: 通过什么渠道知道我们</param>
    /// <returns>结果</returns>
    TResult RegisterWithTelephone(1:string area, 2:string email, 3:string password, 4:string userName, 5:string platform, 6:string telephone,  7:string verificationCode, 8:optional i32 referrerId, 9: optional string source, 10:optional TRegisterStats stats),

    /// <summary>
    /// oauth登录
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="userType">用户类型(facebook/google)</param>
    /// <param name="email">email</param>
    /// <param name="accessToken">accessToken</param>
    /// <param name="userId">该第三方登录的用户唯一标识</param>
    /// <param name="platform">登录平台</param>
    /// <param name="deviceToken">设备token</param>
    /// <param name="UDID">UDID</param>
    /// <param name="deviceInfo">设备信息</param>
    /// <returns>登录信息</returns>
    TLoginInfo OauthLoginV2(1:TOauthLoginV2Params oauthParams),

    /// <summary>
    /// oauth登录
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <param name="userType">用户类型(facebook/google)</param>
    /// <param name="email">email</param>
    /// <param name="accessToken">accessToken</param>
    /// <param name="userId">该第三方登录的用户唯一标识</param>
    /// <param name="platform">登录平台</param>
    /// <param name="deviceToken">设备token</param>
    /// <param name="UDID">UDID</param>
    /// <param name="deviceInfo">设备信息</param>
    /// <param name="telephone">手机</param>
    /// <param name="verificationCode">手机验证码</param>
    /// <returns>登录信息</returns>
    TLoginInfo OauthLoginWithTelephone(1:TOauthLoginWithTelephoneParams oauthParamsWithPhone),

	/// <summary>
	/// 登出
	/// </summary>
	void UserLogout(),

    /// <summary>
    /// 获取用户可选渠道
    /// </summary>
    /// <param name="area">用户区域</param>
    /// <returns>渠道列表</returns>
    list<TReferrer> GetReferrerList(1:string area),
}
