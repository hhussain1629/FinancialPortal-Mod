using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using FinancialPortal.Models;
using System.Data.SqlClient;

namespace FinancialPortal.Controllers
{
    public class DeleteTransactionController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [HttpDelete]
        public void DeleteTransaction(int id)
        {
            db.Database.ExecuteSqlCommand("EXEC DeleteTransaction @id", new SqlParameter("id", id));
        }

    }
}
