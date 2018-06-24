namespace go ezbuy.apidoc.gen.EsOpCid

struct CidsResponse{
    1:required list<i64> cids
    2:required i32 total
}

service EsOpCid{
   CidsResponse ShowShipMentCids(1:i32 limit, 2:i32 offset);
   bool AddShipMent(1:i64 cid);
   bool RemoveShipMent(1:i64 cid);

   CidsResponse ShowUnShelveCids(1:i32 limit, 2:i32 offset);
   bool AddUnShelve(1:i64 cid);
   bool RemoveUnShelve(1:i64 cid);
}
