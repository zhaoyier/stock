namespace java com.daigou.sg.rpc.jsbridge;
namespace swift TR;

include "ShoppingCart.thrift";
include "Collection.thrift";

//detailEvent
struct TDetailEvent{
    1:required string category;
    2:required string productName;
    3:required string unitPrice;
    4:required string productUrl;
}
//clickEvent
struct TClickEvent{
    1:required string category;
    2:required string productName;
    3:required string price;
    4:required string productUrl;
    5:required string listName;
    6:required i32  position;
}
//checkoutEvent
struct TCheckoutEvent{
    1:required list<ShoppingCart.TBasketItem> products;
    2:required string checkoutType;
    3:required string amount;
}
//purchaseEvent
struct TPurchaseEvent{
    1:required list<ShoppingCart.TBasketItem> products;
    2:required string checkoutType;
    3:required string transactionID;
    4:required string coupon;
    5:required double revenue;

}
//addToCartEvent
struct TAddToCartEvent{
    1:required string productName;
    2:required double price;
    3:required string sku;
    4:required string category;
    5:required i32 qty;
    6:required string url;
}
//removeListEvent
struct TRemoveListEvent{
    1:required list<ShoppingCart.TAgentProduct> productList;
}
//viewProduct
struct TViewProduct{
    1:required list<Collection.TProductSimple> products;
    2:required string category;
    3:required i32 offset;
}
//screenView
struct TScreenView{
    1:required string screenName;
}
//registerEvent
struct TRegisterEvent{
   1:required string  knowUs;
}
//launchEvent
struct TLauncherEvent{

}
//searchEvent
struct  TSearchEvent{
    1:required string keyWord;

}
//paymentEvent
struct TPaymentEvent{
    1:required string action;
    2:required string source;
    3:required string type;
    4:required double total;
    5:required double nonBalance;
}
//topup result
struct  TTopupReturnResult{
    1:required bool status;
}