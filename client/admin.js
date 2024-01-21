async function login() {
    try {

        const responseGet = await fetch('http://localhost:8800/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(responseGet.json());

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        console.log(username, password);

    
        const responsePost = await fetch('http://localhost:8800/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });
        
        
        
        const data = await responsePost.json();
        if (data.isAdmin) {
            console.log('Authentication successful');
            window.location.href = "dashboard.html";
        } else {
            console.error('Authentication failed. You are not Admin!!!');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
    }
}
