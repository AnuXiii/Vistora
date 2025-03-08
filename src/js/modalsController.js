export const openNav = document.querySelector("#openNav");
export const closeNav = document.querySelector("#closeNav");
export const navigation = document.querySelector("#navigation");

export const createInvoiceBtn = document.querySelector("#create-invoice");
export const closeProductListBtn = document.querySelector("#close-product-list");
export const closeInvoiceDetailBtn = document.querySelector("#close-invoice-detail");
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
});

closeInvoiceDetailBtn?.addEventListener("click", () => {
	invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");
});

closeProductListBtn?.addEventListener("click", () => {
	addProductModal.classList.add("hidden");
	invoiceDetail.classList.add("hidden");
	document.body.classList.remove("overflow-hidden");
});
