using System;
using System.Collections.Generic;
using System.Data.Entity.Migrations;
using System.IO;
using System.Linq;
using System.Web;
using DatacollectionAPI.VendorsModel;

namespace DatacollectionAPI.Helper
{
    public static class VendorHelper
    {


        //        public static List<EmployeeCustom> GetAllEmployeesForManager()
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                List<EmployeeCustom> employeeCustomList = new List<EmployeeCustom>();
        //                var employeeList = db.AspNetUsers.Where(usr => usr.Id != CurrentLoginUser.CurrentLogInUserId).ToList();
        //                for (int i = 0; i < employeeList.Count; i++)
        //                {
        //                    EmployeeCustom employeecustom = new EmployeeCustom();
        //                    employeecustom.Id = employeeList[i].Id;
        //                    employeecustom.AccessFailedCount = employeeList[i].AccessFailedCount;
        //                    employeecustom.Email = employeeList[i].Email;
        //                    employeecustom.EmailConfirmed = employeeList[i].EmailConfirmed;
        //                    employeecustom.LockoutEnabled = employeeList[i].LockoutEnabled;
        //                    employeecustom.PasswordHash = employeeList[i].PasswordHash;
        //                    employeecustom.PhoneNumber = employeeList[i].PhoneNumber;
        //                    employeecustom.PhoneNumberConfirmed = employeeList[i].PhoneNumberConfirmed;
        //                    employeecustom.SecurityStamp = employeeList[i].SecurityStamp;
        //                    employeecustom.TwoFactorEnabled = employeeList[i].TwoFactorEnabled;
        //                    employeecustom.UserName = employeeList[i].UserName;
        //                    employeecustom.CreatedDate = employeeList[i].CreatedDate;
        //                    employeecustom.IsDisable = employeeList[i].IsDisable;
        //                    employeecustom.UpdatedDate = employeeList[i].UpdatedDate;
        //                    employeecustom.FirstName = employeeList[i].FirstName;
        //                    employeecustom.LastName = employeeList[i].LastName;
        //                    employeecustom.Zip = employeeList[i].Zip;
        //                    employeecustom.City = employeeList[i].City;
        //                    employeecustom.State = employeeList[i].State;

        //                    var firstOrDefault = employeeList[i].AspNetRoles.FirstOrDefault();
        //                    if (firstOrDefault != null)
        //                    {
        //                        int roleId = firstOrDefault.Id;
        //                        //string roleId = db.AspNetRoles.FirstOrDefault(usrId => usrId.UserId == employeeList[i].Id).RoleId;
        //                        var aspNetRole = db.AspNetRoles.FirstOrDefault(rol => rol.Id == roleId);
        //                        if (aspNetRole != null)
        //                            employeecustom.EmployeeRole = aspNetRole.Name;
        //                    }
        //                    employeeCustomList.Add(employeecustom);
        //                }
        //                return employeeCustomList;
        //            }
        //        }
        public static List<vendor> GetAllVendors()
        {
            using (Entities db = new Entities())
            {
                return db.vendors.ToList();
            }
        }
        public static List<product> getProductsByVendorId(int vendorId)
        {
            using (Entities db = new Entities())
            {
                db.Configuration.LazyLoadingEnabled = false;
                return db.products.Where(a=>a.vendorId == vendorId).ToList();
            }
        }
        public static List<Order> getOrdersByCustomer(int customerId)
        {
            using (Entities db = new Entities())
            {
                db.Configuration.LazyLoadingEnabled = false;
                return db.Orders.Where(a => a.CustomerId == customerId).ToList();
            }
        }
        
