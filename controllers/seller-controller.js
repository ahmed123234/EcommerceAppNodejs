const SellerModel = require("../models/seller-model");
const { updateUserInfo } = require("../controllers/user-controller")
const { updateInfo } = require("../helpers/user-helper")
const { updateStoreInfo } = require("../helpers/store-helper");
const { updateStoreAddressInfo } = require('../helpers/storeAddress-helper');
const { json } = require("body-parser");

// view seller requests
module.exports.viewSellerRequests = (req, res) => {
    try {
        res.render("admin/seller/seller-requests", {
            add: null,
            title: "Seller Requests",
            action: "/sellers/seller-requests"
        });
    } catch (err) {
        console.error(err.mrssage);
    }
}


// view seller requests
module.exports.editSellerProduct = (req, res) => {
    try {
        res.render("admin/seller/edit-seller-product", {
            type: "Edit",
            title: "Seller Product",
            action: "seller-product/edit",
            styles: [{ href: '/styles/newcategory.css' }],
            // previous: "seller-requests"
        });
    } catch (err) {
        console.error(err.mrssage);
    }
}

// view sellers' prdoucts
module.exports.viewSellersProducts = (req, res) => {
    try {
        res.render("admin/seller/sellers-products",
            {
                add: null,
                required: false,
                title: "Selleres Products",
                action: "/sellers/products"

            });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message })
    }
}


module.exports.render_seller_product_stocks = (req, res) => {
    try {
        res.render("admin/seller/seller-product-stocks",
            {
                add: null,
                // required: false,
                title: "Selleres Products",
                action: "/sellers/products"

            });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message })
    }
}


// view seller requests
module.exports.render_seller_product_stock_logs = (req, res) => {
    try {
        res.render("admin/seller/seller-product-stock-logs", {
            add: null,
            title: "Seller Product Stock Logs",
            action: "/sellers/seller-requests"
        });
    } catch (err) {
        console.error(err.mrssage);
    }
}


// get seller product stockes 
module.exports.sellerProductStocks = async (req, res) => {
    try {

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// view accepted sellers
module.exports.viewSellers = (req, res) => {
    try {
        res.render("admin/seller/sellers",
            {
                add: { url: '/sellers/add' },
                title: "Selleres",
                action: "/sellers/accepted-sellers"

            });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message })
    }
}


// render setelment page 
module.exports.render_setelment_get = (req, res) => {
    try {
        res.render("admin/seller/settlement", {
            add: null,
            title: "Seller Settlement",
            action: "seller-settlement"
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message })
    }
}




// view specific seller request render page
module.exports.reviewSellerRenderPage = (req, res) => {
    try {
        res.render("admin/seller/review-seller", {
            type: "Review",
            action: "review-seller",
            // previous: "seller-requests"
        });
    } catch (err) {
        console.error(err.mrssage);
    }
}

// render add seller page
module.exports.addNewSeller_get = (req, res) => {
    try {
        res.render("admin/seller/add-seller", {
            type: "Add New",
            action: "add",
            previous: "accepted-sellers"
        });
    } catch (err) {
        console.error(err.mrssage);
        res.status(500).json({ error: err.message })
    }
}


// get sellers requests according to the request status

module.exports.getSellersByRequestStatus = async (req, res) => {
    try {
        const requestStatus = req.query.request_status;
        console.log(requestStatus);
        const response = await SellerModel.find({
            requestStatus
        }).populate("user").exec();

        // res.json({ accepted_sellers: response, response_time: Date.now()});
        res.json(response);


    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

// get workingHoures for the seller

module.exports.getWorkingHours = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        const response = await SellerModel.findById(sellerId, 'store.workingHoures').exec();

        // const response = await SellerModel.findById(sellerId, 'store').populate("store", "workingHoures").exec();

        res.json({ response });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}



// update workingHoures for the seller
module.exports.updateWorkingHours = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const workingHouresId = req.params.workingHouresId;

        console.log(workingHouresId);
        const { workingHoures } = req.body;

        console.log("working hours", workingHoures);

        // await SellerModel.findByIdAndUpdate(sellerId, {

        // }).exec();

        const response = await SellerModel.findOneAndUpdate({ _id: sellerId, "store.workingHoures._id": workingHouresId }, {
            $set: {

                "store.workingHoures": workingHoures
            }
        }).populate("store.workingHoures").exec();

        //  await SellerModel.findById(sellerId, 'store').exec();

        res.json({ response });


    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}


