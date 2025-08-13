

const senhaEl = document.getElementById('senha');
const lengthEl = document.getElementById('length');
const decreaseBtn = document.getElementById('decrease');
const increaseBtn = document.getElementById('increase');
const upperEl = document.getElementById('upper');
const lowerEl = document.getElementById('lower');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const strengthBar = document.getElementById('strength-bar');
const crackTimeEl = document.getElementById('crack-time');

let length = 14;

const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerChars = "abcdefghijklmnopqrstuvwxyz";
const numberChars = "0123456789";
const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

function generatePassword() {
  let chars = "";
  if (upperEl.checked) chars += upperChars;
  if (lowerEl.checked) chars += lowerChars;
  if (numbersEl.checked) chars += numberChars;
  if (symbolsEl.checked) chars += symbolChars;

  if (chars === "") {
    senhaEl.textContent = "Selecione ao menos uma opção!";
    return;
  }

  let password = "";
  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * chars.length);
    password += chars[randIndex];
  }

  senhaEl.textContent = password;
  updateStrength(password, chars.length);
}

function updateStrength(password, charsetSize) {
  // Estimativa simples baseada em entropia
  const entropy = Math.log2(Math.pow(charsetSize, password.length));
  const crackTimeDays = Math.pow(2, entropy) / (1e9 * 60 * 60 * 24);
  crackTimeEl.textContent = `Tempo estimado para crackear: ${crackTimeDays.toFixed(4)} dias`;

  if (entropy < 40) {
    strengthBar.style.backgroundColor = "red";
  } else if (entropy < 60) {
    strengthBar.style.backgroundColor = "orange";
  } else {
    strengthBar.style.backgroundColor = "green";
  }
}

decreaseBtn.onclick = () => {
  if (length > 4) {
    length--;
    lengthEl.textContent = length;
    generatePassword();
  }
};

increaseBtn.onclick = () => {
  if (length < 64) {
    length++;
    lengthEl.textContent = length;
    generatePassword();
  }
};

[upperEl, lowerEl, numbersEl, symbolsEl].forEach(el => {
  el.addEventListener('change', generatePassword);
});

generatePassword();
