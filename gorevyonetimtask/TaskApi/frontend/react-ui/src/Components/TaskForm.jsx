//görev ekleme formu 
import React, { useState } from 'react'


const TaskForm = ({ addTask }) => { //  Sadece addTask prop'u kullanılacak
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTask = { 
      title, 
      description, 
      isCompleted: false 
    };
    
    addTask(newTask); //  App.jsx'teki addTask fonksiyonunu çağır
    setTitle("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Görev Başlığı"
        value={title} 
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea 
        placeholder="Görev Açıklaması" 
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Görev Ekle</button>
    </form>
  );
};

export default TaskForm;