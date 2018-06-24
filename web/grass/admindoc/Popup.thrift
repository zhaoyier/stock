namespace go trpc

struct TPopupBanner {
	1:required string id;
	2:required string name; //bannerName
	3:required string picture; //七牛的图片token
	4:required string url;
	5:required string countryCode;
	6:required string startDate; //20060102
	7:required string endDate; //20060102
}

service Popup{
	//编辑PopupBanner
	bool  EditBanner(1:TPopupBanner banner)

	//增加PopupBanner 返回唯一id
	string  AddBanner(1:TPopupBanner banner)

	//根据国家得到所有PopupBanner
	list<TPopupBanner> Search(1:string countryCode)
	
}
