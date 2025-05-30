using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using TaskApi.Models;
using TaskApi.Repositories;

namespace TaskApi.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly TaskRepository _taskRepository;

        public TaskController(TaskRepository taskRepository)
        {
            _taskRepository = taskRepository;
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            var tasks = _taskRepository.GetAllTasks();
            return Ok(tasks);
        }
        
    [HttpGet("{id}")]
    public IActionResult GetTaskById(int id)
    {
    var task = _taskRepository.GetTaskById(id);
    if (task == null)
        return NotFound();
    return Ok(task);
    }


        [HttpPost]
        public IActionResult AddTask([FromBody]TaskModel task)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _taskRepository.AddTask(task);

            /*return Ok(new {id = task.Id,
            title = task.Title,
            description = task.Description,
            createdAt = task.CreatedAt,
            isCompleted = task.IsCompleted}); */
            return Ok(task);    
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id,[FromBody] TaskModel task)
        {
            
             if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            task.Id = id;

            _taskRepository.UpdateTask(id,task);
            return Ok(task);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            _taskRepository.DeleteTask(id);
            return Ok();
        }


    }
}