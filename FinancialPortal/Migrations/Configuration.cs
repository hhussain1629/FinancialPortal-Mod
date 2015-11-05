namespace FinancialPortal.Migrations
{
    using System;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;
    using Microsoft.AspNet.Identity;
    using Microsoft.AspNet.Identity.EntityFramework;
    using FinancialPortal.Models;

    internal sealed class Configuration : DbMigrationsConfiguration<FinancialPortal.Models.ApplicationDbContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = true;
            
        }

        protected override void Seed(FinancialPortal.Models.ApplicationDbContext context)
        {
            //var userManager = new Microsoft.AspNet.Identity.UserManager<ApplicationUser>(new UserStore<ApplicationUser>(context));
            var userManager = new ApplicationUserManager(new UserStore<ApplicationUser>(new ApplicationDbContext()));
            var store = new RoleStore<IdentityRole>(context);
            var manager = new RoleManager<IdentityRole>(store);

            if (!context.Roles.Any(r => r.Name == "Admin"))
            {
                var role = new IdentityRole { Name = "Admin" };
                manager.Create(role);
            }

            if (!context.Roles.Any(r => r.Name == "Member"))
            {
                var role = new IdentityRole { Name = "Member" };
                manager.Create(role);
            }

            var admin = userManager.FindByEmail("hhussain1629@gmail.com");
            if (admin == null)
            {
                admin = new ApplicationUser()
                {
                    UserName = "hhussain1629@gmail.com",
                    Email = "hhussain1629@gmail.com",
                    FirstName = "Hammad",
                    LastName = "Hussain",
                    Household = "Household 1"
                };
                userManager.Create(admin, "password");
            }

            //if (!context.Transactions.Any(t => t.Description == "Test1"))
            //{
            //    var trans = new Transaction()
            //    {
            //        FinAccountId = 2,
            //        Amount = 15,
            //        AbsAmount = 15,
            //        ReconciledAmount = 15,
            //        AbsReconciledAmount = 15,
            //        Date = DateTimeOffset.UtcNow,
            //        Description = "Test1",
            //        CategoryId = 3
            //    };
            //    context.Transactions.Add(trans);
            //    context.SaveChanges();
            //}

            //if (!context.Users.Any(u => u.Email == "hhussain1629@gmail.com"))
            //{
            //    userManager.Create(new ApplicationUser
            //    {
            //        UserName = "hhussain1629@gmail.com",
            //        Email = "hhussain1629@gmail.com",
            //        FirstName = "Hammad",
            //        LastName = "Hussain",
            //        Household = "x"
            //    }, "password");
            //}
            //var userId = userManager.FindByEmail("hhussain1629@gmail.com").Id;
            

            //if (!context.Categories.Any(c => c.Type == "Income"))
            //{
            //    var income = new Category();
            //    income.Type = "Income";
            //    context.Categories.Add(income);
            //    context.SaveChanges();
            //}
            //if (!context.Categories.Any(c => c.Type == "Expenses"))
            //{
            //    var expenses = new Category();
            //    expenses.Type = "Expenses";
            //    context.Categories.Add(expenses);
            //    context.SaveChanges();
            //}
            //context.SaveChanges();
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method 
            //  to avoid creating duplicate seed data. E.g.
            //
            //    context.People.AddOrUpdate(
            //      p => p.FullName,
            //      new Person { FullName = "Andrew Peters" },
            //      new Person { FullName = "Brice Lambson" },
            //      new Person { FullName = "Rowan Miller" }
            //    );
            //
        }

        
    }
}
