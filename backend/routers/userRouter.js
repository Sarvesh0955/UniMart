const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const User = require('../models/userModel');
const { generateToken, isAuth } = require('../utils');

const userRouter = express.Router();

userRouter.post('/signin', expressAsyncHandler(async (req, res) => {
	try {
		const signinUser = await User.findOne({
			email: req.body.email,
			password: req.body.password,
		});
		if (!signinUser) {
			res.status(401).send({ message: 'Invalid Email or Password', });
		} else {
			res.send({
				_id: signinUser._id,
				name: signinUser.name,
				email: signinUser.email,
				isAdmin: signinUser.isAdmin,
				token: generateToken(signinUser),
			});
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}));

userRouter.post('/register', expressAsyncHandler(async (req, res) => {
	try {
		const user = new User({
			name: req.body.name,
			email: req.body.email,
			password: req.body.password,
		});
		const createdUser = await user.save();
		if (!createdUser) {
			res.status(401).send({ message: 'Invalid User Data', });
		} else {
			res.send({
				_id: createdUser._id,
				name: createdUser.name,
				email: createdUser.email,
				isAdmin: createdUser.isAdmin,
				token: generateToken(createdUser),
			});
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}));

userRouter.put('/:id', isAuth, expressAsyncHandler(async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user) {
			res.status(404).send({ message: 'User Not Found',});
		} else {
			user.name = req.body.name || user.name;
			user.email = req.body.email || user.email;
			user.password = req.body.password || user.password;
			const updatedUser = await user.save();
			res.send({
				_id: updatedUser._id,
				name: updatedUser.name,
				email: updatedUser.email,
				isAdmin: updatedUser.isAdmin,
				token: generateToken(updatedUser),
			});
		}
	} catch (error) {
		res.status(500).send({ message: error.message });
	}
}));

module.exports = userRouter;
