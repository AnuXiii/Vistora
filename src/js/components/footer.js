export class Vfooter extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
            <footer class="text-center">
			    <small>تمامی حقوق برای وب اپلیکیشن <span class="text-primary">ویزتورا</span> محفوظ می باشد.</small>
		    </footer>
        `;
	}
}

customElements.define("v-footer", Vfooter);
