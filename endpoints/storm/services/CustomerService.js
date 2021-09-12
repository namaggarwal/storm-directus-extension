

module.exports = function CustomerService(customerModel) {
  this.getCustomersByType = async function() {
    return customerModel.getCustomersByType();
  }

  this.getCustomerByID = async function(id, columns) {
    return customerModel.getCustomerByID(id, columns);
  }

  this.addNewCustomer = async function(data) {
    return customerModel.createNewCustomer(data);
  }
}