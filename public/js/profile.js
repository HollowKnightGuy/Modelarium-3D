const profileSections = document.getElementsByClassName("profile-section");
const pLinks = document.getElementsByClassName("profile_link"); 


// FUNCIONALITY OF THE PROFILE SETTINGS
let lastclickedp
function changePState(s1, s2, s3, s4, s5){
    profileSections[0].style.display = s1;
    profileSections[1].style.display = s2;
    profileSections[2].style.display = s3;
    profileSections[3].style.display = s4;
    profileSections[4].style.display = s5;
    

    if(s1 !== "none"){
        changePLinktates(lastclickedp, 0);
    }
    else if(s2 !== "none"){
        changePLinktates(lastclickedp, 1);
    }
    else if(s3 !== "none"){
        changePLinktates(lastclickedp, 2);
    }
    else if(s4 !== "none"){
        changePLinktates(lastclickedp, 3);
    }
    else if(s5 !== "none"){
        changePLinktates(lastclickedp, 4);
    }
}

function changePLinktates(link, newlink){
    if(typeof link != "undefined"){
        link.classList.toggle("plink-clicked")
    }
    lastclickedp = pLinks[newlink];
    pLinks[newlink].classList.toggle("plink-clicked");
    
}