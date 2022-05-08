const openDrop = document.querySelector(".drop-cont .fa-solid");
const drop = document.querySelector(".drop-cont .drop");
const dropChoices = document.querySelectorAll(".drop li");
const allCountriesCont = document.querySelector(".all-countries-cont")
const countryInfoWrap = document.querySelector(".country-info-wrap")
const darkBtn = document.querySelector(".background-light-btn");
const backBtn = document.querySelector(".back-btn-cont button");
const formCont = document.querySelector(".form-cont");
//Dark mode elements
// const allCountriesCard = document.querySelector(".all-countries-cont").children;
const allCountriesCard = document.querySelector(".all-countries-cont").children;
const body = document.querySelector("body");
const wrap = document.querySelector(".wrap")
const dropWrap = document.querySelector(".drop-wrap");
const inputCont = document.querySelector(".input-cont");
const input = document.querySelector(".search");
const searchButton = document.querySelector(".search-btn");
const lightIcon = document.querySelector(".light-icon");
const darkIcon = document.querySelector(".dark-icon");
const darkText = document.querySelector(".dark-text");
const header = document.querySelector("header");
const allUrl = "https://restcountries.com/v2/all";

const darkModeArray = [body,inputCont,dropWrap,header,drop,wrap,input,searchButton,lightIcon,darkIcon,backBtn]
//PAGE LINK https://restcountries.com/#api-endpoints-v2


//EventListeners



body.addEventListener("click",(e)=>{
    if(e.target !== openDrop){
        drop.classList.remove("drop-active")
        openDrop.classList.remove("rotate")
    }else{
        drop.classList.toggle("drop-active");
        openDrop.classList.toggle("rotate");
    }

})

searchButton.addEventListener("click",(e)=>{
    e.preventDefault()
    searchCountry()
})

backBtn.addEventListener("click",()=>{
    backBtn.classList.remove("show-back-btn")
    formCont.classList.remove("hide");
    countryInfoWrap.innerHTML="";
    allCountriesCont.classList.remove("hide-countries")
})



//Dark move button funtionality
darkBtn.addEventListener("click",()=>{
    darkBtn.classList.toggle("dark-mode");
    
    if(darkBtn.classList.contains("dark-mode")){
        darkText.innerHTML = "Light Mode";
    }else{
        darkText.innerHTML = "Dark Mode";
    }
    //Adding dark mode to an array of dom elements 
    darkModeArray.forEach(element =>{
        element.classList.toggle("dark-mode")
     })
     
    //Adding dark mode to all cards 
    for(let i = 0; i < allCountriesCard.length ;i++){
        allCountriesCard[i].classList.toggle("dark-mode")
    }

})


//Funtions//////////////////////////////////////////////////

//It checks if the darkmode button has the dark-mode  
//removes or adds dark-mode classes on items
function darkBackground(container){
    if(darkBtn.classList.contains("dark-mode")){
        for(let i = 0; i < container.length ;i++){
            container[i].classList.add("dark-mode")
        }                
    }
}



async function getAllCountries(){
    const dataFetch = await fetch(allUrl);
    const data = await dataFetch.json();

    data.forEach(data=>{
        createHtml(data,allCountriesCont)
        darkBackground(allCountriesCard);
    })

    //filtering by Region
    dropChoices.forEach(choice=>{
        //EventListener for drop down menu
        choice.addEventListener("click",()=>{
            allCountriesCont.innerHTML = "";
            countryInfoWrap.innerHTML="";
            let value = choice.getAttribute("value");

            data.forEach(data=>{
                if(data.region === value){
                    createHtml(data,allCountriesCont)
                }else if(value ==="All"){
                    createHtml(data,allCountriesCont)
                }

                darkBackground(allCountriesCard)
            })
        })
    })

}


