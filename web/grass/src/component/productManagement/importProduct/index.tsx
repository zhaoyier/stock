import * as React from "react";
import { Component } from "react";
import { observer } from "mobx-react";
import { Icon, Input, Alert, Button, Select, Form, message } from "antd";
import ImportUrl from "./models/importUrl";
import getBreadCrumb from "./breadCrumb";
import { defaultPlatforms } from "../constant";

// API
import { ImportTaskAdd } from "../../../services/ezseller/Product";

const { TextArea } = Input;
const { Option } = Select;
const styles = require("./index.scss");

interface ImportProductProps {
	store: ImportUrl;
}

interface ImportProductState {}

@observer
class ImportProduct extends Component<ImportProductProps, ImportProductState> {
	constructor(props) {
		super(props);
		this.state = {};
		this.submit = this.submit.bind(this);
	}

	submit() {
		const { textAreaValue, source, setErrorInfo } = this.props.store;
		ImportTaskAdd({
			urls: [textAreaValue],
			source: source
		})
			.then(res => {
				switch (res.result.code) {
					case 0:
						message.success("导入成功");
						window.location.hash = "#/importRecord";
						break;
					case 1:
						message.error("不支持的平台");
						setErrorInfo(true);
						break;
					default:
						message.warn("未知错误，请检查url");
						break;
				}
			})
			.catch(res => {
				message.error("服务器错误");
			});
	}

	render() {
		const { ButtonState, updateUrl, textAreaValue, selectSource, errorInfo } = this.props.store;
		return (
			<div>
				<div className={styles.import__form}>
					<div className={`${styles.map__path} ${styles.clearfix}`}>
						{getBreadCrumb(1)}
						<a style={{ float: "right" }} href={`${window.location.pathname}#/importRecord`}>
							<Icon type="book" />查看导入记录
						</a>
					</div>
					<div className={styles.tips}>
						<span style={{ color: "#000" }}>一键导入</span>
						<span>
							功能帮助卖家快速从第三方平台上快速导入商品素材的工具，支持全店导入，同时支持商品批量导入。
						</span>
					</div>
					<div className={`${styles.form__item} ${styles.clearfix}`}>
						<label htmlFor="importSource">
							<span className={styles.label}>1、导入来源</span>
							<Select onChange={e => selectSource(e)} style={{ width: 240 }} defaultValue="unknown">
								{defaultPlatforms.map(elem => (
									<Option key={elem.key} value={elem.value}>
										{elem.text}
									</Option>
								))}
							</Select>
						</label>
					</div>
					<div className={`${styles.form__item} ${styles.clearfix}`}>
						<label htmlFor="importUrl">
							<span className={styles.label}>2、导入链接</span>
							<TextArea
								onChange={e => updateUrl(e.target.value)}
								value={textAreaValue}
								style={{ width: 600 }}
								className={styles.user__control}
								id="importUrl"
								autosize={{ minRows: 10, maxRows: 12 }}
							/>
						</label>
					</div>
					{errorInfo && (
						<div className={`${styles.form__item} ${styles.clearfix}`}>
							<span className={styles.label}>&nbsp;</span>
							<div style={{ width: 600, float: "right" }}>
								<Alert message="请检查输入的链接是否和所选择的来源平台一致" type="error" showIcon />
							</div>
						</div>
					)}
					<div className={`${styles.form__item} ${styles.clearfix}`}>
						<span className={styles.label}>&nbsp;</span>
						<div style={{ width: 600, float: "right" }}>
							<Alert message="多个URL地址请换行" type="warning" showIcon />
						</div>
					</div>
					<div className={`${styles.form__item} ${styles.clearfix}`}>
						<span className={styles.label}>&nbsp;</span>
						<Button
							onClick={this.submit}
							disabled={ButtonState ? true : undefined}
							style={{ width: 200 }}
							type="primary"
						>
							下一步
						</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default () => <ImportProduct store={new ImportUrl()} />;
