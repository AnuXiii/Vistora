let deferredPrompt;
const installModal = document.querySelector("#installModal");
const installBtn = document.querySelector("#installBtn");
const cancelInstall = document.querySelector("#cancelInstall");

window.addEventListener("beforeinstallprompt", (event) => {
	event.preventDefault();
	deferredPrompt = event;
});

installBtn?.addEventListener("click", () => {
	if (deferredPrompt) {
		deferredPrompt.prompt();
		localStorage.setItem("pwaInstalled", "false");
		installModal.style.display = "none";
	}
});

cancelInstall?.addEventListener("click", () => {
	localStorage.setItem("pwaInstalled", "false");
	installModal.style.display = "none";
});

window.addEventListener("load", () => {
	if (installModal) {
		if (localStorage.getItem("pwaInstalled") == "false") {
			installModal.style.display = "none";
		} else {
			installModal.style.display = "flex";
			installModal.classList.add("animate-top-in");
		}
	}
});
