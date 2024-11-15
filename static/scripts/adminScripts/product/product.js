let counter = 0;
$(document).ready(() => {
    // to store images files to be send to the server
    // let images = [];
    let uploadButton_ = document.querySelector('#upload-button-sub');

    const size_type = $('[name="size_type"]');
    const categoryCont = $('#category');
    const subCategoryCont = $('#subCategory');
    const brandCont = $('#brand');
    const sizes = $('#sizes');
    const form = document.querySelector('form');
    const singleSize = $('#single');
    const multiSize = $("#multi");
    const singleSizeList = $('.singleSizeList');
    const multiSizeList = $('.multiSizeList');
    // const sizeList = $('.sizeList');
    const addSize = $('#moreSize');
    const sizeTrash = $('.size-trash');
    const cover = $('.cover');
    const userInputCont = $('#userInputCont');
    const close = $('#close');
    const next = $('#next');
    const userInput = document.getElementById('userInput');
    const addOffer = $("#addOffer");
    const cancelOffer = $("#cancelOffer");
    const offerDetails = $('#offer_details');
    const offer = $(".offer");

    // declare input filed to control the required atribute for them (price, quantity, size)
    // const sizeFields = $('.size-field');
    // const quantityFields = $('.quantity-field');
    // const priceFields = $('.price-field');

    // control the single elements for (price, quantity, size)
    const size = $('#singleSize');
    const quantity = $('#singleQuantity');
    const price = $('#singlePrice');


    offerDetails.slideUp(500);
    cancelOffer.hide();

    userInputCont.hide();

    sizeTrash.hide();
    // addSize.on('click', addSizeOption);



    handlePromise('/categories/getAll', categoryCont, getJSONData, appendDataToContainer);
    handlePromise('/sub-categories/getAll', subCategoryCont, getJSONData, appendDataToContainer);
    handlePromise('/brands/getAll', brandCont, getJSONData, appendDataToContainer);
    handlePromise('/sizes/getAll?type=Normal', size, getJSONData, appendDataToContainer);

    $.each($('.size-field'), function () {
        let $this = $(this);
        // sizeFiled

        handlePromise(`/sizes/getAll?type=${$this.attr("data-name")}`, $this, getJSONData, appendDataToContainer);
    });

    next.on('click', () => {
        console.log(userInput.value);
        if (userInput.value === undefined) {
            alert("Please Select size to continue")
        }
        // let index = 0;
        // const sizeFields = document.getElementsByClassName("size-field");
        let isValid = true;
        $.each($('.size'), function () {
            let $this = $(this);

            if ($this.html() === `${userInput.value} size`) {
                isValid = false;
                alert("The selected size is already exists")
            }
        });
        if (isValid) {
            userInputCont.slideToggle(500);
            cover.toggle();
            addSizeOption();
        }

    });

    close.on('click', () => {
        userInputCont.slideToggle(500);
        cover.toggle();

    });

    addOffer.on('click', addOfferEvent)
    cancelOffer.on('click', () => {
        offerDetails.slideToggle(500);
        addOffer.toggle();
        cancelOffer.toggle();
        // reset the offer input values
        $.each(offer, function () {
            const $this = $(this);
            console.log("before", $this.val());
            $this.val("");
            $this.removeAttr("required");

            console.log("required offer is", $this.attr("required"));
            console.log("after", $this.val());
        });


    })

    addSize.on('click', () => {
        cover.toggle();
        userInputCont.slideToggle(500);
    })

    multiSizeList.hide();
    form.size_type.value = "0";
    form.stock_type.value = "Single Stock";

    size_type.on('change', changeSizeType)

    singleSize.on('change', () => {
        configSizeChange();
        singleSizeToggle()
    });


    multiSize.on('change', () => {
        configSizeChange();

        multiSizeToggle();
    
    })
    


    //    function controlRequiredAttribute() {

    //     }

    // upload multi line for products sub images
    uploadButton_.addEventListener('change', () => {
        handleUplodedFiles(4, uploadButton_.files, 1);
    });



});


