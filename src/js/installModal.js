let deferredPrompt;
const installModal = document.querySelector("#installModal");
const installBtn = document.querySelector("#installBtn");
const cancelInstall = document.querySelector("#cancelInstall");

if (installModal) {
	if (navigator.userAgent.toLowerCase().includes("firefox")) {
		console.warn("please run this app on chrome and install pwa for better experience");
	} else {
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			deferredPrompt = e;
		});

		window.addEventListener("load", () => {
			if (localStorage.getItem("pwaInstalled") == "later") {
				installModal.style.display = "none";
			} else {
				installModal.style.display = "flex";
				installModal.classList.add("animate-top-in");
			}

			if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
				installModal.style.display = "none";
				installModal.classList.remove("animate-top-in");
				localStorage.setItem("pwaInstalled", "true");
			}
		});

		installBtn?.addEventListener("click", () => {
			if (deferredPrompt) {
				deferredPrompt.prompt();

				deferredPrompt.userChoice.then((res) => {
					if (res.outcome === "accepted") {
						installModal.style.display = "none";
						localStorage.setItem("pwaInstalled", "true");
					} else {
						installModal.style.display = "flex";
						localStorage.setItem("pwaInstalled", "false");
					}
				});
			}
		});

		cancelInstall?.addEventListener("click", () => {
			installModal.style.display = "none";
			localStorage.setItem("pwaInstalled", "later");
		});
	}
}
