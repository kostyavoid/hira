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
// Открыть модальное окно
function openModal() {
    document.getElementById('about-modal').style.display = 'block';
}

// Закрыть модальное окно
function closeModal() {
    document.getElementById('about-modal').style.display = 'none';
}

// Закрытие окна при клике вне его
window.onclick = function(event) {
    const modal = document.getElementById('about-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
