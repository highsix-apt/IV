const audio = document.getElementById("audio");
const playPause = document.getElementById("playPause");
const next = document.getElementById("next");
const prev = document.getElementById("prev");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progressContainer");

const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");

const bars = document.querySelectorAll("#volumeBars span");
const musicName = document.getElementById("music-name");

/* =========================
   PLAYLIST
   ========================= */

const playlist = [
  { src: "music/bossout.mp3" },
  { src: "music/moonlight.mp3" },
  { src: "music/stay the night.mp3" },
];

let currentIndex = 0;

/* =========================
   LOAD MUSIC
   ========================= */

function loadMusic(index) {
  const track = playlist[index];
  audio.src = track.src;
  musicName.textContent = track.src.split("/").pop().replace(".mp3", "");
  audio.load();
}

/* =========================
   TIME FORMAT
   ========================= */

function formatTime(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

/* =========================
   PLAY / PAUSE
   ========================= */

playPause.addEventListener("click", () => {
  audio.paused ? audio.play() : audio.pause();
});

audio.addEventListener("play", () => {
  playPause.classList.add("playing");
});

audio.addEventListener("pause", () => {
  playPause.classList.remove("playing");
});

/* =========================
   NEXT / PREV
   ========================= */

next.addEventListener("click", () => {
  currentIndex = (currentIndex + 1) % playlist.length;
  loadMusic(currentIndex);
  audio.play();
});

prev.addEventListener("click", () => {
  currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
  loadMusic(currentIndex);
  audio.play();
});

/* =========================
   PROGRESS BAR
   ========================= */

audio.addEventListener("loadedmetadata", () => {
  durationEl.textContent = formatTime(audio.duration);
});

audio.addEventListener("timeupdate", () => {
  currentTimeEl.textContent = formatTime(audio.currentTime);
  progress.style.width = (audio.currentTime / audio.duration) * 100 + "%";
});

progressContainer.addEventListener("click", (e) => {
  const width = progressContainer.clientWidth;
  audio.currentTime = (e.offsetX / width) * audio.duration;
});

/* =========================
   VOLUME
   ========================= */

function setVolume(level) {
  bars.forEach((bar) => {
    bar.classList.toggle("active", Number(bar.dataset.level) <= level);
  });
  audio.volume = level / 20;
}

bars.forEach((bar) => {
  bar.addEventListener("click", () => {
    setVolume(Number(bar.dataset.level));
  });
});

/* =========================
   AUTO NEXT
   ========================= */

audio.addEventListener("ended", () => {
  next.click();
});

/* =========================
   INIT
   ========================= */

setVolume(5);
loadMusic(currentIndex);

window.addEventListener("load", () => {
  audio.play().catch(() => {});
});
