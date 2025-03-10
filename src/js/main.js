// Import necessary libraries and modules
import domtoimage from "dom-to-image"; // Library to convert DOM elements to images
import printJS from "print-js"; // Library to handle printing functionality
import { products } from "./data"; // Import product data from a local file
import { showAlert, colors } from "./showAlert"; // Import alert utility functions
import * as component from "./components";
import * as modalsController from "./modalsController"; // Import modal control functions
import { imgStatusChecker, linkStatusChecker } from "./loadCheckers"; // Import functions to check image and link statuses
import * as installModal from "./installModal"; // Import installation modal functions
import { dateElement, getNowDate } from "./getNowDate"; // Import date-related utilities
import * as catalogs from "./catalogs"; // Import catalog-related functions

// Select DOM elements for product categories, product lists, and other UI components
const productCategories = document.querySelectorAll("[data-category]");
const productsList = document.querySelector(".product-lists");
const emptySection = document.querySelector(".empty-section");
const next = document.querySelector("#next");
const back = document.querySelector("#back-button");
const resultContainer = document.querySelector(".result-container");

// Initialize variables to store product list data and invoice data
let productListData = ""; // Stores the currently selected product category
let invoiceData = {}; // Stores invoice details

// Update the date element in the invoice detail page if it exists
dateElement ? (dateElement.textContent = getNowDate()) : "";

// Run image and link status checkers to ensure all resources are loaded correctly

document.addEventListener("DOMContentLoaded", () => {
	linkStatusChecker();
});

