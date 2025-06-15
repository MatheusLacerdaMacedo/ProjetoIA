const img = document.querySelector('.animal-img');
const buttons = document.querySelectorAll('.btn');
const scoreSpan = document.getElementById('score');  // O span que mostra a pontuação

let correta = ''; // resposta correta: 'domestico' ou 'selvagem'
let score = 0;    // pontuação inicial

// Função para atualizar o placar na tela
function atualizarPlacar() {
    scoreSpan.textContent = score;
}

// Função para carregar uma imagem aleatória
function carregarImagem() {
    const tipo = Math.random() < 0.5 ? 'domestico' : 'selvagem';
    correta = tipo;

    let n = 1;

    if (tipo === 'domestico') {
        n = Math.floor(Math.random() * 20) + 1;
        img.src = `./../img/imagensTeste/gatoDomestico/gatoDomestico (${n}).jpg`;
    } else {
        const totalSelvagens = 10;  // Ajuste conforme a quantidade de imagens
        n = Math.floor(Math.random() * totalSelvagens) + 1;
        img.src = `./../img/imagensTeste/gatoSelvagem/gatoSelvagem (${n}).jpg`;
    }
}

// Inicializa com uma imagem e placar zerado
carregarImagem();
atualizarPlacar();

// Adiciona evento aos botões
buttons.forEach(button => {
    button.addEventListener('click', function() {
        const escolha = this.getAttribute('data-resp');

        buttons.forEach(btn => btn.disabled = true); // Desativa botões após clique

        if (escolha === correta) {
            this.style.backgroundColor = 'green';
            score++;  // aumenta pontuação
        } else {
            this.style.backgroundColor = 'red';
            score = Math.max(0, score - 1);  // diminui pontuação mas não deixa negativa

            // destaca também a correta
            buttons.forEach(btn => {
                if (btn.getAttribute('data-resp') === correta) {
                    btn.style.backgroundColor = 'green';
                }
            });
        }

        atualizarPlacar();  // atualiza na tela

        // Após 1s, carrega nova imagem e reseta botões
        setTimeout(() => {
            buttons.forEach(btn => {
                btn.disabled = false;
                btn.style.backgroundColor = '';
            });
            carregarImagem();
        }, 1000);
    });
});
