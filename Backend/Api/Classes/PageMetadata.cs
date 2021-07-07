using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UnProjectsPortal.Api.Classes
{
    public class PageMetadata
    {
        public int total { get; set; } // First letter shouldn't be capital to comply with frontend (Antd)
        public int pageSize { get; set; }
        public int currentPage { get; set; }
    }
}
