import * as moment from "moment";
import { getText } from "util/kit";

export function getPublishTime(num: number) {
	const now = new Date();
	const yesterday = moment(now).dates(moment(now).dates() - 1).hour(0).minutes(0).seconds(0).unix();
	const nowDayStart = moment(new Date()).hour(0).minutes(0).seconds(0).unix();
	const numMoment = moment(num * 1000);
	if (num > nowDayStart) {
		return 	`${getText("Today")} ${numMoment.format("HH:mm")}`;
	} else if (num > yesterday) {
		return 	`${getText("Yesterday")} ${numMoment.format("HH:mm")}`;
	} else {
		return numMoment.format("YYYY-MM-DD");
	}
}