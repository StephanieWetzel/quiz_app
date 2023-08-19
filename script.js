let questions = [
    {
        "question": "Was bedeutet fps?",
        "answer_1": "free pocket space",
        "answer_2": "for permanent static",
        "answer_3": "frames per second",
        "answer_4": "final phasing stage",
        "right_answer": 3
    },
    {
        "question": "Was ist ein Bot?",
        "answer_1": "Spülmaschinentab",
        "answer_2": "Roboter",
        "answer_3": "Rakete",
        "answer_4": "Waschmittel",
        "right_answer": 2
    },
    {
        "question": "Wofür steht die Abkürzung afk?",
        "answer_1": "away from kitchen",
        "answer_2": "away from keyboard",
        "answer_3": "away from kid",
        "answer_4": "away from kill",
        "right_answer": 2
    },
    {
        "question": "Was ist ein Bug?",
        "answer_1": "Insekt",
        "answer_2": "Auto",
        "answer_3": "Schiffsvorderteil",
        "answer_4": "Fehler",
        "right_answer": 4
    },
    {
        "question": "Die Abkürzung gg steht für...?",
        "answer_1": "good game",
        "answer_2": "good god",
        "answer_3": "good gear",
        "answer_4": "good grace",
        "right_answer": 1
    },
    {
        "question": "Was ist eine Hitbox?",
        "answer_1": "Geschenkebox",
        "answer_2": "Musikspieler",
        "answer_3": "Kollisionsbereich",
        "answer_4": "Boxring",
        "right_answer": 3
    },
    {
        "question": "Was macht ein Camper?",
        "answer_1": "Die Natur genießen.",
        "answer_2": "Ein Zelt aufschlagen.",
        "answer_3": "Abwarten (und Tee trinken.)",
        "answer_4": "Lagerfeuerlieder singen.",
        "right_answer": 3
    },
    {
        "question": "Ein Easter Egg bedeutet...?",
        "answer_1": "Frohe Ostern!",
        "answer_2": "Mahlzeit!",
        "answer_3": "Fröhliche Weihnachten!",
        "answer_4": "Überraschung!",
        "right_answer": 4
    }
];

let answerSelected = false;
let rightQuestions = 0;
let currentQuestion = 0;
let AUDIO_SUCCESS = new Audio('audio/success.mp3');
let AUDIO_FAILURE = new Audio('audio/failure.mp3');


function init() {
    document.getElementById('questions-length').innerHTML = questions.length;
    showQuestion();
}


function startGame() {
    document.getElementById('play-screen').style = '';
    document.getElementById('start-screen').style = 'display: none';
    document.getElementById('header-img').src = './img/playscreen.jpg';
    document.getElementById('progress').style = ''; // progress-bar becomes visible
}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}


// START: belongs to showQuestion()
function gameIsOver() {
    return currentQuestion >= questions.length;
}


function showEndScreen() {
    document.getElementById('end-screen').style = '';
    document.getElementById('play-screen').style = 'display: none';
    document.getElementById('all-questions').innerHTML = questions.length;
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions;
    document.getElementById('header-img').src = './img/endscreen.jpg';
    // sets progress-bar to 100%:
    document.getElementById('progress-bar').innerHTML = '100 %';
    document.getElementById('progress-bar').style.width = '100%';
}


function updateProgressBar() {
    let percent = currentQuestion / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent} %`;
    document.getElementById('progress-bar').style.width = `${percent}%`;
}


function updateToNextQuestion() {
    let question = questions[currentQuestion];
    document.getElementById('current-question').innerHTML = currentQuestion + 1;
    // replaces static code with JSON-Elements:
    document.getElementById('question').innerHTML = question['question'];
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}
// END: belongs to showQuestion()


function answer(selection) {
    if (answerSelected) {
        return;
    }
    // function stops here if an answer has already been selected
    answerSelected = true;

    let question = questions[currentQuestion];
    let selectedAnswerNumber = selection.slice(-1);
    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedAnswerNumber, question)) {
        success(selection);
    } else {
        failure(selection, idOfRightAnswer);
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedAnswerNumber, question) {
    return selectedAnswerNumber == question['right_answer'];
}


function success(selection) {
    document.getElementById(selection).parentNode.style.backgroundColor = '#5FEB08';
    AUDIO_SUCCESS.play();
    rightQuestions++;
}


function failure(selection, idOfRightAnswer) {
    document.getElementById(selection).parentNode.style.backgroundColor = '#FF1749';
    document.getElementById(idOfRightAnswer).parentNode.style.backgroundColor = '#5FEB08';
    AUDIO_FAILURE.play();
}


function nextQuestion() {
    answerSelected = false; // reactives answer buttons
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();
}


function resetAnswerButtons() { // removes background-colors
    document.getElementById('answer_1').parentNode.style = '';
    document.getElementById('answer_2').parentNode.style = '';
    document.getElementById('answer_3').parentNode.style = '';
    document.getElementById('answer_4').parentNode.style = '';
}


function restartGame() {
    document.getElementById('header-img').src = './img/startscreen.jpg';
    document.getElementById('end-screen').style = 'display: none';
    document.getElementById('start-screen').style = '';
    document.getElementById('progress').style = 'display: none;';
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}