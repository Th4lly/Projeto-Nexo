/* DATA DE NASCIMENTO */

const dia = document.getElementById("dia");
const mes = document.getElementById("mes");
const ano = document.getElementById("ano");

const anoAtual = new Date().getFullYear();

// Preenche os anos
for (let i = anoAtual; i >= 1900; i--) {
    ano.add(new Option(i, i));
}

// Atualiza os dias conforme o mês e o ano
function atualizarDias() {
    const diaAnterior = dia.value;
    const totalDias = mes.value
        ? new Date(ano.value || 2000, mes.value, 0).getDate()
        : 31;

    dia.innerHTML = '<option value="" disabled selected>Dia</option>';

    for (let i = 1; i <= totalDias; i++) {
        dia.add(new Option(i, i));
    }

    if (diaAnterior && Number(diaAnterior) <= totalDias) {
        dia.value = diaAnterior;
    }
}

atualizarDias();

mes.addEventListener("change", atualizarDias);
ano.addEventListener("change", atualizarDias);


/* MOSTRAR E OCULTAR SENHA */

const senha = document.getElementById("password");
const botaoSenha = document.querySelector(".toggle-password");

botaoSenha.addEventListener("click", function () {
    if (senha.type === "password") {
        senha.type = "text";
        botaoSenha.innerHTML = '<i class="bi bi-eye-slash"></i>';
        botaoSenha.setAttribute("aria-label", "Ocultar senha");
    } else {
        senha.type = "password";
        botaoSenha.innerHTML = '<i class="bi bi-eye"></i>';
        botaoSenha.setAttribute("aria-label", "Mostrar senha");
    }
});


/* MÁSCARA DO CPF */

const cpf = document.getElementById("cpf");

cpf.addEventListener("input", function () {
    let valor = cpf.value.replace(/\D/g, "").slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d)/, "$1.$2");
    valor = valor.replace(/(\d{3})(\d{1,2})$/, "$1-$2");

    cpf.value = valor;
});


/* VALIDAÇÃO DO FORMULÁRIO */

const formulario = document.getElementById("registerForm");
const email = document.getElementById("email");
const feedback = document.getElementById("feedback");

formulario.addEventListener("submit", function (event) {
    event.preventDefault();

    feedback.style.color = "#a12626";

    const nascimento = new Date(ano.value, mes.value - 1, dia.value);
    const formatoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nascimento > new Date()) {
        feedback.textContent = "Informe uma data de nascimento válida.";
    } else if (cpf.value.replace(/\D/g, "").length !== 11) {
        feedback.textContent = "Informe os 11 números do CPF.";
    } else if (!formatoEmail.test(email.value)) {
        feedback.textContent = "Informe um e-mail válido.";
    } else {
        feedback.style.color = "#2f4d2f";
        feedback.textContent = "Dados validados com sucesso!";
    }
});