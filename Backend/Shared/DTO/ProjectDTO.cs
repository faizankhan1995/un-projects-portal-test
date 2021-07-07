using UnProjectsPortal.Shared.Types;
using System;

namespace UnProjectsPortal.Shared.DTO
{
    public class ProjectDTO
    {
        public int Id { get; set; } = 0;
        public string Title { get; set; }

        public string PaasCode { get; set; }

        public ApprovalStatus ApprovalStatus { get; set; }

        public string Fund { get; set; }

        public decimal PagValue { get; set; }

        public DateTime StartDate { get; set; }

        public DateTime EndDate { get; set; }

        public string Country { get; set; }

        public string LeadOrgUnit { get; set; }

        public string Themes { get; set; }

        public string Donors { get; set; }

        public decimal TotalExpenditure { get; set; }

        public decimal TotalContribution { get; set; }

        public decimal TotalPsc { get; set; }
    }
}
