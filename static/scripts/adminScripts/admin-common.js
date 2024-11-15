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
    const user =  await XHR("GET", `/users/${sessionStorage.getItem("customerId")}`);
    console.log("user:" + user);
    return user;
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




const arrows = document.getElementsByClassName('angle');
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

const bar = document.querySelector('.fa-bars');
const list = document.querySelector('aside.small');

bar.addEventListener("click", () => {
    
    if(list.style.maxHeight == "0px") {
        list.style.maxHeight = "100vh"
    } else {
        list.style.maxHeight = "0px";
    }
}) 

window.onresize = () => {

    if (window.innerWidth <= 840) {
        // aside 
        console.log(window.innerWidth);
    
            list.style.maxHeight = "0px";
            
  } 
  
  if (window.innerWidth > 840) {
      console.log('large screen', window.innerWidth);
      
      list.style.maxHeight = "100vh";
      console.log(list.style.maxHeight);
  }

}


// create table 
const craeteTable = (headers) => {
    // const previousTable = document.getElementById("customerInfoTable");
    // console.log(previousTable);
    // if (previousTable != null || previousTable != undefined) {
    //     previousTable.remove();
    // }

    const table = document.createElement("table");
    // table.id = "table";
    // table.dataFilterControl="true";
    // table.dataShowSearchClearButton="true"

    table.classList.add('table');
    table.classList.add('table-bordered');
    table.classList.add('table-striped');
    table.classList.add('table-hover')

    const tableHead = document.createElement('thead');

    const rowHeader = document.createElement("tr");

    for (let arg of headers) {
        const header = document.createElement("th");
        header.innerHTML = arg;
        console.log(arg);
        rowHeader.appendChild(header);
    }
    tableHead.appendChild(rowHeader);
    table.appendChild(tableHead);

    return table;
}


const createCategoriesTable = () => {
    const table = craeteTable(["Sr.No.", "Name", "Daily Product", "Status", "Options"]);
    const tbody = document.createElement('tbody');
    tbody.id = 'myTable';

    table.appendChild(tbody);
    return table;
}


    const input = document.getElementById('search');






// displayInfo("customers");

const displayInfo = async (type) => {
    // let container = document.getElementsByClassName("displayedContent")[0];

    let container = document.querySelector('div.swiper-wrapper');

    let count;
    let res;
    // container.appendChild(createHeader());


    // container.appendChild(search());
    let table ;

    if (type == "customers") {
        
        // document.body.onload = async (e) => {
                
            res = await fetch('/users/count', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            count = await res.json();
    
            console.log("users' count: ", count.usersCount);
           
    
           let numberOfPages = Math.ceil(count.usersCount / 10); // 10 is the page's limit 
           console.log("number of pages", numberOfPages);
           let pageNumber = 1;

           while(pageNumber <= numberOfPages) {
                    const skip = (pageNumber - 1) * 10;
                    pageNumber++;

                    // const slide  = document.createElement('div');
                   
                    const slide = document.createElement('div'); 
                    slide.classList.add('swiper-slide');
                    slide.classList.add('table-responsive');



                    const table = createCustomersTable();
                    

                    slide.appendChild(table);
                    // slide.appendChild(table);
                    // container.insertBefore(table, document.querySelector('div.pagination'))

                    console.log('skip val is', skip);
                
                    let res = await fetch(`/users/getAll?skip=${skip}`, {
                        method: 'GET',
                        headers: {"Content-Type": "application/json"}
                    });
        
                    const users = await res.json();
        
                    console.log(users);
        
                    users.forEach((user) => {
                    createCustomerRow(user, table);
                });

                container.appendChild(slide);
                // return table;
   
           }
        // }

    } else if (type == "categories") {

        res = await fetch('/categories/count', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        count = await res.json();

        console.log("categories' count: ", count);
       

       let numberOfPages = Math.ceil(count / 10); // 10 is the page's limit 
       console.log("number of pages", numberOfPages);
       let pageNumber = 1;

       while(pageNumber <= numberOfPages) {
                const skip = (pageNumber - 1) * 10;
                pageNumber++;

                // const slide  = document.createElement('div');
               
                const slide = document.createElement('div'); 
                slide.classList.add('swiper-slide');
                slide.classList.add('table-responsive');



                const table = createCategoriesTable();

                slide.appendChild(table);
                

                console.log('skip val is', skip);
            
                let res = await fetch(`/categories/getAll?skip=${skip}`, {
                    method: 'GET',
                    headers: {"Content-Type": "application/json"}
                });
    
                const data = await res.json();
    
                console.log(data);
    
                data.forEach((category) => {
                createCategoryRow(category, table);
            });

            container.appendChild(slide);
            // return table;

       }
    
    }
    

    // add customers to the table according to the api requset respones's
    // container.appendChild(table);
    // return table;
   
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
    option.style.transition = 'all .5s ease';

    option.addEventListener('mouseenter', () => {
        if (choice.name === 'View')
        option.style.backgroundColor = 'rgb(45, 74, 88)';
    });

    option.addEventListener('mouseleave', () => {
        option.style.backgroundColor = choice.color;
    });


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

    option.addEventListener("click", async () => {
        sessionStorage.setItem(item.itemName, item.itemValue);
        console.log("categoryId: ", sessionStorage.getItem(item.itemName));
        
        if (choice.status == true && choice.name == "Delete") {

            // const alert = document.querySelector("div.alert");
            const cover = document.querySelector("div.cover");
            
            cover.style.display = 'block';

            const yes = document.querySelector('a.yes');
            const no = document.querySelector('a.no');

            yes.onclick =  async () => {
                const res = await fetch( `${choice.refrence}/${item.itemValue}`, {
                    method: "DELETE",
    
                    headers: {
                        'Content-Type': 'application/json'
                    }
    
                });
    
                const data = await res.json();
    
                console.log(data);
                location.assign(choice.refrence);
            }

            no.onclick = () => {
                // alert.style.display = 'none';
                cover.style.display = 'none';
            }     
        }
        else
            location.assign(choice.refrence);
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