        public static string postOrder(bool selected,int productId, string quantity,string customoerId)
        {
            try
            {
                using (Entities db = new Entities())
                {
                    if (selected==true)
                    {
                        db.Configuration.LazyLoadingEnabled = false;
                        var product = db.products.Where(a => a.productId == productId).FirstOrDefault();
                        Order obj = new Order();
                        obj.CustomerId = int.Parse(customoerId);
                        obj.ProductId = productId;
                        obj.Quantity = int.Parse(quantity);
                        obj.ToatlPrice = int.Parse(product.price) * obj.Quantity;
                        db.Orders.Add(obj);
                        db.SaveChanges();
                        return "Product Added to Order";
                    }
                    else
                    {
                        int customerid = int.Parse(customoerId);
                       Order order = db.Orders.Where(b => b.CustomerId == customerid && b.ProductId == productId).FirstOrDefault();
                       db.Orders.Remove(order);
                       db.SaveChanges();
                        return "Product Removed from Order";
                    }
                 
                }
            }
            catch (Exception ex)
            {
                return ex.Message;
            }
         
        }
        
        //        public static int getRoleId(int UserId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                var roleID = db.AspNetUsers.FirstOrDefault(a => a.Id == UserId).AspNetRoles.FirstOrDefault().Id;
        //                //var roleID = db.AspNetUserRoles.ToList().Where(a => a.UserId == UserId).Select(b => b.RoleId).FirstOrDefault();
        //                return roleID;
        //            }
        //        }



        //        public static bool AddEmployee(EmployeeCustom employee)
        //        {

        //            if (employee != null)
        //            {
        //                using (Entities db = new Entities())
        //                {

        //                    AspNetUser emp = new AspNetUser();
        //                    emp.Id = employee.Id;
        //                    emp.AccessFailedCount = employee.AccessFailedCount;
        //                    emp.Email = employee.Email;
        //                    emp.EmailConfirmed = employee.EmailConfirmed;
        //                    emp.LockoutEnabled = employee.LockoutEnabled;
        //                    emp.PasswordHash = employee.PasswordHash;
        //                    emp.PhoneNumber = employee.PhoneNumber;
        //                    emp.PhoneNumberConfirmed = employee.PhoneNumberConfirmed;
        //                    emp.SecurityStamp = employee.SecurityStamp;
        //                    emp.TwoFactorEnabled = employee.TwoFactorEnabled;
        //                    emp.UserName = employee.UserName;
        //                    emp.CreatedDate = employee.CreatedDate;
        //                    emp.IsDisable = employee.IsDisable;
        //                    emp.UpdatedDate = employee.UpdatedDate;
        //                    emp.FirstName = employee.FirstName;
        //                    emp.LastName = employee.LastName;
        //                    emp.Zip = employee.Zip;
        //                    emp.City = employee.City;
        //                    emp.State = employee.State;
        //                    //emp.EmployeeRole
        //                    db.AspNetUsers.Add(emp);
        //                    //db.Add(employee);
        //                    db.SaveChanges();
        //                    return true;
        //                }
        //            }
        //            return false;
        //        }
        //        public static AspNetUser GetEmployeeById(int id)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                db.Configuration.LazyLoadingEnabled = false;
        //                AspNetUser employee= db.AspNetUsers.Where(x => x.Id == id).FirstOrDefault();
        //                return employee;
        //            }
        //        }
        //        public static bool DeleteEmployee(AspNetUser employee)
        //        {
        //            try
        //            {
        //                using (Entities db = new Entities())
        //                {
        //                    db.AspNetUsers.Remove(employee);
        //                    db.SaveChanges();
        //                    return true;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return false;
        //            }

        //        }

        //        public static bool UpdateEmployee(EmployeeCustom employee)
        //        {
        //            try
        //            {
        //                using (Entities db = new Entities())
        //                {

        //                    var user = db.AspNetUsers.Where(x => x.Id == employee.Id).FirstOrDefault();
        //                    if (user != null)
        //                    {
        //                        user.IsDisable = employee.IsDisable;
        //                        user.Email = employee.Email;
        //                        user.FirstName = employee.FirstName;
        //                        user.LastName = employee.LastName;
        //                        user.City = employee.City;
        //                        user.Zip = employee.Zip;
        //                        user.State = employee.State;
        //                        db.SaveChanges();
        //                        int employeeRole = employee.EmployeeRole == "Manager" ? 1 : 2;
        //                        //var userRole = user.AspNetRoles.FirstOrDefault().Id;
        //                        //var userRole = db.AspNetUserRoles.FirstOrDefault(usrId => usrId.UserId == employee.Id);
        //                        // db.AspNetUserRoles.Remove(userRole);

