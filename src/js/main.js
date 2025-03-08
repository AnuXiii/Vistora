import { products } from "./data";
import { showAlert } from "./showAlert";
import {
	openNav,
	closeNav,
	navigation,
	createInvoiceBtn,
	closeProductListBtn,
	closeInvoiceDetailBtn,
	invoiceDetail,
	addProductModal,
} from "./modalsController";
import domtoimage from "dom-to-image";
import printJS from "print-js";
import * as catalogs from "./catalogs";

const productCategories = document.querySelectorAll("[data-category]");
const productsList = document.querySelector(".product-lists");
const emptySection = document.querySelector(".empty-section");
const next = document.querySelector("#next");
const resultContainer = document.querySelector(".result-container");

const colors = {
	error: "#e11d48",
	succses: "oklch(0.627 0.194 149.214)",
};

let productListData = "";
let invoiceData = {};

function productListController() {
	productCategories.forEach((item) => {
		productCategories[0] ? productCategories[0].click() : "";

		item.addEventListener("click", () => {
			if (item.parentNode.querySelector(".active")) {
				item.parentNode.querySelector(".active").classList.remove("active");
			}
			productListData = item.dataset.category;
			item.classList.add("active");

			const listCat = document.querySelectorAll("[data-hashtag]");
			listCat.forEach((list) => {
				list.classList.replace("flex", "hidden");
				list.classList.remove("fade-in");

				if (productListData == list.dataset.hashtag) {
					list.classList.replace("hidden", "flex");
					list.classList.add("fade-in");
					document.querySelector("#top").scrollIntoView({ behavior: "smooth" });
				}
			});
		});
	});
}

function productShowCaser() {
	products.forEach((item) => {
		let li = document.createElement("li");
		li.classList.add(
			"hidden",
			"flex-col",
			"justify-between",
			"gap-4",
			"text-white",
			"w-full",
			"p-4",
			"bg-black",
			"cursor-pointer",
			"h-fit"
		);
		li.setAttribute("data-hashtag", `${item.category}`);
		li.innerHTML = /*htm*/ `
							<header class="py-2 flex justify-between items-center select-none">
								<span class="text-xs">${item.name}</span>
							<ion-icon name="ellipsis-vertical-outline" class="text-white"></ion-icon>
							</header>
							<div class="product-info flex-col gap-4 hidden">
								<div class="product-img relative">
									<img
										loading="lazy"
                                    	src="${item.img}"
										alt="${item.name}"
										class="rounded-md drop-shadow-2xl grayscale-50 w-full max-h-full object-cover" />
								</div>
								<div class="count-action overflow-hidden flex justify-between items-center border border-solid border-white/50 rounded-md">
									<button class="increase p-2 w-12 flex justify-center items-center cursor-pointer bg-primary rounded-tr-md rounded-br-md">
										<ion-icon
											name="add-outline"
											class="text-white text-2xl"></ion-icon>
									</button>
									<input
										type="number"
										placeholder="تعداد"
										class="number-input w-full text-center border-none outline-none" />
									<button class="reducer p-2 w-12 flex justify-center items-center cursor-pointer bg-primary rounded-tl-md rounded-bl-md">
										<ion-icon
											name="remove-outline"
											class="text-white text-2xl"></ion-icon>
									</button>
								</div>
								<div class="price flex flex-col gap-4 divide-y-1 divide-solid divide-white/20">
									<div class="text-xs text-white/80 flex justify-between items-center pb-4">
										<span>قیمت کارخانه</span>
										<span data-fac="${item.factory_price}">${item.factory_price.toLocaleString(
											"fa-IR"
										)}<small class="text-[6px]"> ریال</small></span>
									</div>
									<div class="text-xs text-white/80 flex justify-between items-center">
										<span>قیمت فروش</span>
										<span data-sell="${item.sell_price}">${item.sell_price.toLocaleString(
											"fa-IR"
										)}<small class="text-[6px]"> ریال</small></span>
									</div>
								</div>
							</div>
        `;
		productsList?.appendChild(li);
	});
}

function collapser() {
	const product = document.querySelectorAll("[data-hashtag] header");
	product.forEach((item) => {
		item.addEventListener("click", () => {
			if (productsList.querySelector(".product-info.flex")) {
				productsList.querySelector(".product-info.flex").classList.replace("flex", "hidden");
			}
			item.nextElementSibling.classList.replace("hidden", "flex");
			item.nextElementSibling.querySelector("input").focus();
		});
	});
}

