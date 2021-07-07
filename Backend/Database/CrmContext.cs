using Microsoft.EntityFrameworkCore;
using UnProjectsPortal.Database.Entities;

namespace UnProjectsPortal.Database
{
    public class ProjectsContext : DbContext
    {
        public ProjectsContext(DbContextOptions<ProjectsContext> options) : base(options)
        {
            //Database.EnsureCreated();
        }

        public DbSet<Project> Projects { get; set; }

    }
}
