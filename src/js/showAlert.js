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
	succsess: "#00a63e",
};
