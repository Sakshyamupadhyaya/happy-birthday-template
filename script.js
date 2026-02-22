/* HAPPY BIRTHDAY ANSHU - Interactive Script
   Progressive Unlock: Hero > Apology > Game1 > Compliments > Game2 > Universe */

document.addEventListener('DOMContentLoaded', () => {
    initParticles(); initTypewriter(); initScrollAnimations(); initFloatingHearts();
    initLoveNotes(); initApologyWordReveal(); initMouseSparkle(); launchConfetti();
    initNavDots(); initMusicToggle(); initPhotoInteraction(); initRainbowHeart();
});

/* ============ PARTICLES ============ */
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
    resize(); addEventListener('resize', resize);
    class P {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width; this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5; this.sx = (Math.random() - 0.5) * 0.15;
            this.sy = (Math.random() - 0.5) * 0.15; this.p = Math.random() * 6.28;
            this.ps = Math.random() * 0.02 + 0.005;
            this.c = ['255,107,107', '255,215,0', '255,105,180', '0,212,255', '200,200,255'][Math.floor(Math.random() * 5)];
        }
        update() {
            this.x += this.sx; this.y += this.sy; this.p += this.ps;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            const o = 0.15 + Math.sin(this.p) * 0.25;
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, 6.28);
            ctx.fillStyle = `rgba(${this.c},${Math.max(0, o)})`; ctx.fill();
            ctx.beginPath(); ctx.arc(this.x, this.y, this.size * 3, 0, 6.28);
            ctx.fillStyle = `rgba(${this.c},${Math.max(0, o * 0.08)})`; ctx.fill();
        }
    }
    for (let i = 0; i < 80; i++) particles.push(new P());
    (function anim() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        for (let i = 0; i < particles.length; i++) for (let j = i + 1; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y, d = Math.sqrt(dx * dx + dy * dy);
            if (d < 90) {
                ctx.beginPath(); ctx.strokeStyle = `rgba(255,215,0,${0.03 * (1 - d / 90)})`;
                ctx.lineWidth = 0.5; ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y); ctx.stroke();
            }
        }
        requestAnimationFrame(anim);
    })();
}

/* ============ TYPEWRITER ============ */
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    const phrases = ['You deserve the best birthday ever 🎂', 'तिमी सबैभन्दा राम्री छौ ✨',
        'Keep smiling, it suits you 😊', 'Another year of being amazing 🌟',
        'तिम्रो दिन शुभ होस् 💫', 'Play the games to unlock surprises! 🎁'];
    let pi = 0, ci = 0, del = false;
    function type() {
        const cur = phrases[pi];
        if (!del) {
            el.textContent = cur.substring(0, ci + 1); ci++;
            if (ci === cur.length) { setTimeout(() => { del = true; type(); }, 2500); return; }
        } else {
            el.textContent = cur.substring(0, ci); ci--;
            if (ci < 0) { del = false; ci = 0; pi = (pi + 1) % phrases.length; }
        }
        setTimeout(type, del ? 30 : 65);
    }
    setTimeout(type, 2000);
}

