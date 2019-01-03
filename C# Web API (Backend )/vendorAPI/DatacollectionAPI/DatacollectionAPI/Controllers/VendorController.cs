using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using DatacollectionAPI.VendorsModel;
using DatacollectionAPI.Helper;
using System.Data.Entity;
using System.IO;

namespace DatacollectionAPI.Controllers
{
    //[Route("api/[controller]/[Action]")]
    //[RoutePrefix("api/[controller]")]
    public class VendorController : ApiController
    {
        // private IHostingEnvironment _env;
        public VendorController() //IHostingEnvironment env
        {
        }
        //        //GET api/values

        [HttpGet]
        public IHttpActionResult GetVendorList()
        {
            var userList = VendorHelper.GetAllVendors();
            return Ok(userList);
       }

        [HttpGet]
        public IHttpActionResult GetProductsByVendor(int vendorId)
        {
            try
            {
                var result = VendorHelper.getProductsByVendorId(vendorId);
                return Ok(result);
            }
            catch (IOException ex)
            {
                return Ok(ex);
            }
        }
        [HttpGet]
        public IHttpActionResult getOrdersList(int customerId)
        {
            try
            {
                var result = VendorHelper.getOrdersByCustomer(customerId);
                return Ok(result);
            }
            catch (IOException ex)
            {
                return Ok(ex);
            }
        }
        
        [HttpGet]
        public IHttpActionResult orderProducts(bool productSelected,int productId,string quantity,string customerId)
        {
            try
            {
                string result = VendorHelper.postOrder(productSelected,productId,quantity,customerId);
                return Ok(result);
            }
            catch (IOException ex)
            {
                return Ok(ex);
            }
        }
        }
}