function changeSizeType() {
    // form.size_type.value

    if (form.stock_type.value.includes("Single Stock")) {
        form.stock_type.value = "Multi Stocks(related to size)";
    }   else {
        form.stock_type.value = "Single Stock"; 
    }

    

}



function configSizeChange() {
    const singleSizeList = $('.singleSizeList');
    const multiSizeList = $('.multiSizeList');

    console.log("single clicked");
    singleSizeList.toggle(500, () => {
        console.log("single list toogled");
    });
    multiSizeList.toggle(500, () => {
        console.log("multi list toogled");
    });
}

function addSizeOption() {

    const sizeList = $('.sizeList');
    const quantityList = $('.quantityList');
    const priceList = $('.priceList');

    const sizeTrash = $('.size-trash');

    // add div tag (container of all elements)
    const sizeItem = $(`<div class='row' id='size${counter}'></div>`);
    sizeItem.attr('cursor', 'pointer');

    const priceItem = $(`<div class='row' id='price${counter}'></div>`);
    sizeItem.attr('cursor', 'pointer');

    const quantityItem = $(`<div class='row' id='quantity${counter}'></div>`);
    sizeItem.attr('cursor', 'pointer');

    const checkBoxCont = $(`<div></div>`);

    // add label tag
    const sizeLabel = $(`<label class="size" for="size${counter}">${userInput.value} size</label>`);
    // sizeLabel.html(`${userInput.value} size`);
    const priceLabel = $(`<label class="price" for="price${counter}">${userInput.value} price</label>`);
    // priceLabel.html(`${userInput.value} price`);
    const quantityLabel = $(`<label class="quantity" for="quantity${counter}">${userInput.value} product quantity</label>`);
    // quantityLabel.html(`${userInput.value} product quantity`);

    // add checkbox tag
    const checkbox = $(`<input type="checkbox" name="sizeItem" value='${sizeItem.attr('id')}'>`);
    checkbox.on('change', function () { handleChecheckboxChange(checkbox, sizeTrash) });

    // add select tag
    const sizeField = $(`<select class="col" id='sizeFiled${counter++}' name="sizes" required></select>`);
    sizeField.addClass("size-field")

    // append options to the select tag
    handlePromise(`/sizes/getAll?type=${userInput.value}`, sizeField, getJSONData, appendDataToContainer);

    console.log("size classes ", sizeField.attr("class"));
    const priceField = $('<input type="text" name="price" class="col price-field" required>');
    const quantityField = $('<input type="number" name="quantity" class="col quantity-field" min="0" required>');

    // append all elements to the sizeList
    checkBoxCont.append(checkbox);
    checkBoxCont.append(sizeLabel);
    sizeItem.append(checkBoxCont);
    sizeItem.append(sizeField);

    // append the container to size List
    sizeList.append(sizeItem);


    // append all elements to the priceList
    priceItem.append(priceLabel);
    priceItem.append(priceField);

    // append the container to price List
    priceList.append(priceItem);


    // append all elements to the quantityList

    quantityItem.append(quantityLabel);
    quantityItem.append(quantityField);

    // append the container to quantity List
    quantityList.append(quantityItem);

    console.log("inside add size method");

}

function handleChecheckboxChange(checkbox, sizeTrash) {

    if (checkbox.is(':checked')) {

        sizeTrash.show();

    } else {
        controlTrashDisplay(sizeTrash)
    }

    sizeTrash.on('click', () => handleTrashClicks(sizeTrash));

}

function handleTrashClicks(sizeTrash) {

    $("[name='sizeItem']").each(function () {
        var $this = $(this);

        if ($this.is(":checked")) {
            const sizeItemId = $this.attr("value");
            const index = sizeItemId.substring("size".length);
            $(`#${$this.attr("value")}`).remove();
            $(`#price${index}`).remove();
            $(`#quantity${index}`).remove();

        }
    });

    controlTrashDisplay(sizeTrash);
}


