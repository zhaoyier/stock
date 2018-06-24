namespace go ezbuy.apidoc.gallery

struct TGallery {
	1:required string picURL;
	2:required string URL;
	3:required i32 sort;
}

service Gallery {
	// 根据平台和国家，获取轮播图
	// platform: WEB APP
	// catalogCode: 默认为SG，如果不传，则从url中获取
	list<TGallery> GetGalleries(1:string platform, 2:string catalogCode);
}
