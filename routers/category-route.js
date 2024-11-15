const categoryController = require('../controllers/category-controller');
const express = require('express');

const router = express.Router();

// router.use(express.json());
// router.use(express.urlencoded());
// render html pages

// router.get('/add-category', (req, res) => {
//     res.render('../views/category/newCategory.htm');
// })


router.get('/', categoryController.render_categories);
router.get('/getAll', categoryController.getAllCategories_get);

// query about category
router.get('/category', categoryController.queryAboutCategory);

router.get('/add', categoryController.addCategory_get);
router.post('/add', categoryController.addCategory_post);
router.get('/home', categoryController.home)
router.post('/addMany', categoryController.addMultipleCategories);

router.get('/update-category', categoryController.updateCategory_get);
// router.get('/deleteCategory', categoryController.deleteCategory_get);

router.delete('/delete', categoryController.deleteAllCategories);

router.get('/count', categoryController.getCategoriesCount);

router.patch('/:categoryId', categoryController.updateCategory_patch);
router.get('/:categoryId', categoryController.getCategoryById);
router.delete('/:categoryId', categoryController.deleteCategory_delete);
// router.delete('/:categoryId', categoryController.deleteCategory);


router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;