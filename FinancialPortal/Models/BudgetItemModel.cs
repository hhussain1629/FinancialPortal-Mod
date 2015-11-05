using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FinancialPortal.Models
{
    public class BudgetItem
    {
        public int Id { get; set; }
        public string Household { get; set; }
        public int CategoryId { get; set; }
        public decimal Amount { get; set; }
        public int AnnualFreq { get; set; }

        public virtual Category Category { get; set; }
        
    }
}