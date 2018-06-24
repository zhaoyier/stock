namespace * Utility
namespace csharp Zen.DataAccess.Utility
namespace java com.daigou.sg.rpc.utility
namespace objc TRUtility
namespace javascript TRPC
namespace swift TRUtility

struct TPromotionAd {
	1: required string promotionName;	// 广告名
	2: required string imagePath;		// 广告图url
	3: required string hyperLink;		// 广告链接
}		 

struct TShipmentType {
	1: required i32 id;						// 运输方式id		
	2: required string originCode;			// 采购国家	
	3: required string shipmentTypeCode;	// 运输方式编号
	4: required string shipmentTypeName;	// 运输方式名称	
	5: required string altShipmentTypeName;	// 运输方式英文名称
	6: required double minimumWeightFee;		// 重量起征点500克的国际运费
	7: required double continueWeightFee;		// 大于500克之后的每500克的运费
	8: required string estimatedEtaDays;	// 花费天数预估说明
	9: required string desc;				// 描述
}

struct TWarehouse {
	1: required string warehouseCode;		//仓库编号
	2: required string altWarehouseName;	//仓库英文名
	3: required string originCode;			//采购国家
}

struct TBasicInfo {
	1: required string faqUrl;					//FAQ url
	2: required string customerServiceEmail;	//客服邮箱
	3: required string hotline;					//热线电话
	4: required string address;					//地址
	5: required string quickGuideUrl;			//quick guide url
	6: required string addressDescription;		//地址描述
	7: required string smallMapUrl;				//小地图url
	8: required string bigMapUrl;				//大地图url
	9: required double leastVersion;			//API最低版本
}

struct TExchangeRate {
	1:required string originCode;	//采购国家
	2:required double rate;			//站内产品汇率
	3:required double outExchangeRate;  //站外产品汇率
	4:required string priceSymbol;	//货币符号
}

struct TShippingFee {
	1:required string warehouse;	//仓库
	2:required double fee;			//运费
}

struct TGuidePage {
	1:required list<string> pics;	//图片
	2:required i32 version;			//版本
	3:required string expireDate;	//过期时间
	4:required i32 displayTimes;	//显示次数
	5:required string startDate;	//开始时间
}

struct TDiscountType {
	1:required string originCode;
	2:required string discountType;
	3:required string discountTypeName;
}

struct TTopUpBank {
	1:required string bankName;		//银行名
	2:required string accountInfo;	//银行信息
}

struct TMoreParameters
{
	1: required string customerServiceEmail;
	2: required string hotline;
	3: required string address;
	4: required string googleMapImage;
	5: required string quickGuideUrl;
	6: required string faqUrl;
	7: required i32 countInEachPage;
	8: required string isApiRunning;
	9: required string serviceDownNotice;
	10: required string leastVersion;
	11: required string leastVersionNotice;
	12: required double gstStandard;
	13: required double gstPercentage;
	14: required string needPostBackException;
	15: required string needCompressInGzip;
	16: required TMap map;
	17: required bool newCartEnable;
	18: required string leastVersionUpdateUrl;
}

struct TMap
{
   1: required string description;
   2: required string smallMap;
   3: required string bigMap;
}

service Utility {

	/// <summary>
	/// 获取银行列表
	/// </summary>
	/// <returns>银行列表</returns>
	list<TTopUpBank> GetAllBanks(),

	/// <summary>
	/// 获取汇率列表
	/// </summary>
	/// <returns>汇率列表</returns>
	list<TExchangeRate> GetExchangeRate(),

	/// <summary>
	/// 获取广告列表
	/// </summary>
	/// <param name="moduleName">模块名</param>
	/// <param name="originCode">采购国家</param>
	/// <returns>广告列表</returns>
	list<TPromotionAd> GetPromotionAdList(1:string moduleName , 2:string originCode),

	/// <summary>
	/// 获取运输方式列表
	/// </summary>
	/// <returns>运输方式列表</returns>
	list<TShipmentType> GetShippingMethod(),

	/// <summary>
	/// 获取仓库列表
	/// </summary>
	/// <returns>仓库列表</returns>
	list<TWarehouse> GetWarehouse(),

	/// <summary>
	/// 获取基础信息
	/// </summary>
	/// <returns>基础信息</returns>
	TBasicInfo GetBasicInfo(),

	/// <summary>
	/// 获取图片上传token
	/// </summary>
	/// <returns>图片上传token</returns>
	string GetUserUploadToken(),

	/// <summary>
	/// 获取国内运费
	/// </summary>
	/// <param name="productUrl">商品url</param>
	/// <param name="originCode">采购国家</param>
	/// <returns>商品国内运费</returns>
	list<TShippingFee> GetInternalShipmentFee(1:string productUrl, 2:string originCode),

	/// <summary>
	/// 获取引导页图片
	/// </summary>
	/// <param name="screenVersion">屏幕尺寸</param>
	/// <returns>引导页图片</returns>
	TGuidePage GetGuidePage(1:string screenVersion),

	list<TDiscountType> GetDiscountTypes(),

	//// countryAbbreviation [SG,MY,AUS]
	bool KonotorIsAvailable(1:string countryAbbreviation),

    /// <summary>
    /// 临时介绍界面的控制标识
    /// </summary>
    /// <returns>控制标识</returns>
    bool TemporaryIntroductionIncludingUSContent(),
	
	/// <summary>
    /// 获取程序所有配置和URL地址参数
    /// </summary>
    /// <returns>获取程序所有配置和URL地址参数</returns>
	TMoreParameters GetMoreParameters()
}