//Getting card info, creating card info html and appending it to container
async function cardClickEvent(e){
    e = e || window.event;
    e.preventDefault()
    const countryName = e.target.getAttribute("value");

    if(countryName){
    //Check if the image was cliked
    const dataFetch = await fetch(`https://restcountries.com/v2/name/${countryName}`);
    const data = await dataFetch.json();
    
        data.forEach(datas=>{
            if(datas.name === countryName){
                allCountriesCont.classList.add("hide-countries")
                formCont.classList.add("hide");
                backBtn.classList.add("show-back-btn")
                //Create html for country info page 
                const html = `  <div class="img-cont">
                                    <img src="${datas.flags.png}" alt="${datas.name} flag image"/>
                                </div>
                                <div class="info-container">
                                    <h1>${datas.name}</h1>
                                    <div class="list-info">
                                        <div class="list-cont1">
                                            <h2>Native Name:<p>${checkIfData(datas.nativeName)}</p></h2>
                                            <h2>Population:<p>${separator(datas.population)}</p></h2>
                                            <h2>Region:<p>${checkIfData(datas.region)}</p></h2>
                                            <h2>Sub Region:<p>${checkIfData(datas.subregion)}</p></h2>
                                            <h2>Capital:<p>${checkIfData(datas.capital)}</p></h2>
                                        </div>
                                        <div class="list-cont2">
                                            <h2>Top Level Domain:<p>${checkIfData(datas.topLevelDomain)}</p></h2>
                                            <h2>Currencies:<p>${ifDataArray(datas.currencies)}</p></h2>
                                            <h2>Languages:<p>${ifDataArray(datas.languages)}</p></h2>
                                        </div>
                                    </div>
                                </div>
                                `
                                
                            const countryInfo = document.createElement("div")
                            countryInfo.classList.add("country-info-cont");
                            countryInfo.innerHTML = html;
                            countryInfoWrap.appendChild(countryInfo)
            }
                        
        })
    }
 }


//checking if array has data if not then display none
 function ifDataArray(data){
    if(typeof data === "undefined"){
       return "none"
    }else{
        return data.map(datas => datas.name)
    }
}

//Checking if it has the information if not then return a none text
function checkIfData(data){
    if(typeof data === "undefined"){
        return "none"
    }else{
        return data
    }
}


//Adding comas to number
 function separator(numb) {
    var str = numb.toString().split(".");
    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return str.join(".");
}
 

//creating html for all countries
 async function createHtml(data,container){   
    const html = `<div class="card" onClick="cardClickEvent()"> 
                    <div class="img-wrap">
                         <img src="${data.flags.png}" alt="${data.name} flag image" value="${data.name}"/>
                    </div>
                    <div class="info-wrap">
                        <div class="info-cont">
                            <h2>${data.name} </h2>
                            <div class="text">
                                 <h3>Population:</h3>
                                 <p>${separator(data.population)}</p>
                            </div>
                            <div class="text">
                                <h3>Region:</h3>
                                <p>${checkIfData(data.region)}</p>
                            </div>
                            <div class="text">
                                <h3>Capital:</h3>
                                <p>${checkIfData(data.capital)}</p>
                            </div>
                        </div
                    </div>
            </div>`
            //Create card, add html and append to container 
            const countryCard = document.createElement("div");
            countryCard.classList.add("country-card");
            countryCard.innerHTML = html;
            container.appendChild(countryCard);
}


//Search for country
async function searchCountry(){
    const dataFetch = await fetch(`https://restcountries.com/v2/name/${input.value}`);
    const data = await dataFetch.json();
    
    if(input.value !== ""){
        allCountriesCont.innerHTML = "";
        countryInfoWrap.innerHTML="";
        data.forEach(datas=>{
            createHtml(datas,allCountriesCont)
            darkBackground(allCountriesCard)
        })
    }else{
        allCountriesCont.innerHTML = "";
        countryInfoWrap.innerHTML="";
        getAllCountries()
    }
}




searchCountry();
getAllCountries();
