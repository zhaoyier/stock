namespace go ezbuy.apidoc.gen.productchangelog

struct Changelog {
    1:required string refid;
    2:required map<string, string> props;
    3:required string updateBy;
    4:required i64 updateDate;
}

service ProductChangelog {
	# refid为商品id
	# 时间格式为yyyy-MM-dd HH:mm:ss
	# 接口默认按照修改时间倒序排列
    list<Changelog> List(1:string refid, 2:i64 startDate, 3:i64 endDate, 4:i32 offset, 5:i32 limit)
}
