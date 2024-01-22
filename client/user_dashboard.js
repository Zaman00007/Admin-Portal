async function updateProfilePicture(userId,image) {
    // const username = document.getElementById('username').value;
    // const image = document.getElementById('image').files[0];

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


