import { addProductModal, invoiceDetail } from "./modalsController";
import { invoiceData, shopNameInput, phoneInput, discountInput, addressInput } from "./invoiceDetailManager";

export const back = document.getElementById("back-button");
// Event listener to back to invoice details when the "Back" button is clicked
back?.addEventListener("click", backToInvoiceDetails);

export function backToInvoiceDetails() {
	addProductModal.classList.add("hidden");
	invoiceDetail.classList.remove("hidden");
	shopNameInput.value = invoiceData.shopName || "";
	phoneInput.value = invoiceData.phone || "";
	discountInput.value = invoiceData.discount || "";
	addressInput.value = invoiceData.address || "";
}
