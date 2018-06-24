namespace go spike.channels.trpc.channels

struct TChannelKeyword{
    1:required i32 id;
    2:required string slug;
    3:required string name;
    4:required i32 linkType;
    5:required i32 tagType;
}

struct TChannelCampaign{
    1:required i32 id;
    2:required string slug;
    3:required string name;
    4:required i32 linkType;
    5:required string picture;
}

struct TChannel{
    1:required string id;
    2:required string name;
    3:required string picture;
    4:required string themeColor;
    5:required bool isDisplayFront;
    6:required i32 productCount;
    7:required string banner;
    8:required list<TChannelKeyword> keywords;
    9:required list<TChannelCampaign> campaigns;
    10:required string parentId;
    11:required string countryCode;
    12:required string linkAddress;
    13:required list<string> unPrimeCollectionIds;
    14:required list<string> primeCollectionIds;
    15:required i32 order;
    16:required string slug;
    17:required i32 linkType;
    18:required string primeCollectionName;
    19:required string unPrimeCollectionName;
}


struct TRecentPrimePurchase{
    1:required string productName;
    2:required string productUrl;
    3:required string productImage;
    4:required string unitPrice;
    5:required string originCode;
    6:required string customerName;
    7:required string customerAvatar;
}


struct TShowTrending{
    1:required string name;
    2:required list<TShowTrendingProduct> products;
    3:required bool isPrime;
    4:required string collectionId;
    5:required string originCode;
}

struct TShowTrendingProduct{
    1:required string productName;
    2:required string refId;
    3:required string url;
    4:required string picture;
    5:required string collectionId;
    6:required i32 order;
    7:required double price;
}

struct TAllShowTrending{
    1:required list<string> showTrending
    2:required bool isPrime
}

service Channel{
    list<TChannel> Search(1:string parentChannelId,2:string countryCode)
    TChannel GetByChannelId(1:string channelId)
    string Add(1:TChannel channel)
    bool Update(1:TChannel channel)
    list<TChannel> GetChannels(1:string parentId , 2:string countryCode, 3:string languageType , 4:i32 offset , 5:i32 limit),
    list<TShowTrending> GetShowTrending(1:string countryCode,2:bool isPrime,3:string channelId)
    list<TRecentPrimePurchase> GetRecentProduct(1:i32 offset,2:i32 limit,3:string originCode)
    bool ChannelSort(1:string parentId, 2:string countryCode 3:string prevId,4:string nextId,5:string sortId)
    bool EditHomeCollections(1:string countryCode,2:list<string> primeTrendings,3:list<string> unPrimeTrendings)
    list<TAllShowTrending> GetShowPageCollections(1:string countryCode)
}
