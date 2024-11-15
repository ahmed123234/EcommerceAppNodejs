const { brandModel } = require('../models/brand-model');

// render the brands page
module.exports.render_brands_page = (req, res) => {
    res.render('admin/brand/brands',
    {
        add : {url: '/brands/new-brand'},
        title: "Brands",
        action: "/brands"
    });
}


// getAllBrands
module.exports.getAllBrands = async (req, res) => {
    try {

        const response = await brandModel.find();
        res.json(response);

    } catch {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}


// getBrandById
module.exports.getBrandById = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const response = await brandModel.findById({ _id: brandId });

        res.json(response);

    } catch {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}

// render new brand's page
module.exports.render_new_brand_page = (req, res) => {
    res.render('admin/brand/new-brand', 
    { 
        styles: [{href: '/styles/newcategory.css'}],
        title: "New Brand",
        required: true,
        action: "new-brand",
        type: "New"
    });
}



// add new brand 
module.exports.newBrand_post = async (req, res) => {
    try {
        const brand = req.body;

        console.log("brand data: ", brand);

        const response = await brandModel.create(brand);

        res.status(201).json(response);

    } catch {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}



// delete specific brand
module.exports.deleteBrandById = async (req, res) => {
    try {
        const brandId = req.params.brandId;

        const response = await brandModel.findByIdAndDelete(brandId);

        res.json(response);

    } catch {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}


// render update brand's page
module.exports.render_update_brand_page = (req, res) => {
    res.render('admin/brand/update-brand', 
    { 
        styles: [{href: '/styles/newcategory.css'}],
        required: false,
        title: "Update Brand",
        action: "update-brand",
        type: "Update"
    });
}

module.exports.queryAboutBrand = async (req, res) => {
    try {
        const query_parameter = req.query.query_parameter;
        const brandId = req.query.brandId;
        console.log(query_parameter);

        const response = await brandModel.find({
            _id: brandId
        }).select(query_parameter)
        res.json(response);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}


// update specific brand
module.exports.updateBrandById = async (req, res) => {
    try {
        const brandId = req.params.brandId;
        const updatedBrand = req.body;

        console.log("updated brand", updatedBrand);

        const response = await brandModel.findByIdAndUpdate(brandId, updatedBrand);

        res.json(response);

    } catch {

        console.error(err.message);

        res.status(400).json({ error: err.message });
    }
}




