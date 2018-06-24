namespace go ezbuy.apidoc.ezspiderjs

service EZSpiderJs {
	string Crawl(1:string url, 2:string taskType);

	// 根据淘宝搜索链接，抓取商品链接。若抓取成功，则将商品链接传回调用方，由调用方写入DB
	bool TaobaoSearch(1:string url, 2:i16 page);
}
