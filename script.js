const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');

// Load tasks from localStorage on startup
let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
renderTasks();
requestNotificationPermission();

function requestNotificationPermission() {
  if ('Notification' in window) {
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }
}

function scheduleNotification(task) {
  if ('Notification' in window && Notification.permission === 'granted') {
    const timeUntil = new Date(task.due) - Date.now();
    if (timeUntil > 0) {
      setTimeout(() => {
        new Notification(`Reminder: ${task.title}`);
      }, timeUntil);
    }
  }
}

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((t, idx) => {
    const li = document.createElement('li');
    li.className = `task-item ${t.priority}`;
    li.innerHTML = `
      <span>${t.title} - ${new Date(t.due).toLocaleString()}</span>
      <button class="delete-btn" data-idx="${idx}">&times;</button>
    `;
    taskList.appendChild(li);
    scheduleNotification(t);
  });
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();
  const title = document.getElementById('task-title').value.trim();
  const priority = document.getElementById('task-priority').value;
  const due = document.getElementById('task-due').value;
  if (!title || !due) return;
  const newTask = { title, priority, due };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
  taskForm.reset();
});

// Delete task
taskList.addEventListener('click', e => {
  if (e.target.classList.contains('delete-btn')) {
    const idx = e.target.getAttribute('data-idx');
    tasks.splice(idx, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
});
