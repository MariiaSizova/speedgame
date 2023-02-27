const startButton = document.querySelector(".button_start");
const chosenButtons = document.querySelectorAll(".circle");
const userResult = document.querySelector("#result_card");
const userResultFinal = document.querySelector("#result");
const overlay = document.querySelector(".overlay");
const closeButtonRules = document.querySelector(".btn-close__rules");
const overlayResult = document.querySelector("#overlay_text");
const overlayRules = document.querySelector(".overlay_rules");
const helperButton = document.querySelector(".helper");
const lives = document.querySelector(".lives");
const livesBug1 = document.querySelector(".bug_1");
const livesBug2 = document.querySelector(".bug_2");
const livesBug3 = document.querySelector(".bug_3");

let score = 0;
let level = 2;
let activeNumber = -1;
let pastActiveNumber;
let timer;
let startGameCounter = 0;

const enableCircles = () => {
  if (startButton.textContent === "Start") {
    startButton.textContent = "End";
    document.querySelector(".score_result").style.visibility = "visible";
    helperButton.style.display = "none";
    lives.style.display = "block";
    for (let i = 0; i < 4; i++) {
      chosenButtons[i].classList.remove("disabled_circle");
    }
    let audioStart = new Audio("sounds/game_start.wav");
    audioStart.play();
    setTimeout(startGame, 2200);
  } else {
    startButton.textContent = "Start";
    let audioEnd = new Audio("sounds/game_over.wav");
    audioEnd.play();
    setTimeout(endGame, 1000);
  }
};

const randomNumber = (min, max) => {
  do {
    activeNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (activeNumber === pastActiveNumber);
  pastActiveNumber = activeNumber;
  changingButton(activeNumber);
  return activeNumber;
};

const changingButton = (activeNumber) => {
  for (let i = 0; i < 4; i++) {
    chosenButtons[i].classList.remove("main_circle");
  }
  let id = activeNumber - 1;
  chosenButtons[id].classList.add("main_circle");
};

const startGame = () => {
  startGameCounter += 1;
  activeNumber = randomNumber(1, 4);
  function pickNew() {
    timer = setTimeout(startGame, level * 1000);
    if (score <= 3) {
      level = 2;
    } else if (score >= 4 && score <= 7) {
      level = 1.5;
    } else if (score >= 8 && score <= 12) {
      level = 1;
    } else if (score >= 13 && score <= 20) {
      level = 0.8;
    } else {
      level = 0.5;
    }
    return level, timer;
  }
  pickNew();
  if (startGameCounter - score >= 4) {
    endGame();
  } else if (startGameCounter - score == 2) {
    livesBug3.style.color = "#2bc8401a";
  } else if (startGameCounter - score == 3) {
    livesBug2.style.color = "#febc2e1a";
  } else if (startGameCounter - score == 4) {
    livesBug1.style.color = "#fe5f581a";
  }
};

const clickCircle = (i) => {
  let buttonIndex = i + 1;
  checkingTheCircle(buttonIndex, activeNumber);
};

const checkingTheCircle = (buttonIndex, activeNumber) => {
  if (buttonIndex === activeNumber) {
    let audio = new Audio("sounds/click.wav");
    audio.play();
    score += 1;
    userResult.innerText = score;
    userResultFinal.innerText = score;
  } else {
    chosenButtons[buttonIndex - 1].classList.add("wrong_circle");
    setTimeout(endGame, 500);
  }
};

const endGame = () => {
  lives.style.display = "none";
  clearTimeout(timer);

  let audio = new Audio("sounds/game_end.wav");
  audio.play();

  if (score === 0) {
    overlayResult.innerText = `Oops! You need to learn how to catch bugs! You can do it!`;
  } else if (score >= 20) {
    overlayResult.innerText = `Wow, you are a professional debugger! Nice job!`;
  } else {
    overlayResult.innerText = `You can catch our bugs! Try again!`;
  }
  overlay.classList.add("visible");
  const closeButton = document.querySelector(".btn-close");
  closeButton.addEventListener("click", resetGame);
};

const resetGame = () => {
  location.reload();
};

const rulesFunction = () => {
  overlayRules.classList.add("visible");
  closeButtonRules.addEventListener("click", resetGame);
};

startButton.addEventListener("click", enableCircles);
chosenButtons.forEach((button, i) =>
  button.addEventListener("click", () => clickCircle(i))
);
helperButton.addEventListener("click", () => rulesFunction());
