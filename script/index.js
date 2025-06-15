const img = document.querySelector('.animal-img');
const buttons = document.querySelectorAll('.btn');
const scoreDisplay = document.querySelector('#score');

let imagens = [];
let imagensDisponiveis = [];
let correta = '';
let acertos = 0;
let total = 0;

async function carregarImagensJSON() {
  try {
    const response = await fetch('./../RespostasIA/respostas_ia.json');
    imagens = await response.json();
    imagensDisponiveis = [...imagens];
    carregarImagem();
    atualizarScore();
  } catch (error) {
    console.error('Erro ao carregar o JSON:', error);
  }
}

function carregarImagem() {
  if (imagensDisponiveis.length === 0) {
    alert('Você já viu todas as imagens!');
    return;
  }

  const aleatorio = Math.floor(Math.random() * imagensDisponiveis.length);
  const imgEscolhida = imagensDisponiveis[aleatorio];
  img.src = imgEscolhida.imagem;
  correta = imgEscolhida.classe;
  imagensDisponiveis.splice(aleatorio, 1);
}

function atualizarScore() {
  if (scoreDisplay) {
    scoreDisplay.textContent = `Acertos: ${acertos} / Tentativas: ${total}`;
  }
}

buttons.forEach(button => {
  button.addEventListener('click', function () {
    const escolha = this.getAttribute('data-resp');
    buttons.forEach(btn => (btn.disabled = true));
    total++;

    if (escolha === correta) {
      acertos++;
      this.style.backgroundColor = 'green';
    } else {
      this.style.backgroundColor = 'red';
      buttons.forEach(btn => {
        if (btn.getAttribute('data-resp') === correta) {
          btn.style.backgroundColor = 'green';
        }
      });
    }

    atualizarScore();

    setTimeout(() => {
      buttons.forEach(btn => {
        btn.disabled = false;
        btn.style.backgroundColor = '';
      });
      carregarImagem();
    }, 1000);
  });
});

function resetarImagens() {
  imagensDisponiveis = [...imagens];
  acertos = 0;
  total = 0;
  atualizarScore();
  carregarImagem();
}

carregarImagensJSON();
