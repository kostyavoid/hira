let sprouts = 0;
let energy = 100;
let level = 1;
let progress = 0;

const token = document.getElementById('token');
const sproutsDisplay = document.getElementById('sprouts');
const energyDisplay = document.getElementById('energy');
const levelDisplay = document.getElementById('level');
const progressFill = document.getElementById('progress-fill');

token.addEventListener('click', () => {
  if (energy > 0) {
    sprouts++;
    energy--;
    progress += 10;

    sproutsDisplay.textContent = sprouts;
    energyDisplay.textContent = energy;
    progressFill.style.width = `${progress}%`;

    if (progress >= 100) {
      level++;
      progress = 0;
      levelDisplay.textContent = level;
      progressFill.style.width = `0%`;
    }

    // Создаём эффект волны
    const wave = document.createElement('div');
    wave.className = 'ripple-animation';
    token.appendChild(wave);

    // Удаляем волну после завершения анимации
    setTimeout(() => wave.remove(), 600);
  }
});