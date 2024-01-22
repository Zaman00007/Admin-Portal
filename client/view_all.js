document.addEventListener('DOMContentLoaded', async function() {
    await renderUsers();
});

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

        users.slice(0, 8).forEach(user => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${user._id}</td>
                <td>${user.username}</td>
                <td><img src="${user.imagePath ? `${user.imagePath}` : 'default-photo.jpg'}" alt="User Photo"></td>
                <td>
                    <button onclick="deleteUser('${user._id}')" class="" >Delete</button>
                    <button onclick="acceptProfilePic('${user._id}')" class="accept" >Accept</button>
                </td>
            `;
            console.log(user.imagePath);
            userTableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Error fetching user data:', error);
    }
}

async function deleteUser(userId) {
    try {
        const response = await fetch(`http://localhost:8800/admin/deleteUser/${userId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(`User with ID ${userId} deleted successfully`);
        await renderUsers();
    } catch (error) {
        console.error(`Error deleting user with ID ${userId}:`, error);
    }
}

async function acceptProfilePic(userId) {
    try {
        const response = await fetch(`http://localhost:8800/admin/acceptProfilePic/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        console.log(`Profile picture for user with ID ${userId} accepted successfully`);
        await renderUsers();
    } catch (error) {
        console.error(`Error accepting profile picture for user with ID ${userId}:`, error);
    }
}
