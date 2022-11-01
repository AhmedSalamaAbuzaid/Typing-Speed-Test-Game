// array of Words 

const Words = [
"Net",
"Web",
"Hang",
"Man",
"Women",
"Run",
"Fast",
"Hello",
"Good",
"Nice",
"Bad",
"Dog",
"Cat",
"Shazly",
"Alaa",
"Blanco",
"Kapo",
"Peter",
"Abdelghani",
"Moutaz",
"Hossam",
"Amr",
"Okab",
"Marinite",
"Mayada",
"Shimo",
"Karim",
"Sadany",
];
let choise = document.querySelector("#select");

// setting levels
const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
};

// defult Level name 
let defultLevelName = "Normal" ; //change level from here
let defultLevelSeconds = lvls[defultLevelName];
    
    
    
    // catch selectors 
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upComingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let msgHeader = document.querySelector(".message")
let choiseDiv = document.querySelector(".levels");




let score = "0";
let lastScore = window.localStorage.getItem("score");


// Setting Level Name + Secends + Score 
lvlNameSpan.innerHTML = defultLevelName;
secondsSpan.innerHTML = defultLevelSeconds;
timeLeftSpan.innerHTML = defultLevelSeconds;
scoreTotal.innerHTML = Words.length;

// disable paste Event
input.onpaste = function () {
    return false;
};

// start game 
startButton.onclick = function () {
    this.remove();
    input.focus();
    // generate Word function
    genWords();
}




function genWords() {
   
    // get random word from array 
    let randomWord = Words[Math.floor(Math.random()* Words.length)];
    // get word index
    let wordIndex = Words.indexOf(randomWord)

    // remove word from array 
    Words.splice(wordIndex,1);

    // show the random word
    theWord.innerHTML = randomWord;

    // Empty Upcoming Words
    upComingWords.innerHTML = '';

    // generate up coming words
    for (let i = 0 ; i < Words.length; i++) {
    //create div element
    let div = document.createElement("div");
    let txt = document.createTextNode(Words[i]);
    div.appendChild(txt);
    upComingWords.appendChild(div);
    }

    // call start play function 
    startPlay();

};


function startPlay() {
    timeLeftSpan.innerHTML= defultLevelSeconds;
    let start = setInterval(()=>{
        timeLeftSpan.innerHTML--;
        if(timeLeftSpan.innerHTML === "0"){
            // clearInterval
            clearInterval(start);
            if (input.value.toLowerCase() === theWord.innerHTML.toLowerCase()){
                // empty input field
                input.value = '';

                // increase score
                scoreGot.innerHTML++;

                // update score
                score = scoreGot.innerHTML;

                // save score after finished
                saveAfterFinished(score);



                // check first if remain words in array before yo call gen function
                if (Words.length > 0) {
                
                // call generate owrd function
                // generat new word
                genWords();
                } else {
                    let span = document.createElement("span");
                    span.className = 'good';
                    span.innerHTML= `<p>Dame! You'r F**king Good!</p> <br> <span> Your current score is :${scoreGot.innerHTML} <br>
                    Your last score is ${lastScore === null? "0": lastScore} </span>`;
                    
                    finishMessage.appendChild(span);
                    upComingWords.remove();
                    choiseDiv.remove();
                    msgHeader.remove();
                    theWord.remove();
                };

            } else {
                
                let span = document.createElement("span");
                span.className = 'bad';
                let scorText =
                `<span>Game Over</span> <br> <span> Your current score is :${scoreGot.innerHTML} <br>
                Your last score is ${lastScore === null? "0": lastScore} </span>`;
                span.innerHTML = scorText;
                finishMessage.appendChild(span);
                upComingWords.remove();
                choiseDiv.remove();
                msgHeader.remove();
                theWord.remove();
            };
        };
    }, 1000);

};


function saveAfterFinished(score) {
    window.localStorage.setItem("score",score);
    
};
