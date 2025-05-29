import { showAlert, colors } from "./showAlert";

import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_APP_SERVICE_ID;
const PUBLIC_KEY = import.meta.env.VITE_APP_PUBLIC_KEY;
const TEMPLATE_ID = import.meta.env.VITE_APP_TEMPLATE_ID;

emailjs.init(PUBLIC_KEY);

const contactForm = document.getElementById("contact-form");
if (contactForm) {
	initFormController();
}

export function initFormController() {
	contactForm.addEventListener("submit", (e) => {
		e.preventDefault();
	});

	const inputs = contactForm.querySelectorAll(".input");
	const button = contactForm.querySelector("#send-msg");

	button.addEventListener("click", () => {
		let validator = true;

		inputs.forEach((input) => {
			if (input.value.trim() === "") {
				validator = false;
			}
		});

		if (!validator) {
			showAlert("مقدار ورودی ها خالی است", colors.error);
			return;
		}

		button.classList.add("sending");

		emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, contactForm).then(() => {
			button.classList.remove("sending");
			inputs.forEach((input) => {
				input.value = "";
			});

			showAlert("پیغام شما با موفقیت ارسال شد", colors.succsess);
		});
	});
}
