let wins = 0;
let losses = 0;

function updateStats() {
  document.getElementById('wins').innerText = wins;
  document.getElementById('losses').innerText = losses;

  const total = wins + losses;
  const rate = total > 0 ? ((wins / total) * 100).toFixed(1) : "0.0";
  
  document.getElementById('wrText').innerText = `Winrate: ${rate}% (${wins}/${total})`;
}

function addWin(val) {
  wins = Math.max(0, wins + val);
  updateStats();
}

function addLoss(val) {
  losses = Math.max(0, losses + val);
  updateStats();
}

function resetStats() {
  wins = 0;
  losses = 0;
  updateStats();
}

// Управление модалкой пар
function openModal() {
  document.getElementById('pairModal').classList.add('active');
}

function closeModal() {
  document.getElementById('pairModal').classList.remove('active');
}

function selectPair(pairName) {
  document.getElementById('pairText').innerText = pairName;
  closeModal();
}

function applyCustomPair() {
  const input = document.getElementById('customPairInput');
  if (input.value.trim() !== '') {
    selectPair(input.value.trim());
    input.value = '';
  }
}

// Живые часы (UTC+5)
function updateClock() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  const localTime = new Date(utc + (3600000 * 5)); // 

  const hours = String(localTime.getHours()).padStart(2, '0');
  const minutes = String(localTime.getMinutes()).padStart(2, '0');
  const seconds = String(localTime.getSeconds()).padStart(2, '0');

  document.getElementById('clock').innerText = `${hours}:${minutes}:${seconds} UTC+5`;
}


setInterval(updateClock, 1000);
updateClock();
updateStats();

// Управление с клавиатуры (NumPad или обычные цифры)
document.addEventListener('keydown', (event) => {
  if (event.code === 'Numpad1' || event.key === '1') addWin(1);
  if (event.code === 'Numpad2' || event.key === '2') addWin(-1);
  if (event.code === 'Numpad4' || event.key === '4') addLoss(1);
  if (event.code === 'Numpad5' || event.key === '5') addLoss(-1);
  if (event.code === 'Numpad0' || event.key === '0') resetStats();
});