// Function to handle product category menu interactions
function productsMenuController() {
	productCategories.forEach((item) => {
		// Automatically click the first category if it exists
		productCategories[0] ? productCategories[0].click() : "";

		// Add click event listener to each category
		item.addEventListener("click", () => {
			// Remove the 'active' class from the previously active category
			if (item.parentNode.querySelector(".active")) {
				item.parentNode.querySelector(".active").classList.remove("active");
			}
			// Set the current category and add the 'active' class
			productListData = item.dataset.category;
			item.classList.add("active");

			// Show or hide product lists based on the selected category
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

// Function to initialize and append products to the product list container
function initProducts() {
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
								<div class="product-img relative rounded-md bg-primary/20 bg-[url(/images/product-bg.webp)] bg-repeat-round bg-contain">
									<img
										loading="lazy"
                                    	src="${item.img}"
										alt="${item.name}"
										class="rounded-md drop-shadow-2xl grayscale-50 w-120 max-w-full mx-auto object-cover" />
									<div class="spinner flex justify-center items-center bg-black/90 absolute inset-0 w-full h-full top-0 right-0">
										<div class="animate-spin w-12 h-12 border-3 border-solid border-primary border-b-transparent rounded-full"></div>
									</div>
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
										class="number-input w-full text-center border-none outline-none placeholder:opacity-100" />
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

// Function to handle collapsing and expanding product boxes
function productBoxCollapser() {
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

// Event listener for increasing or decreasing product quantity
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

// Event listener to validate number inputs in the product list
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

// Event listener to save invoice details when the "Next" button is clicked
let date;
let shopNameInput;
let phoneInput;
let discountInput;
let addressInput;

next?.addEventListener("click", saveInvoiceDetails);

// Function to save invoice details and validate inputs
function saveInvoiceDetails() {
	date = dateElement.textContent;
	shopNameInput = document.querySelector("#shop-name");
	phoneInput = document.querySelector("#tel");
	discountInput = document.querySelector("#discount");
	addressInput = document.querySelector("#address");

	if (!shopNameInput.value) {
		showAlert("نام فروشگاه وارد نشده است", colors.error);
		return;
	}

	if (parseInt(discountInput.value) < 0 || parseInt(discountInput.value) > 100) {
		showAlert("تخفیف باید بین 1 الی 100 باشد", colors.error);
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

	modalsController.addProductModal.classList.remove("hidden");

	// Reset invoice details after saving
	shopNameInput.value = "";
	phoneInput.value = "";
	discountInput.value = "";
	addressInput.value = "";
}

// Event listener to back to invoice details when the "Back" button is clicked
back?.addEventListener("click", backToInvoiceDetails);

function backToInvoiceDetails() {
	modalsController.addProductModal.classList.add("hidden");
	modalsController.invoiceDetail.classList.remove("hidden");
	invoiceData.shopName == "" || 0 ? (shopNameInput.value = "") : (shopNameInput.value = invoiceData.shopName);
	invoiceData.phone == "" || 0 ? (phoneInput.value = "") : (phoneInput.value = invoiceData.phone);
	invoiceData.discount == "" || 0 ? (discountInput.value = "") : (discountInput.value = invoiceData.discount);
	invoiceData.address == "" || 0 ? (addressInput.value = "") : (addressInput.value = invoiceData.address);
}

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	initProducts();
	productBoxCollapser();
	productsMenuController();
	imgStatusChecker();

	// Load stored invoices from localStorage
	const storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
	if (storedInvoices.length > 0) {
		emptySection?.classList.add("hidden");
		storedInvoices.forEach((invoice) => {
			renderInvoice(invoice);
		});
	}
});

// Event listener to save the product list and create an invoice
const saveProductListBtn = document.querySelector("#save-invoice");
let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
let selectedProducts;
saveProductListBtn?.addEventListener("click", createInvoiceCard);

function createInvoiceCard() {
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
		showAlert("محصولی وارد نشده است", colors.error);
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

	// Reset product list inputs and hide modals
	document.querySelectorAll(".count-action input").forEach((input) => (input.value = null));
	document.querySelectorAll(".product-info").forEach((div) => div.classList.replace("flex", "hidden"));
	modalsController.addProductModal.classList.add("hidden");
	modalsController.invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");
	showAlert("فاکتور با موفقیت ساخته شد", colors.succses);
	// autoClick on first category menu after saveing and invoice created
	productCategories[0] ? productCategories[0].click() : null;
}

// Function to render an invoice card in the UI
function renderInvoice(invoice) {
	const invoiceCard = document.createElement("div");
	invoiceCard.setAttribute("data-id", invoice.id);
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
		"overflow-hidden",
		"opacity-50",
		"duration-200"
	);

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
						<div class="flex relative">
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
	setTimeout(() => {
		invoiceCard.classList.replace("opacity-50", "opacity-100");
	}, 500);

	// Event listener to delete an invoice
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

// Search functionality to filter invoices by shop name
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

// Event listener to handle printing and downloading invoices
resultContainer?.addEventListener("click", (e) => {
	const printBtn = e.target.closest(".print-invoice");
	const downloadBtn = e.target.closest(".download-invoice");

	if (!printBtn && !downloadBtn) return;

	const invoiceCard = printBtn ? printBtn.closest(".card") : downloadBtn.closest(".card");
	const invoiceId = invoiceCard.getAttribute("data-id");

	let storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
	const invoice = storedInvoices.find((inv) => inv.id == invoiceId);

	let profitCalculator = invoice.totalSell - invoice.totalAmount;
	let discountCalculator = invoice.totalAmount - (invoice.totalAmount * invoice.discount) / 100;
	let totalProfitDiscount = profitCalculator + invoice.totalAmount - discountCalculator;

	if (!invoice) {
		showAlert("فاکتور مورد نظر یافت نشد", colors.error);
		return;
	}

	if (printBtn) {
		printInvoice(invoice);
	} else if (downloadBtn) {
		downloadInvoiceAsImage(invoice, downloadBtn);
	}

	// Function to generate HTML for the invoice
	function generateInvoiceHTML(invoice) {
		return /*html*/ `
					<div class="m-auto py-2 px-1 min-[580px]:p-5 mb-8">
						<header class="mb-8">
							<div class="flex justify-between items-center mb-4">
								<div class="flex">
									<img src="/images/logo.png" alt="لوگو طراوت" class="w-16"/>
								</div>
								<div class="flex flex-col gap-3 text-xs">
									<div class="flex gap-1 justify-between">
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
							<div class="text-center mb-4">
								<h2	class="font-bold font-dana-bold text-2xl">فاکتور فروش</h2>
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
					<div class="flex flex-col items-end justify-end w-full gap-4 mb-5 mt-5 pl-2">
						<div class="flex flex-col gap-4 text-sm min-[580px]:text-lg">
							<div class="flex items-center justify-between gap-2">
								<span>جمع کل خرید:</span>
								<span class="font-bold text-left">${invoice.totalAmount.toLocaleString(
									"fa-IR"
								)} <small class="text-[0.6rem]">ریال</small></span>
							</div>
							<div class="flex items-center justify-between gap-2">
								<span>سود شما از خرید:</span>
								<span class="font-bold text-left">${
									invoice.discount == "" || 0
										? profitCalculator.toLocaleString("fa-IR")
										: totalProfitDiscount.toLocaleString("fa-IR")
								} <small class="text-[0.6rem]">ریال</small></span>
							</div>
							<div class="items-center justify-between gap-2 ${invoice.discount == "" || 0 ? "hidden" : "flex"}">
								<span>تخفیف اعمال شده:</span>
								<span class="font-bold text-center">${invoice.discount}%</span>
							</div>
							<div class="flex items-center justify-between gap-2">
								<span>${invoice.discount == "" || 0 ? "مبلغ قابل پرداخت:" : "مبلغ نهایی پرداخت:"}</span>
								<span class="font-bold text-left">${
									invoice.discount == "" || 0
										? invoice.totalAmount.toLocaleString("fa-IR")
										: discountCalculator.toLocaleString("fa-IR")
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
						<p class="mt-10 pb-5 text-[0.5rem] font-bold text-center">powered by vistora - invoice creator</p>
					</footer>
		`;
	}

	// Function to print the invoice
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

	// Function to download the invoice as an image
	function downloadInvoiceAsImage(invoice, button) {
		const tempContainer = document.createElement("div");
		tempContainer.classList.add("opacity-0");
		tempContainer.innerHTML = `<div id="invoice-content" class="p-5">${generateInvoiceHTML(invoice)}</div>`;
		document.body.appendChild(tempContainer);

		const invoiceElement = tempContainer.querySelector("#invoice-content");
		button.classList.add("animate-pulse", "pointer-events-none");
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
					button.classList.remove("animate-pulse", "pointer-events-none");
				})
				.catch(() => {
					document.body.removeChild(tempContainer);
					button.classList.remove("animate-pulse", "pointer-events-none");
					showAlert("خطا در دانلود عکس لطفا دوباره امتحان کنید", colors.error);
				});
		}, 500);
	}
});
