const subCategoryController = require('../controllers/subCategory-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', subCategoryController.render_subCategories);
router.get('/getAll', subCategoryController.getAllSubCategories);

router.get('/sub-category', subCategoryController.queryAboutSubCategory);

router.get('/add', subCategoryController.addSubCategory_get);
router.post('/', subCategoryController.addSubCategory_post);
router.post('/addMany', subCategoryController.addMultipleSubCategories);

router.get('/update-subcategory', subCategoryController.updateCategory_get);
router.get('/:subCategoryId', subCategoryController.getSubCategoryById);
router.patch('/:subCategoryId', subCategoryController.updateSubCategory);
router.delete('/:subCategoryId', subCategoryController.deleteSubCategory);

router.delete('/', subCategoryController.deleteAllSubCategories);

router.use((req, res) => {
    console.log(req);
    res.status(404).send("Not Found!");
});


module.exports = router;