function turnOfDescription() {
    const hintCollection = document.getElementsByClassName("hint");
    if(document.getElementById("descriptionCheckbox").checked == false) {
        for (let i = 0; i < hintCollection.length; i++) {
            hintCollection[i].style.visibility = "hidden";
        }
    } else {
        for (let i = 0; i < hintCollection.length; i++) {
            hintCollection[i].style.visibility = "";
        }
    }
}

//counters score round 
let addRound = (function () {
    let counter = 0;
    return function () {counter += 1; return counter;}
  })();
let Addyour = (function () {
    let counter = 0;
    return function () {counter += 1; return counter;}
})();

let Addsheldon = (function () {
    let counter = 0;
    return function () {counter += 1; return counter;}
})();

function letsPlay(id) {
    reset();
    let numOfRounds = addRound();
    document.getElementById("round-number").innerHTML =  numOfRounds;

    let mychoice = document.getElementById(id).id;
    let myDivchoice = document.getElementById(id);
    const choices = document.getElementsByClassName("choice");

    //disabled function to prevent two or more simultaneously running function
    for (let i = 0; i < choices.length; i++){
       //choices[i].onclick = "";
    }

    //change color of user choice
    document.getElementById(id).style.color = "green";

    //blinking red color
    let intervalBlink = setInterval(blinkRedColor, 300);

    //get random cpu choice
    let randNum = Math.floor(Math.random() * 5);
    const cpuChoice = choices[randNum].id;

    //if not green blink red-white color
    function blinkRedColor() {
        for (let i = 0; i < choices.length; i++){
            if(choices[i].style.color != "green"){
                choices[i].style.color = choices[i].style.color == "white" ? "red" : "white";
            }
        }
    }
    setTimeout(() => {
        setChoicesToWhite();
        clearInterval(intervalBlink);
        //if tie set color to blue else to red
        if(cpuChoice == mychoice) {
            myDivchoice.style.color = "blue";
        } else {
            choices[randNum].style.color = "red";
        }
        //charts of message and winns
        const resultArr = whoWins(mychoice, cpuChoice);
        let score = resultArr[0];
        let message = resultArr[1];
        
        let sheldonScore;
        let yourScore;

        if(score == -1){ //you lose
            sheldonScore = Addsheldon();
            document.getElementById("cpu-score").innerHTML = sheldonScore;
            document.getElementById("message").style.color = "red";
            message = "Oh no!!! " + message;
        } else if(score == 1){ //you win
            yourScore = Addyour();
            document.getElementById("player-score").innerHTML = yourScore;
            document.getElementById("message").style.color = "green";
            message = "Yeah!!! " + message;
        } else { //tie score sheldon and you
            sheldonScore = Addsheldon();
            yourScore = Addyour();
            document.getElementById("cpu-score").innerHTML = sheldonScore;
            document.getElementById("player-score").innerHTML = yourScore;
            document.getElementById("message").style.color = "blue";
        }
        if(numOfRounds == 5){
            if(Addyour() > Addsheldon()) {
                message = "<br/> Congratulations, You Won!";
                document.getElementById("message").style.color = "green";
                document.getElementById("message").style.fontSize = "26px";
            } else if(Addyour() < Addsheldon()) {
                message = "<br/> You lose! Try again."
                document.getElementById("message").style.color = "red";
                document.getElementById("message").style.fontSize = "26px";
            } else {
                message = "<br/> It is a tie!";
                document.getElementById("message").style.color = "blue";
                document.getElementById("message").style.fontSize = "26px";
            }
            blockChocies();
            document.getElementById("again").style.display = "block";
            
        }
        document.getElementById("message").innerHTML = message;
        document.getElementById("message").style.display = "block";
        

    }, 2000);

}


function whoWins(player, sheldon){
    
    const scorboardObj = { 
        rock:     { rock: 0, paper: -1, scissors: 1, lizard: 1, spock: -1 }, 
        paper:    { rock: 1, paper: 0, scissors: -1, lizard: -1, spock: 1 }, 
        scissors: { rock: -1, paper: 1, scissors: 0, lizard: 1, spock: -1 },
        lizard:   { rock: -1, paper: 1, scissors: -1, lizard: 0, spock: 1 },
        spock:    { rock: 1, paper: -1, scissors: 1, lizard: -1, spock: 0 }
    }

    const messeageObj = { 
        rock:     { rock: "Tie", paper: "Paper covers rock", scissors: "Rock breaks scissors", lizard: "Rock crushes lizard", spock: "Spock vaporizes rock" }, 
        paper:    { rock: "Paper covers rock", paper: "Tie", scissors: "Scissors cut paper", lizard: "Lizard eats paper", spock: "Paper disproves Spock" }, 
        scissors: { rock: "Rock breaks scissors", paper: "Scissors cut paper", scissors: "Tie", lizard: "Scissors decapitate lizard", spock: "Spock melts scissors" },
        lizard:   { rock: "Rock crushes lizard", paper: "Lizard eats paper", scissors: "Scissors decapitate lizard", lizard: "Tie", spock: "Lizard poisons Spock" },
        spock:    { rock: "Spock vaporizes rock", paper: "Paper disproves Spock", scissors: "Spock melts scissors", lizard: "Lizard poisons Spock", spock: "Tie" }
    }

    let score = scorboardObj[player][sheldon];
    let message = messeageObj[player][sheldon];

    return[score, message];
}
function blockChocies() { 
    const choices = document.getElementsByClassName("choice");
    for (let i = 0; i < choices.length; i++){
        choices[i].disabled = true;
    }
}
function reset() {
    const choices = document.getElementsByClassName("choice");
    for (let i = 0; i < choices.length; i++){
        choices[i].style.color = "white";
        choices[i].disabled = true;
    }
    //set message to none 
    document.getElementById("message").innerHTML = "";
}
function setChoicesToWhite(){
    const choices = document.getElementsByClassName("choice");
    for (let i = 0; i < choices.length; i++){
        choices[i].disabled = false;
        choices[i].style.color = choices[i].style.color == "green" ? "green" : "white";
    }
}
function reload() { 
    location.reload();
}