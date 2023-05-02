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
			boxShadow: {
				card: '20px 20px 60px #d0d0d2, -20px -20px 60px #ffffff',
			},
		},
	},
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	plugins: [],
};
