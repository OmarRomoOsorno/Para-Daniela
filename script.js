const noBtn = document.getElementById("no");
const yesBtn = document.getElementById("yes");
const heartsContainer = document.querySelector(".hearts");
const finalTextEl = document.getElementById("finalText");
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let dodges = 0;

/* ---------- CORAZONES ---------- */
function createHeart() {
  const heart = document.createElement("span");
  heart.classList.add("heart");
  heart.textContent = "💖";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 4 + Math.random() * 4 + "s";
  heartsContainer.appendChild(heart);

  setTimeout(() => heart.remove(), 9000);
}

let heartsInterval = setInterval(createHeart, 350);

/* ---------- BOTÓN NO ---------- */
function moveNoButton() {
  const yesRect = yesBtn.getBoundingClientRect();
  const noRect = noBtn.getBoundingClientRect();
  const padding = 30;

  let x, y, safe = false;

  while (!safe) {
    x = Math.random() * (window.innerWidth - noRect.width);
    y = Math.random() * (window.innerHeight - noRect.height);

    const overlap =
      x < yesRect.right + padding &&
      x + noRect.width > yesRect.left - padding &&
      y < yesRect.bottom + padding &&
      y + noRect.height > yesRect.top - padding;

    if (!overlap) safe = true;
  }

  noBtn.style.left = x + "px";
  noBtn.style.top = y + "px";
}

noBtn.addEventListener("pointerdown", () => {
  dodges++;
  moveNoButton();

  if (dodges === 1) noBtn.textContent = "Que?";
  if (dodges === 2) noBtn.textContent = "Porque?";
  if (dodges === 3) noBtn.textContent = "Que te pacha";
  if (dodges === 4) noBtn.textContent = "Andale";
  if (dodges === 5) noBtn.textContent = "Por favorcito";
  if (dodges === 6) noBtn.textContent = "Pls";
});

/* ---------- TEXTO LETRA POR LETRA ---------- */
const finalMessage = "Daniela, te amo. Haces cada día más bonito y quiero estar contigo toda la vida 💖";

function typeText(text, el, speed = 45) {
  let i = 0;
  el.textContent = "";
  const interval = setInterval(() => {
    el.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, speed);
}

/* ---------- CONFETI ---------- */
let confetti = [];

function startConfetti() {
  canvas.width = innerWidth;
  canvas.height = innerHeight;

  confetti = Array.from({ length: 160 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100,
    color: `hsl(${Math.random() * 360},80%,60%)`
  }));

  requestAnimationFrame(drawConfetti);
}

function drawConfetti() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  confetti.forEach(p => {
    ctx.beginPath();
    ctx.fillStyle = p.color;
    ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fill();
    p.y += 2;
    if (p.y > canvas.height) p.y = -10;
  });
  requestAnimationFrame(drawConfetti);
}

/* ---------- BOTÓN SÍ ---------- */
yesBtn.addEventListener("click", () => {
  document.body.classList.add("accepted");
  clearInterval(heartsInterval); // detener corazones
  startConfetti();
  typeText(finalMessage, finalTextEl);
});
