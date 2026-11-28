const VALOR_DOACAO = 50;

const formatarReal = (valor) =>
  valor.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });

const calcularPorcentagem = (valor, meta) =>
  Math.min(100, Math.round((valor / meta) * 100));

// anima os números junto com a barra
function contar(card, de, ate, duracao = 900) {
  const meta = Number(card.dataset.meta);
  const valorEl = card.querySelector('.campaign-value');
  const percentEl = card.querySelector('.campaign-percent');
  const inicio = performance.now();

  function passo(agora) {
    const t = Math.min((agora - inicio) / duracao, 1);
    const suave = 1 - Math.pow(1 - t, 3);
    const atual = Math.round(de + (ate - de) * suave);

    valorEl.textContent = `${formatarReal(atual)} de ${formatarReal(meta)}`;
    percentEl.textContent = `${calcularPorcentagem(atual, meta)}%`;

    if (t < 1) requestAnimationFrame(passo);
  }

  requestAnimationFrame(passo);
}

function atualizar(card, de, ate) {
  const meta = Number(card.dataset.meta);
  card.querySelector('.progress-fill').style.width =
    `${calcularPorcentagem(ate, meta)}%`;
  contar(card, de, ate);
  card.dataset.arrecadado = ate;
}

document.querySelectorAll('.campaign-card').forEach((card, i) => {
  const meta = Number(card.dataset.meta);
  const arrecadado = Number(card.dataset.arrecadado);
  const botao = card.querySelector('.donate-button');

  // animação de entrada, um card depois do outro
  card.dataset.arrecadado = 0;
  setTimeout(() => atualizar(card, 0, arrecadado), 150 + i * 120);

  botao.addEventListener('click', () => {
    const atual = Number(card.dataset.arrecadado);
    if (atual >= meta) return;

    const novo = Math.min(meta, atual + VALOR_DOACAO);
    atualizar(card, atual, novo);

    card.classList.remove('recebeu');
    void card.offsetWidth; // reinicia a animação do brilho
    card.classList.add('recebeu');

    if (novo >= meta) {
      botao.textContent = 'Meta atingida 🎉';
      botao.disabled = true;
    }
  });
});