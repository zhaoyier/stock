import { Category } from "./../../../../services/BootyBayService";
// import { sortBy } from 'sort-array';

// import { isCN } from 'util/kit';
import { Sku } from "./../../../../services/activity/activity";
import { observable, action, toJS, runInAction, keys } from "mobx";
// import sortBy from "sort-array";
import _ from "lodash";
import cartesian from "cartesian";
import { getToken } from "../../../../api/other";

import { getUrlParams } from "../../../../util/url";
import { getOriginCode } from "../../../../util/kit";
import { UserProductDetail, ProductDetail, SkuValue } from "../../../../services/EzSellerService";
import { GetCategoryValueOptions, GetCategory } from "../../../../services/BootyBayService";
// import { ObservableArray } from "mobx/lib/types/observablearray";
import accountInfo from "../../../../util/accountInfo";

export default class ProductEdit {
	@observable public isSpu: boolean;
	@observable public productDetail: ProductDetail;
	@observable public skuProps: Array<any>;
	@observable public skuRules: Array<any>;
	@observable public token: string;
	@observable public baseUrl: string;
	@observable public params: any;
	@observable public breadcrumb: string;
	constructor() {
		this.isSpu = true;
		this.productDetail = {
			base: {
				pid: 0,
				categoryId: 0,
				name: "",
				description: "",
				primaryImage: "",
				images: [],
				isOnSale: true,
				originCode: "",
				shipmentInfo: 1,
				attributes: {},
				sellType: 0,
				url: "",
				skuProps: [],
				enName: "",
				isStocked: false,
				forceOffSale: false,
				committed: false,
				source: 0
			},
			skus: [
				{
					skuId: 0,
					name: "",
					skuImage: "",
					images: [],
					isOnSale: true,
					attributes: {},
					price: 0,
					originalPrice: 0,
					weight: 0,
					quantity: 0,
					shippingFee: 0,
					volume: { length: 0, width: 0, height: 0 },
					sellerSkuId: ""
				}
			]
		};
		this.params = getUrlParams(window.location.href);
		this.skuProps = this.skuRules = [];
		this.initProductDetail();
		this.initUploadToken();
	}

	initProductDetail() {
		// const paramObj = getUrlParams(window.location.href);
		console.log("====>>init:", this.params);
		if (this.params["cName"]) {
			this.breadcrumb = decodeURIComponent(this.params["cName"]);
		}

		if (this.params["source"] === "import") {
			// 一键导入
			UserProductDetail(Number(this.params["pid"])).then(res => {
				console.log("=====>>imp:", toJS(res));
				this.productDetail = res;
				// 根据分类ID查看类目
				if (!this.params["cName"] && res.base.categoryId > 0) {
					this.initBreadcrumb(res.base.categoryId);
				}
				// 切换类目需要更新 cid
				// const cid = getUrlParams(window.location.hash)["cid"];
				if (this.params["cid"]) {
					this.productDetail.base.categoryId = this.params["cid"];
				}
				this.isSpu = !res.base["isSku"];
				this.skuProps = res.base.skuProps;
				let sortKey = this.skuProps.map(item => {
					return item.propName;
				});
				let pattern = /color|颜色/i;
				this.skuProps.forEach((item, index) => {
					if (pattern.test(item.propName)) {
						this.skuProps.unshift(this.skuProps.splice(index, 1)[0]);
					}
				});
				console.log("=====>00012:", toJS(this.skuProps));
				this.skuRules = _.sortBy(
					res.skus.map(item => {
						return Object.assign({}, item, item.attributes);
					}),
					sortKey
				);
			});
		} else {
			// 自主发布 nothing need to do
			GetCategoryValueOptions(Number(this.params["cid"]), true).then(res => {
				const lang = (accountInfo.shop && accountInfo.shop.originCode) || "";

				(res.multi || []).map((item, index) => {
					this.skuProps.push({
						propId: index,
						propName: item.translation[lang] || item.pname,
						values: (item["values"] || []).map(value => {
							return { valueId: value.vid, valueName: value.translation[lang] || value.vname };
						})
					});
					console.log("====>>>init:", toJS(this.skuProps));
				});
				console.log("====>>>breadcrumb:", this.params);
				this.breadcrumb = decodeURIComponent(this.params["cName"]);
			});
		}
	}

