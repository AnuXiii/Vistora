export function imgStatusChecker() {
	document.querySelectorAll(".product-img img").forEach((img) => {
		img.onload = function () {
			img.nextElementSibling.remove();
		};

		img.onerror = function () {
			img.src = "/images/img-error.jpg";
		};
	});
}

export function linkStatusChecker() {
	document.querySelectorAll(".link").forEach((link) => {
		let linkPath = link.pathname;
		if (window.location.pathname == linkPath) {
			link.classList.add("text-primary", "after:w-full", "after:right-0");
		}

		link.addEventListener("click", (e) => {
			if (window.location.pathname == linkPath) {
				e.preventDefault();
			}
		});
	});
}
