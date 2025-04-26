// Todo App - Basic Implementation

// DOM Elements
const todoInput = document.getElementById('new-todo');
const addButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');

// Array to store todos
let todos = [];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Add event listeners once DOM is loaded
    addButton.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addTodo();
        }
    });

    // Load todos from localStorage (to be implemented in future steps)
    // loadTodos();
});

// Add a new todo
function addTodo() {
    const todoText = todoInput.value.trim();
    
    if (todoText === '') {
        return; // Don't add empty todos
    }
    
    // Create a new todo object
    const todo = {
        id: Date.now(),
        text: todoText,
        completed: false
    };
    
    // Add to array
    todos.push(todo);
    
    // Clear input
    todoInput.value = '';
    
    // Render the todo
    renderTodo(todo);
    
    // TODO: Save todos to localStorage (to be implemented later)
}

// Render a single todo
function renderTodo(todo) {
    const todoItem = document.createElement('li');
    todoItem.dataset.id = todo.id;
    
    // Create todo content
    const todoContent = document.createElement('span');
    todoContent.textContent = todo.text;
    todoContent.classList.add('todo-text');
    if (todo.completed) {
        todoContent.classList.add('completed');
    }
    
    // Create action buttons container
    const actions = document.createElement('div');
    actions.classList.add('todo-actions');
    
    // Complete button
    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = '✓';
    completeBtn.classList.add('complete-btn');
    completeBtn.addEventListener('click', () => toggleComplete(todo.id));
    
    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '×';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
    
    // Append buttons to actions
    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);
    
    // Add content and actions to list item
    todoItem.appendChild(todoContent);
    todoItem.appendChild(actions);
    
    // Add to the DOM
    todoList.appendChild(todoItem);
}

// Toggle todo completion status
function toggleComplete(id) {
    // Find the todo in the array
    const todoIndex = todos.findIndex(todo => todo.id === id);
    
    if (todoIndex !== -1) {
        // Toggle the completed status
        todos[todoIndex].completed = !todos[todoIndex].completed;
        
        // Update the UI
        const todoItem = document.querySelector(`li[data-id="${id}"]`);
        const todoText = todoItem.querySelector('.todo-text');
        todoText.classList.toggle('completed');
        
        // TODO: Save todos to localStorage (to be implemented later)
    }
}

// Delete a todo
function deleteTodo(id) {
    // Remove from the array
    todos = todos.filter(todo => todo.id !== id);
    
    // Remove from the DOM
    const todoItem = document.querySelector(`li[data-id="${id}"]`);
    todoItem.remove();
    
    // TODO: Save todos to localStorage (to be implemented later)
}

// Future enhancements to be implemented:
// 1. Save and load todos from localStorage
// 2. Add dark mode toggle
// 3. Add filtering capabilities (all, active, completed)
// 4. Add API integration for remote storage
// 5. Add error handling for API requests 