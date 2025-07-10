document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoDate = document.getElementById('todo-date');
  const todoBody = document.getElementById('todo-body');
  const filterInput = document.getElementById('filter-input');
  const deleteAllBtn = document.getElementById('delete-all');

  let todos = [];

  function renderTodos(filtered = '') {
    todoBody.innerHTML = '';
    const filteredTodos = todos.filter(todo =>
      todo.text.toLowerCase().includes(filtered.toLowerCase())
    );
    if (filteredTodos.length === 0) {
      todoBody.innerHTML = '<tr><td colspan="4" class="no-task">No tasks found!</td></tr>';
    } else {
      filteredTodos.forEach((todo, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${todo.text}</td>
          <td>${todo.date}</td>
          <td>${todo.completed ? '✅ Done' : '⏳ Pending'}</td>
          <td>
            <button onclick="toggleStatus(${index})">✔️</button>
            <button onclick="deleteTodo(${index})">❌</button>
          </td>
        `;
        todoBody.appendChild(row);
      });
    }
  }

  window.toggleStatus = function(index) {
    todos[index].completed = !todos[index].completed;
    renderTodos(filterInput.value);
  };

  window.deleteTodo = function(index) {
    todos.splice(index, 1);
    renderTodos(filterInput.value);
  };

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    if (todoInput.value.trim() && todoDate.value) {
      todos.push({
        text: todoInput.value.trim(),
        date: todoDate.value,
        completed: false
      });
      todoInput.value = '';
      todoDate.value = '';
      renderTodos();
    }
  });

  filterInput.addEventListener('input', () => {
    renderTodos(filterInput.value);
  });

  deleteAllBtn.addEventListener('click', () => {
    todos = [];
    renderTodos();
  });

  renderTodos();
});
