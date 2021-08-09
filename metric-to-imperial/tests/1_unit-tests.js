const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  const e = 0.00001;
  test('whole number input', function() {
    assert.deepEqual(42, convertHandler.getNum('42L'));
  })
  test('decimal number input', function() {
    assert.deepEqual(31.1, convertHandler.getNum('31.1mi'));
  })
  test('fractional input', function() {
    assert.deepEqual(0.5, convertHandler.getNum('1/2lbs'));
  })
  test('fractional input with decimal', function() {
    assert.deepEqual(2, convertHandler.getNum('3/1.5kg'));
  })
  test('error on double fractions', function() {
    assert.throws(()=>convertHandler.getNum('1/2/2gal'), "invalid number");
  })
  test('default to 1 when no number input', function() {
    assert.deepEqual(1, convertHandler.getNum('km'));
  })
  test('every valid input unit', function() {
    const allValidInputUnits = {
      gal: ['gal', 'Gal', 'gAl', 'gaL', 'GAl', 'gAL', 'GaL', 'GAL'],
      'L': ['l', 'L'],
      mi: ['mi', 'Mi', 'mI', 'MI'],
      km: ['km', 'Km', 'kM', 'KM'],
      lbs: ['lbs', 'Lbs', 'lBs', 'lbS', 'LBs', 'lBS', 'LbS', 'LBS'],
      kg: ['kg', 'Kg', 'kG', 'KG']
    }
    for (const unit in allValidInputUnits) {
      allValidInputUnits[unit].forEach(a=> {
        assert.deepEqual(unit, convertHandler.getUnit(a));
      })
    }
  })
  test('error for invalid unit', function() {
    assert.throws(()=>convertHandler.getUnit('123slakdfj'), 'invalid unit');
  })
  test('return the correct return unit for every valid input unit', function() {
    const allValidInputUnits = {
      'L': ['gal', 'Gal', 'gAl', 'gaL', 'GAl', 'gAL', 'GaL', 'GAL'],
      gal: ['l', 'L'],
      km: ['mi', 'Mi', 'mI', 'MI'],
      mi: ['km', 'Km', 'kM', 'KM'],
      kg: ['lbs', 'Lbs', 'lBs', 'lbS', 'LBs', 'lBS', 'LbS', 'LBS'],
      lbs: ['kg', 'Kg', 'kG', 'KG']
    }
    for (const unit in allValidInputUnits) {
      allValidInputUnits[unit].forEach(a=> {
        assert.deepEqual(unit, convertHandler.getReturnUnit(convertHandler.getUnit(a)));
      })
    }
  })
  test('correct spelled out string for each valid input unit', function() {
    const allValidInputUnits = {
      gallons: ['gal', 'Gal', 'gAl', 'gaL', 'GAl', 'gAL', 'GaL', 'GAL'],
      liters: ['l', 'L'],
      miles: ['mi', 'Mi', 'mI', 'MI'],
      kilometers: ['km', 'Km', 'kM', 'KM'],
      pounds: ['lbs', 'Lbs', 'lBs', 'lbS', 'LBs', 'lBS', 'LbS', 'LBS'],
      kilograms: ['kg', 'Kg', 'kG', 'KG']
    }
    for (const unit in allValidInputUnits) {
      allValidInputUnits[unit].forEach(a=> {
        assert.deepEqual(unit, convertHandler.spellOutUnit(convertHandler.getUnit(a)));
      })
    }
  })
  test('gal to L test', function() {
    assert.approximately(3.78541, convertHandler.convert(1, 'gal'), e);
  })
  test('L to gal test', function() {
    assert.approximately(1/3.78541, convertHandler.convert(1, 'L'), e);
  })
  test('mi to km test', function() {
    assert.approximately(1.60934, convertHandler.convert(1, 'mi'), e);
  })
  test('km to mi test', function() {
    assert.approximately(1/1.60934, convertHandler.convert(1, 'km'), e);
  })
  test('kg to lbs test', function() {
    assert.approximately(2.20462, convertHandler.convert(1, 'kg'), e);
  })
  test('lbs to kg test', function() {
    assert.approximately(1/2.20462, convertHandler.convert(1, 'lbs'), e);
  })
});