const subCategoryModel = require('../models/subCategory-model');

const addSubCategory = async (req, res) => {
    const subCategory = req.body;
    const subCategory_ = new subCategoryModel(subCategory);

   const result = await subCategory_.save();

   res.status(201).send(result);
}


const addMultipleSubCategories = async (req, res) => {
    const subCategories = req.body;
    const subCategories_ = [];

    subCategories.forEach(subCategory => {

        const subCategory_ = new subCategoryModel(subCategory);
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

const getSubCategoryById = (req, res) => {
    const subCategoryId = req.params.categoryId;

    subCategoryModel.findById(subCategoryId).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const deleteSubCategory = (req, res) => {
    const subCategoryId = req.params.categoryId;

    subCategoryModel.findByIdAndDelete(subCategoryId).then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const deleteAllSubCategories = (res) => {

    subCategoryModel.deleteMany().then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const updateSubCategory = (req, res) => {
    const subCategoryId = req.query.categoryId;
    const name = req.query.name;

    subCategoryModel.findByIdAndUpdate(subCategoryId, {
        name: name,

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


const getAllSubCategories = async (res) => {
   
   res.send(await subCategoryModel.find());
}


module.exports = {getAllSubCategories, addSubCategory, deleteSubCategory,
     getSubCategoryById, updateSubCategory, addMultipleSubCategories, deleteAllSubCategories};
