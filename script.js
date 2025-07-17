// === Loader animatsiyasi ===
window.addEventListener('load', function() {
  const loader = document.querySelector('.loader');
  setTimeout(() => {
    loader.style.opacity = '0';
    setTimeout(() => {
      loader.style.display = 'none';
    }, 500);
  }, 1500);
});

// === Partikllar fon (particles.js) ===
if (window.particlesJS) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 60, density: { enable: true, value_area: 800 } },
      color: { value: '#00f0ff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#00f0ff', opacity: 0.2, width: 1 },
      move: { enable: true, speed: 2, random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 0.5 } },
        push: { particles_nb: 4 }
      }
    },
    retina_detect: true
  });
}

// === Smooth scroll ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId.length > 1 && document.querySelector(targetId)) {
      e.preventDefault();
      window.scrollTo({
        top: document.querySelector(targetId).offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// === Tema almashtirish (dark/light mode) ===
const themeToggle = document.querySelector('.theme-toggle');
if (themeToggle) {
  const themeIcon = themeToggle.querySelector('i');
  // Funksiya: ikonka va body klassini yangilash
  function updateThemeIcon() {
    if (document.body.classList.contains('light-mode')) {
      themeIcon.classList.remove('fa-moon');
      themeIcon.classList.add('fa-sun');
    } else {
      themeIcon.classList.remove('fa-sun');
      themeIcon.classList.add('fa-moon');
    }
  }
  // Tugma bosilganda
  themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('light-mode');
    localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
    updateThemeIcon();
  });
  // Sahifa yuklanganda localStorage'dan o'qish
  if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-mode');
  } else {
    document.body.classList.remove('light-mode');
  }
  updateThemeIcon();
}

// === Mobil menyu (menu-toggle)
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', function() {
    navLinks.classList.toggle('active');
    document.body.classList.toggle('menu-open', navLinks.classList.contains('active'));
  });
  // Har bir nav-link bosilganda menyuni yopish
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
      if (window.innerWidth <= 900) {
        navLinks.classList.remove('active');
        document.body.classList.remove('menu-open');
      }
    });
  });
}

// === Chatbot funksiyasi ===
const chatbotContainer = document.querySelector('.chatbot-container');
const chatbotToggle = document.querySelector('.chatbot-toggle');
const closeChatbot = document.querySelector('.close-chatbot');
const chatInput = document.querySelector('.chatbot-input input');
const sendButton = document.querySelector('.send-button');
const chatMessages = document.querySelector('.chatbot-messages');
const botResponses = {
  "salom": "Assalomu alaykum! VIBE X yordamchisiman. Sizga qanday yordam bera olaman?",
  "match": "Keyingi rasmiy match 15-avgust kuni soat 20:00 da bo‘lib o‘tadi (PMCO Regional Finals).",
  "igl": "Jamoa sardori - Sardor VIBE X (IGL).",
  "instagram": "Instagram: @stellar.edition",
  "telegram": "Telegram: @legendjonnn",
  "statistika": "O‘yinchilar statistikasi uchun 'Statistika' bo‘limiga o‘ting.",
  "default": "Kechirasiz, savolingizni tushunmadim. 'match', 'igl', 'instagram', 'telegram', 'statistika' kabi so‘zlardan foydalaning."
};
// Xabar qo'shish (HTML bilan)
function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender + '-message');
  messageDiv.innerHTML = text;
  chatMessages.appendChild(messageDiv);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}
// Bot javobi
function getBotResponse(input) {
  input = input.toLowerCase();
  if (input.includes('salom') || input.includes('hello') || input.includes('assalomu')) {
    return "Assalomu alaykum! VIBE X yordamchisiman. Sizga qanday yordam bera olaman?";
  }
  if (
    input.includes('match') || input.includes('o‘yin') || input.includes('oyin') ||
    input.includes('keyingi') || input.includes('turnir') || input.includes('qachon')
  ) {
    return "Keyingi rasmiy match 15-avgust kuni soat 20:00 da bo‘lib o‘tadi (PMCO Regional Finals).";
  }
  if (
    input.includes('igl') || input.includes('kapitan') || input.includes('sardor') ||
    input.includes('jamoa sardori') || input.includes('kim boshliq')
  ) {
    return "Jamoa sardori - Sardor VIBE X (IGL).";
  }
  if (
    input.includes('instagram') || input.includes('insta') || input.includes('instagram manzil')
  ) {
    return "Instagram: <a href='https://instagram.com/stellar.edition' target='_blank'>@stellar.edition</a>";
  }
  if (
    input.includes('telegram') || input.includes('tg') || input.includes('telegram link')
  ) {
    return "Telegram: <a href='https://t.me/legendjonnn' target='_blank'>@legendjonnn</a>";
  }
  if (
    input.includes('statistika') || input.includes('stat') || input.includes('ko‘rsatkich') || input.includes('korsatkich')
  ) {
    return "O‘yinchilar statistikasi uchun <b>Statistika</b> bo‘limiga o‘ting.";
  }
  if (
    input.includes('rahmat') || input.includes('thanks') || input.includes('thank you')
  ) {
    return "Doim yordam berishga tayyorman! Yana savolingiz bo‘lsa, yozing.";
  }
  return "Kechirasiz, savolingizni tushunmadim. 'match', 'igl', 'instagram', 'telegram', 'statistika' kabi so‘zlardan foydalaning.";
}
// Yuborish funksiyasi
function sendMessage() {
  const message = chatInput.value.trim();
  if (!message) return;
  addMessage(message, 'user');
  chatInput.value = '';
  setTimeout(() => {
    addMessage(getBotResponse(message), 'bot');
  }, 700);
}
// Enter va tugma bosishda yuborish
if (chatInput && sendButton) {
  chatInput.addEventListener('keypress', function(e) { if (e.key === 'Enter') sendMessage(); });
  sendButton.addEventListener('click', sendMessage);
}
// Chatbot ochish/yopish
if (chatbotToggle && chatbotContainer) {
  chatbotToggle.addEventListener('click', function() {
    chatbotContainer.classList.toggle('active');
    if (chatbotContainer.classList.contains('active')) {
      setTimeout(() => { chatInput.focus(); }, 200);
    }
  });
}
if (closeChatbot && chatbotContainer) {
  closeChatbot.addEventListener('click', function() {
    chatbotContainer.classList.remove('active');
  });
}
window.addEventListener('click', function(e) {
  if (chatbotContainer && chatbotContainer.classList.contains('active') && !chatbotContainer.contains(e.target) && e.target !== chatbotToggle) {
    chatbotContainer.classList.remove('active');
  }
});
// Boshlang'ich bot xabari (faqat bir marta)
if (chatMessages && chatMessages.children.length === 0) {
  addMessage("Salom! Men VIBE X yordamchisiman. Jamoamiz, turnirlar yoki statistika haqida so‘rashingiz mumkin.", 'bot');
}

