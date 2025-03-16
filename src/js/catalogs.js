import { products } from "./data";
import { formatPrice } from "./formatPrice";

export function initCatalog() {
	// Get DOM elements for catalog functionality
	const catBoxsContainer = document.querySelector(".cat-box-container");
	const catBoxs = document.querySelectorAll(".cat-box");
	const catalogTableCr = document.querySelector(".catalog-table-cr");
	const closeCatalog = document.getElementById("closeCatalog");
	const catalogList = document.querySelector(".catalog-lists");

	// Store selected catalog data
	let dataCatalog = "";

	// Add click event to each category box
	catBoxs?.forEach((item) => {
		item.addEventListener("click", () => {
			// Remove active state from previously selected category
			if (catBoxsContainer.querySelector(".active")) {
				catBoxsContainer.querySelector(".active").classList.remove("active");
			}

			// Set active state for selected category
			item.classList.add("active");
			catBoxsContainer.classList.add("hidden");
			catalogTableCr.classList.remove("hidden");

			// Store selected catalog data
			dataCatalog = item.dataset.catalog;

			// Show products for selected catalog
			showCatalogs();
		});
	});

	// Close catalog event handler
	closeCatalog?.addEventListener("click", () => {
		// Reset view to category selection
		catBoxsContainer.classList.remove("hidden");
		catalogTableCr.classList.add("hidden");

		// Hide all product rows except header
		catalogList.querySelectorAll("tr:not(:first-child)").forEach((item) => item.classList.add("hidden"));
	});

	// Function to display catalog products
	function showCatalogs() {
		products?.forEach((item, index) => {
			// Create table row for product
			const tr = document.createElement("tr");
			tr.classList.add("hidden", "text-nowrap", "opacity-0", "duration-200");
			tr.setAttribute("data-catalogs", item.category);

			// Set product information in row
			tr.innerHTML = /*html*/ `
                <td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${item.name}</td>
                <td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${formatPrice(
									item.factory_price
								)}</td>
                <td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${
									item.sell_price == item.factory_price ? "ویژه رستوران" : formatPrice(item.sell_price)
								}</td>
                <td class="border border-solid border-black/10 py-4 px-2 text-nowrap">${item.category}</td>
            `;

			// Show row if it matches selected catalog
			if (tr.dataset.catalogs == dataCatalog) {
				tr.classList.remove("hidden");

				// Add fade-in animation with delay based on index
				setTimeout(
					() => {
						tr.classList.add("opacity-100");
					},
					20 + index * 20
				);
			}

			// Add row to catalog list
			catalogList?.appendChild(tr);
		});
	}
}
