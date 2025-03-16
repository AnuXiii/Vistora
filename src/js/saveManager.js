import { showAlert, colors } from "./showAlert";
import { renderInvoice } from "./renderInvoice";
import { invoiceData } from "./invoiceDetailManager";
import { addProductModal, invoiceDetail } from "./modalsController";
import { dataCleaner } from "./modalsController";

const saveProductListBtn = document.getElementById("save-invoice");
const invoicePreview = document.querySelector(".invoice-preview");

export let invoices = JSON.parse(localStorage.getItem("invoices")) || [];
export let selectedProducts = [];
export let currentInvoiceId = null;
export let totalAmount = 0;
export let totalSell = 0;

saveProductListBtn?.addEventListener("click", createInvoiceCard);

// Event listener to save the product list and create an invoice
export function createInvoiceCard() {
	selectedProducts = [];
	currentInvoiceId = Date.now();

	const productItems = document.querySelectorAll(".product-lists li");
	totalAmount = 0;
	totalSell = 0;

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
		}
	});

	if (selectedProducts.length === 0) {
		showAlert("محصولی وارد نشده است", colors.error);
		return;
	}

	selectedProducts.forEach((item) => {
		const tr = document.createElement("tr");
		tr.className = "product-preview";
		tr.innerHTML = /*html*/ `
			<td class="border border-solid border-white text-center p-4 bg-[#303030]">${item.name}</td>
			<td class="border border-solid border-white text-center p-4 bg-[#303030]">${item.count}</td>
		`;
		invoicePreview.querySelector("table").appendChild(tr);
	});
	invoicePreview.classList.remove("hidden");
}

document.querySelector(".save")?.addEventListener("click", handleSaveInvoice);
document.querySelector(".unsave")?.addEventListener("click", handleUnsaveInvoice);

export function handleSaveInvoice() {
	if (!currentInvoiceId || selectedProducts.length === 0) {
		showAlert("خطا در ذخیره‌سازی فاکتور", colors.error);
		return;
	}

	const newInvoice = {
		id: currentInvoiceId,
		...invoiceData,
		products: selectedProducts,
		totalAmount,
		totalSell,
	};

	const existingInvoiceIndex = invoices.findIndex((inv) => inv.id === newInvoice.id);
	if (existingInvoiceIndex !== -1) {
		invoices[existingInvoiceIndex] = newInvoice;
	} else {
		invoices.push(newInvoice);
	}

	localStorage.setItem("invoices", JSON.stringify(invoices));

	renderInvoice(newInvoice);

	dataCleaner();
	addProductModal.classList.add("hidden");
	invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");

	showAlert("فاکتور با موفقیت ذخیره شد", colors.succsess);
	invoicePreview.classList.add("hidden");
	invoicePreview.querySelectorAll(".product-preview").forEach((item) => item.remove());
}

export function handleUnsaveInvoice() {
	invoicePreview.classList.add("hidden");
	invoicePreview.querySelectorAll(".product-preview").forEach((item) => item.remove());
}
