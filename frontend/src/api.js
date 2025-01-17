import axios from "axios";
import { apiUrl } from "./config";
import { getUserInfo } from "./localStorage";

export const getProducts = async ({ searchKeyword = "" }) => {
	try {
		let queryString = "?";
		if (searchKeyword) queryString += `searchKeyword=${searchKeyword}&`;

		const response = await axios({
		url: `${apiUrl}/api/products${queryString}`,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return { error: err.response.data.message || err.message };
	}
};

export const getProduct = async (id) => {
	try {
		const response = await axios({
		url: `${apiUrl}/api/products/${id}`,
		method: "GET",
		headers: {
			"Content-Type": "application/json",
		},
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return { error: err.response.data.message || err.message };
	}
};
export const createProduct = async () => {
	try {
		const { token } = getUserInfo();
		const response = await axios({
		url: `${apiUrl}/api/products`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		});
		return response.data;
	} catch (err) {
		return { error: err.response.data.message || err.message };
	}
};

export const deleteProduct = async (productId) => {
	try {
		const { token } = getUserInfo();
		const response = await axios({
		url: `${apiUrl}/api/products/${productId}`,
		method: "DELETE",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		});
		return response.data;
	} catch (err) {
		return { error: err.response.data.message || err.message };
	}
};

export const updateProduct = async (product) => {
	try {
		const { token } = getUserInfo();
		const response = await axios({
		url: `${apiUrl}/api/products/${product._id}`,
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		data: product,
		});
		return response.data;
	} catch (err) {
		return { error: err.response.data.message || err.message };
	}
};

export const uploadProductImage = async (formData) => {
	try {
		const { token } = getUserInfo();
		const response = await axios({
		url: `${apiUrl}/api/uploads`,
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
			"Content-Type": "multipart/form-data",
		},
		data: formData,
		});
		return response.data;
	} catch (err) {
		return { error: err.response.data.message || err.message };
	}
};

export const signin = async ({ email, password }) => {
	try {
		const response = await axios({
		url: `${apiUrl}/api/users/signin`,
		method: "POST",
		header: {
			"Content-Type": "application/json",
		},
		data: {
			email,
			password,
		},
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return { error: err.response.data.message || err.message };
	}
};

export const register = async ({ name, email, password }) => {
	try {
		const response = await axios({
		url: `${apiUrl}/api/users/register`,
		method: "POST",
		header: {
			"Content-Type": "application/json",
		},
		data: {
			name,
			email,
			password,
		},
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return { error: err.response.data.message || err.message };
	}
};

export const update = async ({ name, email, password }) => {
	try {
		const { _id, token } = getUserInfo();
		const response = await axios({
		url: `${apiUrl}/api/users/${_id}`,
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${token}`,
		},
		data: {
			name,
			email,
			password,
		},
		});
		return response.data;
	} catch (err) {
		console.log(err);
		return { error: err.response.data.message || err.message };
	}
};


