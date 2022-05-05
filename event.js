const openDrop = document.querySelector(".drop-cont .fa-solid");
const drop = document.querySelector(".drop-cont .drop");
const dropChoices = document.querySelectorAll(".drop li");
const allCountriesCont = document.querySelector(".all-countries-cont")
const darkBtn = document.querySelector(".background-light-btn");
//Dark mode elements
const allCountriesCard = document.querySelector(".all-countries-cont").children;
const body = document.querySelector("body");
const wrap = document.querySelector(".wrap")
const dropWrap = document.querySelector(".drop-wrap");
const inputCont = document.querySelector(".input-cont");
const input = document.querySelector(".search");
const searchButton = document.querySelector(".search-btn");
const header = document.querySelector("header");
const allUrl = "https://restcountries.com/v2/all";

const darkModeArray = [body,inputCont,dropWrap,header,drop,wrap,input,searchButton]
//PAGE LINK https://restcountries.com/#api-endpoints-v2


//EventListeners

searchButton.addEventListener("click",(e)=>{
    e.preventDefault()
    searchCountry()
})

openDrop.addEventListener("click",()=>{
    drop.classList.toggle("drop-active");
    openDrop.classList.toggle("rotate");
})


//Dark move button funtionality
darkBtn.addEventListener("click",()=>{
    darkBtn.classList.toggle("dark-mode");
    darkModeArray.forEach(element =>{
        element.classList.toggle("dark-mode")
     })
   
     
    for(let i = 0; i < allCountriesCard.length ;i++){
        allCountriesCard[i].classList.toggle("dark-mode")
    }

})



//Funtions//////////////////////////////////////////////////


async function getAllCountries(){
    const dataFetch = await fetch(allUrl);
    const data = await dataFetch.json();

    data.forEach(data=>{
        createHtml(data,allCountriesCont)
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


//If the dark mode fails on some items
function darkBackground(container){
    if(darkBtn.classList.contains("dark-mode")){
        for(let i = 0; i < container.length ;i++){
            container[i].classList.add("dark-mode")
        }                
    }
}


 function createHtml(data,container){   
    const html = `<div class="card"> 
                    <div class="img-wrap">
                         <img src="${data.flags.png}" alt="countrie flag">
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

searchCountry();
getAllCountries();
