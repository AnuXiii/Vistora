// Accordion functionality
export function initAccordion() {
	const accButtons = document.querySelectorAll(".acc-button");

	accButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// Close other accordion items
			accButtons.forEach((otherButton) => {
				if (otherButton !== button) {
					closeAccordionItem(otherButton);
				}
			});

			// Toggle current accordion item
			toggleAccordionItem(button);
		});
	});
}

function closeAccordionItem(button) {
	button.parentNode.classList.remove("bg-gray-100");
	button.classList.remove("ac-active");
	button.lastElementChild.classList.remove("rotate-180");
	button.nextElementSibling.classList.add("hidden");
}

function toggleAccordionItem(button) {
	button.parentNode.classList.toggle("bg-gray-100");
	button.classList.toggle("ac-active");
	button.lastElementChild.classList.toggle("rotate-180");
	button.nextElementSibling.classList.toggle("hidden");
}
