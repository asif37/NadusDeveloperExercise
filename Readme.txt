
1) Name

   Kashif Hameed

2) Brief instructions for using your solution

   Restored database using given .bac file from Sql server 2016
   Build Backed C# API project
   Change ConnectionString from Web.confiq file, replace with you Sql Server name
   Open Sql Server 2016
   Create Empty Database Named as "VendorDatabase" and open given sql query in SqlServer and Excute that Query, it gonna create Database with default data
   Open frontend solition on Visual Studio Code
   From Terminal Run this command "npm install" for installing required packages
   after packges installed, run this command "ng serve -o" to open application on browser
   Login through below Users
        i) Email     : asif_hameed_37@hotmail.com
           Password  : Umer2019
           (Manager of Vendor Branch)

        ii) Email     : umer@gmail.com
            Password  : Umer2019
            (Customer)

3) What mechanism you have adopted (if any) for handling bad data

   Hashed Password for Hashing Password of user (Security reason)
   Enable Cors for verifying calls from authentic frontend source
   Frontend validations for avoiding undefined or null data
   Not nullable fields for making sure data is added accurately
   fast loading od db calls for disabing database lazy loading on Database calls by below line
   db.Configuration.LazyLoadingEnabled = false;
  

4) Which libraries are used by your project and the reason for their use  

   Backend =>

   Identity Used as backend for managign Identity of user  (it provide much flexibilty and bult
                                                             in methods for managing identity, without this custom implementation gonna call & that is time consuming thing)
   System.Web.Cors for verifying calls from authentic source
   Linq Query used for handling complex quiries over joins

   Frontend =>

   Angular Material used (Best UI libarary supported by Material)
   Toast service for displaying user helpfull error/success messages
   Auth Guard services for verifying Manager and Customer logged in, based on it Access levels to users given
    

5) A brief explanation of the architecture and methodologies used within your solution
   
    Angular 6 framework as frontend
    Asp.Net C# Web API as backend
    Entity Framework Database first approach


6) Any assumptions you made when interpreting the specification
  
   Two vendors having products already created 
   2 users belongs to a vendor created

8) If you run out of time, prefer to cut aesthetics, expansiveness and capacity rather than quality.

   Prefernece is always Quality, & aesthetics, expansiveness and capacity are fairly important for me




|||||||||||  Functionality ||||||||||||||||



This is the View for Manager of a Vendor where he/she can manage his/her vendor details

   i)   can add/remove products from it
   ii)  can update stock
   iii) can update products/products price
   iv)  etc ...

This is View for Customer logged in in this site for shopping

  i)  Customer can select any Vendor (Business) for shopping from specific 
      desired Vendor(say as Brand)
 ii)  on selecting any vendor list of that specific Vendor's products will be displated
 iii) Now Customer can check a checkbox for ordering any product with Quantity he wants
 iv)  If customer want to remove any product from order simply he can unCheck the checkbox
      of that specified product
  as Order is being updating on user adding / removing prodicts from cart

 [To Do]

 Here we can manage Add to Cart functionality where we can add/remove Products
 from cart & on placing order further things gonna happend, as well state of any Order etc ...
 
 => Did only functional things which i can do in this short time

Thanks

