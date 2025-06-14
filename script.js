document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    loadTasks();

    function addTask(taskText, save = true) {

        if (taskText.trim() === '') {
            alert('Please enter a task.');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-btn';

        removeBtn.onClick = function () {
            taskList.removeChild(li);
            removeFromStorage(taskText);
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);

        if(save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = '';
    }
    //function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText =>  addTask(taskText, false)); //'false' input to local storage
    }

    //function to remove task from storage
    function removeFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    //function to add task when button is clicked
    function addTask() {
        const taskText = taskInput.value.trim();
        addTask(taskText);
    }
    
    addButton.addEventListener('click', addTask);

    //add task when enter key is pressed
    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

});