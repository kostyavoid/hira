const token = document.getElementById('token');
const sproutsDisplay = document.getElementById('sprouts');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const progressFill = document.getElementById('progress-fill');
const infoPopup = document.getElementById('info-popup');
const bottomTab = document.getElementById("bottom-tab");
const aboutBtn = document.getElementById("about-btn");
const aboutModal = document.getElementById("about-modal");
const closeModal = document.getElementById("close-modal");

let sprouts = 0;
let energy = 100;
let level = 1;
let progress = 0;
const maxProgress = 100;
const sproutsToNextLevel = 50;

function showWave() {
  const waveElement = document.createElement('div');
  waveElement.className = 'ripple-animation';
  token.appendChild(waveElement);
  setTimeout(() => waveElement.remove(), 1200);
}

function updateProgress() {
  progressFill.style.width = `${(progress / maxProgress) * 100}%`;
  if (progress >= maxProgress) {
    progress = 0;
    level++;
    levelDisplay.textContent = level;
    showTopPopup(`Поздравляем! Вы достигли уровня ${level}`);
  }
}

function updateSproutsDisplay() {
  sproutsDisplay.textContent = `${sprouts}/${sproutsToNextLevel}`;
}

function collectSprouts(e) {
  if (energy > 0) {
    energy--;
    sprouts++;
    progress += 10;
    energyDisplay.textContent = energy;
    updateSproutsDisplay();
    updateProgress();
    showWave();
    addClickEffect(e);
    addParticles(e);
  } else {
    showTopPopup('Энергия закончилась!');
  }
}

function restoreEnergy() {
  if (energy < 100) {
    energy++;
    energyDisplay.textContent = energy;
  }
}

function showTopPopup(message) {
  infoPopup.textContent = message;
  infoPopup.classList.add('visible');
  setTimeout(() => infoPopup.classList.remove('visible'), 5000);
}

function addClickEffect(e) {
  const clickEffect = document.createElement('div');
  clickEffect.className = 'click-effect';
  clickEffect.style.top = `${e.clientY - token.getBoundingClientRect().top}px`;
  clickEffect.style.left = `${e.clientX - token.getBoundingClientRect().left}px`;
  token.appendChild(clickEffect);
  setTimeout(() => clickEffect.remove(), 600);
}

function addParticles(e) {
  for (let i = 0; i < 10; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.top = `${e.clientY - token.getBoundingClientRect().top}px`;
    particle.style.left = `${e.clientX - token.getBoundingClientRect().left}px`;
    const angle = Math.random() * 360;
    const distance = Math.random() * 50 + 20;
    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${
      Math.sin(angle) * distance
    }px)`;
    token.appendChild(particle);
    setTimeout(() => particle.remove(), 1000);
  }
}

// Обработчик клика
token.addEventListener('click', (e) => {
  addClickEffect(e); // Вспышка
  addParticles(e); // Частицы
  addTextEffect(e); // Текстовый эффект

  // Анимация вдавливания
  token.classList.add('active');
  setTimeout(() => token.classList.remove('active'), 200);
});

bottomTab.addEventListener("click", () => {
  bottomTab.classList.toggle("open");
});

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

document.addEventListener("DOMContentLoaded", () => {
  createRain();
  showTopPopup('Собирайте ростки памяти!');
});

setInterval(restoreEnergy, 10000);

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
// Эффект вспышки
function addClickEffect(e) {
  const clickEffect = document.createElement('div');
  clickEffect.className = 'click-effect';

  const rect = token.getBoundingClientRect();
  clickEffect.style.top = `${e.clientY - rect.top}px`;
  clickEffect.style.left = `${e.clientX - rect.left}px`;

  token.appendChild(clickEffect);

  setTimeout(() => clickEffect.remove(), 600); // Удаляем вспышку
}

// Частицы с мягким свечением
function addParticles(e) {
  const rect = token.getBoundingClientRect();
  for (let i = 0; i < 8; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Размер частицы
    const size = Math.random() * 8 + 6; // Немного увеличили размер
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Начальная позиция
    particle.style.top = `${e.clientY - rect.top}px`;
    particle.style.left = `${e.clientX - rect.left}px`;

    // Движение частицы
    const angle = Math.random() * 360;
    const distance = Math.random() * 60 + 30; // Расстояние разлета
    particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${
      Math.sin(angle) * distance
    }px)`;

    token.appendChild(particle);

    setTimeout(() => particle.remove(), 1200); // Удаляем частицу
  }
}

// Текстовый эффект "+1" с увеличением
function addTextEffect(e) {
  const textEffect = document.createElement('div');
  textEffect.className = 'text-effect';
  textEffect.textContent = '+1';

  // Позиция текста относительно токена
  const rect = token.getBoundingClientRect();
  textEffect.style.top = `${e.clientY - rect.top - 40}px`; // Смещение вверх
  textEffect.style.left = `${e.clientX - rect.left}px`;

  token.appendChild(textEffect);

  setTimeout(() => textEffect.remove(), 1000); // Удаляем текст
}




