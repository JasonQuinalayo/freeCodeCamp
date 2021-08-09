function ConvertHandler() {


  this.splitInput = input => {
    const inputNoWhiteSpaces = input.replace(/\s/g, '');
    let i;
    for (i = 0; i < inputNoWhiteSpaces.length; i++) {
      let chr = inputNoWhiteSpaces.charAt(i);
      if (chr.toUpperCase() != chr.toLowerCase()) break;
    }
    let number = inputNoWhiteSpaces.slice(0,i);
    let unit = inputNoWhiteSpaces.slice(i);
    return {number: number, unit: unit};
  }

  this.getNum = function(input) {
    let inputNumberRegex = /^(?<numerator>\d*\.?\d+|\d+\.?\d*)(?:\/(?<denominator>\d*\.?\d+|\d+\.?\d*))?$/;
    const numberInput = this.splitInput(input).number;
    if (numberInput == '') return 1;
    const parsedNumber = numberInput.match(inputNumberRegex);
    if (parsedNumber == null) throw new Error("invalid number");
    if (typeof parsedNumber.groups.denominator == 'undefined') {
      console.log(parseFloat(parsedNumber.groups.numerator))
      return parseFloat(parsedNumber.groups.numerator);
    }
    return parseFloat(parsedNumber.groups.numerator) / parseFloat(parsedNumber.groups.denominator);
  };
  
  this.getUnit = function(input) {
    const unitInput = this.splitInput(input).unit.toLowerCase();
    const units = ['gal', 'mi', 'km', 'lbs', 'kg'];
    if (unitInput == 'l') return 'L'
    if (units.includes(unitInput)) return unitInput;
    throw new Error("invalid unit");
  };
  
  this.getReturnUnit = function(initUnit) {
    const returnUnits = {
      gal:'L',
      'L':'gal',
      mi:'km',
      km:'mi',
      lbs:'kg',
      kg:'lbs'
    }
    return returnUnits[initUnit];
  };

  this.spellOutUnit = function(unit) {
    const spelledOut = {
      gal:'gallons',
      'L':'liters',
      mi:'miles',
      km:'kilometers',
      lbs:'pounds',
      kg:'kilograms'
    }
    return spelledOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal':
        result = initNum * galToL
        break;
      case 'L':
        result = initNum * (1 / galToL)
        break;
      case 'mi':
        result = initNum * miToKm
        break;
      case 'km':
        result = initNum * (1 / miToKm)
        break;
      case 'lbs':
        result = initNum * lbsToKg
        break;
      case 'kg':
        result = initNum * (1 / lbsToKg)
        break;
      default:
        result = null
        break;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    const result = initNum + ' ' + this.spellOutUnit(initUnit) + ' converts to ' + returnNum + ' ' + this.spellOutUnit(returnUnit);
    return result;
  };
  
}

module.exports = ConvertHandler;
