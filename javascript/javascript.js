let createBtn = document.getElementById("create-btn");
let projectName = document.querySelector('.project-name');
let tasksDiv = document.querySelector(".tasks-div");
let arr = [];

showElements();

if(window.localStorage.getItem('tasks')){
    arr = JSON.parse(localStorage.getItem('tasks'))
}

createBtn.onclick = function(){
    arr.push(projectName.value);
    projectName.value = "";
    window.localStorage.setItem("tasks",JSON.stringify(arr));
    createElements(arr)
}
function createElements(Arr){
    tasksDiv.innerHTML = "";
    Arr.forEach((task)=>{
        let taskDiv = document.createElement("div");
        let taskName = document.createElement("span");
        let deleteTask= document.createElement("button");

        taskName.textContent = task;
        deleteTask.textContent = "delete";

        taskDiv.setAttribute("data-name", taskName)
        deleteTask.setAttribute("class","delete")
        taskDiv.setAttribute("class", "taskDiv")

        taskDiv.appendChild(taskName);
        taskDiv.appendChild(deleteTask);
        tasksDiv.appendChild(taskDiv);
    })
}

function showElements(){
    let data = window.localStorage.getItem("tasks");
    if(data){
        let task = JSON.parse(data);
        createElements(task);
        
    }
}

let deleteBtns = document.querySelectorAll(".delete");
let taskDiv = document.querySelectorAll(".taskDiv");

deleteBtns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        btn.parentElement.remove();
        deleteElementFromLocalStorage()
    })
})

function deleteElementFromLocalStorage(){
    arr.forEach((task)=>{
        taskDiv.forEach((taskD)=>{
            if(task != taskD.getAttribute("data-name")){
                window.localStorage.setItem("tasks", JSON.stringify(arr));
            }
        })
    })
}