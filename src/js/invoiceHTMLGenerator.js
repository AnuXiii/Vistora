import { profitCalculator, discountCalculator, totalProfitDiscount, calculator } from "./main";
import { formatPrice } from "./formatPrice";

export function invoiceHTMLGenerator(invoice) {
	return /*html*/ `
				<div class="m-auto py-2 px-1 min-[580px]:p-5 mb-8">
					<header class="mb-8">
						<div class="flex justify-between items-center mb-4">
							<div class="flex">
								<img src="/images/logo.png" alt="لوگو طراوت" class="w-16"/>
							</div>
							<div class="flex flex-col gap-3 text-xs">
								<div class="flex gap-1 justify-between">
									<span>تاریخ ثبت:</span>
									<span class="font-bold">${invoice.date}</span>
								</div>
								<div class="flex gap-1 justify-between">
									<span>کد فاکتور:</span>
									<span class="font-bold">${invoice.id}</span>
								</div>
							</div>
						</div>
						<!--  -->
						<div class="text-center mb-4">
							<h2	class="font-bold font-dana-bold text-2xl">فاکتور فروش</h2>
						</div>
						<div class="flex flex-col gap-3 text-xs">
							<div class="flex justify-between items-center gap-3">
								<div class="flex gap-1">
									<span>فروشگاه:</span>
									<span class="font-bold">${invoice.shopName}</span>
								</div>
								<div class='gap-1 ${invoice.phone == "" || null ? "hidden" : "flex"}' >
									<span>شماره تماس:</span>
									<span class="font-bold">${invoice.phone}</span>
								</div>
							</div>

						</div>
					</header>
					<!--  -->
					<table class="table w-full border-collapse text-center text-[0.6rem] min-[580px]:text-sm text-xs">
						<tbody style="page-break-before: auto; page-break-after: auto;">
						<tr class="break-inside-avoid table-row">
								<th class="table-cell bg-gray-100 border border-solid border-black text-center p-1 min-[580px]:p-2">ردیف</th>
								<th class="table-cell bg-gray-100 border border-solid border-black text-center p-1 min-[580px]:p-2">نام محصول</th>
								<th class="table-cell bg-gray-100 border border-solid border-black text-center p-1 min-[580px]:p-2">تعداد</th>
								<th class="table-cell bg-gray-100 border border-solid border-black text-center p-1 min-[580px]:p-2">قیمت خرید</th>
								<th class="table-cell bg-gray-100 border border-solid border-black text-center p-1 min-[580px]:p-2">قیمت فروش</th>
								<th class="table-cell bg-gray-100 border border-solid border-black text-center p-1 min-[580px]:p-2">جمع کل خرید</th>
						</tr>
						${invoice.products
							.map(
								(product, index) => /*html*/ `
								<tr class="break-inside-avoid table-row">
									<td class="table-cell border border-solid border-black text-center p-1 min-[580px]:p-2">${index + 1}</td>
									<td class="table-cell border border-solid border-black text-center p-1 min-[580px]:p-2">${product.name}</td>
									<td class="table-cell border border-solid border-black text-center p-1 min-[580px]:p-2">${product.count}</td>
									<td class="table-cell border border-solid border-black text-center p-1 min-[580px]:p-2">${formatPrice(
										product.factoryPrice
									)}</td>
									<td class="table-cell border border-solid border-black text-center p-1 min-[580px]:p-2">${
										product.sellPrice == product.factoryPrice ? "ویژه رستوران" : formatPrice(product.sellPrice)
									}</td>
									<td class="table-cell border border-solid border-black text-center p-1 min-[580px]:p-2">${formatPrice(
										product.factoryTotal
									)}</td>
								</tr>
							`
							)
							.join("")}
						</tbody>
					</table>
				<div class="flex flex-col items-end justify-end w-full gap-4 mb-5 mt-5 pl-2">
					<div class="flex flex-col gap-4 text-sm min-[580px]:text-lg">
						<div class="flex items-center justify-between gap-2">
							<span>جمع کل خرید:</span>
							<span class="font-bold text-left">${formatPrice(invoice.totalAmount)} <small class="text-[0.6rem]">ریال</small></span>
						</div>
						<div class="${profitCalculator == 0 ? "hidden" : "flex"}  items-center justify-between gap-2" >
							<span>سود محاسبه شده:</span>
							<span class="font-bold text-left">${
								invoice.discount == "" || 0 ? formatPrice(profitCalculator) : formatPrice(totalProfitDiscount)
							} <small class="text-[0.6rem]">ریال</small></span>
						</div>
						<div class="items-center justify-between gap-2 ${invoice.discount == "" || 0 ? "hidden" : "flex"}">
							<span>تخفیف اعمال شده:</span>
							<span class="font-bold text-center">${invoice.discount}%</span>
						</div>
						<div class="flex items-center justify-between gap-2">
							<span>${invoice.discount == "" || 0 ? "مبلغ قابل پرداخت:" : "مبلغ نهایی پرداخت:"}</span>
							<span class="font-bold text-left">${
								invoice.discount == "" || 0 ? formatPrice(invoice.totalAmount) : formatPrice(discountCalculator)
							} <small class="text-[0.6rem]">ریال</small></span>
						</div>
					</div>
				</div>
				<hr class="mb-5"/>
				<footer class="px-1 mt-5 min-[580px]:p-5">
					<div class="flex flex-col gap-4 text-xs min-[580px]:text-lg">
						<div class="gap-1 items-center ${invoice.address == "" || null ? "hidden" : "flex"}">
							<span>آدرس فروشگاه:</span>
							<span class="font-bold leading-4">${invoice.address}</span>
						</div>
						<small class="leading-4">توجه سود شما از خرید بدون احتساب قیمت فروش محصولات رستورانی می باشد.</small>
					</div>
					<!--  -->
					<p class="mt-10 pb-5 text-[0.5rem] font-bold text-center">powered by vistora - invoice creator</p>
				</footer>
	`;
}
