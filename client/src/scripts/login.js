const toggleLoginPassword = document.getElementById('toggleLoginPassword');
const loginPasswordInput = document.getElementById('loginPassword');
const loginForm = document.getElementById('loginForm');

toggleLoginPassword.addEventListener('click', function() {
    const type = loginPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    loginPasswordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

loginForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const loginData = {
        username: document.getElementById('loginUsername').value,
        password: loginPasswordInput.value
    };

    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Login Successful!');
            
            // I-save ang mahahalagang info
            localStorage.setItem('token', result.token);
            localStorage.setItem('username', result.user.username);
            localStorage.setItem('campus', result.user.campus);
            
            // Redirect palabas ng 'src/pages' folder patungong root
            window.location.href = '../../index.html';
        } else {
            alert(result.msg || 'Login failed');
        }
    } catch (error) {
        alert('Server is not responding. Check your backend.');
    }
});