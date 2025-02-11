using System;
using System.ComponentModel.DataAnnotations;

namespace TaskApi.Models
{
    public class TaskModel
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Title { get; set; }

        [MaxLength(1000)]
        public string Description { get; set; }

        public DateTime CreatedAt { get; set; }
        
        public bool IsCompleted { get; set; } = false;

    
    }
}
//bu sınıf taskrepository içinde kullandığımız veri modelimizdir.