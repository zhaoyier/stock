namespace go trpc

struct TDelivery {
    1:required i32 deliveryNum;
    2:required double deliveryUnitPrice;
    3:required double totalPrice;
}

struct TRegist {
    1:required i32 num;
    2:required double registUnitPrice;
    3:required double totalPrice;
    4:required i32 registType; //0表示Web 1表示App
}

struct TSales {
    1:required i32 saleOrder;
    2:required double revenue;
    3:required string rate; //比率
    4:required double totalPrice;
    5:required bool isFirst; //是否为首单
}

struct TPlaceOrder {
    1:required i32 customerCount; //下单用户量
    2:required double placeOrder; //下单佣金
    3:required double orderTotal; //下单总金额
}

struct TMyJoinReply {
    1:required TDelivery delivery;
    2:required list<TRegist> regist;
    3:required list<TSales> sales;
    4:required double totalPrice;
    5:required TPlaceOrder order;
    6:required double specialBonus;
    7:required TSales normalSale; //普通订单
}

struct TPrePayHistorySummary{
	1:required bool hasEzbuyAccount;
	2:required double prePay;
	3:required list<TTransferHistory> prePayHistories;
}

struct TTransferHistory{
	1:required string transferCustomerName;
	2:required string transferAmount; //带符号
	3:required string transferDate;
}

struct TTransferResult{
	1:required string message;
	2:required bool status;
}

struct TRegistrationUser{
	1:required string userName;
	2:required string phone;
	3:required i32 orderNumber;
	4:required string orderAmount;
}

struct TRegistrationCommisionResult{
	1:required i32 totalAmount;
	2:required list<TRegistrationUser> users;
}

service NewDelivery {
	//得到订单数（马来合作卖家）
	TMyJoinReply UserGetJoinIn(1:string startTime,2:string endTime),

	TPrePayHistorySummary UserGetPrePayHistorySummary(),
	TTransferResult UserTransferToCustomer(1:string customerName,2:double amount,3:string catalog),
	bool UserCheckPassword(1:string password),
	TRegistrationCommisionResult UserGetRegistrationCommision(1:string startTime,2:string endTime, 3:i32 registType),//registType:0表示Web 1表示App
}