productsList?.addEventListener("click", (e) => {
	const target = e.target.closest(".increase, .reducer");
	if (!target) return;

	const inputField = target.closest(".count-action").querySelector("input");
	let value = parseInt(inputField.value) || 0;

	if (target.classList.contains("increase")) {
		value++;
	} else if (target.classList.contains("reducer") && value > 0) {
		value--;
	}

	if (target.classList.contains("reducer")) {
		if (value == 0) {
			value = null;
		}
	}

	inputField.value = value;
});

productsList?.querySelectorAll("input").forEach((item) => {
	if (item.classList.contains("number-input")) {
		item.addEventListener("input", () => {
			if (isNaN(item.value)) {
				item.value = "";
			}
			if (item.value < 0 || item.value == 0) {
				item.value = "";
			}
		});
	}
});

const getDate = () => {
	try {
		return new Date().toLocaleDateString("fa-IR", {
			month: "numeric",
			weekday: "long",
			day: "numeric",
			hour: "2-digit",
			minute: "2-digit",
		});
	} catch {
		return new Date().toLocaleDateString;
	}
};
if (document.querySelector("#date")) {
	document.querySelector("#date").textContent = getDate();
}

next?.addEventListener("click", () => {
	let date = document.querySelector("#date").textContent;
	let shopNameInput = document.querySelector("#shop-name");
	let phoneInput = document.querySelector("#tel");
	let discountInput = document.querySelector("#discount");
	let addressInput = document.querySelector("#address");

	if (!shopNameInput.value) {
		showAlert("لطفا نام فروشگاه را وارد کنید", colors.error);
		return;
	}

	if (parseInt(discountInput.value) < 0 || parseInt(discountInput.value) > 100) {
		showAlert("درصد تخفیف باید بین 1 الی 100 باشد", colors.error);
		return;
	}

	invoiceData = {
		id: Date.now(),
		date,
		shopName: shopNameInput.value.trim(),
		phone: phoneInput.value.trim(),
		discount: Number(discountInput.value),
		address: addressInput.value.trim(),
	};

	addProductModal.classList.remove("hidden");

	shopNameInput.value = "";
	phoneInput.value = "";
	discountInput.value = "";
	addressInput.value = "";
});

document.addEventListener("DOMContentLoaded", () => {
	productShowCaser();
	collapser();
	productListController();

	const storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
	if (storedInvoices.length > 0) {
		emptySection?.classList.add("hidden");
		storedInvoices.forEach((invoice) => {
			renderInvoice(invoice);
		});
	}
});

const saveProductListBtn = document.querySelector("#save-invoice");
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let selectedProducts;

saveProductListBtn?.addEventListener("click", () => {
	selectedProducts = [];

	const productItems = document.querySelectorAll(".product-lists li");
	let totalAmount = 0;
	let totalSell = 0;

	productItems.forEach((item) => {
		const productName = item.querySelector("header span").textContent;
		const countInput = item.querySelector("input").value;
		const factoryPrice = item.querySelector("[data-fac]");
		const sellPrice = item.querySelector("[data-sell]");

		if (Number(countInput) > 0) {
			const factoryTotal = Number(factoryPrice.dataset.fac) * Number(countInput);
			const sellTotal = Number(sellPrice.dataset.sell) * Number(countInput);
			totalAmount += factoryTotal;
			totalSell += sellTotal;

			selectedProducts.push({
				name: productName,
				count: Number(countInput),
				factoryPrice: Number(factoryPrice.dataset.fac),
				factoryTotal,
				sellPrice: Number(sellPrice.dataset.sell),
				sellTotal,
			});

			emptySection.classList.add("hidden");
		}
	});

	if (selectedProducts.length === 0) {
		showAlert("هیچ محصولی انتخاب نشده", colors.error);
		return;
	}

	const newInvoice = {
		...invoiceData,
		products: selectedProducts,
		totalAmount,
		totalSell,
	};

	invoices.push(newInvoice);
	localStorage.setItem("invoices", JSON.stringify(invoices));

	renderInvoice(newInvoice);

	document.querySelectorAll(".count-action input").forEach((input) => (input.value = null));
	document.querySelectorAll(".product-info").forEach((div) => div.classList.replace("flex", "hidden"));

	addProductModal.classList.add("hidden");
	invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");
	showAlert("فاکتور با موفقیت ساخته شد", colors.succses);
});

