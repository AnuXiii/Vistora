export class Vfooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
            <footer class="text-center py-4 border-t-2 border-solid border-black/5">
			    <small>تمامی حقوق برای وب اپلیکیشن <span class="text-primary font-bold">ویزتورا</span> محفوظ می باشد. &copy; ${new Date().getFullYear()}</small>
		    </footer>
        `;
	}
}

customElements.define("v-footer", Vfooter);
