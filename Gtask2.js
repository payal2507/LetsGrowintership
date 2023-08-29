function getUsers() {
    const userCardGrid = document.getElementById('userCardGrid');
    const loader = document.getElementById('loader');
  
    loader.style.display = 'block';
    userCardGrid.innerHTML = '';
  
    fetch('https://reqres.in/api/users?page=1')
      .then(response => response.json())
      .then(data => {
        loader.style.display = 'none';
        const users = data.data;
        users.forEach(user => {
          const userCard = document.createElement('div');
          userCard.className = 'user-card';
          userCard.innerHTML = `
            <img class="user-avatar" src="${user.avatar}" alt="${user.first_name}">
            <div class="user-name">${user.first_name} ${user.last_name}</div>
            <div class="user-email">${user.email}</div>
          `;
          userCardGrid.appendChild(userCard);
        });
      })
      .catch(error => {
        loader.style.display = 'none';
        console.error('Error fetching users:', error);
      });
  }
  