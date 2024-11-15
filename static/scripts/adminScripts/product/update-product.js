// $(document).ready(async () => {
// import { addOfferEvent, addSizeOption } from "./product";
let form = document.querySelector('form');
let currentImage = $('#img');
let subImages = $('.image-list')


// console.log(sessionStorage.getItem('productId'));


// const product = await res.json();

// console.log("product values are:", product);

const displayProductLogo = (logo) => {

    let src = "/images/" + logo;
    currentImage.attr("src", src);
    console.log("image is: ", currentImage.src);

}

const displayProductLocalName = localName =>
    form.local_name.value = localName;

const getProductStockType = stockType => 
    form.stock_type.value = stockType;

const getProductUnitsInStock = unitsInStock => 
    form.units_in_stock.value = unitsInStock;


const displayProductName = name =>
    form.name.value = name;

const getProductDescription = description =>
    form.description.value = description;

const getProductBrand = brand =>
    form.brand.value = brand;

const getProductCategory = category =>
    form.category.value = category;

const getProductSubCategory = subCategory =>
    form.subCategory.value = subCategory;


const getProductStatus = status =>
    form.status.value = status === true ? "active" : "inActive";

const getProductVegStatus = vegStatus =>
    form.veg_status.value = vegStatus;


const getProductSize = (sizes) => {
    let n = sizes.length;

    let sizeElements = document.getElementsByClassName("size-field");

    if (n === 1) {
        // set single size field
        $("#singleSize").attr("required");
        $("#singleSize").val(`${sizes[0].size}`);

    } else {
        form.size_type.value = "1";
        changeSizeType();
        configSizeChange();
        multiSizeToggle()

        for (let iteratorIndex = 0; iteratorIndex < 3; iteratorIndex++) {
            sizeElements.item(iteratorIndex).value = sizes[iteratorIndex].size;
        }

        if (sizes.length > 3) {
            for (let iteratorIndex = 3; iteratorIndex < n; iteratorIndex++) {
                setMutipleSizeOptions(sizes[iteratorIndex]);
            }
        }

    }

}


const getProductPrice = (prices) => {
    let n = prices.length;
    let priceElements = document.getElementsByClassName("price-field");


    if (n === 1) {
        // set single price field
        $("#singlePrice").attr("required");
        $("#singlePrice").val(`${prices[0].price}`);


    } else {


        for (let iteratorIndex = 0; iteratorIndex < 3; iteratorIndex++) {
            priceElements.item(iteratorIndex).value = prices[iteratorIndex].price;
        }

        if (sizes.length > 3) {
            for (let iteratorIndex = 3; iteratorIndex < n; iteratorIndex++) {
                setMutiplePriceOptions(prices[iteratorIndex]);
            }
        }

    }

}

const getProductQuantity = (quantities) => {

    let quantityElements = document.getElementsByClassName("quantity-field");


    let n = quantities.length;

    if (n === 1) {

        // set single quantity field
        $("#singleQuantity").attr("required");
        $("#singleQuantity").val(`${quantities[0].quantity}`);


    } else {

        for (let iteratorIndex = 0; iteratorIndex < 3; iteratorIndex++) {
            quantityElements.item(iteratorIndex).value = quantities[iteratorIndex].quantity;
        }

        if (sizes.length > 3) {
            for (let iteratorIndex = 3; iteratorIndex < n; iteratorIndex++) {
                setMutipleQuantityOptions(quantities[iteratorIndex]);
            }
        }

    }

}


function displayProductInfo(product) {

    displayProductLogo(product.image);
    displayProductSubImages(product.images.images);

    displayProductName(product.name);
    displayProductLocalName(product.localName);
    getProductDescription(product.description)


    // wait 2s before set
    setTimeout(() => {
        getProductCategory(product.category);
        getProductSubCategory(product.subCategory);
        getProductBrand(product.brand);

        // form.department.value,
    }, 2000);

    getProductVegStatus(product.vegStatus);
    getProductStatus(product.status);


    // set the price/s field

    // if (prices.length === 1) {

    // } else {
    //     let iteratorIndex = 0;
    //     $.each($(".price-field"), function () {
    //         const $this = $(this);
    //         $this.attr("required");
    //         $this.val(`${prices[iteratorIndex++].price}`);
    //     })
    // }


    // if (quantities.length === 1) {

    // } else {
    //     let iteratorIndex = 0;
    //     $.each($(".quantity-field"), function () {
    //         const $this = $(this);
    //         $this.attr("required");
    //         $this.val(`${quantities[iteratorIndex++].quantity}`);
    //     })
    // }

    // getProductSizePriceQuantity(product.sizes, product.prices, product.quantities);
    getProductQuantity(product.quantities);
    getProductPrice(product.prices);
    getProductSize(product.sizes);


    // offer

    displayOffer(product.offer);


}

function displayProductSubImages(subImagesSrcs) {
    // let subImagesSrcs = product.images.images;
    let index = 0;
    // $(subImages).
    for (let src of subImagesSrcs) {
        $(subImages).append(`<img src="/images/${src}">`)
    }

}

