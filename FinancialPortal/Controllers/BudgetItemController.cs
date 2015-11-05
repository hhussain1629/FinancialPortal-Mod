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
using FinancialPortal.Controllers;

namespace FinancialPortal.Controllers
{
    public class BudgetItemController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        private BudgetItem AssignBudgetVirtual(BudgetItem bItem)
        {
            if (bItem != null)
            {
                bItem.Category = db.Categories.FirstOrDefault(c => c.Id == bItem.CategoryId);
            }
            return bItem;
        }

        [HttpGet]
        [Authorize]
        public bool AddBudgetItem(string household, int categoryId, decimal amount, int annualFreq)
        {
            //if (!db.Categories.FirstOrDefault(c => c.Id == categoryId).IsExpense)
            //{
            //    return false;
            //}
            //if (db.BudgetItems.Any(b => (b.Household == household) && (b.CategoryId == categoryId)))
            //{
            //    return false;
            //}
            //else
           
                var bItem = db.Database.ExecuteSqlCommand("EXEC AddBudgetItem @household, @categoryId, @amount, @annualFreq",
                    new SqlParameter("household", household), new SqlParameter("categoryId", categoryId), 
                    new SqlParameter("amount", amount),
                    new SqlParameter("annualFreq", annualFreq));
                return true;
           
        }

        [HttpGet]
        [Authorize]
        public bool DeleteBudgetItem(int id)
        {
            if (db.BudgetItems.Any(b => b.Id == id))
            {
                db.Database.ExecuteSqlCommand("EXEC DeleteBudgetItem @id", new SqlParameter("id", id));
                return true;
            }
            else
            {
                return false;
            }
        }

        [Route("api/BudgetItem/Income/")]
        [Authorize]
        public IList<BudgetItem>GetIncomeItems(string household)
        {
            var incomeList = db.Database.SqlQuery<BudgetItem>("EXEC GetIncomeExpenseItems @household, @isExpense",
                   new SqlParameter("household", household), new SqlParameter("isExpense", false)).ToList();
            foreach (var item in incomeList)
            {
                AssignBudgetVirtual(item);
            }
            return incomeList;
        }

        [Route("api/BudgetItem/Expenses/")]
        [Authorize]
        public IList<BudgetItem> GetExpenseItems(string household)
        {
            var expenseList = db.Database.SqlQuery<BudgetItem>("EXEC GetIncomeExpenseItems @household, @isExpense",
                   new SqlParameter("household", household), new SqlParameter("isExpense", true)).ToList();
            foreach (var item in expenseList)
            {
                AssignBudgetVirtual(item);
            }
            return expenseList;
        }
    }
}
