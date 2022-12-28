let alertMe = document.getElementById("alertMe");

// game user info
let container = document.getElementsByClassName("container")[0];
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

let audioBtn = document.getElementById("s-track");




function allUser() {
    // let hey = 0;
    let key, kName = {};
    for (let i = 0; i < localStorage.length; i++) {
        key = localStorage.key(i);
        kName = JSON.parse(localStorage.getItem(key));

        if (kName["toDel"]) {
            localStorage.removeItem(key);
            i--;
        }

    }

    // console.log("out hey ", hey);
}
/*
    To do:
        -save all the user in the local storage
        - if it exist the exit and print a message 
        - else add the user, with level, score adn timer to local storage, disable load
*/
function saveUser(e) {
    let getUser = username.value;

    let userScoreBar = {};

    if (getUser.length < 4) {
        let invFdb1 = document.getElementsByClassName("inv-fdb1")[0];
        displayInvalidMsg(invFdb1, 2);
        return;
    }


    for (let i = 0; i < localStorage.length; i++) {


        if (getUser == localStorage.key(i)) {

            let invFdb4 = document.getElementsByClassName("inv-fdb4")[0];
            displayInvalidMsg(invFdb4, 2);
            return;
        }
    }

    userScoreBar["uScore"] = 0;
    userScoreBar["uLevel"] = 1;
    userScoreBar["uTimer"] = timer;
    userScoreBar["isGameOver"] = "false";
    userScoreBar["toDel"] = "delUser";

    uLevel.innerHTML = userScoreBar["uLevel"];
    uScore.innerHTML = userScoreBar["uScore"];
    uTimer.innerHTML = userScoreBar["uTimer"];


    localStorage.setItem(getUser, JSON.stringify(userScoreBar));

    username.setAttribute("disabled", "");
    svBtn.setAttribute("disabled", "");
    ldBtn.setAttribute("disabled", "");
    newUBtn.removeAttribute("disabled");
    if (strGBtn.innerHTML == "Restart") strGBtn.innerHTML = "Start";


}

/*
    To do:
        - check if username is less than 4 print invalid message exit
        - if the useranme value is null then exit
        - parse the json file in a variable 
        - update the score bar 
        - disable button 
*/

function loadUser(e) {
    let userScoreBar;
    let getUser = username.value;
    if (getUser.length < 4) {
        let invFdb1 = document.getElementsByClassName("inv-fdb1")[0];
        displayInvalidMsg(invFdb1, 2);
        return;
    }

    if (localStorage.getItem(getUser) == null) {
        let invFdb2 = document.getElementsByClassName("inv-fdb2")[0];
        displayInvalidMsg(invFdb2, 2);
        // console.log("I am null");
        return;
    }

    // console.log("loaded ...");

    userScoreBar = JSON.parse(localStorage.getItem(getUser));

    uLevel.innerHTML = userScoreBar["uLevel"];
    uScore.innerHTML = userScoreBar["uScore"];
    uTimer.innerHTML = userScoreBar["uTimer"];
    username.setAttribute("disabled", "");
    svBtn.setAttribute("disabled", "");
    ldBtn.setAttribute("disabled", "");
    newUBtn.removeAttribute("disabled");

    if (userScoreBar["isGameOver"] == "true") {
        // console.log("restart me")
        strGBtn.innerHTML = "Restart";
        scr = 0;
        return;
    }
    // console.log("start me");
    strGBtn.innerHTML = "Start";

}



/*
enable username, loadbutton, savebutton
disbaled new user button 
*/
function newUser(event) {
    if (strGBtn.hasAttribute("disabled")) {
        let msgs = "Please, stop the game !!";
        clearInterval(interval);
        displayMsg(msgs);
        callSetInterval();
        return;
    }
    if (confirm("DO you want to add new user ?") == true) {

        username.removeAttribute("disabled");
        ldBtn.removeAttribute("disabled");
        svBtn.removeAttribute("disabled");
        newUBtn.setAttribute("disabled", "");
    }
    event.preventDefault();
}


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
    if (strGBtn.hasAttribute("disabled")) {
        let msgs = "Please, stop the game !!";
        clearInterval(interval);
        displayMsg(msgs);
        callSetInterval();
        return;
    }
    if (confirm("Do you want to delete users !?") == true) {
        // localStorage.clear();
        allUser();
        // console.log("All clearawsz");

        username.removeAttribute("disabled");
        svBtn.removeAttribute("disabled");
        ldBtn.removeAttribute("disabled");
        newUBtn.setAttribute("disabled", "");
        return;
    }

    event.preventDefault();


}



