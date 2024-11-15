let uploadButton = document.querySelector('#upload-button');
let chosenImage = $('#chosen-image');
let fileName = $('#file-name');
let error = document.getElementsByClassName('upload-error');
let selectedImage = $('#img');
let imageDisplay = document.getElementsByClassName('image-display');
let imageContainer = document.getElementsByClassName('image-container');

let form = document.querySelector('form');


const fileHandler = (file, name, type, index) => {
    const imageSplit = type.split("/");
    if (imageSplit[0] !== "image") {
        error.item(index).innerHtml = "Please upload an image file";
        return false;
    }

    // if(imageSplit[1] !== 'jpg') {
    //     error.innerHTML = `${imageSplit[1]} is not acceppted type`;
    //     return false;
    // }
    
    error.item(index).innerHTML = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
        // image and file name
        // console.log(reader.result);
        const image =  document.createElement("img");
        image.src =  reader.result;
        image.id = "img";
        // image.css('opacity', '1');
        console.log(image.src);
        imageDisplay.item(index).appendChild(image);

        // for(let i = 0; i < imageDisplay.children.length; i++) {
        //     imageDisplay.children.item(i).src = reader.result; 

        // }
    
    }

}


function handleUplodedFiles(fileCount, files, index) {
    // override the current element with the uoloaded ones
    const container = imageDisplay.item(index);

        while(container.firstChild) {
        
            container.removeChild(container.firstChild);
        }

    console.log(Array.from(files).length);
    if (Array.from(files).length !== fileCount ) {
        error.item(index).innerHTML = `Only ${fileCount} file is allowed to be uploaded`;
        return;
    }
    error.item(index).innerHTML = " ";

    if (fileCount === 1) {
        const file = files[0];
        fileHandler(file, file.name, file.type, index);
    } else {
        let imagesStorege = [];
        Array.from(files).forEach((file, i) => {
            console.log(`name of file ${i}`, file.name);
            imagesStorege.push(file.name);
            fileHandler(file, file.name, file.type, index);
        });

        // Array.from(mapStorege.entries())
        localStorage.images = JSON.stringify(imagesStorege);
        console.log(localStorage.getItem('images'));
    }

}

// for(let i = 0; i < uploadButton.length; i++) {
//     uploadButton.item(i).addEventListener('change', () => {
//         let filesCount;
//         if (i == 0) // upload single image
//            filesCount = 1;
//         else if (i == 1)
//             filesCount = 4;
        
//         handleUplodedFiles(filesCount, uploadButton.item(i).files, index);
//     })
// }


// upload button
uploadButton.addEventListener('change', ()=> {
    handleUplodedFiles(1, uploadButton.files, 0);
});


// handle imageContiner events
for(let i = 0; i < imageContainer.length; i++) {
        imageContainer.item(i).addEventListener('dragenter',(e) => {
        e.preventDefault();
        e.stopPropagation();
        imageContainer.item(i).classList.add('active');
        console.log('drag enter');
    }, false);
    
    imageContainer.item(i).addEventListener('dragleave', (e) => {
        e.preventDefault();
        e.stopPropagation();
        imageContainer.item(i).classList.remove('active');
        console.log('drag leave');
    }, false);
    
    imageContainer.item(i).addEventListener('dragover',(e) => {
        e.preventDefault();
        e.stopPropagation();
        imageContainer.item(i).classList.add('active');
        console.log('drag over');
    }, false);
    
    
    imageContainer.item(i).addEventListener('drop', function(e) {
        e.preventDefault();
        e.stopPropagation();
        imageContainer.item(i).classList.remove('active');
        let dragedData = e.dataTransfer;
        let files = dragedData.files;
        
        console.log("draged files", files);
        // selectedImage.attr("src", "/images/no-image3.png");

        if(i == 0) {
            form.image.files = files;
        handleUplodedFiles(1, files, 0);
        console.log("form value:", form.image.value);

        } else {
            form.images.files = files;
            handleUplodedFiles(4, files, 1);
            console.log("form value:", form.images.value);
        }
    
    }, false);
}



