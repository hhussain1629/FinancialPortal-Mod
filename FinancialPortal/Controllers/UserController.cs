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
using FinancialPortal.ViewModels;
using System.Data.SqlClient;
using SendGrid;
using System.Configuration;
using System.Web.Mvc;
using System.Threading.Tasks;
using System.Net.Mail;

namespace FinancialPortal.Controllers
{
    public class UserController : ApiController
    {
        ApplicationDbContext db = new ApplicationDbContext();
        RegExUtilities regExUtilities = new RegExUtilities();
        

        private string RandomString(int length)
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        [System.Web.Http.HttpPost]
        private async Task<string> SendEmail(string emailTo, string emailFrom, string fromUserId,
            string toUserName, string inviteCode)
        {
            var fromUserName = db.Users.Find(fromUserId).FirstName + " " + db.Users.Find(fromUserId).LastName;
            var Household = db.Users.Find(fromUserId).Household;
            string url = "http://localhost:59490/"; //Address of the local host; modify as needed.
            //string url = "http://budgetmaster1.azurewebsites.net/"; //Set to URL of online application.
            var body = toUserName + " ,\r\r\r" + fromUserName + " has invited you to join the '" +
                    Household + "' Household in Budget Master! Your invitation code is: " + inviteCode +
                    ". Please go to " + url + ", choose 'Register' in the menu, and enter your information, " +
                    "including the invitation code.";

            var appSettings = ConfigurationManager.AppSettings;
            var credentials = new NetworkCredential(appSettings["SendGridUserName"], appSettings["SendGridPassword"]);
            SendGridMessage message = new SendGridMessage();
            message.AddTo(emailTo);
            message.From = new MailAddress(emailFrom, fromUserName);
            message.Subject = "Invitation to Budget Master";
            message.Text = body;
            var transportWeb = new Web(credentials);
            await transportWeb.DeliverAsync(message);
            var result = "An e-mail invitation to the household has been delivered to " + emailTo + ".";

            return result;
        }



        [Authorize]
        public IList<UserView> GetUsersByHousehold(string household)
        {
            var usersList = db.Database.SqlQuery<UserView>("EXEC GetUsersByHousehold @household",
                new SqlParameter("household", household)).ToList();
            return usersList;
        }

        [System.Web.Http.HttpGet]
        [Authorize]
        public string InviteUser(string toUserName, string toEmail)
        {
            string result;

            //Verify e-mail address format
            if (!regExUtilities.IsValidEmail(toEmail))
            {
                result = "The e-mail address is not in a valid format. Please re-enter it.";
                return result;
            }

            //Generate unique 8-character invitation code
            string inviteCode = "";
            do
            {
                inviteCode = RandomString(8);
            }
            while (db.Invitations.Any(i => i.InviteCode == inviteCode));

            //Store invitation data
            string fromUserId = User.Identity.GetUserId();
            var spresult = db.Database.ExecuteSqlCommand("EXEC AddInvitation @fromUserId, @toEmail, @inviteCode",
                new SqlParameter("fromUserId", fromUserId),
                new SqlParameter("toEmail", toEmail),
                new SqlParameter("inviteCode", inviteCode));

            //Send invitation
            var sendResult = SendEmail(toEmail, "admin@budgetmaster.com", fromUserId, toUserName, inviteCode);
            result = "An e-mail invitation to the household has been sent  to " + toEmail + ".";

            return result;

        }
       
    }
}