        //                        db.addUserRole(user.Id, employeeRole);
        //                        db.SaveChanges();
        //                        //userRole.RoleId = employee.EmployeeRole == "Manager" ? 1.ToString() : 2.ToString();
        //                        //db.AspNetUserRoles.Add(userRole);
        //                        //db.SaveChanges();
        //                        return true;
        //                    }
        //                    return false;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return false;
        //            }
        //        }


        //        public static void DisableEmployee(int userId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                var aspnetuser = db.AspNetUsers.FirstOrDefault(usr => usr.Id == userId);
        //                aspnetuser.IsDisable = true;
        //                db.AspNetUsers.AddOrUpdate(aspnetuser);
        //                db.SaveChanges();
        //            }
        //        }

        //        public static DashBoardCounts GetDashBoardCount(int userId, int roleId = 1)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                DashBoardCounts counts = new DashBoardCounts();

        //                var TotalAssignedMachinesList = new List<productRoute>();
        //                //var TotalAssignedMachines = 0;
        //                var TotalDone = 0;
        //                var PartiallyDone = 0;
        //                var NotStarted = 0;
        //                var routes = db.routes.ToList();
        //                counts.Routes = routes.Count();
        //                counts.Employees = db.AspNetUsers.Where(usr => usr.AspNetRoles.Any(rol => rol.Id == 2)).Count();
        //                //counts.Employees = db.AspNetUsers.Where(usr => usr.AspNetUserRoles.Any(rol => rol.Role.Id == "2")).Count();
        //                var EmployeeTotalRoutes = db.employeeRoutes.Where(x => x.userId == userId && x.isEmployeeDisable == false).ToList();
        //                var AssignedRoutes = EmployeeTotalRoutes.Select(x => x.routeId).Distinct().ToList();
        //                TotalAssignedMachinesList = RoutesAndMachinesByUserId(userId);
        //                TotalAssignedMachinesList.ForEach((f) =>
        //                {
        //                    var status = GetMachineAuditStatus(f.productId, f.routeId, userId);
        //                    if (status != "")
        //                    {
        //                        if (status == "n")
        //                        {
        //                            NotStarted += 1;
        //                        }
        //                        if (status == "d")
        //                        {
        //                            TotalDone += 1;
        //                        }
        //                        if (status == "p")
        //                        {
        //                            PartiallyDone += 1;
        //                        }
        //                    }
        //                });

        //                counts.AssignedMachine = TotalAssignedMachinesList.Where(x => x.productId > 0).Count();
        //                counts.AssignedEmployeeRoutes = AssignedRoutes.Count();
        //                counts.TotalDone = TotalDone;
        //                counts.PartiallyDone = PartiallyDone;
        //                counts.NotStarted = NotStarted;
        //                return counts;
        //            }
        //        }

        //        public static List<ProductCustom> GetAssignedMachines(int userId, int roleId, string t)
        //        {
        //            List<ProductCustom> list = new List<ProductCustom>();
        //            using (Entities db = new Entities())
        //            {
        //                var TotalAssignedMachinesList = RoutesAndMachinesByUserId(userId);
        //                TotalAssignedMachinesList.ForEach(d =>
        //                {
        //                    var id = d.productId;
        //                    var obj = db.products.Where(r => r.productId == id && r.isDisable == false).FirstOrDefault();
        //                    if (obj != null)
        //                    {
        //                        var Product = new ProductCustom();
        //                        Product.ImageLocation = obj.imageLocation;
        //                        Product.ProductId = obj.productId;
        //                        Product.ProductName = obj.productName;
        //                        Product.CreatedBy = obj.createdBy;
        //                        Product.CreatedDate = obj.createdDate;
        //                        Product.SerialNumber = obj.serialNumber;
        //                        Product.RouteId = d.routeId;
        //                        Product.ProductAuditStatus = GetMachineAuditStatus(id, Product.RouteId, userId);
        //                        Product.RouteName = GetRouteNameById(Product.RouteId);
        //                        Product.UserName = GetEmployeeNameById(userId);
        //                        list.Add(Product);
        //                    }
        //                });

