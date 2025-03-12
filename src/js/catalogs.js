import { products } from "./data";
export const catBoxsContainer = document.querySelector(".cat-box-container");
export const catBoxs = document.querySelectorAll(".cat-box");
export const catalogTableCr = document.querySelector(".catalog-table-cr");
export const closeCatalog = document.getElementById("closeCatalog");
export const catalogList = document.querySelector(".catalog-lists");

export let dataCatalog = "";

catBoxs?.forEach((item) => {
	item.addEventListener("click", () => {
		if (catBoxsContainer.querySelector(".active")) {
			catBoxsContainer.querySelector(".active").classList.remove("active");
		}
		item.classList.add("active");
		catBoxsContainer.classList.add("hidden");
		catalogTableCr.classList.remove("hidden");
		dataCatalog = item.dataset.catalog;
		showCatalogs();
	});
});

closeCatalog?.addEventListener("click", () => {
	catBoxsContainer.classList.remove("hidden");
	catalogTableCr.classList.add("hidden");
	catalogList.querySelectorAll("tr:not(:first-child)").forEach((item) => item.classList.add("hidden"));
});

export function showCatalogs() {
	products?.forEach((item) => {
		const tr = document.createElement("tr");
		tr.classList.add("hidden", "text-nowrap", "opacity-0", "duration-200");
		tr.setAttribute("data-catalogs", item.category);
		tr.innerHTML = /*html*/ `
			<td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${item.name}</td>
			<td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${item.factory_price.toLocaleString(
				"fa",
				"IR"
			)}</td>
			<td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${
				item.sell_price == item.factory_price ? "ویژه رستوران" : item.sell_price.toLocaleString("fa", "IR")
			}</td>
			<td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${item.category}</td>
		`;

		if (tr.dataset.catalogs == dataCatalog) {
			tr.classList.remove("hidden");
			setTimeout(() => {
				tr.classList.add("opacity-100");
			}, 300);
		}

		catalogList?.appendChild(tr);
	});
}
