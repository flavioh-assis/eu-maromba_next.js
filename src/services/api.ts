import axios from 'axios';

const baseURL = process.env.API_BASE_URL;

const api = axios.create({
	baseURL,
	headers: {
		'Content-Type': 'application/json',
		'Access-Control-Allow-Origin': '*',
	},
});

export default api;
