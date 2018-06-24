namespace go ezbuy.apidoc.gen.ezspidersearch
namespace webapi api

service EZSpiderSearch {
	bool Submit(1:string url, 2:i16 page, 3:i16 startpage, 4:i16 minprice 5:i16 maxprice)

	// 返回下载文件的名称
	string Query(1:string url, 2:i16 page, 3:i16 startpage, 4:i16 minprice 5:i16 maxprice)
}

