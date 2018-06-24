import * as React from "react";
import { Input, Icon, AutoComplete, Button, DatePicker, message } from "antd";
import ReactEcharts from "echarts-for-react";
import {
    getText
} from "../../../util/kit";
import {
    UserSearchProductAnalytics,
    UserSearchProductAnalyticsFilter,
    UserSearchProductAnalyticsItem,
    UserGetProductAnalytics,
    UserGetProductAnalyticsFilter,
    UserGetProductAnalyticsItem,
    UserProductAnalyticsReportExportTask
} from "../../../services/EzSellerService";
import {
    defaultAnalyticsFilter,
    defaultAnalyticsItem,
    defaultReportFilter
} from "../common/constant";
import {
    getProductLink
} from "../../../util/url";
import accountInfo from "../../../util/accountInfo";
import { alterTaskListSearchInfo } from "../../../action/order";
import { redirect } from "../../../util/history";
import { getSearchParamValue } from "../../../util/url";
import "./index.scss";

const { assign } = Object;
const { RangePicker } = DatePicker;
const language = accountInfo.shop && accountInfo.shop.originCode === "CN" ? 1 : 2;
const moment: any = require("moment");

interface SingleProductState {
    analyticsFilter: UserSearchProductAnalyticsFilter;
    analyticsItems: UserSearchProductAnalyticsItem[];
    analyticsItem: UserSearchProductAnalyticsItem;
    reportFilter: UserGetProductAnalyticsFilter;
    reportItems: UserGetProductAnalyticsItem[];
}

