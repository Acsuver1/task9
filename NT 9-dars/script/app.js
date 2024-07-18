document.addEventListener('DOMContentLoaded', () => {
    const userContainer = document.getElementById('user-container');
    const archiveContainer = document.getElementById('archive-container');
    const loadingIndicator = document.getElementById('loading');
    const confirmDialog = document.getElementById('confirm-dialog');
    const confirmOk = document.getElementById('confirm-ok');
    const confirmCancel = document.getElementById('confirm-cancel');
    let userIdToDelete = null;
    let userCardToDelete = null;
  
    const fetchUsers = async () => {
      loadingIndicator.style.display = 'block';
      try {
        const response = await fetch('https://dummyjson.com/users');
        const data = await response.json();
        displayUsers(data.users);
      } catch (error) {
        console.error('Error fetching users:', error);
      } finally {
        loadingIndicator.style.display = 'none';
      }
    };
  
    const displayUsers = (users) => {
      users.forEach(user => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
          <img src="${user.image}" alt="${user.firstName} ${user.lastName}">
          <h2>${user.firstName} ${user.lastName}</h2>
          <p>${user.gender}</p>
          <p>${user.birthDate}</p>
          <p>${user.address.city}, ${user.address.street}</p>
          <button class="delete-btn" data-id="${user.id}">Delete</button>
        `;
        userContainer.appendChild(card);
      });
  
      document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDeleteClick);
      });
    };
  
    const handleDeleteClick = (event) => {
      userIdToDelete = event.target.dataset.id;
      userCardToDelete = event.target.parentElement;
      confirmDialog.style.display = 'flex';
    };
  
    confirmOk.addEventListener('click', async () => {
      if (userIdToDelete) {
        try {
          await fetch(`https://dummyjson.com/users/${userIdToDelete}`, {
            method: 'DELETE',
          });
          archiveContainer.appendChild(userCardToDelete);
          userCardToDelete.querySelector('.delete-btn').remove();
        } catch (error) {
          console.error('Error deleting user:', error);
        } finally {
          confirmDialog.style.display = 'none';
          userIdToDelete = null;
          userCardToDelete = null;
        }
      }
    });
  
    confirmCancel.addEventListener('click', () => {
      confirmDialog.style.display = 'none';
      userIdToDelete = null;
      userCardToDelete = null;
    });
  
    fetchUsers();
  });
  