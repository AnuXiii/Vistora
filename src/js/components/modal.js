export function modal(content, type, action) {
	const div = document.createElement("div");
	div.className = "main-modal";
	div.innerHTML = `
        <div class="modal-content">
            <button class="close-modal-btn close-modal flex-center" title="close-modal" aria-label="close-modal">
                <ion-icon name="close-outline"></ion-icon>
            </button>
            <p class="modal-text">
                ${content}
            </p>
            <ul  class="${type === "info" ? "flex" : "hidden"} modal-actions shadow-lg">
                <li>
                    <button class="action-btn btn text-white bg-blue-500">انجام بده</button>
                </li>
                <li>
                    <button class="close-modal-btn btn text-white bg-primary">منصرف شدم</button>
                </li>
            </ul>
        </div>
    `;

	document.body.appendChild(div);
	document.body.classList.add("overflow-hidden");
	div.querySelector(".modal-content").classList.add("fade-in");

	const removeModal = () => {
		document.body.classList.remove("overflow-hidden");
		div.querySelector(".modal-content").classList.remove("fade-in");
		div.remove();
	};

	div.addEventListener("click", (e) => {
		if (!e.target.closest(".modal-content")) {
			removeModal();
		}
	});

	div.querySelectorAll(".close-modal-btn").forEach((btn) => {
		btn.addEventListener("click", removeModal);
	});

	div.querySelector(".action-btn").addEventListener("click", () => {
		action();
		removeModal();
	});
}
