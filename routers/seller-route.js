const sellerController = require("../controllers/seller-controller");
const express  =require("express");
// const apicache = require('apicache').middleware;

const router = express.Router();
router.get("/seller-product/edit", sellerController.editSellerProduct);
router.get("/requests", sellerController.getSellersByRequestStatus);
router.get("/products", sellerController.getSellerProducts);
router.get("/products/view", sellerController.viewSellersProducts);
router.get("/products/stocks", sellerController.render_seller_product_stocks)
router.get('/products/stocks/logs', sellerController.render_seller_product_stock_logs);
router.get('/add', sellerController.addNewSeller_get);
// router.post('/add', sellerController.cre)
router.get("/seller-settlement", sellerController.render_setelment_get);

router.get('/accepted-sellers', sellerController.viewSellers);
router.get("/seller-requests", sellerController.viewSellerRequests);
router.get("/review-seller", sellerController.reviewSellerRenderPage);
router.get("/new-requests", /*apicache("5 minutes"),*/ sellerController.getSellerRequests);
router.post("/new-request", sellerController.createSellerRequest);
// router.delete("/new-requests/delete", sellerController.cancelAllNewRequests);
router.delete("/", sellerController.cancelAllSellerRequestsByRequestStatus);
router.get("/products/:sellerId", sellerController.getProductsForSeller);

// query about seller
router.get("/seller/:sellerId", sellerController.queryAboutSeller);
router.get("/bank-information/:sellerId", sellerController.getBankInfo);
router.patch("/bank-information/:sellerId", sellerController.putBankInfo);


router.patch("/new-requests/:sellerId", sellerController.updateSellerRequest)
router.get("/new-requests/:sellerId", sellerController.reviewSellerRequest);
router.get("/store/working-hours/:sellerId", sellerController.getWorkingHours);

router.put("/products/new-product/:sellerId", sellerController.putProducts);
router.put("/store/working-hours/:sellerId/:workingHouresId", sellerController.updateWorkingHours);
router.delete("/new-requests/:sellerId", sellerController.deleteSellerRequset);

module.exports = router;

