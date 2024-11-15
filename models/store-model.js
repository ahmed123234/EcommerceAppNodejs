const mongoose = require("mongoose");
const { ObjectId } = require("mongodb");

const { log } = require("console");

const Schema = mongoose.Schema;

// create store address schema
const StoreAddressSchema = new Schema({
    postOffice: String, 
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String, // string of numbers
    district: String,
    latitude: String,
    longitude: String,
    serviceArea: Number, // the area of the store in km
})

const ActiveDaysList = new Schema({
    sat: {
        type: Boolean,
        default: false,
    }, 
    
    sun: {
        type: Boolean,
        default: false,
    },  
    
    mon: {
        type: Boolean,
        default: false,
    },

    tue: {
        type: Boolean,
        default: false,
    },

    wed: {
        type: Boolean,
        default: false,
    },

    thu: {
        type: Boolean,
        default: false,
    },

    fri: {
        type: Boolean,
        default: false,
    }
});


const workingHoures = new Schema({
    openedAt: String,
    closedAt: String,
    activeDays: {
        from: String,
        to: String,
        active_days_list: {
            type: {
                sat: {
                    type: Boolean,
                    default: false,
                }, 
                
                sun: {
                    type: Boolean,
                    default: false,
                },  
                
                mon: {
                    type: Boolean,
                    default: false,
                },
            
                tue: {
                    type: Boolean,
                    default: false,
                },
            
                wed: {
                    type: Boolean,
                    default: false,
                },
            
                thu: {
                    type: Boolean,
                    default: false,
                },
            
                fri: {
                    type: Boolean,
                    default: false,
                }
            }
        }
    }
})


// const StoreAddressModel = mongoose.model("storeAddress", StoreAddressSchema);

const StoreSchema = new Schema({

    storeAddress: StoreAddressSchema,
    category: {
        type: ObjectId,
        ref: "Category"
    },
    storeLicenseNumber: String,
    storeName: String,
    workingHoures: workingHoures,
    // workingHoures: {
    //     openedAt: String,
    //     closedAt: String,
    //     activeDays: {
    //         from: String,
    //         to: String,
    //         active_days_list: {
    //             type: ActiveDaysList
    //         }
    //     }
    // },
    logo: String, 
    packingCharge: Number,
    preparationTime: Number,
    deliverySlots: String,
    spotDeliverySlots: String,
    storeStatus: Boolean // on/ off

});

StoreSchema.pre('save', function (next) {

    log("store to be saved is", this)

    if ( new Date(this.workingHoures.openedAt) instanceof Date && new Date(this.workingHoures.closedAt) instanceof Date) {
        this.workingHoures.openedAt = new Date(this.workingHoures.openedAt).toLocaleTimeString('it-IT');
        this.workingHoures.closedAt = new Date(this.workingHoures.closedAt).toLocaleTimeString('it-IT');
    
    }

    const { active_days_list, from, to } = this.workingHoures.activeDays;

    const days = ["sat", "sun", "mon", "tue", "wed", "thu", "fri"];

    const start = days.indexOf(from.toLowerCase().substring(0, 3));
    const end = days.indexOf(to.toLowerCase().substring(0, 3));
    console.log(active_days_list["sat"])

    for (let i = start; i < end + 1; i++) {
        active_days_list[days[i]] = true;
        // this.workingHoures.activeDays.active_days_list[] = true;
    }
    log("store to be after changes saved is", this)

    next();
});


// const StoreModel = mongoose.model("Store", StoreSchema);


// module.exports = {StoreSchema, StoreModel, StoreAddressModel};
module.exports = { StoreSchema };