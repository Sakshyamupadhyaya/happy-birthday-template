/* ═══════════════════════════════════════════════════════════
   HAPPY BIRTHDAY ANSHU — Interactive Script
   ═══════════════════════════════════════════════════════════ */

// ─── Ready ─────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initTypewriter();
    initScrollAnimations();
    initFloatingHearts();
    initLoveNotes();
    initApologyWordReveal();
    initMouseSparkle();
    launchConfetti();
    initNavDots();
    initMusicToggle();
    initPhotoInteraction();
    initRainbowHeart();
});

// ═══════════════════════════════════════════════════════════
// PARTICLE SYSTEM — Background stars (reduced for mobile)
// ═══════════════════════════════════════════════════════════
function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const isMobile = window.innerWidth < 768;
    const PARTICLE_COUNT = isMobile ? 35 : 70;

    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.speedY = (Math.random() - 0.5) * 0.2;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.pulse = Math.random() * Math.PI * 2;
            this.pulseSpeed = Math.random() * 0.02 + 0.005;
            const colors = ['255,107,157', '196,77,255', '255,154,86', '255,215,0', '200,200,255'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.pulse += this.pulseSpeed;
            this.opacity = 0.2 + Math.sin(this.pulse) * 0.25;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.opacity)})`;
            ctx.fill();
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color}, ${Math.max(0, this.opacity * 0.1)})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        // Connect nearby particles (skip on mobile for perf)
        if (!isMobile) {
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(255, 107, 157, ${0.04 * (1 - dist / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }
        }
        requestAnimationFrame(animate);
    }
    animate();
}

// ═══════════════════════════════════════════════════════════
// TYPEWRITER EFFECT
// ═══════════════════════════════════════════════════════════
function initTypewriter() {
    const el = document.getElementById('typewriterText');
    const phrases = [
        'You deserve the best birthday ever 🎂',
        'तिमी सबैभन्दा राम्री छौ ✨',
        'Keep smiling, it looks good on you 😊',
        'Another year of being amazing 🌟',
        'तिम्रो दिन शुभ होस् 💫'
    ];
    let phraseIdx = 0, charIdx = 0, isDeleting = false;

    function type() {
        const current = phrases[phraseIdx];
        if (!isDeleting) {
            el.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            if (charIdx === current.length) {
                setTimeout(() => { isDeleting = true; type(); }, 2500);
                return;
            }
        } else {
            el.textContent = current.substring(0, charIdx);
            charIdx--;
            if (charIdx < 0) {
                isDeleting = false;
                charIdx = 0;
                phraseIdx = (phraseIdx + 1) % phrases.length;
            }
        }
        setTimeout(type, isDeleting ? 35 : 70);
    }
    setTimeout(type, 2000);
}

// ═══════════════════════════════════════════════════════════
// SCROLL-TRIGGERED ANIMATIONS
// ═══════════════════════════════════════════════════════════
function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    document.querySelectorAll('.animate-on-scroll, .section-title, .apology-card, .wish-card, .game-wrapper').forEach(el => {
        observer.observe(el);
    });
}

// ═══════════════════════════════════════════════════════════
// FLOATING HEARTS (Hero Section) — Birthday themed
// ═══════════════════════════════════════════════════════════
function initFloatingHearts() {
    const hero = document.getElementById('hero');
    const items = ['🎂', '🎉', '🎁', '🥳', '🎈', '✨', '🌸', '💖', '🎊', '⭐'];

    function createHeart() {
        const heart = document.createElement('span');
        heart.classList.add('floating-heart');
        heart.textContent = items[Math.floor(Math.random() * items.length)];
        heart.style.left = Math.random() * 100 + '%';
        heart.style.fontSize = (Math.random() * 16 + 12) + 'px';
        heart.style.animationDuration = (Math.random() * 6 + 7) + 's';
        heart.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(heart);
        setTimeout(() => heart.remove(), 15000);
    }

    for (let i = 0; i < 10; i++) setTimeout(() => createHeart(), i * 400);
    setInterval(createHeart, 2000);
}

// ═══════════════════════════════════════════════════════════
// APOLOGY WORD-BY-WORD REVEAL
// ═══════════════════════════════════════════════════════════
function initApologyWordReveal() {
    const apologyText = document.getElementById('apologyText');
    const text = apologyText.textContent.trim();
    apologyText.innerHTML = '';

    const words = text.split(/\s+/);
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.classList.add('word');
        span.textContent = word + ' ';
        span.style.transitionDelay = (i * 0.04) + 's';
        apologyText.appendChild(span);
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                apologyText.querySelectorAll('.word').forEach(w => w.classList.add('visible'));
            }
        });
    }, { threshold: 0.2 });

    observer.observe(apologyText);
}

// ═══════════════════════════════════════════════════════════
// LOVE NOTES — Tap to Reveal
// ═══════════════════════════════════════════════════════════
function initLoveNotes() {
    document.querySelectorAll('.love-note').forEach(note => {
        note.addEventListener('click', () => {
            note.classList.add('revealed');
            for (let i = 0; i < 5; i++) {
                const heart = document.createElement('span');
                heart.textContent = ['✨', '🎉', '💖', '⭐', '🌸'][i];
                heart.style.position = 'fixed';
                heart.style.left = (note.getBoundingClientRect().left + note.offsetWidth / 2) + 'px';
                heart.style.top = (note.getBoundingClientRect().top) + 'px';
                heart.style.fontSize = '16px';
                heart.style.pointerEvents = 'none';
                heart.style.zIndex = '9999';
                heart.style.transition = 'all 0.8s ease-out';
                document.body.appendChild(heart);
                requestAnimationFrame(() => {
                    heart.style.transform = `translate(${(Math.random() - 0.5) * 100}px, ${-60 - Math.random() * 60}px) scale(0)`;
                    heart.style.opacity = '0';
                });
                setTimeout(() => heart.remove(), 900);
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════
// MOUSE/TOUCH SPARKLE TRAIL
// ═══════════════════════════════════════════════════════════
function initMouseSparkle() {
    let lastSparkle = 0;
    const isMobile = window.innerWidth < 768;

    function createSparkle(x, y) {
        const now = Date.now();
        if (now - lastSparkle < (isMobile ? 120 : 60)) return;
        lastSparkle = now;

        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = x + 'px';
        sparkle.style.top = y + 'px';
        const size = Math.random() * 6 + 3;
        sparkle.style.width = size + 'px';
        sparkle.style.height = size + 'px';
        const colors = ['#ff6b9d', '#c44dff', '#ff9a56', '#ffd700'];
        sparkle.style.background = colors[Math.floor(Math.random() * colors.length)];
        sparkle.style.boxShadow = `0 0 4px ${sparkle.style.background}`;
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 800);
    }

    document.addEventListener('mousemove', (e) => createSparkle(e.clientX, e.clientY));
    document.addEventListener('touchmove', (e) => {
        createSparkle(e.touches[0].clientX, e.touches[0].clientY);
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════
// CONFETTI BURST
// ═══════════════════════════════════════════════════════════
function launchConfetti(duration = 3500) {
    const container = document.getElementById('confetti-container');
    const colors = ['#ff6b9d', '#c44dff', '#ff9a56', '#ffd700', '#00d4ff', '#7cff6b', '#ff4d6d'];
    let count = 0;
    const interval = setInterval(() => {
        for (let i = 0; i < 4; i++) {
            const piece = document.createElement('div');
            piece.classList.add('confetti-piece');
            piece.style.left = Math.random() * 100 + '%';
            piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            const w = Math.random() * 8 + 5;
            piece.style.width = w + 'px';
            piece.style.height = w + 'px';
            if (Math.random() > 0.5) piece.style.borderRadius = '50%';
            piece.style.animationDuration = (Math.random() * 3 + 2) + 's';
            container.appendChild(piece);
            setTimeout(() => piece.remove(), 5000);
        }
        count += 100;
        if (count >= duration) clearInterval(interval);
    }, 100);
}

// ═══════════════════════════════════════════════════════════
// NAV DOTS — Active tracking
// ═══════════════════════════════════════════════════════════
function initNavDots() {
    const sections = ['hero', 'apology', 'wishes', 'game'];
    const dots = document.querySelectorAll('.nav-dot');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                dots.forEach(d => d.classList.remove('active'));
                const activeDot = document.querySelector(`.nav-dot[data-section="${entry.target.id}"]`);
                if (activeDot) activeDot.classList.add('active');
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
    });
}

function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// ═══════════════════════════════════════════════════════════
// MUSIC TOGGLE — plays videoplayback.m4a
// ═══════════════════════════════════════════════════════════
function initMusicToggle() {
    const btn = document.getElementById('musicToggle');
    const audio = document.getElementById('bgMusic');
    let isPlaying = false;

    btn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            isPlaying = false;
            btn.classList.remove('playing');
            btn.textContent = '🎵';
        } else {
            audio.volume = 0.5;
            audio.play().catch(() => {
                // Autoplay blocked, user will need to tap again
            });
            isPlaying = true;
            btn.classList.add('playing');
            btn.textContent = '🔇';
        }
    });

    // Try auto-playing on first interaction
    document.addEventListener('click', function autoPlay() {
        if (!isPlaying) {
            audio.volume = 0.5;
            audio.play().then(() => {
                isPlaying = true;
                btn.classList.add('playing');
                btn.textContent = '🔇';
            }).catch(() => { });
        }
        document.removeEventListener('click', autoPlay);
    }, { once: true });
}

// ═══════════════════════════════════════════════════════════
// PHOTO INTERACTION — Tap for hearts burst
// ═══════════════════════════════════════════════════════════
function initPhotoInteraction() {
    const photo = document.querySelector('.photo-frame');
    photo.addEventListener('click', () => {
        photo.style.animation = 'none';
        void photo.offsetHeight;
        photo.style.animation = 'photo-glow 3s ease-in-out infinite';

        for (let i = 0; i < 10; i++) {
            const heart = document.createElement('span');
            heart.textContent = ['🎂', '🎉', '✨', '💖', '🎁'][Math.floor(Math.random() * 5)];
            heart.style.position = 'fixed';
            const rect = photo.getBoundingClientRect();
            heart.style.left = (rect.left + rect.width / 2) + 'px';
            heart.style.top = (rect.top + rect.height / 2) + 'px';
            heart.style.fontSize = '20px';
            heart.style.pointerEvents = 'none';
            heart.style.zIndex = '9999';
            heart.style.transition = 'all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
            document.body.appendChild(heart);
            const angle = (i / 10) * Math.PI * 2;
            const dist = 60 + Math.random() * 50;
            requestAnimationFrame(() => {
                heart.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
                heart.style.opacity = '0';
            });
            setTimeout(() => heart.remove(), 1100);
        }
    });
}

// ═══════════════════════════════════════════════════════════
// RAINBOW HEART — Footer animation
// ═══════════════════════════════════════════════════════════
function initRainbowHeart() {
    const heart = document.getElementById('rainbowHeart');
    const heartEmojis = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🩷', '🤍'];
    let idx = 0;
    setInterval(() => {
        idx = (idx + 1) % heartEmojis.length;
        heart.textContent = heartEmojis[idx];
    }, 500);
}

// ═══════════════════════════════════════════════════════════
// MINI GAME — Catch the Falling Hearts (Mobile Optimized)
// ═══════════════════════════════════════════════════════════
let gameRunning = false;
let gameScore = 0;
let gameLives = 5;
let gameAnimationId = null;
let gameStartTime = 0;

function startGame() {
    const canvas = document.getElementById('game-canvas');
    const ctx = canvas.getContext('2d');
    const btn = document.getElementById('gameBtn');

    // Reset
    gameScore = 0;
    gameLives = 5;
    gameRunning = true;
    gameStartTime = Date.now();
    updateGameUI();
    btn.style.display = 'none';

    // Mobile-optimized canvas sizing
    const containerWidth = canvas.parentElement.clientWidth;
    canvas.width = Math.min(500, containerWidth - 8);
    canvas.height = Math.min(350, window.innerHeight * 0.42);

    // Basket — wider on mobile for easier touch
    const isMobile = window.innerWidth < 768;
    const basketWidth = isMobile ? 90 : 80;
    const basket = {
        x: canvas.width / 2 - basketWidth / 2,
        y: canvas.height - 45,
        width: basketWidth,
        height: 36,
        targetX: canvas.width / 2 - basketWidth / 2
    };

    // Hearts
    let hearts = [];
    const heartEmojis = ['💖', '🎂', '🎁', '🎉', '⭐'];
    const bombEmoji = '💔';
    let spawnInterval = 1300;
    let lastSpawn = 0;
    let difficultyTimer = 0;

    // Mouse/Touch control
    function handleMove(clientX) {
        const rect = canvas.getBoundingClientRect();
        basket.targetX = clientX - rect.left - basket.width / 2;
        basket.targetX = Math.max(0, Math.min(canvas.width - basket.width, basket.targetX));
    }

    canvas.addEventListener('mousemove', (e) => handleMove(e.clientX));
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
    }, { passive: false });

    // Also handle touch start for immediate response
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        handleMove(e.touches[0].clientX);
    }, { passive: false });

    function spawnHeart() {
        const isBomb = Math.random() < 0.12;
        hearts.push({
            x: Math.random() * (canvas.width - 40) + 20,
            y: -25,
            speed: 1.2 + Math.random() * 1.5 + (gameScore * 0.04),
            emoji: isBomb ? bombEmoji : heartEmojis[Math.floor(Math.random() * heartEmojis.length)],
            isBomb: isBomb,
            size: 22 + Math.random() * 6,
            rotation: 0,
            rotSpeed: (Math.random() - 0.5) * 0.08,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: 0.025 + Math.random() * 0.02
        });
    }

    function gameLoop(timestamp) {
        if (!gameRunning) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Background
        const bgGrad = ctx.createLinearGradient(0, 0, 0, canvas.height);
        bgGrad.addColorStop(0, 'rgba(26, 10, 46, 0.5)');
        bgGrad.addColorStop(1, 'rgba(13, 13, 31, 0.8)');
        ctx.fillStyle = bgGrad;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Spawn
        if (timestamp - lastSpawn > spawnInterval) {
            spawnHeart();
            lastSpawn = timestamp;
        }

        // Difficulty
        if (timestamp - difficultyTimer > 5000) {
            spawnInterval = Math.max(500, spawnInterval - 70);
            difficultyTimer = timestamp;
        }

        // Smooth basket
        basket.x += (basket.targetX - basket.x) * 0.18;

        // Draw basket
        ctx.save();
        const basketGrad = ctx.createLinearGradient(basket.x, basket.y, basket.x + basket.width, basket.y + basket.height);
        basketGrad.addColorStop(0, '#ff6b9d');
        basketGrad.addColorStop(1, '#c44dff');
        ctx.fillStyle = basketGrad;
        ctx.beginPath();
        ctx.roundRect(basket.x, basket.y, basket.width, basket.height, 8);
        ctx.fill();
        ctx.shadowColor = '#ff6b9d';
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'white';
        ctx.font = '18px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🧺', basket.x + basket.width / 2, basket.y + basket.height / 2 + 6);
        ctx.restore();

        // Hearts
        hearts = hearts.filter(h => {
            h.y += h.speed;
            h.rotation += h.rotSpeed;
            h.wobble += h.wobbleSpeed;
            const wobbleX = Math.sin(h.wobble) * 12;

            ctx.save();
            ctx.translate(h.x + wobbleX, h.y);
            ctx.rotate(h.rotation);
            ctx.font = `${h.size}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(h.emoji, 0, 0);
            ctx.restore();

            // Catch check (generous hitbox for mobile)
            const hx = h.x + wobbleX;
            if (h.y + 8 >= basket.y && h.y <= basket.y + basket.height &&
                hx >= basket.x - 10 && hx <= basket.x + basket.width + 10) {
                if (h.isBomb) {
                    gameLives--;
                    flashCanvas(canvas, 'rgba(255, 0, 0, 0.25)');
                } else {
                    gameScore++;
                    flashCanvas(canvas, 'rgba(255, 107, 157, 0.12)');
                }
                updateGameUI();
                if (gameLives <= 0) { endGame(false, canvas, ctx); return false; }
                if (gameScore >= 15) { endGame(true, canvas, ctx); return false; }
                return false;
            }

            if (h.y > canvas.height + 20) {
                if (!h.isBomb) {
                    gameLives--;
                    updateGameUI();
                    if (gameLives <= 0) { endGame(false, canvas, ctx); return false; }
                }
                return false;
            }
            return true;
        });

        document.getElementById('gameTime').textContent = Math.floor((Date.now() - gameStartTime) / 1000) + 's';
        gameAnimationId = requestAnimationFrame(gameLoop);
    }

    gameAnimationId = requestAnimationFrame(gameLoop);
}

