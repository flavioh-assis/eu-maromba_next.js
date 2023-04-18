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
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic':
					'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
			},
		},
	},
	purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
	plugins: [],
};
