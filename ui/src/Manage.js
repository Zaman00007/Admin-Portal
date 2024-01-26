import React, { useEffect, useState } from "react";
import "./Manage.css";
import Cookies from "js-cookie";

function Manage() {
  const [users, setUsers] = useState([]);
  const token = Cookies.get('token');

  useEffect(() => {
    renderUsers();
  }, []);

  const renderUsers = async () => {
    try {
      const response = await fetch('http://localhost:8800/admin/', {
        method: 'GET',
        headers: {
        //   'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const usersData = await response.json();

      setUsers(usersData.slice(0, 8));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`http://localhost:8800/admin/deleteUser/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
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
  };

  const acceptProfilePic = async (userId) => {
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
  };

  return (
    <div>
      <h1>Users</h1>

      <table id="userTable">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Photo</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.username}</td>
              <td><img src={user.imagePath ? `${user.imagePath}` : "./default-pic.jpg"} alt="User Photo" /></td>
              <td>
                <button onClick={() => deleteUser(user._id)} className="">Delete</button>
                <button onClick={() => acceptProfilePic(user._id)} className="accept">Accept</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Manage;


