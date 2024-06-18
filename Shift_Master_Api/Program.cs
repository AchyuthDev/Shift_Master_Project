using Shift_Master_Api.DataContextDb;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Shift_Master_Api.Repostry;
using Shift_Master_Api.ConcreteClasses;
using Microsoft.AspNetCore.OData;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddDbContext<ApplicationDbContext>
    (options =>
    { 
        options.UseSqlServer(builder.Configuration.GetConnectionString("ConStr"));
    });

builder.Services.AddTransient<IUserAccount, UserAccount>();
builder.Services.AddTransient<IShiftMaster,ShiftMaster>();

builder.Services.AddControllers()
    .AddOData((option => option.Select().Count().OrderBy().Expand().SetMaxTop(100)));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder.WithOrigins("https://localhost:7104") // Allow specific origin
                   .AllowAnyHeader() // Allow any header
                   .AllowAnyMethod(); // Allow any method (GET, POST, etc.)
        });
});


builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseCors("AllowSpecificOrigin"); // Use the CORS policy

app.MapControllers();
app.MapControllerRoute(
    name: "default",
    pattern: "api/{controller}/{action}/{id?}");

app.Run();
