// Admin panel xavfsizligi
function checkAdminAuth() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    if (!currentUser.username || currentUser.username !== 'admin') {
        window.location.href = 'login.html';
        return false;
    }
    return true;
}

// Test foydalanuvchilari qo'shish (faqat bir marta)
function addTestUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // Agar foydalanuvchilar yo'q bo'lsa, test foydalanuvchilari qo'shish
    if (users.length === 0) {
        const testUsers = [
            {
                username: 'user1',
                fullname: 'Sardor VIBE X',
                email: 'sardor@vibex.com',
                password: '123456',
                registerDate: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 kun oldin
                lastLogin: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString() // 2 soat oldin
            },
            {
                username: 'user2',
                fullname: 'Aziz VIBE X',
                email: 'aziz@vibex.com',
                password: '123456',
                registerDate: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), // 12 soat oldin
                lastLogin: new Date(Date.now() - 30 * 60 * 1000).toISOString() // 30 daqiqa oldin
            },
            {
                username: 'user3',
                fullname: 'Jasur VIBE X',
                email: 'jasur@vibex.com',
                password: '123456',
                registerDate: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 soat oldin
                lastLogin: new Date(Date.now() - 15 * 60 * 1000).toISOString() // 15 daqiqa oldin
            },
            {
                username: 'user4',
                fullname: 'Bobur VIBE X',
                email: 'bobur@vibex.com',
                password: '123456',
                registerDate: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 soat oldin
                lastLogin: new Date(Date.now() - 5 * 60 * 1000).toISOString() // 5 daqiqa oldin
            }
        ];
        
        localStorage.setItem('users', JSON.stringify(testUsers));
        console.log('Test foydalanuvchilari qo\'shildi');
    }
}

// Sahifa yuklanganda xavfsizlikni tekshirish
if (!checkAdminAuth()) {
    // Sahifa qayta yo'naltiriladi
} else {
    // Test foydalanuvchilari qo'shish
    addTestUsers();
    
    // Admin panel yuklanadi
    initializeAdminPanel();
}

