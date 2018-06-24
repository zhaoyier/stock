import * as React from "react";
import { Input, Button, Radio, Checkbox, message, Icon, Modal } from "antd";

import {
	SendVerificationCode,
} from "../../services/ezseller/sms";
import {
	AccountRegisterByPhone,
	AccountRegister,
	AccountValidPhone,
	AccountValidUsername,
} from "../../services/EzSellerService";
import { SellerTitleKey } from "./constant/arguments";
import Header from "./common/header";

import { getLangText } from "../../util/kit";
import { getLang } from "../../util/lang";

import {
	passwordPattern,
	phonePattern,
	emailPattern,
	letterAndNumPattern
} from "../../util/regexp";

import "./css/register.scss";

const RadioGroup = Radio.Group;

interface RegisterState {
	checkbox: boolean;
	phone: string;
	captcha: string;
	passsword: string;
	confirmPassword: string;
	username: string;
	countTime: number;
	errorInfo: ErrorInfo;
	originCode: string;
	email: string;
}

enum ErrorType {
	None = "none",
	True = "true",
	False = "false"
}

interface ErrorInfo {
	phoneError: {
		value: ErrorType;
		message: string;
	};
	captchaError: ErrorType;
	passswordError: ErrorType;
	confirmPasswordError: ErrorType;
	usernameError: {
		value: ErrorType;
		message: string;
	};
}

const getText = getLangText(getLang());

class Register extends React.Component<{}, RegisterState> {
	constructor(props) {
		super(props);
		this.state = {
			originCode: "CN",
			checkbox: true,
			email: "",
			phone: "",
			captcha: "",
			passsword: "",
			confirmPassword: "",
			username: "",
			countTime: -1,
			errorInfo: {
				phoneError: {
					value: ErrorType.None,
					message: "",
				},
				captchaError: ErrorType.None,
				passswordError: ErrorType.None,
				confirmPasswordError: ErrorType.None,
				usernameError: {
					value: ErrorType.None,
					message: "",
				},
			}
		};
	}

	submit() {
		const { email, phone, captcha, passsword, username, errorInfo } = this.state;
		if (
			errorInfo.phoneError.value === ErrorType.True ||
			errorInfo.captchaError === ErrorType.True ||
			errorInfo.passswordError === ErrorType.True ||
			errorInfo.confirmPasswordError === ErrorType.True ||
			errorInfo.usernameError.value === ErrorType.True
		) {
			message.error(getText("failed submit"));
			return;
		}
		if (username === "") {
			message.error(getText("no empty username"));
			return;
		}
		if (passsword === "") {
			message.error(getText("no empty password"));
			return;
		}
		if (this.state.originCode === "CN") {
			if (phone === "") {
				message.error("手机号不能为空");
				return;
			}
			if (captcha === "") {
				message.error("验证码不能为空");
				return;
			}
			AccountRegisterByPhone(phone, username, passsword, captcha, )
				.then(res => {
					if (res["errCode"] === 36) {
						errorInfo.captchaError = ErrorType.True;
					} else {
						errorInfo.captchaError = ErrorType.False;
					}
					this.setState({ errorInfo });
					if (res["userId"]) {
						Modal.success({
							title: "注册成功",
							content: "3秒后跳转到登录页面，请稍后"
						});
						setTimeout(function () {
							window.location.href = "/signin.html";
						}, 3000);
					} else {
					}
				});
		} else {
			if (email === "") {
				message.error("邮箱不能为空");
				return;
			}
			AccountRegister(email, username, passsword)
				.then(res => {
					if (res.hasOwnProperty("errCode")) {
						message.warn("注册失败，请检查提交信息");
						console.log("注册失败", res);
					} else {
						Modal.success({
							title: "注册成功",
							content: "3秒后跳转到登录页面，请稍后"
						});
						setTimeout(function () {
							window.location.href = "/signin.html";
						}, 3000);
					}
				});
		}
	}

