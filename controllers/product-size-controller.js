const { productSizeModel } = require('../models/product-size-model');


const handleError = (err) => {
    const error = {name: ''};
    const message = err._message; 
    console.log(message, err.code);
    
    if (err.code === 11000) {
        error.name = 'That size is allready stored in database';
    }

    return error;
}


// render the sizes page
module.exports.render_sizes_page = (req, res) => {
    res.render('admin/product-size/sizes',
    {
        add : {url: '/sizes/new-size'},
        title: "Product Sizes",
        action: "/sizes"
    });
}


// get All Sizes
module.exports.getAllSizes = async (req, res) => {
    
    try {
        const type = req.query.type;
        let response;
        if (type === undefined ) {
            response = await productSizeModel.find();
        } else  {
            response = await productSizeModel.find({ type }); 
        }

        res.json(response);

    } catch (err) {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}


// get size By Id
module.exports.getSizeById = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;
        const response = await productSizeModel.findById({ _id: sizeId });

        res.json(response);

    } catch (err) {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}

// render new size's page
module.exports.render_new_size_page = (req, res) => {
    res.render('admin/product-size/new-size');
}



// add new size 
module.exports.newSize_post = async (req, res) => {
    try {
        const productSize = req.body;

        console.log("size data: ", productSize);

        const response = await productSizeModel.create(productSize);

        res.status(201).json(response);

    } catch(err) {

        console.error(err.message);

        const error = handleError(err);

        res.status(400).json({ error });
    }
}



// delete specific size
module.exports.deleteSizeById = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;

        const response = await productSizeModel.findByIdAndDelete(sizeId);

        res.json(response);

    } catch(err) {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}


// render update size's page
module.exports.render_update_size_page = (req, res) => {
    res.render('admin/product-size/update-size');
}


// update specific size
module.exports.updateSizeById = async (req, res) => {
    try {
        const sizeId = req.params.sizeId;
        const updatedSize = req.body;

        console.log("updated product size", updatedSize);

        const response = await productSizeModel.findByIdAndUpdate(sizeId, updatedSize);

        res.json(response);

    } catch(err) {

        console.error(err.message);
        const error = handleError(err);

        res.status(400).json({ error });
    }
}







