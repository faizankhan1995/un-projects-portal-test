using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.Data.Sqlite;
using UnProjectsPortal.Api.Classes;

namespace UnProjectsPortal.Api.Controllers
{
    /// <summary>
    ///  Reference: https://docs.microsoft.com/en-us/aspnet/core/web-api/handle-errors?view=aspnetcore-3.1#exception-handler
    /// </summary>
    [ApiController]
    [ApiExplorerSettings(IgnoreApi = true)]
    public class ErrorController : ControllerBase
    {
        //[Route("/error")]
        //public IActionResult Error() => Problem();
        [Route("/error")]
        public IActionResult Error([FromServices] IWebHostEnvironment webHostEnvironment)
        {

            var context = HttpContext.Features.Get<IExceptionHandlerFeature>();

            Exception exception = context.Error;
            if (exception.InnerException != null)
            {
                exception = exception.InnerException;
            }

            if (exception is HttpResponseException)
            {
                HttpResponseException httpResponseException = exception as HttpResponseException;
                return Problem(
                    title: httpResponseException.Message,
                    detail: httpResponseException.Message,
                    statusCode: (int)httpResponseException.Status
                    );
            }
            if (exception is SqliteException)
            {
                SqliteException sqlException = exception as SqliteException;

                return Problem(
                    title: sqlException.Message,
                    detail: "Bad Request",
                    statusCode: (int)HttpStatusCode.BadRequest
                    );
            }
            return Problem(
                    title: exception.Message,
                    detail: exception.Message,
                    statusCode: (int)HttpStatusCode.InternalServerError
                    );

        }
    }
}
