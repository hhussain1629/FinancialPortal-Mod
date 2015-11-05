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
    public class CategoryController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();

        [Authorize]
        public IList<Category>GetCategoriesByHousehold(string household)
        {
            var categoryList = db.Database.SqlQuery<Category>("EXEC GetCategoriesByHousehold @household",
                new SqlParameter("household", household)).ToList();
            return categoryList;
        }


        [HttpGet]
        [Authorize]
        public bool AddCategory(string household, bool isExpense, string name)
        {
            if (db.Categories.Any(c => (c.Household == household) && (c.Name == name)))
            {
                return false;
            }
            else
            {
                db.Database.ExecuteSqlCommand("EXEC AddCategory @household, @isExpense, @name",
                    new SqlParameter("household", household), new SqlParameter("isExpense", isExpense), new SqlParameter("name", name));
                return true;
            }
        }

        [HttpGet]
        [Authorize]
        public string EditCategory(int id, string household, string name)
        {
            string message;
            if (db.Categories.Any(c => c.Id == id))
            {
                if (db.Categories.Any(c => (c.Household == household) && (c.Name == name) && (c.Id != id)))
                {
                    message = "There is already a category named \"" + name + "\" for Household " +
                        household + ". Please choose a different category name.";
                    return message;
                }
                else
                {
                    db.Database.ExecuteSqlCommand("EXEC EditCategory @id, @name",
                            new SqlParameter("id", id), new SqlParameter("name", name));
                    message = "The category has been edited.";
                    return message;
                }
            }
            message = "No such category";
            return message; 
        }

        [HttpGet]
        [Authorize]
        public string DeleteCategory(int id)
        {
            string message;
            if (db.Categories.Any(c => c.Id == id))
            {
                if (db.BudgetItems.Any(b => b.CategoryId == id) || db.Transactions.Any(t => t.CategoryId == id))
                {
                    message = "To delete a category, please remove all budget items and transactions from the category.";
                }
                else
                {
                    var name = db.Categories.FirstOrDefault(c => c.Id == id).Name;
                    db.Database.ExecuteSqlCommand("EXEC DeleteCategory @id",
                                new SqlParameter("id", id));
                    message = "The category \"" + name + "\" has been deleted."; 
                }
            }
            else
            {
                message = "No such category";
            }
            return message;
        }

    }
}
