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
using System.Collections;
using FinancialPortal.ViewModels;

namespace FinancialPortal.Controllers
{
    public class TransactionController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        private Transaction AssignTransProps (Transaction trans)
        {
            //trans.DisplayDate = String.Format("{0:yyyy/MM/dd}", trans.Date);
            //trans.DisplayTime = String.Format("{0:HH:mm}", trans.Date);
            //if (trans.Updated != null)
            //{
            //    trans.DisplayUpdated = String.Format("{0:yyyy/MM/dd HH:mm}", trans.Updated);
            //}
            //else
            //{
            //    trans.DisplayUpdated = "";
            //}
            trans.FinAccount = db.FinAccounts.FirstOrDefault(f => f.Id == trans.FinAccountId);
            trans.Category = db.Categories.FirstOrDefault(c => c.Id == trans.CategoryId);
            trans.UpdatedByUser = db.Users.FirstOrDefault(u => u.Id == trans.UpdatedByUserId);
            return trans;
        }

        private List<decimal> BudgetRoom(int categoryId)
        {
            var result = new List<decimal>();
            if (db.BudgetItems.Any(b => b.CategoryId == categoryId) && db.Categories.FirstOrDefault(c => c.Id == categoryId).IsExpense)
            {
                decimal budgetAmount = db.BudgetItems.FirstOrDefault(b => b.CategoryId == categoryId).Amount;
                decimal catTotal = GetCategoryTotal(categoryId);
                var br = budgetAmount - catTotal;
                result.Add(1);
                result.Add(br);
                return result;
            }
            result.Add(0);
            return result;
        }

        private decimal GetCategoryTotal(int categoryId)
        {
            List<Transaction> transactions = db.Transactions.Where(t => t.CategoryId == categoryId).ToList();
            if (transactions.Count != 0)
            {
                decimal total = 0;
                foreach (var trans in transactions)
                {
                    total += trans.Amount;
                }
                return total;
            }
            return 0;
        }

        [Authorize]
        public IList<TransView> GetTransactionsByCategoryId(int catId)
        {
            List<TransView> transList = new List<TransView>();
            transList = db.Database.SqlQuery<TransView>("EXEC GetTransactionsByCategoryId @categoryId",
                new SqlParameter("categoryId", catId)).ToList();
            return transList;
        }

        [Authorize]
        public IList<Transaction>GetTransactionsByHousehold(string household)
        {
            var transList = db.Database.SqlQuery<Transaction>("EXEC GetTransactionsByHousehold @household",
                new SqlParameter("household", household)).ToList();
            foreach (var trans in transList)
            {
                AssignTransProps(trans);
            }
            return transList;
        }

        [Authorize]
        public IList<Transaction> GetLatestTransactions(int number, string household)
        {
            var transList = db.Database.SqlQuery<Transaction>("EXEC GetLatestTransactions @number, @household",
                new SqlParameter("number", number),
                new SqlParameter("household", household)).ToList();
            foreach (var trans in transList)
            {
                AssignTransProps(trans);
            }
            return transList;
        }

        [HttpGet]
        [Authorize]
        public IList<decimal> AddTransaction(int finAccountId, decimal amount, string description, int categoryId)
        {
            var result = new List<decimal>();
            var absAmount = Math.Abs(amount);
            var date = DateTimeOffset.UtcNow;
            date = date.LocalDateTime;
            db.Database.ExecuteSqlCommand("EXEC AddTransaction @finAccountId, @amount, @absAmount, @date, @description, @categoryId",
                new SqlParameter("finAccountId", finAccountId),
                new SqlParameter("amount", amount),
                new SqlParameter("absAmount", absAmount),
                new SqlParameter("date", date),
                new SqlParameter("description", description),
                new SqlParameter("categoryId", categoryId));
            result = BudgetRoom(categoryId);
            return result;
        }

        [HttpGet]
        [Authorize]
        public IList<decimal> EditTransaction(int id, decimal amount, decimal reconciledAmount, string description, int categoryId)
        {
            var result = new List<decimal>();
            if (db.Transactions.Any(t => t.Id == id))
            {
                var absAmount = Math.Abs(amount);
                var absReconciledAmount = Math.Abs(reconciledAmount);
                var updated = DateTimeOffset.UtcNow;
                updated = updated.LocalDateTime;
                var updatedByUserId = User.Identity.GetUserId();
                db.Database.ExecuteSqlCommand("EXEC EditTransaction @id, @amount, @absAmount, @reconciledAmount," +
                    "@absReconciledAmount, @description, @updated, @updatedByUserId, @categoryId",
                    new SqlParameter("id", id),
                    new SqlParameter("amount", amount),
                    new SqlParameter("absAmount", absAmount),
                    new SqlParameter("reconciledAmount", reconciledAmount),
                    new SqlParameter("absReconciledAmount", absReconciledAmount),
                    new SqlParameter("description", description),
                    new SqlParameter("updated", updated),
                    new SqlParameter("updatedByUserId", updatedByUserId),
                    new SqlParameter("categoryId", categoryId));
                result.Add(1);
                var tempList = BudgetRoom(categoryId);
                result = result.Concat(tempList).ToList();
                return result;
            }
            result.Add(0);
            return result;
        }//Later modify this and stored procedure to include updatedByUserId.

        [HttpGet]
        [Authorize]
        [Route("api/Transaction/Delete/")]
        public IList<decimal> DeleteTransaction(int id)
        {
            var result = new List<decimal>();
            if (db.Transactions.Any(t => t.Id == id))
            {
                var categoryId = db.Transactions.FirstOrDefault(t => t.Id == id).CategoryId;
                db.Database.ExecuteSqlCommand("EXEC DeleteTransaction @id", new SqlParameter("id", id));
                result.Add(1);
                var tempList = BudgetRoom(categoryId);
                result.Concat(tempList).ToList();
                return result;
            }
            result.Add(0);
            return result;
        }
        
        [Authorize]
        public decimal GetMonthlyExpenses(string household, int month)
        {
            var temp = db.Database.SqlQuery<decimal>("EXEC GetMonthlyIncomesExpenses @household, @month, @isExpense",
                    new SqlParameter("household", household),
                    new SqlParameter("month", month),
                    new SqlParameter("isExpense", 1)).ToList();
            decimal expense = 0;
            foreach (var item in temp)
            {
                expense += item;
            }
            return expense;
        }

    }
}
