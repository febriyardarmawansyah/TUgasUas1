<!-- App.vue -->
<template>
  <div id="app">
    <div class="header">
      <button id="postButton" @click="toggleTab('post')" :class="{ 'active': activeTab === 'post' }">Post</button>
      <button id="todosButton" @click="toggleTab('todos')" :class="{ 'active': activeTab === 'todos' }">Todos</button>
    </div>
    <div class="container">
      <div id="postContent" class="content" :class="{ 'hidden': activeTab !== 'post' }">
        <h2>Post</h2>
        <select v-model="selectedUserId" @change="loadPosts">
          <option v-for="user in users" :key="user.id" :value="user.id">{{ user.name }}</option>
        </select>
        <ul id="postList">
          <li v-for="post in posts" :key="post.id">
            <h3>{{ post.title }}</h3>
            <p>{{ post.body }}</p>
            <button @click="deletePost(post.id)" class="delete-post">Delete</button>
          </li>
        </ul>
      </div>
      <div id="todosContent" class="content" :class="{ 'hidden': activeTab !== 'todos' }">
        <h2>Todos</h2>
        <ul id="todosList">
          <li v-for="todo in todos" :key="todo.id">
            {{ todo.title }} - {{ todo.completed ? 'Completed' : 'Not Completed' }}
            <!-- Uncomment the line below if you want to add delete button for todos -->
            <!-- <button @click="deleteTodo(todo.id)" class="delete-todo">Delete</button> -->
          </li>
        </ul>
      </div>
    </div>
    <div id="createPostForm" class="content" :class="{ 'show': showCreatePostForm }">
      <h2>Create Post</h2>
      <textarea v-model="newPost.title" placeholder="Enter title"></textarea>
      <textarea v-model="newPost.body" placeholder="Enter body"></textarea>
      <button @click="submitPost">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      activeTab: 'post',
      users: [],
      posts: [],
      todos: [],
      selectedUserId: 1, // Default user id
      showCreatePostForm: false,
      newPost: {
        title: '',
        body: ''
      }
    };
  },
  mounted() {
    this.loadUsers();
    this.loadPosts();
    this.loadTodos();
  },
  methods: {
    loadUsers() {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
          this.users = users;
        })
        .catch(error => console.error('Error fetching users:', error));
    },
    loadPosts() {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${this.selectedUserId}`)
        .then(response => response.json())
        .then(posts => {
          this.posts = posts;
        })
        .catch(error => console.error('Error fetching posts:', error));
    },
    loadTodos() {
      fetch('https://jsonplaceholder.typicode.com/todos')
        .then(response => response.json())
        .then(todos => {
          this.todos = todos;
        })
        .catch(error => console.error('Error fetching todos:', error));
    },
    deletePost(postId) {
      fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          this.posts = this.posts.filter(post => post.id !== postId);
        })
        .catch(error => console.error('Error deleting post:', error));
    },
    /* Uncomment the method below if you want to add delete functionality for todos
    deleteTodo(todoId) {
      fetch(`https://jsonplaceholder.typicode.com/todos/${todoId}`, {
        method: 'DELETE'
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(() => {
          this.todos = this.todos.filter(todo => todo.id !== todoId);
        })
        .catch(error => console.error('Error deleting todo:', error));
    },
    */
    toggleTab(tab) {
      this.activeTab = tab;
      if (tab === 'post') {
        this.loadPosts();
      } else if (tab === 'todos') {
        this.loadTodos();
      }
    },
    toggleCreatePostForm() {
      this.showCreatePostForm = !this.showCreatePostForm;
    },
    submitPost() {
      const { title, body } = this.newPost;
      if (title.trim() === '' || body.trim() === '') {
        alert('Please enter both title and body for the post.');
        return;
      }

      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
          userId: this.selectedUserId
        }),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(data => {
          this.posts.unshift(data); // Add new post to the beginning of the list
          this.newPost.title = '';
          this.newPost.body = '';
          this.toggleCreatePostForm();
        })
        .catch(error => console.error('Error posting data:', error));
    }
  }
};
</script>

<style scoped>
/* Add your scoped styles here */
/* Ensure existing styles for .header, .container, .content, .hidden, select, ul, li, h3, p, .spinner, .error are maintained */
/* Add any additional specific styles related to Vue.js components here */
</style>
