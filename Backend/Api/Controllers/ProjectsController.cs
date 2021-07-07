using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using UnProjectsPortal.Api.Classes;
using UnProjectsPortal.Database;
using UnProjectsPortal.Database.Entities;
using UnProjectsPortal.Database.Paging;
using UnProjectsPortal.Shared.DTO;
using UnProjectsPortal.Shared.Types;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text.Json;

namespace UnProjectsPortal.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private readonly UnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public ProjectsController(ProjectsContext context, IMapper mapper)
        {
            _unitOfWork = new UnitOfWork(context);
            _mapper = mapper;
        }

        // GET: api/Projects
        [HttpGet]
        public ActionResult<IEnumerable<ProjectDTO>> GetProjects([FromQuery] ProjectQueryParams queryParams)
        {
            if (queryParams.StartDate.Date > queryParams.EndDate.Date)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "Start Date must be less than End Date!");
            }

            IEnumerable<Project> projects = _unitOfWork.Projects.GetAll();

            if (queryParams.Id > 0)
            {
                projects = projects.Where(a => a.Id == queryParams.Id);
            }
            if (!string.IsNullOrEmpty(queryParams.Title))
            {
                projects = projects.Where(p => p.Title.ToLower().Contains(queryParams.Title.ToLower()));
            }
            if (!string.IsNullOrEmpty(queryParams.Themes))
            {
                projects = projects.Where(p => p.Themes.ToLower().Contains(queryParams.Themes.ToLower()));
            }
            if (!string.IsNullOrEmpty(queryParams.Country))
            {
                projects = projects.Where(p => p.Country.ToLower().Contains(queryParams.Country.ToLower()));
            }
            if (Enum.IsDefined(typeof(ApprovalStatus), queryParams.ApprovalStatus))
            {
                projects = projects.Where(p => p.ApprovalStatus == queryParams.ApprovalStatus);
            }

            var metadata = new PageMetadata
            {
                total = projects.Count(),
                pageSize = queryParams.PageSize,
                currentPage = queryParams.PageNo
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));

            projects = projects.GetPaged(queryParams.PageNo, queryParams.PageSize).ToList();

            return Ok(_mapper.Map<ProjectDTO[]>(projects));
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public ActionResult<ProjectDTO> GetProject(int id)
        {
            var project = _unitOfWork.Projects.Find(id);

            if (project == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound, "Project not found!");
            }

            return Ok(_mapper.Map<ProjectDTO>(project));
        }

        // PUT: api/Projects/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public ActionResult<ProjectDTO> PutProject(int id, ProjectDTO projectDTO)
        {
            if (id != projectDTO.Id)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "Mismatched request ids!");
            }

            Project projectEntity = _unitOfWork.Projects.Find(id);

            if (projectEntity == null)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest, "Project doesn't exists");
            }

            projectEntity = _mapper.Map<Project>(projectDTO);


            _unitOfWork.Complete();
            return Ok(_mapper.Map<ProjectDTO>(projectEntity));
        }

        // POST: api/Projects
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public ActionResult<ProjectDTO> PostProject(ProjectDTO projectDTO)
        {
            var projectEntity = _mapper.Map<Project>(projectDTO);

            _unitOfWork.Projects.Add(projectEntity);
            _unitOfWork.Complete();

            return CreatedAtAction("GetProject", new { id = projectEntity.Id }, projectEntity);
        }

        // DELETE: api/Projects/5
        [HttpDelete("{id}")]
        public IActionResult DeleteProject(int id)
        {
            var candidate = _unitOfWork.Projects.Find(id);
            if (candidate == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound, "Project not found!");
            }

            _unitOfWork.Projects.Remove(candidate);
            _unitOfWork.Complete();

            return NoContent();
        }
    }
}
