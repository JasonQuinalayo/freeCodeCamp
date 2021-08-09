const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {
  test('valid input GET to /api/convert', function() {
    chai.request(server).get('/api/convert')
      .query({input:'10L'})
      .then(res => {
        assert.deepEqual(res.initNum, 10);
        assert.deepEqual(res.initUnit, 'L');
        assert.deepEqual(res.returnNum, 2.64172);
        assert.deepEqual(res.returnUnit, "gal");
        assert.deepEqual(res.string, "10 liters converts to 2.64172 gallons");
      })
      .catch(err => {
        assert.fail('unable to request server');
      })
  })
  test('invalid input unit GET to /api/convert', function() {
    chai.request(server).get('/api/convert')
      .query({input:'32g'})
      .then(res => {
        assert.deepEqual(res, 'invalid unit');
      })
      .catch(err => {
        assert.fail('unable to request server');
      })
  })
  test('invalid input number GET to /api/convert', function() {
    chai.request(server).get('/api/convert')
      .query({input:'3/7.2/4kg'})
      .then(res => {
        assert.deepEqual(res, 'invalid number');
      })
      .catch(err => {
        assert.fail('unable to request server');
      })
  })
  test('invalid input number AND unit GET to /api/convert', function() {
    chai.request(server).get('/api/convert')
      .query({input:'3/7.2/4kilomegagram'})
      .then(res => {
        assert.deepEqual(res, 'invalid number and unit');
      })
      .catch(err => {
        assert.fail('unable to request server');
      })
  })
  test('no number GET to /api/convert', function() {
    chai.request(server).get('/api/convert')
      .query({input:'kg'})
      .then(res => {
        assert.deepEqual(res.initNum, 1);
        assert.deepEqual(res.initUnit, 'kg');
        assert.deepEqual(res.returnNum, 2.20462);
        assert.deepEqual(res.returnUnit, "lbs");
        assert.deepEqual(res.string, "1 kilograms converts to 2.20462 pounds");
      })
      .catch(err => {
        assert.fail('unable to request server');
      })
  })
});
