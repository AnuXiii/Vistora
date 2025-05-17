import { products } from "./data";
import { productCategories } from "./main";
import { formatPrice } from "./formatPrice";
export let productListData = ""; // Stores the currently selected product category

// Function to handle product category menu interactions
export function productsMenuController() {
	productCategories.forEach((item) => {
		// Automatically click the first category if it exists
		productCategories[0] ? productCategories[0].click() : null;

		// Add click event listener to each category
		item.addEventListener("click", () => {
			// Remove the 'active' class from the previously active category
			if (item.parentNode.querySelector(".active")) {
				item.parentNode.querySelector(".active").classList.remove("active");
			}
			// Set the current category and add the 'active' class
			productListData = item.dataset.category;
			item.classList.add("active");

			// Show or hide product lists based on the selected category
			const listCat = document.querySelectorAll("[data-hashtag]");
			listCat.forEach((list) => {
				list.classList.replace("flex", "hidden");
				list.classList.remove("fade-in");

				if (productListData == list.dataset.hashtag) {
					list.classList.replace("hidden", "flex");
					list.classList.add("fade-in");
					document.getElementById("top").scrollIntoView({ behavior: "smooth" });
				}
			});
		});
	});
}

// Function to initialize and append products to the product list container
export function initProducts() {
	products.forEach((item, index) => {
		const li = document.createElement("li");
		li.classList.add(
			"product-item",
			"hidden",
			"flex-col",
			"justify-between",
			"text-white",
			"w-full",
			"bg-black",
			"h-fit"
		);
		li.setAttribute("data-hashtag", `${item.category}`);
		li.innerHTML = /*htm*/ `
							<header class="cursor-pointer py-6 px-4 flex justify-between items-center select-none">
								<span class="text-xs product-name">${item.name}</span>
							<ion-icon name="ellipsis-vertical-outline" class="text-white"></ion-icon>
							</header>
							<div class="p-4 pb-6 product-info flex-col gap-6 hidden">
								<div class="product-img relative rounded-md bg-primary/20 bg-[url(/images/product-bg.webp)] bg-repeat-round bg-contain">
									<img
										loading="lazy"
                                    	src="${item.img}"
										alt="${item.name}"
										class="rounded-md drop-shadow-2xl grayscale-50 w-120 max-w-full mx-auto object-cover" />
									<div class="spinner flex justify-center items-center bg-black/90 absolute inset-0 w-full h-full top-0 right-0">
										<div class="animate-spin w-12 h-12 border-3 border-solid border-primary border-b-transparent rounded-full"></div>
									</div>
								</div>
								<div class="count-action overflow-hidden flex justify-between items-center border border-solid border-white/50 rounded-md">
									<button class="increase p-2 w-12 flex justify-center items-center cursor-pointer bg-primary rounded-tr-md rounded-br-md">
										<ion-icon
											name="add-outline"
											class="text-white text-3xl"></ion-icon>
									</button>
									<input
										type="number"
										placeholder="تعداد"
                                        id="product-${index + 1}"
										class="number-input text-2xl w-full text-center border-none outline-none placeholder:text-base placeholder:opacity-100" />
									<button class="reducer p-2 w-12 flex justify-center items-center cursor-pointer bg-primary rounded-tl-md rounded-bl-md">
										<ion-icon
											name="remove-outline"
											class="text-white text-3xl"></ion-icon>
									</button>
								</div>
								<div class="price flex flex-col gap-4 divide-y-1 divide-solid divide-white/20">
									<div class="text-xs text-white/80 flex justify-between items-center pb-4">
										<span>قیمت کارخانه</span>
										<span data-fac="${item.factory_price}">${formatPrice(item.factory_price)}<small class="text-[6px]"> ریال</small></span>
									</div>
									<div class="text-xs text-white/80 flex justify-between items-center">
										<span>قیمت فروش</span>
										<span data-sell="${item.sell_price}">${formatPrice(item.sell_price)}<small class="text-[6px]"> ریال</small></span>
									</div>
								</div>
							</div>
        `;
		productsList?.appendChild(li);
	});
}

// Function to handle collapsing and expanding product boxes
export const productsList = document.querySelector(".product-lists");
export function productBoxCollapser() {
	const product = document.querySelectorAll("[data-hashtag] header");
	product.forEach((item) => {
		item.addEventListener("click", () => {
			if (productsList.querySelector(".product-info.flex")) {
				productsList.querySelector(".product-info.flex").classList.replace("flex", "hidden");
			}
			item.nextElementSibling.classList.replace("hidden", "flex");
			item.nextElementSibling.querySelector("input").focus();
		});
	});
}

// Event listener for increasing or decreasing product quantity
export function Counter() {
	productsList?.addEventListener("click", (e) => {
		const target = e.target.closest(".increase, .reducer");
		if (!target) return;

		const inputField = target.closest(".count-action").querySelector("input");
		let value = parseInt(inputField.value) || 0;

		if (target.classList.contains("increase")) {
			value++;
		} else if (target.classList.contains("reducer") && value > 0) {
			value--;
		}

		if (target.classList.contains("reducer")) {
			if (value == 0) {
				value = "";
			}
		}

		inputField.value = value;
	});
}

// Event listener to validate number inputs in the product list

export function counterValidator() {
	productsList?.querySelectorAll("input").forEach((item) => {
		if (item.classList.contains("number-input")) {
			item.addEventListener("input", () => {
				if (isNaN(item.value)) {
					item.value = "";
				}
				if (item.value < 0 || item.value == 0) {
					item.value = "";
				}
				if (item.value.length > 5) {
					item.classList.add("text-sm");
				} else {
					item.classList.remove("text-sm");
				}
			});
		}
	});
}
