import * as moment from "moment";

export function formatUnixTime(t: string | number): string {
	if (!t) return "";

	if (typeof t === "string") {
		t = Number(t);
	}

	if (t > 0) {
		return moment.unix(t).format("YYYY-MM-DD HH:mm:SS");
	} else {
		return "";
	}
}
