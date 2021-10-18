/* global describe, it, expect */

var path = require('path');
var chai = require('chai');
var expect = require('chai').expect;
var sinon = require('sinon');
//var factory = require('../../../../../app/otp/http/handlers/enroll/new');


describe.skip('http/otp/handlers/enroll/new', function() {
  
  it('should export factory function', function() {
    expect(factory).to.be.a('function');
  });
  
  it('should be annotated', function() {
    expect(factory['@implements']).to.be.undefined;
    expect(factory['@singleton']).to.be.undefined;
  });
  
  describe('handler', function() {
    var OTP = {
      generate: function(){}
    };
    
    var csrfProtection = function(req, res, next){
      req.csrfToken = function() { return 'JLzW4NxWo'; }
      next();
    };
    
    
    describe('default behavior', function() {
      var response, layout;
      
      before(function() {
        sinon.stub(OTP, 'generate').yields(null, {
          secret: 'E*CLio:cI9AMQkaRVaw!RTQN}Cc)T7Q(',
          barcodeURL: 'otpauth://totp/john.doe@email.com?secret=IUVEGTDJN45GGSJZIFGVC23BKJLGC5ZBKJKFCTT5INRSSVBXKEUA&issuer=ACME%20Co'
        });
      });
      
      after(function() {
        OTP.generate.restore();
      });
      
      before(function(done) {
        var csrfProtectionStub = sinon.stub().returns(csrfProtection);
        var handler = factory(OTP, csrfProtectionStub);
        
        chai.express.handler(handler)
          .req(function(req) {
            req.query = {};
          })
          .res(function(res) {
            res.locals = {};
          })
          .render(function(res, lout) {
            response = res;
            layout = lout;
            done();
          })
          .dispatch();
      });
      
      it('should generate TOTP', function() {
        expect(OTP.generate).to.have.been.calledWith('totp');
      });
      
      it('should render', function() {
        expect(response.statusCode).to.equal(200);
        expect(layout).to.equal(path.resolve('views/otp/enroll.ejs'));
        expect(response.locals.csrfToken).to.equal('JLzW4NxWo');
      });
      
    }); // default behavior
    
  }); // handler
  
});
