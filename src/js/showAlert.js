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
