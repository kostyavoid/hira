// Элементы DOM
const token = document.getElementById('token');
const sproutsDisplay = document.getElementById('sprouts');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const progressFill = document.getElementById('progress-fill');
const infoPopup = document.getElementById('info-popup');
const bottomTab = document.getElementById("bottom-tab");

// Игровые данные
let sprouts = 0;
let energy = 100;
let level = 1;
let progress = 0;
const maxProgress = 100;
const sproutsToNextLevel = 50;

// Функция: Показать волну
function showWave() {
  const waveElement = document.createElement('div');
  waveElement.className = 'ripple-animation';
  token.appendChild(waveElement);
  setTimeout(() => waveElement.remove(), 1200);
}

// Функция: Обновить прогресс
function updateProgress() {
  progressFill.style.width = `${(progress / maxProgress) * 100}%`;
  if (progress >= maxProgress) {
    progress = 0;
    level++;
    levelDisplay.textContent = level;
    showTopPopup(`Поздравляем! Вы достигли уровня ${level}`);
  }
}

// Функция: Обновить ростки
function updateSproutsDisplay() {
  sproutsDisplay.textContent = `${sprouts}/${sproutsToNextLevel}`;
}

// Функция: Сбор ростков
function collectSprouts() {
  if (energy > 0) {
    energy--;
    energyDisplay.textContent = energy;
    sprouts++;
    updateSproutsDisplay();
    progress += 10;
    updateProgress();
    showWave();
  } else {
    showTopPopup('Энергия закончилась!');
  }
}

// Восстановление энергии
function restoreEnergy() {
  if (energy < 100) {
    energy++;
    energyDisplay.textContent = energy;
  }
}

// Показать всплывающее уведомление
function showTopPopup(message) {
  infoPopup.textContent = message;
  infoPopup.classList.add('visible');
  setTimeout(() => infoPopup.classList.remove('visible'), 5000);
}

// Функция: Эффект клика
function addClickEffect(e) {
  const clickEffect = document.createElement('div');
  clickEffect.className = 'click-effect';
  clickEffect.style.top = `${e.clientY - token.getBoundingClientRect().top}px`;
  clickEffect.style.left = `${e.clientX - token.getBoundingClientRect().left}px`;
  token.appendChild(clickEffect);
  setTimeout(() => clickEffect.remove(), 500);
}

// Обработчик клика
token.addEventListener('click', (e) => {
  collectSprouts();
  addClickEffect(e);
});

// Обработчик вкладки
bottomTab.addEventListener("click", () => {
  bottomTab.classList.toggle("open");
});

// Функция: Создать дождь
function createRain() {
  const rainContainer = document.createElement('div');
  rainContainer.className = 'rain-container';
  document.body.appendChild(rainContainer);
  for (let i = 0; i < 100; i++) {
    const raindrop = document.createElement('div');
    raindrop.className = 'raindrop';
    raindrop.style.left = Math.random() * 100 + '%';
    raindrop.style.animationDuration = Math.random() * 1 + 1 + 's';
    raindrop.style.animationDelay = Math.random() * 2 + 's';
    rainContainer.appendChild(raindrop);
  }
}
// Вызов функций
document.addEventListener("DOMContentLoaded", () => {
  createRain();
  showTopPopup('Собирайте ростки памяти!');
});
setInterval(restoreEnergy, 10000);
// Переменные для модального окна
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeModal = document.getElementById("close-modal");

// Открыть модальное окно с анимацией
aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "flex";
  setTimeout(() => {
    aboutModal.classList.add("open");
  }, 10);
});

// Закрыть модальное окно
closeModal.addEventListener("click", () => {
  aboutModal.classList.remove("open");
  setTimeout(() => {
    aboutModal.style.display = "none";
  }, 500);
});

// Закрытие по клику вне модального окна
aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.classList.remove("open");
    setTimeout(() => {
      aboutModal.style.display = "none";
    }, 500);
  }
});
const token = document.getElementById('token');

// Функция: Анимация вспышки при клике
function addClickEffect(e) {
  const clickEffect = document.createElement('div');
  clickEffect.className = 'click-effect';

  // Позиция вспышки относительно токена
  clickEffect.style.top = `${e.clientY - token.getBoundingClientRect().top}px`;
  clickEffect.style.left = `${e.clientX - token.getBoundingClientRect().left}px`;

  token.appendChild(clickEffect);

  setTimeout(() => {
    clickEffect.remove();
  }, 600); // Время анимации совпадает с CSS
}

// Функция: Добавить частицы
function addParticles(e) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Рандомное начальное положение
    const size = Math.random() * 6 + 4; // Размер частиц от 4 до 10px
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${e.clientY - token.getBoundingClientRect().top}px`;
    particle.style.left = `${e.clientX - token.getBoundingClientRect().left}px`;

    // Рандомное направление
    const angle = Math.random() * 360;
    const distance = Math.random() * 50 + 20; // Расстояние разлета
    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${
      Math.sin(angle) * distance
    }px)`;

    token.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 1000); // Удаляем частицы через 1 секунду
  }
}

// Обработчик клика
token.addEventListener('click', (e) => {
  addClickEffect(e); // Вспышка
  addParticles(e); // Частицы
  token.classList.add('active'); // Анимация нажатия

  setTimeout(() => {
    token.classList.remove('active');
  }, 200); // Возврат к нормальному состоянию
});


