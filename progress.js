// progress.js
const MAX = 100;                          // 최대값
const barEl   = document.getElementById("progressBar");
const labelEl = document.getElementById("progressLabel");

async function updateProgress() {
  try {
    // 예: /api/score → { "value": 73 }
    const res   = await fetch("/api/score");
    const { value } = await res.json();

    // 안전하게 0 ~ MAX 사이로 고정
    const pct = Math.min(Math.max(value, 0), MAX) / MAX * 100;

    // 길이 변경
    barEl.style.width = `${pct}%`;

    // 텍스트-라벨(선택)
    labelEl.textContent = `${pct.toFixed(0)}%`;
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", updateProgress);