        //                if (t == "n")
        //                {
        //                    return list.Where(x => x.ProductAuditStatus == "n").ToList();
        //                }
        //                if (t == "d")
        //                {
        //                    return list.Where(x => x.ProductAuditStatus == "d").ToList();
        //                }
        //                if (t == "p")
        //                {
        //                    return list.Where(x => x.ProductAuditStatus == "p").ToList();
        //                }
        //                return list;
        //            }
        //        }

        //        public static List<questionnaire> GetAllQuestions()
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                return db.questionnaires.ToList();
        //            }
        //        }

        //        public static bool SaveMachineNote(productNote note)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                if (note.noteId < 0)
        //                    note.noteId = 0;
        //                note.createDate = DateTime.Now;
        //                db.productNotes.Add(note);
        //                db.SaveChanges();
        //                return true;
        //            }
        //            return false;
        //        }

        //        public static productNote getMachineNoteById(int Id)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                var Note = db.productNotes.Where(x => x.noteId == Id).FirstOrDefault() ?? new productNote();
        //                return Note;
        //            }
        //        }
        //        public static List<productNote> getMachineNoteByMachineId(int Id, int routeId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                db.Configuration.LazyLoadingEnabled = false;   
        //                var Notes = db.productNotes.Where(x => x.productId == Id && x.routeId == routeId).OrderByDescending(dte => dte.createDate).ToList() ?? new List<productNote>();
        //                return Notes;
        //            }
        //        }

        //        private static string GetMachineAuditStatus(int machineId, int routeId, int userId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                var listQuestion = db.questionnaires.Select(x => x.questionId).ToList();
        //                var listAnswersDone = db.productAudits.Where(x => x.userId == userId && x.productId == machineId && x.routeId == routeId).Select(x => x.questionId ?? 0).ToList();
        //                var difference = listQuestion.Except(listAnswersDone);
        //                if (difference != null && difference.Any() && difference.Count() == listQuestion.Count)
        //                {
        //                    return "n";
        //                }
        //                else if (difference != null && difference.Any() && difference.Where(x => x != 0).Any())
        //                {
        //                    return "p";
        //                }
        //                else if (difference == null || !difference.Any())
        //                {
        //                    return "d";

        //                }
        //            }
        //            return "";
        //        }

        //        public static string GetRouteNameById(int routeId)
        //        {
        //            using (Entities db = new Entities())
        //            {

        //                var Route = db.routes.Where(x => x.routeId == routeId).FirstOrDefault();
        //                if (Route != null)
        //                    return Route.routeName;
        //            }
        //            return "";
        //        }
        //        public static string GetEmployeeNameById(int userId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                var User = db.AspNetUsers.Where(x => x.Id == userId).FirstOrDefault();
        //                if (User != null)
        //                    return User.FirstName + " " + User.LastName;
        //            }
        //            return "";
        //        }

        //        public static QuestionsAnswersCustom GetDefaultQuestion(int machineId, int routeId)
        //        {
        //            QuestionsAnswersCustom questionsAnswers = new QuestionsAnswersCustom();
        //            using (Entities db = new Entities())
        //            {
        //                //db.Configuration.LazyLoadingEnabled = false;                
        //                int? minimumQuestionId = 1;
        //                int totalQuestionCount = db.questionnaires.Count();
        //                int productAuditQuestionCount = db.productAudits.Where(prod => prod.productId == machineId && prod.routeId == routeId).Count();
        //                if (productAuditQuestionCount != totalQuestionCount && productAuditQuestionCount != 0)
        //                {
        //                    int loopcheck = 0;
        //                    var questionAnsweredList = db.productAudits.Where(prod => prod.productId == machineId && prod.routeId == routeId).Select(questionList =>
        //                       new
        //                       {
        //                           questionId = questionList.questionId
        //                       }).ToList();
        //                    if (questionAnsweredList.Count == 1 && questionAnsweredList[0].questionId == 1)
        //                    {
        //                        minimumQuestionId = 2;
        //                        loopcheck = 1;
        //                    }
        //                    questionAnsweredList = questionAnsweredList.OrderBy(quest => quest.questionId).ToList();


