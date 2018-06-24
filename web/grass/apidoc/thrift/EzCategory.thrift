namespace go ezbuy.apidoc.gen.EzCategory

include "Common.thrift"

enum ConditionOperator{
    Gt,  //0
    Lt,  //1
    Gte, //2
    Lte, //3
}

// id: 0 --> allCategory
struct Category{
    1: required i32 id;
    2: required string name;
    3: optional Category parent;
    4: optional list<Category> subCategories;
    5: optional string pictureUrl;
    6: required i64 total;
}


struct Tproduct{
    1: required string url;
	16: required i64 gpid;
    2: required string name;
    3: required double price;
    4: required double originPrice;
    5: required string picture;
    6: required double discountValue;
    7: required bool isCashOff;
    8: required string vendorName;
    9: required string originCode;
    10: required string refId;
    11: required string originName;
    12: required string cashOffKey;
	13: optional string altProductName
	14: required bool isEzbuy;
	15: required double unitPrice;
	18: required bool isFreeShipping;
	17: required bool isPrime;
	19: required bool isPremium;
	20: required string cashoffColor;
	21: required string mncashoffImg;
	23: required Common.TIcon icon;            # 商品右上角标
	24: required bool isFastDelivery;
	25: required list<Common.TTitleIcon> titleIcons;
	26: required i64 baseGpid;
	27: required i32 platform;
}

struct DisCountCondition{
    1: required ConditionOperator op; 
    2: required double disCountValue; //［0，1）
}

struct PriceCondition{
    1: required ConditionOperator op;
    2: required double priceValue;
}

# UpdateDate
# Price
struct SortCondition {
	1: required string name;
	2: required bool isDesc;
}

struct SearchCondition {
    1: required i32 categoryId;
	17: optional string collectionId; # 商品集合Id, 可以选出特定商品
	
    2: optional bool isPrime;
    3: optional bool isCashOff;
    4: optional string keyWords;
    5: optional DisCountCondition disCountCondition;
    6: optional list<PriceCondition> priceConditions;
    7: optional list<SearchAttribute> attributes;
	8: optional string sellerId;
	9: optional bool isEzbuy;
	10: optional list<SortCondition> sortCondition;
	11: optional string originCode;
	12: optional bool isFreeShipping;
	13: optional list<string> brands;   // 即将废弃, 使用 propValues
	14: required i32 freeShippingType;
	15: optional list<SearchPropertyCondition> propValues;
	16: optional bool isPremium;
	18: optional list<i32> from;  // 打标
	19: optional list<Filter> filters; // 活动过滤
}

struct SearchPropertyCondition {
    1: required string propId;
    2: required list<string> propValueIds;
}

struct SearchAttribute{
    1:required string pname;
    2:required string vname;
}

struct Attribute{
    1: required string name;
    2: required list<string> values; 
}

struct DescAttribute {
    1: required string name;
    2: required list<string> values;
    3: required string propId;
    4: required list<PropValue> propValues;
}

struct PropValue {
    1: required string name;
    2: required string propValueId;
}

struct TproductResponse {
    1: required i32 total;
    2: required list<Tproduct> products;
    3: required list<Attribute> attributes;
    4: required Category category;
    5: required list<ShowCategory> showCategories;
    6: required list<DescAttribute> descAttributes;
	7: required list<Filter> filters;
}

enum FilterWidget {
	Checkbox,
}

struct Filter {
	1: required string name = 1;
	2: required string act = 2;
	3: required FilterWidget widget;
	4: required list<FilterItem> items;
}

struct FilterItem {
	1: required string value;
	2: required string name;
}

struct ShowCategory{
    1:required i32 id;
    2:required string name;
}

struct FlatCategory {
    1: required i32 id;
    2: required string name;
    3: required string picture;
    4: required i32 parentId;
}

service EzCategory{
    //categoryId： 分类id  <=0: allCategory
    //dataType: new => 新分类,  
    Category ListCategoryByCategoryId(1:i32 categoryId, 2:string dataType),

    //language: zh_CN、en_US...
    //dataType: new => 新分类,
    TproductResponse ListProductsByCondition(1:SearchCondition searchCondition, 2:i32 limit, 3:i32 offset, 4:string language, 5:string dataType),

    // categoryId: 分类Id, 如果为0表示顶分类
    list<FlatCategory> GetFlatCategory(1:i32 categoryId),
}
