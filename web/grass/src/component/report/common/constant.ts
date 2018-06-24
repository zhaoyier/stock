import {
    UserSearchProductAnalyticsFilter,
    UserSearchProductAnalyticsItem,
    UserGetProductAnalyticsFilter,
    UserShopStatisticsReq
} from "../../../services/EzSellerService";

const date = new Date();

export const defaultAnalyticsFilter: UserSearchProductAnalyticsFilter = {
    keyword: "",
    url: "",
    offset: 0,
    limit: 10
};

export const defaultAnalyticsItem: UserSearchProductAnalyticsItem = {
    productId: 0,
    productName: "",
    imageUrl: ""
};

export const defaultReportFilter: UserGetProductAnalyticsFilter = {
    rangeStart: date.getTime() - 7 * 24 * 60 * 60 * 1000,
    rangeEnd: date.getTime(),
    productId: 0
};

export const defaultProductFilter: UserShopStatisticsReq = {
    rangeStart: date.getTime() - 7 * 24 * 60 * 60 * 1000,
    rangeEnd: date.getTime(),
};

export const saleItems = [
    {
        key: "vendorOrderAmount",
        val: "revenue"
    }, {
        key: "orderTotalCount",
        val: "total orders number"
    }, {
        key: "orderCancelCount",
        val: "cancelled orders number"
    }, {
        key: "orderCustomerCount",
        val: "placed customers number"
    }, {
        key: "orderPayCount",
        val: "paid customers number"
    }
];

export const orderItems = [
    {
        key: "orderCashOffCount",
        val: "cash off orders number"
    }, {
        key: "orderFlashSalesCount",
        val: "flash deal orders number"
    }, {
        key: "orderFreeShippingCount",
        val: "free shipping orders number"
    }, {
        key: "orderFriendsDealCount",
        val: "friends deal orders number"
    }, {
        key: "orderOtherCount",
        val: "other orders number"
    }
];
