namespace go ezbuy.apidoc.gen.ezspider
namespace webapi api

struct CrawlRet {
	1:required i32 shopId;
	2:required string shopType; // taobao tmall
	3:optional list<string> productIds;
}

service EZSpider {
	CrawlRet Crawl(1:string url),
}
