const articles = [
  {
    id: 1,
    category: "Higiene",
    title: " Higiene Íntima Diária (Mulheres e Homens)",
    description: "Hábitos simples para manter uma rotina saudável.",
    time: "4 min",
    accent: "#6d205d",
    source: "Fonte: SPSP - Sociedade de pediatria de São paulo",
    subtitle: "Higiene íntima sem mistério: os cuidados diários para meninos e meninas",
    reference: "Referencia: https://spsp.org.br/cuidados_e_higiene_intima_nas_adolescentes/",
    content: [
      "Durante a adolescência, os hormônios aumentam a produção de suor e oleosidade, exigindo atenção redobrada com a limpeza do corpo para evitar mau cheiro, assaduras e infecções",
      "Para as mulheres, a orientação médica é lavar apenas a parte externa (vulva) com água e sabonete neutro, passar o papel higiênico de frente para trás e preferir calcinhas de algodão.",
      "Para os homens, é essencial puxar o prepúcio no banho para lavar a ponta do pênis e remover o esmegma, além de enxugar bem a região antes de vestir a cueca."
    ]
  },
  {
    id: 2,
    category: "Saúde Sexual",
    title: "Prevenção de Doenças e Vacinação na Juventude",
    description: "Saiba quais sâo os principais tipos de doenças e formas de prevenção.",
    time: "5 min",
    accent: "#2e5034",
    source: "Fonte: IFF Fio cruz - Instituto nacional da saúde da mulher, da criança e do adolescente",
    subtitle: "Infecções silenciosas e vacinas: como proteger sua saúde hoje e no futuro?",
    reference: "Referência: https://www.iff.fiocruz.br/index.php/pt/?view=article&id=236:adolescentes-e-saude-sexual-e-reprodutiva&catid=8",
    content: [
      "Muitas infecções transmitidas pelo contato íntimo não causam dor, feridas ou sinais visíveis no início, mas podem gerar inflamações graves e problemas de fertilidade se não forem tratadas.",
      "A prevenção envolve o uso correto do preservativo (masculino ou feminino) e manter a carteira de vacinação atualizada, especialmente contra o HPV e a Hepatite B, que protegem homens e mulheres contra vírus perigosos.",
      "Qualquer sinal de coceira, ardência ou secreção alterada exige avaliação médica com ginecologista ou urologista."
    ]
  },
  {
    id: 3,
    category: "Bem-estar",
    title: " Exames de Rotina e Check-up Médico",
    description: "Um corpo saúdavel funciona melhor.",
    time: "6 min",
    accent: "#ee7b80",
    source: "Fonte: Sancet - Medicina Diagnóstica",
    subtitle: " Quando ir ao médico? Os exames de rotina que todo jovem deveria fazer",
    reference: "Referência: https://sancet.com.br/blog/medicina-diagnostica/saude-do-adolescente/",
    content: [
      "Realizar um check-up preventivo entre os 13 e os 20 anos ajuda a identificar falta de vitaminas, alterações hormonais e infecções logo no começo.",
      "Os exames básicos de sangue e urina avaliam taxas de ferro (prevenindo anemia), glicose, colesterol e o funcionamento dos rins e da tireoide.",
      "Além disso, consultas periódicas com o ginecologista para as meninas e com o urologista para os meninos garantem orientação segura sobre o desenvolvimento do corpo."
    ]
  },
  {
    id: 4,
    category: "Saúde Mental",
    title: "Saúde Mental, Ansiedade e Pressão Diária",
    description: "Como começar uma conversa sobre sentimentos.",
    time: "3 min",
    accent: "#263c78",
    source: "Fonte: Pepsic - Periodicos de psicologia",
    subtitle: "Mente acelerada e cobrança constante: como lidar com a ansiedade na juventude?",
    reference: "Referência: https://pepsic.bvsalud.org/scielo.php?script=sci_arttext&pid=S1807-25262018000100004",
    content: [
      "Entre escola, estudos, expectativas familiares e comparação nas redes sociais, é comum sentir que a mente nunca descansa",
      "Pesquisas mostram que o excesso de estímulos digitais e a busca por aprovação constante aumentam o estresse e a ansiedade entre os jovens.",
      "Diminuir o tempo de tela antes de dormir e conversar sem julgamento com familiares, pessoas de confiança ou um psicólogo ajuda a atravessar essa fase com mais equilíbrio."
    ]
  },
  {
    id: 5,
    category: "Higiene",
    title: " Higiene do Corpo, Pele e Qualidade do Sono",
    description: "sugestões para equilibrar descanso e rotina.",
    time: "4 min",
    accent: "#263c78",
    source: "Fonte: Instituto federal tocantins",
    subtitle: "Acne, suor e noites mal dormidas: o guia prático para cuidar do corpo",
    reference: "Referência: https://portal.ifto.edu.br/ifto/reitoria/pro-reitorias/proae/assistencia-estudantil/programa-de-assistencia-estudantil/cartilha-higiene-pessoal.pdf",
    content: [
      "Na puberdade, a produção de suor e sebo aumenta naturalmente, exigindo cuidados simples no dia a dia.",
      "Lavar o rosto duas vezes ao dia sem espremer espinhas evita manchas na pele.",
      "Tomar banho diário lavando bem axilas, pés e dobras, além de escovar os dentes e usar fio dental, previne micoses, mau odor e cáries. Somado a isso, dormir de 8 a 10 horas por noite é essencial para a memória, o crescimento e a disposição física.."
    ]
  }
];

