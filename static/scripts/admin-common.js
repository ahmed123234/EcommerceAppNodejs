/**
 * 
 * @param {requestMethod : String} method 
 * @param {requestURL : String} requestURL 
 * @returns 
 */
const XHR = async (requestMethod, requestURL) => {
    // const request = new XMLHttpRequest();
    console.log(sessionStorage.getItem("access-token"))

    const response = await fetch(requestURL, {
        method: requestMethod,
        headers : {
            // 'Authorization' : `Bearer ${sessionStorage.getItem("access-token")}`,
            // 'origin' : "http://127.0.0.1:5500",
            // "Access-Control-Allow-Origin" : "http://127.0.0.1:5500"
            // 'Access-Control-Allow-Credentials' : 'true'
        },
        // credentials: "include"
        
        // mode: "cors",
        // cache: "default" // specify the cashe policy
    });

    const res = await response.json();
    console.log(res);

    return await res;
    // request.open(requestMethod, requestURL);
    // request.setRequestHeader(
    //     "Authorization",
    //     "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaG1hZF9HaCIsImlhdCI6MTY3ODc4MTA1OSwiZXhwIjoxNjc4ODI0MjU5fQ.2d-ZReSbm8P8Rhs8CF-m-Bx2vxsYpdIMQyRVQwXdRx8"
    //  )

    //  request.setRequestHeader('mode', 'no-cors');
    //  request.setRequestHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500');

    // request.responseType = "json";

    // const promise  = new Promise((resolve)=> {

    //     request.onload = () => {
    //         if (request.status == 200) {
    //             const response = request.response;
    //             console.log(response);
    //             resolve(response);
    //         }
    //     }

    // })

    // request.send();

    // return await promise;
}


/**
 * 
 * @param {requestMethod : String} method 
 * @param {requestURL : String} requestURL 
 * @returns 
 */
const getInformation = async(requestMethod, requestURL)=> {


    // const promise = XHR(requestMethod, requestURL);
    // const promise = XHR("GET", "http://localhost:9090/api/v1/account");
    // return await promise;
    
};

const getCategories = async()=> {

    const promise = XHR("GET", "http://localhost:9090/api/v1/account");
    return await promise;
    
};

const getCustomerInfo = async () => {
   
    console.log(sessionStorage.getItem("customerId"));
    return await XHR("GET", `http://localhost:9090/api/v1/account/${sessionStorage.getItem("customerId")}`);
} 

// to be used in the view html page
// const customers = [];
// getCustomers().then((customer) => {
//     customers.push(customer);
// });


const searchForCustomer = async (value, searchType) => {

    // check the enterd value
    console.log(value);
    // if(value == null || value == undefined) {
        // return await XHR("GET", `http://localhost:9090/api/v1/account`);
    // }

    if(isNaN(value))
        return await XHR("GET", `http://localhost:9090/api/v1/account/search?pattern=${value}`);
    else
        return await XHR("GET", `http://localhost:9090/api/v1/account`);
    // // else if (value.toString().length > 1) {
    // //     return await XHR("GET", `http://localhost:9090/api/v1/account/search?mobile=${value}`);        
    // // }
    //  else {
    //     return await XHR("GET", `http://localhost:9090/api/v1/account/${value}`);
    // }
}

const container = document.getElementsByClassName("displayedContent")[0];


const searchForCategory = async (value) => {

    // check the enterd value
    console.log(value);
    if(value == null || value == undefined) {
        return getCate();
    }

    if(isNaN(value))
        return await XHR("GET", `http://localhost:9090/api/v1/account/search?pattern=${value}`);
    // else if (value.toString().length > 1) {
    //     return await XHR("GET", `http://localhost:9090/api/v1/account/search?mobile=${value}`);        
    // }
     else {
        return await XHR("GET", `http://localhost:9090/api/v1/account/${value}`);
    }
}



