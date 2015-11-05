using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.Owin.Security;
using Microsoft.Owin.Security.Cookies;
using Microsoft.Owin.Security.OAuth;
using FinancialPortal.Models;
using System.Data.SqlClient;

namespace FinancialPortal.Controllers
{
    public class UsersController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<ApplicationUser> GetUsersByHosehold(string household)
        {
            var usersList = db.Database.SqlQuery<ApplicationUser>("EXEC GetUsersByHosehold @household", new SqlParameter("household", household)).ToList();
            return usersList;
        }
    }
}
