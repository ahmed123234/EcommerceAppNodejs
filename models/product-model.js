const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');

// const mongoosePaginate = require('mongoose-paginate');
// const mongoosePaginate = require('mongoose-paginate-v2');
// const {ImageSchema} = require('./descriptiveImage-model')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    // frontPicture : String,
    // backPicture: String,
    // rightSidePicture: String,
    // leftSidePicture: String
    images: [String]
});


// create discount schema

const discountSchema = new Schema({
    discountPercent: Number
});

// const DiscountModel = mongoose.model('Discount', discountSchema);


// create offer schema 
const offerSchema = new Schema({
    offerName: String,
    offerStartDate: Schema.Types.Date,
    offerEndDate: Schema.Types.Date,
    discount: discountSchema
});

const quantitySchema = new Schema({
    quantityType: String,
    quantity: Number,
});

// const quantityModel = mongoose.model('Quantity', quantitySchema);

const priceSchema = new Schema({
    priceType: String,
    price: Number,
});

// const priceModel = mongoose.model('Price', priceSchema);

const sizeSchema = new Schema({
    sizeType: String,
    size: {
        type: ObjectId,
        ref: 'ProductSize'
    }
});

const StockSchema = new Schema({
    stockDate: Date,
    stockType: String,
    stockUnits: Number,
    remark: String,
});

// const sizeModel = mongoose.model('Size', sizeSchema);

// const OfferModel = mongoose.model('Offer', offerSchema);


// const ImageModel = mongoose.model('Descriptive_Image', ImageSchema);


const ProductSchema = new Schema({
    name: String,
    localName: String,
    // quantity: Schema.Types.Number,
    quantities: [quantitySchema],
    image: String,
    unitsInStock: Number, //number od units of the product in the stock or out of stock of 0 units of current stock 
    unitsInOrder: Number, // number of units of the product in each order 
    // price: Number,
    prices: [priceSchema],
    description: String,
    ranking: Number, // rank of the product 
    sizes: [sizeSchema],
    category: {
        type: ObjectId,
        ref: 'Category'
    },
    subCategory: {
        type: ObjectId,
        ref: 'SubCategory'
    },
    brand: {
        type: ObjectId,
        ref: 'brand'
    },
    department: {
        type: ObjectId,
        ref: 'Department'
    },
    // embeded document (denormalization)
    images: ImageSchema,
    offer: {
      type: offerSchema,
      default: undefined
    },
    // seller: {
    //     type: String, 
    //     default: "Admin"
    // }, // name of the seller
    // seller: [{ type: ObjectId, res: "Seller" }],
    vegStatus: Schema.Types.String,
    status: Boolean, 
    stockType: String, // Multi Stock(related to size) or single stock type of the cuurent stock
    
    stockLogs: {
        type: [StockSchema],
        _id: false,
    } // history of all stocks
});


// const formatStockDate = date =>
//     new Date(date).toISOString();

// ProductSchema.pre('findOneAndUpdate', function(next) {
//     console.log("data to be saved ", this);
//     // this.stockLogs.stockDate = formatStockDate(this.stockLogs.stockDate); 
//     console.log("data to be saved ", this.stockLogs[0].stockDate);
//     this.stockLogs[0].stockDate = this.stockLogs[0].stockDate.toLocaleDateString();
//     next();   
// })


// ProductSchema.pre('save', function(next) {
//     console.log("data to be saved ", this.stockLogs[0].stockDate);
//     this.stockLogs[0].stockDate = this.stockLogs[0].stockDate.toLocaleDateString(); 

//     next();
// });




// ProductSchema.plugin(mongoosePaginate);

const productModel = mongoose.model('Product', ProductSchema);

module.exports = { productModel, ProductSchema, StockSchema };

