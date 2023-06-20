let tasks = [];
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

function addTasksToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="https://img.icons8.com/plumpy/24/null/delete--v1.png" class="delete" data-id="${task.id}" />
    `;

    tasksList.append(li);
}

function renderList () {
    tasksList.innerHTML='';

    for(let i=0;i<tasks.length;i++){
        addTasksToDOM(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

function toggleTask (taskId) {
    const task=tasks.filter( function(task){
        return task.id == taskId;
    });
    if(task.length>0){
        currentTask = task[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        showNotification('Task toggled Successfully');
        return;
    }

    showNotification('Could not toggle the Task');
}

function deleteTask (taskId) {
    const newTasks=tasks.filter( function(task){
        return task.id != taskId;
    });
    //What filter does is take each element from the array tasks and filters it with the given condition and returns a new array;

    tasks=newTasks;
    renderList();
    showNotification('Task Deleted Successfully');
    return;
}

function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        showNotification('Task Added Successfully');
        return;
    }
    showNotification('Task cannot be Added');
}

function showNotification(title) {
    alert(title);
} 

function handleInputKeyPress (e) {
    if(e.key == 'Enter'){
       const title=e.target.value;

       if(!title){
        showNotification('Task text cannot be Empty');
        return;
       }

       const task= {//task is an object
           title: title,
           id: Date.now().toString(),// Date.now() will give as a time stamp i.e. the exact time at which it was createed and we can 
           //use it as id and the toString() will simply convert it into a string which will make the id to be a String
           completed: false
        }

        e.target.value=''; //This will just clear the input bar the moment the user presses enter
        addTask(task);
    }

}

function handleClickListener (e) {
    const target=e.target;
    
    if(target.className=='delete'){
        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;
    }else if(target.className=='custom-checkbox'){
        const taskId=target.id;
        toggleTask(taskId);
        return;
    }
}

function initializeApp(){
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
    document.addEventListener('click', handleClickListener);
}

initializeApp();