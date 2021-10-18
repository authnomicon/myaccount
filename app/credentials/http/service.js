exports = module.exports = function(newHandler) {
  var express = require('express');
  var router = new express.Router();
  
  router.get('/new', newHandler);
  
  return router;
};

// TODO: Move this to a myaccount package
exports['@implements'] = [
  'x-http://i.bixbyjs.org/http/Service',
  'http://schemas.authnomicon.org/js/account/credentials/HTTPService'
];
exports['@path'] = '/credentials';
exports['@require'] = [
  './handlers/new'
];