function displayMsg(msg) {
    alertMe.innerHTML = `<p>${msg}</p>`;
    alertMe.style.left = "0%";
    setTimeout(() => {
        alertMe.removeAttribute("style");
    }, 1200);
}

// 

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


function restartGame(isOver) {

    let getUser = username.value;
    let userScoreBar = JSON.parse(localStorage.getItem(getUser));

    userScoreBar["uScore"] = 0;
    userScoreBar["uLevel"] = 1;
    userScoreBar["uTimer"] = timer;
    userScoreBar["isGameOver"] = isOver;

    uLevel.innerHTML = userScoreBar["uLevel"];
    uScore.innerHTML = userScoreBar["uScore"];
    uTimer.innerHTML = userScoreBar["uTimer"];

    scr = 0;
    localStorage.setItem(getUser, JSON.stringify(userScoreBar));

    // console.log("Yeah i restarted");

}



function callSetInterval() {


    if (strGBtn.innerHTML == "Restart") {
        strGBtn.innerHTML = "Start";
        restartGame("false");
    }

    interval = setInterval(function () {

        if (counter == 0) {
            let userScoreBar = JSON.parse(localStorage.getItem(username.value));
            userScoreBar["isGameOver"] = "true";
            localStorage.setItem(username.value, JSON.stringify(userScoreBar));

            // console.log("Im 0");
            displayMsg("GAME OVER !!");
            clearInterval(interval);
            pseGBtn.setAttribute("disabled", "");
            stpGBtn.setAttribute("disabled", "");
            strGBtn.removeAttribute("disabled");
            ends = counter;
            counter = timer;
            uTimer.innerHTML = counter;
            // console.log("counter reset = ", timer);
            strGBtn.innerHTML = "Restart";

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


// display the invalid message for a period
function displayInvalidMsg(elmt, sec) {
    elmt.style.display = "block";
    sec *= 1000;
    setTimeout(() => {
        elmt.removeAttribute("style");
    }, sec);
}

let lvel;

function startGame(e) {
    if (!username.hasAttribute("disabled")) {
        invFdb3 = document.getElementsByClassName("inv-fdb3")[0];
        displayInvalidMsg(invFdb3, 3);
        // console.log("Username is empty !!");
        return;
    }
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
    // because the total card is 32
    if (level <= 16) {
        lvel = level;
    } else {
        lvel = 16;
    }

    deleteCards();
    createCards(lvel);
    // createCards(level);

    // generateCards(storeCards, storePosition, k);
    generateCards(cardSet, posSet, lvel);

}



let newLevel;

function startGames(event) {
    if (!username.hasAttribute("disabled")) {
        invFdb3 = document.getElementsByClassName("inv-fdb3")[0];
        displayInvalidMsg(invFdb3, 2);
        return;
    }
    // call interval
    strGBtn.setAttribute("disabled", "");
    pseGBtn.removeAttribute("disabled");
    stpGBtn.removeAttribute("disabled");
    ends = counter;
    checker = 0;

    callSetInterval();
    // audioBtn.setAttribute("autoplay", "true");
    // audioBtn.setAttribute("pause", "false");


    let cardSet = new Set(),
        posSet = new Set(),
        actualLvel = parseInt(uLevel.innerHTML);

    // set the limit of the actual level at 16 
    if (actualLvel <= 16) {
        console.log("new level set to actual level");
        newLevel = actualLvel;
    } else {
        newLevel = 16;
        console.log("new level set to 16");
    }

    console.log("delete all cards")
    deleteCards();

    console.log("Create crads !!");
    createCards(newLevel);

    console.log("Generate cards !");
    generateCards(cardSet, posSet, newLevel);
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
    uScore.innerHTML = parseInt(uScore.innerHTML) - scr;
    scr = 0; // reset the score to 0 after level and restart

}


/*
    To do:
        - create a function that adds cards automatically 
        - create a enumerator to mark each card with a num
        - create a funtion that deletes all cards
*/

let enumCard = 0; // enumerate cards

function createCards(num) {
    num *= 2;
    for (let i = 1; i <= num; i++) {
        enumCard++;

        gCont.innerHTML += `<div class="g-cards"> <div class="g-back"> <img > </div> <div class="g-front"> <h1 onclick="flipCard(this)">${enumCard}</h1> </div> </div>`
    }
}

//   This is one way to remove all children from a node

function deleteCards() {
    //  while gCont has children
    while (gCont.firstChild) {
        gCont.removeChild(gCont.firstChild);
        // console.log("remove");
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



function generateCards(card, pos, lvel) {
    let randCard, randPos, level;

    cardNum = (lvel * 2);
    // if (lvel <=3) {
    //     level = lvel;
    // } else {
    //     level = 4;
    //     cardNum = level*2 ;
    // }

    for (let i = 0; i < lvel; i++) {

        randCard = Math.floor(Math.random() * ((32 - 1) + 1) + 1);
        if (card.has(randCard)) {
            i--;
            // console.log("I aleady have: ", randCard);
        } else {
            // console.log("rand Card Just added: ", randCard);
            card.add(randCard);
        }

    }

    for (let i = 0; i < cardNum; i++) {


        randPos = Math.floor(Math.random() * (cardNum - 0) + 0);
        // check if the randPos exists
        if (pos.has(randPos)) {
            // decrement i
            i--;
            // console.log("I already have : ", i);
        } else {
            // add randPos to the pos
            // console.log("Position just added ", randPos);
            pos.add(randPos);
        }

    }

    arrCard = Array.from(card);
    arrPos = Array.from(pos);
    // if (arrCard && arrPos) {
    //     console.log("we exist hourah!");
    // }
    let k = 0;
    // iterate and add the html code
    for (let i = 0; i < arrCard.length; i++) {
        console.log(arrCard.length);
        // console.log(`${arrPos[k]}`);

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
let prevCardId, curCardId, checker = 0,
    scr = 0;


function flipCard(e) {

    if (pseGBtn.innerHTML == "Resume" || (pseGBtn.innerHTML == "Pause" && ends == 0) || (strGBtn.innerHTML == "Start" && !strGBtn.hasAttribute("disabled"))) {
        // console.log("Game is pause");
        return;
    }

    checker++;
    e.parentNode.classList.add("active");

    if (checker == 1) {
        prevCardId = e.parentNode.previousElementSibling;
        // console.log("checker = 1 ");
        return;

    } else {
        // console.log("checker = 2 ");
        curCardId = e.parentNode.previousElementSibling;
        checker = 0;
        // console.log(curCardId);
    }

    let prev = parseInt(prevCardId.getAttribute("data-card-id"));
    // console.log("prev : ", prev)
    let curr = parseInt(curCardId.getAttribute("data-card-id"));
    // console.log("curr:", curr)

    if (prev != curr) {
        // console.log("they dont much")
        setTimeout(() => {

            prevCardId.nextElementSibling.classList.remove("active");
            curCardId.nextElementSibling.classList.remove("active");
        }, 200);
        return;
    }

    // console.log("Yay the match !");
    matchImages.push(curr);
    scr += 10;
    uScore.innerHTML = parseInt(uScore.innerHTML) + 10;
    // if (matchImages.length == parseInt(uLevel.innerHTML)) {
    if (matchImages.length == parseInt(lvel)) {

        scr = 0;
        uLevel.innerHTML = parseInt(uLevel.innerHTML) + 1;
        saveScore();

        setTimeout(() => {
            // clearInterval(interval);
            stopGame(e);
            // alert("You won!!");
            displayMsg("YOU WIN !!");

            setTimeout(() => {
                startGame();
            }, 1500);
        }, 500);


    }
}



function saveScore() {
    let getUser = username.value;
    let userScoreBar = {};

    userScoreBar["uScore"] = uScore.innerHTML;
    userScoreBar["uLevel"] = uLevel.innerHTML;
    userScoreBar["uTimer"] = timer;
    userScoreBar["toDel"] = "delUser";

    localStorage.setItem(getUser, JSON.stringify(userScoreBar));

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