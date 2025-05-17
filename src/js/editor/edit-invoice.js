import { invoiceDetail } from "../modalsController";

let isEditing = false;
let editingInvoiceId = null;

export function editInvoice(invoice) {
	isEditing = true;
	editingInvoiceId = invoice.id;

	invoiceDetail.classList.remove("hidden");
	document.getElementById("shop-name").value = invoice.shopName;
	document.getElementById("tel").value = invoice.phone || "";
	document.getElementById("discount").value = invoice.discount || "";
	document.getElementById("address").value = invoice.address || "";

	invoice.products.forEach((savedProduct) => {
		const productsElements = document.querySelectorAll(".product-item");

		productsElements.forEach((product) => {
			const productName = product.querySelector(".product-name");
			const productCount = product.querySelector(".number-input");

			if (productName && productCount && productName.textContent.trim() === savedProduct.name) {
				productCount.value = savedProduct.count;
			}
		});
	});
}

export function removeDuplicateInvoice() {
	if (!isEditing || !editingInvoiceId) return;

	const saved = localStorage.getItem("invoices");
	if (saved) {
		const invoices = JSON.parse(saved);
		const filtered = invoices.filter((inv) => inv.id !== editingInvoiceId);
		localStorage.setItem("invoices", JSON.stringify(filtered));
	}

	const existing = document.querySelector(`.card[data-id="${editingInvoiceId}"]`);
	if (existing) {
		existing.remove();
	}

	isEditing = false;
	editingInvoiceId = null;
}
