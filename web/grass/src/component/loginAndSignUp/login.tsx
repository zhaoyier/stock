import * as React from "react";
import { Form, Input, Icon, Button } from "antd";

import * as Fetch from "fetch.io";
import { FormComponentProps } from "antd/lib/form/Form";

import { GAccountSigin } from "services/account/account";

const FormItem = Form.Item;

interface CreateProps {
	data?: any;
}
interface CreateState {
	options: any;
}

function hasErrors(fieldsError) {
	return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class SigninPage extends React.Component<CreateProps & FormComponentProps, CreateState> {
	state: CreateState = {
		options: []
	};
	isEdit = Boolean(this.props.data);

	componentDidMount() {}

	handleSubmit = e => {
		e.preventDefault();
		this.props.form.validateFields((err, values) => {
			if (!err) {
				console.log("Received values of form: ", values);
			}
			// GAccountSigin(values).then( res => {
			// 	console.log("=====>>>sigin:", res);
			// }).catch(res => {
			// 	console.log("===>>>sigin catch:", res);
			// })

			// Fetch("http://localhost:12101/account/login", {
			// 	method: "POST",
			// 	headers: { "Accept": "application/json", "Content-Type": "application/json", },
			// 	body: JSON.stringify(values)
			// })
			// .then(response => response.json())
			// .then(res => {
			// 	console.log("=====>>then:", res);
			// })
			// .catch(res => {
			// 	console.log("=====>>catch:", res);
			// });
			const fetchOption = {
				method: "POST",
				headers: { Accept: "application/json", "Content-Type": "application/json" },
				body: JSON.stringify({ username: "hello", password: "world", captcha: "00101" })
			};
			fetch("http://localhost:12101/account/login", fetchOption)
				.then(response => response.json())
				.then(responseJson => {
					console.log("==>>then:", responseJson);
				})
				.catch(function(e) {
					console.log("===>>catch:", "Oops, error");
				});
		});
	};

	render() {
		const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

		// Only show error after a field is touched.
		const userNameError = isFieldTouched("userName") && getFieldError("userName");
		const passwordError = isFieldTouched("password") && getFieldError("password");
		return (
			<Form layout="inline" onSubmit={this.handleSubmit}>
				<FormItem validateStatus={userNameError ? "error" : "success"} help={userNameError || ""}>
					{getFieldDecorator("userName", {
						rules: [{ required: true, message: "Please input your username!" }]
					})(
						<Input
							prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
							placeholder="Username"
						/>
					)}
				</FormItem>
				<FormItem validateStatus={passwordError ? "error" : "success"} help={passwordError || ""}>
					{getFieldDecorator("password", {
						rules: [{ required: true, message: "Please input your Password!" }]
					})(
						<Input
							prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
							type="password"
							placeholder="Password"
						/>
					)}
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" disabled={hasErrors(getFieldsError())}>
						Log in
					</Button>
				</FormItem>
			</Form>
		);
	}
}

export default Form.create<CreateProps>()(SigninPage);
