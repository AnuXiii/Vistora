const changesModal = document.getElementById("changes-modal");
const closeChanges = document.getElementById("close-changes");

export function changeModalLoader() {
	let setClosed = localStorage.getItem("closed", false);

	window.addEventListener("load", () => {
		if (setClosed) {
			changesModal.classList.add("hidden");
		} else {
			changesModal.classList.remove("hidden");
		}
	});

	closeChanges.addEventListener("click", () => {
		if (!setClosed) {
			localStorage.setItem("closed", true);
			changesModal.classList.add("hidden");
		}
	});
}