	validatePhone() {
		const { phone, errorInfo } = this.state;
		if (!phonePattern.test(phone)) {
			errorInfo.phoneError = {
				value: ErrorType.True,
				message: "手机号无效",
			};
			this.setState({ errorInfo });
		} else {
			AccountValidPhone(phone)
				.then(res => {
					if (res.inValid) {
						errorInfo.phoneError = {
							value: ErrorType.True,
							message: "手机号不合法",
						};
					} else {
						// 验证通过
						errorInfo.phoneError.value = ErrorType.False;
					}
					this.setState({ errorInfo });
				});
		}
	}

	validateUsername() {
		const { username, errorInfo } = this.state;
		if (!passwordPattern.test(username)) {
			errorInfo.usernameError.value = ErrorType.True;
			errorInfo.usernameError.message = getText("6-12 charts for username");
			this.setState({ errorInfo });
		} else {
			AccountValidUsername(username)
				.then(res => {
					if (res) {
						errorInfo.usernameError.value = ErrorType.False;
					} else {
						errorInfo.usernameError.message = getText("sorry for that this name has been used");
						errorInfo.usernameError.value = ErrorType.True;
					}
					this.setState({ errorInfo });
				});
		}
	}

	getCaptcha() {
		const {
			phone,
			countTime,
			errorInfo } = this.state;
		if (errorInfo.phoneError.value === ErrorType.True) {
			message.error(errorInfo.phoneError.message);
			return;
		}
		if (countTime > 0) {
			message.warn("稍后再试");
			return;
		}
		let time = 60;
		const ticker = setInterval(() => {
			this.setState({ countTime: time });
			time--;
			if (time === -1) {
				clearInterval(ticker);
			}
		}, 1000);
		SendVerificationCode({
			Phone: phone,
			Expiration: "0",
			From: "seller"
		})
			.then(res => {
				if (res["code"] === 0) {
					message.success("验证码已发送，请注意查收");
				}
			});
	}
	emitEmpty() {
		const { errorInfo } = this.state;
		if (this.phoneInput) {
			errorInfo.phoneError.value = ErrorType.None;
			this.phoneInput.focus();
			this.setState({
				phone: "",
				errorInfo
			});
		}
	}
	phoneInput: Input | null;