// get All new sellers requests 
module.exports.getSellerRequests = async (req, res) => {
    try {

        const response = await SellerModel.find({ status: "Pending" })
            .populate("store", "storeName")
            .populate("user", { select: ["mobile", "usernmae"] })
            .exec();

        console.log("new seller request: ", response);
        res.status(200).json(response);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message })
    }
}

// add products to seller
module.exports.putProducts = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const { products } = req.body;

        // const { name, ref } = products;


        console.log(products);
        // console.log(name, ref);    
        const doc = await SellerModel.findById(sellerId);
        console.log(doc.products);
        // doc.products =  [{ name: 'Chicken', ref: '6458a3160519f6bcd4fd177e' }]

        if (doc.products[0].name === "helper") {
            doc.products.pop();
        }

        doc.products.push({
            $each: products,
            $position: 0
        });
        console.log(doc.products);
        const response = await SellerModel.findByIdAndUpdate(sellerId, {
            products: doc.products
        });
        res.json({ response })
        // const response  = await SellerModel.findOneAndUpdate({ _id: sellerId }, {
        //     $push: {  products: { name: name, ref: ref }}}, {new: true});
        // res.json({ response });


    } catch (err) {

        console.log(err.message);
        res.status(500).json({ error: err.message });

    }
}


// create seller request 
module.exports.createSellerRequest = async (req, res) => {
    try {

        const { user, store, requestDate, requestStatus } = req.body;

        const seller = await SellerModel.create({
            user,
            requestDate,
            requestStatus,
            store,
        });

        console.log("seller created successfully %s", seller);
        res.status(201).json(seller);

    } catch (err) {

        console.log(err.message);
        res.status(400).json({ error: err.message });

    }

}


// get All new sellers requests 
module.exports.getSellerRequests = async (req, res) => {
    try {

        const response = await SellerModel.find({ status: "Pending" });

        console.log("new seller request: ", response);
        res.status(200).json(response);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message })
    }
}

// query about seller

module.exports.queryAboutSeller = async (req, res) => {
    try {
        const query_parameter = req.query.query_parameter;
        const sellerId = req.params.sellerId;
        console.log(query_parameter);

        let response = await SellerModel.findById(sellerId).select(query_parameter)

        if (query_parameter === "user") {
            response.populate("user")
            const data = await userModel.findById(response.user).select("username");
            res.json(data);
            return;
        }

        res.json(response);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}



const { productModel } = require('../models/product-model');
const { userModel } = require("../models/user-model");


// const formatProductInformation = (elem) => {
//     let productsSize = elem.products.length;

//     let user;
//     userModel.findById({ _id: elem.user }).select("username").then(data => {
//         user = data;
//         console.log(user);
//     }).catch(err => console.log(err));

//     console.log(user);

//     const result = []

//     for (let j = 0; j < productsSize; j++) {

//         const product = elem.products[j];

//         let data;
//         productModel.findById({ _id: product.ref }).then(res => {
//             data = res;
//         });

//         result.push(
//             {
//                 seller: user,
//                 storeName: elem.store.storeName,
//                 product: data
//             }
//         );
//     }
//     console.log(result);
//     return result;
// }

// get All sellers/store products 

module.exports.getProductsForSeller = async (req, res) => {
    try {

        const { sellerId } = req.params;
        console.log("sellerId", sellerId);


        const response = await SellerModel.findById(sellerId,
            {
                requestStatus: "Accepted"

            }).select(["products", "store.storeName", "user"]).populate("products");

        // const result = formatProductInformation(response);

        let productsSize = response.products.length;

        const user = await userModel.findById({ _id: response.user }).select("username");

        console.log(user);

        const result = []

        for (let j = 0; j < productsSize; j++) {

            const product = response.products[j];

            const data = await productModel.findById({ _id: product.ref });

            result.push(
                {
                    seller: user.username,
                    storeName: response.store.storeName,
                    product: data
                }
            );
        }
        res.json(result);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }
}


module.exports.getSellerProducts = async (req, res) => {
    try {

        const seller_id = req.query.seller_id;
        console.log(seller_id);

        const response = await SellerModel.find({
                requestStatus: "Accepted"

            }).select(["products", "store.storeName", "user"]).populate("products");
        

        let result = [];
        let n = response.length;

        for (let i = 0; i < n; i++) {

            let elem = response[i];

            let productsSize = elem.products.length;

            const user = await userModel.findById({ _id: elem.user }).select("username");


            for (let j = 0; j < productsSize; j++) {

                const product = elem.products[j];

                const data = await productModel.findById({ _id: product.ref });

                result.push(
                    {
                        seller: user.username,
                        storeName: elem.store.storeName,
                        product: data
                    }
                );
            }
    
            // result.push(formatProductInformation(response[i]));

            // response[i].products = sellerProducts;
            // response[i].user = user;
            // response[i].products = sellerProducts;
        }

        res.json(result);

    } catch (err) {

        res.status(500).json({ error: err.message });

    }
}

// get All new sellers requests 
module.exports.getSellerRequests = async (req, res) => {
    try {

        const response = await SellerModel.find()
            .populate({ path: "user", role: { $eq: "SELLER" } })
            .populate("store", "storName")

            .exec();

        console.log("sellers are: ", response);
        res.status(200).json(response);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message })
    }
}


