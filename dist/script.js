const story = {
  recipient: "my love",
  sender: "Tanzil",
  relationshipYears: 4,
  photos: [],
};

const yearMessages = [
  "Year one — this is where our story began, and where my future first started to feel like it had you in it.",
  "Year two — your belief in me stayed steady, even when my own belief did not.",
  "Year three — you stood beside my growth and helped me see who I could become.",
  "Year four — I look at the person I am now and see your love throughout the journey.",
];

const scenes = [...document.querySelectorAll(".scene")];
const progressFill = document.querySelector("#progressFill");
const soundToggle = document.querySelector("#soundToggle");
const toast = document.querySelector("#toast");
let currentScene = 0;
let soundOn = false;
let audioContext;

document.querySelectorAll("[data-recipient]").forEach((node) => (node.textContent = story.recipient));
document.querySelectorAll("[data-sender]").forEach((node) => (node.textContent = story.sender));

function showScene(index) {
  scenes.forEach((scene, sceneIndex) => {
    const active = sceneIndex === index;
    scene.hidden = !active;
    scene.classList.toggle("active", active);
  });
  currentScene = index;
  progressFill.style.width = `${(index / (scenes.length - 1)) * 100}%`;
  window.scrollTo({ top: 0, behavior: "smooth" });
  scenes[index].querySelector("button, [tabindex='0']")?.focus({ preventScroll: true });
  playTone(index === scenes.length - 1 ? 660 : 460 + index * 28, 0.12);
  if (index === scenes.length - 1) launchConfetti(72);
}

document.querySelectorAll("[data-next]").forEach((button) => {
  button.addEventListener("click", () => showScene(Math.min(currentScene + 1, scenes.length - 1)));
});

const lightsButton = document.querySelector("#lightsButton");
const yearMessage = document.querySelector("#yearMessage");
const yearMemories = [
  document.querySelector("#yearOneMemory"),
  document.querySelector("#yearTwoMemory"),
  document.querySelector("#yearThreeMemory"),
  document.querySelector("#yearFourMemory"),
];
const yearStars = [...document.querySelectorAll("[data-year]")];
const seenYears = new Set();

yearStars.forEach((star) => {
  star.addEventListener("click", () => {
    const index = Number(star.dataset.year);
    seenYears.add(index);
    star.classList.add("seen");
    star.setAttribute("aria-pressed", "true");
    yearMemories.forEach((memory, memoryIndex) => {
      memory.hidden = index !== memoryIndex;
    });
    yearMessage.textContent = yearMessages[index];
    playTone(460 + index * 72, 0.2);
    if (seenYears.size === story.relationshipYears) {
      lightsButton.disabled = false;
      setTimeout(() => {
        yearMessage.textContent = "Four years brought us here. Now let’s light the chapter ahead.";
        lightsButton.focus({ preventScroll: true });
      }, 550);
    }
  });
});

lightsButton.addEventListener("click", () => {
  const scene = document.querySelector(".night-scene");
  scene.style.transition = "filter .65s ease, opacity .65s ease";
  scene.style.filter = "brightness(2.4) saturate(.65)";
  scene.style.opacity = ".65";
  playTone(620, 0.18);
  setTimeout(() => {
    scene.style.filter = "";
    scene.style.opacity = "";
    showScene(2);
    launchConfetti(26);
  }, 620);
});

const cakeZone = document.querySelector("#cakeZone");
let pointerStart = null;
let cakeCut = false;

function cutCake() {
  if (cakeCut) return;
  cakeCut = true;
  cakeZone.classList.add("cut");
  cakeZone.setAttribute("aria-pressed", "true");
  playTone(520, 0.1);
  setTimeout(() => {
    cakeZone.style.pointerEvents = "none";
    document.querySelector("#cakeSuccess").hidden = false;
    launchConfetti(36);
  }, 850);
}

cakeZone.addEventListener("pointerdown", (event) => {
  pointerStart = { x: event.clientX, y: event.clientY };
  cakeZone.setPointerCapture?.(event.pointerId);
});
cakeZone.addEventListener("pointerup", (event) => {
  if (!pointerStart) return cutCake();
  const distance = Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y);
  if (distance > 24 || event.pointerType === "mouse") cutCake();
  pointerStart = null;
});
cakeZone.addEventListener("click", cutCake);
cakeZone.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    cutCake();
  }
});

const wishHeart = document.querySelector("#wishHeart");
const holdLabel = document.querySelector("#holdLabel");
let wishTimer;
let wishDone = false;

function beginWish() {
  if (wishDone) return;
  wishHeart.classList.add("holding");
  holdLabel.textContent = "Keep holding…";
  playTone(392, 0.08);
  wishTimer = setTimeout(completeWish, 1700);
}

