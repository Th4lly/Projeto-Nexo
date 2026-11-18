
// Data de Nascimento
Option
const dia = document.getElementById("dia");
const mes = document.getElementById("mes");
const ano = document.getElementById("ano");

for(let i = 1; i <= 31; i++){
    dia.innerHTML += `<option value="${i}">${i}</option>`;
}

for(let i = 1; i <= 12; i++){
    mes.innerHTML += `<option value="${i}">${i}</option>`;
}

const anoAtual = new Date().getFullYear();

for(let i = anoAtual; i >= 1900; i--){
    ano.innerHTML += `<option value="${i}">${i}</option>`;
}

// Vísibilidade da senha

const passwordInput = document.getElementById("password");
const toggleButton = document.querySelector(".toggle-password");

const eyeOpen = `
<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
    d="M2.065 12.31c.13.29 3.275 7.19 9.935 7.19s9.805-6.895 9.935-7.19l.145-.33-.165-.32c-.15-.295-3.78-7.16-9.915-7.16-6.66 0-9.805 6.905-9.935 7.2l-.135.305.135.305ZM12 18c-4.95 0-7.755-4.735-8.415-5.995C4.245 10.74 7.055 6 12 6c4.525 0 7.635 4.73 8.4 6.025C19.72 13.32 16.95 18 12 18Zm-4-6c0 2.205 1.795 4 4 4s4-1.795 4-4-1.795-4-4-4-4 1.795-4 4Zm1.5 0a2.501 2.501 0 0 1 5 0 2.5 2.5 0 0 1-5 0Z"
    fill="currentColor"/>
</svg>
`;

const eyeClosed = `
<svg width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd"
    d="m22.08 11.98-.145.33c-.08.18-1.28 2.815-3.72 4.845l3.065 3.065-1.06 1.06-17.5-17.5 1.06-1.06 3.235 3.235C8.38 5.1 10.035 4.5 12 4.5c6.135 0 9.765 6.87 9.915 7.16l.165.32ZM10.85 9.79l3.36 3.36c.18-.345.29-.735.29-1.15A2.5 2.5 0 0 0 12 9.5c-.42 0-.805.11-1.15.29ZM16 12c0 .835-.26 1.605-.695 2.245l1.82 1.82c1.785-1.45 2.88-3.3 3.27-4.045-.765-1.295-3.87-6.025-8.4-6.025-1.485 0-2.77.435-3.87 1.07l1.63 1.63A3.99 3.99 0 0 1 12 8c2.205 0 4 1.795 4 4Zm-12.415.005C4.245 13.265 7.055 18 12 18c.87 0 1.675-.155 2.415-.405l1.175 1.175c-1.06.45-2.25.73-3.59.73-6.66 0-9.805-6.895-9.935-7.19l-.135-.305.135-.305.005-.01c.097-.209.951-2.048 2.625-3.815L5.77 8.95a14.143 14.143 0 0 0-2.185 3.055Z"
    fill="currentColor"/>
</svg>
`;

// Ícone inicial
toggleButton.innerHTML = eyeClosed;

toggleButton.addEventListener("click", () => {

    if (passwordInput.type === "password") {

        passwordInput.type = "text";
        toggleButton.innerHTML = eyeOpen;
        toggleButton.setAttribute("aria-label", "Ocultar senha");

    } else {

        passwordInput.type = "password";
        toggleButton.innerHTML = eyeClosed;
        toggleButton.setAttribute("aria-label", "Mostrar senha");

    }

});