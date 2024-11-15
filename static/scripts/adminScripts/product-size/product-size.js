$(document).ready(() => {
    const unitElem = document.getElementById('unit');
    const nameElem = document.getElementById('name');
    const sizeElem = document.getElementById('size');

    let namePats = [];

    unitElem.onchange = function () {
        console.log("inside unit ", this.value);
        namePats[1] = this.value;
        checkValue(namePats, nameElem)
    };



    
    sizeElem.onchange = function () {
        console.log("inside size ", this.value);
        namePats[0] = this.value;
        checkValue(namePats, nameElem)
    };

    const units = {
        select: undefined,
        kilogram: "kg",
        gram: "g",
        inch: "in",
    }


    const keys = Object.keys(units);

    keys.forEach((key) => {
        console.log(key);
        const option = document.createElement('option');
        option.innerHTML = key;
        option.value = units[key];
        unitElem.append(option);
    });

});

function checkValue(arr, nameElem) {
    let isPossible = true;
    arr.forEach(value => {
        if(value === undefined || value === null) {
            isPossible = false;
        }
    })

    if (isPossible) {
        nameElem.value = `${arr.join('')}`;
    }
}