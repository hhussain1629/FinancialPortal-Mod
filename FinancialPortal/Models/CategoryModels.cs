using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FinancialPortal.Models
{
    public class Category
    {
        public int Id { get; set; }
        public string Household { get; set; }
        public bool IsExpense { get; set; }
        public string Name { get; set; }
    }
}