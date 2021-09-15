module.exports =  function Customers(database) {
  const TABLE_NAME = 'customers';
  const USERS_COL = [
    'first_name',
    'last_name',
    'avatar',
  ]

  this.getCustomersByType = async function() {
    return database(TABLE_NAME)
    .select()
    .innerJoin('directus_users as cu', `${TABLE_NAME}.user_created`, 'cu.id' )
    .innerJoin('directus_users as uu', `${TABLE_NAME}.user_updated`, 'uu.id' )
    .innerJoin('directus_users as ui', `${TABLE_NAME}.user_incharge`, 'ui.id' )
    .select(['cu.first_name as created_customer', 'uu.first_name as updated_user', 'ui.first_name'])
    .limit(1);
  }

  this.createNewCustomer = async function(data) {
    return database(TABLE_NAME).insert(data);
  }

  this.getCustomerByID = async function(id, returningColumns) {
    return database(TABLE_NAME).where('id', id).select(returningColumns);
  }
}