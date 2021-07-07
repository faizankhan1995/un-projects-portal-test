using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnProjectsPortal.Database.Paging
{
    public static class PagedExtention
    {
        public static IQueryable<T> GetPaged<T>(this IQueryable<T> query, int page, int pageSize) where T : class
        {
            var skip = (page - 1) * pageSize;
            return query.Skip(skip).Take(pageSize);
        }
        public static IEnumerable<T> GetPaged<T>(this IEnumerable<T> list, int page, int pageSize) where T : class
        {
            var skip = (page - 1) * pageSize;
            return list.Skip(skip).Take(pageSize);
        }
    }
}
