using TaskApi.Data;
using TaskApi.Repositories;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddSingleton<TaskRepository>(); //taskrepository bağımlılık olarak eklendi.
builder.Services.AddSingleton<DatabaseHelper>(); //databasehelper bağımlılık olarak eklendi.

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


builder.Services.AddCors(options => {
    options.AddPolicy("AllowAll", policy => 
        policy.AllowAnyOrigin()
              .AllowAnyMethod() // ✅ PUT ve DELETE dahil
              .AllowAnyHeader());
});
var app = builder.Build();
app.UseCors("AllowAll");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.UseStaticFiles();

app.MapControllers();

app.Run();
