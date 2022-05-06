const openDrop = document.querySelector(".drop-cont .fa-solid");
const drop = document.querySelector(".drop-cont .drop");
const dropChoices = document.querySelectorAll(".drop li");
const allCountriesCont = document.querySelector(".all-countries-cont")
const darkBtn = document.querySelector(".background-light-btn");
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

const darkModeArray = [body,inputCont,dropWrap,header,drop,wrap,input,searchButton,lightIcon,darkIcon]
//PAGE LINK https://restcountries.com/#api-endpoints-v2


//EventListeners

searchButton.addEventListener("click",(e)=>{
    e.preventDefault()
    searchCountry()
})


openDrop.addEventListener("click",(e)=>{
    drop.classList.toggle("drop-active");
    openDrop.classList.toggle("rotate");
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

//It checks if the darkmode button hass the dark-mode  
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
        //EventListener
        choice.addEventListener("click",()=>{
            allCountriesCont.innerHTML = "";
            let value = choice.getAttribute("value");

            data.forEach(data=>{
                if(data.region === value){
                    createHtml(data,allCountriesCont)
                }

                darkBackground(allCountriesCard)
            })
        })
    })

}

async function cardClickEvent(e){
    e = e || window.event;
    e.preventDefault()

    //Check if the image was cliked
    if(e.target){
    const countryName = e.target.getAttribute("value");
    const dataFetch = await fetch(`https://restcountries.com/v2/name/${countryName}`);
    const data = await dataFetch.json();
    
    data.forEach(datas=>{
        // allCountriesCont.innerHTML = " ";
        
        //Create html for country info page 
        const html = `<div class="country-info-cont">
                        <div class="img-cont">
                            <img src="${datas.flags.png}" alt="${datas.name} flag image"/>
                        </div>
                        <div class="info-container">
                            <h1>${datas.name}</h1>
                            <div class="list-info">
                                <div class="list-cont1">
                                    <h2>Native Name:<p>${datas.nativeName}</p></h2>
                                    <h2>Population:<p>${datas.population}</p></h2>
                                    <h2>Region:<p>${datas.region}</p></h2>
                                    <h2>Sub Region:<p>${datas.subregion}</p></h2>
                                    <h2>Capital:<p>${datas.capital}</p></h2>
                                </div>
                                <div class="list-cont2">
                                    <h2>Top Level Domain:<p>${datas.topLevelDomain}</p></h2>
                                    <h2>Currencies:<p>${datas.currencies.map(currencie=>currencie.name)}</p></h2>
                                    <h2>Languages:<p>${datas.languages.map(language=>language.name)}</p></h2>
                                </div>
                            </div>
                        </div>
                      </div>`
                      console.log(datas)
                      console.log(html)
    
    })

    }else{
        false
    }
 }

 

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
                                 <p>${data.population}</p>
                            </div>
                            <div class="text">
                                <h3>Region:</h3>
                                <p>${data.region}</p>
                            </div>
                            <div class="text">
                                <h3>Capital:</h3>
                                <p>${data.capital}</p>
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

async function searchCountry(){
    const dataFetch = await fetch(`https://restcountries.com/v2/name/${input.value}`);
    const data = await dataFetch.json();
    
    if(input.value !== ""){
        allCountriesCont.innerHTML = "";
        data.forEach(datas=>{
            createHtml(datas,allCountriesCont)
            darkBackground(allCountriesCard)
        })
    }else{
        allCountriesCont.innerHTML = "";
        getAllCountries()
    }
}

async function cardInfo(){
    const dataFetch = await fetch(allUrl);
    const data = await dataFetch.json();

   Array.from(allCountriesCard).forEach(card=>{
       console.log(card[i])
   })

}

cardInfo()
searchCountry();
getAllCountries();
