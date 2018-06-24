namespace go ezbuy.apidoc.gen.Momoso

service Momoso {
    void ProductUpdate(1: list<i32> ids);
    void OrderUpdate(1: list<i32> ids);
}
