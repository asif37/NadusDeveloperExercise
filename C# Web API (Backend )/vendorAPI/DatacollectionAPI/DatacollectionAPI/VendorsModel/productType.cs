//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace DatacollectionAPI.VendorsModel
{
    using System;
    using System.Collections.Generic;
    
    public partial class productType
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public productType()
        {
            this.products = new HashSet<product>();
        }
    
        public int productTypeId { get; set; }
        public string productTypeName { get; set; }
        public Nullable<System.DateTime> createdDate { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<product> products { get; set; }
    }
}
