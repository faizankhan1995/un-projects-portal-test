using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace UnProjectsPortal.Shared.Settings
{
    public class AppSettings
    {
        private AppSettings(IConfiguration config)
        {
            //TODO:: to be replaced by with auth user.
            ImsUserID = System.Environment.UserName;

            //AzrueResources = new AzrueResources(config.GetSection("AzrueResources"));
            //ImsSettings = new ImsSettings(config.GetSection("ImsSettings"));
            ConnectionString = config.GetConnectionString("DatabaseContext");
        }

        public string ImsUserID { get; }

        public string ConnectionString { get; }


        private static AppSettings _instance;
        public static void Initialize(IConfiguration config)
        {
            if (_instance == null)
                _instance = new AppSettings(config);
        }

        public static AppSettings Current
        {
            get
            {
                if (_instance != null)
                    return _instance;

                throw new Exception("App settings must be initialized");
            }
        }
    }
}
