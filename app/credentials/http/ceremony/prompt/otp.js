exports = module.exports = function(otp) {
  var path = require('path')
    , ejs = require('ejs');
  
  
  function generate(req, res, next) {
    var type = req.query.algorithm || 'totp';
  
    otp.generate(type, function(err, cred) {
      if (err) { return next(err); }
    
      var qr = 'https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=' + encodeURIComponent(cred.barcodeURL);
    
      res.locals.barcodeURL = qr;
      next();
    });
  }
  
  function render(req, res, next) {
    res.render('credentials/new/otp', function(err, str) {
      if (err && err.view) {
        var view = path.resolve(__dirname, '../../views/new/otp.ejs');
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
    generate,
    render
  ];
};

exports['@require'] = [
  'http://schemas.authnomicon.org/js/cs/otp'
];
