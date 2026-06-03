// Task Manager

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

function addTask() {
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        ${task}
        <span class="delete" onclick="deleteTask(this)">X</span>
    `;

    taskList.appendChild(li);

    saveTasks();

    taskInput.value = "";
}

function deleteTask(element) {
    element.parentElement.remove();
    saveTasks();
}

// Save Tasks

function saveTasks() {
    localStorage.setItem("tasks", taskList.innerHTML);
}

function loadTasks() {
    taskList.innerHTML = localStorage.getItem("tasks") || "";
}

loadTasks();


// Pomodoro Timer

let time = 1500;
let timerRunning = false;
let interval;

function startTimer() {

    if (timerRunning) return;

    timerRunning = true;

    interval = setInterval(() => {

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        time--;

        if (time < 0) {
            clearInterval(interval);

            alert("🎉 Pomodoro Session Completed!");

            timerRunning = false;
            time = 1500;

            document.getElementById("timer").textContent = "25:00";
        }

    }, 1000);
}


// Exam Countdown

function countdown() {

    const examDate = document.getElementById("examDate").value;

    if (!examDate) {
        alert("Please select an exam date!");
        return;
    }

    const exam = new Date(examDate);
    const today = new Date();

    const diff = exam - today;

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) {
        document.getElementById("result").innerHTML =
            "Exam date has already passed!";
    } else {
        document.getElementById("result").innerHTML =
            `📅 ${days} Days Remaining`;
    }
}
