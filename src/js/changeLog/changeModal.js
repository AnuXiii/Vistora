const changeLogData = [
	{
		title: "اضافه شدن محصولات جدید",
		date: "1404/02/01",
	},
	{
		title: "اضافه شدن قابلیت ویرایش فاکتور",
		date: "1404/02/27",
	},
];

const changeLogsList = document.querySelector(".change-logs");

if (changeLogsList) {
	changeLogsList.innerHTML = changeLogData
		.map(
			(item) => `
		<li class="flex gap-4 items-center text-gray-200/80 pb-8 p-4">
			<i class="block w-5 h-5 rounded-full bg-conic bg-primary from-primary to-blue-500"></i>
			<p class="flex-1/2">${item.title}</p>
			<span class="text-sm text-gray-200/60">${item.date}</span>
		</li>
	`
		)
		.join("");
}

const changesModal = document.getElementById("changes-modal");
const closeChanges = document.getElementById("close-changes");

export function changeModalLoader() {
	let setClosed = localStorage.getItem("modal-closed-2", false);

	window.addEventListener("load", () => {
		if (!setClosed) {
			changesModal?.classList.replace("hidden", "flex");
		} else {
			changesModal?.classList.replace("flex", "hidden");
		}
	});

	closeChanges?.addEventListener("click", () => {
		localStorage.setItem("modal-closed-2", true);
		changesModal.classList.replace("flex", "hidden");
	});
}