// === Chart.js statistikasi ===
document.addEventListener('DOMContentLoaded', function() {
  if (window.Chart) {
    const sardorRadar = document.getElementById('radar-sardor');
    if (sardorRadar) {
      new Chart(sardorRadar, {
        type: 'radar',
        data: {
          labels: ['Aim', 'Strategiya', 'Jamoaviylik', 'Refleks', 'Aloqa'],
          datasets: [{
            label: 'Sardor VIBE X',
            data: [90, 95, 92, 88, 93],
            backgroundColor: 'rgba(0,240,255,0.2)',
            borderColor: '#00f0ff',
            borderWidth: 2,
            pointBackgroundColor: '#00f0ff'
          }]
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
          scales: {
            r: {
              angleLines: { color: '#333' },
              grid: { color: '#333' },
              pointLabels: { color: '#fff', font: { size: 14 } },
              min: 0, max: 100
            }
          }
        }
      });
    }
  }
});

// === Scroll animatsiyalari ===
function animateOnScroll() {
  document.querySelectorAll('.team-section, .stats-section, .tournaments-section').forEach(el => {
    const pos = el.getBoundingClientRect().top;
    const screen = window.innerHeight / 1.3;
    if (pos < screen) {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    }
  });
}
window.addEventListener('load', function() {
  document.querySelectorAll('.team-section, .stats-section, .tournaments-section').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    el.style.transition = 'all 0.8s';
  });
});
window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Chatbot prompt tugmalari orqali tez savol yuborish
const chatbotPrompts = document.querySelectorAll('.chatbot-prompt');
if (chatbotPrompts && chatInput && sendButton) {
  chatbotPrompts.forEach(prompt => {
    prompt.addEventListener('click', function() {
      chatInput.value = this.textContent;
      sendButton.click();
    });
  });
}

// === Auth: Login/Register/Admin Panel ===
function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}
function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
}
function findUser(username) {
  return getUsers().find(u => u.username === username);
}
// Register
const registerForm = document.getElementById('registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const fullname = registerForm.fullname.value.trim();
    const username = registerForm.username.value.trim();
    const password = registerForm.password.value;
    const confirm = registerForm.confirm.value;
    const errorDiv = document.getElementById('registerError');
    errorDiv.style.display = 'none';
    if (!fullname || !username || !password || !confirm) {
      errorDiv.textContent = 'Barcha maydonlarni to‘ldiring!';
      errorDiv.style.display = 'block';
      return;
    }
    if (password.length < 5) {
      errorDiv.textContent = 'Parol kamida 5 ta belgidan iborat bo‘lishi kerak!';
      errorDiv.style.display = 'block';
      return;
    }
    if (password !== confirm) {
      errorDiv.textContent = 'Parollar mos emas!';
      errorDiv.style.display = 'block';
      return;
    }
    if (findUser(username)) {
      errorDiv.textContent = 'Bu foydalanuvchi nomi band!';
      errorDiv.style.display = 'block';
      return;
    }
    saveUser({ fullname, username, password, isAdmin: false });
    localStorage.setItem('currentUser', JSON.stringify({ username, fullname, isAdmin: false }));
    window.location.href = 'index.html';
  });
}
// Login
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const username = loginForm.username.value.trim();
    const password = loginForm.password.value;
    const errorDiv = document.getElementById('loginError');
    errorDiv.style.display = 'none';
    // Admin login (maxfiy)
    if (username === 'admin' && password === 'admin123') {
      localStorage.setItem('currentUser', JSON.stringify({ username: 'admin', fullname: 'Admin', isAdmin: true }));
      window.location.href = 'admin.html';
      return;
    }
    const user = findUser(username);
    if (!user || user.password !== password) {
      errorDiv.textContent = 'Foydalanuvchi nomi yoki parol xato!';
      errorDiv.style.display = 'block';
      return;
    }
    localStorage.setItem('currentUser', JSON.stringify({ username: user.username, fullname: user.fullname, isAdmin: false }));
    window.location.href = 'index.html';
  });
}
// Logout (admin panel)
const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', function(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
  });
}
// Admin panelga faqat admin kirishi
if (window.location.pathname.endsWith('admin.html')) {
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  if (!currentUser || !currentUser.isAdmin) {
    window.location.href = 'login.html';
  }
}