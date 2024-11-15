const { query } = require('express');
const { productModel, ImageModel, OfferModel, DiscountModel, priceModel, quantityModel, sizeModel } = require('../models/product-model');
// const ImageModel = require('../models/descriptiveImage-model');
const { price } = require('../models/product-model');
// const mongoosePaginate = require('mongoose-paginate');
// const mongoosePaginate = require('mongoose-paginate-v2');

// module.exports.queryAboutProduct = async (req, res) => {
//     // const query = req.query;

//     // const response = await productModel.
// }

module.exports.deleteOffer = async (req, res) => {
    try {
        const response = await OfferModel.deleteMany();
        res.status(200).json({ response: response });

    } catch(err) {
        console.error(err.message);
        res.status(400).json({ error: err.message });
    }
}

module.exports.addProduct = async (req, res) => {
    try {
        const product = req.body;
        const images = product.images;

        console.log("product to be saved ", product);


        const product_ = new productModel(product);



        const result = await product_.save();

        console.log("saving product successfully %s", result);

        res.status(201).send(result);

    } catch (err) {
        console.error("error creating product %s", err.message);
        res.status(400).json({ error: err.message });
    }
}


module.exports.addMultipleProducts = async (req, res) => {
    const products = req.body;
    const products_ = [];

    products.forEach(product => {

        const product_ = new productModel(product);
        product_.save().then((result) => {

            console.log(result);

        })
            .catch((err) => {
                console.log(err);
            });
    });

    console.log(products_);
    res.status(201).json({ message: "products are created successfully" });
}

