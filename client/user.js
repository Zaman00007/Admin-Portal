async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const responsePost = await fetch('http://localhost:8800/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        if (!responsePost.ok) {
            throw new Error(`HTTP error! Status: ${responsePost.status}`);
        }

        const data = await responsePost.json();
        if (data._id) {
            console.log('Authentication successful');

            window.location.href = `user_dashboard.html?userId=${data._id}`;
        } else {
            console.error('Authentication failed');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
    }
}


document.getElementById('loginForm').addEventListener('submit', function (event) {
    event.preventDefault(); 
    login();
});
