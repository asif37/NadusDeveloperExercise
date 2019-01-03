using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography;
using System.Threading.Tasks;
using System.Web.Http;
using DatacollectionAPI.VendorsModel;
using DatacollectionAPI.Helper;
using DatacollectionAPI.Models;

namespace DatacollectionAPI.Controllers
{
    public class AccountController : ApiController
    {
        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IHttpActionResult> Login([FromBody] AccountViewModels.LoginViewModel model, string returnUrl=null)
        {
            try
            {
                string passwordhash = "password";
                using (MD5 md5Hash = MD5.Create())
                {
                    passwordhash =PasswordHashHelper.GetMd5Hash(md5Hash, model.Password);
                    
                }
                using (Entities db = new Entities())
                {
                    var products = db.products.ToList();
                    var aspnetuser =
                        db.AspNetUsers.Where(usr=> usr.Email == model.Email && usr.PasswordHash== passwordhash).FirstOrDefault();
                    if (aspnetuser != null)
                    {
                        //var roleId=db.UserRoleId(aspnetuser.Id);
                        var firstOrDefaultUserRoleId = aspnetuser.AspNetRoles.FirstOrDefault();
                        if (firstOrDefaultUserRoleId != null)
                            model.RoleId = firstOrDefaultUserRoleId.Id;
                        model.IsDisable = aspnetuser.IsDisable;
                        model.UserId = aspnetuser.Id;
                        return Ok(model);
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }

        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IHttpActionResult> Register([FromBody]AccountViewModels.RegisterViewModel model, string returnUrl = null)
        {
            //ViewData["ReturnUrl"] = returnUrl;
            try
            {

                using (Entities db = new Entities())
                {
                    AspNetUser createUser = new AspNetUser();
                    createUser.UserName = model.Email;
                    createUser.Email = model.Email;
                    createUser.FirstName = model.FirstName;
                    createUser.LastName = model.LastName;
                    createUser.City = model.City;
                    createUser.Zip = model.Zip;
                    createUser.State = model.State;
                    createUser.CreatedDate = DateTime.Now;
                    createUser.IsDisable = false;
                    createUser.EmailConfirmed = false;
                    using (MD5 md5Hash = MD5.Create())
                    {
                        string passwordhash = PasswordHashHelper.GetMd5Hash(md5Hash, model.Password);
                        createUser.PasswordHash = passwordhash;
                    }
                    createUser.PhoneNumber = null;
                    createUser.PhoneNumberConfirmed = false;
                    createUser.TwoFactorEnabled = false;
                    createUser.LockoutEndDateUtc = null;
                    createUser.LockoutEnabled = true;
                    createUser.AccessFailedCount = 0;
                    db.AspNetUsers.Add(createUser);
                    db.SaveChanges();
                    var firstOrDefaultUser = db.AspNetUsers.FirstOrDefault(
                        usr =>
                            usr.Email == model.Email && usr.FirstName == model.FirstName &&
                            usr.LastName == model.LastName);
                    if (firstOrDefaultUser != null)
                    {
                        //int roleId =firstOrDefaultUser.Id;
                        var userRoleId = model.EmployeeRole == "Manager" ? 1 : 2;
                        //db.addUserRole(firstOrDefaultUser.Id, userRoleId);
                        //db.SaveChanges();
                    }
                    return Ok(true);
                }
            }
            catch (Exception ex)
            {
                return Ok(false);
            }
        }

        //
        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IHttpActionResult> ForgotPassword(AccountViewModels.ForgotPasswordViewModel model)
        {
            try
            {
                using (Entities db = new Entities())
                {
                    var user = db.AspNetUsers.FirstOrDefault(usr => usr.Email == model.Email);
                    Random rnd = new Random();
                    var uppercaseLetter = ((char)('a' + rnd.Next(0, 26))).ToString().ToUpper() + rnd.Next(1, 9).ToString() + "!@";
                    Guid newpassword = Guid.NewGuid();
                    AccountViewModels.ResetPasswordViewModel resetPasswordViewModel = new AccountViewModels.ResetPasswordViewModel();
                    resetPasswordViewModel.Email = user.ToString();
                    resetPasswordViewModel.Password = newpassword.ToString() + uppercaseLetter;
                    resetPasswordViewModel.ConfirmPassword = newpassword.ToString() + uppercaseLetter;
                    await ResetPassword(resetPasswordViewModel);
                    return Ok(true);
                }
            }
            catch (Exception ex)
            {

                return Ok(false);
            }            
        }

        //
        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        //[ValidateAntiForgeryToken]
        public async Task<IHttpActionResult> ResetPassword(AccountViewModels.ResetPasswordViewModel model, string returnUrl = null)
        {

            try
            {
                using (Entities db = new Entities())
                {
                    AspNetUser user = new AspNetUser();
                    user = db.AspNetUsers.FirstOrDefault(usr => usr.Email == model.Email);
                    if (user != null)
                    {
                        using (MD5 md5Hash = MD5.Create())
                        {
                            string passwordhash = PasswordHashHelper.GetMd5Hash(md5Hash, model.Password);
                            user.PasswordHash = passwordhash;
                        }
                        db.AspNetUsers.AddOrUpdate(user);
                        db.SaveChanges();
                        return Ok(true);
                    }
                    else
                    {
                        return Ok(false);
                    }
                }
            }
            catch (Exception ex)
            {
                return Ok(false);
            }            
        }

         [System.Web.Http.HttpPost]
        //[ValidateAntiForgeryToken]
        public async Task<bool> CheckEmailExist([FromBody] AccountViewModels.ResetPasswordViewModel model, string returnUrl = null)
        {
            try
            {
                using (Entities db = new Entities())
                {
                    var user = db.AspNetUsers.FirstOrDefault(usr=>usr.Email== model.Email);
                    if (user == null)
                    {
                        // Don't reveal that the user does not exist
                        //return RedirectToAction(nameof(ResetPasswordConfirmation));
                        return false;
                    }
                    else
                    {
                        return true;
                    }
                }
                   
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
