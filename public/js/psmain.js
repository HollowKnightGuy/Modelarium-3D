
// PROFILE SETTINGS VARIABLES

const pslinks = document.getElementsByClassName("profsetlink");
const pssections = document.getElementsByClassName("profsetsection");

const psProfImg = document.getElementsByClassName("ps-prof-img")[0];
const psProfImgPencil = document.getElementById("pencil1");
const inputPSImg = document.getElementById("input-ps-img");

const psProfBanner = document.getElementsByClassName("ps-prof-banner")[0];
const psProfBannerPencil = document.getElementById("pencil2");
const inputPSBanner = document.getElementById("input-ps-banner");


const faqQuestions = document.querySelectorAll(".faq-question");


// PROFILE SETTINGS IMG HOVER EFFECT
psProfImg.addEventListener("mouseover", function(){
    psProfImgPencil.style.display = "block";
});
psProfImg.addEventListener("mouseout", function(){
    psProfImgPencil.style.display = "none";
});
psProfImg.addEventListener("click", function(){
    inputPSImg.click();
});



// PROFILE SETTINGS BANNER HOVER EFFECT
psProfBanner.addEventListener("mouseover", function(){
    psProfBannerPencil.style.display = "block";
});
psProfBanner.addEventListener("mouseout", function(){
    psProfBannerPencil.style.display = "none";
});
psProfBanner.addEventListener("click", function(){
    inputPSBanner.click();
});


faqQuestions.forEach(element => {
    element.addEventListener("click", function(){
        if(window.getComputedStyle(element.nextElementSibling).getPropertyValue('display') === "none"){
            element.lastElementChild.src = element.lastElementChild.src.split("down-arrow").join("up-arrow");
            element.nextElementSibling.style.display = "block";
        }else{
            element.lastElementChild.src = element.lastElementChild.src.split("up-arrow").join("down-arrow");
            element.nextElementSibling.style.display = "none";
        }
    })
});


