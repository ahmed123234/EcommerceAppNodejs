const sizeController  = require('../controllers/product-size-controller');

const express = require('express');

const router = express.Router();

router.get('/', sizeController.render_sizes_page);
router.get('/new-size', sizeController.render_new_size_page);
router.get('/update-size', sizeController.render_update_size_page);
router.get('/getAll', sizeController.getAllSizes);
router.post('/', sizeController.newSize_post);
router.get('/:sizeId', sizeController.getSizeById);
router.delete('/:sizeId', sizeController.deleteSizeById);
router.put('/:sizeId', sizeController.updateSizeById);

router.use('*', (req, res) => {
    res.status(404).json({ error: '404 Page Not Found!' });
})

module.exports = router;

