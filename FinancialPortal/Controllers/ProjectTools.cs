using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FinancialPortal.Models;
using System.Data.SqlClient;

namespace FinancialPortal.Controllers
{
    public class ProjectTools
    {
        ApplicationDbContext db = new ApplicationDbContext();

        //public int GetFAId(string finAccountName)
        //{
        //    var finAccountId = db.FinAccounts.FirstOrDefault(f => f.Name == finAccountName).Id;
        //    return finAccountId;
        //}

        //public int GetCId(string household, string categoryName)
        //{
        //    var categoryId = db.Categories.FirstOrDefault(c => (c.Household == household) && (c.Name == categoryName)).Id;
        //    return categoryId;
        //}

        //public void UpdateBalance(int finAccountId, decimal amount)
        //{
        //    var household = db.FinAccounts.FirstOrDefault(f => f.Id == finAccountId).Household;
        //    var name = db.FinAccounts.FirstOrDefault(f => f.Id == finAccountId).Name;
        //    var balance = db.FinAccounts.FirstOrDefault(f => f.Id == finAccountId).Balance;
        //    var reconciledBalance = db.FinAccounts.FirstOrDefault(f => f.Id == finAccountId).ReconciledBalance;
        //    var newbalance = balance + amount;
        //    db.Database.SqlQuery<int>("EXEC EditFinAccount @id, @household, @name, @balance",
        //        new SqlParameter("id", finAccountId),
        //        new SqlParameter("household", household),
        //        new SqlParameter("name", name),
        //        new SqlParameter("balance", newbalance),
        //        new SqlParameter("reconciledbalance", reconciledBalance));
        //}


        
    }
}