const apiUrl = "https://localhost:7090/api/tasks";

// Yeni: Tamamlama yüzdesini hesaplayan fonksiyon
function updateCompletionRate(tasks) {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter(task => task.isCompleted).length;
    const completionRate = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);
    document.getElementById("completionRate").textContent = `%${completionRate}`;
}

// Görevleri yüklerken yüzdeyi de güncelle
function loadTasks() {
    const showCompleted = document.getElementById("filterCompleted").checked;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            // Yeni: Tamamlama yüzdesini güncelle
            updateCompletionRate(data);

            data.filter(task => showCompleted || !task.isCompleted)
                .forEach(task => {
                    const taskDiv = document.createElement("div");
                    taskDiv.className = "task";
                    taskDiv.innerHTML = `
                        <span>${task.title} - ${task.description} - ${task.isCompleted ? " Tamamlandı" : "Tamamlanmadı"}</span>
                        ${!task.isCompleted ? `<button onclick="completeTask(${task.id})">Tamamla</button>` : ""}
                        <button onclick="deleteTask(${task.id})">Sil</button>
                    `;
                    taskList.appendChild(taskDiv);
                });
        });
}
// Yeni görev ekleme
document.getElementById("taskForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let taskTitle = document.getElementById("taskTitle").value;
    let taskDescription = document.getElementById("taskDescription").value;

    fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle, description: taskDescription, isCompleted: false })
    })
    .then(() => {
        loadTasks();
        document.getElementById("taskForm").reset();
    });
});

// Görevi tamamla
function completeTask(id) {
    fetch(`${apiUrl}/${id}`)
        .then(response => {
            if (!response.ok) throw new Error(`GET hatası: ${response.status} - ${response.statusText}`);
            return response.json();
        })
        .then(task => {
            task.isCompleted = true;
            return fetch(`${apiUrl}/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            });
        })
        .then(response => {
            // Boş cevap kontrolü
            if (response.status === 204) return {};
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return response.json();
            } else {
                return {};
            }
        })
        .then(() => loadTasks()) // Hemen yükle
        .catch(error => console.error("Hata oluştu:", error));
}
// Görevi sil
function deleteTask(id) {
    fetch(`${apiUrl}/${id}`, { method: "DELETE" })
        .then(() => loadTasks());
}

// Filtreleme event'i düzeltildi (gereksiz kod kaldırıldı)
document.getElementById("filterCompleted").addEventListener("change", loadTasks);



// Tamamlanan görevleri filtreleme
/* document.getElementById("filterCompleted").addEventListener("change", function() {
    loadTasks();
    let showCompleted = this.checked;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            let taskList = document.getElementById("taskList");
            taskList.innerHTML = "";

            data.filter(task => !showCompleted || task.isCompleted).forEach(task => {
                let taskDiv = document.createElement("div");
                taskDiv.className = "task";
                taskDiv.innerHTML = `
                    <span>${task.title} - ${task.description} - ${task.isCompleted ? "Tamamlandı" : "Tamamlanmadı"}</span>
                    <button onclick="completeTask(${task.id})">Tamamla</button>
                    <button onclick="deleteTask(${task.id})">Sil</button>
                `;
                taskList.appendChild(taskDiv);
            });
        });
}); */