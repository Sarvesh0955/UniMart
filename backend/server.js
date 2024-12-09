const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const config = require('./config');
const userRouter = require('./routers/userRouter');
const productRouter = require('./routers/productRouter');
const uploadRouter = require('./routers/uploadRouter');

mongoose.connect(config.MONGODB_URL, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	})
	.then(() => {
		console.log('Connected to mongodb.');
	})
	.catch((error) => {
		console.log(error.reason);
	});

app.use(cors());
app.use(bodyParser.json());
app.use('/api/uploads', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/uploads', express.static(path.join(__dirname, '/../uploads')));
app.use(express.static(path.join(__dirname, '/../frontend')));

app.get('*', (req, res) => {
  	res.sendFile(path.join(__dirname, '/../frontend/index.html'));
});

app.use((err, req, res, next) => {
	const status = err.name && err.name === 'ValidationError' ? 400 : 500;
	res.status(status).send({ message: err.message });
});

app.listen(config.PORT, () => {
  	console.log('serve at http://localhost:5000');
});