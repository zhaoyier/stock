namespace go ezbuy.apidoc.gen.BootyBay
namespace webapi api.bootybay

struct Translation {
    1:required string CN
    2:required string MY
}

struct ValueOptions {
    1:required list<PropertyValue> fixed
    2:required list<ValueOptionsItem> single
    3:required list<ValueOptionsItem> multi
}

struct ValueOptionsItem {
    1:required string pname
    2:required list<PropertyValue> pvs
}

struct Property {
    1:required i32 pid
    2:required string name
    3:required Translation translation
    4:required bool disabled
}

struct Value {
    1:required i32 vid
    2:required string name
    3:required Translation translation
    4:required bool disabled
}

struct PropertyValue {
    1:required i32 pvid
    2:required i32 pid
    3:required string pname
    4:required i32 vid
    5:required string vname
    6:required bool disabled
    7:required string pvslug
    8:required string pvname
}

struct CategoryBreadCrumb {
    1:required string name
    2:required Translation translation
}

struct Category {
    1:required i32 cid
    2:required string name
    3:required Translation translation
    4:required bool disabled
    5:optional list<CategoryBreadCrumb> breadcrumb
}

struct CategoryPropertyValueSet {
    1:required i32 sid
    2:required list<Category> categoryPath
    3:required map<string, list<PropertyValue>> propertyValueOptions
    4:required bool disabled
}

struct ListQuery {
    1:required string prefix
    2:required bool caseSensitive
    3:required i32 limit
}

struct ProductListQuery {
    1:required i32 limit
    2:required i32 lastId
    3:optional list<string> sort
}

service BootyBay {
    Property AddProperty(1:string name, 2:Translation translation)
    Property GetProperty(1:i32 pid)
    # 废弃
    # bool DelProperty(1:i32 pid)
    list<Property> GetProperties(1:ListQuery query)
    Property DisableProperty(1:i32 pid, 2:bool disabled)

    Value AddValue(1:string name, 2:Translation translation)
    Value GetValue(1:i32 vid)
    # 废弃
    # bool DelValue(1:i32 vid)
    list<Value> GetValues(1:ListQuery query)
    Value DisableValue(1:i32 vid, 2:bool disabled)

    PropertyValue AddPropertyValue(1:i32 pid, 2:i32 vid)
    PropertyValue AddPropertyValueByNames(1:string pname, 2:string vname)
    list<PropertyValue> GetValuesForProperty(1:string pname)
    bool DelValuesForProperty(1:i32 pid, 2:list<i32> vids)

    Category AddCategory(1:i32 parent, 2:string name, 3:Translation translation)
    Category GetCategory(1:i32 cid)
    Category UpdateCategory(1:i32 cid, 2:string name, 3:Translation translation)
    # 废弃
    # bool DelCategory(1:i32 cid)
    Category DisableCategory(1:i32 cid, 2:bool disabled)
    list<Category> GetCategories(1:ListQuery query, 2:i32 parent)
    bool AddSubCategory(1:i32 cid, 2:i32 subCid)
    bool UpdateSubCategories(1:i32 cid, 2:list<i32> subCids)
    list<Category> GetSubCategories(1:i32 cid)
    bool DelSubCategories(1:i32 cid, 2:list<i32> subCids)

    # 废弃
    #CategoryPropertyValueSet AddCategoryPropertyValueSet(1:list<Category> categoryPath, 2:map<string, list<PropertyValue>> propertyValueOptions)
    # 废弃
    #bool DelCategoryPropertyValueSet(1:i32 sid)
    # 废弃
    #CategoryPropertyValueSet GetCategoryPropertyValueSet(1: list<Category> categoryPath)

    ValueOptions GetCategoryValueOptions(1:i32 cid, 2:bool merged)
    ValueOptions UpdateCategoryValueOptions(1:i32 cid, 2:ValueOptions options)
    ValueOptions GetCategoryPathValueOptions(1: list<Category> categoryPath)
}
