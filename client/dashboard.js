// async function fetchAndRenderUsers() {
//     try {
//       const response = await fetch('http://localhost:8800/user', {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });
  
//       if (!response.ok) {
//         throw new Error(`HTTP error! Status: ${response.status}`);
//       }
  
//       const users = await response.json();
//       renderUsers(users);
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//     }
//   }
  
//   function renderUsers(users) {
//     const userListContainer = document.getElementById('userList');
//     userListContainer.innerHTML = ''; // Clear existing list
  
//     users.forEach(user => {
//       const listItem = document.createElement('li');
//       listItem.textContent = `Username: ${user.username}, Gender: ${user.gender}, Age: ${user.age}`;
//       userListContainer.appendChild(listItem);
//     });
//   }
  
  async function create() {
    try {
      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;
  
      const response = await fetch('http://localhost:8800/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('User created successfully');
  
      // After creating the user, fetch and render the updated user list
    //   fetchAndRenderUsers();
    } catch (error) {
      console.error('Error creating user:', error);
    }
  }
  