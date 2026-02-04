
let points = 0;
let currentQuestion = 0;
let showingExplanation = false;
let lastSelectedOption = null;

const totalQuestionsSpan = document.getElementById('total-questions');
const questionArea = document.getElementById('question-area');
const endScreen = document.getElementById('end-screen');
const startScreen = document.getElementById('start-screen');
const finalScore = document.getElementById('final-score');
const scoreComment = document.getElementById('score-comment');
const restartBtn = document.getElementById('restart-btn');
const startButton = document.getElementById('start-game-btn');

const questions = [
    {
        text: "Det her er det første spørgsmål, svaret er A",
        explanation: "Forklaring på hvorfor A er korrekt",
        options: [
            { name: "A", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Det her er det næste spørgsmål, svaret er C",
        explanation: "Forklaring på hvorfor C er korrekt",
        options: [
            { name: "A", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Det her er endnu et spørgsmål, svaret er A",
        explanation: "Forklaring på hvorfor A er korrekt",
        options: [
            { name: "A", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Det her er det næstsidste spørgsmål, svaret er D",
        explanation: "Forklaring på hvorfor D er korrekt",
        options: [
            { name: "A", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Det her er det sidste spørgsmål, svaret er D",
        explanation: "Forklaring på hvorfor D er korrekt",
        options: [
            { name: "A", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "okay et til, alle er rigtige",
        explanation: "Forklaring på hvorfor alle er korrekte",
        options: [
            { name: "A", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
];


function renderQuestion() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");
    startScreen.classList.add("hidden");

    if (currentQuestion >= questions.length) {
        showEndScreen();
        return;
    }

    const q = questions[currentQuestion];
    const title = document.createElement('h2');
    title.textContent = q.text;
    questionArea.appendChild(title);

    q.options.forEach(option => {
        const div = document.createElement('div');
        div.className = "option";

        div.innerHTML = `
      <img src="${option.img}" alt="${option.name}">
      <div>
        <strong>${option.name}</strong><br>
      </div>
    `;

        div.addEventListener('click', () => selectOption(option));
        questionArea.appendChild(div);
    });
}

function selectOption(option) {
    if(option.true){
        points++;
    }
    lastSelectedOption = option;
    showingExplanation = true;
    renderExplanation();
}

function renderExplanation() {
    questionArea.innerHTML = "";

    const q = questions[currentQuestion];
    const correctOption = q.options.find(opt => opt.true);

    const div = document.createElement('div');
    div.className = "explanation";

    const resultText = lastSelectedOption.true
        ? "Korrekt! Godt klaret."
        : `Forkert. Det rigtige svar var ${correctOption.name}.`;

    div.innerHTML = `
      <p>${resultText}</p>
      <p>${q.explanation || ""}</p>
      <button id="next-btn">Næste spørgsmål</button>
    `;

    questionArea.appendChild(div);

    document.getElementById('next-btn').addEventListener('click', () => {
        currentQuestion++;
        showingExplanation = false;
        renderQuestion();
    });
}

function showEndScreen() {
    questionArea.innerHTML = "";
    endScreen.classList.remove("hidden");
    startScreen.classList.add("hidden");
    finalScore.textContent = points;
    totalQuestionsSpan.textContent = questions.length;
    let comment = "";
    if(points === questions.length){
        comment = "Fantastisk! Du kender dine bælgfrugter!";
    } else if (points >= questions.length / 2) {
        comment = "Godt klaret! Du har en fin forståelse for bælgfrugter.";
    } else {
        comment = "Øv, du kan prøve igen og lære mere om bælgfrugter!";
    }
    scoreComment.textContent = comment;
}

function showStartScreen() {
    questionArea.innerHTML = "";
    endScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
}

restartBtn.addEventListener('click', () => {
    points = 0;
    currentQuestion = 0;
    renderQuestion();
});

startButton.addEventListener('click', () => {
    points = 0;
    currentQuestion = 0;
    renderQuestion();
});


// Initialize
showStartScreen();