const login = () => {
    fetch("http://localhost:9090/api/v1/account/login", {
      
        method : "POST",
        headers : new Headers(
            {
                "Content-Type" : "application/json"
            }

        ),
        body : JSON.stringify(
            {
                "username": "ahmad_Gh",
                "password": "1234"
            }
        )
    }).then((response) => {
        response.json().then((res) => {

            sessionStorage.setItem("access-token", res.accessToken);
            sessionStorage.setItem("refresh-token", res.refreshToken);
            console.log(res);
        }
            
        )
    })
}


const regisetr = () => {
    fetch("http://localhost:9090/api/v1/account/register", {
      
        method : "POST",
        headers : new Headers(
            {
                "Content-Type" : "application/json"
            }

        ),
        body : `{
                "firstname" :"sameer",
                "lastname" :"asad",
                "username": "sameer12",
                "password": "1234",
                "email" : "sameer@gmail.com",
                "role" : "CUSTOMER",
                "mobile" : "099128373"
            }`

    }).then((response) => {
        response.json().then((res) => {
            console.log(res);
        })
    })
}

// using jquery ajax:

// $.ajax()














// using XMLHttpRequest insted of fetch
const getCustomersWithXML = async() => {

    const request = new XMLHttpRequest();
    request.open("GET", "http://localhost:9090/api/v1/account");
    // // request.setRequestHeader("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhaG1hZF9HaCIsImlhdCI6MTY3ODc4MTA1OSwiZXhwIjoxNjc4ODI0MjU5fQ.2d-ZReSbm8P8Rhs8CF-m-Bx2vxsYpdIMQyRVQwXdRx8")
    // // request.setRequestHeader("Access-Control-Allow-Origin", "");
    
    request.responseType = "json";


    const promise  = new Promise((resolve)=> {

        request.onload = () => {
            if (request.status == 200) {
                const response = request.response;
                console.log(response);
                resolve(response);
            }
        }

    })

    request.send();

    return await promise;
};




const arrows = document.getElementsByClassName('fa-angle-left');
const subLists = document.getElementsByClassName('sub-list');

for (let i = 0; i < arrows.length; i++) {
    const item = arrows.item(i);
    const subList  = subLists.item(i);

    subList.style.maxHeight = "0";
    item.addEventListener("click", () => {
        // item.style.transform =  "rotateX(90)";
        
        if(subList.style.maxHeight == "0px") {
            item.style.rotate = '-90deg';
            subList.style.maxHeight = "250px"
            // subList.style.display = 'block'; 
        } else {
            subList.style.maxHeight = "0px";
            item.style.rotate = '0deg';
            // subList.style.display = "none";
        // item.style.animationDuration = '1s';
        // item.style.animationName = 'rotate';
        // item.style.animationTimingFunction = 'ease';
        // item.style.animationFillMode = 'forwards';
        }
    }) 
}
    

// create table 
const craeteTable = (headers) => {
    const previousTable = document.getElementById("customerInfoTable");
    console.log(previousTable);
    if (previousTable != null || previousTable != undefined) {
        previousTable.remove();
    }

    const table = document.createElement("table");
    table.id = "customerInfoTable";

    const rowHeader = document.createElement("tr");

    for (let arg of headers) {
        const header = document.createElement("th");
        header.innerHTML = arg;
        console.log(arg);
        rowHeader.appendChild(header);
    }
    table.appendChild(rowHeader);

    return table;
}


const createCategoriesTable = () => {
    const table = craeteTable(["Sr.No.", "Name", "Daily Product", "Status", "Options"]);
    return table;
}




document.getElementById("customers").addEventListener("click", 

() => {
    window.location.href = "customers.html";
}
);



// const search = () => {
    // const form  = document.createElement("span");
    // form.style.display = "inline-block";
    // form.style.margin ="2%"; 
    // form.style.marginBottom = "0";
    // form.classList.add('options');
    
    // const label = document.createElement("label");
    // label.innerHTML = "Search: ";
    // label.for = "i1";
    
    // const input =  document.createElement("input");
    // input.type = "text";
    // input.placeholder = "search Customer by Id";
    // input.id = "i1";
    // // input.style.width = "200px";
    // input.style.outline = "none"
    // input.style.padding ="4px 8px";

    const input = document.getElementById('search');


    // input.onkeyup = () => {
    //     console.log(input.value)
    //     localStorage.setItem("input", input.value);

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

    // form.appendChild(label);
    // form.appendChild(input);

    // return form;

