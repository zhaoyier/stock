import * as React from "react";

const path = [
	{
		url: "importProduct",
		name: "一键导入"
	},
	{
		url: "importRecord",
		name: "任务列表"
	},
	{
		url: "importResult",
		name: "本次导入结果"
	}
];

const getBreadCrumb = (step = 1) => {
	let breadCrumb: any = [];
	for (let i = 0; i < step; i++) {
		if (i === step - 1) {
			breadCrumb.push(
				<a key={i} style={{ color: "#333" }} href={window.location.href}>
					{path[i].name}
				</a>
			);
		} else {
			breadCrumb.push(
				<a
					key={i}
					style={{ opacity: 0.45, color: "#000" }}
					href={`${window.location.pathname}#/${path[i].url}`}
				>
					{path[i].name} /{" "}
				</a>
			);
		}
	}
	return (
		<h3 style={{ float: "left" }}>
			<span style={{ opacity: 0.45 }}>商品信息 / </span>
			{breadCrumb}
		</h3>
	);
};

export default getBreadCrumb;
