const mealRandomImgContainer = document.querySelector(".randommeal_container_general_img img");
const mealRandomTitleContainer = document.querySelector(".randommeal_container_general_fav h2");
const btnRandomMeal = document.querySelector(".randommeal_container_general_img button");
const btnFav = document.querySelector(".randommeal_container_general_fav button");
const btnFavIcon = document.querySelector(".randommeal_container_general_fav button i");
const historyContainer = document.querySelector(".history_container");
const informationHistoryContainer = document.querySelector(".informationhistory_container"); 
const btnOpenSideBar = document.querySelector(".header_container_menu button");
const sideBarContainer = document.querySelector(".sidebarcontainer");
const btnCloseSideBar = document.querySelector(".sidebarcontainer_header button");
const btnSideBarListLi = document.querySelector(".sidebarcontainer_menu_list li");
const headerSearchFind = document.querySelector(".header_container_searchmeal");
const btnSearch = document.querySelector(".header_container_search button"); 
const btnCloseSearch = document.getElementById("closeSearch");
const btnFindSearch = document.getElementById("findSearch");
const textSearch = document.querySelector(".header_container_searchmeal h2");

 
let mealStatus = false;
let searchStatus = false;


const getMeals = async ()=>{

    let randomMeal = await axios("https://www.themealdb.com/api/json/v1/1/random.php");

    randomMealData = randomMeal.data.meals[0];

    addMeal(randomMealData)
}

getMeals();
resetFavMeal();

function addMeal (randomMeal){

    mealRandomImgContainer.setAttribute("src", `${randomMeal.strMealThumb}`);
    mealRandomTitleContainer.textContent = `${randomMeal.strMeal}`;

}

function addToLocalStorage(id, title, instructions, img){
    console.log("added to local storage");

    const historydivs = document.querySelectorAll(".divhistory");
   
    const mealItem = {id: id, title:title, instructions: instructions, img: img};

    let itemsMeal = getLocalStorage(); 

    if (itemsMeal.length == 0){
        itemsMeal.push(mealItem);
        localStorage.setItem("list", JSON.stringify(itemsMeal));
        addFavMeal(mealItem);

    } else {
            
        for(i = 0; i < itemsMeal.length; i++){

            if (mealItem.id == itemsMeal[i].id){
                mealStatus = true;
            }
        }

        if (mealStatus == false) {
            itemsMeal.push(mealItem);
            localStorage.setItem("list", JSON.stringify(itemsMeal));
            addFavMeal(mealItem);

        } else {
            
            itemsMeal = itemsMeal.filter(function(item){
                if(item.id !== id){
                    return item;
                }
            })

            historydivs.forEach(function(history){
                if (history.id === mealItem.title){
                    history.remove();
                }
            });

            localStorage.setItem("list", JSON.stringify(itemsMeal));

            mealStatus = false;
        }

    }

}

function getLocalStorage(){
    return localStorage.getItem("list")?JSON.parse(localStorage.getItem("list")):[];
}


function resetFavMeal(){

    let itemsMeal = getLocalStorage(); 

    for (let i = 0; i < itemsMeal.length; i++){
        historyContainer.innerHTML += `
        <div class="divhistory" id="${itemsMeal[i].title}">
            <img src="${itemsMeal[i].img}" alt="${itemsMeal[i].title}">
            <h3>${itemsMeal[i].title}</h3>
        </div>
        `
    }

    const historydivs = document.querySelectorAll(".divhistory");
    const historydivsImgs = document.querySelectorAll(".divhistory img");

    historydivsImgs.forEach(function(img){
        img.addEventListener("click", ()=>{
            img.style.border = ".2rem solid rgba(255, 77, 0, 0.204)";

            let itemsMeal = getLocalStorage();



            for(let i = 0; i < itemsMeal.length; i++){
                if (img.alt === itemsMeal[i].title){

                    informationHistoryContainer.classList.add("open-info");

                    informationHistoryContainer.innerHTML = `
                    
                    <h2>${itemsMeal[i].title}</h2>

                    <img src="${itemsMeal[i].img}" alt="${itemsMeal[i].title}">
        
                    <p>${itemsMeal[i].instructions}</p>
        
                    <button type="button" id="close">CLOSE</button>
        
                    <button type="button" id="desfav">UNFAV</button>
        
                    
                    `;


                    const btnClose = document.getElementById("close");
                    const btnDesFav = document.getElementById("desfav");

                    btnClose.addEventListener("click", ()=>{
                        informationHistoryContainer.innerHTML = "";
                        informationHistoryContainer.classList.remove("open-info");
                    });

                    btnDesFav.addEventListener("click", ()=>{

                        historydivs.forEach(function(history){
                            console.log(itemsMeal)
                            if (history.id === itemsMeal[i].title){
                                history.remove();
                            }
                        });

        
                        itemsMeal = itemsMeal.filter(function(item){
                            if(item.id !== itemsMeal[i].id){
                                return item;
                            }
                        })
            

            
                        localStorage.setItem("list", JSON.stringify(itemsMeal));
            
                        mealStatus = false;
        
                        btnFavIcon.classList.remove("newfav");

                    });
                }
            }
        });
    });


}