$('document').on('load', () => {

    error.html("");
    selectedImage.attr('src', "/images/no-image3.png");
});
























// let uploadButton = document.getElementById('upload-button');
// let chosenImage = document.getElementById('chosen-image');
// let fileName = document.getElementById('file-name');
// let error = document.querySelector('.upload-error');
// let iamgeDisplay = document.getElementById('image-display');
// let image = document.getElementById('img');
// let imageContainer = document.querySelector('.image-container');


// const fileHandler = (file, name, type) => {
//     const imageSplit = type.split("/");
//     if (imageSplit[0] !== "image") {
//         error.innerHTML = "Please upload an image file";
//         return false;
//     }

//     // if(imageSplit[1] !== 'jpg') {
//     //     error.innerHTML = `${imageSplit[1]} is not acceppted type`;
//     //     return false;
//     // }


//     console.log(file, name, type);

//     error.innerHTML = "";
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//         // image and file name

//         // let imageContainer = document.createElement("figure");
//         // let img = document.createElement('img');

//         // img.src = reader.result;
//         // imageContainer.appendChild(img);
//         // imageContainer.innerHTML += `<figcaption>${name}</figcaption>`;
//         // iamgeDisplay.appendChild(imageContainer);

//         image.src = reader.result;
//         console.log(image.src);
//     }

// }


// // upload button

// uploadButton.addEventListener('change', () => {
//     // iamgeDisplay.innerHTML = "";
//     image.src = ".../../static/images/defaultimage.png";
//     console.log(Array.from(uploadButton.files).length);
//     if (Array.from(uploadButton.files).length > 1) {
//         error.innerHTML = "Only one file is allowed to be uploaded";
//         return;
//     }
//     Array.from(uploadButton.files).forEach(file => {
//         fileHandler(file, file.name, file.type);

//     })
// });


// imageContainer.addEventListener('dragenter',(e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     imageContainer.classList.add('active');
// }, false);

// imageContainer.addEventListener('dragleave', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     imageContainer.classList.remove('active');
// }, false);

// imageContainer.addEventListener('dragover',(e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     imageContainer.classList.add('active');
// }, false);


// imageContainer.addEventListener('drop', (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     imageContainer.classList.remove('active');
//     let dragedData = e.dataTransfer;
//     let files = dragedData.files;
//     // iamgeDisplay.innerHTML = "";
//     image.src = ".../../static/images/defaultimage.png"

//     console.log(Array.from(files).length);
//     if (Array.from(files).length > 1) {
//         error.innerHTML = "Only one file is allowed to be dropped";
//         return;
//     }
//     Array.from(files).forEach(file => {
//         fileHandler(file, file.name, file.type);
//     });
    
// }, false);


// window.onload = () => {

//     error.innerHTML = "";
//     image.src = ".../../static/images/defaultimage.png"

//     // let imageContainer = document.createElement("figure");
//     //     let img = document.createElement('img');

//         // img.src = ".../../static/images/defaultimage.png";
//         // imageContainer.appendChild(img);
//         // iamgeDisplay.appendChild(imageContainer);
// }


// const uploadImage = (file, type) => {
//     const imageSplit = type.split("/");
//     if (imageSplit[0] !== "image") {
//         error.html("Please upload an image file");
//         return false;
//     }

//     // if(imageSplit[1] !== 'jpg') {
//     //     error.innerHTML = `${imageSplit[1]} is not acceppted type`;
//     //     return false;
//     // }


//     // console.log(file, name, type, container);

//     error.innerHTML = "";
//     let reader = new FileReader();
//     reader.readAsDataURL(file);
//     reader.onloadend = () => {
//         // image and file name
//         // console.log(reader.result);
//         selectedImage.attr('src',  reader.result);
//         selectedImage.css('opacity', '1');
//     }
// };