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
				card: 'rgba(0, 0, 0, 0.08) 0px 6px 16px -8px, rgba(0, 0, 0, 0.05) 0px 9px 28px, rgba(0, 0, 0, 0.03) 0px 12px 48px 16px',
			},
		},
	},
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	plugins: [],
};
