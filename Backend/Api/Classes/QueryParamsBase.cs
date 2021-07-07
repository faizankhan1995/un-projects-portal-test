using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UnProjectsPortal.Api.Classes
{
    public class QueryParamsBase
    {
        const int MAX_PAGE_SIZE = 100;
        public int PageNo { get; set; } = 1;

        private int _pageSize = 10;

        public int PageSize
        {
            get { return _pageSize; }
            set
            {
                _pageSize = Math.Min(MAX_PAGE_SIZE, value);
            }
        }
    }
}
