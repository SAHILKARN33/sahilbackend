const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const router = require('./Router/index');

const app = express();

const PORT = process.env.port || 2001;
//const host = 'localhost';
//const dbUrl = 'mongodb://127.0.0.1:27017/zomato_clone'
const serverdbUrl ='mongodb+srv://zomato_clone_user:zomatoclone1234@cluster0.dqvzn.mongodb.net/Zomato?retryWrites=true&w=majority'

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'content-type');
	next();
});

app.use('/', router);

mongoose
	.connect(serverdbUrl, {
		useUnifiedTopology: true,
		useNewUrlParser: true,
	})
	.then((result) => {
		console.log(`mongo db connected`);
		app.listen(PORT, console.log(`Server is running at port ${PORT}`));
	})
	.catch((error) => console.log(error));


