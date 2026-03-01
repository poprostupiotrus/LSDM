using LSDM.Domain.Interfaces;
using LSDM.Infrastracture;
using LSDM.Infrastracture.Persistence;
using LSDM.Infrastracture.Persistence.Seeders;
using LSDM.Infrastracture.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);


var dbServer = builder.Configuration["POSTGRES_SERVER"];
var dbName = builder.Configuration["POSTGRES_DB"];
var dbUser = builder.Configuration["POSTGRES_USER"];
var dbPassword = builder.Configuration["POSTGRES_PASSWORD"];
var key = builder.Configuration["JWT_KEY"];
var issuer = builder.Configuration["JWT_ISSUER"];
var audience = builder.Configuration["JWT_AUDIENCE"];

var connectionString = $"Server={dbServer};Database={dbName};User Id={dbUser};Password={dbPassword}";

builder.Services.AddInfrastractureServices(connectionString);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IServerRoleRepository, ServerRoleRepository>();
builder.Services.AddScoped<IUserRepository, UserRepository>();

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = issuer,
        ValidAudience = audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(key)),
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<LSDMDbContext>();
    var serverRoleRepository = scope.ServiceProvider.GetRequiredService<IServerRoleRepository>();
    var userRepository = scope.ServiceProvider.GetRequiredService<IUserRepository>();
    var config = scope.ServiceProvider.GetRequiredService<IConfiguration>();

    db.Database.Migrate();
    await ServerRoleSeeder.SeedAsync(serverRoleRepository);
    await UserSeeder.SeedOwnerAsync(userRepository, serverRoleRepository, config);
}


if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.MapGet("/health", () =>
{
    Results.Ok(new { status = "Healthy" });
});

app.Run();
