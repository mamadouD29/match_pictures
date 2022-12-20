// game user info

let username = document.getElementById("username");
let svBtn = document.getElementById("save-user"); // saveButton
let ldBtn = document.getElementById("load-user"); // load Button
let newUBtn = document.getElementById("new-user"); // new user button
let clrUBtn = document.getElementById("clear-all-users"); // clear users button

// score bar
let uScore = document.getElementById("u-score");
let uLevel = document.getElementById("u-level");
let uTimer = document.getElementById("u-timer");

// game commands 

let strGBtn = document.getElementById("start-game");
let pseGBtn = document.getElementById("pause-game");
let stpGBtn = document.getElementById("stop-game");


// game screen
let gCont = document.getElementsByClassName("g-content")[0];

let gBack = document.getElementsByClassName("g-back")[0];



// g info function

let storeUser = {};

function saveUser(e) {
    let keyName = {
        uName: "username"
    }

    let addUser = 0;
    let readLocalStorage;
    let getUser = username.value;


    if (getUser.length < 4) {
        document.getElementsByClassName("inv-fdb1")[0].style.display = "block";
        return;
    }
    /*
        To DO:

        compare username with the one in local storage
        store the keyname.uname to read storag
        if it exists, exit
        else set keyname uName to localkey  then increment adduser
        add username, score, level, and timer to the local  storage by using JSON.stringfy
        JSON.stringify() converts a value to JSON notation  representing it
    */

    for (let i = 0; i < localStorage.length; i++) {

        readLocalStorage = JSON.parse(localStorage.getItem(keyName.uName))
        if (getUser == readLocalStorage["uName"]) {
            console.log("please select another username");
            return;
        }
        addUser++;
        keyName.uName = localStorage.key(i);
    }

    if (addUser == 0) keyName["uName"] = "username";
    else keyName["uName"] = "username" + addUser;

    storeUser["uName"] = getUser;
    storeUser["uLevel"] = uLevel.innerHTML;
    storeUser["uScore"] = uScore.innerHTML;
    storeUser["uTimer"] = uTimer.innerHTML;

    localStorage.setItem(keyName.uName, JSON.stringify(storeUser));


    username.setAttribute("disabled", "");
    svBtn.setAttribute("disabled", "");
    ldBtn.setAttribute("disabled", "");
    newUBtn.removeAttribute("disabled");
}


function toStore() {
    let keyName = {
        uName: username.innerHTML
    }

    // storeUser["uName"] = getUser;
    storeUser["uLevel"] = uLevel.innerHTML;
    storeUser["uScore"] = uScore.innerHTML;
    storeUser["uTimer"] = uTimer.innerHTML;


    localStorage.setItem(keyName.uName, JSON.stringify(storeUser));


}

/*
    To Do:
    - create a variable that holds the value of username
    - create a variable that will read the localstorage 
    - create an object litteral
    - create a loop that will run the length of the local storage and increment the itertor. use the incrementer to set the object to the key at the end;
    - parse the value of local storage to with key the object to readlocalstorage.
    - inside the loop create a conditional statement that checks if getuser equals readlocalstorage with key uName. 

*/

function loadUser(e) {
    let getUser = username.value;
    let readLocalStorage;
    let keyName = {
        uName: "username"
    }

    for (let i = 0; i < localStorage.length; i++) {
        readLocalStorage = JSON.parse(localStorage.getItem(keyName.uName));

        if (getUser == readLocalStorage["uName"]) {
            username.setAttribute("disabled", "");
            ldBtn.setAttribute("disabled", "");
            svBtn.setAttribute("disabled", "");
            newUBtn.removeAttribute("disabled");


            uScore.innerHTML = readLocalStorage["uScore"];
            uLevel.innerHTML = readLocalStorage["uLevel"];
            uTimer.innerHTML = readLocalStorage["uTimer"];
            console.log("loaded");
        }

        keyName.uName = localStorage.key(i);
    }

}

/*
enable username, loadbutton, savebutton
disbaled new user button 
*/
function newUser(event) {
    if (confirm("DO you want to add new user ?") == true) {

        username.removeAttribute("disabled");
        ldBtn.removeAttribute("disabled");
        svBtn.removeAttribute("disabled");
        newUBtn.setAttribute("disabled", "");
    }
    event.preventDefault();
}

// if (gCont.children[0].children[0].className == gCont.children[1].children[0].className) {
//     console.log("yay we are equal")
// }

// if ()

/*
    To Do:
    - create a confirmation message
    - if yes 
        then clear or delete all users, enable username, 
        savebutton, load button, and disable new button
    - else
        do nothing 
*/

function clearAllUsers(event) {
    if (confirm("Do you want to delete users !?") == true) {
        localStorage.clear();
        console.log("All clear");

        username.removeAttribute("disabled");
        svBtn.removeAttribute("disabled");
        ldBtn.removeAttribute("disabled");
        newUBtn.setAttribute("disabled", "");
        return;
    }

    event.preventDefault();


}



