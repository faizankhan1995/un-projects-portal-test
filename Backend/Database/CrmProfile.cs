using AutoMapper;
using UnProjectsPortal.Database.Entities;
using UnProjectsPortal.Shared.DTO;

namespace UnProjectsPortal.Database
{
    public class ProjectsProfile : Profile
    {
        public ProjectsProfile(ProjectsContext dbContext)
        {
            this.CreateMap<ProjectDTO, Project>();
            this.CreateMap<Project, ProjectDTO>();

        }


    }
}