function renderInvoice(invoice) {
	const invoiceCard = document.createElement("div");
	invoiceCard.classList.add(
		"card",
		"rounded-md",
		"bg-gray-100",
		"shadow-lg",
		"border-2",
		"border-solid",
		"border-black/10",
		"flex",
		"flex-col",
		"overflow-hidden"
	);
	invoiceCard.setAttribute("data-id", invoice.id);
	invoiceCard.innerHTML = /*html*/ `
					<header class="flex justify-between items-center border-b-2 border-solid border-black/10 p-4">
						<div class="flex flex-col justify-between gap-4">
							<div class="flex gap-1">
								<span class="text-black/70">نام فروشگاه:</span>
								<span class="font-bold">${invoice.shopName}</span>
							</div>
							<div class="flex items-center gap-1">
								<span class="text-black/70">تاریخ ایجاد:</span>
								<p class="font-bold text-sm">${invoice.date}</p>
							</div>
						</div>
						<div class="flex">
							<button title="دانلود عکس فاکتور" aria-label="دانلود عکس فاکتور" class="download-invoice text-5xl flex justify-center items-center text-blue-500 cursor-pointer">
								<ion-icon name="image-outline"></ion-icon>
							</button>
						</div>
					</header>
					<div class="flex justify-between max-[480px]:flex-col gap-1 p-4 bg-gray-200">
						<div class="flex gap-1">
							<span class="text-black/70">کد فاکتور:</span>
							<span class="text-primary font-bold">${invoice.id}</span>
						</div>
						<div class="flex gap-1">
							<span class="text-black/70">جمع فاکتور:</span>
							<span class="font-bold">${invoice.totalAmount.toLocaleString("fa-IR")} <small class="text-xs">ریال</small></span>
						</div>

					</div>
					<footer class="flex justify-between items-center">
						<div class="flex w-full">
							<button
								class="delete-invoice flex justify-center items-center w-full bg-primary text-white text-2xl p-4 max-[480px]:p-3"
								title="حذف"
								aria-label="حذف">
								<ion-icon name="trash-outline"></ion-icon>
							</button>
						</div>
						<div class="flex w-full">
							<button
								class="print-invoice flex justify-center items-center w-full bg-blue-500 text-white text-2xl p-4 max-[480px]:p-3"
								title="پرینت"
								aria-label="پرینت">
								<ion-icon name="print-outline"></ion-icon>
							</button>
						</div>
					</footer>
	`;

	resultContainer?.prepend(invoiceCard);

	invoiceCard.querySelector(".delete-invoice").addEventListener("click", () => {
		const invoiceId = parseInt(invoiceCard.getAttribute("data-id"), 10);

		let storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
		storedInvoices = storedInvoices.filter((inv) => inv.id !== invoiceId);
		localStorage.setItem("invoices", JSON.stringify(storedInvoices));

		invoiceCard.remove();
		showAlert("فاکتور با موفقیت حذف شد", colors.succses);

		if (resultContainer.childElementCount === 0) {
			emptySection.classList.remove("hidden");
		}
	});
}

//
const searchInput = document.querySelector("#search");

searchInput?.addEventListener("input", () => {
	const query = searchInput.value.trim().toLowerCase();
	const storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];

	const filteredInvoices = storedInvoices.filter((invoice) => invoice.shopName.toLowerCase().includes(query));

	resultContainer.innerHTML = "";

	if (filteredInvoices.length > 0) {
		emptySection.classList.add("hidden");
		filteredInvoices.forEach(renderInvoice);
	} else {
		emptySection.classList.remove("hidden");
	}
});

