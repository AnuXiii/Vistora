// Import necessary libraries and modules
import printJS from "print-js"; // Library to handle printing functionality
import { products } from "./data"; // Import product data from a local file
import { showAlert, colors } from "./showAlert"; // Import alert utility functions
import { Vheader } from "./components/header";
import { Vfooter } from "./components/footer";
import * as uiManager from "./uiManager";
import * as modalsController from "./modalsController"; // Import modal control functions
import { imgStatusChecker, linkStatusChecker } from "./loadCheckers"; // Import functions to check image and link statuses
import * as installModal from "./installModal"; // Import installation modal functions
import { dateElement, getNowDate } from "./getNowDate"; // Import date-related utilities
import { invoiceData, date, shopNameInput, phoneInput, discountInput, addressInput } from "./invoiceDetailManager";
import { backToInvoiceDetails } from "./backToDetail";
import { totalAmount, totalSell, createInvoiceCard, handleSaveInvoice, handleUnsaveInvoice } from "./saveManager";
import { invoiceHTMLGenerator } from "./invoiceHTMLGenerator";
import { downloadInvoiceAsImage } from "./downloadInvoiceAsImage";
import { searchByName } from "./searchInvoice";
import { renderInvoice } from "./renderInvoice";

//
import { changeModalLoader } from "./changeLog/changeModal";
import { editInvoice } from "./editor/edit-invoice";

// Select DOM elements for product categories, product lists, and other UI components
export const productCategories = document.querySelectorAll("[data-category]");
export const resultContainer = document.querySelector(".result-container");
export const emptySection = document.querySelector(".empty-section");

// Update the date element in the invoice detail page if it exists
if (dateElement) {
	setInterval(() => {
		dateElement.textContent = getNowDate();
	}, 1000);
}

// Run link status checker to ensure all resources are loaded correctly
document.addEventListener("DOMContentLoaded", () => {
	linkStatusChecker();
});

// Initialize the application when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	uiManager.initProducts();
	uiManager.productBoxCollapser();
	uiManager.productsMenuController();
	uiManager.Counter();
	uiManager.counterValidator();
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

// Export variables to store profit and discount calculations
export let profitCalculator;
export let discountCalculator;
export let totalProfitDiscount;

// Function to calculate profit and discount for a given invoice
export function calculator(invoice) {
	profitCalculator = invoice.totalSell - invoice.totalAmount;
	discountCalculator = invoice.totalAmount - (invoice.totalAmount * invoice.discount) / 100;
	totalProfitDiscount = profitCalculator + invoice.totalAmount - discountCalculator;
}

// Event listener to handle printing and downloading invoices
function invoiceManager() {
	resultContainer?.addEventListener("click", (e) => {
		const printBtn = e.target.closest(".print-invoice");
		const downloadBtn = e.target.closest(".download-invoice");
		const editBtn = e.target.closest(".edit-invoice");

		if (!printBtn && !downloadBtn && !editBtn) return;

		const invoiceCard = e.target.closest(".card");
		const invoiceId = invoiceCard.getAttribute("data-id");

		let storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
		const invoice = storedInvoices.find((inv) => inv.id == invoiceId);

		calculator(invoice);

		if (!invoice) {
			showAlert("فاکتور مورد نظر یافت نشد", colors.error);
			return;
		}

		if (printBtn) {
			printInvoice(invoice);
		} else if (downloadBtn) {
			downloadInvoiceAsImage(invoice, downloadBtn);
		} else if (editBtn) {
			editInvoice(invoice);
		}

		// Function to print the invoice
		function printInvoice(invoice) {
			const printSection = document.createElement("div");
			printSection.id = "printSection";
			printSection.innerHTML = invoiceHTMLGenerator(invoice);
			document.body.appendChild(printSection);

			printJS({
				printable: "printSection",
				type: "html",
				css: "https://vistora-one.vercel.app/assets/main-DHpi2i9A.css",
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
	});
}

// Initialize invoice manager and search functionality when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
	invoiceManager();
	searchByName();
	changeModalLoader();
});
