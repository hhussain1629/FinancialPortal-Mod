using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace FinancialPortal.ViewModels
{
    public class TransView
    {
        public DateTimeOffset Date { get; set; }
        public string FinAccountName { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }
        public decimal Amount { get; set; }
        public decimal AbsAmount { get; set; }
        public decimal ReconciledAmount { get; set; }
        public decimal AbsReconciledAmount { get; set; }
        public Nullable<DateTimeOffset> Updated { get; set; }
        public string UpdatedByUser { get; set; }
    }
}