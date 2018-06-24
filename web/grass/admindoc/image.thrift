namespace go featurecollection.trending.trpc.image

struct TStartupImage{
	1:required string id 
	2:required i32 version 
	3:required i64 startDate
	4:required i64 expireDate
	5:required i64 createTime
	6:required i32 displayTimes
	7:required bool isActive
	8:required string name
	9:required list<TMapImage> imageSet
}


struct TMapImage{
	1:required string imageSetkey
	2:required list<string> imageSetValue
}

struct TDelReply{
	1:required i16 code
	2:required string ret
}

struct TEditProductReply{
	1:required string result
	2:required bool isSuccess
}

struct TImageStructArr{
	1:required list<TStartupImage> ImageStructs 
}

struct TIUpdateAc{
	1:required string id
	2:required bool isActive
}

service FeatureCollection {
    list<i32> GetScreenSizes()
	TImageStructArr GetStartupImages(1:string queryTime,2:i32 activeMode,3:i32 offset,4:i32 limit)
    TDelReply Delete(1:string id)
    bool UpdateImageActive(1:string id,2:bool isActive)
    bool Update(1:string id,2:i32 version,3:string name,4:string startDate,5:string endDate,6:i32 displayTimes,7:bool isActive,8:list<TMapImage> imgeSet)
    bool AddStartupImage(1:string id,2:i32 version,3:string name,4:string startDate,5:string endDate,6:i32 displayTimes,7:bool isActive,8:list<TMapImage> imgeSet)
}
