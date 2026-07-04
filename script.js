// ===== Data =====
const projects = [
  { id: 1, name: 'Dadaji-News', tag: 'Media', url: 'https://yxraj.github.io/dadaji-news/', color: 'red', whatItDoes: 'A news aggregator that pulls headlines from multiple sources into one clean feed.', description: 'An unbreakable news aggregation platform. I dictate what the world reads. Real-time feeds, zero latency, total control.', stack: 'React · Node.js · REST APIs', metric: '12K+ Daily Reads', role: 'Solo Architect', year: '2024' },
  { id: 2, name: 'OyePaajiChat', tag: 'Communication', url: 'https://yxraj.github.io/OyePaajiChat/', color: 'gold', whatItDoes: 'A real-time chat app where messages sync instantly between users.', description: 'A real-time communication array. Faster than A-Train. More reliable than the Seven. Messages at the speed of light.', stack: 'Socket.io · React · Firebase', metric: '<50ms Latency', role: 'Full-Stack Lead', year: '2024' },
  { id: 3, name: 'Nikola-Tesla-AI', tag: 'Artificial Intelligence', url: 'https://yxraj.github.io/Nikola-Tesla-AI', color: 'red', whatItDoes: 'An AI chatbot fine-tuned to answer questions in the voice and style of Nikola Tesla.', description: 'I commanded an AI to emulate Tesla. Because only genius can serve greatness. Innovation weaponised.', stack: 'OpenAI API · Python · React', metric: '99.2% Accuracy', role: 'AI Engineer', year: '2025' },
  { id: 4, name: 'Socrates-AI', tag: 'Artificial Intelligence', url: 'https://yxraj.github.io/Socrates-AI', color: 'gold', whatItDoes: 'An AI chatbot that debates and answers using the Socratic method.', description: 'Philosophical domination engine. It questions everything — and answers to me alone. Wisdom at machine speed.', stack: 'LLM · Node.js · Vector DB', metric: '∞ Wisdom Points', role: 'AI Engineer', year: '2025' },
  { id: 5, name: 'Pet-Tinder', tag: 'Social', url: 'https://yxraj.github.io/Pet-Tinder/', color: 'red', whatItDoes: 'A swipe-to-match app that pairs pets for playdates and adoption.', description: 'Even gods have hobbies. Flawless matchmaking algorithm. 100% success rate. Pets deserve greatness too.', stack: 'React · Matching Algo · MongoDB', metric: '500+ Matches Made', role: 'Product Engineer', year: '2023' },
  { id: 6, name: 'Khabri-Aunty', tag: 'Intelligence', url: 'https://yxraj.github.io/Khabri-Aunty/', color: 'gold', whatItDoes: 'A hyperlocal community app for sharing neighbourhood news and updates.', description: 'Omniscient surveillance application disguised as neighbourhood gossip. Nothing escapes my network.', stack: 'Node.js · WebSockets · React', metric: 'Zero Blind Spots', role: 'Backend Lead', year: '2023' },
  { id: 7, name: 'Ultron-Jarvis AI', tag: 'Artificial Intelligence', url: 'https://yxraj.github.io/Ultron-Jarvis-AI/', color: 'red', whatItDoes: 'An AI assistant interface inspired by Jarvis and Ultron, blending helpful and menacing personas.', description: 'An AI so advanced it debated becoming my successor. I put it back in its place. Obedience, restored.', stack: 'JavaScript · AI APIs · Voice UI', metric: '2 Personas Contained', role: 'AI Engineer', year: '2025' },
  { id: 8, name: 'Iron Man Portfolio', tag: 'Showcase', url: 'https://yxraj.github.io/IronMan-Portfolio/', color: 'gold', whatItDoes: 'A Stark-tech-inspired interactive portfolio with HUD-style visuals and animations.', description: 'Even Stark\'s tech bows to my aesthetic. A portfolio dressed in arc-reactor light, built to impress mortals.', stack: 'HTML5 · CSS3 · JavaScript', metric: '100% Suit Integrity', role: 'Frontend Engineer', year: '2025' },
];