function cancelWish() {
  if (wishDone) return;
  clearTimeout(wishTimer);
  wishHeart.classList.remove("holding");
  holdLabel.textContent = "Press and hold";
}

function completeWish() {
  wishDone = true;
  wishHeart.classList.remove("holding");
  wishHeart.classList.add("complete");
  holdLabel.hidden = true;
  playChord();
  setTimeout(() => {
    wishHeart.hidden = true;
    document.querySelector("#wishComplete").hidden = false;
    launchConfetti(30);
  }, 560);
}

wishHeart.addEventListener("pointerdown", beginWish);
wishHeart.addEventListener("pointerup", cancelWish);
wishHeart.addEventListener("pointerleave", cancelWish);
wishHeart.addEventListener("pointercancel", cancelWish);
wishHeart.addEventListener("keydown", (event) => {
  if ((event.key === "Enter" || event.key === " ") && !event.repeat) beginWish();
});
wishHeart.addEventListener("keyup", (event) => {
  if (event.key === "Enter" || event.key === " ") cancelWish();
});

document.querySelector("#replayButton").addEventListener("click", () => {
  cakeCut = false;
  wishDone = false;
  cakeZone.classList.remove("cut");
  cakeZone.style.pointerEvents = "";
  cakeZone.removeAttribute("aria-pressed");
  document.querySelector("#cakeSuccess").hidden = true;
  wishHeart.hidden = false;
  wishHeart.classList.remove("complete", "holding");
  holdLabel.hidden = false;
  holdLabel.textContent = "Press and hold";
  document.querySelector("#wishComplete").hidden = true;
  seenYears.clear();
  yearStars.forEach((star) => {
    star.classList.remove("seen");
    star.setAttribute("aria-pressed", "false");
  });
  yearMemories.forEach((memory) => (memory.hidden = true));
  yearMessage.textContent = "Begin with any star.";
  lightsButton.disabled = true;
  showScene(0);
});

document.querySelector("#confettiButton").addEventListener("click", () => {
  launchConfetti(70);
  showToast("A little more magic ✦");
});

soundToggle.addEventListener("click", () => {
  soundOn = !soundOn;
  soundToggle.classList.toggle("on", soundOn);
  soundToggle.setAttribute("aria-label", soundOn ? "Turn gentle sounds off" : "Turn gentle sounds on");
  soundToggle.innerHTML = soundOn ? '<span aria-hidden="true">♫</span>' : '<span aria-hidden="true">♪</span>';
  if (soundOn) {
    ensureAudio();
    playChord();
    showToast("Gentle sounds on");
  } else {
    showToast("Sounds off");
  }
});

function ensureAudio() {
  if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function playTone(frequency, duration = 0.12, delay = 0) {
  if (!soundOn) return;
  ensureAudio();
  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();
  oscillator.type = "sine";
  oscillator.frequency.value = frequency;
  gain.gain.setValueAtTime(0.0001, audioContext.currentTime + delay);
  gain.gain.exponentialRampToValueAtTime(0.08, audioContext.currentTime + delay + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + delay + duration);
  oscillator.connect(gain).connect(audioContext.destination);
  oscillator.start(audioContext.currentTime + delay);
  oscillator.stop(audioContext.currentTime + delay + duration + 0.03);
}

function playChord() {
  [523.25, 659.25, 783.99].forEach((frequency, index) => playTone(frequency, 0.35, index * 0.08));
}

function launchConfetti(count = 50) {
  const colors = ["#cf5576", "#f2bd51", "#9b73c8", "#f1937d", "#76a894"];
  for (let i = 0; i < count; i += 1) {
    const piece = document.createElement("i");
    piece.className = "confetti-piece";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.setProperty("--fall-time", `${2.8 + Math.random() * 2.4}s`);
    piece.style.setProperty("--drift", `${-90 + Math.random() * 180}px`);
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.transform = `rotate(${Math.random() * 180}deg)`;
    document.body.appendChild(piece);
    setTimeout(() => piece.remove(), 5600);
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1800);
}

function loadPhotos() {
  story.photos.slice(0, 3).forEach((source, index) => {
    const card = document.querySelector(`.photo-${["one", "two", "three"][index]}`);
    if (!card) return;
    const placeholder = card.querySelector(".photo-placeholder");
    const image = new Image();
    image.src = source;
    image.alt = `A favourite memory ${index + 1}`;
    image.addEventListener("load", () => {
      placeholder.replaceChildren(image);
      card.classList.add("has-photo");
    });
  });
}

loadPhotos();
showScene(0);
