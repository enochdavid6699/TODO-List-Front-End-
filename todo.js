//Tasks Array
let tasks = [];

//List of all the tasks
const tasksList = document.getElementById('list');

//Input 
const addTaskInput = document.getElementById('add');

//Task Counter
const tasksCounter = document.getElementById('tasks-counter');

//This functions adds an li to the tasks list
function addTasksToDOM(task) {
    const li = document.createElement('li');

    li.innerHTML = `
        <input type="checkbox" id="${task.id}" ${task.completed ? 'checked' : ''} class="custom-checkbox">
        <label for="${task.id}">${task.title}</label>
        <img src="https://img.icons8.com/plumpy/24/null/delete--v1.png" class="delete" data-id="${task.id}" />
    `;

    tasksList.append(li);
}

//This function Renders the list after any action performed
function renderList () {
    tasksList.innerHTML='';

    for(let i=0;i<tasks.length;i++){
        addTasksToDOM(tasks[i]);
    }

    tasksCounter.innerHTML=tasks.length;
}

//Toggle Task
function toggleTask (taskId) {
    const task=tasks.filter( function(task){
        return task.id == taskId;
    });
    if(task.length>0){
        currentTask = task[0];
        currentTask.completed=!currentTask.completed;
        renderList();
        return;
    }

    showNotification('Could not toggle the Task');
}

//Delete a Task
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

//Add a Task
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList();
        return;
    }
    showNotification('Task cannot be Added');
}

//To Show Notification
function showNotification(title) {
    alert(title);
} 

//Button Press
function handleClickListener (e) {
    const target=e.target;
    
    if(target.className=='add'){
        const title = addTaskInput.value;

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
    
        addTaskInput.value=''; //This will just clear the input bar the moment the user presses enter
        addTask(task);

    }else if(target.className=='custom-checkbox'){

        const taskId=target.id;
        toggleTask(taskId);
        return;

    }else if(target.className=='delete'){

        const taskId=target.dataset.id;
        deleteTask(taskId);
        return;

    }
}

//For Enter Key Press
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

//Initializing the app
function initializeApp(){
    document.addEventListener('click', handleClickListener);
    addTaskInput.addEventListener('keyup', handleInputKeyPress);
}

initializeApp();