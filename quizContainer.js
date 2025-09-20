const quizQuestions = [
  {
    question: "Qual foi o primeiro Pokémon lançado como Licença Unite?",
    answers: { a: "Pikachu", b: "Charizard", c: "Zeraora" },
    correctAnswer: "b"
  },
  {
    question: "Qual é o objetivo principal do jogo?",
    answers: { a: "Derrotar todos os inimigos", b: "Marcar pontos nas zonas adversárias", c: "Capturar todos os Pokémon" },
    correctAnswer: "b"
  },
  {
    question: "Qual Pokémon é conhecido por ser um grande defensor no jogo?",
    answers: { a: "Snorlax", b: "Gengar", c: "Greninja" },
    correctAnswer: "a"
  },
  {
    question: "Em que ano o Pokémon Unite foi lançado mundialmente?",
    answers: { a: "2019", b: "2020", c: "2021" },
    correctAnswer: "c"
  },
  {
    question: "Qual desses Pokémon é um Speedster?",
    answers: { a: "Talonflame", b: "Blastoise", c: "Slowbro" },
    correctAnswer: "a"
  }
];

let shuffledQuestions = [];
let currentIndex = 0;
let score = 0;

const gameDiv = document.getElementById("game");

document.getElementById("startBtn").addEventListener("click", startGame);

function startGame() {
  score = 0;
  currentIndex = 0;
  shuffledQuestions = shuffleArray([...quizQuestions]); // embaralha
  showQuestion();
}

function showQuestion() {
  const currentQuestion = shuffledQuestions[currentIndex];

  const answersHTML = Object.keys(currentQuestion.answers).map(letter => 
    `<label>
      <input type="radio" name="answer" value="${letter}">
      ${letter}: ${currentQuestion.answers[letter]}
    </label>`
  ).join("");

  gameDiv.innerHTML = `
    <div class="question">${currentQuestion.question}</div>
    <div class="answers">${answersHTML}</div>
    <button id="submit">Responder</button>
  `;

  document.getElementById("submit").addEventListener("click", checkAnswer);
}

function checkAnswer() {
  const currentQuestion = shuffledQuestions[currentIndex];
  const selected = document.querySelector("input[name=answer]:checked");

  if (!selected) return; // se não marcou nada

  if (selected.value === currentQuestion.correctAnswer) {
    score++;
    currentIndex++;

    if (currentIndex < shuffledQuestions.length) {
      showQuestion();
    } else {
      endGame(true);
    }
  } else {
    endGame(false);
  }
}

function endGame(victory) {
  let message = victory 
    ? `🔥 Parabéns! Você zerou o Quizsouls!`
    : `☠️ Você errou e voltou ao começo...`;

  const shareText = `🎮 Joguei o Quiz Pokémon Unite da Guariní!\nAcertei ${score} de ${quizQuestions.length} perguntas.\n\nMe mostre que você sabe mais que eu: ${window.location.href}`;

  gameDiv.innerHTML = `
    <div class="results">
      <p>${message}</p>
      <p>Você fez <strong>${score}</strong> ponto(s).</p>
      <button id="restart">Jogar Novamente</button>
      <button id="share">Compartilhar Resultado</button>
    </div>
  `;

  document.getElementById("restart").addEventListener("click", startGame);

  document.getElementById("share").addEventListener("click", () => {
    navigator.clipboard.writeText(shareText).then(() => {
      alert("Resultado copiado! Cole e compartilhe com seus amigos!");
    });
  });
}

// Função para embaralhar array
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
