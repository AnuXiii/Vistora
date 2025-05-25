import { showAlert, colors } from "./showAlert";
import { resultContainer, emptySection } from "./main";
import { formatPrice } from "./formatPrice";

// Function to render an invoice card in the UI
export function renderInvoice(invoice) {
	const invoiceCard = document.createElement("div");
	invoiceCard.setAttribute("data-id", invoice.id);
	invoiceCard.classList.add(
		"card",
		"rounded-md",
		"bg-gray-100",
		"shadow-lg",
		"border-2",
		"border-solid",
		"border-black/10",
		"flex",
		"flex-col",
		"overflow-hidden",
		"opacity-50",
		"duration-200"
	);

	invoiceCard.innerHTML = /*html*/ `
					<header class="flex justify-between items-center border-b-2 border-solid border-black/10 p-4">
						<div class="flex flex-col justify-between gap-4">
							<div class="flex gap-1">
								<span class="text-black/70">نام فروشگاه:</span>
								<span class="font-bold">${invoice.shopName}</span>
							</div>
							<div class="flex items-center gap-1">
								<span class="text-black/70">تاریخ ایجاد:</span>
								<p class="font-bold text-sm">${invoice.date}</p>
							</div>
						</div>
						<div class="flex relative">
							<button title="دانلود عکس فاکتور" aria-label="دانلود عکس فاکتور" class="download-invoice text-5xl flex justify-center items-center text-blue-500 cursor-pointer">
								<ion-icon name="image-outline"></ion-icon>
							</button>
						</div>
					</header>
					<div class="flex justify-between max-[480px]:flex-col gap-4 p-4 bg-gray-200">
						<div class="flex gap-1">
							<span class="text-black/70">کد فاکتور:</span>
							<span class="text-primary font-bold">${invoice.id}</span>
						</div>
						<div class="flex gap-1">
							<span class="text-black/70">جمع فاکتور:</span>
							<span class="font-bold">${formatPrice(invoice.totalAmount)} <small class="text-xs">ریال</small></span>
						</div>

					</div>
					<footer class="flex justify-between items-center divide-x-2 divide-solid divide-white">
						<div class="flex w-full">
							<button
								class="delete-invoice cursor-pointer flex justify-center items-center w-full bg-primary text-white text-2xl p-4"
								title="حذف"
								aria-label="حذف">
								<ion-icon name="trash-outline"></ion-icon>
							</button>
						</div>
						<div class="flex w-full">
							<button
								class="edit-invoice cursor-pointer flex justify-center items-center w-full bg-blue-800 text-white text-2xl p-4"
								title="ویرایش"
								aria-label="ویرایش">
								<ion-icon name="pencil-outline"></ion-icon>
							</button>
						</div>
						<div class="flex w-full">
							<button
								class="print-invoice cursor-pointer flex justify-center items-center w-full bg-blue-500 text-white text-2xl p-4"
								title="پرینت"
								aria-label="پرینت">
								<ion-icon name="print-outline"></ion-icon>
							</button>
						</div>
					</footer>
	`;

	resultContainer?.prepend(invoiceCard);
	emptySection?.classList.add("hidden");
	setTimeout(() => {
		invoiceCard.classList.replace("opacity-50", "opacity-100");
	}, 500);

	// Event listener to delete an invoice
	invoiceCard.querySelector(".delete-invoice").addEventListener("click", () => {
		const invoiceId = parseInt(invoiceCard.getAttribute("data-id"), 10);

		let storedInvoices = JSON.parse(localStorage.getItem("invoices")) || [];
		storedInvoices = storedInvoices.filter((inv) => inv.id !== invoiceId);
		localStorage.setItem("invoices", JSON.stringify(storedInvoices));

		invoiceCard.remove();
		showAlert("فاکتور با موفقیت حذف شد", colors.succsess);

		if (resultContainer.childElementCount === 0) {
			emptySection.classList.remove("hidden");
		}
	});
}
