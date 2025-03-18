// Get references to the HTML elements
const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

// Function to create a new task
function createTask(taskText) {
    const li = document.createElement('li');

    // Create a span for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    li.appendChild(taskSpan);

    // Create a "Complete" button
    const completeButton = document.createElement('button');
    completeButton.textContent = 'Complete';
    completeButton.addEventListener('click', function () {
        li.classList.toggle('completed');
    });
    li.appendChild(completeButton);

    // Create a "Delete" button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', function () {
        li.remove();
    });
    li.appendChild(deleteButton);

    // Append the new task to the task list
    taskList.appendChild(li);
}

// Function to handle adding a task
addTaskButton.addEventListener('click', function () {
    const taskText = taskInput.value.trim();
    
    if (taskText) {
        createTask(taskText); // Create the task
        taskInput.value = ''; // Clear the input field
    }
});

// Allow the user to press Enter to add a task
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTaskButton.click();
    }
});
