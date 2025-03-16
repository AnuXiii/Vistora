import domtoimage from "dom-to-image";
import { invoiceHTMLGenerator } from "./invoiceHTMLGenerator";

export function downloadInvoiceAsImage(invoice, button) {
	const tempContainer = document.createElement("div");
	tempContainer.classList.add("opacity-0");
	tempContainer.innerHTML = `<div id="invoice-content" class="p-5">${invoiceHTMLGenerator(invoice)}</div>`;
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
