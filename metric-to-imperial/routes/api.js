'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    const input = req.query.input;
    let number; 
    try {
      number = convertHandler.getNum(input);
    } catch(err) {
      number = "invalid number";
    }
    let unit; 
    try {
      unit = convertHandler.getUnit(input);
    } catch(err) {
      unit = "invalid unit";
    }
    if (number == "invalid number" && unit == "invalid unit") {
      res.send("invalid number and unit")
    } else if (number == "invalid number") { 
      res.send("invalid number")
    } else if (unit == "invalid unit") {
      res.send("invalid unit")
    } else {
      const returnNum = convertHandler.convert(number, unit);
      const returnUnit = convertHandler.getReturnUnit(unit);
      const result = {
        initNum: number,
        initUnit: unit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: convertHandler.getString(number, unit, returnNum, returnUnit)
      }
      res.json(result);
    }
  })
};
