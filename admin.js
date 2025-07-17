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
window.addEventListener('resize', function() {
  if(window.innerWidth > 900) closeSidebar();
});

// Dark mode
const switchMode = document.getElementById('switch-mode');
switchMode.addEventListener('change', function () {
    if (this.checked) document.body.classList.add('dark');
    else document.body.classList.remove('dark');
});

// Notification/Profile menu
document.querySelector('.notification').addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelector('.notification-menu').classList.toggle('show');
    document.querySelector('.profile-menu').classList.remove('show');
});
document.querySelector('.profile').addEventListener('click', function (e) {
    e.stopPropagation();
    document.querySelector('.profile-menu').classList.toggle('show');
    document.querySelector('.notification-menu').classList.remove('show');
});
window.addEventListener('click', function () {
    document.querySelector('.notification-menu').classList.remove('show');
    document.querySelector('.profile-menu').classList.remove('show');
});

// Logout
document.getElementById('logoutBtn').onclick = logout;
document.getElementById('logoutBtn2').onclick = logout;
function logout(e) {
    e.preventDefault();
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

// Foydalanuvchilar ro‘yxatini chiqarish
function renderUsers() {
    const userList = document.getElementById('userList');
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (!users.length) {
        userList.innerHTML = "<div style='color:#888;'>Foydalanuvchi yo‘q</div>";
        return;
    }
    userList.innerHTML = users.map((u, i) =>
        `<div class='user-row' style='display:flex;justify-content:space-between;align-items:center;padding:10px 0;border-bottom:1px solid #eee;'>
            <span><b>${u.fullname}</b> <span style='color:#888;'>(@${u.username})</span></span>
            <button class='user-delete' data-idx='${i}' style='background:none;border:none;color:#e74c3c;cursor:pointer;font-size:1.1em;'><i class='bx bx-trash'></i></button>
        </div>`
    ).join('');
    userList.querySelectorAll('.user-delete').forEach(btn => {
        btn.onclick = function () {
            if (confirm('Foydalanuvchini o‘chirishni istaysizmi?')) {
                users.splice(+btn.getAttribute('data-idx'), 1);
                localStorage.setItem('users', JSON.stringify(users));
                renderUsers();
                updateDashboard();
            }
        }
    });
}

// Dashboard statistikasi
function updateDashboard() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    document.getElementById('userCount').textContent = users.length;
}
updateDashboard(); 