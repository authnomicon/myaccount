exports = module.exports = function(otp, oob) {
  var path = require('path')
    , ejs = require('ejs')
    , dispatch = require('../../../../lib/dispatch');
  
  
  function initialize(req, res, next) {
    res.locals.csrfToken = req.csrfToken();
    next();
  }
  
  function typed(req, res, next) {
    var type = req.query.type;
    
    switch (type) {
    case 'otp':
      return dispatch(otp)(null, req, res, next);
    case 'oob':
      return dispatch(oob)(null, req, res, next);
    case undefined:
      return next();
    default:
      return next(new Error('Unsupported authenticator type: ' + type));
    }
  }
  
  function render(req, res, next) {
    
    
    res.render('credentials/new', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../views/new.ejs');
        //var view = path.resolve(__dirname, '../views/identifier-first.ejs');
        ejs.renderFile(view, res.locals, function(err, str) {
          if (err) { return next(err); }
          res.send(str);
        });
        return;
      } else if (err) {
        return next(err);
      }
      res.send(str);
    });
  };
  

  return [
    initialize,
    typed,
    render
  ];
};

exports['@require'] = [
  './prompt/otp',
  './prompt/oob'
];