	initBreadcrumb(cid: number) {
		GetCategory(cid)
			.then(res => {
				if (cid === res.cid && res.breadcrumb) {
					const origin = getOriginCode();
					const categories = res.breadcrumb.map(item => {
						return item.translation[origin] ? item.translation[origin] : item.name;
					});
					this.breadcrumb = categories.join(">");
				}
			})
			.catch(res => {
				console.log("[initBreadcrumb] 异常:", res);
			});
	}

	initUploadToken() {
		getToken(info => {
			this.token = info.token;
			this.baseUrl = info.baseUrl;
		});
	}

	@action.bound
	updateProductDetail(newData) {
		this.productDetail = newData;
	}

	@action.bound
	setSkuOrSpu(value) {
		this.isSpu = value;
	}

	@action.bound
	setSkuRulesProps(key, value, index) {
		const keys = key.split(".");
		console.log("===>>set props:", key, value);
		if (index === undefined) {
			this.skuRules = this.skuRules.map(item => {
				keys.length >= 2 ? (item[keys[0]][keys[1]] = value) : (item[key] = value);
				return item;
			});
		} else {
			keys.length >= 2
				? (this.skuRules[index][keys[0]][keys[1]] = value)
				: (this.skuRules[index][key] = value);
		}
	}

	@action.bound
	setSkuProps(propsIndex, skuIndex, value, model) {
		console.log("===>>>set props:", propsIndex, skuIndex, value, model);
		switch (model) {
			case "add": // 追加 skuRules
				if (this.skuProps[propsIndex].values.find(item => item["valueName"] === value["valueName"])) {
					return this.skuProps[propsIndex].propName + `: ${value.valueName} 已存在`;
				}
				this.skuProps[propsIndex].values.push(value);
				this.resetSkuRules(this.skuProps[propsIndex].propName, value.valueName, model);
				break;
			case "edit": // 重新构造 skuRules
				if (this.skuProps[propsIndex].values[skuIndex].valueName !== value.valueName) {
					this.resetSkuRules(this.skuProps[propsIndex].propName, value.valueName, model);
				}
				this.skuProps[propsIndex].values[skuIndex] = value;
				break;
			case "del": // 重新构造 skuRules
				this.skuProps[propsIndex].values.splice(skuIndex, 1);
				this.resetSkuRules(this.skuProps[propsIndex].propName, value.valueName, model);
				break;
			default:
				break;
		}
	}

	@action.bound
	resetSkuRules(key, value, model) {
		switch (model) {
			case "edit":
				this.skuRules = this.skuRules.map(item => {
					item[key] = value;
					return item;
				});
				break;
			case "del":
				this.skuRules = this.skuRules.filter(item => item[key] !== value);
				break;
			case "add":
				const result = this.skuRules.filter(item => !item[key]);
				console.log("====>>add 000:", result);
				if (result.length) {
					this.skuRules = this.skuRules.map(item => {
						item[key] = value;
						return item;
					});
					console.log("====>>add 001:", this.skuRules);
					return;
				}

				let skuProps = this.skuProps.filter(item => item.propName !== key && item.values.length > 0);
				// skuProps = skuProps.map(item => {
				// 	return
				// })
				console.log("====>>add 01:", skuProps, this.skuRules.length);
				skuProps = skuProps.concat([{ propName: key, values: [{ valueName: value }] }]);
				console.log("====>>add 02:", skuProps);
				let props = {};
				for (let i in skuProps) {
					props[skuProps[i].propName] = skuProps[i].values.map(item => item.valueName);
				}
				console.log("====>>add 03:", toJS(props));
				const skus = cartesian(props);
				console.log("====>>add 04:", toJS(skus));
				skus.map(item => {
					console.log("====>>add 05:", toJS(item));
					this.skuRules.push(_.merge(item, { volume: {} }));
				});
				console.log("====>>add 08:", toJS(this.skuRules));
		}
	}

	@action.bound
	setBaseDescription(remark: string) {
		this.productDetail.base.description = remark;
	}
}
