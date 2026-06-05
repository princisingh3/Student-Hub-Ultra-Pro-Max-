// =====================
// DARK MODE
// =====================

const darkModeBtn = document.getElementById("darkModeBtn");

if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark-mode");
}

darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});


// =====================
// NOTES PAD
// =====================

function saveNotes() {
    const notes = document.getElementById("notesBox").value;
    localStorage.setItem("student_notes", notes);
    alert("Notes Saved Successfully!");
}

function loadNotes() {
    document.getElementById("notesBox").value =
        localStorage.getItem("student_notes") || "";
}

window.onload = function () {
    loadNotes();
    loadTasks();
    loadGoal();
};


// =====================
// TODO MANAGER
// =====================

function addTask() {

    const taskInput = document.getElementById("taskInput");
    const task = taskInput.value.trim();

    if (task === "") {
        alert("Enter a task!");
        return;
    }

    const li = document.createElement("li");

    li.innerHTML = `
        ${task}
        <button onclick="deleteTask(this)">❌</button>
    `;

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";

    saveTasks();
}

function deleteTask(btn) {
    btn.parentElement.remove();
    saveTasks();
}

function saveTasks() {
    localStorage.setItem(
        "student_tasks",
        document.getElementById("taskList").innerHTML
    );
}

function loadTasks() {
    document.getElementById("taskList").innerHTML =
        localStorage.getItem("student_tasks") || "";
}


// =====================
// ATTENDANCE
// =====================

function calculateAttendance() {

    const attended =
        parseFloat(document.getElementById("attended").value);

    const total =
        parseFloat(document.getElementById("total").value);

    if (!attended || !total) {
        alert("Enter valid values");
        return;
    }

    const percentage =
        ((attended / total) * 100).toFixed(2);

    document.getElementById("attendanceResult").innerHTML =
        `Attendance: ${percentage}%`;
}


// =====================
// CGPA CALCULATOR
// =====================

function calculateCGPA() {

    const percentage =
        parseFloat(document.getElementById("cgpaInput").value);

    if (!percentage) {
        alert("Enter percentage");
        return;
    }

    const cgpa = (percentage / 9.5).toFixed(2);

    document.getElementById("cgpaResult").innerHTML =
        `CGPA: ${cgpa}`;
}


// =====================
// POMODORO TIMER
// =====================

let time = 1500;
let timer;

function startTimer() {

    clearInterval(timer);

    timer = setInterval(() => {

        let minutes = Math.floor(time / 60);
        let seconds = time % 60;

        document.getElementById("timer").textContent =
            String(minutes).padStart(2, "0") +
            ":" +
            String(seconds).padStart(2, "0");

        time--;

        if (time < 0) {

            clearInterval(timer);

            alert("🎉 Pomodoro Session Complete!");

            time = 1500;

            document.getElementById("timer").textContent = "25:00";
        }

    }, 1000);
}


// =====================
// EXAM COUNTDOWN
// =====================

function countdown() {

    const examDate =
        document.getElementById("examDate").value;

    if (!examDate) {
        alert("Select Exam Date");
        return;
    }

    const exam = new Date(examDate);
    const today = new Date();

    const diff = exam - today;

    const days =
        Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) {
        document.getElementById("result").innerHTML =
            "Exam Date Passed!";
    } else {
        document.getElementById("result").innerHTML =
            `📅 ${days} Days Remaining`;
    }
}


// =====================
// STUDY PLANNER
// =====================

function saveGoal() {

    const goal =
        document.getElementById("goalInput").value;

    localStorage.setItem("study_goal", goal);

    document.getElementById("goalResult").innerHTML =
        "✅ Goal Saved";
}

function loadGoal() {

    const goal =
        localStorage.getItem("study_goal") || "";

    document.getElementById("goalInput").value = goal;
}