        //                    for (int i = 0; i < db.questionnaires.Count() && loopcheck != 1; i++)
        //                    {
        //                        if (questionAnsweredList.Count == i)
        //                        {
        //                            loopcheck = 1;
        //                            minimumQuestionId = i + 1;
        //                        }
        //                        else if (questionAnsweredList[i].questionId !=  i +1)
        //                        {
        //                            loopcheck = 1;
        //                            minimumQuestionId = i + 1;
        //                        }
        //                    }

        //                    //for (int i = 1; i <= db.questionnaires.Count() && loopcheck != 1; i++)
        //                    //{
        //                    //    if (i - 1 < questionAnsweredList.Count)
        //                    //    {
        //                    //        if (questionAnsweredList.Count != 1 && questionAnsweredList[i - 1].questionId != i)
        //                    //        {
        //                    //            minimumQuestionId = i;
        //                    //            break;
        //                    //        }
        //                    //    }
        //                    //    else
        //                    //    {
        //                    //        minimumQuestionId = i;
        //                    //        loopcheck = 1;
        //                    //        break;
        //                    //    }
        //                    //}
        //                }
        //                ///var columnMaxId = db.ProductAudit.Where(x => x.ProductId == machineId && x.RouteId == routeId).Select(x => x.QuestionId).ToList().Max() ?? 0;
        //                //var questionTOFind = columnMaxId > 0 ? columnMaxId : (db.Questionnaire.OrderBy(x => x.QuestionId).FirstOrDefault().QuestionId);

        //                questionsAnswers = GetQuestionData((minimumQuestionId > 0), minimumQuestionId, machineId, routeId);
        //            }
        //            return questionsAnswers;
        //        }

        //        public static QuestionsAnswersCustom GetNextQuestion(int currentQuestionId, int machineId, int routeId)
        //        {
        //            QuestionsAnswersCustom questionsAnswers = new QuestionsAnswersCustom();
        //            using (Entities db = new Entities())
        //            {
        //                var nextQuestion = db.questionnaires.Where(x => x.questionId > currentQuestionId).Select(c => c.questionId).Min();
        //                var questionToFind = db.productAudits
        //                    .Where(x => x.productId == machineId && x.routeId == routeId && x.questionId == nextQuestion)
        //                    .OrderBy(x => x.questionId)
        //                    .ToList()
        //                    .Select(x => x.questionId).Min() ?? 0;
        //                var nextQuestionId = questionToFind > 0 ? questionToFind : nextQuestion;

        //                questionsAnswers = GetQuestionData((questionToFind > 0), nextQuestionId, machineId, routeId);
        //            }
        //            return questionsAnswers;
        //        }
        //        public static QuestionsAnswersCustom GetPreviousQuestion(int currentQuestionId, int machineId, int routeId)
        //        {
        //            QuestionsAnswersCustom questionsAnswers = new QuestionsAnswersCustom();
        //            using (Entities db = new Entities())
        //            {
        //                var nextQuestion = db.questionnaires.Where(x => x.questionId < currentQuestionId).Select(c => c.questionId).Max();
        //                var questionToFind = db.productAudits
        //                    .Where(x => x.productId == machineId && x.routeId == routeId && x.questionId == nextQuestion)
        //                    .OrderBy(x => x.questionId)
        //                    .ToList()
        //                    .Select(x => x.questionId).Max() ?? 0;
        //                var nextQuestionId = questionToFind > 0 ? questionToFind : nextQuestion;

