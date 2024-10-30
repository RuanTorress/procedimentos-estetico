
//Variaveis atribuidas para tratar o menu
const menu = document.getElementById("listMenu");
const btnMenuLink = document.getElementById("btn-menu-link");
const iconBtnMenu = document.getElementById("icon-btn-menu");
const linksMenu = document.querySelectorAll(".link-menu");
const groupOption = document.querySelector('.groupOption-project');
let menuOpen = false;
let sessionProjectsExpanded = false;
let optionVisibled = false;
// Variaveis do details
const detailsList = document.querySelectorAll(".caixa-pergunta");

document.addEventListener("DOMContentLoaded", () => {

  document.querySelector('.btn-close-option').addEventListener('click', (event) => {
    event.preventDefault();

    if (optionVisibled) {
      groupOption.style.display = 'none';
      document.body.style.overflow = 'auto';
      optionVisibled = !optionVisibled;
    }
  });

  document.querySelectorAll('.btn-ver-planilha').forEach(element => {
    element.addEventListener('click', () => {
      if (!optionVisibled) {
        groupOption.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        optionVisibled = !optionVisibled;


        const classes = Array.from(element.parentNode.parentNode.classList);
        
        dataProjects.forEach(element => {
          if (element.id === classes[1]) {
            document.querySelector('.option-project__title').innerHTML = element.title;
            document.querySelector('.option-project__description').innerHTML = element.description;
            document.querySelector('.option-project__group-btn__btn-comprar').setAttribute('href', element.linkBuy);
            document.querySelector('.option-project__group-btn__btn-ver').setAttribute('href', element.linkSee)
            return;
          }
        })
      }
    });
  });

  document.getElementById('btn-ver-mais').addEventListener('click', () => {
    const sessao = document.querySelector('.groupServiceExcel-secundary');
    const sessaoTerciary = document.querySelector('.groupServiceExcel-terciary');
    const btnVerMais = document.querySelector('.btn-ver-mais-projetos');

    if (!sessionProjectsExpanded) {
      sessao.style.transition = 'height .3s ease';
      sessao.style.height = '100%';
      sessaoTerciary.style.boxShadow = 'none';
      btnVerMais.style.outline = 'none';
      sessionProjectsExpanded = !sessionProjectsExpanded;
      btnVerMais.textContent = 'Ver menos';
    } else {
      sessao.style.transition = 'height .3s ease';
      if (window.innerWidth > 660) {
        sessao.style.height = '46em';
      } else {
        sessao.style.height = '75em';
      }
      btnVerMais.textContent = 'Ver mais';
      btnVerMais.style.outline = 'none';
      sessaoTerciary.style.boxShadow = '0px -46px 27px var(--primary-color)';
      sessionProjectsExpanded = !sessionProjectsExpanded;
    }
  });
  
  document.querySelectorAll(".img-service").forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.style.backgroundSize = "115%";
    });
    element.addEventListener("mouseout", () => {
      element.style.backgroundSize = "100%";
    });
  });

  document.querySelectorAll(".btn-ver-planilha").forEach((element) => {
    element.addEventListener("mouseover", () => {
      element.parentElement.parentElement.firstElementChild.style.backgroundSize =
        "115%";
    });
    element.addEventListener("mouseout", () => {
      element.parentElement.parentElement.firstElementChild.style.backgroundSize =
        "100%";
    });
  });

  btnMenuLink.addEventListener("click", (event) => {
    event.preventDefault();
    menuOpen ? closeMenu(menu) : openMenu(menu);
    menuOpen = !menuOpen;
  });

  window.addEventListener(
    "resize",
    debounce(() => {
      if (window.innerWidth > 900) {
        document.body.style.overflow = "auto";
        menu.style.visibility = "visible";
      } else {
        menuOpen = false;
        closeMenu(menu);
      }
    }, 100)
  );

  linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuOpen) {
        closeMenu(menu);
        menuOpen = !menuOpen;
      }
    });
  });

  detailsList.forEach((currentDetail, currentIndex) => {
    currentDetail.addEventListener("click", () => {
      detailsList.forEach((detail, index) => {
        if (index !== currentIndex) {
          detail.open = false;
        }
      });
    });
  });

  criarObservacao(".hidden-inicio", "show-inicio");
  criarObservacao(".hidden-sobre", "show-sobre");
  criarObservacao(".hidden-youtube", "show-youtube");
  criarObservacao(".hidden-beneficios", "show-beneficios");
  criarObservacao(".hidden-youtube-video", "show-youtube-video");
  criarObservacao(".hidden-inicio-img", "show-inicio-img");
});

function openMenu(menu) {
  menu.style.visibility = "visible";
  iconBtnMenu.classList.remove("bi-list");
  iconBtnMenu.classList.add("bi-x-lg");
  document.body.style.overflow = "hidden";
}

function closeMenu(menu) {
  menu.style.visibility = "hidden";
  iconBtnMenu.classList.remove("bi-x-lg");
  iconBtnMenu.classList.add("bi-list");
  document.body.style.overflow = "auto";
}

function debounce(func, wait) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

function criarObservacao(classeOculta, classeMostrar) {
  const observacao = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add(classeMostrar);
      } else {
        return;
      }
    });
  });

  const elementosOcultos = document.querySelectorAll(classeOculta);
  elementosOcultos.forEach((element) => observacao.observe(element));
}
//mudar
// Armazena o índice de cada carrossel individualmente
let currentIndexes = {};

// Função para mudar o slide de um carrossel específico
function changeSlide(direction, carouselId) {
  const carousel = document.querySelector(`.carousel[data-carousel="${carouselId}"]`);
  const slides = carousel.querySelectorAll('.carousel-slide');
  const totalSlides = slides.length;
  const carouselContainer = carousel.querySelector('.carousel-container');

  // Inicializa o índice do carrossel se ainda não foi feito
  if (!currentIndexes[carouselId]) {
    currentIndexes[carouselId] = 0;
  }

  // Atualiza o índice do slide
  currentIndexes[carouselId] = (currentIndexes[carouselId] + direction + totalSlides) % totalSlides;

  // Move o container para o slide correspondente
  carouselContainer.style.transform = `translateX(-${currentIndexes[carouselId] * 100}%)`;
}

// Inicializa o primeiro slide de cada carrossel
document.addEventListener("DOMContentLoaded", () => {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach(carousel => {
    const carouselId = carousel.getAttribute('data-carousel');
    currentIndexes[carouselId] = 0;
    const carouselContainer = carousel.querySelector('.carousel-container');
    carouselContainer.style.transform = `translateX(0)`;
  });
});



