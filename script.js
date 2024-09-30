const perguntas = [
    {
        pergunta: "Qual máquina simples ajuda a levantar uma carga pesada com menos esforço?",
        opcoes: ["Plano Inclinado", "Polia", "Roda e Eixo", "Alavanca"],
        respostaCerta: "Polia",
        explicacao: "A polia permite levantar cargas pesadas com menos esforço, mudando a direção da força aplicada."
    },
    // ... Adicione aqui as demais perguntas
    {
        pergunta: "Qual dessas máquinas simples é usada em um quebra-nozes?",
        opcoes: ["Alavanca", "Polia", "Plano Inclinado", "Roda e Eixo"],
        respostaCerta: "Alavanca",
        explicacao: "O quebra-nozes usa o princípio da alavanca para multiplicar a força e quebrar a casca de nozes."
    },
    {
        pergunta: "Qual é a função de um plano inclinado?",
        opcoes: ["Reduzir a força necessária para mover objetos", "Multiplicar a força", "Aumentar o peso", "Diminuir a massa"],
        respostaCerta: "Reduzir a força necessária para mover objetos",
        explicacao: "O plano inclinado facilita o movimento de objetos pesados, reduzindo a força necessária para movê-los."
    },
    {
        pergunta: "Em que máquina simples o eixo gira quando a roda é movida?",
        opcoes: ["Roda e Eixo", "Polia", "Plano Inclinado", "Alavanca"],
        respostaCerta: "Roda e Eixo",
        explicacao: "Na roda e eixo, quando a roda gira, o eixo também gira, facilitando o movimento de cargas pesadas."
    }
];

let perguntaAtual = 0;
let pontuacaoEquipe1 = 0;
let pontuacaoEquipe2 = 0;
let equipeAtual = 1;

const perguntaEl = document.getElementById('pergunta');
const opcoesEl = document.querySelectorAll('.opcao');
const feedbackEl = document.getElementById('feedback');
const spinButton = document.getElementById('spin-button');
const nextButton = document.getElementById('next-button');
const team1ScoreEl = document.getElementById('team1-score');
const team2ScoreEl = document.getElementById('team2-score');
const team1DisplayEl = document.getElementById('team1-display');
const team2DisplayEl = document.getElementById('team2-display');
const team1NameInput = document.getElementById('team1-name');
const team2NameInput = document.getElementById('team2-name');
const startGameButton = document.getElementById('start-game');
const setupArea = document.getElementById('setup-area');
const gameArea = document.getElementById('game');

const slot1 = document.getElementById('slot1');
const slot2 = document.getElementById('slot2');
const slot3 = document.getElementById('slot3');
const slotSymbols = ["🍒", "🍋", "🍉", "⭐", "🍇"];

// Função para iniciar o jogo
startGameButton.addEventListener('click', () => {
    const team1Name = team1NameInput.value.trim();
    const team2Name = team2NameInput.value.trim();

    if (team1Name && team2Name) {
        team1DisplayEl.textContent = team1Name;
        team2DisplayEl.textContent = team2Name;
        setupArea.style.display = 'none';
        gameArea.style.display = 'block';
        exibirPergunta();
    } else {
        alert("Por favor, insira os nomes das duas equipes!");
    }
});

// Função para exibir a pergunta
function exibirPergunta() {
    const perguntaObj = perguntas[perguntaAtual];
    perguntaEl.textContent = perguntaObj.pergunta;

    opcoesEl.forEach((botao, index) => {
        botao.textContent = perguntaObj.opcoes[index];
        botao.dataset.resposta = perguntaObj.opcoes[index] === perguntaObj.respostaCerta ? 'certo' : 'errado';
    });

    feedbackEl.textContent = '';
    nextButton.style.display = 'none';
    spinButton.disabled = true;
}

// Função para verificar a resposta
opcoesEl.forEach((botao) => {
    botao.addEventListener('click', () => {
        const resposta = botao.dataset.resposta;
        const perguntaObj = perguntas[perguntaAtual];

        if (resposta === 'certo') {
            feedbackEl.textContent = "Correto! Você pode girar o caça-níquel.";
            feedbackEl.style.color = "green";
            spinButton.disabled = false;
        } else {
            feedbackEl.textContent = "Errado! A próxima equipe responde.";
            feedbackEl.style.color = "red";
            nextButton.style.display = 'inline';
        }
    });
});

// Função para girar o caça-níquel
spinButton.addEventListener('click', () => {
    spinButton.disabled = true;

    slot1.classList.add('spin-animation');
    slot2.classList.add('spin-animation');
    slot3.classList.add('spin-animation');

    setTimeout(() => {
        slot1.classList.remove('spin-animation');
        slot2.classList.remove('spin-animation');
        slot3.classList.remove('spin-animation');

        slot1.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        slot2.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];
        slot3.textContent = slotSymbols[Math.floor(Math.random() * slotSymbols.length)];

        calcularPontuacao();
    }, 1000);
});

// Função para calcular a pontuação
function calcularPontuacao() {
    const resultado = [slot1.textContent, slot2.textContent, slot3.textContent];
    const pontuacao = resultado.filter(symbol => symbol === resultado[0]).length;

    if (equipeAtual === 1) {
        pontuacaoEquipe1 += pontuacao * 10;
        team1ScoreEl.textContent = pontuacaoEquipe1;
    } else {
        pontuacaoEquipe2 += pontuacao * 10;
        team2ScoreEl.textContent = pontuacaoEquipe2;
    }

    feedbackEl.textContent += ` Você ganhou ${pontuacao * 10} pontos!`;
    feedbackEl.style.color = "blue";
    nextButton.style.display = 'inline';
    equipeAtual = equipeAtual === 1 ? 2 : 1; // Alternar entre as equipes
};

// Função para ir para a próxima pergunta
nextButton.addEventListener('click', () => {
    if (perguntaAtual < perguntas.length - 1) {
        perguntaAtual++;
        exibirPergunta();
    } else {
        terminarJogo();
    }
});

// Função para terminar o jogo
function terminarJogo() {
    gameArea.style.display = 'none';
    feedbackEl.textContent = "Fim do jogo!";

    const vitoria = pontuacaoEquipe1 > pontuacaoEquipe2 ? `${team1DisplayEl.textContent} ganhou!` : `${team2DisplayEl.textContent} ganhou!`;
    feedbackEl.textContent += ` ${vitoria}`;

    document.getElementById('restart-button').style.display = 'inline';
}

// Reiniciar o jogo
document.getElementById('restart-button').addEventListener('click', reiniciarJogo);

function reiniciarJogo() {
    perguntaAtual = 0;
    pontuacaoEquipe1 = 0;
    pontuacaoEquipe2 = 0;
    equipeAtual = 1;

    team1ScoreEl.textContent = 0;
    team2ScoreEl.textContent = 0;
    feedbackEl.textContent = '';

    setupArea.style.display = 'block';
    gameArea.style.display = 'none';
    document.getElementById('restart-button').style.display = 'none';
}