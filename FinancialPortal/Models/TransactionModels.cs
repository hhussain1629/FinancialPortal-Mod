using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;


namespace FinancialPortal.Models
{
    public class Transaction
    {
        public int Id { get; set; }
        public int FinAccountId { get; set; }
        public decimal Amount { get; set; }
        public decimal AbsAmount { get; set; }
        public decimal ReconciledAmount { get; set; }
        public decimal AbsReconciledAmount { get; set; }
        public DateTimeOffset Date { get; set; }
        public string Description { get; set; }
        public Nullable<DateTimeOffset> Updated { get; set; }
        public string UpdatedByUserId { get; set; }
        public int CategoryId { get; set; }

        public virtual FinAccount FinAccount { get; set; }
        public virtual ApplicationUser UpdatedByUser  { get; set; }
        public virtual Category Category { get; set; }
    }
}