using UnProjectsPortal.Database.Entities;
using UnProjectsPortal.Database.Interfaces;
using UnProjectsPortal.Shared.Types;
using System;
using System.Collections.Generic;
using System.Linq;

namespace UnProjectsPortal.Database.Repositories
{
    public class ProjectRepository : Repository<Project>, IProjectRepository
    {
        public ProjectsContext ProjectsContext
        {
            get { return Context as ProjectsContext; } //Generic Context is inherited from BaseRepository
        }

        public ProjectRepository(ProjectsContext dbContext) : base(dbContext)
        {

        }

    }
}
