// Store PWA installation state
let deferredPrompt;

// Get required DOM elements
const installModal = document.getElementById("installModal");
const installBtn = document.getElementById("installBtn");
const cancelInstall = document.getElementById("cancelInstall");

// Check if install modal exists
if (installModal) {
	// Check Firefox browser and show warning
	if (navigator.userAgent.toLowerCase().includes("firefox")) {
		console.warn("please run this app on chrome and install pwa for better experience");
	} else {
		// Capture PWA install event before showing
		window.addEventListener("beforeinstallprompt", (e) => {
			e.preventDefault();
			deferredPrompt = e;
		});

		// Check installation status on page load
		window.addEventListener("load", () => {
			// Check if user clicked "Later" button
			if (localStorage.getItem("pwaInstalled") == "later") {
				installModal.style.display = "none";
			} else {
				// Show modal with animation
				installModal.style.display = "flex";
				installModal.classList.add("animate-top-in");
			}

			// Check if app is running in PWA mode
			if (window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true) {
				installModal.style.display = "none";
				installModal.classList.remove("animate-top-in");
				localStorage.setItem("pwaInstalled", "true");
			}
		});

		// Install button click event
		installBtn?.addEventListener("click", () => {
			if (deferredPrompt) {
				// Show browser's install prompt
				deferredPrompt.prompt();

				// Handle user's choice (install or cancel)
				deferredPrompt.userChoice.then((res) => {
					if (res.outcome === "accepted") {
						// If installation accepted
						installModal.style.display = "none";
						localStorage.setItem("pwaInstalled", "true");
					} else {
						// If installation rejected
						installModal.style.display = "flex";
						localStorage.setItem("pwaInstalled", "false");
					}
				});
			}
		});

		// Cancel button click event
		cancelInstall?.addEventListener("click", () => {
			installModal.style.display = "none";
			localStorage.setItem("pwaInstalled", "later");
		});
	}
}
