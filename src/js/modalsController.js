import { productCategories } from "./main";

export const openNav = document.getElementById("openNav");
export const closeNav = document.getElementById("closeNav");
export const navigation = document.getElementById("navigation");

export const createInvoiceBtn = document.getElementById("create-invoice");
export const closeProductListBtn = document.getElementById("close-product-list");
export const closeInvoiceDetailBtn = document.getElementById("close-invoice-detail");
export const invoiceDetail = document.querySelector(".invoice-detail");
export const addProductModal = document.querySelector(".add-product");

openNav?.addEventListener("click", () => {
	navigation.classList.add("show", "fade-in");
	document.body.classList.add("overflow-hidden");
});

closeNav?.addEventListener("click", () => {
	navigation.classList.remove("show", "fade-in");
	document.body.classList.remove("overflow-hidden");
});

createInvoiceBtn?.addEventListener("click", () => {
	invoiceDetail.classList.remove("hidden");
	document.body.classList.add("overflow-hidden");
	document.getElementById("invoice-detail-title").innerHTML = "مشخصات فاکتور";
});

closeInvoiceDetailBtn?.addEventListener("click", () => {
	dataCleaner();
	invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");
});

closeProductListBtn?.addEventListener("click", () => {
	dataCleaner();
	addProductModal.classList.add("hidden");
	invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");
});

export function dataCleaner() {
	document.querySelectorAll("[data-req]").forEach((input) => (input.value = null));
	document.querySelectorAll(".count-action input").forEach((input) => (input.value = null));
	document.querySelectorAll(".product-info").forEach((div) => div.classList.replace("flex", "hidden"));
	document.querySelectorAll(".product-item").forEach((item) => item.classList.remove("bg-blue-950"));
	productCategories[0] ? productCategories[0].click() : null;
}