class SingleProduct extends React.Component<any, SingleProductState> {
    state: SingleProductState = {
        analyticsFilter: defaultAnalyticsFilter,
        analyticsItems: [],
        analyticsItem: defaultAnalyticsItem,
        reportFilter: defaultReportFilter,
        reportItems: []
    };
    componentDidMount() {
        this.fromAllProductPage();
    }
    fromAllProductPage() {
        let searchUrl = location.href.split("singleProduct")[1];
        searchUrl = decodeURIComponent(searchUrl);
        const productName = getSearchParamValue("productName", searchUrl);
        const productId = parseInt(getSearchParamValue("productId", searchUrl));
        const imageUrl = getSearchParamValue("imageUrl", searchUrl);
        const rangeStart = parseInt(getSearchParamValue("rangeStart", searchUrl));
        const rangeEnd = parseInt(getSearchParamValue("rangeEnd", searchUrl));
        if ( productId ) {
            const callBack = () => {
                const item = {
                    productName,
                    productId,
                    imageUrl
                };
                this.setState({ analyticsItem: item }, this.userGetProductAnalytics);
                this.setAnalyticsFilter({keyword: productName});
            };
            this.setReportFilter({
                rangeStart,
                rangeEnd
            }, callBack);
        }
    }
    setAnalyticsFilter(parm: UserSearchProductAnalyticsFilter, cb = () => {}) {
        const { analyticsFilter } = this.state;
        const currentAnalyticsFilter = assign({}, analyticsFilter, parm);
        this.setState({ analyticsFilter: currentAnalyticsFilter}, cb);
    }
    setReportFilter(parm: Partial<UserGetProductAnalyticsFilter>, cb = () => {}) {
        const { reportFilter } = this.state;
        const currentReportFilter = assign({}, reportFilter, parm);
        this.setState({ reportFilter: currentReportFilter}, cb);
    }
    onAutoCompleteSelect(val: string) {
        const { analyticsItems } = this.state;
        const item = analyticsItems.filter(item => item.productName === val)[0];
        if (item) {
            this.setState({ analyticsItem: item }, this.userGetProductAnalytics);
        }
        const key = val.slice(0, 4) === "http" ? "url" : "keyword";
        this.setAnalyticsFilter({[key]: val}, this.userSearchProductAnalytics);
    }
    userGetProductAnalytics() {
        const { rangeStart, rangeEnd } = this.getCurrentReportFilter();
        if ( rangeEnd - rangeStart > 31 * 24 * 60 * 60 ) {
            message.warn("Can only choose within one month");
            return;
        }
        UserGetProductAnalytics(this.getCurrentReportFilter())
            .then(result => this.setState({ reportItems: result.items }));
    }
    userSearchProductAnalytics() {
        const { analyticsFilter } = this.state;
        UserSearchProductAnalytics(analyticsFilter)
            .then(result => {
                result.items ?
                this.setState({ analyticsItems: result.items }) :
                this.setState({ analyticsItems: [] });
            });
    }
    reportExportTask() {
        const { dispatch } = this.props;
        const filter = this.getCurrentReportFilter();
        const { rangeStart, rangeEnd } = filter;
        if ( rangeEnd - rangeStart > 31 * 24 * 60 * 60 ) {
            message.warn("Can only choose within one month");
            return;
        }
        UserProductAnalyticsReportExportTask(filter, language)
            .then(result => {
                dispatch(alterTaskListSearchInfo({taskId: result.id}));
                redirect("/exportTask");
            });
    }
    getCurrentReportFilter(): UserGetProductAnalyticsFilter {
        const { reportFilter, analyticsItem } = this.state;
        const { productId } = analyticsItem;
        return {
            productId,
            rangeStart: Math.floor(reportFilter.rangeStart / 1000),
            rangeEnd: Math.floor(reportFilter.rangeEnd / 1000) + 24 * 60 * 60
        };
    }
    getConversionOption() {
        const { reportItems } = this.state;
        const xAxisData = reportItems && reportItems.length > 0 &&
            reportItems.map(item => {
                const { day, month } = item.date ? item.date : {day: 0, month: 0};
                return `${month}-${day}`;
        });
        const seriesData = reportItems && reportItems.length > 0 &&
            reportItems.map(item => item.AddToCartCount);
        return {
            tooltip : {
                trigger: "axis",
                axisPointer: {
                    animation: false
                }
            },
            toolbox: {
                right: 40,
                feature: {
                  dataZoom: {
                      yAxisIndex: "none",
                      title: {
                        zoom: getText("zoom"),
                        back: getText("zoom out")
                      }
                  },
                  restore: {
                    title: getText("back to original view")
                  },
                  saveAsImage: {
                    title: getText("save as image")
                  }
                }
            },
            legend: {
                data: [getText("add-on items number")]
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#5793f3"
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return params.value
                                    + (params.seriesData.length ? `: ${params.seriesData[0].data}` : "");
                            }
                        }
                    },
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: getText("add-on items number"),
                    type: "line",
                    smooth: true,
                    data: seriesData
                }
            ]
        };
    }
    getSaleOption() {
        const { reportItems } = this.state;
        const xAxisData = reportItems && reportItems.length > 0 &&
            reportItems.map(item => {
                const { day, month } = item.date ? item.date : {day: 0, month: 0};
                return `${month}-${day}`;
        });
        const salesAmount = reportItems && reportItems.length > 0 &&
            reportItems.map(item => item.SalesAmount / 100);
        return {
            tooltip : {
                trigger: "axis",
                axisPointer: {
                    animation: false
                }
            },
            toolbox: {
                right: 40,
                feature: {
                  dataZoom: {
                      yAxisIndex: "none",
                      title: {
                        zoom: getText("zoom"),
                        back: getText("zoom out")
                      }
                  },
                  restore: {
                    title: getText("back to original view")
                  },
                  saveAsImage: {
                    title: getText("save as image")
                  }
                }
            },
            legend: {
                data: [getText("revenue")]
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#5793f3"
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                return params.value
                                    + (params.seriesData.length ? "：" + params.seriesData[0].data : "");
                            }
                        }
                    },
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: getText("revenue"),
                    type: "line",
                    smooth: true,
                    data: salesAmount
                }
            ]
        };
    }
    getOrderOption() {
        const { reportItems } = this.state;
        const xAxisData = reportItems && reportItems.length > 0 &&
            reportItems.map(item => {
                const { day, month } = item.date ? item.date : {day: 0, month: 0};
                return `${month}-${day}`;
        });
        const totalOrderCount = reportItems && reportItems.length > 0 &&
            reportItems.map(item => item.TotalOrderCount);
        return {
            tooltip : {
                trigger: "axis",
                axisPointer: {
                    animation: false
                }
            },
            toolbox: {
                right: 40,
                feature: {
                  dataZoom: {
                      yAxisIndex: "none",
                      title: {
                        zoom: getText("zoom"),
                        back: getText("zoom out")
                      }
                  },
                  restore: {
                    title: getText("back to original view")
                  },
                  saveAsImage: {
                    title: getText("save as image")
                  }
                }
            },
            legend: {
                data: [getText("total orders number")]
            },
            xAxis: [
                {
                    type: "category",
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLine: {
                        onZero: false,
                        lineStyle: {
                            color: "#5793f3"
                        }
                    },
                    axisPointer: {
                        label: {
                            formatter: function (params) {
                                const { seriesData } = params;
                                const getSeriesData = (key: string) => {
                                    return seriesData.length ? "：" + reportItems[seriesData[0].seriesIndex][key] : "";
                                };
                                return (`
                                    ${getText("cash off orders number") + getSeriesData("CashoffCount") }
                                    ${getText("flash deal orders number") + getSeriesData("FlashSalesCount") }
                                    ${getText("free shipping orders number") + getSeriesData("FreeShippingCount") }
                                    ${getText("friends deal orders number") + getSeriesData("FriendsDealCount") }
                                    ${getText("other orders number") + getSeriesData("OtherOrdersCount") }
                                `);
                            }
                        }
                    },
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: "value"
                }
            ],
            series: [
                {
                    name: getText("total orders number"),
                    type: "line",
                    smooth: true,
                    data: totalOrderCount
                }
            ]
        };

    }
    render() {
        const { analyticsFilter, analyticsItems, analyticsItem, reportFilter } = this.state;
        const { keyword } = analyticsFilter;
        const { rangeStart, rangeEnd } = reportFilter;
        const { productId, imageUrl, productName } = analyticsItem;
        return (
            <div className="singleProductWrap">
                <header>
                    <h1> {getText("single product analysis report")} </h1>
                    <div className="searchInputWrap">
                        <AutoComplete
                            className="searchAutoComplete"
                            onSearch={ val => {
                                const key = val.slice(0, 4) === "http" ? "url" : "keyword";
                                this.setAnalyticsFilter({[key]: val}, this.userSearchProductAnalytics);
                            } }
                            onSelect={this.onAutoCompleteSelect.bind(this)}
                            dataSource={analyticsItems.map(item => item.productName)}>
                            <Input
                                className="searchInput"
                                value={keyword}
                                prefix={<Icon type="search" />}
                                placeholder={ getText("Please enter your store keyword or paste commodity corresponding to URL") }/>
                        </AutoComplete>
                    </div>
                </header>
                {
                    productId ?
                    <section>
                        <div className="productWrap">
                            <div> <a href={getProductLink(productId)} target="_blank"> { productName } </a> </div>
                            <div>
                                <img src={imageUrl} alt="Sorry, no pictures!"/>
                            </div>
                        </div>
                        <div>
                            <RangePicker
                                defaultValue={ [moment(rangeStart), moment(rangeEnd)] }
                                onChange={ (dates, dateString) => this.setReportFilter({
                                    rangeStart: moment(dateString[0]).unix() * 1000,
                                    rangeEnd: moment(dateString[1]).unix() * 1000
                                }) }/>
                            <Button
                                type="primary"
                                icon="search"
                                style={{margin: "0 10px"}}
                                onClick={this.userGetProductAnalytics.bind(this)}>
                                {getText("search")} </Button>
                            <Button
                                type="primary"
                                icon="download"
                                onClick={this.reportExportTask.bind(this)}>
                                {getText("Single product report export")} </Button>
                        </div>
                        <div>
                            <p className="reportType">
                                <span className="greenPoint"></span>
                                <span> {getText("conversion-related")} </span>
                            </p>
                            <ReactEcharts
                                option={this.getConversionOption()}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"theme_name"}/>
                        </div>
                        <div>
                            <p className="reportType">
                                <span className="greenPoint"></span>
                                <span> {getText("sales-related")} </span>
                            </p>
                            <ReactEcharts
                                option={this.getSaleOption()}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"theme_name"}/>
                        </div>
                        <div>
                            <p className="reportType">
                                <span className="greenPoint"></span>
                                <span> {getText("total orders number")} </span>
                            </p>
                            <ReactEcharts
                                option={this.getOrderOption()}
                                notMerge={true}
                                lazyUpdate={true}
                                theme={"theme_name"}/>
                        </div>
                    </section> : null
                }
            </div>
        );
    }
}

export default SingleProduct;
