// Mock API for Todo App
// This file simulates an API that would be used in a real application
// It will be used in future steps to demonstrate API integration

class MockTodoApi {
    constructor() {
        // Simulate a delay to mimic network requests
        this.delay = 300;
        
        // In-memory storage (in a real app, this would be a database)
        this.todos = JSON.parse(localStorage.getItem('todos') || '[]');
    }
    
    // Get all todos
    async getTodos() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...this.todos]);
            }, this.delay);
        });
    }
    
    // Add a new todo
    async addTodo(todoText) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (!todoText || todoText.trim() === '') {
                    reject(new Error('Todo text cannot be empty'));
                    return;
                }
                
                const newTodo = {
                    id: Date.now(),
                    text: todoText.trim(),
                    completed: false
                };
                
                this.todos.push(newTodo);
                this._saveTodos();
                
                resolve(newTodo);
            }, this.delay);
        });
    }
    
    // Update a todo
    async updateTodo(id, updates) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.todos.findIndex(todo => todo.id === id);
                
                if (index === -1) {
                    reject(new Error(`Todo with id ${id} not found`));
                    return;
                }
                
                this.todos[index] = { ...this.todos[index], ...updates };
                this._saveTodos();
                
                resolve(this.todos[index]);
            }, this.delay);
        });
    }
    
    // Delete a todo
    async deleteTodo(id) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const index = this.todos.findIndex(todo => todo.id === id);
                
                if (index === -1) {
                    reject(new Error(`Todo with id ${id} not found`));
                    return;
                }
                
                const deletedTodo = this.todos[index];
                this.todos.splice(index, 1);
                this._saveTodos();
                
                resolve(deletedTodo);
            }, this.delay);
        });
    }
    
    // Private method to save todos to localStorage
    _saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }
}

// Export the API for use in the main application
// To be integrated in a future step
// export const todoApi = new MockTodoApi(); 