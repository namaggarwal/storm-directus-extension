module.exports =  function Customers(database) {
  const TABLE_NAME = 'customers';

  this.getCustomersByType = async function() {
    return database(TABLE_NAME)
    .select()
    .leftJoin('directus_users as u', `${TABLE_NAME}.user_created`, 'u.id' );
  }

  this.createNewCustomer = async function(data) {
    return database(TABLE_NAME).insert(data);
  }

  this.getCustomerByID = async function(id, returningColumns) {
    return database(TABLE_NAME).where('id', id).select(returningColumns);
  }
}