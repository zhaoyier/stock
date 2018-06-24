import { observable, action } from "mobx";
import {
	NewOrderListResult,
	UserOrderListNew,
	UserOrderListNewFilter,
	GetEzsellerNewMessageTmp
} from "../../../services/EzSellerService";
import {
	FilterDataType
} from "../common/constant";
import {
	getDefaultFilter
} from "../common/util";
// import {
//     getUnixTime,
//     getDefaultRangePicker
// } from "../common/util";


class OrderStore {
	constructor() {
		this.setNewOrderListResult();
	}
	@observable public isLoadingData: boolean = true;

	@observable public filterData: FilterDataType = {
		offset: 0,
		limit: 10,
		filter: getDefaultFilter()
	};
	@action.bound public setFilterData(parm: Partial<FilterDataType>) {
		if (parm.hasOwnProperty("filter")) {
			this.filterData = Object.assign({}, { ...this.filterData.filter, ...parm } as { filter: UserOrderListNewFilter }, { offset: 0, limit: this.filterData.limit });
			this.updateShouldUpdateRowsAndKeys(true);
		} else {
			this.filterData = Object.assign({}, this.filterData, parm);
		}
		this.updateExpandedRowKeys([]);
		this.setNewOrderListResult();
	}

	@observable public newOrderListResult: NewOrderListResult = {
		orderCount: {},
		data: []
	};
	@action.bound public setNewOrderListResult() {
		const { offset, limit, filter } = this.filterData;
		this.isLoadingData = true;
		UserOrderListNew(offset, limit, filter)
			.then(action((result: any) => {
				this.isLoadingData = false;
				this.newOrderListResult = result;
				this.setMessageBack();
			}));
	}

	@observable public expandedRowKeys: Array<string> = [];
	@action.bound public updateExpandedRowKeys(parm: Array<string>) {
		this.expandedRowKeys = parm;
	}

	@observable public shouldUpdateRowsAndKeys: boolean = false;
	@action.bound public updateShouldUpdateRowsAndKeys(parm: boolean) {
		this.shouldUpdateRowsAndKeys = parm;
	}

	@observable public messageBack: Array<string> = [];
	@action.bound public setMessageBack() {
		const allData = this.newOrderListResult.data || [];
		GetEzsellerNewMessageTmp({
			orderNums: allData.map(item => item.orderId),
			sender: 2,
			msgType: 1
		}).then(action(
			(result: any) => {
				if (result && result.result) {
					this.messageBack = Object.keys(result.result);
				}
			}
		));
	}

}

export default OrderStore;
