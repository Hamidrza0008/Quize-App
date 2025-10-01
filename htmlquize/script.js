const question = [
    {
        question : "What does HTML stand for?",
        answers : [
            {text : "Hyperlinks and Text Markup Language", correct : "false"},
            {text : "Hyper Text Markup Language", correct : "true"},
            {text : "Home Tool Markup Language", correct : "false"},
            {text : "Hyper Transfer Markup Language", correct : "false"}
        ]
    },
    {
        question : "Which HTML tag is used to create a hyperlink?",
        answers : [
            {text : "<a>", correct : "true"},
            {text : "<link>", correct : "false"},
            {text : "<href>", correct : "false"},
            {text : "<nav>", correct : "false"}
        ]
    },
    {
        question : "Which tag is used to insert an image in HTML?",
        answers : [
            {text : "<img>", correct : "true"},
            {text : "<picture>", correct : "false"},
            {text : "<src>", correct : "false"},
            {text : "<figure>", correct : "false"}
        ]
    },
    {
        question : "What is the correct HTML element for inserting a line break?",
        answers : [
            {text : "<break>", correct : "false"},
            {text : "<lb>", correct : "false"},
            {text : "<br>", correct : "true"},
            {text : "<line>", correct : "false"}
        ]
    },
    {
        question : "Which HTML attribute specifies an alternate text for an image?",
        answers : [
            {text : "title", correct : "false"},
            {text : "alt", correct : "true"},
            {text : "src", correct : "false"},
            {text : "href", correct : "false"}
        ]
    },
    {
        question : "Which HTML tag is used to define the largest heading?",
        answers : [
            {text : "<h6>", correct : "false"},
            {text : "<h1>", correct : "true"},
            {text : "<heading>", correct : "false"},
            {text : "<head>", correct : "false"}
        ]
    },
    {
        question : "Which HTML tag is used to display a table?",
        answers : [
            {text : "<table>", correct : "true"},
            {text : "<tab>", correct : "false"},
            {text : "<tr>", correct : "false"},
            {text : "<td>", correct : "false"}
        ]
    },
    {
        question : "Which HTML element is used to specify a footer for a document?",
        answers : [
            {text : "<bottom>", correct : "false"},
            {text : "<footer>", correct : "true"},
            {text : "<section>", correct : "false"},
            {text : "<end>", correct : "false"}
        ]
    },
    {
        question : "Which tag is used to define a list with bullet points?",
        answers : [
            {text : "<ul>", correct : "true"},
            {text : "<ol>", correct : "false"},
            {text : "<li>", correct : "false"},
            {text : "<dl>", correct : "false"}
        ]
    },
    {
        question : "Which tag is used to define an input field in HTML?",
        answers : [
            {text : "<text>", correct : "false"},
            {text : "<input>", correct : "true"},
            {text : "<form>", correct : "false"},
            {text : "<label>", correct : "false"}
        ]
    },
    {
        question : "Which attribute is used to open a link in a new tab?",
        answers : [
            {text : "href='_blank'", correct : "false"},
            {text : "target='_blank'", correct : "true"},
            {text : "link='_blank'", correct : "false"},
            {text : "open='_blank'", correct : "false"}
        ]
    },
    {
        question : "Which element is used to define metadata about an HTML document?",
        answers : [
            {text : "<meta>", correct : "true"},
            {text : "<info>", correct : "false"},
            {text : "<head>", correct : "false"},
            {text : "<data>", correct : "false"}
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
