import React from "react";
import "antd/dist/antd.css";
import { Cascader } from "antd";
import { GetAdmimAreasByDepth, GetAdmimAreasByParentId } from "services/ezseller/address";

interface AddressProps {
	onChange: Function;
	value: [any];
}

interface AddressState {
	options: any;
}

class Address extends React.Component<AddressProps, AddressState> {
	constructor(props) {
		super(props);
		this.state = {
			options: []
		};
	}

	componentWillMount() {
		this.getAdmimAreasByDepth();
	}

	getAdmimAreasByDepth() {
		GetAdmimAreasByDepth({ depth: 0 }).then(result => {
			if (result.result.code !== 0) return;
			this.setState({
				options: result.areas.map(item => ({
					value: JSON.stringify({
						id: item.id,
						name: item.name
					}),
					label: item.name,
					isLeaf: false
				}))
			});
		});
	}

	onChange = (value, selectedOptions) => {
		this.props.onChange({
			areasCode: value.map(item => {
				return JSON.parse(item)["id"];
			}),
			areasVal: value.map(item => {
				return JSON.parse(item)["name"];
			})
		});
	};

	loadData = selectedOptions => {
		const targetOption = selectedOptions[selectedOptions.length - 1];
		targetOption.loading = true;
		const value = JSON.parse(targetOption.value);
		GetAdmimAreasByParentId({ parentId: value.id }).then(result => {
			targetOption.loading = false;
			targetOption.children = result.areas.map(item => ({
				value: JSON.stringify({
					id: item.id,
					name: item.name
				}),
				label: item.name,
				isLeaf: selectedOptions.length < 2 ? false : true
			}));
			this.setState({
				options: [...this.state.options]
			});
		});
	};
	render() {
		const { value } = this.props;
		const data = value.join("/");
		return (
			<Cascader
				className="form__item__input"
				placeholder={data}
				options={this.state.options}
				loadData={this.loadData}
				onChange={this.onChange}
				changeOnSelect
			/>
		);
	}
}

export default Address;
