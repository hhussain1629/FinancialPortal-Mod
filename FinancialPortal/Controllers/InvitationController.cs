using FinancialPortal.Models;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace FinancialPortal.Controllers
{
    public class InvitationController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [HttpPost]
        public void AddInvitation(string fromUserId, string toEmail)
        {
            db.Database.ExecuteSqlCommand("EXEC AddInvitation @fromUserId, @toEmail",
                    new SqlParameter("fromUserId", fromUserId), new SqlParameter("toEmail", toEmail));
        }
    }
}
