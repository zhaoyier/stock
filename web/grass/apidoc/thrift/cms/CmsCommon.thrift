namespace * CmsCommon

enum ValueType {
    Primary = 0
    Input = 1
    Textarea = 2
    Number = 3
    Boolean = 4
    Image = 5
    RichText = 6
    TimeValue = 7
    RangeTimeValue = 8
    ColorValue = 9
}

// Primary是在任何时候不显示, 是不可编辑的
struct PrimaryValue {
    1: required string value;
    2: required ValueType type;
}

struct ImageValue {
    1: required string value;
    2: optional bool canEdit;
    3: optional i32 width;
    4: optional i32 height;
    5: required ValueType type;
}

struct TimeValue {
    1: required string value;
    2: optional bool canEdit;
    5: required ValueType type;
}

struct RangeTimeValue {
    1: required string start;
    2: required string end;
    3: optional bool canEdit;
    4: required ValueType type;
}

struct InputValue {
    1: required string value;
    2: optional bool canEdit;
    3: required ValueType type;
}

struct TextareaValue {
    1: required string value;
    2: optional bool canEdit;
    3: required ValueType type;
}

struct NumberValue {
    1: required i32 value;
    2: optional bool canEdit;
    3: required ValueType type;
}

struct BooleanValue {
    1: required bool value;
    2: optional bool canEdit;
    3: required ValueType type;
}

struct ColorValue {
    1: required string value;
    2: optional bool canEdit;
    3: required ValueType type;
}
