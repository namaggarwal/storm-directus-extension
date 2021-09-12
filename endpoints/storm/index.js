const CustomerService = require('./services/CustomerService');
const Customers =  require('./models/Customers');

const ProjectService = require('./services/ProjectService');
const Projects =  require('./models/Projects');
const setUserHook = require('../../hooks/setuser');
const sanitizeInputHook = require('../../hooks/sanitizeValues');

const beforeCreateHooks = [
  sanitizeInputHook()['items.create.before'],
  setUserHook()['items.create.before'],
];

async function applyCreateBeforeRules(input, accountability, collection) {
  for(i in beforeCreateHooks){
    input = await beforeCreateHooks[i](input, {accountability, collection});
  };
  return input;
}

const CUSTOMER_RETURNING_COLUMNS = [
  'id',
  'name',
	'phone',
	'email',
	'nationality',
	'date_of_birth',
	'place_of_birth',
	'nationality',
	'type',
  'created_on',
  'last_updated',
  'user_created',
  'user_updated',
  'user_incharge'
]

module.exports = function registerEndpoint(router, {services, exceptions, database}) {
	router.get('/customers', (req, res, next) => {
    const { accountability } = req;
    const {ServiceUnavailableException} = exceptions;
    const customers = new Customers(database);
    const customerService = new CustomerService(customers);
    customerService.getCustomersByType().then((data => {
      console.log(data);
      res.send({"suc": 1});
    }));
  });
  router.post('/customers', (req, res, next) => {
    const { accountability } = req;
    const {ServiceUnavailableException} = exceptions;
    const customers = new Customers(database);
    const customerService = new CustomerService(customers);
    applyCreateBeforeRules(req.body, accountability, 'custom.customers')
    .then((data) => {
      customerService.addNewCustomer(data).then((data => {
        customerService.getCustomerByID(data[0], CUSTOMER_RETURNING_COLUMNS).then((data) => {
          res.send(data[0]);
        });
      }))
      .catch((error) => {
        console.error(error.message);
        return next(new ServiceUnavailableException("Unexpected error happened"));
      })
    });
  });
  router.post('/projects', (req, res, next) => {
    console.log(req.json());
    res.send({success: true});
  });
};