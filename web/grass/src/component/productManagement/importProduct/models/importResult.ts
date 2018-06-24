import { defaultConfig } from "./../../constant";
import { parse } from "querystring";
import { observable, action, toJS, runInAction } from "mobx";
import {
	ImportTaskDetailList,
	ProductImportTaskTabStatus
} from "../../../../services/ezseller/Product";
import { getUrlParams } from "../../../../util/url";
// interface TableData {
// 	total: number;
// 	list: Array<any>;
// }

export default class ImportResult {
	@observable total: number;
	@observable page: number;
	@observable isSpu: boolean;
	@observable group: any;
	@observable toPubCount: number;
	@observable pubCount: number;
	@observable delCount: number;
	@observable failCount: number;
	@observable products: Array<any>;
	@observable public params: any;
	@observable public pageSize: any;
	@observable public activeTab: string;
	@observable tabState;

	constructor() {
		this.group = {
			toPubCount: 0,
			pubCount: 0,
			delCount: 0,
			failCount: 0
		};
		this.page = 1;
		this.activeTab = ProductImportTaskTabStatus.ProductImportTaskTabStatusTodo;
		this.params = getUrlParams(window.location.href);
		this.tabState = ProductImportTaskTabStatus.ProductImportTaskTabStatusTodo;
		this.loadTableList();
	}

	loadTableList(status = this.tabState, page = 1, limit = defaultConfig.limit) {
		const paramObj = getUrlParams(window.location.href);
		console.log("===>>loadTableList:", page, limit, paramObj);
		ImportTaskDetailList({
			taskId: this.params["id"],
			status,
			limit,
			offset: (page - 1) * defaultConfig.limit
		}).then(res => {
			this.page = page;
			this.tabState = status;
			this.group = res.group ? res.group : {};
			// this.pubCount = res.group ? res.group.pubCount : 0;
			// this.delCount = res.group ? res.group.delCount : 0;
			// this.failCount = res.group ? res.group.failCount : 0;
			this.total = res.total || 0;
			this.isSpu = res.isSpu || false;
			this.products = [];
			this.pageSize = 0;
			res.set.map(item => {
				// this.products ? null : this.products = [];
				console.log("====>>set:", toJS(item.infos), this.products.concat(item.infos));
				!!item.infos ? (this.products = this.products.concat(item.infos)) : null;
				!!item.infos ? (this.pageSize += item.infos.length) : null;
			});

			// console.log("===>>products:", toJS(this.products), toJS(this.group));

			// this.isSup ? (this.products = (res.set || []).filter(item => !!item.infos)) : (this.products = this.products.concat((res.set || []).filter(item => !!item.infos)));

			// 这里应该有sku和spu的判断，数据结构不太确定，暂时搁置。
			// this.table[status - 1].list = res.set[0] && res.set[0].infos;
			// this.table[status - 1].total = res.total;
			// this.table[0].total = res.group.toPubCount;
			// this.table[1].total = res.group.pubCount;
			// this.table[2].total = res.group.delCount;
			// this.table[3].total = res.group.failCount;
		});
	}

	@action.bound
	changeTab(status) {
		this.activeTab = status;
		this.loadTableList(status);
	}

	@action.bound
	reloadProducts(page = 1, limit = defaultConfig.limit) {
		this.loadTableList(this.tabState, page, limit);
	}

	@action.bound
	setProductSensitive(state, record) {
		console.log("=====>>300:", state, record);
		this.products = this.products.map(item => {
			// console.log("=====>>301:", item.childTaskId, record.childTaskId);
			if (item.childTaskId === record.childTaskId) {
				console.log("=====>>302:", state);
				item.sensitive = state;
			}
			return item;
		});
		// 判断SPU/SKU
		// for (let i in this.products) {
		// 	console.log("=====>>301:", record.childTaskId, this.products[i].childTaskId);
		// 	if (this.products[i].childTaskId === record.childTaskId) {
		// 		console.log("=====>>302:", state);
		// 		this.products[i].sensitive = state;
		// 		if (this.isSpu) {
		// 			return;
		// 		}
		// 	}
		// }
	}

	@action.bound
	getContinuousNumber(key, value, index) {
		// console.log("====>>>013:", key, value, index);
		let pre = -1,
			total = 0;
		if (this.products[index][key] !== value) return 0;

		for (let i in this.products) {
			// 判断索引是否第一个
			if (this.products[i][key] === value && index - 1 === Number(i)) {
				return 0;
			}
		}

		for (let i in this.products) {
			if (i < index) continue;
			if (this.products[i][key] === value && (pre === -1 || Number(i) - pre === 1)) {
				total += 1;
				pre = Number(i);
				continue;
			}
			break;
		}

		return total;
	}
}
