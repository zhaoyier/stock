const initDragable = () => {
	const dragContainer: any = document.getElementById("customImageList");
	let target: any = null;
	function resetSortIndex() {
		const dragList = dragContainer.getElementsByTagName("li");
		for (let i = 0; i < dragList.length; i++) {
			dragList[i].setAttribute("data-index", i);
		}
	}
	dragContainer.addEventListener("dragstart", function(event) {
		if (event.target.tagName === "LI") {
			resetSortIndex();
			target = event.target;
		}
	});
	dragContainer.addEventListener("drop", function(event) {
		if (event.target.tagName === "LI") {
			// for (let i = 0; i < dragList.length; i++) {
			// 	dragList[i].style.background = "#fff";
			// }
			let temp = {
				url: event.target.getAttribute("url"),
				innerHTML: event.target.innerHTML
			};
			console.log(temp);
			event.target.innerHTML = target.innerHTML;
			event.target.setAttribute("url", target.getAttribute("url"));
			event.target.style.background = "#fff";
			target.innerHTML = temp.innerHTML;
			target.setAttribute("url", temp.url);
		}
	});
	dragContainer.addEventListener("dragover", function(event) {
		const dragList = dragContainer.getElementsByTagName("li");
		event.preventDefault();
		if (event.target.getAttribute("data-index") === target.getAttribute("data-index")) {
			return;
		} else {
			for (let i = 0; i < dragList.length; i++) {
				dragList[i].style.background = "#fff";
			}
			event.target.style.background = "#eee";
		}
	});

	// for (let i = 0; i < dragList.length; i++) {
	// 	dragList[i].addEventListener("dragstart", function () {
	// 		resetSortIndex();
	// 		target = this;
	// 	});
	// 	dragList[i].addEventListener("drop", function (event) {
	// 		for (let i = 0; i < dragList.length; i++) {
	// 			dragList[i].style.background = "#fff";
	// 		}
	// 		let temp = {
	// 			url: this.getAttribute("url"),
	// 			innerHTML: this.innerHTML
	// 		};
	// 		console.log(temp);
	// 		this.innerHTML = target.innerHTML;
	// 		this.setAttribute("url", target.getAttribute("url"));
	// 		target.innerHTML = temp.innerHTML;
	// 		target.setAttribute("url", temp.url);
	// 	});
	// 	dragList[i].addEventListener("dragover", function (event) {
	// 		event.preventDefault();
	// 		if (this.getAttribute("data-index") === target.getAttribute("data-index")) {
	// 			return;
	// 		} else {
	// 			for (let i = 0; i < dragList.length; i++) {
	// 				dragList[i].style.background = "#fff";
	// 			}
	// 			this.style.background = "#eee";
	// 		}
	// 	});
	// }
};

export default initDragable;