// };







// displayInfo("customers");

const displayInfo =(type) => {
    const container = document.getElementsByClassName("displayedContent")[0];

    // container.appendChild(createHeader());


    // container.appendChild(search());
    let table;

    if (type == "customers") {
        table = craeteCustomersTable();

    } else if (type == "categories") {
        table = createCategoriesTable();

        // getCategories().

        // Just as an Example: 
    
    }
    

    // add customers to the table according to the api requset respones's

    // send http GET request to localhost:9090/Ecommerce/v1/users to get all customers

    // getCustomers().then((response) => {
    //     console.log(response);
    //     // iterate for each customer and add it in the table
    //     response.forEach((customer) => {
    //         createCustomerRow(customer, table);
    //     })
      
    // });
    // login();
    // regisetr();
    container.appendChild(table);
    return table;
   
}


/**
 * 
 * @param {boolean} isActive 
 * @param {HTMLElement} statusElement 
 * @param {{active :{color : String, data: String}, inActive : {color : String, data: String}}: Object} activity 
 */

const checkStatus = (isActive, statusElement, activity) => {
    const status = document.createElement("span");

    status.style.borderRadius = "14px";
    status.style.color = "#fff";
    status.style.padding = "3px 8px"; 
   
    status.style.textTransform = "capitalize";

    if(isActive === true) {
        status.style.backgroundColor = activity.active.color;
        status.innerHTML = activity.active.data;
    } else {
        status.style.backgroundColor = activity.inActive.color;
        status.innerHTML = activity.inActive.data;
    }

    statusElement.appendChild(status);

}





// first parameter (choices) is represented as array of objects 
// choices can be as the following 
/**
 * 
 * @param {
 * {
 * {view:{status: true, color: "", refrence: String, name: "View" }},
 *  {edit: {status: true, color: "", refrence: String, name: "Edit" }}
 * , {delete: {status: true, color: "", refrence: String, name: "Delete" }}
 * }} choices 
 * 
 * @param {{itemName: String, itemValue: number}} item 
 * @returns 
 */
const generateOption = (choices, item) => {
    const customerOption = document.createElement("td");


    if (choices.view.status == true) {
        console.log( choices.view.color);
        customerOption.appendChild(createOption( choices.view, ['fa-solid', 'fa-eye'], item));
    }
    
    
    if (choices.edit.status == true) {
        customerOption.appendChild(createOption(choices.edit, ['fa-solid', 'fa-pen-to-square'], item));
    }

    if (choices.delete.status == true) {
        customerOption.appendChild(createOption(choices.delete, ['fa-solid', 'fa-trash-can'], item));
    }
       
    

    return customerOption;
}


 /** 
 * @param {view:{status: true, color: "", refrence: String, name: "View" }} choice 
 * @param {['fa-solid', '..']} classes 
 * @param {{itemName: String, itemValue: number}} item 
 * @returns 
 */
function createOption (choice, classes, item) {

    const option = document.createElement("span");
    option.style.color = "#fff";
    option.style.backgroundColor = choice.color;
    option.style.padding = "5px";
    option.style.borderRadius = "5px";
    option.style.cursor = "pointer";
    option.style.marginRight = "3px";


    const symbol = document.createElement("i");
    for (let c of classes) {
        symbol.classList.add(c);
    }
    
    symbol.style.fontSize = "12px";
    symbol.style.paddingRight = "3px";
    option.appendChild(symbol);


    const view = document.createElement("span");
    view.innerHTML = choice.name;
    option.appendChild(view);

    option.addEventListener("click", () => {
        sessionStorage.setItem(item.itemName, item.itemValue);
        console.log(sessionStorage.getItem(item.itemName));
        
        window.location.href = choice.refrence;
    });

    return option;
}



// add events listener  to be fired while clicking on any aside item

const asideItems = document.getElementsByClassName('item');

for (let i = 0; i< asideItems.length; i++) {
    const item = asideItems.item(i);
    item.addEventListener("click", () => {
    window.location.href = `${item.id}.html`;
    }
    );
}

