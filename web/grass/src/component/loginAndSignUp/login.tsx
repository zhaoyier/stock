import * as React from "react";
import { Icon, Input, Button, Checkbox, message } from "antd";
import * as Cookies from "js-cookie";
import Footer from "./common/footer";
import {
	AccountBase,
	AccountSignin,
	AccountCanSigninByPhone
} from "../../services/EzSellerService";
import { SellerTitleKey } from "./constant/arguments";
import Header from "./common/header";

import { getLangText } from "../../util/kit";
import { getLang } from "../../util/lang";

import "./css/login.scss";
import { phonePattern } from "util/regexp";

interface SigninPageState {
	checked: boolean;
	loading: boolean;
	username: string;
	password: string;
	phoneCanSignin: boolean;
}

class SigninPage extends React.Component<{}, SigninPageState> {

	constructor(props) {
		super(props);
		this.state = {
			checked: true,
			username: "",
			password: "",
			loading: false,
			phoneCanSignin: true
		};
	}
	usernameRef: Input;
	passwordRef: Input;

	login() {
		const getText = getLangText(getLang());
		const { username, password } = this.state;

		if (!this.validatePhone(username)) {
			return message.warn(getText("The current mobile number is bound to multiple stores, please use the login name!"));
		}

		if (!username && !password) {
			this.usernameRef.focus();
			return message.warn(getText("please_fill_username_passwd"));
		}

		if (!username) {
			this.usernameRef.focus();
			return message.warn(getText("Please enter your login name!"));
		}

		if (!password) {
			this.passwordRef.focus();
			return message.warn(getText("Please enter the password!"));
		}

		if (this.state.loading) {
			return false;
		}

		this.setState({ loading: true });
		AccountSignin(username, password)
			.then((data: AccountBase) => {
				this.setState({ loading: false });
				const expireDate = new Date();
				expireDate.setDate(expireDate.getDate() + 1);
				console.log("login info", data);
				const shop: any = data.shop || {};
				if (data.hasOwnProperty("shop") && shop.originCode === "CN") {
					// 登录成功，记录cookie
					Cookies.set("data", data, { expires: expireDate });
					window.location.href = "/index.html";
				}	else if (shop["isApproved"]) {
					Cookies.set("data", data, { expires: expireDate });
					window.location.href = "/index.html";
				} else if (data["userId"] && shop["approvalProcessing"]) {
					Cookies.set("data", data, { expires: expireDate });
					window.location.href = "approve.html";
				} else if (data["userId"]) {
					console.log("login info", data.shop);
					window.location.href = "approve.html#/unChinaOrgainzationSettled";
				} else {
					message.warn(getText("your account name and password do not match"));
					console.log(data);
				}
			});
	}
	async validatePhone(phone) {
		return await new Promise((res, rej) => {
			if (phonePattern.test(phone)) {
				AccountCanSigninByPhone(phone)
					.then(result => {
						this.setState({ phoneCanSignin:  result});
						if (!result) {
							this.usernameRef.focus();
						}
						res(result);
					});
			} else {
				res(true);
				this.setState({ phoneCanSignin: true});
			}
		});
	}

	render() {
		const lang = getLang();
		const { loading, phoneCanSignin } = this.state;
		const getText = getLangText(getLang());
		return (
			<div>
				<Header
					active={SellerTitleKey.LOGIN}
					forceUpdate={() => this.forceUpdate()} />
				<section className="main">
					<div className="container">
						<div className="login">
							<div className="login__form">
								<div className="login__form__item">
									<div className="form__item__label">{getText("username")}</div>
									<Input
										className="form__item__input"
										ref={ node => this.usernameRef = node as Input }
										prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
										placeholder={getText("please_fill_email_username")}
										onBlur={(e: any) => this.validatePhone(e.target.value)}
										onPressEnter={this.login.bind(this)}
										onChange={e => {
											this.setState({ username: e.target.value });
										}}
									/>
								</div>
								<div className="login_userName_info"> { !phoneCanSignin && getText("The current mobile number is bound to multiple stores, please use the login name!")} </div>
								<div className="login__form__item">
									<div className="form__item__label">{getText("passwd")}</div>
									<Input
										className="form__item__input"
										ref={ node => this.passwordRef = node as Input }
										prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
										type="password"
										placeholder={getText("please_fill_passwd")}
										onPressEnter={this.login.bind(this)}
										onChange={e => {
											this.setState({ password: e.target.value });
										}}
									/>
								</div>
								<div className="login__form__info">
									<Checkbox defaultChecked={this.state.checked} onChange={e => {
										this.setState({
											checked: e.target.checked
										});
									}}>
										<span style={{ fontSize: 12 }}>{getText("have_read_terms")}</span>
									</Checkbox>
									<a className="sign-document"
										onClick={() => {
											// this.setState({visible:true});
											const url = lang === "zh" ? "/asset/ezbuysellerterms.html" : "https://docs.google.com/document/d/e/2PACX-1vSTdlgE6IXLcm6zr7YcMte6m1X43HRCecVUu1zqpXFJEpmyl6b67MESy0OdeLRA-s4ppmK2Tozcy5T4/pub";
											window.open(url, "_blank");
										}}>
										{getText("have_read_terms_words")}
									</a>
								</div>
								<div>
									<Button
										disabled={this.state.checked === true ? false : true}
										type="primary"
										htmlType="submit"
										className="login__form__button"
										onClick={this.login.bind(this)}
									>
										{loading ? (<Icon type="loading" />) : null}
										{getText("login")}
									</Button>
								</div>
								<div className="login__form__tag">
									<a href={`${window.location.pathname}#forgetPassword`}>{getText("forget_password")}?</a>&emsp;
									<a href={`${window.location.pathname}#register`}>{getText("register")}</a>
								</div>
							</div>
						</div>
					</div>
				</section>
				<Footer />
			</div>
		);
	}
}

export default SigninPage;
