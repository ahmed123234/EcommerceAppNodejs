const subCategoryController = require('../controllers/subCategory-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/add', (req, res) => subCategoryController.addSubCategory(req, res) );
router.post('/addMany', (req, res) => subCategoryController.addMultipleSubCategories(req, res));
router.get('/:categoryId', (req, res) => subCategoryController.getSubCategoryById(req, res));
router.patch('/:categoryId', (req, res) => subCategoryController.updateSubCategory(req, res));
router.delete('/:categoryId', (req, res) => subCategoryController.deleteSubCategory(req, res));
router.delete('/', (req, res) => subCategoryController.deleteAllSubCategories(res));
router.get('/', (req, res) => subCategoryController.getAllSubCategories(res));

router.use((req, res) => {
    console.log(req);
    res.status(404).send("Not Found!");
});


module.exports = router;