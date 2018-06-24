namespace * Enquiry
namespace csharp Zen.DataAccess.Enquiry
namespace javascript TRPC
namespace java com.daigou.sg.rpc.enquiry
namespace swift TP

struct TEnquiry {
	1: required i32 id;					//咨询id
	2: required string caption;			//标题
	3: required string content;			//内容
	4: required string updateDate;		//更新时间
	5: required string originCode;		//采购国家
	6: required i32 serviceTypeId;		//服务类型
	7: required i32 enquiryCategoryId;	//咨询类别
	8: required string referenceNo;		//引用号
	9: required string ticketNo;		//票号
	10: optional string attachments;	//附件
	11: optional string newestQuestion;	//最新问题
	12: optional string newestAnswer;	//最新回复
	13: required bool canDelete;		//是否可以删除
}

struct TEnquiryItem {
	1: required i32 id;				//咨询项id
	2: required i32 parentId;		//咨询项父id
	3: required string content;		//内容
	4: required string updateBy;	//更新者
	5: required string updateDate;	//更新时间
	6: optional string attachments;	//附件
	7: required bool canDelete;		//是否可以删除
}

struct TEnquiryServiceType {
	1: required i32 id;					//服务类型id
	2: required string purchaseType;	//采购类型
	3: required string serviceName;		//服务英文名
	4: required string altServiceName;	//服务中文名
}

struct TEnquiryCategory {
	1: required i32 enquiryCategoryId;	//咨询类别id
	2: required string enquiryCode;		//咨询类别编号
	3: required string altEnquiry;		//咨询类别名
	4: required string replyDay;		//咨询回复时间
}

struct TEnquiryDetail {
	1: required i32 CustomerServiceItemId;
	2: required i32 CustomerServiceId;
	3: required i32 CustomerId;
	4: required i32 UserId;
	5: required string Caption;
	6: required string Content;
	7: required string IsActive;
	8: required string CreateBy;
	9: required string CreateDate;
	10: required string UpdateBy;
	11: required string UpdateDate;
	12: required string Type;
	13: required string CatalogCode;
	14: required string AskAttachment;
	15: required string IsViewed;
	16: required string IsReplied;
	17: required bool IsCompleted;
	18: required bool CanDelete;
	19: required i32 RowNumber;
	20: required i32 ParentId;
	21: required string OriginCode;
	22: required i32 ServiceTypeId;
	23: required i32 EnquiryCategoryId;
	24: required string ReferenceNo;
	25: required string TicketNo;
	26: required i32 ConsultCount;
	27: required string NewestQuestion;
	28: required string NewestAnswer;
}

struct TEnquiryDetailInfo {
	1: required list<TEnquiryDetail> Enquiries;
    2: required i32 TotalCount;
}

struct TEnquiryCategoryInfo {
	1: required list<TEnquiryCategory> EnquiryCategories;
    2: required list<TServiceType> ServiceTypes;
}

struct TServiceType {
	1: required i32 ServiceTypeId;
	2: required string PurchaseType;
	3: required string ServiceName;
	4: required string AltServiceName;
}

service Enquiry {

	/// <summary>
	/// 新增用户咨询 implements by c#
	/// </summary>
	/// <param name="enquiry">用户咨询</param>
	/// <returns>用户咨询id</returns>
	i32 UserSaveEnquiries(1:TEnquiry enquiry, 2:i32 parentId),

	/// <summary>
	/// 新增用户咨询项 implements by c#
	/// </summary>
	/// <param name="enquiryItem">用户咨询项</param>
	/// <returns>用户咨询项id</returns>
	i32 UserAddNewEnquiryItem(1:TEnquiryItem enquiryItem),

	/// <summary>
	/// 删除用户咨询
	/// </summary>
	/// <param name="enquiryId">用户咨询id</param>
	bool UserDeleteEnquiry(1:i32 enquiryId),

	/// <summary>
	/// 删除用户咨询项
	/// </summary>
	/// <param name="enquiryItemId">用户咨询项id</param>
	bool UserDeleteEnquiryItem(1:i32 enquiryItemId),

	/// <summary>
	/// 设置用户咨询已查看 implements by c#
	/// </summary>
	/// <param name="enquiryId">用户咨询id</param>
	void UserSetEnquiryView(1:i32 enquiryId),

	/// <summary>
	/// 关闭咨询
	/// </summary>
	/// <param name="enquiryId">用户咨询id</param>
	bool UserResolveEnquiry(1:i32 enquiryId),

	/// <summary>
	/// 获取咨询类别
	/// </summary>
	/// <returns>咨询类别</returns>
	TEnquiryCategoryInfo UserGetEnquiryCategories(),

	/// <summary>
	/// 获取咨询服务类型
	/// </summary>
	/// <returns>咨询服务类型</returns>
	list<TEnquiryServiceType> GetServiceTypes(),

	/// <summary>
	/// 获取用户咨询列表
	/// </summary>
	/// <returns>用户咨询列表</returns>
	TEnquiryDetailInfo UserGetEnquiriesList(1:i32 pageIndex, 2:i32 pageSize, 3:bool isCompleted),

	/// <summary>
	/// 获取用户单个咨询列表项
	/// </summary>
	/// <param name="enquiryId">咨询id</param>
	/// <returns>单个咨询列表项</returns>
	list<TEnquiryDetail> UserGetEnquiries(1:i32 enquiryId)
}
