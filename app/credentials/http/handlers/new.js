exports = module.exports = function(csrfProtection, authenticate, errorLogging, ceremony) {
  
  return [
    ceremony('credentials/bind',
      csrfProtection(),
      authenticate('session'),
      function(req, res, next) {
        // FIXME: for some reason this is necessary to get req.user populated?
        //console.log('bind, about to authenticate!!!!!');
        //console.log(req.user)
        next();
      }
    ),
    // Should GET requests that error with a state destroy the state?  I think not
    // There needs to be an option for it (external?) that does, for eg OAuth
    errorLogging()
  ];
};

exports['@require'] = [
  'http://i.bixbyjs.org/http/middleware/csrfProtection',
  'http://i.bixbyjs.org/http/middleware/authenticate',
  'http://i.bixbyjs.org/http/middleware/errorLogging',
  'http://i.bixbyjs.org/http/middleware/ceremony'
];
