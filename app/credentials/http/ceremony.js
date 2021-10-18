exports = module.exports = function(launchHandler, promptHandler) {
  
  return {
    launch: launchHandler,
    prompt: promptHandler
  };
};

exports['@implements'] = 'http://i.bixbyjs.org/http/ceremony/Prompt';
exports['@name'] = 'credentials/bind';
exports['@require'] = [
  './ceremony/launch',
  './ceremony/prompt'
];
