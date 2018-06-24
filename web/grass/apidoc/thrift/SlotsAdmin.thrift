namespace go ezbuy.apidoc.slotsadmin

struct Slots {
	1:required string id;
	2:required i32 coin;
	3:required list<Prize> prizes;
	4:required string pcBannerUrl;
	5:required string mobileBannerUrl;
}

struct Prize {
	1:required string id;
	2:required i32 prizeType;
	3:required i64 intValue;
	4:required string strValue;
	5:required string picURL;
	6:required i32 num;
	7:required double ratio;
	8:required list<PrizeRatio> ratios;
	9: required NotifyInfo notifyInfo;
}

enum PrizeType {
    None,
    Ecoin,
    Voucher,
    Other
}

struct PrizeRatio {
	1:required Group group;
	2:required double ratio;
}

struct Group {
	1:required i32 id;
	2:required string name;
}

// 用户
struct Winner {
	1:required i64 id;
	2:required string catalogCode;
	3:required string nickname;
	4:required string email;
	5:required string phone;
	6:required i64 winDate;
	7:required Prize prize;
}

struct NotifyInfo {
    1:required string emailTitle;
    2:required string emailContent;
    3:required string pushContent;
    4:required string smsContent;
}

struct ExportWinnerListFilter {
    1: string slotId;
    1: required i64 startDate;
    2: required i64 endDate;
}

enum ExportType {
    None,
    WinnerList
}

service SlotsAdmin {
	bool AddSlots(1:string catalogCode, 2:i32 coin, 3:list<Prize> prizes),
	bool UpdateSlotsCoin(1:string id, 2:i32 coin),
	bool AddPrize(1:string slotsID, 2:i32 prizeType, 3:i64 intValue, 4:string strValue, 5:string picURL, 6:i32 num, 7:double ratio, 8:NotifyInfo notifyInfo, 9:list<PrizeRatio> ratios),
	bool UpdatePrize(1:string id, 2:i64 intValue, 3:string strValue, 4:string picURL, 5:i32 num, 6:double ratio, 7:NotifyInfo notifyInfo, 8:list<PrizeRatio> ratios),
	bool DeletePrize(1:string id),

	Slots GetSlots(1:string catalogCode);
	string GetBanner(1:string catalogCode, 2:i16 platform); // catalogCode可传可不传，若不传，则从url中判断国家; platform: 0-PC; 1-Mobile
	bool UpdateBanner(1:string catalogCode, 2:string url, 3:i16 platform); // catalogCode可传可不传，若不传，则从url中判断国家

	bool AddFakeWinner(1:i64 userID, 2:string username, 3:string prizeID);

	bool UpdateCoinCommonBg(1:string picURL);
	string GetCoinCommonBg();

	bool UpdateCoinBg(1:string picURL,2:i32 coin);
	string GetCoinBg(1:i32 coin);

	list<Winner> GetWinners(1:string catalogCode, 2:i32 prizeType, 2:i32 offset, 3:i32 limit);
	string ExportWinnerList(1:ExportWinnerListFilter filter);
}
