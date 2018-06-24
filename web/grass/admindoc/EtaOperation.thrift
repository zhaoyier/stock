namespace go rpc.etaoperation

struct TShipmentType{
    1: required i32 ShipmentTypeId;                     //ShipmentTypeId
    2: required string ShipmentTypeCode;                //运输方式Code
    3: required string ShipmentTypeName;                //运输方式中文名
    4: required string AltShipmentTypeName;             //运输方式英文名
}

struct TShipmentTypeRegion{
    1: required i32 ShipmentTypeRegionId;               //ShipmentTypeRegionId
    2: required i32 ActualEtaDays;                      //代购自助购eta天数
    3: required string EstimatedEtaDays;                //代购自助购试算eta天数
}

struct TShipmentTypeEtaSetting{
    1: required i32 ShipmentTypeEtaSettingId;           //ShipmentTypeEtaSettingId
    2: required i32 RangeStart;                          //一次付款ETA的Start
    3: required i32 RangeEnd;                            //一次付款ETA的End
}

struct TShipmentTypesAndDestCodes{
    1: required list<TShipmentType> ShipmentTypes;      //运输方式列表
    2: required list<string> DestCodes;                 //目的地列表
}

struct TResult{
    1: required i32 Code;                               //返回的结果Code【-1表示失败，1表示成功】
    2: required string Msg;                             //返回的结果消息，一般失败会有消息
}

service EtaOperation{
	///<summary>
    ///<summary>
    TShipmentTypesAndDestCodes LoadShipmentTypesAndDestCodesByCatalogCode(),

    ///<summary>
    ///获取二次付款方式的来源地区列表，条件【ShipmentTypeId,DestCode】
    ///<summary>
    list<string> LoadOriginCodesForTwicePaymentByShipmentTypeIdDestCode(1:i32 shipmentTypeId,2:string destCode),

    //<summary>
    ///查找单条ShipmentTypeRegion，条件【ShipmentTypeId,DestCode】
    ///<summary>
    TShipmentTypeRegion FindShipmentTypeRegionByShipmentTypeIdDestCodeOriginCode(1:i32 shipmentTypeId,2:string destCode,3:string originCode),

    ///<summary>
    ///获取一次付款方式的仓库列表，条件【ShipmentTypeId,DestCode】
    ///<summary>
    list<string> LoadWarehouseCodesForOncePaymentByShipmentTypeIdDestCode(1:i32 shipmentTypeId,2:string destCode),

    ///<summary>
    ///查找单条ShipmentTypeEtaSetting，条件【ShipmentTypeId,DestCode,WarehouseCode】
    ///<summary>
    TShipmentTypeEtaSetting FindShipmentTypeEtaSettingByShipmentTypeIdDestCodeWarehouseCode(1:i32 shipmentTypeId,2:string destCode,3:string warehouseCode),

    ///<summary>
    ///更新ShipmentTypeRegion，条件【TShipmentTypeRegion(ShipmentTypeRegionId,ActualEtaDays,EstimatedEtaDays)】
    ///<summary>
    TResult UpdateShipmentTypeRegion(1:TShipmentTypeRegion shipmentTypeRegion),

    ///<summary>
    ///更新ShipmentTypeEtaSetting，条件【TShipmentTypeEtaSetting(ShipmentTypeEtaSettingId,RangeStart,RangeEnd)】
    ///<summary>
    TResult UpdateShipmentTypeEtaSetting(1:TShipmentTypeEtaSetting shipmentTypeEtaSetting)
}
