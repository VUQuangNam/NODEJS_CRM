require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const router = require('express').Router();
const CusRoutes = require('./system_management/routes/customer.router');
const EmployeeRoutes = require('./system_management/routes/employee.router');
const OrderRoutes = require('./system_management/routes/order.router');
const ProductRoutes = require('./system_management/routes/product.router');
const AccRoutes = require('./system_management/routes/account.router');
const UpLoadRouters = require('./system_management/routes/uploads.router')

const app = express();

const port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('uploads'))

app.use(bodyParser.json());

mongoose.connect(process.env.DB_LOCALHOST, { useNewUrlParser: true });
const db = mongoose.connection;

if (!db)
    console.log("Lỗi kết nối")
else
    console.log("Kết nối DB thành công")

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