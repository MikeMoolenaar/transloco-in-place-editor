using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddCors(p => p.AddPolicy("webapp", corsPolicyBuilder =>
{
    corsPolicyBuilder.WithOrigins("http://localhost:4200", "http://127.0.0.1:8080")
        .AllowAnyMethod()
        .AllowAnyHeader();
}));

var app = builder.Build();
app.UseStatusCodePages();
app.UseCors("webapp");
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(
        Path.Combine(builder.Environment.ContentRootPath, "assets")),
    RequestPath = "/assets"
});

app.MapGet("/", () => "Hello world!");

app.Run();