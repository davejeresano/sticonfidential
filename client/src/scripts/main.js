const socket = io('https://sticonfidential.onrender.com');

document.addEventListener('DOMContentLoaded', () => {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('username');
    const campus = localStorage.getItem('campus');

    if (!token) {
        window.location.href = 'src/pages/login.html';
        return;
    }

    const userDisplay = document.getElementById('displayUsername');
    const campusDisplay = document.getElementById('displayCampus');
    
    if (userDisplay) userDisplay.textContent = username || 'Anonymous';
    if (campusDisplay) campusDisplay.textContent = campus || 'STI Campus';

    const chatForm = document.getElementById('chatForm');
    const messageInput = document.getElementById('messageInput');
    const messagesContainer = document.getElementById('messages');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = messageInput.value.trim();
        
        if (messageText) {
            const data = {
                text: messageText,
                sender: username || 'Anonymous'
            };
            
            socket.emit('chatMessage', data);
            messageInput.value = '';
        }
    });

    socket.on('message', (data) => {
        const div = document.createElement('div');
        div.className = 'message-wrapper'; 
        
        const isMe = data.sender === username ? 'my-message' : '';
        
        div.innerHTML = `
            <div class="msg-bubble ${isMe}">
                <span class="sender">Anonymous</span>
                <p class="text">${data.text}</p>
                <span class="msg-time">${data.time}</span>
            </div>
        `;
        messagesContainer.appendChild(div);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    });

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.clear();
            window.location.href = 'src/pages/login.html';
        });
    }
});