function flashCanvas(canvas, color) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
        position: absolute; top: 0; left: 0; width: 100%; height: 100%;
        background: ${color}; pointer-events: none; z-index: 10;
        border-radius: 14px; transition: opacity 0.3s;
    `;
    canvas.parentElement.style.position = 'relative';
    canvas.parentElement.appendChild(overlay);
    setTimeout(() => { overlay.style.opacity = '0'; }, 50);
    setTimeout(() => overlay.remove(), 400);
}

function updateGameUI() {
    document.getElementById('gameScore').textContent = gameScore;
    document.getElementById('gameLives').textContent = gameLives;
    const scoreEl = document.getElementById('gameScore');
    scoreEl.style.transform = 'scale(1.3)';
    setTimeout(() => { scoreEl.style.transform = 'scale(1)'; }, 200);
}

function endGame(won, canvas, ctx) {
    gameRunning = false;
    cancelAnimationFrame(gameAnimationId);
    const btn = document.getElementById('gameBtn');

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(13, 13, 31, 0.92)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (won) {
        ctx.font = '40px serif';
        ctx.textAlign = 'center';
        ctx.fillText('🎉🎂🎉', canvas.width / 2, canvas.height / 2 - 15);
        ctx.font = '18px Poppins, sans-serif';
        ctx.fillStyle = '#ff6b9d';
        ctx.fillText('You Won! 🥳', canvas.width / 2, canvas.height / 2 + 20);
        ctx.font = '13px Poppins, sans-serif';
        ctx.fillStyle = 'rgba(240, 230, 246, 0.6)';
        ctx.fillText('Scroll down for your surprise...', canvas.width / 2, canvas.height / 2 + 45);
        setTimeout(() => revealSurprise(), 1500);
    } else {
        ctx.font = '40px serif';
        ctx.textAlign = 'center';
        ctx.fillText('💔', canvas.width / 2, canvas.height / 2 - 15);
        ctx.font = '18px Poppins, sans-serif';
        ctx.fillStyle = '#ff6b9d';
        ctx.fillText('Oops! Try again!', canvas.width / 2, canvas.height / 2 + 20);
        btn.style.display = 'inline-block';
        btn.textContent = '🔄 Retry';
    }
}

// ═══════════════════════════════════════════════════════════
// SURPRISE REVEAL
// ═══════════════════════════════════════════════════════════
function revealSurprise() {
    const surprise = document.getElementById('surprise');
    surprise.classList.add('revealed');

    const navDots = document.getElementById('navDots');
    const dot = document.createElement('div');
    dot.classList.add('nav-dot');
    dot.setAttribute('data-section', 'surprise');
    dot.setAttribute('data-label', 'Surprise');
    dot.onclick = () => scrollToSection('surprise');
    navDots.appendChild(dot);

    setTimeout(() => {
        surprise.scrollIntoView({ behavior: 'smooth' });
    }, 500);

    setTimeout(() => {
        launchConfetti(5000);
        launchFireworks();
    }, 1000);
}

// ═══════════════════════════════════════════════════════════
// FIREWORKS EFFECT
// ═══════════════════════════════════════════════════════════
function launchFireworks() {
    const colors = ['#ff6b9d', '#c44dff', '#ffd700', '#00d4ff', '#ff9a56', '#7cff6b'];

    function createFirework() {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight * 0.5;
        const color = colors[Math.floor(Math.random() * colors.length)];

        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed; pointer-events: none; z-index: 9997;
                left: ${x}px; top: ${y}px;
                width: 3px; height: 3px; border-radius: 50%;
                background: ${color}; box-shadow: 0 0 4px ${color};
                transition: all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            `;
            document.body.appendChild(particle);
            const angle = (i / 20) * Math.PI * 2;
            const velocity = 40 + Math.random() * 60;
            requestAnimationFrame(() => {
                particle.style.transform = `translate(${Math.cos(angle) * velocity}px, ${Math.sin(angle) * velocity}px) scale(0)`;
                particle.style.opacity = '0';
            });
            setTimeout(() => particle.remove(), 1300);
        }
    }

    for (let i = 0; i < 6; i++) {
        setTimeout(createFirework, i * 600);
    }
}
