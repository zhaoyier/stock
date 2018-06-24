namespace go ezbuy.apidoc.gen.groupbuy

struct TGroupbuyProduct {
	1:required string productUrl;	//商品标准url
	2:required string productName;	//商品名称
	3:required string productImage; //商品图片
	4:required string localPrice;	//商品本地价格
	5:required i32 currentStock;	//当前库存值
	6:required string startTime;	//团购开始时间
	7:required string endTime;		//团购结束时间
	8:required i32 originStock;		//团购后台设置的最大库存值
	9:required double stockPercent;	//团购库存比例
	10:required i32 currentJoinCount;//当前参团人数
   	11:required string groupbuyNo;	//团购活动ID
    12:required i32 groupbuyStatus; // 团购当前状态，0：未开始，1：进行中，2：已结束
	13:required string productId;//商品 objectID
	14:required string tag;//商品类目
}

struct TSearchCondition{
	1:required i32 searchType;	//0:hot	1:starting on	2:comming soon
	2:required string tag;		//商品在后台设置的tag，为空表示all
//	3:required i32 offset;   // 请求列表起始索引
	3:required i32 limit;  // 一次请求列表数量
	4:required string productId; // 列表最后一个商品的id,为空"",代表初始请求
}

// banner 区域
struct TBanner {
	1: required i32 index; // 位置
	2: required string name;
	3: required string imageURL;
	4: required i64 startAt;
	5: required i64 endAt;
	6: required bool visible;  // 可视？
	7: required string ezbuyProtocol;	// 点击行为，可以为空，或者ezbuy协议格式的跳转链接，其他返回错误
}

struct TGroupBuyTag{
	1:required i32 index;    // 位置
	2:required string tagName;  // tag 类目名
}


struct TPayment {
	1:required i32 paymentBillId;	//付款单ID
	2:required string groupbuyNo;	//团购活动ID
	3:required string productUrl;	//商品标准url
	4:required string productName;	//商品名称
	5:required string productImage; //商品图片
	6:required string skuName;		//商品sku
	7:required i32 qty;				//购买数量
	8:required string subtotal;		//金额         定金已付,未成团显示deposit总价价格;二次付款,交易关闭(逾期未二次付款) 显示secondpay total价 ,团购成功显示第一次和第二付款总价
	9:required string status;		//当前状态
}

struct TPaymentDetail {
	1:required i32 paymentBillId;		//付款单ID
	2:required string paymentBillNumber;//付款单编号
	3:required string paydate;			//付款时间
	4:required string subtotal;			//金额
	5:required list<TPaymentItem> paymentItems;	//账单明细
	6:required TShipmentItem shipmentItem;
	7:required string productUrl;	//商品标准url
	8:required string productName;	//商品名称
	9:required string productImage; //商品图片
	10:required string skuName;		//商品sku
	11:required i32 qty;				//购买数量
	12:required TPaymentDeposit paymentDeposit;            //第一次付款信息
	13:required string secondpayDeadline;     //第二次付款截止时间
}

struct TShipmentItem {
	1:required string shipToName;		//收货人
	2:required string shipToPhone;		//收货人电话
	3:required string deliveryMethod;	//收货地址类型
	4:required string deliveryAddress;	//收货地址
}

struct TPaymentItem {
	1:required string billCategory;		//账单类型
	2:required string amount;			//金额
}

struct TPaymentDeposit {
    1:required i32 paymentBillId;		//付款单ID
    2:required string paymentBillNumber;//付款单编号
    3:required string paydate;			//付款时间
    4:required string deposit;			//金额
    5:required string deliveryFee;       //delivery 费用
}


struct TGroupBuyOrderStatus {
	1:required bool result;   //有无订单待显示
}

service Groupbuy{
  //获取分类
  list<TGroupBuyTag>GetTags(),
  //获取团购列表数据
  list<TGroupbuyProduct> GetGroupBuyProducts(1:TSearchCondition condition),
  //获取团购列表页banner列表
  list<TBanner> GetBanners(),


  //获取团购付款单列表
  list<TPayment> UserGetPayments(1:i32 offset, 2:i32 limit, 3:string orderStatus),

  //获取团购付款单详情
  TPaymentDetail UserGetPayemntDetail(1:i32 paymentBillId),

  //获取团购订单提示状态
  TGroupBuyOrderStatus GetOrderStatus(1:i32 uid),

}
