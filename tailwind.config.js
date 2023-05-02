/** @type {import('tailwindcss').Config} */
module.exports = {
	mode: 'jit',
	content: [
		'./src/pages/**/*.{ts}',
		'./src/**/pages/*.{tsx}',
		'./src/**/components/**/*.{tsx}',
	],
	theme: {
		extend: {
			backgroundColor: {
				'black-80': 'rgba(0,0,0,.8)',
			},
		},
	},
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	plugins: [],
};
