namespace go ezbuy.apidoc.giftcard
namespace java com.daigou.sg.webapi.giftcard
namespace swift TR

struct TGiftCardCode {
	1:required string code;
	2:required i32 value;
	3:required i64 activateDate;
}

struct TCodesActivatedRsp {
	1:required i32 total;
	2:required list<TGiftCardCode> data;
}

enum APIExceptionCode {
	None = 0
	InvalidParam = 1
	MaxLimit
}

exception APIException {
	1:required APIExceptionCode code
	2:required string message
}

service GiftCard {
	// 1:成功 2:一般意义的失败 3:已激活 4:被屏蔽，过段时间再试
	i32 ActivateCode(1:string code);

	// 通过cookie获取用户id
	TCodesActivatedRsp GetCodesActivated(1:i32 offset, 2:i32 limit);

	list<string> GenerateCodes(1:i32 count, 2:i32 value, 3:string catalogCode, 4:string channel, 5:string description) throws (1:APIException exception)

	bool UpdateChannelLimit(1:string channel, 2:string catalogCode, 4:bool limit) throws (1:APIException exception)

	bool UpdateChannelHourLimit(1:string channel, 2:string catalogCode, 4:i16 hour) throws (1:APIException exception)

	bool RevokeCode(1:list<string> codes) throws (1:APIException exception)
}
