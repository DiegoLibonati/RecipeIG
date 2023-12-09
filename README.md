# Recipe-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

I made a recipe page. In this page you will be able to search for meals randomly, these searches are given thanks to an API (THE MEAL DB). When you put likes, they will appear at the top in the form of instagram story, if you click on the image you can see the instructions to make that meal or take it out of stories.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Portfolio Link

[`https://www.diegolibonati.com.ar/#/project/44`](https://www.diegolibonati.com.ar/#/project/44)

## Video

https://user-images.githubusercontent.com/99032604/199377428-bda0c1fe-efa9-4d4c-bde3-b4d389187dae.mp4

## Documentation

Here we obtain all the containers that we are going to use to render the information:

```
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
```

With the `getMeals()` function we are going to get a random meal from the API that we use to collect information:

```
const getMeals = async ()=>{

    let randomMeal = await axios("https://www.themealdb.com/api/json/v1/1/random.php");

    randomMealData = randomMeal.data.meals[0];

    addMeal(randomMealData)
}
```

With the `addMeal()` function we will add the random food to the containers to render it:

```
function addMeal (randomMeal){

    mealRandomImgContainer.setAttribute("src", `${randomMeal.strMealThumb}`);
    mealRandomTitleContainer.textContent = `${randomMeal.strMeal}`;

}
```

With the `addToLocalStorage()` function we will add the food we selected to the LocalStorage:

```
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
```

With the `getLocalStorage()` function we will get the localStorage information:

```
function getLocalStorage() {
  return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    : [];
}
```

With the `resetFavMeal()` function we will render all meals if they exist from the LocalStorage:

```
function resetFavMeal() {
  let itemsMeal = getLocalStorage();

  for (let i = 0; i < itemsMeal.length; i++) {
    historyContainer.innerHTML += `
        <div class="divhistory" id="${itemsMeal[i].title}">
            <img src="${itemsMeal[i].img}" alt="${itemsMeal[i].title}">
            <h3>${itemsMeal[i].title}</h3>
        </div>
        `;
  }

  const historydivs = document.querySelectorAll(".divhistory");
  const historydivsImgs = document.querySelectorAll(".divhistory img");

  historydivsImgs.forEach(function (img) {
    img.addEventListener("click", () => {
      img.style.border = ".2rem solid rgba(255, 77, 0, 0.204)";

      let itemsMeal = getLocalStorage();

      for (let i = 0; i < itemsMeal.length; i++) {
        if (img.alt === itemsMeal[i].title) {
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

          btnClose.addEventListener("click", () => {
            informationHistoryContainer.innerHTML = "";
            informationHistoryContainer.classList.remove("open-info");
          });

          btnDesFav.addEventListener("click", () => {
            historydivs.forEach(function (history) {
              console.log(itemsMeal);
              if (history.id === itemsMeal[i].title) {
                history.remove();
              }
            });

            itemsMeal = itemsMeal.filter(function (item) {
              if (item.id !== itemsMeal[i].id) {
                return item;
              }
            });

            localStorage.setItem("list", JSON.stringify(itemsMeal));

            mealStatus = false;

            btnFavIcon.classList.remove("newfav");
          });
        }
      }
    });
  });
}
```

With the `addFavMeal()` function we are going to add that food to the stories since we hit the heart, that is, to favorites:

```
function addFavMeal(mealItem) {
  historyContainer.innerHTML += `
    <div class="divhistory" id="${mealItem.title}">
        <img src="${mealItem.img}" alt="${mealItem.title}">
        <h3>${mealItem.title}</h3>
    </div>
    `;

  const historydivs = document.querySelectorAll(".divhistory");
  const historydivsImgs = document.querySelectorAll(".divhistory img");

  historydivsImgs.forEach(function (img) {
    img.addEventListener("click", () => {
      img.style.border = ".2rem solid rgba(255, 77, 0, 0.204)";

      let itemsMeal = getLocalStorage();

      for (let i = 0; i < itemsMeal.length; i++) {
        if (img.alt === itemsMeal[i].title) {
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

          btnClose.addEventListener("click", () => {
            informationHistoryContainer.innerHTML = "";
            informationHistoryContainer.classList.remove("open-info");
          });

          btnDesFav.addEventListener("click", () => {
            historydivs.forEach(function (history) {
              if (history.id === itemsMeal[i].title) {
                history.remove();
              }
            });

            itemsMeal = itemsMeal.filter(function (item) {
              if (item.id !== itemsMeal[i].id) {
                return item;
              }
            });

            localStorage.setItem("list", JSON.stringify(itemsMeal));

            mealStatus = false;

            btnFavIcon.classList.remove("newfav");
          });
        }
      }
    });
  });
}
```

With the `getSearchMeal()` function we are going to search through the search engine for a meal, whose name was typed by the user:

```
const getSearchMeal = async (inputValueSearch) => {
  let httpRequest = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputValueSearch}`
  );
  let resultHttpRequest = await httpRequest
    .json()
    .then((res) => {
      if (res) {
        Promise.resolve(res);
        searchStatus = true;
        finalResultMeal = res.meals[0];
        textSearch.innerHTML = `I find <span>${inputValueSearch}</span> in my DB ✅. <br>
            I update your information in the main repository, close this window.`;
        document.querySelector(
          ".header_container_searchmeal h2 span"
        ).style.color = "green";
        addMeal(finalResultMeal);
      } else {
        Promise.reject(res);
      }
    })
    .catch((e) => {
      console.log("Error", e);
      textSearch.innerHTML = `I couldnt find <span>${inputValueSearch}</span> in my DB 😔.`;
      document.querySelector(
        ".header_container_searchmeal h2 span"
      ).style.color = "red";
    });
};
```
