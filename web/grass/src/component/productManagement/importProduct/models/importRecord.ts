import { observable, action } from "mobx";
import { defaultConfig } from "../../constant";
import { ImportTaskList, ProductImportTaskStatus } from "../../../../services/ezseller/Product";

export default class ImportRecord {
	@observable public waitpublish;
	@observable public published;
	@observable public failed;
	@observable public deleted;
	@observable public tableList;
	@observable public timer;
	@observable public current;
	@observable public total;
	constructor() {
		this.waitpublish = 123;
		this.published = 23;
		this.failed = 12;
		this.deleted = 13;
		this.tableList = [];
		this.timer = 0;
		this.getTaskList();
		// ImportTaskList({ limit: 10, offset: 0 }).then(res => {
		// 	this.tableList = res.infos;
		// });
	}

	@action.bound
	setTimer(timer) {
		this.timer = timer;
	}

	@action.bound
	getTaskList(offset = 0, limit = defaultConfig.limit) {
		ImportTaskList({ limit, offset }).then(res => {
			if (!res.result.code) {
				this.total = res.total;
				this.tableList = res.infos;

				let ps = res.infos.filter(
					item => item.status === ProductImportTaskStatus.ProductImportTaskStatusProcessing
				);
				console.log("====>>result:", ps);
				ps.length <= 0 && clearInterval(this.timer);
			}
		});
	}
}
