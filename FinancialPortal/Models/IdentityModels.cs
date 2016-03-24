﻿using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Microsoft.AspNet.Identity.Owin;
using System.Data.Entity;
using System.Collections.Generic;
using FinancialPortal;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancialPortal.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Household { get; set; }

        public async Task<ClaimsIdentity> GenerateUserIdentityAsync(UserManager<ApplicationUser> manager, string authenticationType)
        {
            // Note the authenticationType must match the one defined in CookieAuthenticationOptions.AuthenticationType
            var userIdentity = await manager.CreateIdentityAsync(this, authenticationType);
            // Add custom user claims here
            return userIdentity;
        }


    }

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        //public ApplicationDbContext()
        //  : base("DefaultConnection", throwIfV1Schema: false)
        public ApplicationDbContext()
          : base("BudgetMaster1", throwIfV1Schema: false)
        {
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        public DbSet<BudgetItem> BudgetItems { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Invitation> Invitations { get; set; }
        public DbSet<FinAccount> FinAccounts { get; set; }
        public DbSet<Transaction> Transactions { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }


        public async Task<bool> AddRefreshToken(RefreshToken token)
        {

            var existingToken = RefreshTokens.SingleOrDefault(r => r.Subject == token.Subject);

            if (existingToken != null)
            {
                var result = await RemoveRefreshToken(existingToken);
            }

            RefreshTokens.Add(token);

            return await SaveChangesAsync() > 0;
        }

        public async Task<bool> RemoveRefreshToken(string refreshTokenId)
        {
            var refreshToken = await RefreshTokens.FindAsync(refreshTokenId);

            if (refreshToken != null)
            {
                RefreshTokens.Remove(refreshToken);
                return await SaveChangesAsync() > 0;
            }

            return false;
        }

        public async Task<bool> RemoveRefreshToken(RefreshToken refreshToken)
        {
            RefreshTokens.Remove(refreshToken);
            return await SaveChangesAsync() > 0;
        }

        public async Task<RefreshToken> FindRefreshToken(string refreshTokenId)
        {
            var refreshToken = await RefreshTokens.FindAsync(refreshTokenId);

            return refreshToken;
        }

        public List<RefreshToken> GetAllRefreshTokens()
        {
            return RefreshTokens.ToList();
        }

    }
}