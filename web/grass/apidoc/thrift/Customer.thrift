namespace objc TRCustomer
namespace csharp Zen.DataAccess.User
namespace javascript TRPC
namespace java com.daigou.sg.rpc.customer
namespace swift TR

include "Common.thrift"

struct TCustomer {
	1: required i32 id;					//用户id
	2: required string nickName;		//用户昵称
	3: required string email;			//用户邮箱
	4: required string telephone;		//用户电话
	5: optional bool isPrime;			//是否是prime会员	
}

struct TPrimeSetting {
	1: required bool primer;				//是否是prime会员
	2: required bool displayPrimeZone;		//是否显示prime专区
	3: optional bool isPrimeCheckoutAvailable; // 是否可以在Prime购物车chekcout
	4: optional string primeStartDate;		//prime开始时间
	5: optional string primeEndDate;		//prime结束时间
}

struct TCustomerDefaultInfo {
	1: required i32 id;						//用户id
	2: required string customerLevel;		//用户等级
	3: optional i32 vouchers;				//抵用券
	4: required i32 credits;				//积分
	5: required i32 enquiryCount;			//咨询个数
	6: required i32 reviewCount;			//带查看的评论数
	7: optional string headPortraits;		//头像
	8: required string defaultLanguage;		//默认语言
	9: required bool ezShipping;			//是否订单全到仓库默认一起打包发货
	10: required bool newsLetter;			//是否开启通知
	11: required bool notification;			//是否开启消息推送
	12: required string notificationEmail;	//通知邮箱
	13: required string sex;				//性别
	14: required string birthDate;			//生日
	15: optional list<TOriginSetting> originSettings;  //默认运输方式
	16: required TPrimeSetting primeInfo;				//prime相关
	17: required bool newCartEnable;
	18: required string frequentTelephone;
}

struct TVoucher {
	1: required i32 id;						//id
	2: required string voucherNumber;		//抵用卷号
	3: required string altVoucherName;		//抵用券名称
	4: required i32 faceValue;				//积分
	5: required string voucherImage;		//抵用卷图片
	6: required string endDate;				//抵用卷截止日期
}

struct TOriginSetting {
	1: required string originCode;			//采购国家
	2: required i32 shipmentTypeId;			//运输方式
	3: required string warehouseCode;		//仓库
	4: required string altWarehouseName;	//仓库显示名
	5: required string altShipmentTypeName;	//运输方式显示名
}

struct TCreditItem {
	1: required i32	oldCredit;		//旧积分
	2: required i32	newCredit;		//新积分
	3: required i32	changedCredit;	//变化的积分
	4: required string creditDate;	//记录日期
	5: required string remark;		//积分原因
}

struct TCustomerCredit {
	1: required i32 customerCreditId;
	2: required i32 oldCredit;
	3: required i32 credit;
	4: required i32 newCredit;
	5: required string creditDate;
	6: required string remark;
}

struct TCustomerCreditSummary {
    1: required i32 credits;
    2: required i32 creditsExpiringThisMonth;
}

struct TFavoritesItem {
	1: required string Url;
	2: required string ProductName;
	3: required string ProductImage;
	4: required double Price;
	5: required string VendorName;
}

struct TProductCategory {
	1: required i32 ProductCategoryId;
    2: required string CategoryName;
    3: required string OrderBy;
    4: required string AltCategoryName;
    5: required bool IsShow;
}

struct TCustomerRemindInfo {
	1: required i32 Credits;
	2: required i32 EnquiryCount;
	3: required i32 ReviewCount;
	4: required i32 AddressCount;
}

struct TRenewSessionResult {
	1: required bool isAuthroized;
	2: required string message;
	3: optional string altMessage;
}

///带有是否可用信息的积分优惠券
struct TCreditVoucher {
    1: required i32 credit;				//积分
    2: required i32 offset; 			//积分对应的面值
    3: required string imageURL;		//图片信息
    4: required string title;			//名称
    5: required string voucherDescription // 描述
    6: required bool isAvailable;       //是否可用
}

struct TCreditAndVouchers {

    1: required i32 credit;
    2: required list<TCreditVoucher> vouchers
}

struct TBanner {
    1: required string name;            // 招贴名
    2: required string imageURL;        // 招贴图URL
    3: required string link;            // 招贴链接，可以为ezbuyapp:
    4: required string fallbackLink;    // 招贴链接，必须保证是http:，仅仅当link无法处理的时候使用该link
}

struct TBannerGroup {
    1: required string name;                        // 招贴组名
    2: required list<TBanner> banners;              // 招贴
    3: required TBannerGroupLayoutInfo layoutInfo;  // 布局信息
}

