async function renderUsers() {
    const userTableBody = document.querySelector('#userTable tbody');

    try {
        
        const response = await fetch('http://localhost:8800/admin/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const users = await response.json();

        
        userTableBody.innerHTML = '';

        
        users.slice(0, 2).forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td><img src="${user.profilePic || 'default-photo.jpg'}" alt="User Photo"></td>
                <td><button onclick="deleteUser('${user._id}')">Delete</button></td>
            `;
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}


function deleteUser(userId) {
    console.log(`Deleting user with ID: ${userId}`);

}


renderUsers();
