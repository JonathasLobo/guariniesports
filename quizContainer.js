const quizQuestions = [
{
  question: "Em que ano Pokémon UNITE foi lançado globalmente?",
  answers: { a: "2020", b: "2021", c: "2022" },
  correctAnswer: "b"
},
{
  question: "Qual estúdio desenvolveu Pokémon UNITE?",
  answers: { a: "Game Freak", b: "TiMi Studios", c: "Niantic" },
  correctAnswer: "b"
},
{
  question: "Quantos jogadores compõem cada equipe em partidas normais de Pokémon UNITE?",
  answers: { a: "3", b: "5", c: "6" },
  correctAnswer: "b"
},
{
  question: "Qual é o nome da energia coletada de Pokémon selvagens para marcar gols?",
  answers: { a: "Aeos Energy", b: "Unite Energy", c: "Battle Points" },
  correctAnswer: "a"
},
{
  question: "Qual é a duração de uma partida padrão em Pokémon UNITE?",
  answers: { a: "5 minutos", b: "10 minutos", c: "15 minutos" },
  correctAnswer: "b"
},
{
  question: "Derrotar Pokémon selvagens concede:",
  answers: { a: "Somente pontos de gol", b: "Experiência e Aeos Energy", c: "Moeda do jogo" },
  correctAnswer: "b"
},
{
  question: "O que diferencia UNITE de outros jogos Pokémon tradicionais?",
  answers: { a: "Sistema de tipos super eficaz", b: "Unite Moves", c: "Batalhas por turnos" },
  correctAnswer: "b"
},
{
  question: "Se houver empate em pontos ao final da partida, quem vence?",
  answers: { a: "O time que fez mais gols primeiro", b: "O time que fez o último gol", c: "O time que começou ganhando" },
  correctAnswer: "a"
},
{
  question: "Qual Pokémon é classificado como Speedster?",
  answers: { a: "Mew", b: "Talonflame", c: "Blastoise" },
  correctAnswer: "b"
},
{
  question: "O que acontece ao derrotar Zapdos no final da partida?",
  answers: { a: "Ele dá bônus de XP apenas", b: "Concede vantagem de pontuação ao time vencedor", c: "Fecha o jogo imediatamente" },
  correctAnswer: "b"
},
{
  question: "Qual plataforma NÃO recebeu Pokémon UNITE no lançamento?",
  answers: { a: "Nintendo Switch", b: "PC", c: "Android" },
  correctAnswer: "b"
},
{
  question: "O que são wild Pokémon em UNITE?",
  answers: { a: "Pokémon controlados por inimigos", b: "Pokémon no mapa que dão XP e energia", c: "Pokémon que só aparecem no tutorial" },
  correctAnswer: "b"
},
{
  question: "Existem partidas rápidas em Pokémon UNITE chamadas Quick Battle?",
  answers: { a: "Sim, com 5 minutos de duração", b: "Não, todas são iguais", c: "Apenas em eventos especiais" },
  correctAnswer: "a"
},
{
  question: "O que é um Unite Move?",
  answers: { a: "Um movimento básico", b: "Um ataque especial muito poderoso", c: "Um item de batalha" },
  correctAnswer: "b"
},
{
  question: "Qual desses Pokémon é conhecido por alta mobilidade ofensiva?",
  answers: { a: "Gengar", b: "Slowbro", c: "Wigglytuff" },
  correctAnswer: "a"
},
{
  question: "Quem é a desenvolvedora parceira da The Pokémon Company em UNITE?",
  answers: { a: "Tencent / TiMi Studios", b: "Game Freak", c: "Niantic" },
  correctAnswer: "a"
},
{
  question: "Os jogadores sobem de nível durante a partida derrotando inimigos e selvagens?",
  answers: { a: "Sim", b: "Não", c: "Apenas no modo treino" },
  correctAnswer: "a"
},
{
  question: "Qual é a função da Aeos Energy?",
  answers: { a: "Comprar itens", b: "Marcar pontos nos gols adversários", c: "Subir de nível de treinador" },
  correctAnswer: "b"
},
{
  question: "Quando Pokémon UNITE foi anunciado oficialmente?",
  answers: { a: "2019", b: "2020", c: "2021" },
  correctAnswer: "b"
},
{
  question: "Você ganha experiência mesmo sem dar o golpe final em Pokémon selvagens?",
  answers: { a: "Sim", b: "Não", c: "Somente se for suporte" },
  correctAnswer: "a"
},
{
  question: "Qual desses Pokémon é classificado como Attacker?",
  answers: { a: "Pikachu", b: "Snorlax", c: "Machamp" },
  correctAnswer: "a"
},
{
  question: "Qual desses Pokémon tem Unite Move chamado 'Seismic Slam'?",
  answers: { a: "Lucario", b: "Machamp", c: "Charizard" },
  correctAnswer: "c"
},
{
  question: "O que acontece com a base inimiga após marcar pontos suficientes?",
  answers: { a: "Ela é destruída", b: "Ela fica bloqueada", c: "Ela se regenera" },
  correctAnswer: "a"
},
{
  question: "Qual desses Pokémon pode atuar como All-Rounder?",
  answers: { a: "Charizard", b: "Gardevoir", c: "Cinderace" },
  correctAnswer: "a"
},
{
  question: "Qual é o mapa padrão mais usado em partidas ranqueadas?",
  answers: { a: "Theia Sky Ruins", b: "Remoat Stadium", c: "Shivre City" },
  correctAnswer: "a"
},
{
  question: "Qual foi o primeiro Pokémon lançado como Licença Unite?",
  answers: { a: "Pikachu", b: "Charizard", c: "Zeraora" },
  correctAnswer: "b"
},
{
  question: "Qual time ganhou o Pokémon UNITE World Championship em 2022?",
  answers: { a: "Luminosity Gaming", b: "BLVKHVND", c: "Peru Unite" },
  correctAnswer: "b"
},
{
  question: "Quem se tornou campeão mundial de Pokémon UNITE em 2025?",
  answers: { a: "Luminosity Gaming", b: "ZETA Division", c: "Peru Unite" },
  correctAnswer: "c"
},
{
  question: "Qual time foi bicampeão mundial de Pokémon UNITE até 2023?",
  answers: { a: "Peru Unite", b: "BLVKHVND", c: "Luminosity Gaming" },
  correctAnswer: "c"
},
{
  question: "Qual o valor aproximado do prize pool nos World Championships de Pokémon UNITE?",
  answers: { a: "US$ 100.000", b: "US$ 500.000", c: "US$ 1.000.000" },
  correctAnswer: "b"
},
{
  question: "Qual time latino-americano venceu o Pokémon UNITE World Championship pela primeira vez em 2025?",
  answers: { a: "Santos Laguna", b: "Infamous Gaming", c: "Peru Unite" },
  correctAnswer: "c"
},
{
  question: "Qual time ficou em 2º lugar no World Championship 2025?",
  answers: { a: "Luminosity Gaming", b: "ZETA Division", c: "BLVKHVND" },
  correctAnswer: "b"
},
{
  question: "Qual é o valor total de premiação da Série de Campeonatos Pokémon UNITE em 2025?",
  answers: { a: "US$ 500.000", b: "US$ 1.000.000", c: "US$ 2.000.000" },
  correctAnswer: "b"
},
{
  question: "Qual torneio oficial permite equipes ganharem convites para o World Championships em UNITE?",
  answers: { a: "Série de Campeonatos", b: "Eventos de Comunidade", c: "Rankeds Globais" },
  correctAnswer: "a"
},
{
  question: "Quais regiões fazem parte das Zonas Regionais da Série de Campeonatos UNITE 2025?",
  answers: { a: "Europa, Brasil, América Latina, Oceania", b: "Somente América Latina e América do Norte", c: "Ásia, África, Europa" },
  correctAnswer: "a"
},
{
  question: "Quem foi um dos narradores do Brazil Championship UNITE 2024?",
  answers: { a: "Bruno Monkey", b: "Zynga", c: "Nobru" },
  correctAnswer: "a"
},
{
  question: "Qual destes comentadores participou do North America Championship Series 2024?",
  answers: { a: "Warss", b: "Doobsnax", c: "Bruno Monkey" },
  correctAnswer: "b"
},
{
  question: "Qual formato é frequentemente usado em finais regionais de Pokémon UNITE?",
  answers: { a: "Round Robin + Eliminação dupla", b: "Só partidas rápidas de 3 minutos", c: "Melhor de 1 (BO1) apenas" },
  correctAnswer: "a"
},
{
  question: "Quando começam os torneios online abertos da Série de Campeonatos Pokémon UNITE 2025?",
  answers: { a: "Novembro de 2024", b: "Janeiro de 2025", c: "Março de 2025" },
  correctAnswer: "a"
},
{
  question: "Qual dessas regiões NÃO é parte da Série de Campeonatos Pokémon UNITE 2025?",
  answers: { a: "Oceania", b: "Brasil", c: "Ásia Central" },
  correctAnswer: "c"
},
{
  question: "Quantas equipes aproximadamente participaram do Brazil Championship UNITE 2023?",
  answers: { a: "33", b: "44", c: "60" },
  correctAnswer: "b"
},
{
  question: "Quem foi host do Brazil Championship UNITE 2023?",
  answers: { a: "Mari Ayrez", b: "Bruno Monkey", c: "Warss" },
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
    : `☠️ Você errou no Quizsouls e voltou ao começo...`;

  const shareText = `🎮 Joguei o Quizsouls Pokémon Unite da Guariní!\nAcertei ${score} de ${quizQuestions.length} perguntas.\n\nMe mostre que você sabe mais que eu: ${window.location.href}`;

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
