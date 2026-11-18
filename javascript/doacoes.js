// Animação das barras de doação

const campanhas = document.querySelectorAll(".campaign-card");

campanhas.forEach((campanha) => {

    const meta = Number(campanha.dataset.meta);
    const arrecadado = Number(campanha.dataset.arrecadado);

    // Evita erro se a meta vier zerada
    const porcentagem =
        meta > 0
            ? Math.min((arrecadado / meta) * 100, 100)
            : 0;

    const porcentagemInteira = Math.round(porcentagem);

    const barra = campanha.querySelector(".progress-fill");
    const valor = campanha.querySelector(".campaign-value");
    const percentual = campanha.querySelector(".campaign-percent");

    // Valor arrecadado
    valor.textContent =
        `R$ ${arrecadado.toLocaleString('pt-BR')} de R$ ${meta.toLocaleString('pt-BR')}`;

    // Inicia em 0%
    percentual.textContent = "0%";

    // Anima o texto da porcentagem
    let contador = 0;

    const animacao = setInterval(() => {

        contador++;

        percentual.textContent = `${contador}%`;

        if (contador >= porcentagemInteira) {

            percentual.textContent =
                `${porcentagemInteira}%`;

            clearInterval(animacao);
        }

    }, 20);

    // Anima a barra
    setTimeout(() => {

        barra.style.width = `${porcentagem}%`;

    }, 300);

});