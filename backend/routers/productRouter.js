const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { isAuth, isAdmin } = require('../utils');
const Product = require('../models/productModel');

const productRouter = express.Router();

productRouter.get('/', expressAsyncHandler(async (req, res) => {
	try {
		let products;
		if (req.query.searchKeyword) {
			products = await Product.find({
				name: {
					$regex: req.query.searchKeyword,
					$options: 'i',
				},
			});
		} else {
			products = await Product.find({});
		}
		res.send(products);
	} catch (e) {
		res.status(500).send({ message: 'Error in fetching products' });
		console.log(e);
	}
}));

productRouter.get('/:id', expressAsyncHandler(async (req, res) => {
	try {
		const product = await Product.findById(req.params.id);
		if (product) {
			res.send(product);
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	} catch (e) {
		res.status(500).send({ message: 'Error in fetching product' });
		console.log(e);
	}
}));

productRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
	try {
		const product = new Product({
			name: 'sample product',
			description: 'sample desc',
			category: 'sample category',
			brand: 'sample brand',
			image: '/images/product-1.jpg',
		});

		const createdProduct = await product.save();

		if (createdProduct) {
			res.status(201).send({ message: 'Product Created', product: createdProduct });
		} else {
			res.status(500).send({ message: 'Error in creating product' });
		}
	} catch (e) {
		res.status(500).send({ message: 'Error in creating product' });
		console.log(e);
	}
}));

productRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
	try {
		const productId = req.params.id;
		const product = await Product.findById(productId);
		if (product) {
			product.name = req.body.name;
			product.price = req.body.price;
			product.image = req.body.image;
			product.brand = req.body.brand;
			product.category = req.body.category;
			product.countInStock = req.body.countInStock;
			product.description = req.body.description;
			const updatedProduct = await product.save();
			if (updatedProduct) {
				res.send({ message: 'Product Updated', product: updatedProduct });
			} else {
				res.status(500).send({ message: 'Error in updating product' });
			}
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	} catch (e) {
		res.status(500).send({ message: 'Error in updating product' });
		console.log(e);
	}
}));

productRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async (req, res) => {
	try {
		const product = await Product.findByIdAndDelete(req.params.id);
		if (product) {
			res.send({ message: 'Product Deleted', product: deletedProduct });
		} else {
			res.status(404).send({ message: 'Product Not Found' });
		}
	} catch (error) {
		res.status(500).send({ message: 'Error in deleting product' });
	}
}));

module.exports = productRouter;