	render() {
		const getText = getLangText(getLang());
		const lang = getLang();
		const { errorInfo, phone, username } = this.state;
		const suffix = phone ? <Icon type="close-circle" onClick={this.emitEmpty.bind(this)} /> : null;
		return (
			<div>
				<Header
					active={SellerTitleKey.REGISTER}
					forceUpdate={() => this.forceUpdate()} />
				<div className="register">
					<div className="form">
						<div style={{ marginBottom: 36 }} className="form__item">
							<div className="form__item__label"><span>*</span>{getText("Choose Origin Country")}</div>
							<div className="form__item__input--radio">
								<div className="item__checkbox">
									<RadioGroup
										defaultValue="CN"
										onChange={e => {
											const { errorInfo } = this.state;
											if (e.target["value"] !== "CN") {
												errorInfo.phoneError.value = ErrorType.None;
												errorInfo.captchaError = ErrorType.None;
												errorInfo.passswordError = ErrorType.None;
												errorInfo.confirmPasswordError = ErrorType.None;
												errorInfo.usernameError.value = ErrorType.None;
												this.setState({ errorInfo});
											}
											this.setState({ originCode: e.target["value"], passsword: "", confirmPassword: "", username: ""  });
										}}
									>
										<Radio className="item__check" value="CN"><img src={require("./image/cn.png")} />&emsp;{getText("CN")}</Radio>
										<Radio className="item__check" value="SG"><img src={require("./image/sg.png")} />&emsp;{getText("SGLocal")}</Radio>
										<Radio className="item__check" value="MY"><img src={require("./image/my.png")} />&emsp;{getText("MYLocal")}</Radio>
										<Radio className="item__check" value="US"><img src={require("./image/us.png")} />&emsp;{getText("US")}</Radio>
										<Radio className="item__check" value="KR"><img src={require("./image/kr.png")} />&emsp;{getText("KR")}</Radio>
									</RadioGroup>
								</div>
							</div>
						</div>
						{this.state.originCode === "CN" ? (
							<div>
								<div className="form__item">
									<div className="form__item__label"><span>*</span>{getText("Phone")}</div>
									<div className="form__item__input" >
										<Input
											type="text"
											ref={node => this.phoneInput = node}
											suffix={suffix}
											placeholder="+86 请输入手机号码"
											value={this.state.phone}
											onChange={e => {
												const value = e.target["value"].replace(/[^\d+$]/g, "");
												this.setState({ phone: value });
											}}
											onBlur={this.validatePhone.bind(this)}
										/>
									</div>
									<div className="form__item--info">
										<Icon
											style={errorInfo.phoneError.value === "false" ? { display: "inline-block" } : {}}
											className="item__error--right" type="check-circle"
										/>
										<span
											style={errorInfo.phoneError.value === "true" ? { display: "inline-block" } : {}}
											className="item__error--wrong"
										>
											<Icon type="close-circle" />
											<span>{errorInfo.phoneError.message}</span>
										</span>
									</div>
								</div>
								<div className="form__item">
									<div className="form__item__label">&nbsp;</div>
									<div className="form__item__input--captcha">
										<Input
											className="captcha__input"
											type="number"
											maxLength="4"
											onChange={e => {
												this.setState({ captcha: e.target["value"] });
											}}
											onBlur={e => {
												const { errorInfo } = this.state;
												if (e.target["value"].length < 4) {
													errorInfo.captchaError = ErrorType.True;
												} else {
													errorInfo.captchaError = ErrorType.False;
												}
												this.setState({ errorInfo });
											}}
										/>
										<Button
											disabled={this.state.countTime > 0}
											className="captcha__button"
											type="primary"
											onClick={this.getCaptcha.bind(this)}
										>
											{this.state.countTime > 0 ? `${this.state.countTime}秒` : "获取验证码"}
										</Button>
									</div>
									<div className="form__item--info">
										<Icon
											style={errorInfo.captchaError === "false" ? { display: "inline-block" } : {}}
											className="item__error--right"
											type="check-circle"
										/>
										<span
											style={errorInfo.captchaError === "true" ? { display: "inline-block" } : {}}
											className="item__error--wrong">
											<Icon type="close-circle" />
											<span>验证码错误</span>
										</span>
									</div>
								</div>
							</div>
						) : (
								<div className="form__item">
									<div className="form__item__label"><span>*</span>{getText("Email")}</div>
									<div className="form__item__input" >
										<Input
											placeholder={getText("Email")}
											value={this.state.email}
											onChange={e => {
												this.setState({ email: e.target["value"] });
											}}
											onBlur={e => {
												if (!emailPattern.test(e.target["value"])) {
													this.setState({ email: "" });
													message.error(getText("Mail Error"));
												}
											}}
										/>
									</div>
									<div className="form__item--info">
										<Icon className="item__error--right" type="check-circle" />
										<span className="item__error--wrong" > </span>
									</div>
								</div>
							)}

						<div className="form__item">
							<div className="form__item__label"><span>*</span>{getText("passwd")}</div>
							<Input
								className="form__item__input"
								placeholder={getText("Please input password")}
								type="password"
								value={this.state.passsword}
								onChange={e => {
									this.setState({ passsword: e.target["value"] });
								}}
								onBlur={e => {
									const { errorInfo } = this.state;
									if (e.target["value"].length < 6) {
										errorInfo.passswordError = ErrorType.True;
									} else {
										errorInfo.passswordError = ErrorType.False;
									}
									this.setState({ errorInfo });
								}}
							/>
							<div className="form__item--info">
								<span
									style={errorInfo.passswordError !== "none" ? { display: "none" } : {}}
									className="item__info--default">{getText("password min lenght is 6")}</span>
								<Icon
									style={errorInfo.passswordError === "false" ? { display: "inline-block" } : {}}
									className="item__error--right" type="check-circle" />
								<span
									style={errorInfo.passswordError === "true" ? { display: "inline-block" } : {}}
									className="item__error--wrong">
									<Icon type="close-circle" />
									<span>{getText("format_incorrect")}</span>
								</span>
							</div>
						</div>
						<div className="form__item">
							<div className="form__item__label"><span>*</span>{getText("confirm_passwd")}</div>
							<Input
								className="form__item__input"
								placeholder={getText("confirm_passwd")}
								type="password"
								value={this.state.confirmPassword}
								onChange={e => {
									this.setState({ confirmPassword: e.target["value"] });
								}}
								onBlur={e => {
									const { errorInfo, passsword } = this.state;
									if (passsword === e.target["value"] && e.target["value"] !== "") {
										errorInfo.confirmPasswordError = ErrorType.False;
									} else {
										errorInfo.confirmPasswordError = ErrorType.True;
									}
									this.setState({ errorInfo });
								}}
							/>
							<div className="form__item--info">
								<Icon
									style={errorInfo.confirmPasswordError === "false" ? { display: "inline-block" } : {}}
									className="item__error--right" type="check-circle" />
								<span
									style={errorInfo.confirmPasswordError === "true" ? { display: "inline-block" } : {}}
									className="item__error--wrong">
									<Icon type="close-circle" />
									<span>{getText("password_not_same")}</span>
								</span>
							</div>
						</div>
						<div className="form__item">
							<div className="form__item__label"><span>*</span>{getText("username")}</div>
							<Input
								className="form__item__input"
								placeholder={getText("please_input_username")}
								value={username}
								onChange={e => {
									if (!letterAndNumPattern.test(e.target.value) && e.target.value !== "") {
										errorInfo.usernameError.value = ErrorType.True;
										errorInfo.usernameError.message = getText("only number and alpha");
										this.setState({ errorInfo });
									}
									else {
										this.setState({ username: e.target["value"] });
									}
								}}
								onBlur={this.validateUsername.bind(this)}
							/>
							<div className="form__item--info">
								<span
									style={errorInfo.usernameError.value !== "none" ? { display: "none" } : {}}
									className="item__info--default">{getText("6-20 charts only number and alpha")}</span>
								<Icon
									style={errorInfo.usernameError.value === "false" ? { display: "inline-block" } : {}}
									className="item__error--right" type="check-circle" />
								<span
									style={errorInfo.usernameError.value === "true" ? { display: "inline-block" } : {}}
									className="item__error--wrong">
									<Icon type="close-circle" />
									<span>{errorInfo.usernameError.message}</span>
								</span>
							</div>
						</div>
						<div className="form__item">
							<div className="form__item__label">&nbsp;</div>
							<div className="form__item__input">
								<Checkbox defaultChecked={this.state.checkbox} onChange={e => {
									this.setState({
										checkbox: e.target["checked"]
									});
								}}>
									<span style={{ fontSize: 12 }}>{getText("have_read_terms")}</span>
								</Checkbox>
								<a
									style={{ fontSize: 12 }}
									onClick={() => {
										const url = lang === "zh" ? "/asset/ezbuysellerterms.html" : "https://docs.google.com/document/d/e/2PACX-1vSTdlgE6IXLcm6zr7YcMte6m1X43HRCecVUu1zqpXFJEpmyl6b67MESy0OdeLRA-s4ppmK2Tozcy5T4/pub";
										window.open(url, "_blank");
									}}>
									{getText("have_read_terms_words")}
								</a>
							</div>
						</div>
						<div className="form__item">
							<div className="form__item__label">&nbsp;</div>
							<div className="form__item__input">
								<Button
									disabled={this.state.checkbox === true ? false : true}
									className="form__item__input--submit"
									type="primary"
									onClick={this.submit.bind(this)}
								>
									{getText("submit")}
								</Button>
							</div>
						</div>
					</div>
					<div className="bottom__info"> {getText("welcome ezbuy")} </div>
				</div>
			</div>
		);
	}
}

export default Register;
