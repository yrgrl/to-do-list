
const taskInput = document.getElementById('new-task');
const dueDateInput = document.getElementById('due-date');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterCompletedButton = document.getElementById('filter-completed');
const filterIncompleteButton = document.getElementById('filter-incomplete');
const remainingTasksElement = document.getElementById('remaining-tasks');

let tasks = [];

function addTask(task, dueDate) {
    tasks.push({
        description: task,
        dueDate: dueDate,
        completed: false
    });
    renderTaskList();
}

function renderTaskList() {
    taskList.innerHTML = '';
    tasks.forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = `${task.description} (Due: ${task.dueDate.toLocaleDateString()})`;
        taskElement.addEventListener('click', () => {
            task.completed = !task.completed;
            renderTaskList();
        });
        if (task.completed) {
            taskElement.classList.add('completed');
        } else {
            taskElement.classList.remove('completed');
        }
        taskList.appendChild(taskElement);
    });
    updateRemainingTasks();
}

function updateRemainingTasks() {
    const remainingTasks = tasks.filter((task) => !task.completed).length;
    remainingTasksElement.textContent = `Remaining tasks: ${remainingTasks}`;
}

// Function to filter tasks by completed status
function filterTasks(completed) {
    taskList.innerHTML = '';
    tasks.filter((task) => task.completed === completed).forEach((task) => {
        const taskElement = document.createElement('li');
        taskElement.textContent = `${task.description} (Due: ${task.dueDate.toLocaleDateString()})`;
        taskList.appendChild(taskElement);
    });
}

// Event listeners
addTaskButton.addEventListener('click', () => {
    const task = taskInput.value.trim();
    const dueDate = dueDateInput.valueAsDate;
    if (task && dueDate) {
        addTask(task, dueDate);
        taskInput.value = '';
        dueDateInput.value = '';
    }
});

filterCompletedButton.addEventListener('click', () => {
    filterTasks(true);
});

filterIncompleteButton.addEventListener('click', () => {
    filterTasks(false);
});

// Initialize the task list
renderTaskList();