namespace * Product
namespace csharp Zen.WebServices.Wrangler
namespace go ezbuy.apidoc.gen.Wrangler

struct TCharacteristicItem{
	1:optional string Propkey
	2:optional string ActualValue
	3:optional string Remark
	4:optional string ImageUrl
	5:required bool IsSelected
	6:optional string SkuId
}

struct TSkuItem{
	1:optional string Properties
	2:optional string PropertiesName
	3:required i32 Quantity
	4:required i32 WithHoldQuantity
	5:required double Price
	6:required i64 SkuId
	7:optional string Status
	8:optional double OriginalPrice
}

struct TItemImg{
	1:required i64 Id
	2:required i64 Position
	3:optional string Url
}

struct TOnlineProduct{
	1:required i64 Cid
	2:optional string VendorName
	3:optional string ProductName
	4:optional double UnitPrice
	5:optional double ShippingFee
	6:required string ProductUrl
	7:optional string ProductImage
	8:optional string OriginCode
	9:optional string BrandName
	10:optional string ShopName
	11:optional map<string,list<TCharacteristicItem>> Characteristics
	12:optional map<string,list<TCharacteristicItem>> AltCharacteristics
	13:optional list<TSkuItem> Skus
	14:optional list<TItemImg> ItemImgs
	15:optional string Location
	16:optional i64 ProductId
	17:optional string Description
	18:optional list<string> PropertyNames
	19:optional list<string> AltPropertyNames
	20:optional string Site
	21:optional string AltProductName
	22:optional string ProductImages
	23:optional string ProductDescription
	24:optional string StatusCode
	25:optional string PriceSymbol
	26:optional string AroundwWarehouse
	27:required bool IsBlack
	28:required bool IsShippingFee
	29:optional string ShopScore
	30:optional map<string,double> ShippingFees
	31:optional string FetchBy
	32:required bool IsCustomShop
	33:optional string TbProductId
	34:required bool IsEzShipping
	35:optional double EstWeight
	36:optional double EstVolumeWeight
	37:required bool IsExactWeight
	38:optional string TbCategoryName
	39:optional string AvailableShipmentTypeIds
	40:required bool IsPrime
	41:required i32 PrimeShippingType
	42:optional string DomesticShippingEta
	43:required double FlashSalesPrice
	44:optional string FlashSalesStartTime
	45:optional string FlashSalesEndTime
	46:required i32 FlashSalesLimitation
	47:required i32 FlashSalesStock
	48:optional double OriginalUnitPrice
	49:optional map<string,string> ProductProperties

}

service Fetch{
  TOnlineProduct GetProduct(1:string url, 2:bool needTranslate, 3:string area)
}
