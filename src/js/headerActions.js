import { showAlert, colors } from "./showAlert";
import { resultContainer } from "./main";
import { emptySection } from "./main";
import { formatPrice } from "./formatPrice";
import { modal } from "./components/modal";

const clearAllInvoicesBtn = document.getElementById("clear-all-invoices");
const clearYesterdayInvoicesBtn = document.getElementById("clear-yesterday-invoices");
const calculateSalesBtn = document.getElementById("calculate-sales");
const sendMessageBtn = document.getElementById("send-msg");

// Add event listener for clear all invoices button
clearAllInvoicesBtn?.addEventListener("click", clearInvoices);

function clearInvoices() {
	function goAction() {
		localStorage.removeItem("invoices");
		resultContainer.innerHTML = "";
		emptySection?.classList.remove("hidden");
		showAlert("تمامی فاکتور ها با موفقیت حذف شدند", colors.succsess);
	}

	modal("آیا از پاک کردن تمامی فاکتور ها اطمینان دارید؟", "info", goAction);
}

// Add event listener for clear yesterday invoices button
clearYesterdayInvoicesBtn?.addEventListener("click", clearYesterdayInvoices);

function clearYesterdayInvoices() {
	function goAction() {
		const yesterday = new Date();
		yesterday.setDate(yesterday.getDate() - 1);
		const yesterdayStr = yesterday.toLocaleDateString("fa-IR");

		let storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
		const filteredInvoices = storedInvoices.filter((invoice) => invoice.date !== yesterdayStr);

		if (storedInvoices.length === filteredInvoices.length) {
			showAlert("فاکتوری از روز قبل یافت نشد", colors.error);
			return;
		}

		localStorage.setItem("invoices", JSON.stringify(filteredInvoices));
		resultContainer.innerHTML = "";
		filteredInvoices.forEach((invoice) => renderInvoice(invoice));

		if (filteredInvoices.length === 0) {
			emptySection?.classList.remove("hidden");
		}

		showAlert("تمامی فاکتور های روز قبل حذف شدند", colors.succsess);
	}

	modal("آیا از پاک کردن تمامی فاکتور های روز قبل اطمینان دارید؟", "info", goAction);
}

// Add event listener for calculate sales button
calculateSalesBtn?.addEventListener("click", calculateSales);

function calculateSales() {
	const storedInvoices = JSON.parse(localStorage.getItem("invoices") || "[]");
	if (storedInvoices.length === 0) {
		showAlert("فاکتوری برای محاسبه یافت نشد", colors.error);
		return;
	}

	const totalSales = storedInvoices.reduce((sum, invoice) => sum + invoice.totalAmount, 0);

	const message = `
        <p>
            جمع کل فروش : <span class="text-lg font-dana-bold font-bold text-primary">${formatPrice(totalSales)} <small class="text-xs text-white/90">ریال</small></span>
        </p>
        <p>
            تعداد فاکتور ها : <span class="text-lg font-dana-bold font-bold text-primary">${storedInvoices.length}</span>
        </p>
    `;
	modal(message, "");
}

sendMessageBtn?.addEventListener("click", sendMessage);
function sendMessage() {
	showAlert("به زودی این گزینه فعال میشود");
}

export { clearInvoices, clearYesterdayInvoices, calculateSales, sendMessage };
