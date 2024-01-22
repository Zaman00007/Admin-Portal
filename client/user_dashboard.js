async function updateProfilePicture(userId,image) {
    

    try {
        const formData = new FormData();
        // formData.append('username', username);
        formData.append('image', image);

        const response = await fetch(`http://localhost:8800/user/upload/${userId}`, {
            method: 'PUT',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Profile update successful', data);
       
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}

async function displayAcceptStatus(userId) {
    try {
        // const user = await getUserById(userId);

        const response = await fetch(`http://localhost:8800/admin/getUser/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const user = await response.json();

        
        console.log(user.username);
        const acceptStatus = user.accept;
        console.log(acceptStatus);
        if (acceptStatus) {
    
            document.getElementById('acceptStatus').textContent = 'Accepted by admin';
        } else {
            
            document.getElementById('acceptStatus').textContent = 'Not accepted by admin';
        }
       
    } catch (error) {
        console.error('Error getting user:', error);
    }
}