        //                questionsAnswers = GetQuestionData((questionToFind > 0), nextQuestionId, machineId, routeId);
        //            }
        //            return questionsAnswers;
        //        }
        //        public static object saveAnswer(QuestionsAnswersCustom answer, string _env)
        //        {
        //            _env = "~/AnswerImages";
        //            if (answer == null) { return false; }
        //            using (Entities db = new Entities())
        //            {
        //                if (answer.AnswerId > 0)
        //                {
        //                    var alreadySavedAudit = db.productAudits.Where(x => x.questionId == answer.QuestionId && x.productId == answer.ProductId && x.routeId == answer.RouteId && answer.AnswerId == x.productAuditId).FirstOrDefault();
        //                    if (alreadySavedAudit != null)
        //                    {
        //                        if (answer.QuestionType == "picture")
        //                        {
        //                            var recentaImagePath = answer.AnswerDiscription;
        //                            //var recentaImagePath = answer.AnswerDiscription.Split("AnswerImages").LastOrDefault();
        //                            if (alreadySavedAudit.imagePath == "AnswerImages" + recentaImagePath)
        //                            {
        //                                return 1;
        //                            }
        //                            alreadySavedAudit.AnswerDescription = "";
        //                            if (IsBase64Image(answer.AnswerDiscription))
        //                            {
        //                                alreadySavedAudit.imagePath = SaveImageFile(answer, _env);
        //                            }
        //                        }
        //                        else
        //                        {
        //                            if (alreadySavedAudit.AnswerDescription == answer.AnswerDiscription)
        //                            {
        //                                return 1;
        //                            }
        //                            alreadySavedAudit.AnswerDescription = answer.AnswerDiscription;
        //                        }
        //                    }
        //                    db.SaveChanges();
        //                    return true;
        //                }
        //                else
        //                {
        //                    if (!string.IsNullOrEmpty(answer.AnswerDiscription))
        //                    {
        //                        productAudit audit = new productAudit();
        //                        audit.createdBy = answer.CreatedBy;
        //                        audit.createdDate = DateTime.Now;
        //                        audit.AnswerDescription = answer.AnswerDiscription;
        //                        if (answer.QuestionType == "picture")
        //                        {
        //                            string FilePath = SaveImageFile(answer, _env);
        //                            audit.imagePath = FilePath;
        //                        }
        //                        audit.productId = answer.ProductId;
        //                        audit.questionId = answer.QuestionId;
        //                        audit.routeId = answer.RouteId;
        //                        audit.updatedBy = answer.CreatedBy;
        //                        audit.userId = answer.CreatedBy;
        //                        audit.updatedDate = DateTime.Now;
        //                        db.productAudits.Add(audit);
        //                        db.SaveChanges();
        //                        return true;
        //                    }
        //                    return 1;
        //                }
        //            }
        //        }
        //        private static int GetFirstQuestionId()
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                return db.questionnaires.OrderBy(x => x.questionId).FirstOrDefault().questionId;
        //            }
        //        }
        //        private static int GetLastQuestion()
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                db.Configuration.LazyLoadingEnabled = false;
        //                int totalQuestionCount = db.questionnaires.Count();
        //                //return db.questionnaires.OrderBy(x => x.questionId).LastOrDefault().questionId;
        //                return totalQuestionCount;
        //            }
        //        }
        //        private static int GetTotalQuestion()
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                return db.questionnaires.Count();
        //            }
        //        }
        //        private static int GetQuestionNumber(int questionId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                var Questions = db.questionnaires.ToList();
        //                var Index = Questions.IndexOf(Questions.Where(x => x.questionId == questionId).FirstOrDefault());
        //                return Index + 1;

        //            }
        //        }
        //        private static int GetTotalDone(int machineId, int routeId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                //var TotalQuestion = db.Questionnaire.Count();
        //                return db.productAudits.Where(x => x.routeId == routeId && x.productId == machineId).Select(c => c.questionId).Distinct().Count();
        //                //return TotalQuestion - TotalAnswersed;
        //            }
        //        }

