const countryModel = require('../models/country-model');

addCountry = async (req, res) => {
    const countryInfo = req.body;
    const country = new countryModel({
        name: countryInfo.name
    });

   const result = await country.save();

   res.send(result);
}


addMultipleCountries = async (req, res) => {
    const countries = req.body;
    const countries_ = [];

    countries.forEach(country => {

        const country_ = new countryModel(country);
        country_.save().then((result) => {
        
            console.log(result);

        })
        .catch((err) => {
            console.log(err);
        });    
    });
    
    console.log( countries_);
   res.json(countries_);
}

getCountryById = (req, res) => {
    const countryId = req.params.countryId;

    countryModel.findById(countryId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

deleteCountry = (req, res) => {
    const countryId = req.params.countryId;

    countryModel.findByIdAndDelete(countryId).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}

updateCountry = (req, res) => {
    const countryId = req.params.userId;
    const country_name = req.body;

    countryModel.findByIdAndUpdate(countryId, {
        name: country_name.name,

    }).then((result) => {
        res.send(result);
    }).catch((err) => {
        console.log(err);
    })
}


getAllCountries = async (req, res) => {
   
   res.send(await countryModel.find());
}


module.exports = {getAllCountries, addCountry, deleteCountry, getCountryById, updateCountry, addMultipleCountries};
