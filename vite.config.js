import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	plugins: [tailwindcss()],

	base: "/",

	build: {
		rollupOptions: {
			input: {
				main: "/index.html",
				about: "/pages/about.html",
				catalogs: "/pages/catalogs.html",
				education: "/pages/education.html",
			},
		},
	},
});
