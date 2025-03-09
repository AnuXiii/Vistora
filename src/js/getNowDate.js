export const getNowDate = () => {
	return new Date().toLocaleDateString("fa-IR", {
		month: "numeric",
		weekday: "long",
		day: "numeric",
		hour: "2-digit",
		minute: "2-digit",
	});
};

export const dateElement = document.querySelector("#date");