// add bank information for the seller/store

module.exports.putBankInfo = async (req, res) => {
    try {

        const sellerId = req.params.sellerId;

        const { bankDetails } = req.body;

        console.log("bankDetails", bankDetails);

        // await SellerModel.findOneAndUpdate({
        //     requsetStatus: "Accepted",
        //     _id: sellerId
        // }, {
        //     bankDetails
        // });

        await SellerModel.findByIdAndUpdate(sellerId, {
            bankDetails
        }).where({
            requsetStatus: "Accepted",
        });

        this.getBankInfo(req, res);

    } catch (err) {
        console.error("err", err.message);

        res.status(500).json({ error: err.message });
    }


}


// add bank information for the seller/store
module.exports.getBankInfo = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        const response = await SellerModel.findById(sellerId, "bankDetails");

        res.json({ response });

    } catch (err) {
        console.error("err", err.message);

        res.status(500).json({ error: err.message });
    }

}


// review seller request by Id
module.exports.reviewSellerRequest = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        const response = await SellerModel.findById(sellerId).exec();

        if (response === null) {
            res.status(200).json({ response: "that seller request is not found" })
        }

        console.log("seller is: ", response);
        res.status(200).json({ response: response });

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message })
    }
}




// update new seller request by Admin 
module.exports.updateSellerRequest = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;
        const { store, user, requestDate, requsetStatus } = req.body;

        console.log("seller information is: \n",
            "store:", store,
            "user:", user,
            "request status", requsetStatus
        );

        const { mobile, email, username } = user;

        // update user info 
        console.log("user id", user._id);
        console.log(mobile, email, username);


        const updatedUser = await updateInfo(user._id, { mobile, email, username });

        console.log("updated user: ", updatedUser);


        const response = await SellerModel.findOneAndReplace({ _id: sellerId }, {
            store, user: updatedUser, requestDate, requsetStatus
        }).exec();


        if (response === null) {
            res.status(200).json({ response: "that seller request is not found" })
        }

        console.log("seller are updated successffully: ", response);

        // forward the request to get the updated seller information
        this.reviewSellerRequest(req, res);

    } catch (err) {
        console.error(err);
        res.status(400).json({ error: err.message })
    }
}


module.exports.deleteSellerRequset = async (req, res) => {
    try {
        const sellerId = req.params.sellerId;

        const response = await SellerModel.findByIdAndDelete(sellerId).exec();

        console.log("the deleted seller is: ", response);
        res.status(200).json(response);

    } catch (err) {
        console.error(err.message);
        res.status(400).json({ error: err.message })
    }
}


// cancel all the new seller requests by the admin (delete all new requests)

module.exports.cancelAllSellerRequestsByRequestStatus = async (req, res) => {
    const requsetStatus = req.query.requset_status;
    console.log(requsetStatus);
    try {
        const response = await SellerModel.deleteMany({
            requsetStatus,
        });

        res.status(200).json(response);

    } catch (err) {
        console.log("an error occuerd while deleting the requests", err.message);

        res.status(500).json({ error: err.message });
    }
}






