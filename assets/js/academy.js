
function showScenarioFeedback(type){
  const box = document.getElementById('scenario-feedback');
  box.className = 'feedback ' + (type === 'good' ? 'good' : 'try');
  box.textContent = type === 'good'
    ? 'Strong leadership choice. You took initiative, protected the learning environment, and modeled responsibility.'
    : 'That response may solve part of the problem, but it misses the opportunity to lead by example and prepare the room responsibly.';
}

function gradeKnowledgeCheck(){
  const answers = {q1:'b', q2:'c', q3:'a'};
  let score = 0;
  Object.entries(answers).forEach(([name, correct])=>{
    const selected = document.querySelector(`input[name="${name}"]:checked`);
    if(selected && selected.value === correct) score++;
  });
  const result = document.getElementById('quiz-result');
  result.textContent = `You scored ${score} out of 3. ${score === 3 ? 'Excellent work.' : 'Review the lesson and try again.'}`;
}

function saveReflection(){
  const value = document.getElementById('reflection').value.trim();
  const status = document.getElementById('reflection-status');
  if(!value){
    status.textContent = 'Write a response before saving.';
    return;
  }
  localStorage.setItem('cla_lesson1_reflection', value);
  status.textContent = 'Reflection saved on this device.';
}

document.addEventListener('DOMContentLoaded', ()=>{
  const reflection = document.getElementById('reflection');
  if(reflection){
    reflection.value = localStorage.getItem('cla_lesson1_reflection') || '';
  }
});