/* ============ SCROLL ANIMATIONS ============ */
function initScrollAnimations() {
    const obs = new IntersectionObserver(e => {
        e.forEach(en => { if (en.isIntersecting) en.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
    document.querySelectorAll('.animate-on-scroll,.section-title,.apology-card,.wish-card,.game-wrapper,.game-teaser').forEach(el => obs.observe(el));
}

/* ============ FLOATING ITEMS ============ */
function initFloatingHearts() {
    const hero = document.getElementById('hero');
    const items = ['🎂', '🎉', '🎁', '🥳', '🎈', '✨', '🌸', '🎊', '⭐', '🍰'];
    function create() {
        const el = document.createElement('span'); el.classList.add('floating-heart');
        el.textContent = items[Math.floor(Math.random() * items.length)];
        el.style.left = Math.random() * 100 + '%'; el.style.fontSize = (Math.random() * 16 + 12) + 'px';
        el.style.animationDuration = (Math.random() * 6 + 7) + 's'; el.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(el); setTimeout(() => el.remove(), 15000);
    }
    for (let i = 0; i < 12; i++) setTimeout(create, i * 350); setInterval(create, 1800);
}

/* ============ APOLOGY WORD REVEAL ============ */
function initApologyWordReveal() {
    const at = document.getElementById('apologyText'); const text = at.textContent.trim(); at.innerHTML = '';
    text.split(/\s+/).forEach((w, i) => {
        const s = document.createElement('span'); s.classList.add('word');
        s.textContent = w + ' '; s.style.transitionDelay = (i * 0.04) + 's'; at.appendChild(s);
    });
    const obs = new IntersectionObserver(e => {
        e.forEach(en => {
            if (en.isIntersecting) at.querySelectorAll('.word').forEach(w => w.classList.add('visible'));
        });
    }, { threshold: 0.2 });
    obs.observe(at);
}

/* ============ LOVE NOTES ============ */
function initLoveNotes() {
    document.querySelectorAll('.love-note').forEach(note => {
        note.addEventListener('click', () => {
            note.classList.add('revealed');
            const emojis = ['✨', '🎉', '💖', '⭐', '🌸'];
            for (let i = 0; i < 5; i++) {
                const h = document.createElement('span'); h.textContent = emojis[i];
                h.style.cssText = `position:fixed;left:${note.getBoundingClientRect().left + note.offsetWidth / 2}px;top:${note.getBoundingClientRect().top}px;font-size:16px;pointer-events:none;z-index:9999;transition:all 0.8s ease-out;`;
                document.body.appendChild(h);
                requestAnimationFrame(() => { h.style.transform = `translate(${(Math.random() - 0.5) * 100}px,${-60 - Math.random() * 60}px) scale(0)`; h.style.opacity = '0'; });
                setTimeout(() => h.remove(), 900);
            }
        });
    });
}

/* ============ SPARKLE ============ */
function initMouseSparkle() {
    let last = 0;
    function create(x, y) {
        const now = Date.now(); if (now - last < 70) return; last = now;
        const s = document.createElement('div'); s.classList.add('sparkle');
        s.style.left = x + 'px'; s.style.top = y + 'px';
        const sz = Math.random() * 6 + 3; s.style.width = sz + 'px'; s.style.height = sz + 'px';
        const colors = ['#ff6b6b', '#ffd700', '#ff69b4', '#00d4ff'];
        s.style.background = colors[Math.floor(Math.random() * colors.length)];
        s.style.boxShadow = `0 0 6px ${s.style.background}`;
        document.body.appendChild(s); setTimeout(() => s.remove(), 800);
    }
    document.addEventListener('mousemove', e => create(e.clientX, e.clientY));
    document.addEventListener('touchmove', e => create(e.touches[0].clientX, e.touches[0].clientY), { passive: true });
}

/* ============ CONFETTI ============ */
function launchConfetti(dur = 3500) {
    const c = document.getElementById('confetti-container');
    const colors = ['#ff6b6b', '#ffd700', '#ff69b4', '#00d4ff', '#7cff6b', '#ff9a56', '#c44dff'];
    let count = 0;
    const iv = setInterval(() => {
        for (let i = 0; i < 5; i++) {
            const p = document.createElement('div'); p.classList.add('confetti-piece');
            p.style.left = Math.random() * 100 + '%'; p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const w = Math.random() * 8 + 5; p.style.width = w + 'px'; p.style.height = w + 'px';
            if (Math.random() > 0.5) p.style.borderRadius = '50%'; p.style.animationDuration = (Math.random() * 3 + 2) + 's';
            c.appendChild(p); setTimeout(() => p.remove(), 5500);
        }
        count += 100; if (count >= dur) clearInterval(iv);
    }, 100);
}

/* ============ NAV / MUSIC / PHOTO / HEART ============ */
function initNavDots() {
    const dots = document.querySelectorAll('.nav-dot');
    const obs = new IntersectionObserver(e => {
        e.forEach(en => {
            if (en.isIntersecting) {
                dots.forEach(d => d.classList.remove('active'));
                const ad = document.querySelector(`.nav-dot[data-section="${en.target.id}"]`);
                if (ad) ad.classList.add('active');
            }
        });
    }, { threshold: 0.35 });
    ['hero', 'apology', 'game1', 'compliments', 'game2', 'universe'].forEach(id => {
        const el = document.getElementById(id); if (el) obs.observe(el);
    });
}
function scrollToSection(id) { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }

function initMusicToggle() {
    const btn = document.getElementById('musicToggle'), audio = document.getElementById('bgMusic');
    let playing = false;
    btn.addEventListener('click', () => {
        if (playing) { audio.pause(); playing = false; btn.classList.remove('playing'); btn.textContent = '🎵'; }
        else { audio.volume = 0.5; audio.play().catch(() => { }); playing = true; btn.classList.add('playing'); btn.textContent = '🔇'; }
    });
    document.addEventListener('click', function auto() {
        if (!playing) {
            audio.volume = 0.5;
            audio.play().then(() => { playing = true; btn.classList.add('playing'); btn.textContent = '🔇'; }).catch(() => { });
        }
        document.removeEventListener('click', auto);
    }, { once: true });
}

function initPhotoInteraction() {
    const photo = document.querySelector('.photo-frame');
    photo.addEventListener('click', () => {
        photo.style.animation = 'none'; void photo.offsetHeight;
        photo.style.animation = 'photo-glow 3s ease-in-out infinite';
        for (let i = 0; i < 12; i++) {
            const h = document.createElement('span');
            h.textContent = ['🎂', '🎉', '✨', '💖', '🎁', '⭐'][Math.floor(Math.random() * 6)];
            const r = photo.getBoundingClientRect();
            h.style.cssText = `position:fixed;left:${r.left + r.width / 2}px;top:${r.top + r.height / 2}px;font-size:22px;pointer-events:none;z-index:9999;transition:all 1s cubic-bezier(0.175,0.885,0.32,1.275);`;
            document.body.appendChild(h); const ang = (i / 12) * 6.28, dist = 70 + Math.random() * 50;
            requestAnimationFrame(() => { h.style.transform = `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) scale(0)`; h.style.opacity = '0'; });
            setTimeout(() => h.remove(), 1200);
        }
    });
}

function initRainbowHeart() {
    const heart = document.getElementById('rainbowHeart');
    const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🩷', '🤍']; let idx = 0;
    setInterval(() => { idx = (idx + 1) % hearts.length; heart.textContent = hearts[idx]; }, 500);
}

/* ==========================================================
   CANVAS SHAPE HELPERS (no emoji - works on ALL devices)
   ========================================================== */
function drawHeart(ctx, x, y, sz, c1 = '#ff3366', c2 = '#ff6b9d') {
    const s = sz / 30; ctx.save(); ctx.translate(x, y);
    ctx.beginPath(); ctx.moveTo(0, s * 8);
    ctx.bezierCurveTo(-s * 15, -s * 8, -s * 15, -s * 18, 0, -s * 12);
    ctx.bezierCurveTo(s * 15, -s * 18, s * 15, -s * 8, 0, s * 8);
    const g = ctx.createLinearGradient(0, -s * 18, 0, s * 8);
    g.addColorStop(0, c1); g.addColorStop(1, c2);
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.4)'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.restore();
}

function drawBrokenHeart(ctx, x, y, sz) {
    const s = sz / 30; ctx.save(); ctx.translate(x, y);
    ctx.beginPath(); ctx.moveTo(-1 * s, s * 8);
    ctx.bezierCurveTo(-s * 15, -s * 8, -s * 15, -s * 18, 0, -s * 12);
    ctx.lineTo(-s * 2, -s * 4); ctx.lineTo(s * 1, -s * 8); ctx.closePath();
    ctx.fillStyle = '#cc0033'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(s * 3, s * 10);
    ctx.bezierCurveTo(s * 17, -s * 6, s * 17, -s * 16, s * 2, -s * 10);
    ctx.lineTo(s * 4, -s * 2); ctx.lineTo(s * 1, -s * 6); ctx.closePath();
    ctx.fillStyle = '#990022'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -s * 12); ctx.lineTo(-s * 2, -s * 4); ctx.lineTo(s * 1, -s * 8);
    ctx.strokeStyle = '#ff4444'; ctx.lineWidth = 2; ctx.stroke();
    ctx.restore();
}

function drawStar5(ctx, x, y, sz, color = '#ffd700') {
    const s = sz * 0.5; ctx.save(); ctx.translate(x, y); ctx.beginPath();
    for (let i = 0; i < 10; i++) {
        const ang = (i * Math.PI / 5) - Math.PI / 2, r = i % 2 === 0 ? s : s * 0.4;
        ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(ang) * r, Math.sin(ang) * r);
    }
    ctx.closePath();
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, s);
    g.addColorStop(0, '#fffacd'); g.addColorStop(0.5, color); g.addColorStop(1, '#b8860b');
    ctx.fillStyle = g; ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,0.5)'; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
}

