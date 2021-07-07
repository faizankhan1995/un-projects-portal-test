using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;

namespace UnProjectsPortal.Api.Classes
{
    public class HttpResponseException : Exception
    {
        public HttpStatusCode Status { get; set; } = HttpStatusCode.InternalServerError;

        public HttpResponseException(HttpStatusCode status, string msg) : base(msg)
        {
            Status = status;
        }
    }
}
