import { message } from "antd";

const notEmpty = text => {
	console.log("===>>not:", text);
	message.error(text);
	return false;
};

function validateData(self, data, getText) {
	const productData = data.productData;
	const productSkus = data.productSkus;

	if (productData.categoryId === 0) {
		return notEmpty("必须要选择类目");
	}
	console.log("=====>>002:", productData.name);
	if (productData.name === "") {
		return notEmpty(getText("Product name is necessary"));
	}

	console.log(
		"=====>>003:",
		productData.description,
		!productData.description,
		productData.description.trim()
	);
	if (!productData.description || productData.description.trim() === "") {
		return notEmpty(getText("Product detail is necessary"));
	}

	const { isSpu } = self.props["store"];
	console.log("=====>>004:", isSpu, productData.images);
	if (isSpu && (!productData.images || productData.images.length === 0)) {
		return notEmpty(getText("Product picture is necessary"));
	}

	console.log("=====>>005:", !productSkus, productSkus.length);
	if (!productSkus || productSkus.length <= 0) {
		return notEmpty(getText("Please select SKU details"));
	}

	for (let i in productSkus) {
		// sku 不售卖的，不做校验
		if (!isSpu && !productSkus.isOnSale) continue;

		if (!productSkus[i]["originalPrice"] || productSkus[i]["originalPrice"] <= 0) {
			return notEmpty(`第<${i}>SKU原价不能小于0`);
		}
		if (!productSkus[i]["price"] || productSkus[i]["price"] <= 0) {
			return notEmpty(`第<${i}>SKU售价不能小于0`);
		}
		if (!productSkus[i]["quantity"] || productSkus[i]["quantity"] <= 0) {
			return notEmpty(`第<${i}>SKU库存不能小于0`);
		}
		console.log(
			"===>>019:",
			productSkus[i]["weight"],
			!productSkus[i]["weight"],
			productSkus[i]["weight"] <= 0
		);
		if (!productSkus[i]["weight"] || productSkus[i]["weight"] <= 0) {
			return notEmpty(`第<${i}>SKU重量不能小于0`);
		}

		if (!isSpu && (!productSkus[i].images || productSkus[i].images.length <= 0)) {
			if (productSkus[i]["weight"] <= 0) {
				return notEmpty(`第<${i}>SKU重量不能小于0`);
			}
		}
	}

	return true;
}

export { validateData };
