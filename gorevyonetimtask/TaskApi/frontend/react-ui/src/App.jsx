import { useEffect, useState } from "react";
import TaskForm from "./Components/TaskForm";
import TaskList from "./Components/TaskList";
import Filter from "./Components/Filter";

const apiUrl = "https://localhost:7090/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showCompleted, setShowCompleted] = useState(false);

  // Görevleri API'den Çekme Fonksiyonu
 // Tüm görevleri çekerken veriyi formatla
 const fetchTasks = () => {
  fetch("/api/tasks")
    .then(res => res.json())
    .then(data => {
      // Backend'den gelen Id'yi camelCase'e çevir
      const formattedTasks = data.map(task => ({
        id: task.id || task.Id, //  Hem camelCase hem PascalCase destekle
        title: task.title || task.Title,
        description: task.description || task.Description,
        isCompleted: task.isCompleted || task.IsCompleted
      }));
      setTasks(formattedTasks);
    });
};

  // Sayfa Açıldığında Görevleri Yükle
  useEffect(() => {
    fetchTasks();
  }, []);

  // Yeni Görev Ekleme
 // App.jsx - DÜZELTİLMİŞ addTask
 const addTask = (task) => {
  fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  })
  .then(response => {
    if (!response.ok) throw new Error("HTTP error!");
    return response.json();
  })
  .then(addedTask => {
    // API'den gelen ID ve tarihi kullan
    setTasks(prev => [...prev, {
      ...addedTask,
      id: addedTask.id, // Backend'den gelen ID
      createdAt: addedTask.createdAt
    }]);
  })
  .catch(error => console.error("Hata:", error));
};

  // Görevi Tamamlama
  const completeTask = (id) => {
    const taskToUpdate = tasks.find(t => t.id === id);
    if (!taskToUpdate) return;
  
    fetch(`/api/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...taskToUpdate, isCompleted: true }) //  Tüm alanları gönder
    })
    .then(() => fetchTasks())
    .catch(error => console.error("Hata:", error));
  };
  // Görevi Silme
  const deleteTask = (id) => {
    fetch(`/api/tasks/${id}`, { //  id değişkeni endpoint'te
      method: "DELETE"
    })
    .then(() => fetchTasks())
    .catch(error => console.error("Hata:", error));
  };

  return (
    <div>
      <h1>Görev Yönetim Uygulaması</h1>
      <p>Tamamlama Oranı: %{Math.round((tasks.filter(t => t.isCompleted).length / tasks.length) * 100 || 0)}</p>
      <TaskForm addTask={addTask} />
      <Filter showCompleted={showCompleted} setShowCompleted={setShowCompleted} />
      <TaskList 
        tasks={tasks.filter(t => showCompleted || !t.isCompleted)}
        completeTask={completeTask} 
        deleteTask={deleteTask} 
      />
    </div>
  );
}

export default App;