const brandController = require('../controllers/brand-controller');

const express = require('express');

const router = express.Router();

router.get("/brand", brandController.queryAboutBrand)
router.get('/', brandController.render_brands_page);
router.get('/new-brand', brandController.render_new_brand_page);
router.get('/update-brand', brandController.render_update_brand_page);
router.get('/getAll', brandController.getAllBrands);
router.post('/', brandController.newBrand_post);
router.get('/:brandId', brandController.getBrandById);
router.delete('/:brandId', brandController.deleteBrandById);
router.put('/:brandId', brandController.updateBrandById);

router.use('*', (req, res) => {
    res.status(404).json({ error: '404 Page Not Found!' });
})

module.exports = router;