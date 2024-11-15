const mongoose = require('mongoose');
const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const { check_Admin_authorities, check_Customer_authorities, checkUser } = require('./middlewares/auth')
const accountRoute = require('./routers/account-route'); 
const userRoute = require('./routers/user-route');
const countryRoute = require('./routers/country-route'); 
const departmentRoute = require('./routers/department-route'); 
const categoryRoute = require('./routers/category-route'); 
const subCategoryRoute = require('./routers/subCategory-route'); 
const productRoute = require('./routers/product-route'); 
const brandRoute = require('./routers/brand-route');
const sizeRoute = require('./routers/product-size-route'); 
const productImages = require('./routers/descriptiveImages-route');

const sellerRouter = require('./routers/seller-route');
const path = require('path');

const dbURI = 'mongodb+srv://root1234:password_1234@ecommercecluster.s0mv1y2.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(dbURI).then((result) => {
    console.log("Connection stablished");

    const server = app.listen(9090, () => {
        const address = server.address();
        console.log("listenong for port %s %s", address.address, address.port);
    });

}).catch((err) => console.log(err));

const app = express();
const URI = ''; 
app.set('view engine', 'ejs');

app.use(morgan('dev'));

app.use(express.static('static'));

app.use('/css', express.static(path.join(__dirname, 'node_modules/mdb-ui-kit/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/mdb-ui-kit/js')));
app.use(express.json());

app.use(cookieParser());

// app.get('/', (req, res) => {
//     res.render('signup');
// });


app.get('/', checkUser, (req, res) => {
    res.render('index');
})


app.use(`/account`, accountRoute);
app.use(`/users`, userRoute);
app.use(`${URI}/country`, countryRoute);
app.use(`${URI}/departments`, departmentRoute);
app.use(`${URI}/categories`, categoryRoute);
app.use(`${URI}/sub-categories`, subCategoryRoute);
app.use(`${URI}/products/images`, productImages);
app.use(`${URI}/products`, productRoute);
app.use(`${URI}/brands`, brandRoute);
app.use(`${URI}/sizes`, sizeRoute);
app.use("/sellers", sellerRouter);

app.get('/dashboard', (req, res) =>{
    res.render('admin/dashboard', {styles: [], title: 'Dashboard'});
});


// handle all notFound resources
app.use((req, res) => {
    res.status(404).send("Not Found!");
    
});
