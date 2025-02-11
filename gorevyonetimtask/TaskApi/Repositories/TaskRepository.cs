using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using TaskApi.Models;
using TaskApi.Data;

namespace TaskApi.Repositories
{
    public class TaskRepository
    {
        private readonly DatabaseHelper _dbHelper;

        public TaskRepository(DatabaseHelper dbHelper)
        {
            _dbHelper = dbHelper;
        }

        //tüm görevleri getireceğiz
        public List<TaskModel> GetAllTasks()
        {
            List<TaskModel> tasks = new List<TaskModel>();

            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                using (var command = new SqlCommand("SELECT Id, Title, Description, CreatedAt, IsCompleted FROM Tasks", connection))
                using (var reader = command.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        tasks.Add(new TaskModel
                        {
                            Id = reader.GetInt32(0),
                            Title = reader.GetString(1),
                            Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                            CreatedAt = reader.GetDateTime(3),
                            IsCompleted = reader.GetBoolean(4),
                          
                        });
                    }
                }
            }
            return tasks;
        }
public TaskModel GetTaskById(int id)
{
    using (var connection = _dbHelper.GetConnection())
    {
        connection.Open();
        using (var command = new SqlCommand("SELECT Id, Title, Description, CreatedAt, IsCompleted FROM Tasks WHERE Id = @Id", connection))
        {
            command.Parameters.AddWithValue("@Id", id);
            using (var reader = command.ExecuteReader())
            {
                if (reader.Read())
                {
                    return new TaskModel
                    {
                        Id = reader.GetInt32(0),
                        Title = reader.GetString(1),
                        Description = reader.IsDBNull(2) ? null : reader.GetString(2),
                        CreatedAt = reader.GetDateTime(3),
                        IsCompleted = reader.GetBoolean(4)
                    };
                }
            }
        }
    }
    return null;
}
        //görev ekleyeceğiz
        public void AddTask(TaskModel task)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                using (var command = new SqlCommand("INSERT INTO Tasks(Title,Description,CreatedAt,IsCompleted) VALUES (@Title,@Description,@CreatedAt,@IsCompleted)", connection))
                {
                    command.Parameters.AddWithValue("@Title", task.Title);
                    command.Parameters.AddWithValue("@Description", task.Description ?? (object)DBNull.Value);
                    command.Parameters.AddWithValue("@CreatedAt", DateTime.Now);
                    command.Parameters.AddWithValue("@IsCompleted", task.IsCompleted);

                    command.ExecuteNonQuery();
                }
            }
        }

        //görev güncelleyeceğiz
        public void UpdateTask(int id,TaskModel task)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                using (var command = new SqlCommand("UPDATE Tasks SET IsCompleted=@IsCompleted WHERE Id=@Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    command.Parameters.AddWithValue("@IsCompleted", task.IsCompleted);


                    command.ExecuteNonQuery();
                }

            }
        }

        //görev sileceğiz
        public void DeleteTask(int id)
        {
            using (var connection = _dbHelper.GetConnection())
            {
                connection.Open();
                using (var command = new SqlCommand("DELETE FROM Tasks WHERE Id=@Id", connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    command.ExecuteNonQuery();
                }
            }



        }
    }
}