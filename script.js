// Dark Mode

const darkModeBtn = document.getElementById("darkModeBtn");

if(darkModeBtn){
  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem(
      "theme",
      document.body.classList.contains("dark-mode") ? "dark" : "light"
    );
  });
}

if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark-mode");
}

// Task Manager

function addTask() {
  const input = document.getElementById("taskInput");
  const list = document.getElementById("taskList");

  if(!input || !list) return;

  if(input.value.trim() === "") return;

  const li = document.createElement("li");

  li.innerHTML =
    input.value +
    ` <button onclick="this.parentElement.remove();saveTasks()">❌</button>`;

  list.appendChild(li);

  saveTasks();
  input.value = "";
}

function saveTasks(){
  const list = document.getElementById("taskList");
  if(list){
    localStorage.setItem("tasks", list.innerHTML);
  }
}

function loadTasks(){
  const list = document.getElementById("taskList");
  if(list){
    list.innerHTML = localStorage.getItem("tasks") || "";
  }
}

loadTasks();

// Attendance Calculator

function calculateAttendance(){
  let attended = parseInt(document.getElementById("attended").value);
  let total = parseInt(document.getElementById("total").value);

  if(!attended || !total){
    alert("Enter values");
    return;
  }

  let percentage = ((attended / total) * 100).toFixed(2);

  document.getElementById("attendanceResult").innerHTML =
    "Attendance: " + percentage + "%";
}

// CGPA Calculator

function calculateCGPA(){
  let marks = document.getElementById("cgpaInput").value;

  if(!marks) return;

  let cgpa = (marks / 9.5).toFixed(2);

  document.getElementById("cgpaResult").innerHTML =
    "CGPA: " + cgpa;
}

// Pomodoro Timer

let time = 1500;
let timer;

function startTimer(){

  clearInterval(timer);

  timer = setInterval(() => {

    let min = Math.floor(time / 60);
    let sec = time % 60;

    document.getElementById("timer").innerHTML =
      String(min).padStart(2,"0") +
      ":" +
      String(sec).padStart(2,"0");

    time--;

    if(time < 0){
      clearInterval(timer);
      alert("Session Complete!");
      time = 1500;
    }

  },1000);
}

// Exam Countdown

function countdown(){

  let examDate =
    document.getElementById("examDate").value;

  if(!examDate) return;

  let exam = new Date(examDate);
  let today = new Date();

  let diff = exam - today;

  let days =
    Math.ceil(diff / (1000*60*60*24));

  document.getElementById("result").innerHTML =
    days + " Days Remaining";
}

// Feature Button

function showFeature(name){
  alert("Opening " + name);
}
