const categoryModel = require('../models/category-model');

const addCategory = async (req, res) => {
    const category = req.body;
    const category_ = new categoryModel(category);

   const result = await category_.save();

   res.status(201).send(result);
}


const addMultipleCategories = async (req, res) => {
    const categories = req.body;
    const categories_ = [];

    categories.forEach(category => {

        const department_ = new categoryModel(category);
        department_.save().then((result) => {
        
            console.log(result);

        })
        .catch((err) => {
            console.log(err);
        });    
    });
    
    console.log( categories_);
   res.status(201).json({message: "categories are created successfully"});
}

const getCategoryById = (req, res) => {
    const categoryId = req.params.categoryId;

    categoryModel.findById(categoryId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const deleteCategory = (req, res) => {
    const categoryId = req.params.categorytId;

    categoryModel.findByIdAndDelete(categoryId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

const updateCategory = (req, res) => {
    const categoryId = req.query.departmentId;
    const name = req.query.name;

    categoryModel.findByIdAndUpdate(categoryId, {
        name: name,

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


const getAllCategories = async (req, res) => {
   
   res.send(await categoryModel.find());
}


module.exports = {getAllCategories, addCategory, deleteCategory, getCategoryById, updateCategory, addMultipleCategories};
