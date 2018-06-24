import * as React from "react";
import {
	Steps,
	Form,
	Radio,
	Input,
	Button,
	message,
	Select
} from "antd";
import { getLangText } from "../../util/kit";
import { getLang } from "../../util/lang";
import Header from "../loginAndSignUp/common/header";
import NextStepButton from "./NextStepButton";
import Footer from "./Footer";
import {
	SellerTitleKey
} from "../loginAndSignUp/constant/arguments";
import {
	SendVerificationCode,
} from "../../services/ezseller/sms";
import {
	AccountForgetPassword,
	AccountResetPassword,
	AccountForgetPasswordByPhone,
	AccountValidPhone,
	AccountForgetPasswordUserName
} from "../../services/EzSellerService";
import {
	emailPattern,
	phonePattern,
	verifyCodePattern
} from "../../util/regexp";
import "./index.scss";

const url = document.location.href;
let token = url.includes("token=") ? url.slice(url.indexOf("token=") + 6, url.indexOf("&") === -1 ? url.length : url.indexOf("&")) : "";

enum VerificationMethod {
	PHONE = "phone",
	EMAIL = "email"
}

enum StepRender {
	CHOOSE_METHOD = "renderFillVeriMethod",
	INPUT_DETAILS = "renderFillBillInfo",
	CONFIRM_NAME = "renderConfirmLoginName",
	RESET_PASSWORD = "renderResetPassword",
	DONE = "renderComplete",
}

const Step = Steps.Step;
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const formItemLayout = {
	labelCol: { span: 5 },
	wrapperCol: { span: 19 }
};
const defaultCurrent = document.URL.indexOf("token") > -1 ? 2 : 0;
const stepItems = [{
	key: StepRender.CHOOSE_METHOD,
	title: "Choose a verification method",
}, {
	key: StepRender.INPUT_DETAILS,
	title: "inpput_account_details"
}, {
	key: StepRender.CONFIRM_NAME,
	title: "Confirm login name"
}, {
	key: StepRender.RESET_PASSWORD,
	title: "reset_password"
}, {
	key: StepRender.DONE,
	title: "done"
}];

interface ForgetPasswordState {
	current: number;
	verificationMethod: VerificationMethod;
	emailValue: string;
	phoneValue: string;
	verifyCode: string;
	password: string;
	confirmPassword: string;
	countdown: number;
	usernames: string[];
	selectUsername: string;
}

class ForgetPassword extends React.Component<{}, ForgetPasswordState> {
	state: ForgetPasswordState = {
		current: defaultCurrent,
		verificationMethod: token ? VerificationMethod.EMAIL : VerificationMethod.PHONE,
		emailValue: "",
		phoneValue: "",
		verifyCode: "",
		countdown: 60,
		password: "",
		confirmPassword: "",
		usernames: [],
		selectUsername: ""
	};
	interval: any;

