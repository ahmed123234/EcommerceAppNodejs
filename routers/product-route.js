const productController = require('../controllers/product-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());

router.get('/', productController.render_products_page);
router.post('/', productController.addProduct);
router.get('/new-product', productController.render_new_product_page);
router.get('/update-product', productController.render_update_product_page);
router.delete('/', productController.deleteAllProducts);
router.get('/getAll', productController.getAllProducts);
router.post('/addMany', productController.addMultipleProducts);
router.get('/product/:productId', productController.queryAboutProduct)
router.put('/product/:productId', productController.emptyProductStocks)

router.put('/:productId/stocks/new', productController.addNewStockForProduct);
router.get('/:productId', productController.getProductById);
router.put('/:productId', productController.updateProduct);
router.delete('/:productId', productController.deleteProduct);

router.delete("/offers/delete", productController.deleteOffer);
router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;