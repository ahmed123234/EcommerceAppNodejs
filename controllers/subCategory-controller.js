const subCategoryModel = require('../models/subCategory-model');

module.exports.addSubCategory_get = (req, res) => {

    res.render('admin/subcategory/new-subcategory', 
    { 
        styles: [{href: '/styles/newcategory.css'}],
        title: "new subcategory",
        required: true,
        action: "add",
        type: "New"
    });
}


module.exports.addSubCategory_post = async (req, res) => {

    try {

        const { name, image, category, status, favorite_status, description } = req.body;

        
        const subCategory_ = new subCategoryModel({
            favoriteStatus: favorite_status == 'Yes'? true : false,
            status: status == 'active'? true : false,
            name,
            description,
            image, 
            category
        });

        const result = await subCategory_.save();

        res.status(201).send(result);

    } catch(err) {

        console.log(err.message);

        res.status(400).json({ error: err.message });

    }
}


module.exports.addMultipleSubCategories = async (req, res) => {
    const subCategories = req.body;

    const subCategories_ = [];

    subCategories.forEach( ({ name, image, category, status, favorite_status, description }) => {

        const subCategory_ = new subCategoryModel({
            name, 
            image,
            category,
            status,
            favoriteStatus: favorite_status == 'Yes'? true : false,
            status: status == 'active'? true : false,
            description
        });

        subCategory_.save().then((result) => {
        
            console.log(result);

        })
        .catch((err) => {
            console.log(err);
        });    
    });
    
    console.log( subCategories_);
   res.status(201).json({message: "categories are created successfully"});
}

module.exports.getSubCategoryById = (req, res) => {
    const subCategoryId = req.params.subCategoryId;

    console.log("subcategory is", subCategoryId);

    subCategoryModel.findById(subCategoryId).then((result) => {
        console.log("res is:", result);
        res.send(result);
    }).catch((err) => {
        console.log(err.message);
        res.status(400).json({ error: err.message });
    })
}

module.exports.deleteSubCategory = (req, res) => {
    const subCategoryId = req.params.subCategoryId;

    subCategoryModel.findByIdAndDelete(subCategoryId).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.error(err);

        res.status(400).json({ error: err.message });
    })
}

module.exports.deleteAllSubCategories = (res) => {

    subCategoryModel.deleteMany().then((result) => {
        console.log(result);
        res.send({ response: result });
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: err.message });
    })
}

module.exports.updateCategory_get = (req, res) => {
    res.render('admin/subcategory/update-subcategory',
    { 
        styles: [{href: '/styles/newcategory.css'}],
        title: "update subcategory",
        required: false,
        action: "update-subcategory",
        type: "Update"
    });
}


module.exports.queryAboutSubCategory = async (req, res) => {
    try {
        const query_parameter = req.query.query_parameter;
        const subCategoryId = req.query.subCategoryId;
        console.log(query_parameter);

        const response = await subCategoryModel.find({
            _id: subCategoryId
        }).select(query_parameter)
        res.json(response);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports.updateSubCategory = (req, res) => {
    const subCategoryId = req.params.subCategoryId;
    const { name, description, image, category, status, favoriteStatus } = req.body;

    console.log(name, description, image, category, status, favoriteStatus);

    subCategoryModel.findByIdAndUpdate(subCategoryId, {
        name,
        description,
        image,
        category,
        favoriteStatus : favoriteStatus == 'Yes'? true : false,
        status: status == 'active'? true : false,

    }).then((result) => {

        res.send({ response: result });
    
    }).catch((err) => {

        console.log(err);
        res.status(400).json({ error: err.message });

    })
}


module.exports.getAllSubCategories = async (req, res) => {
   
    try {
        const data = await subCategoryModel.find().populate('category').exec();

        res.send(data);
    
    } catch(err) {
        
        console.log(err.message);
        res.status(400).json({ error: err.message });

    }
    
}


module.exports.render_subCategories = async (req, res) => {

    try {

        res.render('admin/subcategory/subcategories',
        {
            add : {url: '/sub-categories/add'},        
            title: "SubCategories",
            action: "/sub-categories"
        });
    
    }  catch(err) {

        console.log(err.message);
        res.render('404');
    
    }
}

// module.exports = {getAllSubCategories, addSubCategory, deleteSubCategory,
//      getSubCategoryById, updateSubCategory, addMultipleSubCategories, deleteAllSubCategories};
