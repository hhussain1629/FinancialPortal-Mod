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
    public class BudgetController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        public IEnumerable<BudgetItem>GetHouseholdIncomeExpenses(string household)
        {
            var incId = db.Categories.FirstOrDefault(c => c.Name == "Income").Id;
            var expId = db.Categories.FirstOrDefault(c => c.Name == "Expense").Id;
            var hInc = db.Database.SqlQuery<BudgetItem>("EXEC GetBudgetItemByHouseholdCategoryId @household, @categoryId", new SqlParameter("household", household), new SqlParameter("categoryId", incId));
            var hExp = db.Database.SqlQuery<BudgetItem>("EXEC GetBudgetItemByHouseholdCategoryId @household, @categoryId", new SqlParameter("household", household), new SqlParameter("categoryId", expId));
            var hIncExp = hInc.ToList();
            hIncExp.Add(hExp.ElementAt(0));
            return hIncExp;
        }
    }
}
