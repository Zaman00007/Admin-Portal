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
        if (!responsePost.ok) {
            throw new Error(`HTTP error! Status: ${responsePost.status}`);
        }

        const data = await responsePost.json();
        console.log(data);
        if (data._id) {
            console.log('Authentication successful');
        } else {
            console.error('Authentication failed');
        }
    } catch (error) {
        console.error('Error during authentication:', error);
    }
}
