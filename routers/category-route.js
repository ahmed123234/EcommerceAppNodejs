const categoryController = require('../controllers/category-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/add', (req, res) => categoryController.addCategory(req, res) );
router.post('/addMany', (req, res) => categoryController.addMultipleCategories(req, res));
router.get('/:categoryId', (req, res) => categoryController.getCategoryById(req, res));
router.patch('/:categoryId', (req, res) => categoryController.updateCategory(req, res));
router.delete('/:categoryId', (req, res) => categoryController.deleteCategory(req, res));
router.get('/', (req, res) => categoryController.getAllCategories(req, res));

router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;