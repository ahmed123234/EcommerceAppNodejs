const countryController = require('../controllers/country-controller');
const express = require('express');

const router = express.Router();

router.use(express.json());


router.post('/add', (req, res) => countryController.addCountry(req, res) );
router.post('/addAll', (req, res) => countryController.addMultipleCountries(req, res));
router.get('/:categoryId', (req, res) => countryController.getCountryById(req, res));
router.put('/:categoryId', (req, res) => countryController.updateCountry(req, res));
router.delete('/:categoryId', (req, res) => countryController.deleteCountry(req, res));
router.get('/', (req, res) => countryController.getAllCountries(req, res));

router.use((req, res) => {
    res.status(404).send("Not Found!");
});


module.exports = router;