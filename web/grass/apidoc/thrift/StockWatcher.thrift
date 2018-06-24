namespace go ezbuy.apidoc.gen.StockWatcher

struct StocWatcherDetail {
    1:required string refId
    2:required double price
    3:required bool isOnSale
    4:required i64 timestamp
    5:optional double oriPrice
}
