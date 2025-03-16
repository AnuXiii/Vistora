import { showAlert, colors } from "./showAlert";
import { addProductModal } from "./modalsController";
import { dateElement } from "./getNowDate";

export let invoiceData = {}; // Stores invoice details
// Event listener to save invoice details when the "Next" button is clicked
export let date;
export let shopNameInput;
export let phoneInput;
export let discountInput;
export let addressInput;

const next = document.getElementById("next");
next?.addEventListener("click", saveInvoiceDetails);

// Function to save invoice details and validate inputs
export function saveInvoiceDetails() {
	date = dateElement.textContent;
	shopNameInput = document.getElementById("shop-name");
	phoneInput = document.getElementById("tel");
	discountInput = document.getElementById("discount");
	addressInput = document.getElementById("address");

	if (!shopNameInput.value) {
		showAlert("نام فروشگاه وارد نشده است", colors.error);
		return;
	}

	if (discountInput.value < 0 || discountInput.value > 100) {
		showAlert("تخفیف باید بین 1 الی 100 باشد", colors.error);
		return;
	}

	invoiceData = {
		id: Date.now(),
		date: dateElement.textContent,
		shopName: shopNameInput.value.trim(),
		phone: phoneInput.value.trim(),
		discount: Number(discountInput.value),
		address: addressInput.value.trim(),
	};

	addProductModal.classList.remove("hidden");

	// Reset invoice details after saving
	document.querySelectorAll("[data-req]").forEach((input) => (input.value = ""));
}
