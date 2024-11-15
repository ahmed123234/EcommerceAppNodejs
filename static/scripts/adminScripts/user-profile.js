// import { createHeader } from "./customers";

// function createProfile() {
//     const profile = document.createElement("div");
//     profile.classList.add("profile");
// }

// function  createHeader() {

// }

// const displayCustomerProfile = (() => {
//     const container = document.getElementsByClassName("displayedContent")[0];

//     container.appendChild(createHeader());

//     container.appendChild(createProfile())

// })();

const details = document.getElementById("details");
const address = document.getElementById("address")
const sub1 = document.getElementById("sub1");
const sub2 = document.getElementById("sub2"); 
const username = document.getElementById("name"); 
const mobile = document.getElementById("mobile");
const userInfo = document.getElementsByClassName("info"); 


const getCustomerInfo = async () => {
   
    console.log(sessionStorage.getItem("customerId"));
    const user =  await fetch( `/users/${sessionStorage.getItem("customerId")}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    });
    console.log("user:" + user);
    return  await user.json();
} 


const displayCustomerInfo = (() => {
    getCustomerInfo().then((user) => {

        console.log(user);
        username.innerHTML = user.username;
        mobile.innerHTML = user.mobile;
        userInfo.item(0).value = user.username;
        userInfo.item(1).value = user.mobile;
        userInfo.item(2).value = user.email;
        const date = new Date(user.birthDate);
        userInfo.item(3).value = date.toUTCString();
    });
})();

sub1.onclick = () => {
    address.style.display = "none";
    details.style.display = "flex";
    
    
    if (!sub1.classList.contains("active")) {
        sub1.classList.add("active");        
    }

    if (sub2.classList.contains("active")) {
        sub2.classList.remove("active"); 
    }

}


sub2.onclick = () => {
    address.style.display = "flex";
    details.style.display = "none";
    
    
    if (!sub2.classList.contains("active")) {
        sub2.classList.add("active");        
    }

    if (sub1.classList.contains("active")) {
        sub1.classList.remove("active"); 
    }

}