        //        private static QuestionsAnswersCustom GetQuestionData(bool checkAuditTable, int? questionId, int machineId, int routeId)
        //        {
        //            QuestionsAnswersCustom questionsAnswers = new QuestionsAnswersCustom();
        //            using (Entities db = new Entities())
        //            {
        //                db.Configuration.LazyLoadingEnabled = false;
        //                if (checkAuditTable)
        //                {
        //                    var Question = db.questionnaires.Where(x => x.questionId == questionId).FirstOrDefault();
        //                    if (Question != null)
        //                    {
        //                        questionsAnswers.QuestionId = Question.questionId;
        //                        questionsAnswers.QuestionDescription = Question.questionDescription;
        //                        questionsAnswers.RouteId = routeId;
        //                        var AuditAnswer = db.productAudits.Where(x => x.productId == machineId && x.routeId == routeId && x.questionId == questionsAnswers.QuestionId).FirstOrDefault() ?? new productAudit();
        //                        questionsAnswers.AnswerDiscription = AuditAnswer.AnswerDescription;
        //                        questionsAnswers.QuestionType = Question.questionType;
        //                        questionsAnswers.AnswerId = AuditAnswer.productAuditId;
        //                        questionsAnswers.QuestionDate = AuditAnswer.createdDate ?? DateTime.Now;
        //                        if (questionsAnswers.QuestionType == "picture")
        //                        {
        //                            questionsAnswers.AnswerDiscription = AuditAnswer.imagePath;
        //                        }
        //                        else
        //                        {
        //                            questionsAnswers.AnswerDiscription = AuditAnswer.AnswerDescription;
        //                        }
        //                        questionsAnswers.QuestionOptions = new List<questionOption>();
        //                        var option = db.questionOptions.Where(x => x.questionId == Question.questionId).ToList() ?? new List<questionOption>();
        //                        option.ForEach(x =>
        //                        {
        //                            questionOption newOption = new questionOption();
        //                            newOption.createdBy = x.createdBy;
        //                            newOption.createdDate = x.createdDate;
        //                            newOption.optionDescription = x.optionDescription;
        //                            newOption.optionId = x.optionId;
        //                            newOption.questionId = x.questionId;
        //                            newOption.updatedBy = x.updatedBy;
        //                            newOption.updatedDate = x.updatedDate;
        //                            questionsAnswers.QuestionOptions.Add(newOption);
        //                        });
        //                        questionsAnswers.LastQuestionId = GetLastQuestion();
        //                        questionsAnswers.FirstQuestionId = GetFirstQuestionId();
        //                        questionsAnswers.TotalDone = GetTotalDone(machineId, routeId);
        //                        questionsAnswers.TotalQuestion = GetTotalQuestion();
        //                        questionsAnswers.questionNumber = GetQuestionNumber(Question.questionId);
        //                        return questionsAnswers;
        //                    }
        //                }
        //                else
        //                {
        //                    var Question = db.questionnaires.Where(x => x.questionId == questionId).FirstOrDefault();
        //                    if (Question != null)
        //                    {
        //                        //Question.QuestionId = 6;
        //                        //Question.QuestionType = "checkbox";
        //                        questionsAnswers.QuestionId = Question.questionId;
        //                        questionsAnswers.QuestionDescription = Question.questionDescription;
        //                        questionsAnswers.RouteId = routeId;
        //                        questionsAnswers.QuestionType = Question.questionType;
        //                        questionsAnswers.QuestionOptions = new List<questionOption>();
        //                        var option = db.questionOptions.Where(x => x.questionId == Question.questionId).ToList() ?? new List<questionOption>();
        //                        option.ForEach(x =>
        //                        {
        //                            questionOption newOption = new questionOption();
        //                            newOption.createdBy = x.createdBy;
        //                            newOption.createdDate = x.createdDate;
        //                            newOption.optionDescription = x.optionDescription;
        //                            newOption.optionId = x.optionId;
        //                            newOption.questionId = x.questionId;
        //                            newOption.updatedBy = x.updatedBy;
        //                            newOption.updatedDate = x.updatedDate;
        //                            questionsAnswers.QuestionOptions.Add(newOption);
        //                        });
        //                        questionsAnswers.QuestionDate = Question.createdDate ?? DateTime.Now;
        //                        questionsAnswers.LastQuestionId = GetLastQuestion();
        //                        questionsAnswers.FirstQuestionId = GetFirstQuestionId();
        //                        questionsAnswers.TotalDone = GetTotalDone(machineId, routeId);
        //                        questionsAnswers.TotalQuestion = GetTotalQuestion();
        //                        questionsAnswers.questionNumber = GetQuestionNumber(Question.questionId);
        //                        return questionsAnswers;
        //                    }
        //                }
        //            }
        //            return questionsAnswers;
        //        }


