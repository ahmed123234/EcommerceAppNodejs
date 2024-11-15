const categoryModel = require('../models/category-model');
const fs = require('fs');

module.exports.home = (req, res) => {
    fs.readFile('./views/category/categories.html', {encoding: 'utf8'}, (err, data) => {
        if(err) console.log(err);
        res.setHeader('Content-type', 'text/html');
        res.write(data);
        res.end();
    });
}

module.exports.addCategory_get = (req, res) => {
    res.render('admin/category/new-category',  
    { 
        styles: [{href: '/styles/newcategory.css'}],
        required: true,
        title: "new category",
        action: "add",
        type: "New"
    })
}

module.exports.queryAboutCategory = async (req, res) => {
    try {
        const query_parameter = req.query.query_parameter;
        const categoryId = req.query.categoryId;
        console.log(query_parameter);

        const response = await categoryModel.find({
            _id: categoryId
        }).select(query_parameter)
        res.json(response);
    } catch(err) {
        res.status(500).json({ error: err.message });
    }
}


module.exports.addCategory_post = async (req, res) => {
    const category = req.body;
    // const category_ = new categoryModel(category);

    const category_ = new categoryModel({
        name: category.name,
        nameMalayma: category.name_malayma,
        description: category.description,
        dailyProduct: category.daily_product == 'Yes'? true : false,
        image: category.image,
        favoriteStatus: category.favorite_status == 'Yes'? true : false,
        status: category.status == 'active'? true : false
    });
    const result = await category_.save();

    console.log(result);
    res.status(201).send(result);
    // res.render('../views/category/categories.html');
    // res.redirect('/home');
}


module.exports.addMultipleCategories = async (req, res) => {
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

module.exports.getCategoryById = (req, res) => {
    console.log(req.body);
    const categoryId = req.params.categoryId;

    categoryModel.findById(categoryId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({error: {error: err.message}})
    })
}


// module.exports.deleteCategory_get = (req, res) => {
//     res.render('admin/category/delete_category')
// }

module.exports.deleteCategory_delete = (req, res) => {

    const categoryId = req.params.categoryId;

    console.log(categoryId);

    categoryModel.findByIdAndDelete(categoryId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
        res.status(400).json({ error: { error: err.message } })
    })
}


module.exports.deleteAllCategories = (req, res) => {

    categoryModel.deleteMany().then((result) => {
        console.log(result);
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


module.exports.updateCategory_get = (req, res) => {
    res.render('admin/category/update-category', 
    { 
        styles: [{href: '/styles/newcategory.css'}],
        required: false,
        title: "update category",
        action: "update-category",
        type: "Update"
    });
}

module.exports.updateCategory_patch = (req, res) => {
    const categoryId = req.params.categoryId;
    // const name = req.query.name;

    const { name, nameMalayma, description, image, status, favoriteStatus, dailyProduct } = req.body;

    categoryModel.findByIdAndUpdate(categoryId, {
        name,
        image,
        dailyProduct: dailyProduct == 'Yes'? true : false,
        description,
        nameMalayma,
        favoriteStatus: favoriteStatus == 'Yes'? true : false,
        status: status == 'active'? true: false

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


module.exports.getAllCategories_get = async (req, res) => {

    // const limit = req.params.limit || 10;
    // const skip = req.params.skip || 0;
   
   try {

        const data = await categoryModel.find();
        
        res.send(data);
    } catch(err) {
        res.status(400).json({error: err.message});
    }
}


module.exports.render_categories = (req, res) => {
    res.render('admin/category/categories',
    {
        add : {url: '/categories/add'},
        title: "Categories",
        action: "/categories"
    });
} 


module.exports.getCategoriesCount = async (req, res) => {
    try{
        const count =  await categoryModel.count();
        res.status(200).json(count);
    } catch(err) {
        console.log(err.message);
        res.status(400).json({error: { error: err.message }})
    }

}



// module.exports = {home, addCategory, deleteCategory, getCategoryById, updateCategory, addMultipleCategories, deleteAllCategories};