function addFavMeal(mealItem){

    historyContainer.innerHTML += `
    <div class="divhistory" id="${mealItem.title}">
        <img src="${mealItem.img}" alt="${mealItem.title}">
        <h3>${mealItem.title}</h3>
    </div>
    `

    const historydivs = document.querySelectorAll(".divhistory");
    const historydivsImgs = document.querySelectorAll(".divhistory img");

    historydivsImgs.forEach(function(img){
        
        img.addEventListener("click", ()=>{

            img.style.border = ".2rem solid rgba(255, 77, 0, 0.204)";

            let itemsMeal = getLocalStorage(); 

            for(let i = 0; i < itemsMeal.length; i++){
                if (img.alt === itemsMeal[i].title){

                    informationHistoryContainer.classList.add("open-info");

                    informationHistoryContainer.innerHTML = `
                    
                    <h2>${itemsMeal[i].title}</h2>

                    <img src="${itemsMeal[i].img}" alt="${itemsMeal[i].title}">
        
                    <p>${itemsMeal[i].instructions}</p>
        
                    <button type="button" id="close">CLOSE</button>
        
                    <button type="button" id="desfav">UNFAV</button>
        
                    
                    `;

                    const btnClose = document.getElementById("close");
                    const btnDesFav = document.getElementById("desfav");

                    btnClose.addEventListener("click", ()=>{
                        informationHistoryContainer.innerHTML = "";
                        informationHistoryContainer.classList.remove("open-info");
                    });

                    btnDesFav.addEventListener("click", ()=>{
        
                        historydivs.forEach(function(history){
                            if (history.id === itemsMeal[i].title){
                                history.remove();
                            }
                        });

                        itemsMeal = itemsMeal.filter(function(item){
                            if(item.id !== itemsMeal[i].id){
                                return item;
                            }
                        })
            
            
                        localStorage.setItem("list", JSON.stringify(itemsMeal));
            
                        mealStatus = false;
        
                        btnFavIcon.classList.remove("newfav");
        
        
                    });
        
                }
            }




        });

    });



}

const getSearchMeal = async (inputValueSearch)=>{
    let httpRequest = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValueSearch}`);
    let resultHttpRequest = await httpRequest.json()
    .then(res =>{
        if (res) {
            Promise.resolve(res)
            searchStatus = true;
            finalResultMeal = res.meals[0];
            textSearch.innerHTML = `I find <span>${inputValueSearch}</span> in my DB ✅. <br>
            I update your information in the main repository, close this window.`
            document.querySelector(".header_container_searchmeal h2 span").style.color = "green";
            addMeal(finalResultMeal);
        }
        else{
            Promise.reject(res)
        } 
    }).catch(e => {
        console.log("Error", e);
        textSearch.innerHTML = `I couldnt find <span>${inputValueSearch}</span> in my DB 😔.`
        document.querySelector(".header_container_searchmeal h2 span").style.color = "red";
    });

}


btnRandomMeal.addEventListener("click", ()=>{

    btnFavIcon.classList.remove("newfav");
    mealStatus = false;
    searchStatus = false;
    randomMealData = "";
    finalResultMeal = "";
    getMeals();
});

btnFav.addEventListener("click", ()=>{
    
    btnFavIcon.classList.toggle("newfav");

    if (searchStatus == false){
        addToLocalStorage(randomMealData.idMeal, randomMealData.strMeal, randomMealData.strInstructions, randomMealData.strMealThumb);
        searchStatus == false;
    } else {
        addToLocalStorage(finalResultMeal.idMeal, finalResultMeal.strMeal, finalResultMeal.strInstructions, finalResultMeal.strMealThumb);
        searchStatus == false;
    }


});

btnOpenSideBar.addEventListener("click", ()=>{

    sideBarContainer.classList.add("open-sidebar");

});

btnCloseSideBar.addEventListener("click", ()=>{

    sideBarContainer.classList.remove("open-sidebar");

});


btnSideBarListLi.addEventListener("click", ()=>{
    
    let itemsMeal = getLocalStorage(); 

    if (itemsMeal.length > 0){
        itemsMeal = [];
        localStorage.setItem("list", JSON.stringify(itemsMeal));
        historyContainer.innerHTML = "";
        btnFavIcon.classList.remove("newfav");
        mealStatus = false;
    }

});

btnSearch.addEventListener("click", ()=>{

    headerSearchFind.classList.add("show-search");

});

btnCloseSearch.addEventListener("click", ()=>{
    document.querySelector(".header_container_searchmeal input").value = "";

    textSearch.innerHTML = ``;

    headerSearchFind.classList.remove("show-search");

});

btnFindSearch.addEventListener("click", ()=>{

    const inputValueSearch = document.querySelector(".header_container_searchmeal input").value;

    btnFavIcon.classList.remove("newfav");
    mealStatus = false;

    getSearchMeal(inputValueSearch);
});


