import domtoimage from "dom-to-image";
import { invoiceHTMLGenerator } from "./invoiceHTMLGenerator";

export function downloadInvoiceAsImage(invoice, button) {
	// Create temporary container for invoice
	const tempContainer = document.createElement("div");
	tempContainer.classList.add("opacity-0");
	tempContainer.innerHTML = `<div id="invoice-content" class="p-5">${invoiceHTMLGenerator(invoice)}</div>`;
	document.body.appendChild(tempContainer);

	// Get invoice element
	const invoiceElement = tempContainer.querySelector("#invoice-content");

	// Show loading state on button
	button.classList.add("animate-pulse", "pointer-events-none");

	// Disable page scroll
	document.body.classList.add("overflow-hidden");

	// Image conversion options
	const options = {
		style: {
			backgroundColor: "#fff",
		},
	};

	// Delay for DOM rendering
	setTimeout(() => {
		// Convert invoice to PNG image
		domtoimage
			.toPng(invoiceElement, options)
			.then((dataUrl) => {
				// Create download link
				const link = document.createElement("a");
				link.href = dataUrl;
				link.download = `فاکتور-${invoice.id}`;
				link.click();

				// Clean up temporary elements
				document.body.removeChild(tempContainer);
				document.body.classList.remove("overflow-hidden");

				// Reset button state
				button.classList.remove("animate-pulse", "pointer-events-none");
			})
			.catch(() => {
				// Handle error case
				document.body.removeChild(tempContainer);
				button.classList.remove("animate-pulse", "pointer-events-none");
				showAlert("خطا در دانلود عکس لطفا دوباره امتحان کنید", colors.error);
			});
	}, 500);
}