module.exports.getProductById = (req, res) => {
    const productId = req.params.productId;

    productModel.findById(productId).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.deleteProduct = (req, res) => {
    const productId = req.params.productId;

    productModel.findByIdAndDelete(productId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

// format response

const formatResponse = (stockLogs) => {
    const length = stockLogs.length;
    // res = [];

    // for (let i = 0; i < length; i++) {
    
    // }
};


// update specific product preoperty

module.exports.emptyProductStocks = (req, res) => {
    try {
        const productId = req.params.productId;

        productModel.findByIdAndUpdate({
            _id: productId
        }, {
           stockLogs: []
        }).then(async () => {

            const response = await productModel.findById(productId);
            res.json(response);
        })
        
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

// query About Product
module.exports.queryAboutProduct = async (req, res) => {
    try {
        const query_parameter = req.query.query_parameter;
        const productId = req.params.productId;
        console.log(query_parameter);

        let response = await productModel.find({
            _id: productId
        }).select(query_parameter)

        if (query_parameter === 'stockLogs') {
            // formatResponse(response.pop().stockLogs);
            response = response.pop().stockLogs;
        }
        

        // let result = [];
        // let stockLogs = response.stockLogs; 
        // let n = stockLogs.length;
        
        // for (let i = 0; i < n; i++) {
        //     result.push(stockLogs[i]);
        // }
        res.json(response);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}


// add new stock to given prdouct
module.exports.addNewStockForProduct = async (req, res) => {
    try {
        const productId = req.params.productId;
        const { stockLogs } = req.body;

        console.log("sto", stockLogs);

        const doc = await productModel.findById(productId);
        console.log("doc", doc.stockLogs);

        // doc.products =  [{ name: 'Chicken', ref: '6458a3160519f6bcd4fd177e' }]

        // if (doc.products[0].name === "helper") {
        //     doc.products.pop();
        // }

        doc.stockLogs.push(
            {
                $each: stockLogs,
                $position: 0
            }
        )

        console.log("stockType before", doc.stockType);
        console.log("units in stock before", doc.unitsInStock);
        doc.stockType = doc.stockLogs[0].stockType;
        doc.unitsInStock = doc.stockLogs[0].stockUnits;

        console.log("stockType after", doc.stockType);
        console.log("units in stock before", doc.unitsInStock);

        console.log("after", doc.stockLogs);

        productModel.findByIdAndUpdate(productId, {
            stockLogs: doc.stockLogs, 
            stockType: doc.stockType,
            unitsInStock: doc.unitsInStock,
        }).then(async () => {
            const response = await productModel.findById(productId);    
            res.json(response);
        });
    

    } catch(err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports.deleteAllProducts = (req, res) => {
    productModel.deleteMany().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

module.exports.updateProduct = (req, res) => {

    try {
        const productId = req.params.productId;
        const product = req.body;


        console.log("product to be saved ", product);
       

        productModel.findByIdAndUpdate(productId, product).then(async () => {
            // fetch the updated product information
            const updatedProduct = await productModel.findById(productId).exec();

            console.log("producted updated successffully %s", updatedProduct);


            res.send(updatedProduct);

        }).catch(err => {
            console.log(err.message);
            res.status(500).json({ error: err.message });
        });

    } catch (err) {
        console.log(err.message);
    }
}




module.exports.getAllProducts = async (req, res) => {

    try {
        const response = await productModel.find().populate(['category', 'subCategory', 'department']).exec();

            // const products = [];

        // response.forEach(product => {
        //     let category;
        //     if (product.category) {
        //         category = product.category.name;
        //     // const department = product.department.name;
        //         product.category = category;   
        //     }
        //     products.push(product); 
        // });
        console.log(response);
        res.send(response);

    } catch (err) {

        console.log(err);
        res.status(400).json({ error: err.message });

    }
}

module.exports.render_products_page = (req, res) => {
    res.render('admin/product/products',
    {
        add : {url: '/products/new-product'},
        title: "Products",
        action: "/products"
    });
}

module.exports.render_new_product_page = (req, res) => {
    res.render('admin/product/new-product',
    { 
        styles: [{href: '/styles/newcategory.css'}],
        required: true,
        title: "New Product",
        action: "new-product",
        type: "New"
    });
}

module.exports.render_update_product_page = (req, res) => {
    res.render('admin/product/update-product', 
    { 
        styles: [{href: '/styles/newcategory.css'}],
        required: false,
        title: "Update Product",
        action: "update-product",
        type: "Update"
    });
}

// module.exports = {getAllProducts, addProduct, deleteProduct, deleteAllProducts, getProductById, updateProduct, addMultipleProducts};




        // const images_ = new ImageModel(images);
        // const val = await images_.save();
        // const prices = await priceModel.create(product.prices);
        // const quantities = await quantityModel.create(product.quantities);
        // const sizes = await sizeModel.create(product.sizes);

       

        // let offer = undefined;

        // if (product.offer !== undefined) {
        //     const discount = await DiscountModel.create(product.offer.discount);
        //     offer = await OfferModel.create({
        //         offerName: product.offer.offerName,
        //         offerEndDate: product.offer.offerEndDate,
        //         offerStartDate: product.offer.offerStartDate,
        //         discount
        //     });
        // }

        // console.log(val);


        // create discount object and save it in the database

        // const discount = await new DiscountModel(product.offer.discount).save();

        // create offer object and save it in the database

        // const offer = await new OfferModel(
        //     {
        //         name: product.offer.name,
        //         discount: discount,
        //         offerStartDate: product.offer.offerStartDate,
        //         offerEndDate: product.offer.offerEndDate,
        //     }
        // ).save();

        // {
        //     name: product.name,
        //     localName: product.localName,
        //     quantities: quantities,
        //     image: product.image,
        //     // unitsInStock: product.unitsInStock,
        //     // unitsInOrder: product.unitsInOrder,
        //     prices: prices,
        //     description: product.description,
        //     // ranking: product.ranking,
        //     category: product.category,
        //     subCategory: product.subCategory,

        //     // department: product.department,
        //     images: val,
        //     offer: offer,
        //     status: product.status,
        //     vegStatus: product.vegStatus,
        //     sizes,
        //     brand: product.brand,
        // }



        // {

        //     name: product.name,
        //     localName: product.localName,
        //     quantities: quantities,
        //     image: product.image,
        //     // unitsInStock: product.unitsInStock,
        //     // unitsInOrder: product.unitsInOrder,
        //     prices: prices,
        //     description: product.description,
        //     // ranking: product.ranking,
        //     category: product.category,
        //     subCategory: product.subCategory,

        //     // department: product.department,
        //     images: images_,
        //     offer,
        //     status: product.status,
        //     vegStatus: product.vegStatus,
        //     sizes,
        //     brand: product.brand,

        // }



        // update product

         // update product's images
        // const images = product.images;
        // console.log("images", images);
        // const images_ = await ImageModel.findByIdAndUpdate(images[1]._id, {
        //     images: images[0]
        // });

        // const images_ = await ImageModel.create({
        //     images: images
        // });

        // console.log("the updated images is ", images_);

        //update the product price
        // const prices = await priceModel.create(product.prices);

        // product product's quantities
        // const quantities = await quantityModel.create(product.quantities);

        // update product sizes 
        // const sizes = await sizeModel.create(product.sizes);

        // update product discount
        // const offerData = product.offer;

        // console.log("discount", offerData);
        // let offer = undefined;

        // if (offerData !== null || offerData !== undefined) {
        //     const discount = await DiscountModel.findByIdAndUpdate(offerData.discount._id, {
        //         discountPercent: offerData.discount.discountPercent
        //     });

        //     offer = await OfferModel.findByIdAndUpdate(offerData._id, {
        //         offerName: offerData.offerStartDate,
        //         offerEndDate: offerData.offerEndDate,
        //         offerStartDate: offerData.offerStartDate,
        //         discount
        //     });
        // }

        
       

        // const discount = await DiscountModel.create({
        //     discountPercent: offerData.discount.discountPercent
        // });


        // update offer
        // const offer = await OfferModel.findByIdAndUpdate(offerData._id, {
        //     offerName: offerData.offerName,
        //     offerEndDate: offerData.offerEndDate,
        //     offerStartDate: offerData.offerStartDate,
        //     discount
        // });