function initializeAdminPanel() {
    // Sidebar active
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', function (e) {
            e.preventDefault();
            allSideMenu.forEach(i => i.parentElement.classList.remove('active'));
            li.classList.add('active');
            // Sahifalarni almashtirish
            document.querySelectorAll('.admin-page').forEach(page => page.style.display = 'none');
            const pageId = item.getAttribute('data-page') + '-page';
            document.getElementById(pageId).style.display = 'block';
            if(pageId === 'users-page') renderUsers();
            if(pageId === 'dashboard-page') updateDashboard();
        });
    });

    // Sidebar toggle
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.querySelector('.sidebar-overlay');

    function openSidebar() {
        sidebar.classList.add('show');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    function closeSidebar() {
        sidebar.classList.remove('show');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    // Menyu tugmasi
    menuBar.addEventListener('click', function (e) {
        e.stopPropagation();
        openSidebar();
    });
    
    // Overlay yoki kontentga bosilganda sidebar yopiladi
    overlay.addEventListener('click', closeSidebar);
    // Kontentga bosilganda ham sidebar yopilsin (faqat mobil)
    document.getElementById('content').addEventListener('click', function(e) {
        if (window.innerWidth <= 900 && sidebar.classList.contains('show')) {
            closeSidebar();
        }
    });
    // Sidebar ichida bosilganda yopilmasin
    sidebar.addEventListener('click', function(e) {
        e.stopPropagation();
    });
    // Responsive uchun
    window.addEventListener('resize', function() {
        if(window.innerWidth > 900) {
            closeSidebar();
        }
    });

    // Dark mode
    const switchMode = document.getElementById('switch-mode');
    if (switchMode) {
        switchMode.addEventListener('change', function () {
            if (this.checked) {
                document.body.classList.add('dark');
                localStorage.setItem('adminDarkMode', 'true');
            } else {
                document.body.classList.remove('dark');
                localStorage.setItem('adminDarkMode', 'false');
            }
        });
        
        // Dark mode holatini saqlash
        const savedDarkMode = localStorage.getItem('adminDarkMode');
        if (savedDarkMode === 'true') {
            switchMode.checked = true;
            document.body.classList.add('dark');
        }
    }

    // Notification/Profile menu
    document.addEventListener('DOMContentLoaded', function () {
      const notificationIcon = document.querySelector('.notification');
      const profileIcon = document.querySelector('.profile');
      const notificationMenu = document.querySelector('.notification-menu');
      const profileMenu = document.querySelector('.profile-menu');
      let navOverlay = document.querySelector('.nav-overlay');
      if (!navOverlay) {
        navOverlay = document.createElement('div');
        navOverlay.className = 'nav-overlay';
        document.body.appendChild(navOverlay);
      }

      function closeNavMenus() {
        notificationMenu?.classList.remove('show');
        profileMenu?.classList.remove('show');
        navOverlay.classList.remove('active');
      }

      if (notificationIcon) {
        notificationIcon.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = notificationMenu.classList.toggle('show');
          profileMenu.classList.remove('show');
          if (isOpen) {
            navOverlay.classList.add('active');
          } else {
            navOverlay.classList.remove('active');
          }
        });
      }
      if (profileIcon) {
        profileIcon.addEventListener('click', function (e) {
          e.stopPropagation();
          const isOpen = profileMenu.classList.toggle('show');
          notificationMenu.classList.remove('show');
          if (isOpen) {
            navOverlay.classList.add('active');
          } else {
            navOverlay.classList.remove('active');
          }
        });
      }
      // Overlay bosilganda yoki tashqariga bosilganda menyular yopilsin
      navOverlay.addEventListener('click', closeNavMenus);
      window.addEventListener('click', function () {
        closeNavMenus();
      });
      // ESC tugmasi bosilganda ham menyular yopilsin
      window.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') closeNavMenus();
      });
      // Menyular ichida bosilganda yopilmasin
      if (notificationMenu) notificationMenu.addEventListener('click', e => e.stopPropagation());
      if (profileMenu) profileMenu.addEventListener('click', e => e.stopPropagation());
    });

    // Logout
    const logoutBtns = document.querySelectorAll('#logoutBtn, #logoutBtn2');
    logoutBtns.forEach(btn => {
        btn.addEventListener('click', logout);
    });
    
    function logout(e) {
        e.preventDefault();
        if (confirm('Chiqishni istaysizmi?')) {
            localStorage.removeItem('currentUser');
            window.location.href = 'login.html';
        }
    }

    // Foydalanuvchilar ro'yxatini chiqarish
    function renderUsers() {
        const userList = document.getElementById('userList');
        const userCountDisplay = document.getElementById('userCountDisplay');
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        
        // Foydalanuvchilar sonini ko'rsatish
        if (userCountDisplay) {
            userCountDisplay.textContent = `${users.length} ta foydalanuvchi`;
        }
        
        if (!users.length) {
            userList.innerHTML = "<div style='color:#888; padding: 20px; text-align: center;'>Foydalanuvchi yo'q</div>";
            return;
        }
        
        userList.innerHTML = users.map((user, index) => `
            <div class='user-row'>
                <div class='user-info'>
                    <span class='user-name'><b>${user.fullname || 'Noma\'lum'}</b></span>
                    <span class='user-username' style='color:#888;'>(@${user.username})</span>
                    <span class='user-email' style='color:#666; font-size: 0.9em;'>${user.email || ''}</span>
                    <span class='user-date' style='color:#555; font-size: 0.8em;'>Ro'yxatdan o'tgan: ${new Date(user.registerDate).toLocaleDateString('uz-UZ')}</span>
                </div>
                <div class='user-actions'>
                    <button class='user-delete' data-index='${index}' title="O'chirish">
                        <i class='bx bx-trash'></i>
                    </button>
                </div>
            </div>
        `).join('');
        
        // O'chirish tugmalarini qo'shish
        userList.querySelectorAll('.user-delete').forEach(btn => {
            btn.addEventListener('click', function () {
                const index = parseInt(this.getAttribute('data-index'));
                const user = users[index];
                
                if (confirm(`"${user.fullname || user.username}" foydalanuvchisini o'chirishni istaysizmi?`)) {
                    users.splice(index, 1);
                    localStorage.setItem('users', JSON.stringify(users));
                    renderUsers();
                    updateDashboard();
                    
                    // Notification qo'shish
                    showNotification('Foydalanuvchi muvaffaqiyatli o\'chirildi');
                }
            });
        });
    }

    // Dashboard statistikasi
    function updateDashboard() {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userCountElement = document.getElementById('userCount');
        const activeUsersElement = document.getElementById('activeUsers');
        const newUsersElement = document.getElementById('newUsers');
        
        if (userCountElement) {
            userCountElement.textContent = users.length;
        }
        
        // Faol foydalanuvchilar (24 soat ichida login qilgan)
        const activeUsers = users.filter(user => user.lastLogin && 
            (new Date() - new Date(user.lastLogin)) < 24 * 60 * 60 * 1000).length;
        
        if (activeUsersElement) {
            activeUsersElement.textContent = activeUsers;
        }
        
        // Yangi foydalanuvchilar (24 soat ichida ro'yxatdan o'tgan)
        const newUsers = users.filter(user => {
            const registerDate = new Date(user.registerDate || Date.now());
            const now = new Date();
            return (now - registerDate) < 24 * 60 * 60 * 1000; // 24 soat ichida
        }).length;
        
        if (newUsersElement) {
            newUsersElement.textContent = newUsers;
        }
        
        // Notification sonini yangilash
        const notificationNum = document.querySelector('.notification .num');
        if (notificationNum) {
            notificationNum.textContent = newUsers || '0';
            notificationNum.style.display = newUsers > 0 ? 'flex' : 'none';
        }
    }

    // Notification ko'rsatish
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--blue);
            color: var(--dark);
            padding: 15px 20px;
            border-radius: 8px;
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // CSS animatsiyalari
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Sahifa yuklanganda dashboard yangilash
    updateDashboard();
    
    // Qidiruv funksiyasi
    const searchInput = document.querySelector('#content nav form input');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const userRows = document.querySelectorAll('#userList .user-row');
            
            userRows.forEach(row => {
                const userName = row.querySelector('.user-name').textContent.toLowerCase();
                const userUsername = row.querySelector('.user-username').textContent.toLowerCase();
                
                if (userName.includes(searchTerm) || userUsername.includes(searchTerm)) {
                    row.style.display = 'flex';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
} 