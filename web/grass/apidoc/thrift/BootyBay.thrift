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
    2:required Translation translation
    3:required list<PropertyValue> pvs
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
    9:required Translation translation
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

struct AliPropertyValue{
    1:required i32 pvid
    2:required string pvname
    3:required i32 pid
    4:required string pname
    5:required i32 vid
    6:required string vname
    7:required i32 totalcount
}

struct AliProperty{
    1:required i32 id
    2:required string name
}

struct AliValue{
    1:required i32 id
    2:required string name
}

struct EzbuyMappingRule{
    1:required i32 pvmrid
    2:required i32 pvid
    3:required string pName
    4:required string vName
    5:required string aliPName
    6:required string aliVName
}

struct EzAliProertyValueResponse{
    1:required i32 total
    2:required list<AliPropertyValue> aliPropertyValues
}

struct EzbuyMappingRuleResponse{
    1:required i32 total
    2:required list<EzbuyMappingRule> rules
}

struct EzbuyPropertyValueResponse{
    1:required i32 total
    2:required list<PropertyValue> propertyValues
}

struct EzBuyPropertyResponse{
    1:required i32 total
    2:required list<Property> properties
}

struct EzBuyValuesResposne{
    1:required i32 total
    2:required list<Value> values
}

struct AlipropertyValueResponse{
    1:required i32 total;
    2:required list<AliPropertyValue> alipropertyvalues;
}

struct MappingRuleTask{
    1:required i32 taskId;
    2:required i32 status; //  状态 0:未运行 1:正在运行  2:运行成功 3:运行失败
    3:required i32 ruleId;
    4:required string ezPname;
    5:required string ezVname;
    6:required string aliPname;
    7:required string aliVname;
    8:required i64 runedAt; // 运行结束时间
    9:required i64 runStartAt; // 上一次运行时间
}

struct MappingRuleTaskResponse{
    1:required i32 total;
    2:required list<MappingRuleTask> tasks;
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

    #propertyMapping管理 ali --> ezbuy
    // 获取ezbuy属性对应阿里系的属性
    EzAliProertyValueResponse GetEzAliProertyValueMapping(1:i32 ezpvid, 2:i32 limit, 3:i32 offset);

    // 删除属性对应，
    bool RemoveAliPropertyValueInMapping(1:i32 ezpvid, 2:i32 aliPvid);

    // 添加属性对应，
    bool AddAliProperTyValueInMapping(1:i32 pvid, 2:i32 aliPvid);

    #mappingRule管理

    // 添加阿里属性匹配ezbuy属性规则
    bool AddMappingRule(1:i32 ezpvid, 2:string aliPName, 3:string aliVName);

    bool RemoveMappingRule(1:i32 pvmrid);

    EzbuyMappingRuleResponse GetMappingRules(1:i32 ezpvid, 2:i32 limit, 3:i32 offset);

    #ali属性管理
    list<AliProperty> GetAliPropertyByPrefix(1:ListQuery query);

    AlipropertyValueResponse GetAliValueByPrefix(1:i32 aliPid, 2:i32 limit, 3:i32 offset);

    #ezbuy 属性管理
    //查看属性
    EzBuyPropertyResponse GetEzbuyProperties(1:i32 limit, 2:i32 offset);
    //根据属性查看属性值
    EzBuyValuesResposne GetEzBuyValuesByProertyId(1:i32 ezpid, 2:i32 limit, 3:i32 offset);
    EzbuyPropertyValueResponse GetEzbuyPropertyValues(1:i32 limit, 2:i32 offset);

    // 添加mappingruletask 后台运行
    bool AddMappingRuleTask(1:i32 ruleId);
    // status: <0:all 0:未运行 1:正在运行  2:运行成功 3:运行失败
    MappingRuleTaskResponse GetMappingRuleTasks(1:i32 status, 2:i32 limit, 3:i32 offset);

    //根据pvid获取任务
    MappingRuleTaskResponse GetMappingRuleTaskByPvId(1:i32 pvid, 2:i32 status, 3:i32 limit, 4:i32 offset)

    //运行task
    void MappingRuleTaskRun(1:i32 taskId);

    //cid mapping
    // 查询cid对应的发布类目
    list<i64> ListCidToPabCates(1:i32 ezCid);
    // 添加cid和ezcid的对应
    bool AddCidToPubCate(1:i32 ezCid, 2:i64 cid);
    bool RemoveCidToPubCate(1:i64 cid);


    bool UpdatePropKey(1:string name, 2:string rename, 3:Translation translation);

    bool UpdatePropValue(1:string name, 2:string rename, 3:Translation translation);

}
