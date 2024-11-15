// const { StoreAddressModel } = require("../models/store-model");

// module.exports.updateStoreAddressInfo = async (storeAddressId, storeAddress) => {
//     try {
//         const res = await StoreAddressModel.findByIdAndUpdate( storeAddressId, {
//             addressLine1: storeAddress.addressLine1,
//             addressLine2: storeAddress.addressLine2,
//             city: storeAddress.city,
//             state: storeAddress.state,
//             pincode: storeAddress.pincode,
//             district: storeAddress.district,
//             latitude: storeAddress.latitude,
//             longitude: storeAddress.longitude,
//             serviceArea: storeAddress.serviceArea
//         });
//         console.log(res)
//         return res;

//     } catch (err) {
//         console.log(err);
//     }

// }