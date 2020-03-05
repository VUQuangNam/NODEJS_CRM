require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('express').Router();

const CusRoutes = require('./src/routes/customer.router');
const EmployeeRoutes = require('./src/routes/employee.router');
const OrderRoutes = require('./src/routes/order.router');
const ProductRoutes = require('./src/routes/product.router');
const AccRoutes = require('./src/routes/account.router');
const UpLoadRouters = require('./src/routes/uploads.router');


const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('uploads'))

app.use(bodyParser.json());

mongoose.connect(process.env.DB_LOCALHOST, { useNewUrlParser: true });

app.use('/',
    AccRoutes,
    CusRoutes,
    EmployeeRoutes,
    OrderRoutes,
    ProductRoutes,
    UpLoadRouters
);

app.listen(port, function () {
    console.log("Chạy RestHub trên cổng " + port);
});

module.exports = router;