        //        private static List<productRoute> RoutesAndMachinesByUserId(int userId)
        //        {
        //            try
        //            {
        //                using (Entities db = new Entities())
        //                {
        //                    var TotalAssignedMachinesList = new List<productRoute>();
        //                    var EmployeeTotalRoutes = db.employeeRoutes.Where(x => x.userId == userId).ToList();
        //                    var AssignedRoutes = EmployeeTotalRoutes.Select(x => x.routeId).Distinct().ToList();
        //                    var EmployeeProductRouteIds = EmployeeTotalRoutes.Select(x => x.productRouteId).Distinct().ToList();

        //                    EmployeeProductRouteIds.ForEach(x =>
        //                    {
        //                        TotalAssignedMachinesList.Add(db.productRoutes.Where(c => c.productRouteId == x).FirstOrDefault() ?? new productRoute());
        //                    });
        //                    return TotalAssignedMachinesList;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return new List<productRoute>();
        //            }
        //        }
        //        //public Image LoadImage()
        //        //{
        //        //	//data:image/gif;base64,
        //        //	//this image is a single pixel (black)
        //        //	byte[] bytes = Convert.FromBase64String("R0lGODlhAQABAIAAAAAAAAAAACH5BAAAAAAALAAAAAABAAEAAAICTAEAOw==");


        //        //	using (System.IO.MemoryStream ms = new MemoryStream(bytes))
        //        //	{
        //        //		image = Image.FromStream(ms);
        //        //	}

        //        //	return image;
        //        //}

        //        private static string SaveImageFile(QuestionsAnswersCustom answer, string env)
        //        {
        //            try
        //            {
        //                var split = answer.AnswerDiscription.Split(',');//.LastOrDefault();
        //                string OrignalString = split.LastOrDefault();

        //                //Convert Base64 Encoded string to Byte Array.
        //                if (!string.IsNullOrEmpty(OrignalString))
        //                {
        //                    byte[] imageBytes = Convert.FromBase64String(OrignalString);
        //                    string rootpath = env;
        //                    string folderPath = "AnswerImages//Route" + answer.RouteId + "//Product" + answer.ProductId + "//Question" + answer.QuestionId;
        //                    string CompleteFolderPath = Path.Combine(rootpath + "//" + folderPath);
        //                    if (!Directory.Exists(CompleteFolderPath))
        //                    {
        //                        Directory.CreateDirectory(CompleteFolderPath);
        //                    }
        //                    var imageName = "//answer" + answer.AnswerId + DateTime.Now.ToString("MMdddyyyhhmmss") + "." + getImageType(answer.AnswerDiscription) + "";
        //                    File.WriteAllBytes(Path.Combine(CompleteFolderPath + imageName), imageBytes);
        //                    return folderPath + imageName;
        //                }
        //            }
        //            catch (Exception ex)
        //            {
        //                return "";
        //            }
        //            return "";
        //        }
        //        public static bool IsBase64Image(string imageString)
        //        {
        //            var spt = imageString.Split(',');
        //            var imageType = spt.FirstOrDefault();
        //            if (!string.IsNullOrEmpty(imageType) && imageType.Contains("base64"))
        //                return true;
        //            return false;
        //        }
        //        public static string getImageType(string imageString)
        //        {
        //            var spt = imageString.Split(',');
        //            var imageType = spt.FirstOrDefault();
        //            if (!string.IsNullOrEmpty(imageType))
        //            {
        //                var sub = imageType.Split(';').FirstOrDefault();
        //                if (!string.IsNullOrEmpty(sub))
        //                {
        //                    var OrignalTYpe = sub.Split('/').LastOrDefault();
        //                    return OrignalTYpe;
        //                }
        //            }
        //            return "";

        //        }

        //        public static bool GetEmployeeRouteByEmployeeId(int userId, int routeId)
        //        {
        //            using (Entities db = new Entities())
        //            {
        //                return db.employeeRoutes.FirstOrDefault(empId => empId.userId == userId && empId.routeId == routeId).productRouteId != null ? true : false;
        //            }
        //        }
    }
}