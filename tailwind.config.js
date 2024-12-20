/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	theme: {
		extend: {
			width: {
				"40": "40rem"
			},
			borderRadius: {
				"circle": "50%"
			}
		},
	},
	plugins: [],
};
