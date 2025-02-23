const TaskItem = ({ task, completeTask, deleteTask }) => {
return(
<div className="task">
<span>{task.title} - {task.description} - {task.isCompleted ? "Tamamlandı" : "Tamamlanmadı"}</span>
{!task.isCompleted && <button onClick={() => completeTask(task.id)}>Tamamla</button>}
<button onClick={() => deleteTask(task.id)}>Sil</button>
</div>

);
};

export default TaskItem;