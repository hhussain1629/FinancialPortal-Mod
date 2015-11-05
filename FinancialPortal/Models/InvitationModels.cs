using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace FinancialPortal.Models
{
    public class Invitation
    {
        public int Id { get; set; }
        public string FromUserId { get; set; }
        public string ToEmail { get; set; }
        public string InviteCode { get; set; }
    }
}