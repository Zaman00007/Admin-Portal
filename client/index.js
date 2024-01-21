

document.addEventListener('DOMContentLoaded', async function () {
    try {
        const response = await fetch('http://localhost:8800/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            const data = await response.json();
            console.log('Response from server:', data);
        } else {
            console.error('Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Error:', error.message);
    }
});
