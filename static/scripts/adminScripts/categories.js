let i = 1;
const createCategoryRow = (category, table) => {

    const rowHeader = document.createElement("tr");
    const tbody = table.querySelector('tbody#myTable');

    
    const categoryNumber = document.createElement("td");
    categoryNumber.innerHTML = i++;//category._id;
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
            view: {status: true, color:"#1289A7", refrence:"", name: 'View'},
            edit: {status: true, color: "#1289A7", refrence: "/categories/updateCategory", name: "Edit"},
            delete: {status: true, color: "#cd6133", refrence: "/categories", name: "Delete"}
        },
       
        {itemName: "categoryId", itemValue: category._id}
    );
    rowHeader.appendChild(categoryOption);

    tbody.appendChild(rowHeader);

}

const displayCategories = async ()=> { 


    const table = displayInfo('categories');

            
    // const res = await fetch('/categories/getAll', {
    //         method: 'GET',
    //         headers: {"Content-Type": "application/json"}
    //     });

    //     const categories = await res.json();

    //     console.log(categories);

    //     const row_data = []
    //     categories.forEach(category => {
    //         row_data.push([category.name, category.dailyProduct, category.status]);
    //     });


    //     const data = {
    //         columns: [
    //           {
    //             label: 'Name',
    //             field: 'name'
    //           },
    //           'Daily Products',
    //           'Status'
    //         ],

    //         rows: row_data,
    //       };
            

    //       console.log(data.rows);

    //     // categories.forEach((category) => {
    //     // createCategoryRow(category, table);
    // // });

    // // import {mdb} from 'mdb-ui-kit';
    // const instance = new mdb.Datatable(document.getElementById('datatable'), data)
    // const advancedSearchInput = document.getElementById('advanced-search-input');

    // const search = (value) => {
    // let [phrase, columns] = value.split(' in:').map((str) => str.trim());

    // if (columns) {
    //     columns = columns.split(',').map((str) => str.toLowerCase().trim());
    // }

    // instance.search(phrase, columns);
    // }

    // document.getElementById('advanced-search-button').addEventListener('click', (e) => {
    // search(advancedSearchInput.value)
    // });

    // advancedSearchInput.addEventListener('keydown', (e) => {
    // if (e.keyCode === 13) {
    //     search(e.target.value);
    // }
    // })
   
}


displayCategories();