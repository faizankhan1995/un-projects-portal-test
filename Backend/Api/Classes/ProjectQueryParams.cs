using System;
using UnProjectsPortal.Shared.Types;

namespace UnProjectsPortal.Api.Classes
{
    public class ProjectQueryParams : QueryParams
    {
        public string Title { get; set; }

        public string Themes { get; set; }
        public string Country { get; set; }

        public DateTime StartDate { get; set; } = DateTime.MinValue;
        public DateTime EndDate { get; set; } = DateTime.MaxValue;
        public ApprovalStatus ApprovalStatus { get; set; }
    }
}