// g commands

/*
    to do:
        - create a variable interval and function callSetInterval
        - check if counter = 0 then the function exit
        - that function will be call in start and decremnent counter every 1s; from counter value to 0;

        -  create a fnction callSetInterval
        - set interval to setInterval 
        - in the callback of setInterval 
            - if counter equals, clearInterval
                - disable pause, and stop button 
                - enable start button 
                - reinitialize counter and set the timer to counter  in the html
                - exit the function with return 
            - else decrement counter by 1
            - set timer in the html to counter
        - set second 1000 (1s) 
*/
let interval, counter = 30,
    ends = 20,
    timer = 30;

function callSetInterval() {
    interval = setInterval(function () {

        if (counter == 0) {
            console.log("Im 0");
            clearInterval(interval);
            pseGBtn.setAttribute("disabled", "");
            stpGBtn.setAttribute("disabled", "");
            strGBtn.removeAttribute("disabled");
            ends = counter;
            counter = timer;
            uTimer.innerHTML = counter;
            console.log("counter reset = 10");

            return;
        }
        counter--;
        uTimer.innerHTML = counter;
    }, 1000);

}

/*
    to do:
        - create function that do:
        - call the setinterval for timer 
        - disable the start, and enable pause and stop button
        - remove all content before create new acrds
        - call a function that generate random image in the cards create 


*/
// let k = 2;

function startGame(e) {
    callSetInterval();
    strGBtn.setAttribute("disabled", "");
    pseGBtn.removeAttribute("disabled");
    stpGBtn.removeAttribute("disabled");
    ends = counter;
    checker = 0;
    matchImages = [];
    // console.log(gBack.tagName());
    let cardSet = new Set(),
        posSet = new Set(),
        level = parseInt(uLevel.innerHTML);

    deleteCards();
    createCards(level);


    // generateCards(storeCards, storePosition, k);
    generateCards(cardSet, posSet, level);

}




/*
    To do: 
        - create pause function
        - create a condition that check
        - if if pause then clear interval, and change pause to resume
        - else callsetInterval to run the countdown and change to Pause
        
        - create a condition 
        - if counter reaches 0 then disabled Pause and stop and enable start
        - reset counter
*/

function pauseGame(e) {

    if (pseGBtn.innerHTML == "Pause") {
        clearInterval(interval);
        pseGBtn.innerHTML = "Resume";
    } else {
        callSetInterval();
        pseGBtn.innerHTML = "Pause";
    }

}


/*
    to do:
        - the function that call the setinterval 
        - disable the start, and enable pause and stop button
*/

function stopGame(e) {
    clearInterval(interval);
    strGBtn.removeAttribute("disabled");
    pseGBtn.setAttribute("disabled", "");
    stpGBtn.setAttribute("disabled", "");
    counter = timer;
    uTimer.innerHTML = counter;
    enumCard = 0;
    pseGBtn.innerHTML = "Pause";
}


/*
    To do:
        - create a function that adds cards automatically 
        - create a enumerator to mark each card with a num
        - create a funtion that deletes all cards
*/
// 2022-12-17 07:53:25 
let enumCard = 0;

function createCards(num) {
    num *= 2;
    for (let i = 1; i <= num; i++) {
        enumCard++;

        gCont.innerHTML += `<div class="g-cards"> <div class="g-back"> <img > </div> <div class="g-front"> <h1 onclick="flipCard(this)">${enumCard}</h1> </div> </div>`
    }
}

/*
    To do:
        This is one way to remove all children from a node
        
*/

function deleteCards() {
    //  while gCont has children
    while (gCont.firstChild) {
        gCont.removeChild(gCont.firstChild);
        console.log("remove");
    }
    enumCard = 0;
}

/*
    To do:
        - a function that will add images in the back cards
        - check the number of cards that will display according to the level;
        - use set to store unique generated number
        - use another set to store the position of the card
        - run a loop that will add the set to the 
*/


// storeArr = [];


function generateCard(card, Pos, lvel) {
    let randCard, randPos;
    for (let i = 0; i < lvel; i++) {

        if (card.size == lvel) {
            console.log(`Set size = ${lvel}`);
            break;
        }

        // get random number / 32
        randCard = Math.floor(Math.random() * ((32 - 1) + 1) + 1);

        console.log("Rand card : ", randCard);


        if (card.has(randCard)) {
            i--;
            console.log("Decr i : ", i);
        } else {
            card.add(randCard);
            // storeArr.push(randCard);
        }
    }
    // console.log("Rand pos : ", randPos);

    let cardNum = (lvel * 2);

    for (let i = 1; i <= cardNum; i++) {

        if (Pos.size == cardNum) break;

        randPos = Math.floor(Math.random() * ((cardNum - 1) + 1) + 1);

        if (Pos.has(randPos)) i--;
        else Pos.add(randPos);

    }

    // // Convert Set object to an Array object, with Array.from
    let arrCard = Array.from(card);
    let arrPos = Array.from(Pos);
    let k = 0;

    // gBack[0].children[0].src = "./rma2/"+ i + ".png";
    // for (let i = 0; i < arrCard.length; i++) {
    //     k = i;

    gCont.children[arrPos[k]].firstElementChild.firstElementChild.src = "./rma2/" + i + ".png";;
    gCont.children[arrPos[k + 1]].firstElementChild.firstElementChild.src = "./rma2/" + i + ".png";
}


