import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";

import { Tabs } from "antd";
import moment from "moment";

import TableWaitPublish from "./tables/waitPublish";
import TablePublish from "./tables/published";
import TableDeleted from "./tables/deleted";
import TableFailed from "./tables/failed";

import ImportResultModel from "../models/importResult";
import getBreadCrumb from "../breadCrumb";
import { ProductImportTaskTabStatus } from "services/ezseller/Product";

const styles = require("../index.scss");

const TabPane = Tabs.TabPane;

interface ImportResultProps {
	store: ImportResultModel;
}

@observer
class ImportResult extends Component<ImportResultProps, {}> {
	render() {
		const { products, changeTab, group, params, activeTab } = this.props.store;
		return (
			<div>
				<div>
					<div className={styles.import__form}>
						<div className={`${styles.map__path} ${styles.clearfix}`}>{getBreadCrumb(3)}</div>
						<div style={{ marginTop: 15, marginBottom: 15 }}>
							<span>
								{" "}
								导入时间： {moment(params["createTime"] * 1000).format("YYYY-MM-DD HH:mm:ss")}{" "}
							</span>
							{activeTab === ProductImportTaskTabStatus.ProductImportTaskTabStatusPub && (
								<span style={{ float: "right" }}>
									{" "}
									若您要对已上架商品进行编辑，请前往<a href="/#/arrangeProduct">查看商品</a>{" "}
								</span>
							)}
						</div>

						<div>
							<Tabs activeKey={activeTab} onChange={e => changeTab(e)}>
								<TabPane
									tab={`待发布 (${group.toPubCount})`}
									key={ProductImportTaskTabStatus.ProductImportTaskTabStatusTodo}
								>
									<TableWaitPublish store={this.props.store} />
								</TabPane>
								<TabPane
									tab={`已上架 (${group.pubCount})`}
									key={ProductImportTaskTabStatus.ProductImportTaskTabStatusPub}
								>
									<TablePublish store={this.props.store} />
								</TabPane>
								<TabPane
									tab={`已删除 (${group.delCount})`}
									key={ProductImportTaskTabStatus.ProductImportTaskTabStatusDel}
								>
									<TableDeleted store={this.props.store} />
								</TabPane>
								<TabPane
									tab={`导入失败 (${group.failCount})`}
									key={ProductImportTaskTabStatus.ProductImportTaskTabStatusFail}
								>
									<TableFailed store={this.props.store} />
								</TabPane>
							</Tabs>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default () => <ImportResult store={new ImportResultModel()} />;
