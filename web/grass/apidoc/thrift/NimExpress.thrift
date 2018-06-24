namespace go ezbuy.apidoc.gen.nimexpress

enum APIErrorCode {
    UNKONWN,
    REC_COMPANY_IS_EMPTY = 2,
    MIDDLE_CODE_IS_EMPTY = 3,
    NOT_FOUND_REC_CITY_NAME = 4,
    NOT_FOUND_RECEIVE_NUMTEL = 5,
    NOT_FOUND_CUSTOMER_RECEIVER = 6,
    NOT_FOUND_QUOTATION = 7,
    NOT_FOUND_REC_CITY_CODE = 8,
    NOT_FOUND_AMPHUR = 9,
    USER_CODE_INVALID = 10,
    INVALID_REC_ZIP_CODE = 16,
    NOT_FOUND_REC_FULL_ADDRESS = 20,
    NOT_SHIPPING = 21,
    NOT_PRODUCT = 22
    WIDTH_IS_EMPTY = 23,
    HEIGHT_IS_EMPTY = 24,
    LONG_IS_EMPTY = 25,
    WEIGHT_IS_EMPTY = 26,
    OTHER_ERROR = 99,
}

// Parameter names for product
const string ParameterNameProductCode = "arg_product_code"
const string ParameterNameProductDesc = "arg_product_desc"
const string ParameterNameProductUnit = "arg_unit"
const string ParameterNameProductQuantity = "arg_qty"
const string ParameterNameProductWidth = "arg_width"
const string ParameterNameProductHeight = "arg_height"
const string ParameterNameProductLong = "arg_long"
const string ParameterNameProductWeight = "arg_weight"

// Parameter names for bill
const string ParameterNameUserCode = "arg_user_code"
const string ParameterNameRefNo = "arg_ref_no"
const string ParameterNameRefNo2 = "arg_ref_no2"
const string ParameterNameRecPreName = "arg_rec_prename"
const string ParameterNameRecName = "arg_rec_name"
const string ParameterNameRecCompany = "arg_rec_company"
const string ParameterNameRecAddress = "arg_rec_address"
const string ParameterNameRecRoad = "arg_rec_road"
const string ParameterNameRecTambon = "arg_rec_tambon"
const string ParameterNameRecAmpur = "arg_rec_ampur"
const string ParameterNameRecZipCode = "arg_rec_zip_code"
const string ParameterNameRecCityName = "arg_rec_city_name"
const string ParameterNameRecNumTel = "arg_rec_numtel"
const string ParameterNameRecMobile = "arg_rec_mobile"
const string ParameterNameRecFullAddress = "arg_rec_full_address"
const string ParameterNameRemark = "arg_remark"

struct TDeliveryProduct {
    1:required string productCode   // 标识
    2:required string productDesc   // 描述
    3:required string unit          // 打包方式, box or parcel
    4:required i32 quantity         // 数量
    5:required double width         // 宽度, 单位 cm
    6:required double height        // 高度, 单位 cm
    7:required double long          // 长度, 单位 cm
    8:required double weight        // 重量, 单位 kg
}

struct TDeliveryBill {
    1:required string userCode          // 商户代码, ezbuy
    2:optional string refNo             // refrence
    3:optional string refNo2            // customer (receiver) refrence
    4:required string recPreName        // title of receiver
    5:required string recName           // name of receiver
    6:required string recCompany        // receiver's company
    7:required string recAddress        // receiver's address
    8:optional string recRoad           // Road and/or alley name of receiver’s address
    9:required string recTambon         // Sub district (Tambon)
    10:required string recAmpur         // District (Ampur)
    11:required string recZipCode       // zip code
    12:required string recCityName      // province
    13:required string recNumTel        // Telephone number
    14:required string recMobile        // Mobile phone number
    15:required string recFullAddress   // full address
    16:optional string remark           // 备注
    17:required list<TDeliveryProduct> products // product list
}

struct TBillResponse {
    1:required string fullText
    2:required string trackingNo
    3:required string labelDestination
    4:required string barcodeDestination
    5:required list<string> listBarcodeBox
}

exception TBillException {
    1:required string errorMsg
}
