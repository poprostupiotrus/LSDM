let isLoggingIn = false;
let isRegistering = false;
function handleLogin(event) {
    event.preventDefault();

    if (isLoggingIn) return;


    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginBtn = document.querySelector('.btn-login');
    const registerBtn = document.querySelector('#loginForm ~ .footer .btn-register');
    const loginForm = document.getElementById('loginForm');
    isLoggingIn = true;
    loginForm.querySelectorAll('input').forEach(input => {
        input.disabled = true;
    });
    loginForm.querySelectorAll('.toggle-password').forEach(btn => {
        btn.disabled = true;
    });
    loginBtn.classList.add('loading');
    loginBtn.querySelector('span').textContent = 'Logowanie...';
    if (registerBtn) registerBtn.disabled = true;
    hideMessage('message');
    if (typeof mp !== 'undefined') {
        mp.trigger('client:playerLogin', username, password);
    }
    showMessage()
}


function handleRegister(event) {
    event.preventDefault();
    if (isRegistering) return;
    const username = document.getElementById('reg-username').value.trim();
    const password = document.getElementById('reg-password').value;
    const confirmPassword = document.getElementById('reg-confirm-password').value;
    const messageEl = document.getElementById('register-message');
    const registerBtn = document.querySelector('#registerForm .btn-login');
    const loginBtn = document.querySelector('#registerForm ~ .footer .btn-register');
    const registerForm = document.getElementById('registerForm');
    if (password !== confirmPassword) {
        showMessage(messageEl, 'Hasła nie są identyczne', 'error');
        return;
    }
    isRegistering = true;
    registerForm.querySelectorAll('input').forEach(input => {
        input.disabled = true;
    });
    registerForm.querySelectorAll('.toggle-password').forEach(btn => {
        btn.disabled = true;
    });
    registerBtn.classList.add('loading');
    registerBtn.querySelector('span').textContent = 'Rejestrowanie...';
    registerBtn.disabled = true;
    if (loginBtn) loginBtn.disabled = true;
    if (typeof mp !== 'undefined') {
        mp.trigger('client:playerRegister', username, password);
    }
}

function resetLoginState() {
    isLoggingIn = false;
    const loginBtn = document.querySelector('#loginForm .btn-login');
    const registerBtn = document.querySelector('#loginForm ~ .footer .btn-register');
    const loginForm = document.getElementById('loginForm');
    loginForm.querySelectorAll('input').forEach(input => {
        input.disabled = false;
    });
    loginForm.querySelectorAll('.toggle-password').forEach(btn => {
        btn.disabled = false;
    });
    if (loginBtn) {
        loginBtn.classList.remove('loading');
        loginBtn.disabled = false;
        loginBtn.querySelector('span').textContent = 'Zaloguj się';
    }
    if (registerBtn) registerBtn.disabled = false;
}

function resetRegisterState() {
    isRegistering = false;
    const registerBtn = document.querySelector('#registerForm .btn-login');
    const loginBtn = document.querySelector('#registerForm ~ .footer .btn-register');
    const registerForm = document.getElementById('registerForm');
    registerForm.querySelectorAll('input').forEach(input => {
        input.disabled = false;
    });
    registerForm.querySelectorAll('.toggle-password').forEach(btn => {
        btn.disabled = false;
    });
    if (registerBtn) {
        registerBtn.classList.remove('loading');
        registerBtn.disabled = false;
        registerBtn.querySelector('span').textContent = 'Zarejestruj się';
    }
    if (loginBtn) loginBtn.disabled = false;
}

function togglePassword() {
    const passwordInput = document.getElementById('password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

function toggleRegisterPassword() {
    const passwordInput = document.getElementById('reg-password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
}

function toggleConfirmPassword() {
    const confirmPasswordInput = document.getElementById('reg-confirm-password');
    confirmPasswordInput.type = confirmPasswordInput.type === 'password' ? 'text' : 'password';
}


function showRegister() {
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
    document.getElementById('loginForm').closest('.login-container').style.display = 'none';
    document.getElementById('registerContainer').style.display = 'block';
    hideMessage('message');
    hideMessage('register-message');
}

function showLogin() {
    document.getElementById('reg-username').value = '';
    document.getElementById('reg-password').value = '';
    document.getElementById('reg-confirm-password').value = '';
    document.getElementById('registerContainer').style.display = 'none';
    document.getElementById('loginForm').closest('.login-container').style.display = 'block';
    hideMessage('message');
    hideMessage('register-message');
}


function closeForm() {
    if (typeof mp !== 'undefined') {
        mp.trigger('client:closeAuthForm');
    }
}


function showMessage(element, text, type) {
    const messageEl = typeof element === 'string' ? document.getElementById(element) : element;
    messageEl.textContent = text;
    messageEl.className = `message show ${type}`;
}

function hideMessage(elementId) {
    const messageEl = document.getElementById(elementId);
    messageEl.classList.remove('show');
    messageEl.textContent = '';
}

if (typeof mp !== 'undefined') {
    
    mp.events.add('browser:loginResult', (success, message) => {
        const messageEl = document.getElementById('message');
        const loginBtn = document.querySelector('.btn-login');
        
        loginBtn.classList.remove('loading');
        loginBtn.querySelector('span').textContent = 'Zaloguj się';
        
        showMessage(messageEl, message, success ? 'success' : 'error');
        
        if (success) {
            setTimeout(() => {
                closeForm();
            }, 1500);
        } else {
            resetLoginState();
        }
    });

    mp.events.add('browser:registerResult', (success, message) => {
        const messageEl = document.getElementById('register-message');
        const registerBtn = document.querySelector('#registerForm .btn-login');
        
        registerBtn.classList.remove('loading');
        registerBtn.querySelector('span').textContent = 'Zarejestruj się';
        
        showMessage(messageEl, message, success ? 'success' : 'error');
        
        if (success) {
            setTimeout(() => {
                closeForm();
            }, 1500);
        } else {
            resetRegisterState();
        }
    });

    mp.events.add('browser:showAuthForm', () => {
        document.getElementById('loginForm').closest('.login-container').style.display = 'block';
        document.getElementById('registerContainer').style.display = 'none';
    });
}