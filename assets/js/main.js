let start = document.getElementById('start');
let stop = document.getElementById('stop');
let reset = document.getElementById('reset');

let wm = document.getElementById('w_minutes');
let ws = document.getElementById('w_seconds');

let bm = document.getElementById('b_minutes');
let bs = document.getElementById('b_seconds');

let form = document.querySelector(".form");
let todoList = document.querySelector(".todo-list");

let lineDesc = document.querySelector(".line-desc");
let lineWidth = 0;

//store a reference to a timer letiable
let startTimer;

start.addEventListener('click', function(){
    if(startTimer === undefined){
        startTimer = setInterval(timer, 1000)
    } else {
        alert("Timer is already running");
    }
})

reset.addEventListener('click', function(){
    wm.innerText = 25;
    ws.innerText = "00";

    bm.innerText = 5;
    bs.innerText = "00";

    document.getElementById('counter').innerText = 0;
    stopInterval()
    startTimer = undefined;
})

stop.addEventListener('click', function(){
    stopInterval()
    startTimer = undefined;
})


//Start Timer Function
function timer(){
    //Work Timer Countdown
    if(ws.innerText != 0){
        ws.innerText--;
        lineWidth++
        lineDesc.style.width = `${lineWidth}px`;
    } else if(wm.innerText != 0 && ws.innerText == 0){
        ws.innerText = 59;
        wm.innerText--;
       
    }

    //Break Timer Countdown
    if(wm.innerText == 0 && ws.innerText == 0){
        if(bs.innerText != 0){
            bs.innerText--;
        } else if(bm.innerText != 0 && bs.innerText == 0){
            bs.innerText = 59;
            bm.innerText--;
        }
    }

    //Increment Counter by one if one full cycle is completed
    if(wm.innerText == 0 && ws.innerText == 0 && bm.innerText == 0 && bs.innerText == 0){
        wm.innerText = 25;
        ws.innerText = "00";

        bm.innerText = 5;
        bs.innerText = "00";
        

        document.getElementById('counter').innerText++;
    }
}

//Stop Timer Function
function stopInterval(){
    clearInterval(startTimer);
}


// todo


let database = [
    ...(JSON.parse(localStorage.getItem("database"))
      ? JSON.parse(localStorage.getItem("database"))
      : ""),
  ];
  
  function saveLocalStorage(database) {
    return localStorage.setItem("database", JSON.stringify(database));
  }
  

  
  // create to do
  function CreateToDo(name, todoType) {
    return {
      name,
      todoType,
      id: Math.floor(Math.random() * 1000000),
    };
  }
  
  function displayTodos(todos) {
    let html = "";
    todos.forEach((todo) => {
      html += `
          <li class="todo-item">
          <span class="todo-name">${todo.name}</span>
          <span class="todo-type">${todo.todoType}</span>
          <div id='${todo.id}'>
            <button onclick="EditTodo(this)">edit</button>
            <button onclick='DeleteTodo(this)'>delete</button>
          </div>
        </li>`;
    });
    todoList.innerHTML = html;
    
  }
  
  form.addEventListener("submit", (e) => {
    e.preventDefault();
  
    let newTodo = new CreateToDo(form.formInput.value, form.todoSelect.value);
    database.push(newTodo);
    form.formInput.value = "";
    saveLocalStorage(database);
    displayTodos(database);
  });
  
  // Edit
  function EditTodo(e) {
    let id = e.parentElement.id;
    let editPrompt = prompt("Tahrirlash");
    let foundTodo = database.filter((value) => {
      return value.id == id;
    });
    if (editPrompt == "") {
      foundTodo[0].name = foundTodo[0].name;
    } else {
      foundTodo[0].name = editPrompt;
    }
    saveLocalStorage(database);
    displayTodos(database);
  }
  
  // Delete
  function DeleteTodo(e) {
    let id = e.parentElement.id;
    let filteredArr = database.filter((value) => value.id != id);
    database = filteredArr;
    saveLocalStorage(database);
    displayTodos(database);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    displayTodos(database);
  });