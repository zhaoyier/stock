import * as Fetch from "fetch.io";

const Domain = "http://localhost:12101";
const NewFetch = new Fetch({
	prefix: "http://localhost:12101"
});

const request = new Fetch({
	prefix: "http://localhost:12101"
});

export function Post<T>(path: string, params: any): Promise<T> {
	return request
		.post(path)
		.set({
			Accept: "application/json",
			"Content-Type": "application/json"
		})
		.config({
			credentials: "omit"
		})
		.send(params)
		.json(true);
}
