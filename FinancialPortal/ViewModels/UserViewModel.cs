using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using FinancialPortal.Models;

namespace FinancialPortal.ViewModels
{
    //public class UserType
    //{
    //    public UserView ConvertUserType (ApplicationUser user)
    //    {
    //        var displayedUser = new UserView();
    //        displayedUser.Id = user.Id;
    //        displayedUser.UserName = user.UserName;
    //        displayedUser.Email = user.Email;
    //        displayedUser.FirstName = user.FirstName;
    //        displayedUser.LastName = user.LastName;
    //        displayedUser.Household = user.Household;
    //        return displayedUser;
    //    }
    //}

    public class UserView
    {
        public string Id {get; set;}
        public string UserName {get; set;}
        public string Email {get; set;}
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Household { get; set; }
    }
}