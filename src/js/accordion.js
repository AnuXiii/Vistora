// Accordion functionality module
export function initAccordion() {
	// Get all accordion buttons
	const accButtons = document.querySelectorAll(".acc-button");

	// Add click event to each button
	accButtons.forEach((button) => {
		button.addEventListener("click", () => {
			// Close other open accordion items
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

// Function to close accordion item
function closeAccordionItem(button) {
	button.parentNode.classList.remove("bg-gray-100");
	button.classList.remove("ac-active");
	button.lastElementChild.classList.remove("rotate-180");
	button.nextElementSibling.classList.add("hidden");
}

// Function to toggle accordion item
function toggleAccordionItem(button) {
	button.parentNode.classList.toggle("bg-gray-100");
	button.classList.toggle("ac-active");
	button.lastElementChild.classList.toggle("rotate-180");
	button.nextElementSibling.classList.toggle("hidden");
}
