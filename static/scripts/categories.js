
const createCategoryRow = (category, table) => {

    const rowHeader = document.createElement("tr");

    
    const categoryNumber = document.createElement("td");
    categoryNumber.innerHTML = category.id;
    rowHeader.appendChild(categoryNumber);

    const categoryName = document.createElement("td");
    categoryName.innerHTML = `${category.name}`;
    rowHeader.appendChild(categoryName);

    
    
    const dailyProduct = document.createElement("td");
    // dailyProduct.innerHTML = category.dailyProduct;
    checkStatus(category.dailyProduct, dailyProduct, 
        {active :{color : "#009432", data: "Yes"},
        inActive: {color: "#ff793f", data : "No"}
    });
    rowHeader.appendChild(dailyProduct);

    const status = document.createElement("td");

    checkStatus(category.status, status,     
        {active :{color : "#009432", data: "Active"},
        inActive: {color: "#ff793f", data : "Inactive"}
    });
    rowHeader.appendChild(status);
    

    // add option td into the table
    // console.log(customer.id);
    const categoryOption = generateOption(
        {   
            view: {status: false},
            edit: {status: true, color: "#1289A7", refrence: "updateCategory.html", name: "Edit"},
            delete: {status: true, color: "#cd6133", refrence: "", name: "Delete"}
        },
       
        {itemName: "categoryId", itemValue: category.id}
    );
    rowHeader.appendChild(categoryOption);

    table.appendChild(rowHeader);

}

const displayCategories = ()=> { 


   const table = displayInfo('categories');

const categories = [
    {
        id : 1,
        name : "Meat", 
        dailyProduct : true,
        status : true,
    },
    {
        id : 2,
        name : "Fruits", 
        dailyProduct : false,
        status : true,
    },
    {
        id : 3,
        name : "Fish", 
        dailyProduct : true,
        status : false,
    }
   ]


   categories.forEach((category) => {
        createCategoryRow(category, table);
   });

}


displayCategories();