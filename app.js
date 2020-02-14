require('dotenv').config();

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let router = require('express').Router();
let CusRoutes = require('./system_management/routes/customer.router');
let EmployeeRoutes = require('./system_management/routes/employee.router');
let OrderRoutes = require('./system_management/routes/order.router');
let ProductRoutes = require('./system_management/routes/product.router');
let AccRoutes = require('./system_management/routes/account.router');
const UpLoadRouters = require('./system_management/routes/uploads.router')

let app = express();

var port = process.env.PORT;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.static('uploads'))

app.use(bodyParser.json());

mongoose.connect(process.env.DB_LOCALHOST, { useNewUrlParser: true });
var db = mongoose.connection;

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