const {ImageModel} = require('../models/product-model');

addProduct = async (req, res) => {
    const product = req.body;
    const images = product.images;

    const images_ = new ImageModel(images);

    const val = await images_.save();
   
    console.log(val);

    const product_ = new productModel({
        productName: product.productName,
        quantity: product.quantity,
        image: product.image,
        unitsInStock: product.unitsInStock,
        unitsInOrder: product.unitsInOrder,
        price: product.price,
        description: product.description,
        ranking: product.ranking,
        category: product.category,
        subCategory: product.subCategory,
        department: product.department,
        images: val
    });



   const result = await product_.save();

   res.status(201).send(result);
}

getProductImagesById = (req, res) => {
    const productId = req.params.productId;

    productModel.findById(productId).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

deleteProduct = (req, res) => {
    const productId = req.params.productId;

    productModel.findByIdAndDelete(productId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


deleteAllProductImages = (res) => {
    ImageModel.deleteMany().then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

updateProduct = (req, res) => {
    const productId = req.query.productId;
    const contactInfo = req.query.contactInfo;

    productModel.findByIdAndUpdate(productId, {
        contactEmail: contactInfo,

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


getAllProducts = async (req, res) => {
   
   res.send(await productModel.find());
}


module.exports = {deleteAllProductImages};
