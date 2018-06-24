namespace go ezbuy.homepage.trpc.fixedbanner

struct FixedBannerImage {
    1:required string key
    2:required string name
    3:required string linkAddress
    4:required string picture
    5:required string countryCode
    6:required i32 typeId;
    7:required double order;
}

service FixedBanner {
    list<FixedBannerImage> Search(1:string countryCode , 2:i32 typeId)
    bool Add(1:FixedBannerImage image)
    bool Update(1:FixedBannerImage image)
    bool Delete(1:string key , 2:string countryCode)
}
