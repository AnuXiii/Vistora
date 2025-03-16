export class Vfooter extends HTMLElement {
	// Custom element lifecycle method - called when element is added to DOM
	connectedCallback() {
		// Set footer content with dynamic year
		this.innerHTML = /*html*/ `
            <footer class="text-center py-4 border-t-2 border-solid border-black/5">
                <small>تمامی حقوق برای وب اپلیکیشن <span class="text-primary font-bold">ویزتورا</span> محفوظ می باشد. &copy; ${new Date().getFullYear()}</small>
            </footer>
        `;
	}
}

// Register custom element
customElements.define("v-footer", Vfooter);
