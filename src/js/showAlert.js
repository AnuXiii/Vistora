import Toastify from "toastify-js";
export const showAlert = (msg, type) => {
	Toastify({
		text: msg,
		duration: 2000,
		position: "left",
		style: {
			background: type,
			boxShadow: "none",
		},
	}).showToast();
};

export const colors = {
	error: "#e11d48",
	succses: "oklch(0.627 0.194 149.214)",
};
