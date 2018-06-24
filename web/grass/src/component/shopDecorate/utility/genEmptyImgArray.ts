const outputArrImg = (length) => {
	let tempArr: any = [];
	for (let i = 0; i < length; i++) {
		tempArr.push({ img: "", link: "" });
	}
	return tempArr;
};

export {
	outputArrImg,
};