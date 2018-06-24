namespace go ezbuy.apidoc.coinvoucherexadmin

struct Exchange {
	1:required string id;
	2:required string catalogCode; # SG, MY, TH, AU, ID
	3:required i64 voucherID;
	4:required i32 coin;
}

service CoinVoucherExAdmin {
	bool AddExchange(1:string catalogCode, 2:i64 voucherID, 3:i32 coin),
	bool UpdateExchange(1:string id, 2:i64 voucherID, 3:i32 coin),
	list<Exchange> GetExchanges(1:string catalogCode);
	bool DeleteExchange(1:string id),
}
