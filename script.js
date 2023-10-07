const openModalBtn = document.querySelector(".add-task-btn");
const modal = document.querySelector(".modal");
const closeModal = document.querySelector(".close");

const form = document.getElementById("add-task-form");
const myBtn = document.querySelector("#add-task-btn");

const in_progress_arr =[];
const not_started_arr = [];
const completed_arr = [];

openModalBtn.addEventListener("click", modalView);

closeModal.addEventListener("click", modalHide);

function modalView(){
  modal.style.display = "block";
}

function modalHide(){
  modal.style.display = "none";
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if(myBtn.innerText!="Edit Task"){
  formValidationCheck();
  }
});

// if error happens then remove it
function formValidationCheck(){
  const taskName = document.getElementById("task-name").value;
  const priority = document.getElementById("priority").value;
  const dueDate = document.getElementById("due-date").value;
  const status = document.getElementById("status").value;

  if(taskName==''|| !dueDate){
    alert("please fill all fields");
  }
  else{  
    addTask(taskName, priority, dueDate, status);

    //if(myBtn.innerText!="Edit Task"){
      // addTask(taskName, priority, dueDate, status);
      modal.style.display = "none";
      taskView();
      document.getElementById("add-task-form").reset();
    //}
  }
}

function addTask(taskName, priority, dueDate, status){
  if(status=='not-started'){
    not_started_arr.push({
        taskName:taskName,
        priority:priority,
        dueDate:dueDate,
        status:status
    })
  }
  else if(status=='in-progress'){
    in_progress_arr.push({
        taskName:taskName,
        priority:priority,
        dueDate:dueDate,
        status:status
    })
  }
  else {
    completed_arr.push({
        taskName:taskName,
        priority:priority,
        dueDate:dueDate,
        status:status
    })
  }
}

function taskView(){
  var notStarted = document.getElementById('not-started');
    var inProgress = document.getElementById('in-progress');
    var completed = document.getElementById('completed');

    notStarted.innerHTML='';
    inProgress.innerHTML='';
    completed.innerHTML='';


    not_started_arr.forEach((task,index)=>{
        notStarted.innerHTML+=
                         `
                         <li>
                           <p style='margin-right:2px'>${task.taskName}</p>
                           <p style="${priorityStyle(task.priority)} margin-right:2px">${task.priority}</p>
                           <p style='margin-right:2px'>${task.dueDate}</p>
                           <p style="${statusStyle(task.status)} margin-right:2px">${task.status}</p>
                           <p style="cursor:pointer" onClick="del(${index},'${task.status}')">x</p> 
                         </li>
                         `;
    })
    in_progress_arr.forEach((task,index)=>{
        inProgress.innerHTML+=
                         `
                       <li>
                         <p style='margin-right:2px'>${task.taskName}</p>
                         <p style="${priorityStyle(task.priority)} margin-right:2px">${task.priority}</p>
                         <p style='margin-right:2px'>${task.dueDate}</p>
                         <p style="${statusStyle(task.status)} margin-right:2px">${task.status}</p>
                         <p style="cursor:pointer" onClick="del(${index},'${task.status}')">x</p> 
                       </li>
                         `;
    })
    completed_arr.forEach((task,index)=>{
       
        completed.innerHTML+=
                         `
                         <li>
                           <p style='margin-right:2px'>${task.taskName}</p>
                           <p style="${priorityStyle(task.priority)} margin-right:2px">${task.priority}</p>
                           <p style='margin-right:2px'>${task.dueDate}</p>
                           <p style="${statusStyle(task.status)} margin-right:2px">${task.status}</p>
                           <p style="cursor:pointer" onClick="del(${index},'${task.status}')">x</p> 
                         </li>
                         `;
    })
}

function statusStyle(status){
  // console.log(status)
  if(status=='not-started'){
    return "background-color:rgb(206, 40, 11);";
}
else if(status=='in-progress'){
    return "background-color:tomato;";
}
else{
    return "background-color:rgb(6, 151, 28);";
}
}

function priorityStyle(priority){
  // console.log(priority);
  if(priority=='low'){
      return "background-color:rgb(6, 151, 28);";
  }
  else if(priority=='medium'){
      return "background-color:tomato;";
  }
  else{
      return "background-color:rgb(206, 40, 11);";
  }
}

function del(index,status){
  // console.log('id---'+index+ ' statis----'+status)
  if(status=='not-started'){
      not_started_arr.splice(index,1);
  }
  else if(status=='in-progress'){
      in_progress_arr.splice(index,1);
  }
  else{
      completed_arr.splice(index,1);
  }
  taskView();
}

// function edit(index,status){
//    myBtn.innerText = "Edit Task";

//    const taskName = document.getElementById("task-name")
//    const priority = document.getElementById("priority")
//    const dueDate = document.getElementById("due-date")
//    const taskStatus = document.getElementById("status")

//    let task;

//    if(status=='in-progress')
//       task = in_progress_arr[index];
//    else if(status=='not-started')
//       task = not_started_arr[index];
//    else
//       task = completed_arr[index]; 

//       taskName.value = `${task.taskName}`;
//       priority.value = `${task.priority}`;
//       dueDate.value = `${task.dueDate}`;
//       taskStatus.value = `${task.status}`;

//       modalView();
      
//       form.addEventListener("submit", (event) => {
//         event.preventDefault();
//          formValidationCheck();

//         if(status=="in-progress")
//           in_progress_arr.splice(index,1);
//         else if(status=="not-started")
//           not_started_arr.splice(index,1);
//         else
//           completed_arr.splice(index,1);

//         modalHide();
//         taskView();
//         document.getElementById("add-task-form").reset();
//         myBtn.innerText = "Add Task";
//       }) 
// }