function drawGift(ctx, x, y, sz) {
    const s = sz * 0.35; ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = '#ff6b6b'; ctx.fillRect(-s, -s * 0.2, s * 2, s * 1.2);
    ctx.fillStyle = '#ee4444'; ctx.fillRect(-s * 1.1, -s * 0.6, s * 2.2, s * 0.5);
    ctx.fillStyle = '#ffd700'; ctx.fillRect(-s * 0.1, -s * 0.6, s * 0.2, s * 1.8);
    ctx.fillStyle = '#ffd700'; ctx.fillRect(-s * 1.1, -s * 0.05, s * 2.2, s * 0.2);
    ctx.beginPath(); ctx.arc(-s * 0.25, -s * 0.7, s * 0.2, 0, 6.28); ctx.fillStyle = '#ffd700'; ctx.fill();
    ctx.beginPath(); ctx.arc(s * 0.25, -s * 0.7, s * 0.2, 0, 6.28); ctx.fill();
    ctx.restore();
}

function drawCake(ctx, x, y, sz) {
    const s = sz * 0.35; ctx.save(); ctx.translate(x, y);
    ctx.fillStyle = '#d4874e'; ctx.fillRect(-s, s * 0.1, s * 2, s * 0.8);
    ctx.fillStyle = '#ff9ec6'; ctx.beginPath(); ctx.ellipse(0, s * 0.1, s, s * 0.3, 0, 0, 6.28); ctx.fill();
    ctx.fillStyle = '#ffdd57'; ctx.fillRect(-s * 0.08, -s * 0.6, s * 0.16, s * 0.5);
    ctx.beginPath(); ctx.arc(0, -s * 0.7, s * 0.14, 0, 6.28); ctx.fillStyle = '#ff6600'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, -s * 0.75, s * 0.07, 0, 6.28); ctx.fillStyle = '#ffff00'; ctx.fill();
    ctx.restore();
}

function drawRocket(ctx, x, y, sz) {
    const s = sz * 0.5; ctx.save(); ctx.translate(x, y);
    ctx.beginPath(); ctx.moveTo(0, -s * 1.4);
    ctx.quadraticCurveTo(s * 0.5, -s * 0.7, s * 0.4, s * 0.5);
    ctx.lineTo(-s * 0.4, s * 0.5);
    ctx.quadraticCurveTo(-s * 0.5, -s * 0.7, 0, -s * 1.4);
    const bg = ctx.createLinearGradient(-s * 0.4, 0, s * 0.4, 0);
    bg.addColorStop(0, '#ccc'); bg.addColorStop(0.5, '#fff'); bg.addColorStop(1, '#aaa');
    ctx.fillStyle = bg; ctx.fill();
    ctx.beginPath(); ctx.moveTo(0, -s * 1.4); ctx.quadraticCurveTo(s * 0.3, -s, s * 0.25, -s * 0.7);
    ctx.lineTo(-s * 0.25, -s * 0.7); ctx.quadraticCurveTo(-s * 0.3, -s, 0, -s * 1.4);
    ctx.fillStyle = '#ff3333'; ctx.fill();
    ctx.beginPath(); ctx.arc(0, -s * 0.3, s * 0.18, 0, 6.28); ctx.fillStyle = '#00ccff'; ctx.fill();
    ctx.beginPath(); ctx.arc(-s * 0.04, -s * 0.34, s * 0.07, 0, 6.28); ctx.fillStyle = 'rgba(255,255,255,0.5)'; ctx.fill();
    ctx.fillStyle = '#ff3333';
    ctx.beginPath(); ctx.moveTo(-s * 0.4, s * 0.3); ctx.lineTo(-s * 0.7, s * 0.7); ctx.lineTo(-s * 0.4, s * 0.5); ctx.fill();
    ctx.beginPath(); ctx.moveTo(s * 0.4, s * 0.3); ctx.lineTo(s * 0.7, s * 0.7); ctx.lineTo(s * 0.4, s * 0.5); ctx.fill();
    const f = 0.8 + Math.random() * 0.4;
    ctx.beginPath(); ctx.moveTo(-s * 0.2, s * 0.5); ctx.quadraticCurveTo(0, s * (0.5 + 0.6 * f), s * 0.2, s * 0.5);
    ctx.fillStyle = '#ff6600'; ctx.fill();
    ctx.beginPath(); ctx.moveTo(-s * 0.1, s * 0.5); ctx.quadraticCurveTo(0, s * (0.5 + 0.4 * f), s * 0.1, s * 0.5);
    ctx.fillStyle = '#ffcc00'; ctx.fill();
    ctx.restore();
}

