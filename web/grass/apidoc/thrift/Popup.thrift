namespace go ezbuy.apidoc.gen.Popup
namespace java com.daigou.sg.webapi.popup
namespace swift TR

struct TPopup{
	1:required string name; //bannerName
	2:required string picture; //七牛的图片token
	3:required string url;
}

service Popup{
	//获得Url
	TPopup GetPopupBanner(1:string countryCode)
}
