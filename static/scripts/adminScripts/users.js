 let customerInfo;

function createHeader() {
    //add header 
    const header = document.createElement("div");
    header.style.display = "flex";
    header.style.justifyContent = "space-between";
    header.style.alignItems = "center";
    header.style.borderBottom = "2px solid rgba(0, 0, 0, .3)";
    header.style.padding = "15px 5px";


    // add main header
    const mainHeader = document.createElement("h1");
    mainHeader.classList.add("main");
    mainHeader.innerHTML = "Ecom.Customers";
    mainHeader.style.fontSize = "25px";
    mainHeader.style.color = "#555";
    header.appendChild(mainHeader);


     // add sub header
     const subHeader = document.createElement("span");
     
    // const home = document.createElement("span");

    // create dashboard icon
    const icon = document.createElement("i");
    // icon.style.fontSize = "20px";
    icon.style.color = "#444";
    icon.style.paddingRight = "10px";
    icon.classList.add("fa");
    icon.classList.add("fa-tachometer");
    
    subHeader.appendChild(icon);

    // create link ancor
    const link = document.createElement("a");
    link.style.display = "inline";
    link.style.textDecoration = "none";
    link.style.color = "#666";
    link.innerHTML = "Home";
    link.style.cursor = "pointer";
    link.onclick = () => {
        history.back();
    }
    // link.style.paddingRight = "10px";

    subHeader.appendChild(link);


    // create arrow 
    const arrow = document.createElement("i");
    arrow.style.fontSize = "10px";
    arrow.style.color = "#888";
    arrow.style.padding = "0 10px";
    arrow.classList.add("fa-solid");
    arrow.classList.add("fa-angle-right");

    subHeader.appendChild(arrow);



    // create current page name
    const current = document.createElement("span");
    current.style.color = "#777";
    current.innerHTML = "Ecom.Customers";
    current.style.paddingRight = "10px";

    subHeader.appendChild(current);

    header.appendChild(subHeader);

     return header;
}


const createCustomersTable = () => {

    const table = craeteTable(["No", "Name", "Mobile", "UserType", "Status", "Options"]);
    const tbody = document.createElement('tbody');
    tbody.id = 'myTable';
    table.appendChild(tbody);
    
    return table;
}





function viewCustomerProfile(customer) {


}
sessionStorage.setItem("customerId", 0);


const createCustomerRow = (customer, table) => {

    const rowHeader = document.createElement("tr");
    const tbody = table.querySelector('tbody#myTable');
    
    const customerNumber = document.createElement("td");
    customerNumber.innerHTML = customer._id;
    customerNumber.classList.add('row-number');
    rowHeader.appendChild(customerNumber);

    const customerName = document.createElement("td");
    customerName.innerHTML = customer.username;
    customerName.classList.add('row-name');
    rowHeader.appendChild(customerName);

    
    
    const customerMobile = document.createElement("td");
    customerMobile.innerHTML = customer.mobile;
    customerMobile.classList.add('row-mobile');
    rowHeader.appendChild(customerMobile);
    

    const customerType = document.createElement("td");
    customerType.innerHTML = customer.role;
    customerType.style.textTransform = "capitalize";
    customerType.classList.add('row-type');
    rowHeader.appendChild(customerType);


    const customerStatus = document.createElement("td");
    customerStatus.classList.add('row-status');
    checkStatus(customer.enabled, customerStatus,
        {active :{color : "#009432", data: 'Active'}, inActive : {color : "#EA2027", data: 'inActive'}});
    rowHeader.appendChild(customerStatus);
    
    // add option td into the table
    console.log(customer._id);
    const customerOption = generateOption(
        {   
            view: {status: true, color: "#1289A7", refrence: "/users/profiles/getProfile", name: "View"},
            edit: {status: false},
            delete: {status: false}
        },
       
        {itemName: "customerId", itemValue: customer._id}
    );
    customerOption.classList.add('row-options');
    rowHeader.appendChild(customerOption);

    // table.appendChild(rowHeader);
    tbody.appendChild(rowHeader);

}




const displayCustomers =() => {

    // container.insertBefore(createHeader(), document.querySelector('div.pagination'));


    // container.appendChild(search());
    // const table = displayInfo('categories');

    const table = displayInfo('customers');

    // add customers to the table according to the api requset respones's

    // send http GET request to localhost:9090/Ecommerce/v1/users to get all customers

    // XHR('GET', 'http://localhost:9090/api/v1/account').then((response) => {
    //     console.log(response);
    //     // iterate for each customer and add it in the table
    //     response.forEach((customer) => {
    //         createCustomerRow(customer, table);
    //     })


        
    // document.body.onload = async (e) => {
            
    //     let res = await fetch('/users/getAll', {
    //          method: 'GET',
    //          headers: {"Content-Type": "application/json"}
    //      });

    //      const users = await res.json();

    //      console.log(users);

    //      users.forEach((user) => {
    //         createCustomerRow(user, table);
    //    });



    //    const pagination =  document.querySelector('div.pagination');

    //    let count;
       
    //     res = await fetch('/users/count', {
    //         method: "GET",
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     });

    //     count = await res.json();

    //     console.log("users' count: ", count.usersCount);
       

    //    let numberOfPages = Math.ceil(count.usersCount / 10); // 10 is the page's limit 
    //    console.log("number of pages", numberOfPages);
    //    let pageNumber = 1;

    //    while (numberOfPages > 0) {
    //         const page = document.createElement('span');
    //         page.innerHTML = pageNumber ++; 

    //         page.classList.add('page');

    //         pagination.appendChild(page);
    //         numberOfPages --;
    //    }

    

    //  }
      
    // });
    // login();
    // regisetr();
    // container.appendChild(table);
}

displayCustomers();



const display = ()=> {
    
    console.log(sessionStorage.getItem("input"))
    // if (input.value !== null || input.value !== undefined || input.value != "") {
        searchForCustomer(sessionStorage.getItem("input")).then((response) => {
            console.log(response);

            const table = createCustomersTable();

            response.forEach((customer) => {
                createCustomerRow(customer, table);
            });
        
            container.appendChild(table);

        });
    
}

// display();



// input.onkeyup = () => {
//     console.log(input.value)
//    sessionStorage.setItem("input", input.value);

//     const container = document.getElementsByClassName("displayedContent")[0];
   
//     searchForCustomer(input.value).then((response) => {
//         console.log(response);

//         const table = craeteCustomersTable();

//         response.forEach((customer) => {
//             createCustomerRow(customer, table);
//         });
    
//         container.appendChild(table);

//     });

// };