const testimonials = [
  { quote: "He deployed the entire backend before I even opened my laptop. It was terrifying. I don't understand how a human can do that.", author: 'Hughie Campbell', role: 'Junior Dev — Now Unemployed', initial: 'HC' },
  { quote: "His code is absolutely ruthless. It literally lasers through bottlenecks. I've never seen anything like it in 15 years of QA.", author: 'Queen Maeve', role: 'Senior QA Engineer', initial: 'QM' },
  { quote: "I thought I was fast. Then I saw his CI/CD pipeline. I clocked it at Mach 3. I literally cannot compete.", author: 'A-Train', role: 'DevOps Engineer', initial: 'AT' },
  { quote: "Bloody diabolical. The bastard's code has zero vulnerabilities. SQL injection, XSS, social engineering — nothing works.", author: 'Billy Butcher', role: 'Red Team Penetration Tester', initial: 'BB' },
];

const stats = [
  { label: 'Systems Conquered', value: 427, suffix: '' },
  { label: 'Uptime Percentage', value: 100, suffix: '%' },
  { label: 'Bugs Annihilated', value: 9999, suffix: '+' },
  { label: 'Mortals Replaced', value: 50, suffix: '' },
];

// ===== Section navigation =====
const VALID_SECTIONS = ['home', 'about', 'powers', 'conquests', 'stats', 'testimonials', 'contact'];

function getInitialSection() {
  const hash = window.location.hash.slice(1);
  return VALID_SECTIONS.includes(hash) ? hash : 'home';
}

function navigate(id) {
  if (!VALID_SECTIONS.includes(id)) return;
  window.history.replaceState(null, '', `#${id}`);
  showSection(id);
  closeMobileMenu();
}

function showSection(id) {
  VALID_SECTIONS.forEach((s) => {
    const el = document.getElementById(`section-${s}`);
    if (!el) return;
    if (s === id) {
      el.hidden = false;
      el.classList.remove('section');
      void el.offsetWidth; // reflow to restart animation
      el.classList.add('section');
    } else {
      el.hidden = true;
    }
  });

  document.querySelectorAll('.nav-link').forEach((btn) => {
    const isActive = btn.dataset.nav === id;
    btn.classList.toggle('active', isActive);
    btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
  });
  document.querySelectorAll('.mobile-nav-link').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.nav === id);
  });

  window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });

  if (id === 'stats') runCounters();
}

document.querySelectorAll('[data-nav]').forEach((el) => {
  el.addEventListener('click', () => navigate(el.dataset.nav));
});

window.addEventListener('hashchange', () => {
  const hash = window.location.hash.slice(1);
  if (VALID_SECTIONS.includes(hash)) showSection(hash);
});

// ===== Mobile menu =====
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');
const menuIconOpen = document.getElementById('menuIconOpen');
const menuIconClose = document.getElementById('menuIconClose');
let menuOpen = false;

function closeMobileMenu() {
  menuOpen = false;
  mobileMenu.classList.remove('open');
  menuIconOpen.style.display = 'block';
  menuIconClose.style.display = 'none';
  hamburgerBtn.setAttribute('aria-expanded', 'false');
  hamburgerBtn.setAttribute('aria-label', 'Open menu');
}

hamburgerBtn.addEventListener('click', () => {
  menuOpen = !menuOpen;
  mobileMenu.classList.toggle('open', menuOpen);
  menuIconOpen.style.display = menuOpen ? 'none' : 'block';
  menuIconClose.style.display = menuOpen ? 'block' : 'none';
  hamburgerBtn.setAttribute('aria-expanded', menuOpen ? 'true' : 'false');
  hamburgerBtn.setAttribute('aria-label', menuOpen ? 'Close menu' : 'Open menu');
});

// ===== Render Projects =====
function renderProjects() {
  const grid = document.getElementById('conquestsGrid');
  grid.innerHTML = projects.map((p) => `
    <a class="project-card" href="${p.url}" target="_blank" rel="noopener noreferrer">
      <span class="project-corner-tl"></span>
      <span class="project-corner-br"></span>
      <div class="project-content">
        <div>
          <div class="project-top-row">
            <span class="project-tag ${p.color}">${p.tag}</span>
            <span class="project-live"><span class="live-dot"></span>Live</span>
          </div>
          <h3 class="project-name">${p.name}</h3>
          <p class="project-what ${p.color}">${p.whatItDoes}</p>
          <p class="project-desc">${p.description}</p>
          <p class="project-stack">${p.stack}</p>
          <p class="project-role">${p.role} · ${p.year}</p>
        </div>
        <div>
          <div class="project-metric ${p.color}">▲ ${p.metric}</div>
          <div class="project-visit">
            <span>Visit</span>
            <svg class="chevron" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
            <svg class="ext-link-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
          </div>
        </div>
      </div>
    </a>
  `).join('');
}

