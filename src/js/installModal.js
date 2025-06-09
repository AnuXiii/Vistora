// Store PWA installation state
let deferredPrompt;

const installBtn = document.getElementById("installBtn");
installBtn?.addEventListener("click", installPWA);

// Check Firefox browser and show warning
if (navigator.userAgent.toLowerCase().includes("firefox")) {
	console.warn("please run this app on chrome and install pwa for better experience");
} else {
	// Capture PWA install event before showing
	window.addEventListener("beforeinstallprompt", (e) => {
		e.preventDefault();
		deferredPrompt = e;
	});
}

function installPWA() {
	if (deferredPrompt) {
		// Show browser's install prompt
		deferredPrompt.prompt();

		// Handle user's choice (install or cancel)
		deferredPrompt.userChoice.then((res) => {
			if (res.outcome === "accepted") {
				// If installation accepted
				localStorage.setItem("pwaInstalled", "true");
			} else {
				// If installation rejected
				localStorage.setItem("pwaInstalled", "false");
			}
		});
	}
}

export default installPWA;
