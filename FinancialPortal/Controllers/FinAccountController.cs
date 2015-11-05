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
    public class FinAccountController : ApiController
    {

        ApplicationDbContext db = new ApplicationDbContext();

        [Authorize]
        public IList<FinAccount> GetFinAccountsbyHousehold(string household)
        {
            var finAcctList = db.Database.SqlQuery<FinAccount>("EXEC GetFinAccountsByHousehold @household",
                new SqlParameter("household", household)).ToList();
            return finAcctList;
        }

        [HttpGet]
        [Authorize]
        public bool AddFinAccount(string household, string name, decimal balance)
        {
            if (db.FinAccounts.Any(f => (f.Household == household) && (f.Name == name)))
            {

                return false;

            }
            else
            {
                var reconciledBalance = balance;
                db.Database.ExecuteSqlCommand("EXEC AddFinAccount @household, @name, @balance, @reconciledBalance",
                    new SqlParameter("household", household),
                    new SqlParameter("name", name),
                    new SqlParameter("balance", balance),
                    new SqlParameter("reconciledBalance", reconciledBalance));
                return true;
            }
        }

        [HttpGet]
        [Authorize]
        public bool EditFinAccount(int id, string name, decimal balance, decimal reconciledBalance)
        {
            if (db.FinAccounts.Any(f => (f.Id == id)))
            {
                db.Database.ExecuteSqlCommand("EXEC EditFinAccount @id, @name, @balance, @reconciledBalance",
                    new SqlParameter("id", id),
                    new SqlParameter("name", name),
                    new SqlParameter("balance", balance),
                    new SqlParameter("reconciledBalance", reconciledBalance));
                return true;
            }
            return false;
        }
    }
}
