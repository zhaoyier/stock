namespace go ezbuy.apidoc.PromotionPage

struct TBanner{
	1: required string name
	2: required string picture
	3: required string linkAddress
}

struct TProduct{
	1: required string name
	2: required string originName
	3: required string linkAddress
	4: required double price
	5: required double originPrice
	6: required string picture
	7: required string discountRate
	8: required bool isSoldOut
}

struct TBrand{
	1: required string picture
	2: required string linkAddress
}

struct TBoolReply{
	1: required bool isSuccess
	2: required string msg
}

struct TFloor{
	1: required string id
	2: required string name
	3: required i32 categoryId
	4: required string countryCode
	5: required list<TBanner> banners
	6: required list<TProduct> products
	7: required list<TBrand> brands
	8: required string platform
	9: required double order
	10: required string iconColor
	11: required string iconPicture
	12: required i32 purchaseSourceId
}

service PromotionPage{
	list<TFloor> GetFloor(1: string platform,2: string countryCode)

	list<TFloor> GetFloorByAdmin(1: string platform,2: string countryCode)

	TBoolReply EditFloor(1: TFloor floor)

	TBoolReply CreateFloor(1:list<TFloor> floor)

	TFloor GetFloorById(1: string id)
	
	TBoolReply ImportDataByExcel()

	TBoolReply DoSort(1: string preId,2: string nextId,3: string sortId)
}