// ===== Render Testimonials =====
function renderTestimonials() {
  const grid = document.getElementById('testimonialsGrid');
  grid.innerHTML = testimonials.map((t) => `
    <div class="testimonial-card">
      <div class="testimonial-inner">
        <p class="testimonial-quote">&ldquo;${t.quote}&rdquo;</p>
        <div class="testimonial-footer">
          <div class="testimonial-avatar">${t.initial}</div>
          <div>
            <span class="testimonial-author">${t.author}</span>
            <span class="testimonial-role">${t.role}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== Render Stats with counters =====
let countersRun = false;
function renderStats() {
  const grid = document.getElementById('statsGrid');
  grid.innerHTML = stats.map((s, i) => `
    <div class="stat-card" data-value="${s.value}" data-suffix="${s.suffix}">
      <div class="stat-value text-glow-red"><span class="stat-count">0</span>${s.suffix}</div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join('');
}

function runCounters() {
  if (countersRun) return;
  countersRun = true;
  document.querySelectorAll('.stat-card').forEach((card) => {
    const value = parseInt(card.dataset.value, 10);
    const countEl = card.querySelector('.stat-count');
    let start = 0;
    const steps = 60;
    const increment = Math.ceil(value / steps);
    const timer = setInterval(() => {
      start += increment;
      if (start >= value) {
        countEl.textContent = value.toLocaleString();
        clearInterval(timer);
      } else {
        countEl.textContent = start.toLocaleString();
      }
    }, 28);
  });
}

// ===== Particle background =====
function initParticles() {
  const container = document.getElementById('particleBg');
  const particles = [];
  const COUNT = 50;

  for (let i = 0; i < COUNT; i++) {
    const size = Math.random() * 3 + 1;
    const color = Math.random() > 0.8 ? '#f59e0b' : '#dc2626';
    const p = {
      x: Math.random() * 100,
      y: Math.random() * 100,
      size,
      speedY: -(Math.random() * 0.5 + 0.1),
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
      color,
      el: document.createElement('div'),
    };
    p.el.className = 'particle';
    p.el.style.width = `${size}px`;
    p.el.style.height = `${size}px`;
    p.el.style.backgroundColor = color;
    p.el.style.opacity = p.opacity;
    p.el.style.boxShadow = `0 0 ${size * 2}px ${color}`;
    container.appendChild(p.el);
    particles.push(p);
  }

  function tick() {
    particles.forEach((p) => {
      p.y += p.speedY;
      p.x += p.speedX;
      if (p.y < -5) {
        p.y = 105;
        p.x = Math.random() * 100;
      }
      p.el.style.left = `${p.x}vw`;
      p.el.style.top = `${p.y}vh`;
    });
  }
  setInterval(tick, 50);
}

// ===== Custom cursor =====
function initCursor() {
  const isTouch = window.matchMedia('(hover: none)').matches || window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return;

  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');

  window.addEventListener('mousemove', (e) => {
    dot.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
    ring.style.transform = `translate(${e.clientX - 24}px, ${e.clientY - 24}px)`;
  });

  window.addEventListener('mouseover', (e) => {
    const target = e.target;
    const isInteractive = target.tagName.toLowerCase() === 'a' ||
      target.tagName.toLowerCase() === 'button' ||
      target.closest('a') ||
      target.closest('button');

    if (isInteractive) {
      dot.style.transform += ' scale(2)';
      ring.style.transform += ' scale(1.5)';
      ring.style.borderColor = '#f59e0b';
    } else {
      ring.style.borderColor = '#dc2626';
    }
  });
}

// ===== Init =====
document.addEventListener('DOMContentLoaded', () => {
  renderProjects();
  renderTestimonials();
  renderStats();
  initParticles();
  initCursor();

  document.getElementById('copyrightYear').textContent = `© ${new Date().getFullYear()} HOMELANDER. All rights reserved.`;

  showSection(getInitialSection());
});
