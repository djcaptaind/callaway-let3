
const CONFIG = {
  mission: {code:"MISSION 00", title:"Report for Duty", progress:40},
  readiness:92,
  countdown:{name:"Western Regional Drill",date:"2026-10-25T08:00:00-05:00",display:"25 OCTOBER 2026"},
  announcements:[
    "Review the newest Canvas announcement before class",
    "Complete the next unlocked Mission 00 requirement",
    "Team leaders: verify accountability and equipment",
    "Uniform inspection Tuesday and Wednesday"
  ]
};
function setText(id,v){const e=document.getElementById(id);if(e)e.textContent=v}
function initTicker(){
  const t=document.getElementById("ticker-track");
  if(t)t.innerHTML=[...CONFIG.announcements,...CONFIG.announcements].map(x=>`<span>${x}</span>`).join("");
}
function updateCountdown(){
  const target=new Date(CONFIG.countdown.date).getTime();
  let d=Math.max(0,target-Date.now());
  setText("days",String(Math.floor(d/86400000)).padStart(2,"0"));
  setText("hours",String(Math.floor((d%86400000)/3600000)).padStart(2,"0"));
  setText("minutes",String(Math.floor((d%3600000)/60000)).padStart(2,"0"));
  setText("seconds",String(Math.floor((d%60000)/1000)).padStart(2,"0"));
}
document.addEventListener("DOMContentLoaded",()=>{
  initTicker();
  setText("mission-code",CONFIG.mission.code);
  setText("mission-title",CONFIG.mission.title);
  setText("mission-progress",`${CONFIG.mission.progress}%`);
  const p=document.getElementById("mission-bar");if(p)p.style.width=`${CONFIG.mission.progress}%`;
  setText("countdown-name",CONFIG.countdown.name);
  setText("countdown-display",CONFIG.countdown.display);
  setText("ready-value",`${CONFIG.readiness}%`);
  updateCountdown();setInterval(updateCountdown,1000);
  const b=document.querySelector(".menu-btn"),n=document.querySelector(".navlinks");
  if(b&&n)b.addEventListener("click",()=>n.classList.toggle("open"));
});


function animateCounters(){
  const counters = document.querySelectorAll(".counter");
  counters.forEach(counter => {
    const target = Number(counter.dataset.target || counter.textContent);
    if (!Number.isFinite(target)) return;
    const duration = 900;
    const start = performance.now();
    function tick(now){
      const progress = Math.min(1, (now - start) / duration);
      counter.textContent = Math.floor(progress * target);
      if(progress < 1) requestAnimationFrame(tick);
      else counter.textContent = target;
    }
    requestAnimationFrame(tick);
  });
}
document.addEventListener("DOMContentLoaded", animateCounters);

function updateSchoolCountdown(){
  const target=new Date("2026-07-29T08:00:00-05:00").getTime();
  let d=Math.max(0,target-Date.now());
  setText("school-days",String(Math.floor(d/86400000)).padStart(2,"0"));
  setText("school-hours",String(Math.floor((d%86400000)/3600000)).padStart(2,"0"));
  setText("school-minutes",String(Math.floor((d%3600000)/60000)).padStart(2,"0"));
}
document.addEventListener("DOMContentLoaded",()=>{updateSchoolCountdown();setInterval(updateSchoolCountdown,60000);});


function initializeCommandersChallenge(){
  const button = document.getElementById("challenge-complete");
  if(!button) return;
  const key = "callaway-let3-commanders-challenge-week1";
  if(localStorage.getItem(key) === "complete"){
    button.classList.add("completed");
    button.textContent = "CHALLENGE COMPLETE";
  }
  button.addEventListener("click", () => {
    const completed = !button.classList.contains("completed");
    button.classList.toggle("completed", completed);
    button.textContent = completed ? "CHALLENGE COMPLETE" : "MARK COMPLETE";
    localStorage.setItem(key, completed ? "complete" : "incomplete");
  });
}
document.addEventListener("DOMContentLoaded", initializeCommandersChallenge);
