// 🔗 Backend API URL
const API_URL = "http://localhost:8080/tasks";

// ✏️ Track editing task
let editingTaskId = null;

/* =========================
   ➕ ADD or ✏️ UPDATE TASK
========================= */
function addTask() {
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
    const type = document.getElementById("taskType").value;
    const progressInput = document.getElementById("progress");
    const isDaily = document.getElementById("dailyTask").checked;

    if (!title || !description || !type) {
        alert("Fill all fields and select task type");
        return;
    }

    let progress = 0;
    if (type === "PROGRESS") {
        progress = Math.max(0, Math.min(Number(progressInput.value) || 0, 100));
    }

    const task = {
        title,
        description,
        type,
        progress,
        daily: isDaily
    };

    const url = editingTaskId ? `${API_URL}/${editingTaskId}` : API_URL;
    const method = editingTaskId ? "PUT" : "POST";

    fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(task)
    }).then(() => {
        clearInputs();
        loadTasks();
    });
}

/* =========================
   📥 LOAD TASKS
========================= */
function loadTasks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(tasks => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            if (tasks.length === 0) {
                taskList.innerHTML = `<li style="opacity:0.6;">No tasks yet 👆</li>`;
                return;
            }

            tasks.forEach(task => {
                const li = document.createElement("li");

                li.innerHTML = `
                    <input type="checkbox" ${task.completed ? "checked" : ""} />

                    <span class="${task.completed ? "completed-task" : ""}">
                        <b>${task.title}</b> - ${task.description}

                        <small class="task-type">
                            ${task.daily ? "Daily" : "One-time"} •
                            ${task.type === "PROGRESS" ? "Progress Task" : "Simple Task"}
                        </small>

                        ${task.daily ? `
                            <small class="streak">🔥 ${task.streak} day streak</small>
                        ` : ""}

                        ${task.type === "PROGRESS" ? `
                            <small>Progress: ${task.progress}%</small>
                            <div class="progress-bar">
                                <div class="progress-fill" style="width:${task.progress}%"></div>
                            </div>
                        ` : ""}
                    </span>

                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                `;

                // ✅ CHECKBOX — NO FLICKER (change event only)
                li.querySelector("input").addEventListener("change", () => {
                    toggleCompleted(task.id);
                });

                // ✏️ Edit
                li.querySelector(".edit-btn").addEventListener("click", () => {
                    editTask(task);
                });

                // 🗑️ Delete
                li.querySelector(".delete-btn").addEventListener("click", () => {
                    deleteTask(task.id);
                });

                taskList.appendChild(li);
            });
        });
}

/* =========================
   ✅ TOGGLE COMPLETED
   (Backend decides everything)
========================= */
function toggleCompleted(taskId) {
    fetch(`${API_URL}/${taskId}/toggle`, {
        method: "POST"
    }).then(loadTasks);
}

/* =========================
   ✏️ EDIT TASK
========================= */
function editTask(task) {
    document.getElementById("title").value = task.title;
    document.getElementById("description").value = task.description;
    document.getElementById("taskType").value = task.type;
    document.getElementById("dailyTask").checked = task.daily;

    const progressWrapper = document.getElementById("progressWrapper");
    const progressInput = document.getElementById("progress");

    if (task.type === "PROGRESS") {
        progressWrapper.classList.add("show");
        progressInput.value = task.progress;
        progressInput.disabled = false;
    } else {
        progressWrapper.classList.remove("show");
        progressInput.value = "";
        progressInput.disabled = true;
    }

    editingTaskId = task.id;
    document.querySelector(".task-form button").textContent = "Update Task";
    updateButtonState();
}

/* =========================
   🗑️ DELETE TASK
========================= */
function deleteTask(id) {
    if (!confirm("Delete this task?")) return;
    fetch(`${API_URL}/${id}`, { method: "DELETE" }).then(loadTasks);
}

/* =========================
   🧹 CLEAR INPUTS
========================= */
function clearInputs() {
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    document.getElementById("taskType").value = "";
    document.getElementById("progress").value = "";
    document.getElementById("dailyTask").checked = false;

    document.getElementById("progressWrapper").classList.remove("show");
    document.querySelector(".task-form button").textContent = "Add Task";

    editingTaskId = null;
    updateButtonState();
}

/* =========================
   🔘 BUTTON STATE
========================= */
function updateButtonState() {
    const title = document.getElementById("title").value.trim();
    const desc = document.getElementById("description").value.trim();
    const type = document.getElementById("taskType").value;

    document.querySelector(".task-form button").disabled = !(title && desc && type);
}

/* =========================
   🔄 TASK TYPE CHANGE
========================= */
document.getElementById("taskType").addEventListener("change", function () {
    const progressWrapper = document.getElementById("progressWrapper");
    const progressInput = document.getElementById("progress");

    if (this.value === "PROGRESS") {
        progressWrapper.classList.add("show");
        progressInput.disabled = false;
    } else {
        progressWrapper.classList.remove("show");
        progressInput.value = "";
        progressInput.disabled = true;
    }

    updateButtonState();
});

/* =========================
   🚀 INITIAL LOAD
========================= */
document.addEventListener("DOMContentLoaded", () => {
    loadTasks();
    updateButtonState();

    document.getElementById("title").addEventListener("input", updateButtonState);
    document.getElementById("description").addEventListener("input", updateButtonState);
});