// show print page
resultContainer?.addEventListener("click", (e) => {
	const printBtn = e.target.closest(".print-invoice");
	const downloadBtn = e.target.closest(".download-invoice");

	if (!printBtn && !downloadBtn) return;

	const invoiceCard = printBtn ? printBtn.closest(".card") : downloadBtn.closest(".card");
	const invoiceId = invoiceCard.getAttribute("data-id");

	let storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
	const invoice = storedInvoices.find((inv) => inv.id == invoiceId);

	let profit = invoice.totalSell - invoice.totalAmount;
	let discounted = invoice.totalAmount - (invoice.totalAmount * invoice.discount) / 100;
	let discountedProfit = profit + invoice.totalAmount - discounted;

	if (!invoice) {
		showAlert("فاکتور مورد نظر یافت نشد", colors.error);
		return;
	}

	if (printBtn) {
		printInvoice(invoice);
	} else if (downloadBtn) {
		downloadInvoiceAsImage(invoice, downloadBtn);
	}

	function generateInvoiceHTML(invoice) {
		return /*html*/ `
					<div class="m-auto py-2 px-1 min-[580px]:p-5 mb-8">
						<header class="mb-8">
							<div class="flex justify-between items-center mb-4">
								<div class="flex">
									<img src="/images/logo.png" alt="لوگو طراوت" class="w-16"/>
								</div>
								<div class="flex flex-col items-end gap-3 text-xs">
									<div class="flex gap-1">
										<span>تاریخ ثبت:</span>
										<span class="font-bold">${invoice.date}</span>
									</div>
									<div class="flex gap-1 justify-between">
										<span>کد فاکتور:</span>
										<span class="font-bold">${invoice.id}</span>
									</div>
								</div>
							</div>
							<!--  -->
							<div class="text-center mb-2">
								<h2	class="font-bold text-2xl">فاکتور فروش</h2>
							</div>
							<div class="flex flex-col gap-3 text-xs">
								<div class="flex justify-between items-center gap-3">
									<div class="flex gap-1">
										<span>فروشگاه:</span>
										<span class="font-bold">${invoice.shopName}</span>
									</div>
									<div class='gap-1 ${invoice.phone == "" || null ? "hidden" : "flex"}' >
										<span>شماره تماس:</span>
										<span class="font-bold">${invoice.phone}</span>
									</div>
								</div>
	
							</div>
						</header>
						<!--  -->
						<table class="table w-full border-collapse text-center text-[0.6rem] min-[580px]:text-sm text-xs">
							<tbody style="page-break-before: auto; page-break-after: auto;">
							<tr class="break-inside-avoid table-row">
									<th class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">نام محصول</th>
									<th class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">تعداد</th>
									<th class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">قیمت خرید</th>
									<th class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">قیمت فروش</th>
									<th class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">جمع کل خرید</th>
									<th class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">جمع کل فروش</th>
							</tr>
							${invoice.products
								.map(
									(product) => `
									<tr class="break-inside-avoid table-row">
										<td class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">${product.name}</td>
										<td class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">${product.count}</td>
										<td class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">${product.factoryPrice.toLocaleString(
											"fa-IR"
										)}</td>
										<td class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">${
											product.sellPrice == product.factoryPrice
												? "ویژه رستوران"
												: product.sellPrice.toLocaleString("fa-IR")
										}</td>
										<td class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">${product.factoryTotal.toLocaleString(
											"fa-IR"
										)}</td>
										<td class="table-cell border border-solid border-black text-center p-0.5 min-[580px]:p-2">${
											product.sellTotal == product.factoryTotal
												? "ویژه رستوران"
												: product.sellTotal.toLocaleString("fa-IR")
										}</td>
									</tr>
								`
								)
								.join("")}
							</tbody>
						</table>
					<div class="flex flex-col gap-4 mb-5 mt-5">
						<div class="flex flex-col justify-between gap-4 text-sm min-[580px]:text-lg min-[580px]:flex-row">
							<div class="flex items-center gap-1">
								<span>جمع کل خرید:</span>
								<span class="font-bold">${invoice.totalAmount.toLocaleString("fa-IR")} <small class="text-[0.6rem]">ریال</small></span>
							</div>
							<div class="flex items-center gap-1">
								<span>سود شما از خرید:</span>
								<span class="font-bold">${
									invoice.discount == "" || 0
										? profit.toLocaleString("fa-IR")
										: discountedProfit.toLocaleString("fa-IR")
								} <small class="text-[0.6rem]">ریال</small></span>
							</div>
						</div>
						<div class="flex flex-col justify-between gap-4 text-sm min-[580px]:text-lg min-[580px]:flex-row">
							<div class="items-center gap-1 ${invoice.discount == "" || 0 ? "hidden" : "flex"}">
								<span >درصد تخفیف:</span>
								<span class="font-bold">${invoice.discount}%</span>
							</div>
							<div class="flex items-center gap-1">
								<span>${invoice.discount == "" || 0 ? "مبلغ قابل پرداخت:" : "مبلغ پرداخت پس از تخفیف:"}</span>
								<span class="font-bold">${
									invoice.discount == "" || 0
										? invoice.totalAmount.toLocaleString("fa-IR")
										: discounted.toLocaleString("fa-IR")
								} <small class="text-[0.6rem]">ریال</small></span>
							</div>
						</div>
					</div>
					<hr class="mb-5"/>
					<footer class="px-1 mt-5 min-[580px]:p-5">
						<div class="flex flex-col gap-4 text-xs min-[580px]:text-lg">
							<div class="gap-1 items-center ${invoice.address == "" || null ? "hidden" : "flex"}">
								<span>آدرس فروشگاه:</span>
								<span class="font-bold leading-4">${invoice.address}</span>
							</div>
							<small class="leading-4">توجه سود شما از خرید بدون احتساب قیمت فروش محصولات رستورانی می باشد.</small>
						</div>
						<!--  -->
						<p class="mt-10 mb-5 text-[0.5rem] text-center">*تولید شده توسط فاکتور ساز طراوت*</p>
					</footer>
		`;
	}

	function printInvoice(invoice) {
		let printSection = document.createElement("div");
		printSection.id = "printSection";
		printSection.innerHTML = generateInvoiceHTML(invoice);
		document.body.appendChild(printSection);

		printJS({
			printable: "printSection",
			type: "html",
			css: "/src/css/style.css",
			scanStyles: false,
			style: `
					body{
						direction: rtl;
					}
				`,
		});

		setTimeout(() => {
			printSection.remove();
		}, 1000);
	}

	function downloadInvoiceAsImage(invoice, button) {
		const tempContainer = document.createElement("div");
		tempContainer.classList.add("opacity-0");
		tempContainer.innerHTML = `<div id="invoice-content" class="p-5">${generateInvoiceHTML(invoice)}</div>`;
		document.body.appendChild(tempContainer);

		const invoiceElement = tempContainer.querySelector("#invoice-content");
		button.classList.add("animate-pulse");
		document.body.classList.add("overflow-hidden");

		const options = {
			style: {
				backgroundColor: "#fff",
			},
		};

		setTimeout(() => {
			domtoimage
				.toPng(invoiceElement, options)
				.then((dataUrl) => {
					const link = document.createElement("a");
					link.href = dataUrl;
					link.download = `فاکتور-${invoice.id}`;
					link.click();
					document.body.removeChild(tempContainer);
					document.body.classList.remove("overflow-hidden");
					button.classList.remove("animate-pulse");
				})
				.catch(() => {
					document.body.removeChild(tempContainer);
					button.classList.remove("animate-pulse");
					showAlert("خطا در دانلود عکس لطفا دوباره امتحان کنید", colors.error);
				});
		}, 500);
	}
});

