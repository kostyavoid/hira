// Элементы DOM
const token = document.getElementById('token');
const sproutsDisplay = document.getElementById('sprouts');
const sproutsCountDisplay = document.getElementById('sprouts-count');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const progressFill = document.getElementById('progress-fill');
const infoPopup = document.getElementById('info-popup');
const levelUpFlash = document.getElementById('level-up-flash');
const bottomTab = document.getElementById("bottom-tab");
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeModal = document.getElementById("close-modal");

// Игровые переменные
let sprouts = 0; // Текущие ростки
let energy = 100; // Энергия
let level = 1; // Уровень
let progress = 0; // Прогресс для текущего уровня
let sproutsToNextLevel = 50; // Необходимые ростки для перехода на следующий уровень

// Функция обновления прогресса
function updateProgress() {
  progressFill.style.width = `${(progress / sproutsToNextLevel) * 100}%`;

  if (progress >= sproutsToNextLevel) {
    progress = 0;
    level++;
    sproutsToNextLevel = Math.ceil(sproutsToNextLevel * 1.5); // Увеличение сложности
    levelDisplay.textContent = level;
    showLevelUpFlash();
    showTopPopup(`Поздравляем! Вы достигли уровня ${level}`);
  }
}

// Функция обновления интерфейса ростков
function updateSproutsDisplay() {
  sproutsDisplay.textContent = `${sprouts}/${sproutsToNextLevel}`;
  sproutsCountDisplay.textContent = sprouts;
}

// Функция для отображения уведомления о новом уровне
function showLevelUpFlash() {
  levelUpFlash.style.display = 'block';
  levelUpFlash.classList.add('visible');
  setTimeout(() => {
    levelUpFlash.style.display = 'none';
    levelUpFlash.classList.remove('visible');
  }, 2000);
}

// Сбор ростков
function collectSprouts(e) {
  if (energy > 0) {
    energy--; // Уменьшаем энергию
    sprouts++; // Увеличиваем ростки
    progress++; // Увеличиваем прогресс
    energyDisplay.textContent = energy;
    updateSproutsDisplay();
    updateProgress();
    showWave(); // Анимация волны
    addClickEffect(e); // Эффект клика
    addParticles(e); // Частицы
    addTextEffect(e); // Текстовый эффект "+1"
  } else {
    showTopPopup('Энергия закончилась! Попробуйте позже.');
  }
}

// Восстановление энергии
function restoreEnergy() {
  if (energy < 100) {
    energy++;
    energyDisplay.textContent = energy;
  }
}

// Всплывающее сообщение
function showTopPopup(message) {
  infoPopup.textContent = message;
  infoPopup.classList.add('visible');
  setTimeout(() => infoPopup.classList.remove('visible'), 5000);
}

// Эффект волны
function showWave() {
  const waveElement = document.createElement('div');
  waveElement.className = 'ripple-animation';
  token.appendChild(waveElement);
  setTimeout(() => waveElement.remove(), 1200);
}

// Частицы
function addParticles(e) {
  const rect = token.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 8 + 6;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${e.clientY - rect.top}px`;
    particle.style.left = `${e.clientX - rect.left}px`;
    const angle = Math.random() * 360;
    const distance = Math.random() * 60 + 30;
    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${
      Math.sin(angle) * distance
    }px)`;
    token.appendChild(particle);
    setTimeout(() => particle.remove(), 1200);
  }
}

// Текстовый эффект "+1"
function addTextEffect(e) {
  const textEffect = document.createElement('div');
  textEffect.className = 'text-effect';
  textEffect.textContent = '+1';
  const rect = token.getBoundingClientRect();
  textEffect.style.top = `${e.clientY - rect.top - 40}px`;
  textEffect.style.left = `${e.clientX - rect.left}px`;
  token.appendChild(textEffect);
  setTimeout(() => textEffect.remove(), 1000);
}

// Обработчик клика
token.addEventListener('click', collectSprouts);

// Восстановление энергии каждые 10 секунд
setInterval(restoreEnergy, 10000);

// Создание дождя
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

// Вкладка
bottomTab.addEventListener("click", () => {
  bottomTab.classList.toggle("open");
});

// Модальное окно "О нас"
aboutBtn.addEventListener("click", () => {
  aboutModal.style.display = "flex";
  setTimeout(() => aboutModal.classList.add("open"), 10);
});

closeModal.addEventListener("click", () => {
  aboutModal.classList.remove("open");
  setTimeout(() => aboutModal.style.display = "none", 500);
});

aboutModal.addEventListener("click", (e) => {
  if (e.target === aboutModal) {
    aboutModal.classList.remove("open");
    setTimeout(() => aboutModal.style.display = "none", 500);
  }
});

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
  createRain();
  showTopPopup('Собирайте ростки памяти!');
  updateSproutsDisplay();
});
