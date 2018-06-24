namespace go ezbuy.apidoc.gen.AdminSpikeDisplaySet
namespace webapi api

enum Operator {
    Unknown,    // 0
    AND,        // 1
    OR,         // 2
    MaxLimit
}

enum ConditionFieldType {
    Unknown,        // 0
    Category,       // 1
    Attributes,     // 2
    Basic,          // 3
    MaxLimit
}

enum ConditionFieldValueType {
    Unknown,        // 0
    String,         // 1
    Int,            // 2
    Double,         // 3
    Bool,           // 4
    MaxLimit
}

enum ConditionOperator {
    Unknown,        // 0
    EqString,       // 1
    EqInt,          // 2
    EqDouble,       // 3
    LtString,       // 4
    LtInt,          // 5
    LtDouble,       // 6
    GtString,       // 7
    GtInt,          // 8
    GtDouble,       // 9
    Prefix,         // 10
    Contains,       // 11
    EqBool,         // 12
    NotEqString,    // 13
    NotContains,    // 14
    NotEqBool,      // 15
    ListStrContains,// 16     
    GtTime,         // 17
    LtTime,         // 18
	RangeDouble,    // 19
    MaxLimit
}

struct ConditionFieldOption {
    1:required ConditionFieldType type
    2:required list<ConditionFieldOptionItem> items
}

struct ConditionFieldOptionItem {
    1:required string fieldName
    2:required string displayName
    3:required ConditionFieldValueType valueType
    4:required list<ConditionOperator> availableOps
}

struct Condition {
    1:required ConditionFieldType fieldType
    2:optional string fieldName
    3:required ConditionOperator op
    4:optional string strVal
    5:optional i64 intVal
    6:optional double doubleVal
    7:optional bool boolVal
}

struct Rule {
    1:required Operator op
    2:required list<Condition> conditions
}

struct DisplaySet {
    1:required i32 id
    2:required string name
    3:required Operator op
    4:required list<Rule> rules
    5:required bool disabled
}

struct DisplaySetSimple {
    1:required i32 id
    2:required string name
    3:required bool disabled
}

struct DisplaySetListQuery {
    1:required i32 limit
    2:required i32 skip
    3:required string prefix
    4:required bool caseSensitive
}

struct DisplaySetListResult {
    1:required i32 total
    2:required list<DisplaySetSimple> data
}

struct DisplayCate {
    1:required i32 id
    2:required i32 parent
    3:required string name
    4:required i32 setId
    5:required bool disabled
    6:required string pictureUrl
}

struct DisplayAttribute{
    1:required string pname
    2:required list<string> vnames
}

struct DisplayProperty{
    1:required i32 pid
    2:required string pname
}

struct DisplayValue{
    1:required i32 vid
    2:required string vname
}

struct DisplayPropertyValue{
    1:required DisplayProperty property
    2:required list<DisplayValue> values
}

struct PubcateRule{
    1: required i32 ezcid
    2: required string name
}

struct PubcateRuleResponse{
    1: required i32 total;
    2: required list<PubcateRule> rules;
}

exception Exception {
    1:required i32 code
    2:required string message
}

service AdminSpikeDisplaySet {
    /// <summary>
    /// 管理接口, 列出已有的展示规则列表
    /// </summary>
    /// <param name="query">列表参数</param>
    /// <returns>展示规则列表结果</returns>
    DisplaySetListResult AdminDisplaySetList(1:DisplaySetListQuery query) throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 添加展示规则
    /// </summary>
    /// <param name="data">规则数据</param>
    /// <returns>展示规则数据</returns>
    DisplaySet AdminDisplaySetAdd(1:DisplaySet data) throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 获取指定展示规则
    /// </summary>
    /// <param name="id">规则id</param>
    /// <returns>展示规则数据</returns>
    DisplaySet AdminDisplaySetGet(1:i32 id) throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 更新展示规则
    /// </summary>
    /// <param name="data">规则数据</param>
    /// <returns>展示规则数据</returns>
    DisplaySet AdminDisplaySetUpdate(1:DisplaySet data) throws (1:Exception exception)

    /// <summary>
    /// 数据接口, 显示所有可选的 Condition Type, 每个 Condition Type 可选的 fields, 以及每个 field 的值类型和支持的判断操作类型
    /// </summary>
    /// <returns>选项列表</returns>
    list<ConditionFieldOption> DisplaySetConditionFieldOptions() throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 列出已有的展示类目列表
    /// </summary>
    /// <param name="parent">父类目 id</param>
    /// <returns>展示类目列表结果</returns>
    list<DisplayCate> AdminDisplayCateList(1:i32 parent) throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 添加展示类目
    /// </summary>
    /// <param name="data">类目数据</param>
    /// <returns>展示类目数据</returns>
    DisplayCate AdminDisplayCateAdd(1:i32 parent, 2:string name, 3:i32 setId) throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 获取指定展示类目
    /// </summary>
    /// <param name="id">类目id</param>
    /// <returns>展示类目数据</returns>
    DisplayCate AdminDisplayCateGet(1:i32 id) throws (1:Exception exception)

    /// <summary>
    /// 管理接口, 更新展示类目
    /// </summary>
    /// <param name="id">类目id</param>
    /// <param name="name">类目名称</param>
    /// <param name="disabled">是否禁用</param>
    /// <returns>展示类目数据</returns>
    DisplayCate AdminDisplayCateUpdate(1:i32 id, 2:string name, 3:bool disabled, 4:string pictureUrl = "") throws (1:Exception exception)

    //查找展示类目属性属性值
    list<DisplayAttribute> AdminDisplayAttributeGet(1:i32 cid, 2:string countryCode, 3:i32 propertyLimit, 4:i32 ValueLimit) throws (1:Exception exception)
    //设置展示类目展示属性属性值
    bool AdminDisplayAttributeSet(1:i32 cid, 2:string countryCode, 3:list<DisplayAttribute> attributes) throws (1:Exception exception)
    //显示展示类目的属性属性值
    list<DisplayPropertyValue> AdminDisplayPropertyValueShow(1:i32 cid, 2:string countryCode) throws (1:Exception exception)
    //修改属性
    bool AdminDisplayPropertyUpdate(1:i32 pid, 2:string pname) throws (1:Exception exception)
    //修改属性值
    bool AdminDisplayPropertyValueUpdate(1:i32 vid, 2:string vname) throws (1:Exception exception)

    //展示类目的规则
    // cid: 展示类目的id
    PubcateRuleResponse ListPubCateRules(1:i32 cid, 2:i32 limit, 3:i32 offset);

    bool AddPubcateRule(1:i32 cid, 2:i32 ezcid);
    bool RemovePubcateRule(1:i32 cid, 2:i32 ezcid);

}
