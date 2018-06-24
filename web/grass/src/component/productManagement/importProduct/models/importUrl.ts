import { observable, computed, action } from "mobx";

export default class ImportUrl {
	@observable public textAreaValue;
	@observable public source;
	@observable public errorInfo;
	constructor() {
		this.textAreaValue = "";
		this.source = "0";
		this.errorInfo = false;
	}

	@computed
	get ButtonState() {
		if (this.textAreaValue !== "" && this.source !== "0") {
			return false;
		} else {
			return true;
		}
	}

	@action.bound
	selectSource(value) {
		this.source = value;
	}

	@action.bound
	updateUrl(value) {
		this.textAreaValue = value;
	}

	@action.bound
	setErrorInfo(value) {
		this.errorInfo = value;
	}
}
