let tasks = [];
let completedTasks = [];

function addTask(event) {
    event.preventDefault();
    const taskTitle = document.getElementById('taskTitle').value;
    const taskDescription = document.getElementById('taskDescription').value;

    tasks.push({
        title: taskTitle,
        description: taskDescription,
        completed: false,
        createdAt: new Date().toLocaleString(),
        completedAt: null,



    });

    updateTables();
    document.Mainform.reset();
}

function completeTask(index) {
    tasks[index].completed = true;
    tasks[index].completedAt = new Date().toLocaleString();
    completedTasks.push(tasks.splice(index, 1)[0]);

    updateTables();
}

function deleteTask(taskList, index) {
    taskList.splice(index, 1);
    updateTables();
}

function updateTables() {
    const taskListTable = document.getElementById('taskList');
    const completedListTable = document.getElementById('completedList');
    const pendingListTable = document.getElementById('pendingList');

    taskListTable.innerHTML = '';
    completedListTable.innerHTML = '';
    pendingListTable.innerHTML = '';

    tasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td><input type="checkbox" onchange="completeTask(${index})" ${task.completed ? 'checked' : ''}></td>
      <td><button onclick="deleteTask(tasks, ${index})">Delete</button></td>
    `;
        taskListTable.appendChild(row);
    });

    completedTasks.forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td>${task.completedAt}</td>
      <td><button onclick="deleteTask(completedTasks, ${index})">Delete</button></td>
    `;
        completedListTable.appendChild(row);
    });

    tasks.filter((task) => !task.completed).forEach((task, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${task.title}</td>
      <td>${task.description}</td>
      <td><button onclick="deleteTask(tasks, ${index})">Delete</button></td>
    `;
        pendingListTable.appendChild(row);
    });
}

updateTables();