// Elementos da página
const grid = document.querySelector("#article-grid");
const searchInput = document.querySelector("#search-input");

const filters = document.querySelectorAll(".filter");

const pageNumber = document.querySelector("#page-number");
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");

const modal = document.querySelector("#article-modal");
const modalClose = document.querySelector("#modal-close");

const libraryPage = document.querySelector("#library-page");
const fullArticle = document.querySelector("#full-article");

const articleBack = document.querySelector("#article-back");
const openFullArticle = document.querySelector("#open-full-article");

// Estado
let selectedCategory = "Todos";
let currentPage = 1;
let selectedArticle = null;

const articlesPerPage = 6;

// Filtrar artigos
function getFilteredArticles() {
  const searchTerm = searchInput.value
    .trim()
    .toLocaleLowerCase("pt-BR");

  return articles.filter(article => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      article.category === selectedCategory;

    const searchableText = `
      ${article.title}
      ${article.description}
      ${article.category}
    `.toLocaleLowerCase("pt-BR");

    const matchesSearch = searchableText.includes(searchTerm);

    return matchesCategory && matchesSearch;
  });
}

// Criar card
function createArticleCard(article) {
  const card = document.createElement("article");

  card.className = "article-card";
  card.style.setProperty("--accent", article.accent);

  const tag = document.createElement("span");
  tag.className = "category-tag";
  tag.textContent = article.category;

  const title = document.createElement("h2");
  title.textContent = article.title;

  const description = document.createElement("p");
  description.textContent = article.description;

  const button = document.createElement("button");
  button.className = "card-open";
  button.type = "button";
  button.textContent = "➜";
  button.setAttribute("aria-label", `Abrir ${article.title}`);

  button.addEventListener("click", () => {
    openArticleModal(article);
  });

  card.append(tag, title, description, button);

  return card;
}

function renderArticles() {
  const filteredArticles = getFilteredArticles();

  const totalPages = Math.max(
    1,
    Math.ceil(filteredArticles.length / articlesPerPage)
  );

  currentPage = Math.min(currentPage, totalPages);

  const startIndex = (currentPage - 1) * articlesPerPage;

  const visibleArticles = filteredArticles.slice(
    startIndex,
    startIndex + articlesPerPage
  );

  grid.innerHTML = "";

  if (visibleArticles.length === 0) {
    const message = document.createElement("p");

    message.className = "empty-message";
    message.textContent = "Nenhum artigo encontrado.";

    grid.appendChild(message);
  } else {
    visibleArticles.forEach(article => {
      grid.appendChild(createArticleCard(article));
    });
  }

  pageNumber.textContent = `${currentPage} de ${totalPages}`;

  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}


function openArticleModal(article) {
  selectedArticle = article;

  document.querySelector("#modal-category").textContent =
    article.category;

  document.querySelector("#modal-title").textContent =
    article.title;

  document.querySelector("#modal-reading-time").textContent =
    `◷ ${article.time} de leitura`;

  document.querySelector("#modal-description").textContent =
    article.content[0];


  modal.hidden = false;

  document.body.style.overflow = "hidden";

  modalClose.focus();
}

function closeArticleModal() {
  modal.hidden = true;

  document.body.style.overflow = "";

  selectedArticle = null;
}


function showFullArticle(article) {
  if (!article) return;

  closeArticleModal();

  libraryPage.hidden = true;
  fullArticle.hidden = false;

  document.querySelector("#full-category").textContent =
    article.category;

  document.querySelector("#full-title").textContent =
    article.title;

  document.querySelector("#full-reading-time").textContent =
    `Tempo de leitura - ${article.time}`;

  document.querySelector("#full-source").textContent =
    article.source;

  document.querySelector("#full-subtitle").textContent =
    article.subtitle;

  document.querySelector("#full-cover").style.background =
    `linear-gradient(135deg, ${article.accent}66, #b8a18b)`;

  document.querySelector("#full-reference").textContent =
    article.reference;

  const contentContainer = document.querySelector("#full-content");

  contentContainer.innerHTML = "";

  article.content.forEach(paragraph => {
    const p = document.createElement("p");

    p.textContent = paragraph;

    contentContainer.appendChild(p);
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

function backToLibrary() {
  fullArticle.hidden = true;
  libraryPage.hidden = false;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

filters.forEach(filter => {
  filter.addEventListener("click", () => {
    selectedCategory = filter.dataset.category;

    currentPage = 1;

    filters.forEach(button => {
      const isActive = button === filter;

      button.classList.toggle("active", isActive);

      button.setAttribute(
        "aria-pressed",
        String(isActive)
      );
    });

    renderArticles();
  });
});


searchInput.addEventListener("input", () => {
  currentPage = 1;

  renderArticles();
});

document.querySelector(".search-form").addEventListener(
  "submit",
  event => {
    event.preventDefault();

    renderArticles();
  }
);


previousPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;

    renderArticles();
  }
});

nextPage.addEventListener("click", () => {
  const totalPages = Math.ceil(
    getFilteredArticles().length / articlesPerPage
  );

  if (currentPage < totalPages) {
    currentPage++;

    renderArticles();
  }
});


modalClose.addEventListener("click", closeArticleModal);

modal.addEventListener("click", event => {
  if (event.target === modal) {
    closeArticleModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && !modal.hidden) {
    closeArticleModal();
  }
});

openFullArticle.addEventListener("click", () => {
  showFullArticle(selectedArticle);
});

articleBack.addEventListener("click", backToLibrary);

renderArticles();