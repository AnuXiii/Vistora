import { showAlert, colors } from "./showAlert";
import { resultContainer } from "./main";
import { emptySection } from "./main";
import { formatPrice } from "./formatPrice";
import { modal } from "./components/modal";
import { initFormController } from "./formController";

const clearAllInvoicesBtn = document.getElementById("clear-all-invoices");
const calculateSalesBtn = document.getElementById("calculate-sales");

// Add event listener for clear all invoices button
clearAllInvoicesBtn?.addEventListener("click", clearInvoices);

function clearInvoices() {
	function goAction() {
		if (!localStorage.getItem("invoices") || localStorage.getItem("invoices").length === 0) {
			showAlert("هیچ فاکتوری ثبت نشده است", colors.error);
			return;
		}

		localStorage.removeItem("invoices");
		resultContainer.innerHTML = "";
		emptySection?.classList.remove("hidden");
		showAlert("تمامی فاکتور ها با موفقیت حذف شدند", colors.succsess);
	}

	modal("آیا از پاک کردن تمامی فاکتور ها اطمینان دارید؟", "info", goAction);
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

export { clearInvoices, calculateSales };
