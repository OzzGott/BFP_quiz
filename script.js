
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
        text: "Hvilke bælgfrugter har flest danskere prøvet at spise?",
        explanation: "De tre typer af bælgfrugter som flest danskere har prøvet at spise er edamamebønner, kikærter og kidneybønner. Under 5% har prøvet at spise sorterne ingridærter og gråærter.",
        options: [
            { name: "Edamamebønner", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Hvor mange danskere kender Fødevarestyrelsens officielle anbefalinger om, at man bør spise 100 gram bælgfrugter om dagen?",
        explanation: "Fødevarestyrelsen anbefaler, at man spiser mindre kød, og mere fisk og bælgfrugter. De anbefaler, at man spiser ca. 100 gram bælgfrugter om dagen. Bælgfrugterne er både en god kilde til protein og andre næringsstoffer og er samtidig blandt de fødevarer, der har det laveste klimaaftryk.",
        options: [
            { name: "A", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "4% af befolkningen", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Hvor i Danmark er der flest, der spiser bælgfrugter?",
        explanation: "I Region Hovedstaden er det over halvdelen, 52%, der spiser bælgfrugter ugentligt. I Region Midtjylland og Region Syddanmark er det 42%, i Region Sjælland 37% og i Region Nordjylland 32%",
        options: [
            { name: "Region Hovedstaden", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "B", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Spiser de danskere, der træner meget (4+ gange om ugen) bælgfrugter oftere eller sjældnere end resten?",
        explanation: "Mens 14% af folk der træner under 4 gange om ugen har skiftet kødet ud med bælg inden for den seneste uge, er det hele 26% af de fysisk aktive",
        options: [
            { name: "Oftere", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Sjældnere", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Det samme", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "D", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Hvilke kantiner er bedst til at inspirere os til at spise bælgfrugter?",
        explanation: "Forklaring på hvorfor D er korrekt",
        options: [
            { name: "Private", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Offentlige", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "C", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Hvad er den største motivationsfaktor for danskerne til at spise flere bælgfrugter?",
        explanation: "Sundhed er den største årsag til, at danskerne gerne vil spise flere bælgfrugter. Der er også store sundhedsfordele at komme efter. Bælgfrugterne har et højt fiberindhold, der har en positiv effekt på tarmmikrobiomet og fordøjelsen. Samtidig er de rige på protein, jern, zink, folsyre og kalium.",
        options: [
            { name: "Bælgfrugter er bedre for klimaet", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Bælgfrugter er sunde", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Bælgfrugter mætter godt", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Bælgfrugter er billigere", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
        ]
    },
    {
        text: "Er danskerne bange for at få for få proteiner, hvis de erstatter kødet med bælgfrugter?",
        explanation: "53% af danskerne svarer, at de er uenige i, at de er bange for ikke at få nok proteiner, hvis de i nogle måltider erstatter bælgfrugter med kød. Bælgfrugterne har også et højt proteinindhold. Eksempelvis indeholder kikærter 20% protein, røde linser 27% protein og sojabønner hele 36% protein",
        options: [
            { name: "Flertallet er bange", true: false, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            { name: "Flertallet er ikke bange", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "C", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png" },
            //{ name: "D", true: true, img: "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
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
