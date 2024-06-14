// main.js

const postButton = document.getElementById('postButton');
const todosButton = document.getElementById('todosButton');
const postContent = document.getElementById('postContent');
const todosContent = document.getElementById('todosContent');
const userSelect = document.getElementById('userSelect');
const userTodosSelect = document.getElementById('userTodosSelect');
const postList = document.getElementById('postList');
const todosList = document.getElementById('todosList');

// Function to fetch users and populate select options
function fetchUsers() {
  fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {
        const option = document.createElement('option');
        option.textContent = user.name;
        option.value = user.id;
        userSelect.appendChild(option);

        const todosOption = document.createElement('option');
        todosOption.textContent = user.name;
        todosOption.value = user.id;
        userTodosSelect.appendChild(todosOption);
      });
    })
    .catch(error => {
      console.error('Error fetching users:', error);
    });
}

// Function to fetch posts based on selected user
function fetchPosts(userId) {
  fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
    .then(response => response.json())
    .then(posts => {
      postList.innerHTML = '';
      posts.forEach(post => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        `;
        postList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching posts:', error);
    });
}

// Function to fetch todos based on selected user
function fetchTodos(userId) {
  fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
    .then(response => response.json())
    .then(todos => {
      todosList.innerHTML = '';
      todos.forEach(todo => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          <h3>${todo.title}</h3>
          <p>Status: ${todo.completed ? 'Completed' : 'Incomplete'}</p>
        `;
        todosList.appendChild(listItem);
      });
    })
    .catch(error => {
      console.error('Error fetching todos:', error);
    });
}

// Event listener for switching to Post content
postButton.addEventListener('click', () => {
  postButton.classList.add('active');
  todosButton.classList.remove('active');
  postContent.classList.remove('hidden');
  todosContent.classList.add('hidden');
});

// Event listener for switching to Todos content
todosButton.addEventListener('click', () => {
  todosButton.classList.add('active');
  postButton.classList.remove('active');
  todosContent.classList.remove('hidden');
  postContent.classList.add('hidden');
});

// Event listener for user selection in Post section
userSelect.addEventListener('change', () => {
  const userId = userSelect.value;
  fetchPosts(userId);
});

// Event listener for user selection in Todos section
userTodosSelect.addEventListener('change', () => {
  const userId = userTodosSelect.value;
  fetchTodos(userId);
});

// Initialize by fetching users
fetchUsers();
