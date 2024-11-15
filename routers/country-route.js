const countryController = require('../controllers/country-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/add', countryController.addCountry);
router.post('/addAll', countryController.addMultipleCountries);
router.get('/:categoryId', countryController.getCountryById);
router.put('/:categoryId', countryController.updateCountry);
router.delete('/:categoryId', countryController.deleteCountry);
router.get('/', countryController.getAllCountries);

router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;