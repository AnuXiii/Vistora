export class Vheader extends HTMLElement {
	connectedCallback() {
		this.innerHTML = /*html*/ `
            <header id="header" class="cr max-[480px]:mb-8">
                <div class="flex justify-between items-center">
                    <div class="flex justify-center items-center">
                        <a
                            href="/"
                            title="صفحه اصلی"
                            aria-label="صفحه اصلی"
                            role="link"
                            class="logo">
                        </a>
                    </div>
                    <div class="flex">
                        <nav role="navigation">
                            <button
                                id="openNav"
                                class="flex justify-center items-center gap-2 text-4xl text-primary min-[580px]:hidden">
                                <ion-icon name="grid-outline"></ion-icon>
                            </button>
                            <ul
                                id="navigation"
                                class="flex gap-8 items-center"
                                role="list">
                                <button
                                    id="closeNav"
                                    class="justify-end items-center gap-2 text-4xl text-primary hidden max-[580px]:flex">
                                    <ion-icon name="close-outline"></ion-icon>
                                </button>
                                <li role="listitem">
                                    <a
                                        href="/"
                                        class="link"
                                        title="صفحه اصلی"
                                        aria-label="صفحه اصلی"
                                        role="link"
                                        >صفحه اصلی</a
                                    >
                                </li>
                                <li role="listitem">
                                    <a
                                        href="/pages/contact.html"
                                        class="link"
                                        title="ارسال نظر"
                                        aria-label="ارسال نظر"
                                        role="link"
                                        >ارسال نظر</a
                                    >
                                </li>
                                <li role="listitem">
                                    <a
                                        href="/pages/education.html"
                                        class="link"
                                        title="آموزش"
                                        aria-label="آموزش"
                                        role="link"
                                        >آموزش</a
                                    >
                                </li>
                                <li role="listitem">
                                    <a
                                        href="/pages/catalogs.html"
                                        class="link"
                                        title="کاتالوگ"
                                        aria-label="کاتالوگ"
                                        role="link"
                                        >کاتالوگ</a
                                    >
                                </li>
                                <li role="listitem">
                                    <a
                                        href="/pages/about.html"
                                        class="link"
                                        title="درباره"
                                        aria-label="درباره"
                                        role="link"
                                        >درباره ما</a
                                    >
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
            </header>
        `;
	}
}

customElements.define("v-header", Vheader);
