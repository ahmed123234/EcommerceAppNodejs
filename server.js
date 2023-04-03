const mongoose = require('mongoose');
const express = require('express');
const userRoute = require('./routers/user-route'); 
const countryRoute = require('./routers/country-route'); 
const departmentRoute = require('./routers/department-route'); 
const categoryRoute = require('./routers/category-route'); 
const subCategoryRoute = require('./routers/subCategory-route'); 

const dbURI = 'mongodb+srv://root1234:password_1234@ecommercecluster.s0mv1y2.mongodb.net/ecommerce?retryWrites=true&w=majority'

mongoose.connect(dbURI).then((result) => {
    console.log("Connection stablished");

    const server = app.listen(9090, () => {
        const address = server.address();
        console.log("listenong for port %s %s", address.address, address.port);
    });

}).catch((err) => console.log(err));

const app = express();
const URI = '/api/v1'; 

app.use(`${URI}/account`, userRoute);
app.use(`${URI}/country`, countryRoute);
app.use(`${URI}/departments`, departmentRoute);
app.use(`${URI}/categories`, categoryRoute);
app.use(`${URI}/sub-categories`, subCategoryRoute);

app.use((req, res) => {
    res.status(404).send("Not Found!");
});