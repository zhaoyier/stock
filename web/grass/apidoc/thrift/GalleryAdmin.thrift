namespace go ezbuy.apidoc.galleryadmin

struct TGallery {
	1:required string id;
	2:required string platform; # WEB, APP
	3:required string picURL;
	4:required string URL;
	5:required i32 sort;
	6:required bool online;
}

service GalleryAdmin {
	bool UpdatePics(1:string picURL, 2:list<string> ids),

	bool AddGallery(1:string catalogCode, 2:string platform, 3:string picURL, 4:string URL, 5:i32 sort),
	bool UpdateGallery(1:string id, 2:string picURL, 3:string URL, 4:i32 sort),
	list<TGallery> GetGalleries(1:string catalogCode);
	bool DeleteGallery(1:string id),

	bool OnlineGallery(1:string id),
	bool OfflineGallery(1:string id),
}
