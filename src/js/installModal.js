let deferredPrompt;
const installModal = document.getElementById("installModal");
const installBtn = document.getElementById("installBtn");
const cancelInstall = document.getElementById("cancelInstall");

// check if install modal is exsist do this =>
if (installModal) {
	if (navigator.userAgent.toLowerCase().includes("firefox")) {
		console.warn("please run this app on chrome and install pwa for better experience");
	} else {
		// use web api to show installation pwa modal
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			deferredPrompt = e;
		});

		// add load event to window and check if user where clicked to later or install
		window.addEventListener("load", () => {
			if (localStorage.getItem("pwaInstalled") == "later") {
				installModal.style.display = "none";
			} else {
				installModal.style.display = "flex";
				installModal.classList.add("animate-top-in");
			}

			// check if user running application on pwa or browser
			if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
				installModal.style.display = "none";
				installModal.classList.remove("animate-top-in");
				localStorage.setItem("pwaInstalled", "true");
			}
		});

		installBtn?.addEventListener("click", () => {
			if (deferredPrompt) {
				deferredPrompt.prompt();

				// check user what choise browser install modal options - install or close
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

		window.addEventListener("afterinstallprompt", (e) => {
			console.log(e);
		});
	}
}
