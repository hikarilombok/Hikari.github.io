// To-Do List Application with Local Storage

class TodoApp {
    constructor() {
        this.todos = [];
        this.currentFilter = 'all';
        this.storageKey = 'todoAppData';
        
        this.initializeElements();
        this.loadFromStorage();
        this.attachEventListeners();
        this.render();
    }

    initializeElements() {
        this.todoInput = document.getElementById('todoInput');
        this.addBtn = document.getElementById('addBtn');
        this.todoList = document.getElementById('todoList');
        this.todoCount = document.getElementById('todoCount');
        this.clearBtn = document.getElementById('clearBtn');
        this.emptyState = document.getElementById('emptyState');
        this.filterBtns = document.querySelectorAll('.filter-btn');
    }

    attachEventListeners() {
        this.addBtn.addEventListener('click', () => this.addTodo());
        this.todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.addTodo();
        });
        this.clearBtn.addEventListener('click', () => this.clearCompleted());
        
        this.filterBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.filterBtns.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                this.currentFilter = e.target.dataset.filter;
                this.render();
            });
        });
    }

    addTodo() {
        const text = this.todoInput.value.trim();
        
        if (text === '') {
            alert('Please enter a task!');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.todoInput.value = '';
        this.todoInput.focus();
        this.saveToStorage();
        this.render();
    }

    deleteTodo(id) {
        this.todos = this.todos.filter(todo => todo.id !== id);
        this.saveToStorage();
        this.render();
    }

    toggleTodo(id) {
        const todo = this.todos.find(todo => todo.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveToStorage();
            this.render();
        }
    }

    clearCompleted() {
        if (this.todos.some(todo => todo.completed)) {
            if (confirm('Are you sure you want to delete all completed tasks?')) {
                this.todos = this.todos.filter(todo => !todo.completed);
                this.saveToStorage();
                this.render();
            }
        }
    }

    getFilteredTodos() {
        switch (this.currentFilter) {
            case 'active':
                return this.todos.filter(todo => !todo.completed);
            case 'completed':
                return this.todos.filter(todo => todo.completed);
            default:
                return this.todos;
        }
    }

    updateTodoCount() {
        const activeTodos = this.todos.filter(todo => !todo.completed).length;
        this.todoCount.textContent = `${activeTodos} task${activeTodos !== 1 ? 's' : ''} remaining`;
    }

    render() {
        const filteredTodos = this.getFilteredTodos();
        this.todoList.innerHTML = '';

        if (this.todos.length === 0) {
            this.emptyState.classList.remove('hidden');
            this.todoList.style.display = 'none';
        } else {
            this.emptyState.classList.add('hidden');
            this.todoList.style.display = 'block';

            filteredTodos.forEach(todo => {
                const li = document.createElement('li');
                li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
                li.innerHTML = `
                    <input 
                        type="checkbox" 
                        class="checkbox" 
                        ${todo.completed ? 'checked' : ''}
                        data-id="${todo.id}"
                    >
                    <span class="todo-text">${this.escapeHtml(todo.text)}</span>
                    <button class="delete-btn" data-id="${todo.id}">Delete</button>
                `;

                // Add event listeners
                li.querySelector('.checkbox').addEventListener('change', () => {
                    this.toggleTodo(todo.id);
                });

                li.querySelector('.delete-btn').addEventListener('click', () => {
                    this.deleteTodo(todo.id);
                });

                this.todoList.appendChild(li);
            });
        }

        this.updateTodoCount();
    }

    saveToStorage() {
        try {
            const data = JSON.stringify(this.todos);
            localStorage.setItem(this.storageKey, data);
        } catch (error) {
            console.error('Error saving to localStorage:', error);
            alert('Failed to save tasks. Please check your storage quota.');
        }
    }

    loadFromStorage() {
        try {
            const data = localStorage.getItem(this.storageKey);
            if (data) {
                this.todos = JSON.parse(data);
            }
        } catch (error) {
            console.error('Error loading from localStorage:', error);
            this.todos = [];
        }
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    // Export todos as JSON
    exportData() {
        const dataStr = JSON.stringify(this.todos, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `todos_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
    }

    // Import todos from JSON
    importData(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (Array.isArray(imported)) {
                this.todos = imported;
                this.saveToStorage();
                this.render();
                alert('Tasks imported successfully!');
            } else {
                alert('Invalid JSON format. Expected an array of tasks.');
            }
        } catch (error) {
            alert('Error importing data: ' + error.message);
        }
    }

    // Clear all data
    clearAllData() {
        if (confirm('This will delete ALL tasks. This action cannot be undone. Are you sure?')) {
            this.todos = [];
            this.saveToStorage();
            this.render();
        }
    }
}

// Initialize the app when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
});
