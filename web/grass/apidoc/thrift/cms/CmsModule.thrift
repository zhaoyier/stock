namespace * CmsModule

include "./CmsCommon.thrift"

struct CmsModuleItem {
    1: required CmsCommon.PrimaryValue id;
    2: required CmsCommon.InputValue ctype
    3: required CmsCommon.InputValue name;  // 模块名称
    4: required CmsCommon.TextareaValue desc;  // 功能描述
    5: required CmsCommon.BooleanValue canEdit; // 是否能编辑
    6: required CmsCommon.BooleanValue canPreview; // 是否能预览
    7: required CmsCommon.BooleanValue canRevert; // 是否能回滚版本
    8: required CmsCommon.BooleanValue canDelete; // 是否能删除
    9: optional CmsCommon.InputValue pid; // 父级id
}
