using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Identity.Web;
using Microsoft.OpenApi.Models;
using UnProjectsPortal.Database;
using Newtonsoft.Json;
using UnProjectsPortal.Shared.Settings;
using System.Text.Json;
using System.Text.Json.Serialization;
using AutoMapper;

namespace UnProjectsPortal.Api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            //Read and store app setting into global object.
            AppSettings.Initialize(configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // To enable CORS support. Reference: https://www.c-sharpcorner.com/article/enabling-cors-in-asp-net-core-api-application/
            services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin", options => options
                                                    .AllowAnyOrigin()
                                                    .AllowAnyMethod()
                                                    .AllowAnyHeader()
                                                    .WithExposedHeaders("X-Pagination"));
            });

            services.AddControllers().AddJsonOptions(options =>
            {
                options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
                //options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.Preserve;
            });

            services.AddDbContext<ProjectsContext>(options =>
            {
                options.UseSqlite(Configuration.GetConnectionString("SQLiteContext"), b => b.MigrationsAssembly("UnProjectsPortal.Api"));
                options.EnableSensitiveDataLogging();
            });

            services.AddScoped(provider => new MapperConfiguration(cfg =>
            {
                cfg.AddProfile(new ProjectsProfile(provider.GetService<ProjectsContext>()));
            }).CreateMapper());

            services.AddControllers();
            services.AddSwaggerGen(options =>
            {
                options.SwaggerDoc("v1", new OpenApiInfo
                {
                    Title = "UN HABITAT Projects Portal API",
                    Version = "v1",
                    Description = "UN HABITAT Projects Portal API",
                });
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            app.UseDeveloperExceptionPage();
            app.UseExceptionHandler("/error");
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "UnProjectsPortal.Api v1"));

            // To enable CORS support. Reference: https://www.c-sharpcorner.com/article/enabling-cors-in-asp-net-core-api-application/
            app.UseCors(options => options
                                    .AllowAnyOrigin()
                                    .AllowAnyHeader()
                                    .AllowAnyMethod()
                                    .WithExposedHeaders("X-Pagination"));

            app.UseHttpsRedirection();

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
