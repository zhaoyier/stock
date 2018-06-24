namespace go ezbuy.apidoc.gen.cartsaver
namespace java com.daigou.sg.webapi.cartsaver
namespace swift TR

enum TAction {
    None = 0,
    AddCart = 1,
    Checkout = 2,
    Pay = 3,
    Invalid = 4
}

service CartSaver {

    // 若userId小于1，则从cookie 65_customer中获取
    bool UserAction(1:i64 userId, 2:TAction action)

}
