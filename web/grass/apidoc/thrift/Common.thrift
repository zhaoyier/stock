namespace * Common
namespace java com.daigou.sg.webapi.common
namespace go ezbuy.apidoc.gen.common
namespace javascript TRPC
namespace swift TR
namespace csharp EZRPC.Common.Entity

include "PrimeOrder.thrift"

enum TServiceType {
	Other = 0
	Buy4Me = 1
	Ship4Me = 2
	Ezbuy = 3
	Prime = 4
}

enum TRelatedType {
	Product = 1
	Parcel = 2
	Other = 3
}

struct TOrderSimple {
	1: required i32 orderID;
	2: required string orderNumber;
	3: required string itemName;
	4: required i32 quantity;
	5: required string price;
	6: optional string itemPic;
	7: required string sku;
	8: required string status;
	9: required string productUrl;
	10: required bool hasReview;
	11: required string productRemark;
	12: required i64 gpid;
	13: required string orderPrice;
	14: required string productPrice;
	15: optional list<PrimeOrder.TTitleValueItem> paymentInfo;
}

struct TProductCommon {
	1: required string url;
	2: required string name;
	3: required string pictureUrl;
	4: required string localUnitPrice;
	5: required string originalLocalUnitPrice;
	6: required string discountRate;
	7: required bool isCashOff;
	8: optional string cashOffColor;				// #123456
	9: required TIcon icon;                            # 右上角标
}

struct TCommonResult {
	1: required bool succeeded;
	2: optional string msg;
	3: optional i64 code;
	//----------对于部分使用了commonresult的接口，在不改变接口的情况下，在完全走grpc接口前，极其不情愿的在commonresult结构体加入冗余的字段
	4: optional string cartId;
}

struct TCommonItem {
	1: required string title;
	2: optional string text;
	3: optional string link;
	4: optional string fallbackLink;
	5: optional string imageURL;
}

struct TCommonValueItem {
	1: required string title;
	2: required string value;
}

struct TCommonValueItemsGroup {
	1: required string title;
	2: required list<TCommonValueItem> items;
}

struct TCommonOptionItem {
	1: required string code;
	2: required string name;
	3: optional string itemDescription;
}

struct TCommonOptionItemWithId {
	1: required i32 id;
	2: required string name;
	3: optional string itemDescription;
}

struct TPhoneVerificationCodeResult {
	1: required bool codeSent;	// 验证发是否已经发送
	2: required i32 validInterval; // 验证码有效时间（秒）
	3: optional string msg; // 附加信息
}

# 商品右上角角标, 可能是颜色加文案, 可能是图片
# 颜色可以为空, 为空时和cashoff角标一样颜色
struct TIcon {
	# 文案
	1:required string text;
	# 颜色 #FFFFFF
	2:required string color;
	# 图片链接
	3:required string img;
}

# 商品名左边的图标
struct TTitleIcon {
    1:required string icon;
    2:required string text;
    3:required string link;
    4:required string linkText;
}

struct TTable {
	1:required list<string> header;
	2:required list<TTableRow> rows;
}

struct TTableRow {
	1:required list<string> columns;
}
