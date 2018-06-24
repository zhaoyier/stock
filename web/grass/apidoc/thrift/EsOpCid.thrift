namespace go ezbuy.apidoc.gen.EsOpCid

struct CidsResponse{
    1:required list<i64> cids
    2:required i32 total
    3:required list<CidItem> allCids
}

struct CidItem {
    1:required i64 cid
    2:required string updateBy
    3:required i64 updateTime
}

struct AbandonProduct{
    1:required string refId
    2:required string name
    3:required string url
    4:required string updateBy
    5:required i64 updateTime
}

struct AbandonProductResponse{
    1:required i32 total
    2:required list<AbandonProduct> products
}

struct BlockWord{
    1:required string id
    2:required string words
    3:required string updateBy
    4:required i64 updateTime
}

struct BlockWordResponse{
    1:required i32 total
    2:required list<BlockWord> words
}

struct EsOpCidSearchCidResp{
    1:required i64 cid
    2:required i32 blockType
    3:required string countryCode
    4:required string updateBy
    5:required i64 updateTime
}

struct SearchBlockWord{
    1:required string words
    2:required i32 blockType
    3:required string countryCode
    4:required string updateBy
    5:required i64 updateTime
}

struct RebateRecord{
    1:required string expireTime;
    2:required string syncDate;
    3:required string recordId;
    4:required i32 status; //-1:数据正在导入，不允许操作同步数据 0:数据未入库  1:正在入库  2:数据已入库
    5:required i32 primeCount; //prime入库数量
    6:required i32 errorCount; //入库失败数量
    7:required i32 buyformeCount; // buyforme入库数量
    8:required i32 unsyncCount; //未同步数量
    9:required i32 ezbuyCount; //ezbuy入库数量

}

struct RebateRecordResponse{
  1:required i32 total;
  2:required list<RebateRecord> records;
}

struct BlockVendorName{
  1: required string name;
  2: required string countryCode;
  3: required i32 blockType;
  4: required string updateBy;
  5: required i64 updateTime;
}

struct BlockVendorNameResposne{
  1: required i32 total;
  2: required list<BlockVendorName> vendorNames;
}

struct EsOpCidSearchBlockVendor{
    1:required string vendorName;
    2:required string countryCode;
    3:required i32 blockType;
    4:required i32 limit;
    5:required i32 offset;
}

service EsOpCid{
   CidsResponse ShowShipMentCids(1:i32 limit, 2:i32 offset);
   bool AddShipMent(1:i64 cid);
   bool RemoveShipMent(1:i64 cid);
   

   //关键词屏蔽
   BlockWordResponse BlockWords(1:i32 limit, 2:i32 offset, 3:string countryCode, 4:i32 blockType)
   bool AddBlockWord(1:string word, 2:string countryCode, 3:i32 blockType);
   bool RemoveBlockWord(1:string id);
   SearchBlockWord SearchBlockWord(1:string word, 2:string countryCode, 3:i32 blockType);

   //CID屏蔽
   //countryCode: all 全部国家
   CidsResponse ShowUnShelveCids(1:i32 limit, 2:i32 offset, 3:string countryCode, 4:i32 blockType);
   bool AddUnShelve(1:i64 cid, 2:string countryCode, 3:i32 blockType);
   bool RemoveUnShelve(1:i64 cid, 2:string countryCode, 3:i32 blockType);
   EsOpCidSearchCidResp SearchCid(1:i64 cid, 2:string countryCode, 3:i32 blockType);

  //屏蔽卖家
   // 下面的countrycode  传值 不在["SG","MY","TH","ID"]的取值范围内 就默认全部国家
  bool AddBlockVendorName(1:string vendorName, 2:list<string> countryCodes, 3:i32 blockType);
  bool RemoveBlockVendorName(1:string vendorName, 2:string countryCode, 3:i32 blockType);
  //查询屏蔽卖家
  BlockVendorNameResposne ListVendorName(1:string countryCode, 2:i32 blockType, 3:i32 limit, 4:i32 offset);
  
  //查询卖家按照卖家名 
  BlockVendorNameResposne SearchBlockVendor(1:EsOpCidSearchBlockVendor req);
  //上传屏蔽卖家
  //filePath: 文件上传到七牛的返回的key
  //countryCode:["SG","MY","TH","ID"]或者传值 "all"：表示全部国家
  //blockType 1:index 2:detail   
  bool BlockVendorImport(1:string filePath, 2:list<string> countryCodes, 3:i32 blockType);

  //单品url屏蔽
  //blockType: 1:index 2:detail 
  AbandonProductResponse AbandonProductShow(1:i32 limit, 2:i32 offset, 3:string countryCode, 4:i32 blockType)
  AbandonProductResponse SearchAbandonProduct(1:string url, 2:string countryCode, 3:i32 blockType);
  bool RemoveAbandonProduct(1:string url, 2:string countryCode, 3:i32 blockType)

    //add rebate product by month
   #RebateProduct(1:file file,2:i64 expireTime)
   //同步到商品库
   void SyncToProduct(1:string recordId)

   RebateRecordResponse ListRebateRecord(1:i32 limit, 2:i32 offset);
}
