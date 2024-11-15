const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");
const { StoreSchema } = require("./store-model")
const { ProductSchema } = require("./product-model")

const Schema = mongoose.Schema;

const BankDetails = new Schema({
    account_number: String,
    bank_name: String,
    IFSC: String,
    branch_name: String,
    account_holder: String,
    UPI_ID: String
});


const Products = new Schema({
    name: String,
    ref: {
        type: ObjectId,
        ref: "product",
    }
});

const SellerSchema = new Schema({
    user: {
        type: ObjectId,
        ref: "User",
        unique: true,
    },
    products: {
        type: [ Products ],
        default: [{ref: new ObjectId(10), name: "helper"}],
        _id: false
    },
    // storeName:String,
    store: StoreSchema,
    bankDetails: BankDetails,
    requestDate: Date, 
    requestStatus: String //pending, accepted, rejected,
});


SellerSchema.pre("save", function () {
   console.log(this.products);

//    if(this.products[0].name === "helper") 

})

// SellerSchema.post("findOne", function () {
//     console.log(this.products);
 
//     if(this.products[0].name === "helper") {
//         this.products.pop();
//     } 

//     console.log("after", this.products);
 
//  })

const SellerModel = mongoose.model("Seller", SellerSchema);


module.exports = SellerModel;