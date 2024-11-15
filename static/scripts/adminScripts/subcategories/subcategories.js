const category_ = $("#category");

$(document).ready(function () {

    $.getJSON('/categories/getAll', (categories) => {

        console.log(categories);

        categories.forEach(category => {
            console.log(category.name, category._id, "/n");

            const option = document.createElement('option');

            option.innerHTML = category.name;
            option.value = category._id;



            category_.append(option);
        })
    });
})