function drawAsteroid(ctx, x, y, sz, rot) {
    const s = sz * 0.5; ctx.save(); ctx.translate(x, y); ctx.rotate(rot);
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
        const a = (i / 8) * 6.28, r = s * (0.7 + ((i * 7 + 3) % 5) * 0.08);
        ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * r, Math.sin(a) * r);
    }
    ctx.closePath();
    const g = ctx.createRadialGradient(-s * 0.2, -s * 0.2, 0, 0, 0, s);
    g.addColorStop(0, '#aa8866'); g.addColorStop(0.7, '#775533'); g.addColorStop(1, '#553322');
    ctx.fillStyle = g; ctx.fill(); ctx.strokeStyle = '#664422'; ctx.lineWidth = 1.5; ctx.stroke();
    ctx.beginPath(); ctx.arc(s * 0.15, -s * 0.1, s * 0.12, 0, 6.28); ctx.fillStyle = 'rgba(0,0,0,0.2)'; ctx.fill();
    ctx.beginPath(); ctx.arc(-s * 0.2, s * 0.15, s * 0.08, 0, 6.28); ctx.fillStyle = 'rgba(0,0,0,0.15)'; ctx.fill();
    ctx.restore();
}

/* ==========================================================
           GAME 1: Catch the Hearts
   Broken heart = INSTANT DEATH
   ========================================================== */
let g1Running = false, g1Score = 0, g1Lives = 5, g1AnimId = null, g1Start = 0;
const G1_TYPES = ['heart', 'cake', 'gift', 'star', 'heart'];

function startGame() {
    const canvas = document.getElementById('game-canvas'), ctx = canvas.getContext('2d');
    const btn = document.getElementById('gameBtn');
    g1Score = 0; g1Lives = 5; g1Running = true; g1Start = Date.now();
    updateG1UI(); btn.style.display = 'none';
    const cw = canvas.parentElement.clientWidth;
    canvas.width = cw - 4; canvas.height = Math.min(500, Math.max(350, innerHeight * 0.55));

    const bW = 90, basket = { x: canvas.width / 2 - bW / 2, y: canvas.height - 50, width: bW, height: 36, tx: canvas.width / 2 - bW / 2 };
    let hearts = [], spawnI = 900, lastSpawn = -1, diffT = -1;

    function handleMove(cx) {
        const r = canvas.getBoundingClientRect();
        basket.tx = Math.max(0, Math.min(canvas.width - basket.width, cx - r.left - basket.width / 2));
    }
    canvas.onmousemove = e => handleMove(e.clientX);
    canvas.ontouchmove = e => { e.preventDefault(); handleMove(e.touches[0].clientX); };
    canvas.ontouchstart = e => { e.preventDefault(); handleMove(e.touches[0].clientX); };

    function loop(t) {
        if (!g1Running) return;
        if (lastSpawn < 0) { lastSpawn = t; diffT = t; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bg.addColorStop(0, 'rgba(26,15,10,0.5)'); bg.addColorStop(1, 'rgba(10,10,26,0.8)');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);

        if (t - lastSpawn > spawnI) {
            const isBomb = Math.random() < 0.15;
            hearts.push({
                x: Math.random() * (canvas.width - 40) + 20, y: -30,
                speed: 2.5 + Math.random() * 2 + (g1Score * 0.05),
                isBomb, type: isBomb ? 'bomb' : G1_TYPES[Math.floor(Math.random() * G1_TYPES.length)],
                size: 28 + Math.random() * 8, rot: 0, rotS: (Math.random() - 0.5) * 0.06,
                wobble: Math.random() * 6.28, wobbleS: 0.025 + Math.random() * 0.02
            });
            lastSpawn = t;
        }
        if (t - diffT > 4000) { spawnI = Math.max(350, spawnI - 80); diffT = t; }
        basket.x += (basket.tx - basket.x) * 0.18;

        // Basket
        ctx.save();
        const bG = ctx.createLinearGradient(basket.x, basket.y, basket.x + basket.width, basket.y + basket.height);
        bG.addColorStop(0, '#ff6b6b'); bG.addColorStop(1, '#ffd700');
        ctx.fillStyle = bG; ctx.beginPath(); ctx.roundRect(basket.x, basket.y, basket.width, basket.height, 10); ctx.fill();
        // Basket lines
        ctx.strokeStyle = 'rgba(255,255,255,0.3)'; ctx.lineWidth = 1;
        for (let i = 1; i < 4; i++) {
            ctx.beginPath(); ctx.moveTo(basket.x + i * basket.width / 4, basket.y);
            ctx.lineTo(basket.x + i * basket.width / 4, basket.y + basket.height); ctx.stroke();
        }
        ctx.restore();

        hearts = hearts.filter(h => {
            h.y += h.speed; h.rot += h.rotS; h.wobble += h.wobbleS;
            const wx = Math.sin(h.wobble) * 12;
            ctx.save(); ctx.translate(h.x + wx, h.y); ctx.rotate(h.rot);
            if (h.isBomb) {
                ctx.beginPath(); ctx.arc(0, 0, h.size * 0.6, 0, 6.28); ctx.fillStyle = 'rgba(255,0,0,0.15)'; ctx.fill();
                drawBrokenHeart(ctx, 0, 0, h.size);
            } else if (h.type === 'heart') drawHeart(ctx, 0, 0, h.size);
            else if (h.type === 'star') drawStar5(ctx, 0, 0, h.size * 0.7);
            else if (h.type === 'gift') drawGift(ctx, 0, 0, h.size);
            else if (h.type === 'cake') drawCake(ctx, 0, 0, h.size);
            ctx.restore();

            const hx = h.x + wx;
            if (h.y + 8 >= basket.y && h.y <= basket.y + basket.height && hx >= basket.x - 12 && hx <= basket.x + basket.width + 12) {
                if (h.isBomb) { g1Lives = 0; flashC(canvas, 'rgba(255,0,0,0.35)'); updateG1UI(); endGame1Broken(canvas, ctx); return false; }
                else {
                    g1Score++; flashC(canvas, 'rgba(255,215,0,0.1)'); updateG1UI();
                    if (g1Score >= 15) { endGame1(true, canvas, ctx); return false; }
                }
                return false;
            }
            if (h.y > canvas.height + 20) {
                if (!h.isBomb) {
                    g1Lives--; updateG1UI();
                    if (g1Lives <= 0) { endGame1(false, canvas, ctx); return false; }
                } return false;
            }
            return true;
        });
        document.getElementById('gameTime').textContent = Math.floor((Date.now() - g1Start) / 1000) + 's';
        g1AnimId = requestAnimationFrame(loop);
    }
    g1AnimId = requestAnimationFrame(loop);
}

