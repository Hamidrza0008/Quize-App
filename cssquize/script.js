const question = [
    {
        question : "What does CSS stand for?",
        answers : [
            {text : "Colorful Style Sheets", correct : "false"},
            {text : "Cascading Style Sheets", correct : "true"},
            {text : "Computer Style Sheets", correct : "false"},
            {text : "Creative Style System", correct : "false"}
        ]
    },
    {
        question : "Which symbol is used for class selectors in CSS?",
        answers : [
            {text : "#", correct : "false"},
            {text : ".", correct : "true"},
            {text : "*", correct : "false"},
            {text : "@", correct : "false"}
        ]
    },
    {
        question : "Which property is used to change the text color in CSS?",
        answers : [
            {text : "font-color", correct : "false"},
            {text : "color", correct : "true"},
            {text : "text-style", correct : "false"},
            {text : "text-color", correct : "false"}
        ]
    },
    {
        question : "Which CSS property controls the size of text?",
        answers : [
            {text : "text-size", correct : "false"},
            {text : "font-size", correct : "true"},
            {text : "font-style", correct : "false"},
            {text : "size", correct : "false"}
        ]
    },
    {
        question : "How do you select an element with the id 'header' in CSS?",
        answers : [
            {text : ".header", correct : "false"},
            {text : "header", correct : "false"},
            {text : "#header", correct : "true"},
            {text : "*header", correct : "false"}
        ]
    },
    {
        question : "Which property is used to change the background color?",
        answers : [
            {text : "bgcolor", correct : "false"},
            {text : "background", correct : "false"},
            {text : "background-color", correct : "true"},
            {text : "color-background", correct : "false"}
        ]
    },
    {
        question : "Which CSS property makes text bold?",
        answers : [
            {text : "style", correct : "false"},
            {text : "font-weight", correct : "true"},
            {text : "bold", correct : "false"},
            {text : "text-weight", correct : "false"}
        ]
    },
    {
        question : "Which unit is NOT relative in CSS?",
        answers : [
            {text : "em", correct : "false"},
            {text : "px", correct : "true"},
            {text : "rem", correct : "false"},
            {text : "%", correct : "false"}
        ]
    },
    {
        question : "Which property is used to set the spacing between lines of text?",
        answers : [
            {text : "line-spacing", correct : "false"},
            {text : "letter-spacing", correct : "false"},
            {text : "line-height", correct : "true"},
            {text : "word-spacing", correct : "false"}
        ]
    },
    {
        question : "Which property is used to change the font of text?",
        answers : [
            {text : "font-family", correct : "true"},
            {text : "font-type", correct : "false"},
            {text : "text-font", correct : "false"},
            {text : "font-style", correct : "false"}
        ]
    },
    {
        question : "Which CSS property is used to make elements float to the left or right?",
        answers : [
            {text : "align", correct : "false"},
            {text : "float", correct : "true"},
            {text : "position", correct : "false"},
            {text : "display", correct : "false"}
        ]
    },
    {
        question : "Which value of the position property makes an element stay fixed on screen?",
        answers : [
            {text : "static", correct : "false"},
            {text : "absolute", correct : "false"},
            {text : "relative", correct : "false"},
            {text : "fixed", correct : "true"}
        ]
    }
];


let totalSeconds;
let timerInterval;

const questionElement = document.getElementById("question");
const answerElement = document.getElementById("answer-btn");
const nextBtn = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
const homeBtn = document.getElementById("home-btn");

let curruntQuestionIndex = 0;
let score = 0;

function startQuiz() {
    curruntQuestionIndex = 0;
    score = 0;
    nextBtn.innerHTML = "Next";

    if(timerInterval) clearInterval(timerInterval);

    totalSeconds = 60 * 2;
    timerInterval = setInterval(updateTimer, 1000);
    updateTimer();

    homeBtn.style.display = "none";
    showQuestion();
}

function showQuestion() {
    reset();
    const curruntQuestion = question[curruntQuestionIndex];
    questionElement.textContent = (curruntQuestionIndex + 1) + ". " + curruntQuestion.question;

    curruntQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("btn");
        answerElement.append(button);

        if(answer.correct === "true" || answer.correct === true) button.dataset.correct = "true";

        button.addEventListener("click", selectAnswer);
    });
}

function reset() {
    nextBtn.style.display = "none";
    homeBtn.style.display = "none";
    while(answerElement.firstChild) answerElement.removeChild(answerElement.firstChild);
}

function selectAnswer(e) {
    const selectedbtn = e.target;
    const isCorrect = selectedbtn.dataset.correct === "true";

    Array.from(answerElement.children).forEach(button => {
        button.disabled = true;
        if(button.dataset.correct === "true") button.classList.add("correct");
        else if(button === selectedbtn) button.classList.add("incorrect");
    });

    if(isCorrect) score++;
    nextBtn.style.display = "block";
}

function showScore() {
    reset();
    questionElement.textContent = `Your Score is ${score} out of ${question.length}!`;
    nextBtn.textContent = "Play Again";
    nextBtn.style.display = "block";
    homeBtn.style.display = "block";

    homeBtn.addEventListener("click", () => {
        window.location.href = "../home.html";
    }, { once: true });

    clearInterval(timerInterval);
}

function handleNextbtn() {
    curruntQuestionIndex++;
    if(curruntQuestionIndex < question.length) showQuestion();
    else showScore();
}

nextBtn.addEventListener("click", () => {
    if(nextBtn.textContent === "Play Again") startQuiz();
    else handleNextbtn();
});

function updateTimer() {
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;
    timerElement.textContent = String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");

    if(totalSeconds <= 0) {
        clearInterval(timerInterval);
        showScore();
    } else {
        totalSeconds--;
    }
}

startQuiz();