function controlTrashDisplay(sizeTrash) {
    let checked = false;
    $("[name='sizeItem']").each(function () {
        var $this = $(this);

        console.log("inside each");

        // check if the checkbox is checked
        if ($this.is(":checked")) {
            sizeTrash.show();
            checked = true;
        }
    });

    if (checked === false) {
        sizeTrash.hide();
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

function handlePromise(url, container, getJSONData, appendDataToContainer) {
    getJSONData(url).then((response) => {
        console.log('value is', response);

        appendDataToContainer(container, response);
    }).catch(err => {
        console.error(err.message);
    });
}

function appendDataToContainer(container, data) {

    data.forEach(element => {
        const option = document.createElement('option');
        option.innerHTML = element.name;
        option.value = element._id;
        container.append(option);
    });

}

function checkOfferDates() {
    const offer_startDate = $("[name='offer_startDate']");
    const offer_endDate = $("[name='offer_endDate']");
    const offer_error = $("#offerError");

    offer_error.html("");

    if (offer_startDate.val() > offer_endDate.val()) {
        offer_error.html("interval offer interval, set offer start date to be before offer end date");
        offer_error.css("color", "red");

        return false;
    }
    else {
        offer_error.html("");

    }
    return true;
}

$("[name='offer_startDate']").change(() => {
    $("#offerError").html("");
})


$("[name='offer_endDate']").change(() => {
    $("#offerError").html("");
})


function addOfferEvent() {
    const addOffer = $("#addOffer");
    const cancelOffer = $("#cancelOffer");
    const offerDetails = $('#offer_details');
    const offer = $(".offer");

    offerDetails.slideToggle(500);
    addOffer.toggle();
    cancelOffer.toggle();
    $.each(offer, function () {
        const $this = $(this);
        console.log("before", $this.val());
        $this.val("");
        $this.attr("required", "required");

        console.log("required offer is", $this.attr("required"));
        console.log("after", $this.val());
    });
}

function setMultipleContainers(size, price, quantity) {
    
    setMutipleQuantityOptions(quantity);
    setMutiplePriceOptions(price);
    setMutipleSizeOptions(size);

}

function setMutiplePriceOptions(price) {

    const priceList = $('.priceList');

    // add div tag (container of all elements)
    const priceItem = $(`<div class='row' id='price${counter}'></div>`);
    priceItem.attr('cursor', 'pointer');

    // add label tag
    const priceLabel = $(`<label class="price" for="price${counter}">${price.priceType}</label>`);
  
    const priceField = $(`<input type="text" name="price" class="col price-field" value=${price["price"]} required>`);

    // append all elements to the priceList
    priceItem.append(priceLabel);
    priceItem.append(priceField);

    // append the container to price List
    priceList.append(priceItem);

    console.log("inside add price method");
}

function setMutipleQuantityOptions(quantity) {

    const quantityList = $('.quantityList');
   
    const quantityItem = $(`<div class='row' id='quantity${counter}'></div>`);
    quantityItem.attr('cursor', 'pointer');

    const quantityLabel = $(`<label class="quantity" for="quantity${counter}">${quantity.quantityType}</label>`);

    const quantityField = $(`<input type="number" name="quantity" class="col quantity-field" value=${quantity["quantity"]} min="0" required>`);

    // append all elements to the quantityList
    quantityItem.append(quantityLabel);
    quantityItem.append(quantityField);

    // append the container to quantity List
    quantityList.append(quantityItem);

    console.log("inside add quantity method");
}


function setMutipleSizeOptions(size) {

    const sizeList = $('.sizeList');
    // const quantityList = $('.quantityList');
    // const priceList = $('.priceList');

    const sizeTrash = $('.size-trash');

    // add div tag (container of all elements)
    const sizeItem = $(`<div class='row' id='size${counter}'></div>`);
    sizeItem.attr('cursor', 'pointer');

    // const priceItem = $(`<div class='row' id='price${counter}'></div>`);
    // priceItem.attr('cursor', 'pointer');

    // const quantityItem = $(`<div class='row' id='quantity${counter}'></div>`);
    // quantityItem.attr('cursor', 'pointer');

    const checkBoxCont = $(`<div></div>`);

    // add label tag
    const sizeLabel = $(`<label class="size" for="size${counter}">${size.sizeType}</label>`);
    // sizeLabel.html(`${userInput.value} size`);
    // const priceLabel = $(`<label class="price" for="price${counter}">${price.priceType}</label>`);
    // priceLabel.html(`${userInput.value} price`);
    // const quantityLabel = $(`<label class="quantity" for="quantity${counter}">${quantity.quantityType}</label>`);
    // quantityLabel.html(`${userInput.value} product quantity`);

    // add checkbox tag
    const checkbox = $(`<input type="checkbox" name="sizeItem" value='${sizeItem.attr('id')}'>`);
    checkbox.on('change', function () { handleChecheckboxChange(checkbox, sizeTrash) });

    // add select tag
    const sizeField = $(`<select class="col" id='sizeFiled${counter++}' name="sizes" required></select>`);
    sizeField.val(size['size']);
    sizeField.addClass("size-field")

    // append options to the select tag
    handlePromise(`/sizes/getAll?type=${size.sizeType.split(" ")[0]}`, sizeField, getJSONData, appendDataToContainer);

    console.log("size classes ", sizeField.attr("class"));
    // const priceField = $(`<input type="text" name="price" class="col price-field" value=${price["price"]} required>`);
    // const quantityField = $(`<input type="number" name="quantity" class="col quantity-field" value=${quantity["quantity"]} min="0" required>`);

    // append all elements to the sizeList
    checkBoxCont.append(checkbox);
    checkBoxCont.append(sizeLabel);
    sizeItem.append(checkBoxCont);
    sizeItem.append(sizeField);

    // append the container to size List
    sizeList.append(sizeItem);


    // append all elements to the priceList
    // priceItem.append(priceLabel);
    // priceItem.append(priceField);

    // // append the container to price List
    // priceList.append(priceItem);


    // append all elements to the quantityList

    // quantityItem.append(quantityLabel);
    // quantityItem.append(quantityField);

    // // append the container to quantity List
    // quantityList.append(quantityItem);

    console.log("inside add size method");

}


function singleSizeToggle() {
    console.log("inside single size toggle");
    const size = $('#singleSize');
    const quantity = $('#singleQuantity');
    const price = $('#singlePrice');


    size.attr("required", "required");
    price.attr("required", "required");
    quantity.attr("required", "required");

    console.log("size required is: ", size.attr("required"));
    console.log("price required is: ", price.attr("required"));
    console.log("quantity required is: ", quantity.attr("required"));

    const sizeFields = $('.size-field');
    const quantityFields = $('.quantity-field');
    const priceFields = $('.price-field');

    $.each(quantityFields, function () {
        const $this = $(this);

        $this.removeAttr("required");
        console.log("quantity required is: ", $this.attr("required"));

    })

    $.each(priceFields, function () {
        const $this = $(this);

        $this.removeAttr("required");
        console.log("price required is: ", $this.attr("required"));
    })

    $.each(sizeFields, function () {
        const $this = $(this);

        $this.removeAttr("required");
        console.log("size required is: ", $this.attr("required"));
    })

}


function multiSizeToggle() {

    console.log("inside multi size toggle");
    const sizeFields = $('.size-field');
    const quantityFields = $('.quantity-field');
    const priceFields = $('.price-field');

    const size = $('#singleSize');
    const quantity = $('#singleQuantity');
    const price = $('#singlePrice');

    size.removeAttr("required");
    price.removeAttr("required");
    quantity.removeAttr("required");

    console.log("size required is: ", size.attr("required"));
    console.log("price required is: ", price.attr("required"));
    console.log("quantity required is: ", quantity.attr("required"));

    $.each(quantityFields, function () {
        const $this = $(this);

        $this.attr("required", "required");
        console.log("quantity required is: ", $this.attr("required"));
    });

    $.each(priceFields, function () {
        const $this = $(this);

        $this.attr("required", "required");
        console.log("price required is: ", $this.attr("required"));
    })

    $.each(sizeFields, function () {
        const $this = $(this);

        $this.attr("required", "required");
        console.log("size required is: ", $this.attr("required"));
    })
}