/* 
    To do: 
        - create a function generate image in the g-back
        - c
*/

function generateCards(card, pos, lvel) {
    let randCard, randPos, cardNum = (lvel * 2);

    for (let i = 0; i < lvel; i++) {

        randCard = Math.floor(Math.random() * ((32 - 1) + 1) + 1);
        if (card.has(randCard)) {
            // decrement i
            i--;
            console.log("I aleady have: ", randCard);
        } else {
            // add randcard to card set
            console.log("rand Card Just added: ", randCard);
            card.add(randCard);
        }

    }

    for (let i = 0; i < cardNum; i++) {


        randPos = Math.floor(Math.random() * (cardNum - 0) + 0);
        // check if the randPos exists
        if (pos.has(randPos)) {
            // decrement i
            i--;
            console.log("I already have : ", i);
        } else {
            // add randPos to the pos
            console.log("Position just added ", randPos);
            pos.add(randPos);
        }

    }

    arrCard = Array.from(card);
    arrPos = Array.from(pos);
    if (arrCard && arrPos) {
        console.log("we exist hourah!");
    }
    let k = 0;
    // iterate and add the html code
    for (let i = 0; i < arrCard.length; i++) {

        console.log(`${arrPos[k]}`);

        // childre[arrPos[k++]] will get the cards
        // firstElementChild will get the g-back 
        // then the last firstElementChild will get the img

        // add data id to gback 
        gCont.children[arrPos[k]].firstElementChild.setAttribute("data-card-id", `${arrCard[i]}`);
        gCont.children[arrPos[k++]].firstElementChild.firstElementChild.setAttribute("src", `./rma2/${arrCard[i]}.png`);

        console.log(`${arrPos[k]}`);
        gCont.children[arrPos[k]].firstElementChild.setAttribute("data-card-id", `${arrCard[i]}`);

        gCont.children[arrPos[k++]].firstElementChild.firstElementChild.setAttribute("src", `./rma2/${arrCard[i]}.png`);
    }

}

/*
    To do:
        - create a function taht will rotate the front card by 90deg on y abciss
        - create an array that will record matching images with the number of level
        - create two variables(previous and current) to store the card id
        - if they match, then class active remain and add to array 
        - else remove the active using a settimeout to delay it

*/

let matchImages = [];
let prevCardId, curCardId, checker = 0;

function flipCard(e) {

    if (pseGBtn.innerHTML == "Resume" || (pseGBtn.innerHTML == "Pause" && ends == 0)) {
        console.log("Game is pause");

        return;
    }

    e.parentNode.classList.add("active");
    checker++;
    if (checker == 1) {
        prevCardId = e.parentNode.previousElementSibling;
        console.log("checker = 1 ");
        return;
    } else {
        console.log("checker = 2 ");
        curCardId = e.parentNode.previousElementSibling;
        checker = 0;
        console.log(curCardId);
    }

    let prev = parseInt(prevCardId.getAttribute("data-card-id"));
    console.log("prev : ", prev)
    let curr = parseInt(curCardId.getAttribute("data-card-id"));
    console.log("curr:", curr)

    if (prev != curr) {
        console.log("they dont much")

        setTimeout(() => {

            prevCardId.nextElementSibling.classList.remove("active");

            curCardId.nextElementSibling.classList.remove("active");
        }, 500);
        return;
    }

    console.log("Yay the match !");
    matchImages.push(curr);
    if (matchImages.length == parseInt(uLevel.innerHTML)) {
        // console.log("")

        setTimeout(() => {
            // clearInterval(interval);
            stopGame(e);
            alert("You won!!");


        }, 500);
        uLevel.innerHTML = parseInt(uLevel.innerHTML) + 1;
        toStore();


    }
}


//  previous, current , match to store, check
function imgValidator(prev, cur, match, check) {

}

//  g event listeners 

// g - info event listeners
svBtn.addEventListener("click", saveUser);
ldBtn.addEventListener("click", loadUser);
newUBtn.addEventListener("click", newUser);
clrUBtn.addEventListener("click", clearAllUsers);


// g - cmds event listerners

strGBtn.addEventListener("click", startGame);
pseGBtn.addEventListener("click", pauseGame);
stpGBtn.addEventListener("click", stopGame);




// 2022-12-17 07:51:51