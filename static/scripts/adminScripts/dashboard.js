
function createNewAdminMainContainer() {
    const mainContenet = document.getElementsByClassName("main-content")[0];
    
    let container = document.getElementsByClassName("displayedContent")[0];

    // remove the existing container
    container.remove();


    // add new container
    container = document.createElement("div");
    container.classList.add("displayedContent");

    // append the conatainer to the main one
    mainContenet.appendChild(container);
    return container;
}


function addHeaders() {
    //add header 
    const header = document.createElement("div");
    header.classList.add("header");

    // add main header
    const mainHeader = document.createElement("span");
    mainHeader.classList.add("main");
    mainHeader.innerHTML = "RED Store";


     // add sub header
     const subHeader = document.createElement("span");
     subHeader.classList.add("sub");
     subHeader.innerHTML = "Ecommerce Control Panel";


     header.appendChild(mainHeader);
     header.appendChild(subHeader);

     return header;
}

function createStatisticsConatiner() {
    // add statistics container
    const statistics = document.createElement("div");
    statistics.classList.add("statistics");
    return statistics;
}


function createSubStatisticsConatiner(subType) {

    // add sub statistics statistics
    const subStatistics = document.createElement("div");
    subStatistics.classList.add("statistics-sub");
    // add sub statistics calss name
    subStatistics.classList.add(subType);

    subStatistics.appendChild(addMainInfoContainer(1990, "Ecommerce Customers", subType));
    subStatistics.appendChild(addMoreInfoStatistics());

    return subStatistics;
}


function addMainInfoContainer(count, name, subType) {

    // append information for sub statistics
    const mainInfo = document.createElement("div");
    mainInfo.classList.add("mainInfo");
    

    // append the genertaed nodes to mainInfo
    mainInfo.appendChild(createRow(name, count));

    // add icon to the genereted statistaics
    mainInfo.appendChild(addIcon(subType));

    return mainInfo;
    
}

function createRow(name, total) {
     //add row data 
     const row = document.createElement("div")
     row.classList.add("row");
 
     // append row details
 
     const count = document.createElement("h1");
     count.classList.add("count");
     // TODO: This data will be updated according to the value getting from the API
     count.innerHTML = total;
 
     const statisticName = document.createElement("h4");
     // TODO: This data will be updated according to the value getting from the API
     statisticName.innerHTML = name;
 
     row.appendChild(count);
     row.appendChild(statisticName);
     return row;
}


function addIcon(name) {

    // add icon to the genereted statistaics
    const statisticIcon = document.createElement("i");
    statisticIcon.classList.add("fa-solid");
    statisticIcon.classList.add("background");


    switch(name){
        case "customers": 
            statisticIcon.classList.add("fa-user");
        break;

        case "sellers": 
            statisticIcon.classList.add("fa-bag-shopping");
        break;

        case "sales": 
            statisticIcon.classList.add("fa-shopping-cart");
        break;

        case "delivaries": 
            statisticIcon.classList.add("fa-truck");
        break;      
    }

    return statisticIcon;

}

function addMoreInfoStatistics() {
    // create moreInfo conatiner

    const moreInfo = document.createElement("div");
    moreInfo.classList.add("moreInfo");

    const link = document.createElement("a");
    link.innerHTML = "More Info";

    const arrow = document.createElement("i");
    arrow.classList.add("fa");
    arrow.classList.add("fa-arrow-circle-right");

    moreInfo.appendChild(link);
    moreInfo.appendChild(arrow);

    return moreInfo;
}


const displayDashboard = () => {

    const container = createNewAdminMainContainer();
    
    container.appendChild(addHeaders());

    const statistics = createStatisticsConatiner();


    // create customers statistics
    statistics.appendChild(createSubStatisticsConatiner("customers"));

    // create sellers statistics
    statistics.appendChild(createSubStatisticsConatiner("sellers"));

    // create sales statistics
    statistics.appendChild(createSubStatisticsConatiner("sales"));


    // create delivaries statistics
    statistics.appendChild(createSubStatisticsConatiner("delivaries"));

    container.appendChild(statistics);
}

    displayDashboard();

// document.getElementById("dashboard").addEventListener("click", displayDashboard);






















// -----------------------------------------------------------------------------------------

    // add statistics container

    // const statistics = document.createElement("div");
    // statistics.classList.add("statistics");


    // add customers statistics

    // const customers = document.createElement("div");
    // customers.classList.add("customers statistics-sub");

    // append information for customers statistics

    // const customersMainInfo = document.createElement("div");
    // customersMainInfo.classList.add("mainInfo");

    // //add customer row data 
    // const customersRow = document.createElement("div")
    // customersRow.classList.add("row");

    // // append row details

    // const count = document.createElement("h1");
    // count.classList.add("count");
    // // TODO: This data will be updated according to the value getting from the API
    // count.innerHTML = 1900;

    // const customerName = document.createElement("h4");
    // // TODO: This data will be updated according to the value getting from the API
    // customerName.innerHTML = "Ecommerce Customers";

    // customersRow.appendChild(count);
    // customersRow.appendChild(customerName);


    
    // // add icon to the genereted statistaics
    // const customerIcon = document.createElement("i");
    // customerIcon.classList.add("fa-solid fa-user background");

    // // append the genertaed nodes to mainInfo
    // customersMainInfo.appendChild(customersRow);
    // customersMainInfo.appendChild(customerIcon);

    // customers.appendChild(customersMainInfo);


    // // create moreInfo conatiner

    // const customerMoreInfo = document.createElement("div");
    // customerMoreInfo.classList.add("moreInfo");

    // const link = document.createElement("a");
    // link.innerHTML = "More Info";

    // const arrow = document.createElement("i");
    // arrow.classList.add("fa fa-arrow-circle-right");

    // customerMoreInfo.appendChild(link);
    // customerMoreInfo.appendChild(arrow);

    // customers.appendChild(customerMoreInfo);




    