struct TBannerGroupLayoutInfo {
    1: required string layoutType;      // 布局模式，可用值：“FULL”（全屏宽度布局，可左右切换），“HORIZONTAL”(水平布局)
    2: required double unitBannerRatio; // 单元招贴的比例：width : height
}

struct TCustomerPhoneSummary {
    1: required string phoneNumber;      
    2: required bool havePhone; 
	3: required bool haveVerified; 
}

struct TCustomerStatistics {
    1: required i32 customerReigsterDay;      
    2: required bool haveOrderForCustomer; 
}

struct TCustomerComment {
	1:required i32 customerComment;
	2:required string packageNumber;
	3:required string serviceComment;
	4:required string caption;
	5:required string comment;
	6:required string answer;
	7:required string commentDate;
	8:required string answerDate;
	9:required i32 parcels;
}

service User {

	/// <summary>
	/// 用户登录
	/// </summary>
	/// <param name="nickName">用户名/邮箱</param>
	/// <param name="password">密码</param>
	/// <returns>用户信息</returns>
	TCustomer Login(1:string nickName, 2:string password),

	/// <summary>
	/// 更新消息推送token
	/// </summary>
	/// <param name="deviceId">登录设备Id</param>
	/// <param name="deviceInfo">登录设备信息</param>
	/// <param name="deviceToken">登录设备Token</param>
	void UserUpdateCustomerDeviceToken(1:string deviceId, 2:string deviceInfo, 3:string deviceToken),

	/// <summary>
	/// 修改用户密码
	/// </summary>
	/// <param name="oldPassword">旧密码</param>
	/// <param name="newPassword">新密码</param>
	/// <returns>是否修改成功</returns>
	bool ChangePassword(1:string oldPassword, 2:string newPassword),

	/// <summary>
	/// 验证用户密码
	/// </summary>
	/// <param name="password">密码</param>
	/// <returns>是否验证成功</returns>
	bool CheckPassword(1:string password),

	/// <summary>
	/// 忘记密码，发送邮件，重置密码
	/// </summary>
	/// <param name="nickName">用户名/邮箱</param>
	/// <returns>是否发送成功</returns>
	bool ForgetPassword(1:string nickName),

	/// <summary>
	/// 用户注册
	/// </summary>
	/// <param name="nickName">用户名</param>
	/// <param name="email">邮箱</param>
	/// <param name="password">密码</param>
	/// <param name="telephone">电话号码</param>
	/// <param name="userHostAddress">用户登录ip</param>
	/// <param name="facebookId">facebook id</param>
	/// <param name="facebookAccessToken">facebook token</param>
	/// <returns>用户信息</returns>
	TCustomer Register(1:string nickName, 2:string email, 3:string password, 4:string telephone, 5:string userHostAddress),

	/// <summary>
	/// Facebook相关操作
	/// </summary>
	 /// <param name="operation">Facebook操作</param>
	/// <param name="nickName">用户名</param>
	/// <param name="email">邮箱</param>
	/// <param name="password">密码</param>
	/// <param name="telephone">电话号码</param>
	/// <param name="userHostAddress">用户登录ip</param>
	/// <returns>用户信息</returns>
	TCustomer FacebookOperation(1:string operation, 2:string nickName, 3:string email, 4:string password, 5:string telephone,
	 6:string facebookId, 7:string facebookAccessToken, 8:string userHostAddress),

	/// <summary>
	/// 登出
	/// </summary>
	void Logout(),

	/// <summary>
	/// 获取用户默认设置
	/// </summary>
	/// <returns>用户默认信息</returns>
	TCustomerDefaultInfo UserGetCustomerDefaultValues(),

	/// <summary>
	/// 获取用户积分列表
	/// </summary>
	/// <returns>用户积分列表</returns>
	list<TCreditItem> GetCreditHistory(),

	/// <summary>
	/// 上传用户头像
	/// </summary>
	/// <param name="headPortraitsUrl">头像地址</param>
	void UploadHeadPortraits(1:string headPortraitsUrl),

	/// <summary>
	/// 上传用户头像
	/// </summary>
	/// <param name="headPortraitsUrl">头像地址</param>
	Common.TCommonResult UploadHeadPortraitsByUrl(1:string headPortraitsUrl),
	
	/// <summary>
	/// 更新用户默认设置
	/// </summary>
	/// <param name="customerDefaultInfo">用户默认设置信息</param>
	void UpdateDefaultSetting(1:TCustomerDefaultInfo customerDefaultInfo),

	/// <summary>
	/// 用facebookid登录
	/// </summary>
	/// <param name="facebookId">facebook Id</param>
	/// <param name="facebookAccessToken">facebook token</param>
	/// <returns></returns>
	TCustomer LoginByFacebook(1:string facebookId, 2:string facebookAccessToken),

	/// <summary>
	/// 获取已登录的用户信息
	/// </summary>
	/// <returns></returns>
	TCustomer GetCustomer(),

	/// <summary>
	/// 用户信息验证是否成功
	/// </summary>
	/// <returns></returns>
	bool BoLogin(1:string CustomerName, 2:string Password),

	/// <summary>
	/// 收藏夹添加或删除商品
	/// </summary>
	/// <returns></returns>
	bool UserCustomerFavouriteOperate(1:string Operate, 2:string AgentProductIds),

	/// <summary>
	/// 定制货币符号显示
	/// </summary>
	/// <returns></returns>
	bool UserCustomizedCurrencyDisplayMode(1:string DisplayMode),

	/// <summary>
	/// 定制iPad白天黑夜模式
	/// </summary>
	/// <returns></returns>
	bool UserCustomizedNightMode(1:bool IsUseNightMode),

	/// <summary>
	/// 用户定制商品分类显示
	/// </summary>
	/// <returns></returns>
	bool UserCustomizedProductCategory(1:i32 ProductCategoryId, 2:bool IsShow),

	/// <summary>
	/// 获取会员积分历史记录
	/// </summary>
	/// <returns></returns>
	list<TCustomerCredit> UserGetCustomerCreditHistory(1:i32 offset, 2:i32 limit),

	/// <summary>
	/// 获取我的收藏
	/// </summary>
	/// <returns></returns>
	list<TFavoritesItem> UserGetCustomerFavourite(1:i32 PageIndex, 2:i32 PageSize),

	/// <summary>
	/// 获取客户定制的产品分类列表
	/// </summary>
	/// <returns></returns>
	list<TProductCategory> UserGetCustomerProductCategories(1:bool IsLogined, 2:string originCode),

	/// <summary>
	/// 获取会员基本提示信息
	/// </summary>
	/// <returns></returns>
	TCustomerRemindInfo UserGetCustomerRemindInfo(),

	/// <summary>
	/// 验证用户登录的账户信息是否正确
	/// </summary>
	/// <returns></returns>
	bool LoginForWeb(1:string FacebookId, 2:string FacebookAccessToken, 3:string CustomerNickName, 4:string Password, 5:string RedirectUrl),

	/// <summary>
	/// 检测当前用户是否处于登录状态
	/// </summary>
	/// <returns></returns>
	TRenewSessionResult UserRenewSession(1:string sessionId),

	/// <summary>
	/// 修改用户默认设置
	/// </summary>
	/// <returns></returns>
	bool UserUpdateCustomerDefaultSetting(1:string Telephone, 2:string NotificationEmail, 3:bool EZShipping, 4:string DefaultLanguage, 5:bool NewsLetter, 6:bool Notification,
            7:string Sex, 8:string BirthDate),

	/// <summary>
	/// 修改用户默认运输方式和仓库
	/// </summary>
	/// <returns></returns>
	bool UserUpdateCustomerDefaultShippingMethod(1:string OriginCode,2:i32 ShipmentTypeId, 3:string WarehouseCode),

	/// <summary>
	/// 上传头像
	/// </summary>
	/// <returns></returns>
	bool UserUploadHeadPortraits(),

	/// <summary>
	/// 设置客服回复评论已查看 implements by go
	/// <summary>
	bool UserSetCustomerComment(1:i32 commentId),

	/// <summary>
	/// 获取用户可以使用的优惠卷类型
	/// </summary>
	list<TVoucher> UserFindVoucherByCustomer(),

    /// <summary>
    /// 获取积分优惠卷列表
    /// </summary>
    /// <returns>积分优惠卷列表</returns>
    TCreditAndVouchers UserGetCreditVouchers(),

    /// 获取招贴数据
    /// “Home.Top” "Home.Middle" "Prime.Top" "Prime.Middle"
    /// <param name="identifier">模块组标识</param>
    /// <returns>招贴组集合</returns>
    list<TBannerGroup> UserGetBanners(1:string identifier),

    /// 获取用户积分数据
    /// <returns>用户积分数据</returns>
    TCustomerCreditSummary UserGetCreditSummary(),
	
	TCustomerPhoneSummary UserGetPhoneSummary(),
	
	// Return Values:
	// 0: ok
	// 1: phone used
	// 2: Invalid phone
	// 4: System Busy
	// 8: 30 min only sent 5 otp
	i32 UserSendCode(1: string phone),
	
	// Return Values:
	// 0: ok
	// 1: phone used
	// 2: Invalid code
	// 4: Invalid phone
	i32 UserUpdatePhoneNumber(1: string phone, 2: string code),
	
    TCustomerStatistics UserGetCustomerStatistics(),
	
	list<TCustomerComment> UserGetCustomerCommentList(1:i32 offset, 2:i32 limit),
	
	bool UserSetCustomerCommentViewed(1:i32 customerCommentId),
}
