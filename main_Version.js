// Tab switching handler
document.querySelectorAll('.tab-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.tab-link').forEach(l => l.classList.remove('active'));
        link.classList.add('active');
        let tab = link.getAttribute('data-tab');
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        document.getElementById(tab).classList.add('active');
    });
});


// GAME: Save the Animals
const animalsPics = [
    "img/animal_bird.png", "img/animal_lion.png", "img/animal_deer.png",
    "img/animal_rabbit.png", "img/animal_butterfly.png"
];
let score = 0;
let gameActive = false;
let interval;
let animalTimer;

function randomPos(max) {
    return Math.floor(Math.random() * (max - 70));
}

function spawnAnimal() {
    if (!gameActive) return;
    let animalsDiv = document.getElementById('animals');
    // remove previous ones
    animalsDiv.innerHTML = '';
    // Random animal
    let animalImg = animalsPics[Math.floor(Math.random() * animalsPics.length)];
    let animalEl = document.createElement('img');
    animalEl.src = animalImg;
    animalEl.className = "animal";
    animalEl.style.left = randomPos(animalsDiv.offsetWidth) + "px";
    animalEl.style.top = randomPos(animalsDiv.offsetHeight) + "px";
    animalEl.onclick = function() {
        score++;
        document.getElementById('score').innerText = "Score: "+score;
        animalEl.remove();
    };
    animalsDiv.appendChild(animalEl);
    // Remove animal after 1.3 seconds
    animalTimer = setTimeout(() => {
        if (animalsDiv.contains(animalEl)) animalsDiv.removeChild(animalEl);
    }, 1300);
}

document.getElementById('start-game').onclick = function() {
    if (gameActive) return;
    gameActive = true;
    score = 0;
    document.getElementById('score').innerText = "Score: 0";
    let rounds = 0;
    document.getElementById('animals').innerHTML = '';
    interval = setInterval(() => {
        spawnAnimal();
        rounds++;
        if (rounds > 10) endGame();
    }, 1500);
}
function endGame() {
    clearInterval(interval);
    clearTimeout(animalTimer);
    gameActive = false;
    document.getElementById('animals').innerHTML = `<div style="font-size:1.4em;color:#227533;">Game Over!<br>Your Score: ${score}<br></div>`;
}

// Quiz
document.getElementById('quiz-form').onsubmit = function(e){
    e.preventDefault();
    let q1 = document.querySelector('input[name="q1"]:checked');
    let q2 = document.querySelector('input[name="q2"]:checked');
    let q3 = document.querySelector('input[name="q3"]:checked');
    let total = 0;
    if(q1 && q1.value === 'land') total++;
    if(q2 && q2.value === 'plant') total++;
    if(q3 && q3.value === 'lion') total++;
    let fb = document.getElementById('quiz-feedback');
    if(total === 3) {
        fb.innerText = "Awesome! You got all answers correct! 🌳";
    }
    else {
        fb.innerText = `You scored ${total}/3. Keep learning about nature!`;
    }
};


// AJAX Feedback (optional, works if PHP is set up)
document.getElementById('feedbackForm').onsubmit = function(e){
    e.preventDefault();
    let name = document.getElementById('name').value;
    let msg = document.getElementById('message').value;
    let resultDiv = document.getElementById('feedback-result');
    resultDiv.innerText = "Sending...";
    fetch('feedback.php', {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: `name=${encodeURIComponent(name)}&message=${encodeURIComponent(msg)}`
    })
    .then(x => x.text())
    .then(data => {
        resultDiv.innerText = data;
        document.getElementById('feedbackForm').reset();
    }).catch(() => { resultDiv.innerText = "Could not send feedback."; });
};