function displayOffer(offer) {
    console.log(offer);

    if (offer !== null) {
        addOfferEvent();

        form.offer_startDate.value = new Date(offer.offerStartDate).toISOString().substring(0, 10);
        form.offer_endDate.value = new Date(offer.offerEndDate).toISOString().substring(0, 10);
        form.offer_name.value = offer.offerName;
        form.discount_rate.value = offer.discount.discountPercent;
    }

}

async function getJSONData(url) {
    try {

        const res = await $.ajax({
            url,
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        console.log("responsed data: ", res);

        return res;

    } catch (err) {
        console.error(err.message);
        return;
    }
}

async function fetchDataFromAPI(url) {
    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }

    })

    console.log("data", response)
    return response;
}

const getCategoryName = (categoryId) => {
    getJSONData(`/categories/category?categoryId=${categoryId}&query_parameter=name`)
        .then((data) => {

            console.log("category" + data);
            getProductCategory(data.name);
        }).catch(err => {
            console.error(err.message);
        });

}

const getSubCategoryName = (subCategoryId) => {
    getJSONData(`/sub-categories/sub-category?subCategoryId=${subCategoryId}&query_parameter=name`).then((data) =>{
        console.log("subCategory" + data);
        getProductSubCategory(data.name);
    
    }).catch(err => {
        console.log(err);
    })

   
}


const getBrandName = (brandId) => {

    getJSONData(`/brands/brand?brandId=${brandId}&query_parameter=name`).then(data => {
        console.log("brand" + data);
        getProductBrand(data.name);
    }).catch(err => {
        console.error(err);
    });

   
}


const ViewProductInfo = (product) => {
    displayProductLocalName(product.localName);
    displayProductName(product.name);
    displayProductLogo(product.image);
    getCategoryName(product.category);
    getBrandName(product.brand);
    getProductDescription(product.description);
    getSubCategoryName(product.subCategory);
    getProductVegStatus(product.vegStatus);
    getProductStockType(product.stockType);
    getProductUnitsInStock(product.unitsInStock);
}



const updateProduct = async (e) => {

    e.preventDefault();

    let images = [];

    if (localStorage.getItem('images') != undefined) {
        images = JSON.parse(localStorage.getItem('images'));
    } else {
        images = subImagesSrcs;
    }

    let i = 0;

    // form.image.value = "";
    // form.images.value = "";
    // let absImage = form.image.value.split('\\') ;

    console.log("images of the product", images);

    const logo = product.image;
    console.log("image: ", logo);


    let priceClasses = document.getElementsByClassName("price");
    let quantityClasses = document.getElementsByClassName("quantity");
    let sizeClasses = document.getElementsByClassName("size");
    let iteratorIndex = 0;

    const sizes = [];
    // initialize sizes array
    if ($("#singleSize").attr("required") === "required") {
        sizes.push({ sizeType: "singleSize", size: $("#singleSize").val() });
    } else {
        $.each($(".size-field"), function () {
            const $this = $(this);
            sizes.push({ sizeType: sizeClasses.item(iteratorIndex++).innerHTML, size: $this.val() });
        })
    }


    const prices = [];
    iteratorIndex = 0;
    // initialize sizes array
    if ($("#singlePrice").attr("required") === "required") {
        prices.push({ priceType: "singlePrice", size: $("#singlePrice").val() });
    } else {
        $.each($(".price-field"), function () {
            const $this = $(this);

            prices.push({ priceType: priceClasses.item(iteratorIndex++).innerHTML, price: $this.val() });
        })
    }



    const quantities = [];
    iteratorIndex = 0;
    // initialize sizes array
    if ($("#singleQuantity").attr("required") === "required") {
        quantities.push({ quantityType: "singleQuantity", quantity: $("#singleQuantity").val() });
    } else {
        $.each($(".quantity-field"), function () {
            const $this = $(this);

            quantities.push({ quantityType: quantityClasses.item(iteratorIndex++).innerHTML, quantity: $this.val() });
        })
    }

    const offerName = form.offer_name.value;

    let offer = {};

    console.log("offer name is ", offerName);

    if (offerName !== undefined) {
        if (!checkOfferDates()) return false;

        const offerStartDate = form.offer_startDate.value;
        const offerEndDate = form.offer_endDate.value;
        const discountPercent = form.discount_rate.value;

        const discount = { discountPercent }

        offer = { offerName, offerStartDate, offerEndDate, discount };

    }

    const requsetBody = {
        name: form.name.value,
        localName: form.local_name.value,
        category: form.category.value,
        subCategory: form.subCategory.value,
        brand: form.brand.value,
        description: form.description.value,
        // department: form.department.value,
        vegStatus: form.veg_status.value,
        image: logo,
        images: [images, { _id: product.images._id }],
        prices: prices,
        quantities: quantities,
        sizes: sizes,
        status: form.status.value === 'yes' ? true : false,
        offer,

    }

    console.log("before updating product is ", requsetBody);


    const res = await fetch(`/products/${sessionStorage.getItem('productId')}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(requsetBody)
    });

    const data = await res.json();

    console.log(data);

    // if (data) {
    //     location.assign('/products');
    // }
}

form.addEventListener('submit', updateProduct)


// });
