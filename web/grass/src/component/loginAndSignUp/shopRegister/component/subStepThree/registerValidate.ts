import { message } from "antd";

const notEmpty = name => {
	message.error(`【${name}】不能为空`);
	return false;
};

const commonValidate = (formData, registerType) => {
	// 个人资料
	if (!formData.requester.realName) {
		return notEmpty("真实姓名");
	}
	if (!formData.requester.identifierNum) {
		return notEmpty("身份证号");
	}
	if (formData.requester.identifierNum.length !== 18) {
		message.error("请输入18位身份号码");
		return false;
	}
	if (!formData.requester.qqNumber) {
		return notEmpty("运营联系人QQ");
	}
	if (!formData.requester.email) {
		return notEmpty("运营联系人邮箱");
	}
	if (registerType === "person" && !formData.requester.phone) {
		return notEmpty("运营联系人手机");
	}
	if (!formData.form.responsibleInfo.idImages.front) {
		return notEmpty("身份证头像面");
	}
	if (!formData.form.responsibleInfo.idImages.opposite) {
		return notEmpty("身份证国徽面");
	}

	// 个人校验身份证信息
	if (registerType === "person") {
		if (!formData.form.responsibleInfo.idImages.handHeld) {
			return notEmpty("手持身份证照");
		}
	}

	// 店铺信息
	if (!formData.shopName) {
		return notEmpty("店铺名称");
	}
	if (!formData.form.surveyInfo.mainCat) {
		return notEmpty("主营类目");
	}
	if (!formData.form.surveyInfo.stockChan) {
		return notEmpty("进货渠道");
	}
	if (formData.form.surveyInfo.warehouseAddr.areasCode.length !== 3) {
		return notEmpty("仓库地址");
	}
	if (formData.form.surveyInfo.warehouseAddr.areasVal.length !== 3) {
		return notEmpty("仓库地址");
	}
	if (!formData.form.surveyInfo.warehouseAddr.address) {
		return notEmpty("仓库地址详情");
	}
	if (!formData.form.surveyInfo.prodCount) {
		return notEmpty("可上架商品数");
	}
	if (!formData.form.surveyInfo.awareChan) {
		return notEmpty("了解EZBuy的渠道");
	}
	if (formData.temp.otherPlatformRadio === 1) {
		if (
			formData.form.surveyInfo.srcPlat.platform.length !== 0 &&
			formData.form.surveyInfo.srcPlat.shopUrl === ""
		) {
			return notEmpty("其他平台地址");
		}
	} else {
		if (!formData.form.surveyInfo.samplePics || formData.form.surveyInfo.samplePics.length !== 5) {
			message.error("上传五张商品图片");
			return false;
		}
	}

	if (
		formData.form.surveyInfo.srcPlat.platform.length === 0 &&
		formData.form.surveyInfo.samplePics.length === 0
	) {
		return notEmpty("是否经营其他平台");
	}

	// 开户信息
	if (formData.form.bankInfo.bankName === "") {
		return notEmpty(registerType === "person" ? "开户银行" : "公司开户银行");
	}
	if (formData.form.bankInfo.agencyAddress === "") {
		return notEmpty("开户行所在地");
	}
	if (formData.form.bankInfo.agencyName === "") {
		return notEmpty("支行名称");
	}
	if (formData.form.bankInfo.accountNumber === "") {
		return notEmpty(registerType === "person" ? "开户账号" : "公司开户账号");
	}
	if (formData.form.bankInfo.accountName === "") {
		return notEmpty(registerType === "person" ? "开户人姓名" : "公司开户名");
	}
	// 公司资料认证
	if (registerType === "company") {
		return companyValidate(formData);
	}

	return true;
};

const companyValidate = formData => {
	if (formData.form.responsibleInfo.identifierNum === "") {
		return notEmpty("法人代表身份证号码");
	}
	if (formData.form.responsibleInfo.identifierNum.length !== 18) {
		message.error("请输入18位法人代表身份证号码");
		return false;
	}
	if (formData.form.responsibleInfo.realName === "") {
		return notEmpty("法人代表身份证姓名");
	}
	if (!formData.form.responsibleInfo.idImages.front) {
		return notEmpty("法人代表身份证照片头像面");
	}
	if (!formData.form.responsibleInfo.idImages.opposite) {
		return notEmpty("法人代表身份证照片国徽面");
	}
	if (formData.form.contacts[0].name === "") {
		return notEmpty("紧急联系人姓名[1]");
	}
	if (formData.form.contacts[0].phone === "") {
		return notEmpty("紧急联系人电话[1]");
	}
	if (formData.form.orgInfo.orgName === "") {
		return notEmpty("公司名称");
	}
	if (formData.form.orgInfo.approvalCrts.combined) {
		// 三证合一
		if (!formData.form.orgInfo.approvalCrts.combinedBusinessLicense) {
			return notEmpty("公司营业执照");
		}
	} else {
		if (!formData.form.orgInfo.approvalCrts.businessLicense) {
			return notEmpty("公司营业执照");
		}
		if (!formData.form.orgInfo.approvalCrts.orgCodeCrt) {
			return notEmpty("组织机构代码证");
		}
		if (!formData.form.orgInfo.approvalCrts.taxRegistrationCrt) {
			return notEmpty("税务登记证");
		}
	}
	if (!formData.form.orgInfo.approvalCrts.bankAccountCrt) {
		return notEmpty("银行开户证明");
	}
	return true;
};

export { commonValidate, companyValidate };
