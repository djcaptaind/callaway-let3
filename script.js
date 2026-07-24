const SITE_CONFIG = {
  operation: {
    code: "MISSION 00",
    title: "Report for Duty",
    summary: "Complete battalion reception, verify course access, and earn clearance for the next mission.",
    progress: 40
  },
  readiness: 92,
  countdown: {
    name: "Western Regional Drill",
    date: "2026-10-25T08:00:00-05:00",
    displayDate: "25 OCTOBER 2026"
  },
  announcements: [
    "Uniform inspection Tuesday and Wednesday",
    "Review the newest Canvas announcement before class",
    "Complete the next unlocked Mission 00 requirement",
    "Team leaders: verify accountability and equipment"
  ],
  commandersIntent: "Every cadet leaves today's class better than they entered.",
  leadershipChallenge: {
    title: "Strengthen One Teammate",
    text: "Recognize a specific improvement, help solve a problem, or coach a cadet respectfully."
  },
  events: [
    {date: "TUE", title: "Uniform Day", detail: "Wear the prescribed uniform and meet appearance standards."},
    {date: "WED", title: "Uniform Day", detail: "Second uniform day for the A/B block schedule."},
    {date: "UPDATE", title: "Next Battalion Event", detail: "Replace this entry inside script.js."}
  ],
  spotlight: {
    heading: "Cadet Spotlight",
    name: "CADET NAME",
    award: "Outstanding Leadership",
    description: "Recognize uniform excellence, service, academic achievement, improvement, or team leadership."
  }
};

function setText(id, value){
  const el = document.getElementById(id);
  if(el) el.textContent = value;
}

function initializePage(){
  const c = SITE_CONFIG;
  setText("operation-code", c.operation.code);
  setText("strip-operation", c.operation.code);
  setText("operation-title", c.operation.title);
  setText("operation-summary", c.operation.summary);
  setText("progress-text", `${c.operation.progress}%`);
  document.getElementById("progress-fill").style.width = `${Math.max(0, Math.min(100, c.operation.progress))}%`;
  setText("readiness-value", `${c.readiness}%`);
  setText("countdown-name", c.countdown.name);
  setText("countdown-date", c.countdown.displayDate);
  setText("commanders-intent", c.commandersIntent);
  setText("challenge-title", c.leadershipChallenge.title);
  setText("challenge-text", c.leadershipChallenge.text);
  setText("spotlight-heading", c.spotlight.heading);
  setText("spotlight-name", c.spotlight.name);
  setText("spotlight-award", c.spotlight.award);
  setText("spotlight-description", c.spotlight.description);

  const ticker = document.getElementById("ticker-track");
  ticker.innerHTML = [...c.announcements, ...c.announcements].map(item => `<span>${item}</span>`).join("");

  const events = document.getElementById("events-list");
  events.innerHTML = c.events.map(event => `
    <div class="schedule-item">
      <span>${event.date}</span>
      <div><strong>${event.title}</strong><p>${event.detail}</p></div>
    </div>`).join("");

  const image = document.getElementById("spotlight-image");
  const placeholder = document.getElementById("photo-placeholder");
  image.addEventListener("error", () => {
    image.style.display = "none";
    placeholder.style.display = "flex";
  });

  updateCountdown();
  setInterval(updateCountdown, 1000);
}

function updateCountdown(){
  const target = new Date(SITE_CONFIG.countdown.date).getTime();
  let distance = target - Date.now();
  if(Number.isNaN(target)) return;
  if(distance < 0) distance = 0;
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const minutes = Math.floor((distance % 3600000) / 60000);
  const seconds = Math.floor((distance % 60000) / 1000);
  setText("days", String(days).padStart(2,"0"));
  setText("hours", String(hours).padStart(2,"0"));
  setText("minutes", String(minutes).padStart(2,"0"));
  setText("seconds", String(seconds).padStart(2,"0"));
}

document.addEventListener("DOMContentLoaded", initializePage);
