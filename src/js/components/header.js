import { links, logo } from "../constants/index";

export class Vheader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
        <div class="header-container">
            <header id="header" class="cr mb-0">
                <div class="flex justify-between items-center">
                    <div class="flex justify-center items-center">
                        <a
                            href="${logo.path}"
                            title="${logo.label}"
                            aria-label="${logo.label}"
                            role="link"
                            class="logo">
                        </a>
                    </div>
                    <div class="flex">
                        <nav role="navigation">
                            <button
                                id="openNav"
                                class="flex justify-center items-center gap-2 text-4xl text-primary md:hidden">
                                <ion-icon name="grid-outline"></ion-icon>
                            </button>
                            <ul
                                id="navigation"
                                class="flex gap-8 items-center"
                                role="list">
                                <button
                                    id="closeNav"
                                    class="flex justify-end items-center gap-2 text-4xl text-primary md:hidden">
                                    <ion-icon name="close-outline"></ion-icon>
                                </button>
                                ${links
																	.map(
																		(link) => `
                                <li role="listitem">
                                    <a
                                        href="${link.path}"
                                        class="link"
                                        title="${link.label}"
                                        aria-label="${link.label}"
                                        role="link"
                                        >${link.label}</a
                                    >
                                </li>
                                    `
																	)
																	.join("")}
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        `;
	}
}

customElements.define("v-header", Vheader);
