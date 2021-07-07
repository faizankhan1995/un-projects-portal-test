using Microsoft.EntityFrameworkCore.Storage;
using UnProjectsPortal.Database.Interfaces;
using UnProjectsPortal.Database.Repositories;

namespace UnProjectsPortal.Database
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly ProjectsContext _context;
        public UnitOfWork(ProjectsContext context)
        {
            _context = context;
            Projects = new ProjectRepository(context);
        }

        public IProjectRepository Projects { get; private set; }


        public int Complete()
        {
            return _context.SaveChanges();
        }

        public void Dispose()
        {
            _context.Dispose();
        }

        public IDbContextTransaction BeginTransaction()
        {
            return _context.Database.BeginTransaction();
        }

    }
}
