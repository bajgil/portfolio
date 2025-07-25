document.querySelectorAll('.square-hover').forEach(square => {
    square.addEventListener('click', function(e) {
        e.stopPropagation();
        const popup = document.getElementById('spec-popup');
        popup.innerHTML = this.getAttribute('data-spec');
        popup.style.display = 'block';

        // Pozycja kwadratu względem okna
        const rect = this.getBoundingClientRect();
        popup.style.left = (rect.left + rect.width / 2) + 'px';
        popup.style.top = (rect.bottom + 8) + 'px';
        popup.style.transform = 'translate(-50%, 0)';
    });
});

document.body.addEventListener('click', function(e) {
    const popup = document.getElementById('spec-popup');
    if (popup.style.display === 'block') {
        popup.style.display = 'none';
    }
});
// ...twój popup kod...

// Deszcz w tle
const canvas = document.getElementById('rain-canvas');
const ctx = canvas.getContext('2d');
let W = window.innerWidth;
let H = window.innerHeight;
canvas.width = W;
canvas.height = H;

window.addEventListener('resize', () => {
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = W;
    canvas.height = H;
});

const rainDrops = [];
for(let i = 0; i < 120; i++) {
    rainDrops.push({
        x: Math.random() * W,
        y: Math.random() * H,
        l: Math.random() * 20 + 10,
        xs: Math.random() * 2 - 1,
        ys: Math.random() * 12 + 8
    });
}

function drawRain() {
    ctx.clearRect(0, 0, W, H);
    ctx.strokeStyle = 'rgba(255,255,255,0.18)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    for(let i = 0; i < rainDrops.length; i++) {
        let r = rainDrops[i];
        ctx.moveTo(r.x, r.y);
        ctx.lineTo(r.x + r.xs, r.y + r.l);
    }
    ctx.stroke();
    moveRain();
}

function moveRain() {
    for(let i = 0; i < rainDrops.length; i++) {
        let r = rainDrops[i];
        r.x += r.xs;
        r.y += r.ys;
        if(r.x > W || r.y > H) {
            r.x = Math.random() * W;
            r.y = -20;
        }
    }
}

setInterval(drawRain, 33);
// Twój popup + deszcz...

const partyBtn = document.getElementById('party-btn');
const normalBtn = document.getElementById('normal-btn');
let confettiInterval = null;
let cats = [];

partyBtn.addEventListener('click', () => {
    document.body.classList.add('party-mode');
    partyBtn.style.display = 'none';
    normalBtn.style.display = 'block';
    normalBtn.style.position = 'fixed';
    normalBtn.style.top = partyBtn.style.top;
    normalBtn.style.right = partyBtn.style.right;

    // Confetti
    confettiInterval = setInterval(() => {
        for(let i=0;i<10;i++) {
            const conf = document.createElement('div');
            conf.className = 'confetti';
            conf.style.left = Math.random()*window.innerWidth + 'px';
            conf.style.top = '-20px';
            conf.style.background = `hsl(${Math.random()*360},90%,60%)`;
            conf.style.animationDuration = (1.5 + Math.random()*1.5) + 's';
            document.body.appendChild(conf);
            setTimeout(()=>conf.remove(), 3000);
        }
    }, 400);

    // Dancing cats
    for(let i=0;i<20;i++) {
        const cat = document.createElement('img');
        cat.src = 'cat.gif'; // podmień na swój plik GIF kota!
        cat.className = 'cat-dance';
        cat.style.left = (30 + i*120) + 'px';
        document.body.appendChild(cat);
        cats.push(cat);
    }
});

normalBtn.addEventListener('click', () => {
    document.body.classList.remove('party-mode');
    partyBtn.style.display = 'block';
    normalBtn.style.display = 'none';
    if(confettiInterval) clearInterval(confettiInterval);
    document.querySelectorAll('.confetti').forEach(e=>e.remove());
    cats.forEach(cat=>cat.remove());
    cats = [];
});
// ...Twój kod popup/confetti/party...

// Blokada na telefonie
function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
if(isMobile()) {
    document.getElementById('mobile-block').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}
document.getElementById('mobile-redirect').onclick = function() {
    window.location.href = "https://google.com";
};