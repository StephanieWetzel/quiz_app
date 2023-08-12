let questions = [
    {
        "question": "Was bedeutet FPS?",
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
        "question": "Die Abkürzung GG steht für...?",
        "answer_1": "Good Game",
        "answer_2": "Good God",
        "answer_3": "Good Gear",
        "answer_4": "Good Grace",
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
        "answer_3": "Abwarten und Tee trinken.",
        "answer_4": "Lagerfeuerlieder singen.",
        "right_answer": 3
    },
    {
        // Hier noch eine Antwort ausdenken
        "question": "Ein Easter Egg bedeutet...?",
        "answer_1": "Frohe Ostern!",
        "answer_2": "Mahlzeit!",
        "answer_3": "Fröhliche Weihnachten!",
        "answer_4": "Überraschung!",
        "right_answer": 4
    }
];


let currentQuestion = 0; // aktuelle Frage = 0


function init() {
    document.getElementById('questions-length').innerHTML = questions.length; // ersetzt die "8" in "1 von 8" mit einem dynamischen Wert (8 ist somit nicht mehr fix, sondern wird automatisch angepasst und entspricht der Gesamtlänge des Arrays)
    showQuestion();
}


function showQuestion() {
    if (currentQuestion < questions.length) {
        let question = questions[currentQuestion]; // das aktuelle JSON (0) wird einer Variable zugewiesen - damit greifen wir nun immer darauf zu
        document.getElementById('current-question').innerHTML = currentQuestion + 1; // die Zahl (aktuelle Frage) wird immer um 1 erhöht / + 1 ist nötig, da wir immer bei 0 anfangen zu zählen (sonst würde Frage 0 von 8 angezeigt werden)
        // der Inhalt unseres HTML wird mit den Werten aus dem JSON ersetzt:
        document.getElementById('question').innerHTML = question['question'];
        document.getElementById('answer_1').innerHTML = question['answer_1'];
        document.getElementById('answer_2').innerHTML = question['answer_2'];
        document.getElementById('answer_3').innerHTML = question['answer_3'];
        document.getElementById('answer_4').innerHTML = question['answer_4'];
    } else {
        document.getElementById('end-screen').style = '';
        document.getElementById('play-screen').style = 'display: none';
    }
}


function answer(selection) {
    let question = questions[currentQuestion]; // s. Funktion zuvor
    let selectedAnswerNumber = selection.slice(-1); // vom jeweiligen Parameter wird die letzte Stelle "abgeschnitten" und ausgegeben - in diesem Fall immer die jeweilige Zahl (answer_1/2/3 usw.) - und das packen wir in die Variable "selectedAnswerNumber"
    let idOfRightAnswer = `answer_${question['right_answer']}`; // wir holen uns die id der richtigen Antwort und machen diese dynamisch, damit immer auf die jeweils richtige Antwort zugegriffen wird - in diesem Fall '3'

    if (selectedAnswerNumber == question['right_answer']) { // jetzt können wir vergleichen, ob der angeklickte Parameter (die Antwort) mit der Stelle aus dem JSON (also die richtige Antwort) übereinstimmt
        document.getElementById(selection).parentNode.classList.add('bg-success'); // als ID können wir hier "selection" nehmen, da diese Variable genauso heißt, wie unsere ID (in diesem Fall answer_3) / mit "parentNode" greifen wir auf den übergeordneten Container zu und fügen die Klasse dort hinzu.
    } else { // wenn die angeklickte Antwort nicht korrekt ist, soll die richtige Antwort zusammen mit der angeklickten (falschen) angezeigt werden
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
    }
    document.getElementById('next-button').disabled = false; // der Button wird aktiviert (anklickbar)
}


function nextQuestion() {
    currentQuestion++; // Variable wird immer um 1 erhöht -> z. B. von 0 auf 1 im JSON Array und es wird die nächste Frage angezeigt
    document.getElementById('next-button').disabled = true; // der Button wird deaktiviert
    resetAnswerButtons();
    showQuestion(); // nächste Frage wird geladen
}


function resetAnswerButtons() { // die Hintergrundfarbe (grün o. rot o. beides) der Antworten wird entfernt
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
}