document.addEventListener("DOMContentLoaded", function () {
	document.querySelectorAll(".product-img img").forEach((img) => {
		img.onerror = function () {
			this.onerror = null;
			this.src = "/images/img-error.jpg";
			this.classList.add("animate-pulse");
		};
	});
});

document.addEventListener("DOMContentLoaded", () => {
	document.querySelectorAll(".link").forEach((link) => {
		let linkPath = link.pathname;
		if (window.location.pathname == linkPath) {
			link.classList.add("text-primary", "after:w-full", "after:right-0");
		}

		link.addEventListener("click", (e) => {
			if (window.location.pathname == linkPath) {
				e.preventDefault();
				document.body.scrollIntoView(link);
			}
		});
	});
});

//
if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/service-worker.js");
}

let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (event) => {
	console.log("beforeinstallprompt event fired!"); // ← این باید در کنسول دیده شود
	event.preventDefault();
	deferredPrompt = event;
	installButton.style.display = "block";
});

installButton.addEventListener("click", () => {
	if (deferredPrompt) {
		deferredPrompt.prompt();
		deferredPrompt.userChoice.then((choiceResult) => {
			if (choiceResult.outcome === "accepted") {
				console.log("User accepted the install prompt");
			} else {
				console.log("User dismissed the install prompt");
			}
			deferredPrompt = null;
		});
	}
});
