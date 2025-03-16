import { resultContainer, emptySection } from "./main";
import { renderInvoice } from "./renderInvoice";

// Search functionality to filter invoices by shop name
export const searchInput = document.getElementById("search");

export function searchByName() {
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
}
