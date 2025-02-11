using Microsoft.Extensions.Configuration;
using System.Data.SqlClient;

namespace TaskApi.Data
{
    public class DatabaseHelper
    {
        //bu sınıf veritabanı bağlantısını appsetting.json dosyasından alır
        private readonly string _connectionString;

        public DatabaseHelper(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("DefaultConnection");
        }

        public SqlConnection GetConnection()
        {
            return new SqlConnection(_connectionString);
        }
        //GetConnection mssql'e bağlanmak için SqlConnection nesnesi döndürüyor
    }
}