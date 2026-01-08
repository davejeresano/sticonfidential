const campusData = {
    metro_manila: [
        "STI College Alabang", "STI College Caloocan", "STI College Cubao", 
        "STI College Fairview", "STI College Global City", "STI College Las Piñas", 
        "STI College Marikina", "STI College Muñoz-EDSA", "STI College Novaliches", 
        "STI College Pasay-EDSA", "STI College Quezon Avenue", "STI College Recto", "STI College Sta. Mesa"
    ],
    northern_central_luzon: [
        "STI College Alaminos", "STI College Baguio", "STI College Dagupan", 
        "STI College La Union", "STI College Laoag", "STI College Malolos", 
        "STI College Meycauayan", "STI College Tarlac", "STI College San Jose Del Monte"
    ],
    southern_luzon: [
        "STI College Calamba", "STI College Tanay", "STI College Sta. Cruz", 
        "STI College San Pablo", "STI College Puerto Princesa", "STI College Naga", 
        "STI College Legazpi", "STI College Bacoor", "STI College Carmona"
    ],
    visayas: [
        "STI College Calbayog", "STI College Iloilo", "STI College Cebu", 
        "STI College Dumaguete", "STI College Maasin", "STI College Bohol"
    ],
    mindanao: [
        "STI College Cagayan De Oro", "STI College Iligan", "STI College Davao", 
        "STI College General Santos", "STI College Valencia", "STI College Surigao", 
        "STI College Koronadal", "STI College Tagum", "STI College Cotabato"
    ]
};

const regionSelect = document.getElementById('region');
const campusSelect = document.getElementById('campus');
const deptSelect = document.getElementById('department');
const registerForm = document.getElementById('registerForm');
const togglePassword = document.getElementById('togglePassword');
const passwordInput = document.getElementById('password');

regionSelect.addEventListener('change', function() {
    const branches = campusData[this.value];
    campusSelect.disabled = false;
    campusSelect.innerHTML = '<option value="" disabled selected>Select Campus</option>';
    branches.forEach(branch => {
        const option = document.createElement('option');
        option.value = branch;
        option.textContent = branch;
        campusSelect.appendChild(option);
    });
});

togglePassword.addEventListener('click', function() {
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
    this.textContent = type === 'password' ? '👁️' : '🙈';
});

registerForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const formData = {
        username: document.getElementById('username').value,
        region: regionSelect.value,
        campus: campusSelect.value,
        department: deptSelect.value,
        password: passwordInput.value
    };

    try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert('Registration Successful!');
            window.location.href = 'login.html';
        } else {
            alert(result.msg || 'Registration failed');
        }
    } catch (error) {
        alert('Error connecting to server. Make sure your backend is running.');
    }
});