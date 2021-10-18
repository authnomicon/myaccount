exports = module.exports = function() {

  function redirect(req, res, next) {
    var options = req.locals || {};
    
    console.log('LAUNCH NEW CREDENTIAL!');
    return res.redirect('/credentials/new');
  }


  return [
    redirect
  ];
};

exports['@require'] = [];