	sendVerificationCode() {
		const getText = getLangText(getLang());
		const { phoneValue } = this.state;
		AccountValidPhone(phoneValue)
			.then(result => {
				if (result.exists) {
					SendVerificationCode({
						Phone: phoneValue,
						Expiration: "0",
						From: "seller"
					})
						.then(result => {
							if (result.result.code === 0) {
								message.success(getText("Verification code has been sent, please note that check"));
							}
						});
				}
				else {
					clearInterval(this.interval);
					this.setState({ countdown: 60 });
					message.warn(getText("This phone number is not registered with the seller system"));
				}
			});
	}
	beginCountdown(): void {
		const _self = this;
		_self.interval = setInterval(() => {
			if (this.state.countdown === 0) {
				this.setState({ countdown: 60 });
				clearInterval(_self.interval);
			} else {
				this.setState((preState => ({
					countdown: preState.countdown - 1
				})));
			}
		}, 1000);
	}
	formatStepItems() {
		const { verificationMethod } = this.state;
		const currentStepItems = [...stepItems];
		return verificationMethod === VerificationMethod.EMAIL ?
		currentStepItems.filter(item => item.key !== StepRender.CONFIRM_NAME)
		: currentStepItems;
	}
	handleSubmit() {
		const getText = getLangText(getLang());
		const { password, confirmPassword, verificationMethod, selectUsername, phoneValue } = this.state;
		if (password !== confirmPassword) {
			message.warn(getText("passwords_do_not_match"));
		} else {
			const forgetFuc = () => {
				AccountResetPassword(token, password)
					.then(result => {
						if (!result["errCode"]) {
							message.success(getText("success"));
							this.setState({
								current: 3
							});
							setTimeout(() => {
								window.location.href = "/signin.html";
							}, 2000);
						} else {
							message.warn(result["errMessage"]);
						}
					});
			};
			if (verificationMethod === VerificationMethod.PHONE) {
				AccountForgetPasswordUserName(token, selectUsername, phoneValue)
					.then(forgetFuc);
			} else {
				forgetFuc();
			}
		}
	}
	handleGetVerifyCode() {
		const getText = getLangText(getLang());
		const { phoneValue } = this.state;
		if (!phoneValue) {
			message.error(getText("Please enter the correct phone number"));
		}
		else if (!phonePattern.test(phoneValue)) {
			message.error(getText("Please enter the correct email format"));
		}
		else {
			this.beginCountdown();
			this.sendVerificationCode();
		}
	}
	handleNextStep() {
		const getText = getLangText(getLang());
		const { current, verificationMethod, emailValue, phoneValue, countdown, verifyCode } = this.state;
		if (current === 1 && verificationMethod === VerificationMethod.EMAIL) {
			if (!emailValue) {
				message.error(getText("please_input_the_registered_User_ID_/_Email_address"));
			}
			else if (!emailPattern.test(emailValue)) {
				message.error(getText("Please enter the correct email format"));
			}
			else if (countdown === 60) {
				AccountForgetPassword(emailValue)
					.then(result => {
						if (result.isSent) {
							message.success(getText("Successfully sent to your email"));
						} else {
							clearInterval(this.interval);
							this.setState({ countdown: 60 });
							message.error(getText("the_user_does_not_exist"));
						}
					});
				this.beginCountdown();
			}
		}
		else if (current === 1 && verificationMethod === VerificationMethod.PHONE) {
			if (!phoneValue) {
				message.error(getText("Please enter the phone number"));
			}
			if (!verifyCode) {
				message.error(getText("Please enter verification code"));
			}
			else if (!verifyCodePattern.test(verifyCode)) {
				message.error(getText("Please enter correct verify code!"));
			}
			else if (!phonePattern.test(phoneValue)) {
				message.error(getText("Please enter the correct phone number"));
			}
			else {
				AccountForgetPasswordByPhone(phoneValue, verifyCode).then(result => {
					if (result.token) {
						token = result.token;
						message.success(getText("Success"));
						const usernames =  result.usernames || [];
						const selectUsername =  usernames.length > 0 ? usernames[0] : "";
						this.setState({ current: current + 1, usernames, selectUsername });
					} else {
						message.error(getText("Your phone number and verification code do not match. Please try again!"));
					}
				});
			}
		}
		else {
			this.setState({ current: current + 1 });
		}
	}
	renderComplete(): JSX.Element {
		const getText = getLangText(getLang());
		return (
			<div className="completeWrap">
				<img
					className="completeImg"
					src={require("./image/page-1@3x.png")} />
				<div>
					<div className="completeTitle">
						{getText("Reset login password is completed")}!
					</div>
					<NextStepButton
						width={175}
						text={getText("back_to_Registration")}
						onClick={() => window.location.href = "/signin.html"} />
				</div>
			</div>
		);
	}
	renderResetPassword(): JSX.Element {
		const { password, confirmPassword } = this.state;
		const getText = getLangText(getLang());
		return (
			<div className="contentWrap">
				<FormItem
					label={getText("new_passwd")}
					hasFeedback
					{...formItemLayout}
					required
				>
					<Input
						type="password"
						value={password}
						onChange={(e: any) => this.setState({ password: e.target.value })}
						className="inputEmail"
						placeholder={getText("please_input_new_password")} />
				</FormItem>
				<FormItem
					label={getText("confirm_passwd")}
					hasFeedback
					{...formItemLayout}
					required
				>
					<Input
						type="password"
						value={confirmPassword}
						onChange={(e: any) => this.setState({ confirmPassword: e.target.value })}
						className="inputEmail"
						placeholder={getText("please_confirm_passwd")} />
					<NextStepButton
						text={getText("submit")}
						onClick={this.handleSubmit.bind(this)} />
				</FormItem>
			</div>
		);
	}
	renderFillBillInfo(): JSX.Element {
		const getText = getLangText(getLang());
		const { verificationMethod, emailValue, phoneValue, countdown, verifyCode } = this.state;
		const disabled = countdown !== 0 && countdown !== 60;
		const emailText = disabled ? `${getText("send_verification_email")}(${countdown}s)` : getText("Next step");
		const getCodeText = disabled ? `${getText("Next time")}(${countdown}s)` : getText("Get code");

		return (
			<div className="contentWrap">
				{
					verificationMethod === VerificationMethod.PHONE ?
						<FormItem
							label={getText("Phone")}
							hasFeedback
							{...formItemLayout}
							required
						>
							<Input
								value={phoneValue}
								onChange={(e: any) => this.setState({ phoneValue: e.target.value })}
								className="inputPhone"
								addonBefore="+86"
								placeholder={getText("Please enter the phone number")} />
							<div className="getCodeWrap">
								<Input
									value={verifyCode}
									onChange={(e: any) => this.setState({ verifyCode: e.target.value })}
									className="inputCode" />
								<Button
									type="primary"
									className="getCode"
									disabled={disabled}
									onClick={this.handleGetVerifyCode.bind(this)}>
									{getCodeText}
								</Button>
							</div>
							<NextStepButton onClick={this.handleNextStep.bind(this)} />
						</FormItem>
						:
						<FormItem
							label={getText("Email")}
							hasFeedback
							{...formItemLayout}
							required
						>
							<Input
								type="email"
								value={emailValue}
								onChange={(e: any) => this.setState({ emailValue: e.target.value })}
								className="inputEmail"
								placeholder={getText("please_fill_in_email")} />
							<NextStepButton
								disabled={disabled}
								text={emailText}
								onClick={this.handleNextStep.bind(this)} />
						</FormItem>
				}
			</div>
		);
	}
	renderFillVeriMethod(): JSX.Element {
		const { verificationMethod } = this.state;
		const getText = getLangText(getLang());

		return (
			<div className="contentWrap">
				<FormItem
					label={getText("Verification method")}
					hasFeedback
					{...formItemLayout}
					required
				>
					<RadioGroup
						className="radioGroup"
						value={verificationMethod}
						onChange={(e: any) => this.setState({ verificationMethod: e.target.value })}>
						<Radio value={VerificationMethod.PHONE} className="radio">
							<img
								style={{ width: "36px", height: "60px" }}
								src={require("./image/phone@3x.png")} />
							<span className="radioLabel">
								{getText("Phone")}
							</span>
						</Radio>
						<Radio value={VerificationMethod.EMAIL} className="radio">
							<img
								style={{ width: "50px", height: "36px" }}
								src={require("./image/email@3x.png")} />
							<span className="radioLabel">
								{getText("Email")}
							</span>
						</Radio>
					</RadioGroup>
					<NextStepButton onClick={this.handleNextStep.bind(this)} />
				</FormItem>
			</div>
		);
	}
	renderConfirmLoginName() {
		const { usernames, selectUsername } = this.state;
		const getText = getLangText(getLang());

		return (
			<div className="contentWrap">
				<FormItem
					label={getText("username")}
					hasFeedback
					{...formItemLayout}
					required
				>
					<Select
						value={selectUsername}
						onChange={ val => this.setState({ selectUsername: val as string })}
						style={{width: "310px"}}>
					{
						usernames.map((item, index) =>
							<Select.Option
								value={item}>
								{ item }
							</Select.Option>
						)
					}
					</Select>
					<NextStepButton
						onClick={this.handleNextStep.bind(this)} />
				</FormItem>
			</div>
		);
	}
	renderContent(): JSX.Element {
		const { current } = this.state;
		const currentStepItems = this.formatStepItems();
		return this[currentStepItems[current].key]();
	}
	render(): JSX.Element {
		const { current } = this.state;
		const getText = getLangText(getLang());
		const currentStepItems = this.formatStepItems();

		return (
			<div className="forgetPasswordWrap">
				<Header
					active={SellerTitleKey.RESET_PASSWORD}
					forceUpdate={() => this.forceUpdate()} />
				<section>
					<div className="steps">
						<Steps
							current={current}
							size="small">
							{
								currentStepItems.map(item =>
									<Step
										key={item.key}
										title={getText(item.title)} />
								)
							}
						</Steps>
						<div>
							{this.renderContent()}
						</div>
					</div>
				</section>
				<Footer />
			</div>
		);
	}
}

export default ForgetPassword;