function flashC(canvas, color) {
    const ov = document.createElement('div');
    ov.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;background:${color};pointer-events:none;z-index:10;border-radius:14px;transition:opacity 0.3s;`;
    canvas.parentElement.style.position = 'relative'; canvas.parentElement.appendChild(ov);
    setTimeout(() => ov.style.opacity = '0', 50); setTimeout(() => ov.remove(), 400);
}
function updateG1UI() {
    document.getElementById('gameScore').textContent = g1Score;
    document.getElementById('gameLives').textContent = g1Lives;
    const el = document.getElementById('gameScore'); el.style.transform = 'scale(1.3)';
    setTimeout(() => el.style.transform = 'scale(1)', 200);
}

function endGame1Broken(canvas, ctx) {
    g1Running = false; cancelAnimationFrame(g1AnimId);
    const btn = document.getElementById('gameBtn');
    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = 'rgba(10,0,0,0.95)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    drawBrokenHeart(ctx, canvas.width / 2, canvas.height / 2 - 30, 60);
    ctx.font = '15px Poppins,sans-serif'; ctx.fillStyle = '#ff4444'; ctx.textAlign = 'center';
    ctx.fillText('Relationships are not meant', canvas.width / 2, canvas.height / 2 + 30);
    ctx.fillText('for broken hearts, Anshu..', canvas.width / 2, canvas.height / 2 + 52);
    ctx.font = '11px Poppins,sans-serif'; ctx.fillStyle = 'rgba(245,240,255,0.4)';
    ctx.fillText('Avoid the broken heart next time!', canvas.width / 2, canvas.height / 2 + 80);
    btn.style.display = 'inline-block'; btn.textContent = '🔄 Try Again';
}

function endGame1(won, canvas, ctx) {
    g1Running = false; cancelAnimationFrame(g1AnimId);
    const btn = document.getElementById('gameBtn');
    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = 'rgba(10,10,26,0.92)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (won) {
        drawStar5(ctx, canvas.width / 2 - 40, canvas.height / 2 - 25, 22); drawHeart(ctx, canvas.width / 2, canvas.height / 2 - 25, 25);
        drawStar5(ctx, canvas.width / 2 + 40, canvas.height / 2 - 25, 22);
        ctx.font = '16px Poppins,sans-serif'; ctx.fillStyle = '#ffd700'; ctx.textAlign = 'center';
        ctx.fillText('Nice! Level 1 cleared!', canvas.width / 2, canvas.height / 2 + 15);
        ctx.font = '12px Poppins,sans-serif'; ctx.fillStyle = 'rgba(245,240,255,0.5)';
        ctx.fillText('Scroll down for your reward!', canvas.width / 2, canvas.height / 2 + 40);
        launchConfetti(3000); setTimeout(() => unlockCompliments(), 1200);
    } else {
        ctx.font = '16px Poppins,sans-serif'; ctx.fillStyle = '#ff6b6b'; ctx.textAlign = 'center';
        ctx.fillText('So close! Try again!', canvas.width / 2, canvas.height / 2 + 18);
        btn.style.display = 'inline-block'; btn.textContent = '🔄 Retry';
    }
}

/* ============ PROGRESSIVE UNLOCK ============ */
function unlockCompliments() {
    const comp = document.getElementById('compliments'); comp.style.display = 'flex';
    const g2 = document.getElementById('game2'); g2.style.display = 'flex';
    const nav = document.getElementById('navDots');
    if (!document.querySelector('.nav-dot[data-section="compliments"]')) {
        const d1 = document.createElement('div'); d1.className = 'nav-dot'; d1.setAttribute('data-section', 'compliments');
        d1.setAttribute('data-label', 'For You'); d1.onclick = () => scrollToSection('compliments'); nav.appendChild(d1);
        const d2 = document.createElement('div'); d2.className = 'nav-dot'; d2.setAttribute('data-section', 'game2');
        d2.setAttribute('data-label', 'Game 2'); d2.onclick = () => scrollToSection('game2'); nav.appendChild(d2);
    }
    setTimeout(() => { comp.scrollIntoView({ behavior: 'smooth' }); initScrollAnimations(); }, 300);
}

/* ==========================================================
           GAME 2: Galaxy Runner (HARD)
   ========================================================== */
let g2Running = false, g2Score = 0, g2Lives = 3, g2AnimId = null, g2SpeedMul = 1;

function startGame2() {
    const canvas = document.getElementById('game2-canvas'), ctx = canvas.getContext('2d');
    const btn = document.getElementById('game2Btn');
    g2Score = 0; g2Lives = 3; g2Running = true; g2SpeedMul = 1;
    updateG2UI(); btn.style.display = 'none';
    const cw = canvas.parentElement.clientWidth;
    canvas.width = cw - 4; canvas.height = Math.min(500, Math.max(380, innerHeight * 0.58));

    const ship = { x: canvas.width / 2, y: canvas.height - 60, tx: canvas.width / 2, trail: [] };
    let asteroids = [], stars = [], bgStars = [];
    let spawnI = 900, lastSpawn = -1, starsSpawnI = 800, lastStarSpawn = -1;
    let diffTimer = -1, shakeTime = 0, frameCount = 0;

    for (let i = 0; i < 60; i++) bgStars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3, speed: Math.random() * 0.8 + 0.3, b: Math.random() * 0.5 + 0.3
    });

    function handleMove(cx) {
        const r = canvas.getBoundingClientRect();
        ship.tx = Math.max(15, Math.min(canvas.width - 15, cx - r.left));
    }
    canvas.onmousemove = e => handleMove(e.clientX);
    canvas.ontouchmove = e => { e.preventDefault(); handleMove(e.touches[0].clientX); };
    canvas.ontouchstart = e => { e.preventDefault(); handleMove(e.touches[0].clientX); };

    function loop(t) {
        if (!g2Running) return;
        frameCount++;
        if (lastSpawn < 0) { lastSpawn = t; lastStarSpawn = t; diffTimer = t; }

        ctx.save();
        if (shakeTime > 0) { ctx.translate(Math.random() * 8 - 4, Math.random() * 8 - 4); shakeTime--; }
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const bg = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bg.addColorStop(0, '#020210'); bg.addColorStop(0.5, '#050520'); bg.addColorStop(1, '#0a0a30');
        ctx.fillStyle = bg; ctx.fillRect(0, 0, canvas.width, canvas.height);

        bgStars.forEach(s => {
            s.y += s.speed * g2SpeedMul;
            if (s.y > canvas.height) { s.y = 0; s.x = Math.random() * canvas.width; }
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, 6.28);
            ctx.fillStyle = `rgba(255,255,255,${s.b})`; ctx.fill();
        });

        if (g2SpeedMul > 1.5) for (let i = 0; i < 4; i++) {
            const lx = Math.random() * canvas.width;
            ctx.beginPath(); ctx.moveTo(lx, Math.random() * canvas.height); ctx.lineTo(lx, canvas.height);
            ctx.strokeStyle = `rgba(0,212,255,${0.03 * g2SpeedMul})`; ctx.lineWidth = 0.5; ctx.stroke();
        }

        if (t - lastSpawn > spawnI / g2SpeedMul) {
            const cnt = g2SpeedMul > 2.5 ? 2 : 1;
            for (let c = 0; c < cnt; c++) asteroids.push({
                x: Math.random() * (canvas.width - 30) + 15, y: -30,
                size: 22 + Math.random() * 14, speed: (2 + Math.random() * 1.5) * g2SpeedMul, rot: 0, rotS: (Math.random() - 0.5) * 0.1
            });
            lastSpawn = t;
        }

        if (t - lastStarSpawn > starsSpawnI) {
            stars.push({
                x: Math.random() * (canvas.width - 30) + 15, y: -20,
                speed: (1.2 + Math.random() * 0.8) * Math.min(g2SpeedMul, 2), pulse: Math.random() * 6.28
            });
            lastStarSpawn = t;
        }

        if (t - diffTimer > 4000) {
            g2SpeedMul = Math.min(3.5, g2SpeedMul + 0.15);
            spawnI = Math.max(280, spawnI - 30); starsSpawnI = Math.max(650, starsSpawnI - 40); diffTimer = t;
            document.getElementById('g2Speed').textContent = g2SpeedMul.toFixed(1) + 'x';
        }

        ship.x += (ship.tx - ship.x) * 0.14;
        ship.trail.push({ x: ship.x, y: ship.y, a: 1 }); if (ship.trail.length > 15) ship.trail.shift();
        ship.trail.forEach((p, i) => {
            const a = (i / ship.trail.length) * 0.4;
            ctx.beginPath(); ctx.arc(p.x, p.y + 12, 3, 0, 6.28); ctx.fillStyle = `rgba(0,212,255,${a})`; ctx.fill(); p.y += 0.5;
        });

        // Engine glow
        const eg = ctx.createRadialGradient(ship.x, ship.y + 20, 0, ship.x, ship.y + 20, 22);
        eg.addColorStop(0, 'rgba(0,212,255,0.4)'); eg.addColorStop(0.5, 'rgba(124,58,237,0.15)'); eg.addColorStop(1, 'transparent');
        ctx.fillStyle = eg; ctx.fillRect(ship.x - 22, ship.y + 2, 44, 35);

        // Ship as canvas shape
        drawRocket(ctx, ship.x, ship.y, 40);

        // Shield ring
        ctx.beginPath(); ctx.arc(ship.x, ship.y - 5, 28, 0, 6.28);
        ctx.strokeStyle = `rgba(0,212,255,${0.15 + Math.sin(frameCount * 0.05) * 0.1})`; ctx.lineWidth = 1.5; ctx.stroke();

        // Asteroids
        asteroids = asteroids.filter(a => {
            a.y += a.speed; a.rot += a.rotS;
            drawAsteroid(ctx, a.x, a.y, a.size, a.rot);
            // Danger glow
            ctx.beginPath(); ctx.arc(a.x, a.y, a.size * 0.5, 0, 6.28); ctx.fillStyle = 'rgba(255,100,0,0.08)'; ctx.fill();
            const dx = a.x - ship.x, dy = a.y - (ship.y - 5);
            if (Math.sqrt(dx * dx + dy * dy) < a.size * 0.45 + 18) {
                g2Lives--; shakeTime = 12; flashC(canvas, 'rgba(255,50,50,0.3)'); updateG2UI();
                if (g2Lives <= 0) { endGame2(false, canvas, ctx); return false; } return false;
            }
            return a.y < canvas.height + 30;
        });

        // Stars
        stars = stars.filter(s => {
            s.y += s.speed; s.pulse += 0.08;
            // Glow circle
            ctx.beginPath(); ctx.arc(s.x, s.y, 18, 0, 6.28);
            ctx.fillStyle = `rgba(255,215,0,${0.2 + Math.sin(s.pulse) * 0.1})`; ctx.fill();
            const sc = 1 + Math.sin(s.pulse) * 0.15;
            ctx.save(); ctx.translate(s.x, s.y); ctx.scale(sc, sc);
            drawStar5(ctx, 0, 0, 20, '#ffd700');
            ctx.restore();
            const dx = s.x - ship.x, dy = s.y - (ship.y - 5);
            if (Math.sqrt(dx * dx + dy * dy) < 30) {
                g2Score++; flashC(canvas, 'rgba(255,215,0,0.12)'); updateG2UI();
                if (g2Score >= 20) { endGame2(true, canvas, ctx); return false; } return false;
            }
            return s.y < canvas.height + 20;
        });

        ctx.restore();
        g2AnimId = requestAnimationFrame(loop);
    }
    g2AnimId = requestAnimationFrame(loop);
}

function updateG2UI() {
    document.getElementById('g2Score').textContent = g2Score;
    document.getElementById('g2Lives').textContent = g2Lives;
    const el = document.getElementById('g2Score'); el.style.transform = 'scale(1.3)';
    setTimeout(() => el.style.transform = 'scale(1)', 200);
}

function endGame2(won, canvas, ctx) {
    g2Running = false; cancelAnimationFrame(g2AnimId);
    const btn = document.getElementById('game2Btn');
    ctx.clearRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = 'rgba(5,5,21,0.95)'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    if (won) {
        drawRocket(ctx, canvas.width / 2 - 50, canvas.height / 2 - 50, 30);
        drawStar5(ctx, canvas.width / 2, canvas.height / 2 - 55, 18);
        drawRocket(ctx, canvas.width / 2 + 50, canvas.height / 2 - 50, 30);
        ctx.font = '14px Poppins,sans-serif'; ctx.fillStyle = '#ffd700'; ctx.textAlign = 'center';
        ctx.fillText('The effort you gave to win this game...', canvas.width / 2, canvas.height / 2 - 5);
        ctx.fillText('why not give the same effort', canvas.width / 2, canvas.height / 2 + 18);
        ctx.fillText('to win in our relationship?', canvas.width / 2, canvas.height / 2 + 41);
        ctx.font = '11px Poppins,sans-serif'; ctx.fillStyle = 'rgba(0,212,255,0.6)';
        ctx.fillText('Something special is coming...', canvas.width / 2, canvas.height / 2 + 72);
        setTimeout(() => triggerWarp(), 4000);
    } else {
        ctx.font = '15px Poppins,sans-serif'; ctx.fillStyle = '#ff6b6b'; ctx.textAlign = 'center';
        ctx.fillText('Ship destroyed! Try again?', canvas.width / 2, canvas.height / 2 + 15);
        btn.style.display = 'inline-block'; btn.textContent = '🚀 Retry Launch';
    }
}

/* ============ WARP TRANSITION ============ */
function triggerWarp() {
    const overlay = document.getElementById('warp-overlay'); overlay.classList.add('active');
    const wC = document.createElement('canvas');
    wC.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;z-index:10001;pointer-events:none;';
    wC.width = innerWidth; wC.height = innerHeight; document.body.appendChild(wC);
    const wCtx = wC.getContext('2d'), cx = wC.width / 2, cy = wC.height / 2;
    let lines = [], frame = 0; const total = 90;
    for (let i = 0; i < 200; i++) lines.push({
        angle: Math.random() * 6.28, dist: Math.random() * 30,
        speed: 3 + Math.random() * 8, length: 2, maxLength: 40 + Math.random() * 100,
        color: ['#00d4ff', '#7c3aed', '#ffd700', '#ff6b6b', '#ffffff'][Math.floor(Math.random() * 5)],
        width: Math.random() * 2 + 0.5
    });
    function anim() {
        frame++; const p = frame / total; wCtx.clearRect(0, 0, wC.width, wC.height);
        if (p > 0.4 && p < 0.7) {
            const fi = 1 - Math.abs(p - 0.55) / 0.15;
            const fg = wCtx.createRadialGradient(cx, cy, 0, cx, cy, wC.width * 0.6);
            fg.addColorStop(0, `rgba(255,255,255,${fi * 0.8})`); fg.addColorStop(0.3, `rgba(0,212,255,${fi * 0.3})`);
            fg.addColorStop(1, 'transparent'); wCtx.fillStyle = fg; wCtx.fillRect(0, 0, wC.width, wC.height);
        }
        lines.forEach(l => {
            l.dist += l.speed * (1 + p * 4); l.length = Math.min(l.maxLength, l.length + l.speed * 0.8);
            const x1 = cx + Math.cos(l.angle) * l.dist, y1 = cy + Math.sin(l.angle) * l.dist;
            const x2 = cx + Math.cos(l.angle) * (l.dist + l.length), y2 = cy + Math.sin(l.angle) * (l.dist + l.length);
            const al = Math.min(1, p * 3) * (1 - Math.max(0, (p - 0.8) / 0.2));
            wCtx.beginPath(); wCtx.moveTo(x1, y1); wCtx.lineTo(x2, y2);
            wCtx.strokeStyle = l.color; wCtx.globalAlpha = al * 0.7; wCtx.lineWidth = l.width; wCtx.stroke(); wCtx.globalAlpha = 1;
        });
        if (frame < total) requestAnimationFrame(anim);
        else { wC.remove(); overlay.classList.remove('active'); revealUniverse(); }
    }
    requestAnimationFrame(anim);
}

/* ============ UNIVERSE REVEAL ============ */
function revealUniverse() {
    const u = document.getElementById('universe'); u.style.display = 'flex'; u.classList.add('revealed');
    const nav = document.getElementById('navDots');
    if (!document.querySelector('.nav-dot[data-section="universe"]')) {
        const d = document.createElement('div'); d.className = 'nav-dot'; d.setAttribute('data-section', 'universe');
        d.setAttribute('data-label', 'Universe'); d.onclick = () => scrollToSection('universe'); nav.appendChild(d);
    }
    setTimeout(() => u.scrollIntoView({ behavior: 'smooth' }), 500);
    setTimeout(() => { launchConfetti(6000); launchFireworks(); initUniverseCanvas(); }, 1000);
}

function initUniverseCanvas() {
    const canvas = document.getElementById('universe-canvas'), ctx = canvas.getContext('2d');
    function resize() { canvas.width = innerWidth; canvas.height = innerHeight; }
    resize(); addEventListener('resize', resize);
    const stars = [];
    for (let i = 0; i < 300; i++) stars.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.3, pulse: Math.random() * 6.28, ps: 0.01 + Math.random() * 0.03,
        c: ['255,255,255', '0,212,255', '255,215,0', '255,107,107', '124,58,237'][Math.floor(Math.random() * 5)]
    });
    let shooting = [];
    setInterval(() => {
        shooting.push({
            x: Math.random() * canvas.width, y: Math.random() * canvas.height * 0.4,
            speed: 4 + Math.random() * 6, angle: Math.PI / 4 + (Math.random() - 0.5) * 0.4,
            length: 40 + Math.random() * 60, life: 1
        });
    }, 2500);
    const nebulae = [];
    for (let i = 0; i < 5; i++) nebulae.push({
        x: Math.random() * canvas.width, y: Math.random() * canvas.height,
        r: 80 + Math.random() * 150,
        c: ['rgba(0,212,255,0.015)', 'rgba(124,58,237,0.02)', 'rgba(255,107,107,0.012)', 'rgba(255,215,0,0.01)'][Math.floor(Math.random() * 4)],
        d: (Math.random() - 0.5) * 0.1
    });
    (function anim() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        nebulae.forEach(n => {
            n.x += n.d; if (n.x < -n.r) n.x = canvas.width + n.r; if (n.x > canvas.width + n.r) n.x = -n.r;
            const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, n.r);
            g.addColorStop(0, n.c); g.addColorStop(1, 'transparent'); ctx.fillStyle = g;
            ctx.fillRect(n.x - n.r, n.y - n.r, n.r * 2, n.r * 2);
        });
        stars.forEach(s => {
            s.pulse += s.ps; const b = 0.3 + Math.sin(s.pulse) * 0.4;
            ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, 6.28); ctx.fillStyle = `rgba(${s.c},${Math.max(0, b)})`; ctx.fill();
            if (s.size > 1.5 && b > 0.5) {
                ctx.beginPath(); ctx.moveTo(s.x - s.size * 3, s.y); ctx.lineTo(s.x + s.size * 3, s.y);
                ctx.moveTo(s.x, s.y - s.size * 3); ctx.lineTo(s.x, s.y + s.size * 3);
                ctx.strokeStyle = `rgba(${s.c},${b * 0.15})`; ctx.lineWidth = 0.5; ctx.stroke();
            }
        });
        shooting = shooting.filter(ss => {
            ss.x += Math.cos(ss.angle) * ss.speed; ss.y += Math.sin(ss.angle) * ss.speed; ss.life -= 0.015;
            const tx = ss.x - Math.cos(ss.angle) * ss.length, ty = ss.y - Math.sin(ss.angle) * ss.length;
            const g = ctx.createLinearGradient(tx, ty, ss.x, ss.y); g.addColorStop(0, 'transparent');
            g.addColorStop(1, `rgba(255,255,255,${ss.life * 0.8})`);
            ctx.beginPath(); ctx.moveTo(tx, ty); ctx.lineTo(ss.x, ss.y); ctx.strokeStyle = g; ctx.lineWidth = 1.5; ctx.stroke();
            ctx.beginPath(); ctx.arc(ss.x, ss.y, 2, 0, 6.28); ctx.fillStyle = `rgba(255,255,255,${ss.life})`; ctx.fill();
            return ss.life > 0;
        });
        requestAnimationFrame(anim);
    })();
}

/* ============ FIREWORKS ============ */
function launchFireworks() {
    const colors = ['#ff6b6b', '#ffd700', '#00d4ff', '#7c3aed', '#ff69b4', '#7cff6b'];
    function create() {
        const x = Math.random() * innerWidth, y = Math.random() * innerHeight * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];
        for (let i = 0; i < 24; i++) {
            const p = document.createElement('div');
            p.style.cssText = `position:fixed;pointer-events:none;z-index:9997;left:${x}px;top:${y}px;width:3px;height:3px;border-radius:50%;background:${color};box-shadow:0 0 6px ${color};transition:all 1.2s cubic-bezier(0.25,0.46,0.45,0.94);`;
            document.body.appendChild(p); const ang = (i / 24) * 6.28, vel = 40 + Math.random() * 70;
            requestAnimationFrame(() => { p.style.transform = `translate(${Math.cos(ang) * vel}px,${Math.sin(ang) * vel}px) scale(0)`; p.style.opacity = '0'; });
            setTimeout(() => p.remove(), 1400);
        }
    }
    for (let i = 0; i < 8; i++) setTimeout(create, i * 500);
}
