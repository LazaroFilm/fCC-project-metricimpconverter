/*
*
*
*       Complete the handler logic below
*       
*       
*/

function ConvertHandler() {

  this.getNum = function(input, res) {
    const splitInput = input.split(/([a-zA-Z]+)/);
    let result;
    if (!splitInput[0]) {
      result = 1;
    } else if ((splitInput[0].match(/\//g) || []).length === 1) {
      result = eval(splitInput[0]);
    } else if (isNaN(splitInput[0])) {
      console.log("bad number")
      error = "invalid number";
    } else {
      result = splitInput[0];
    };
    return result;
  };

  this.getUnit = function(input, res) {
    const splitInput = input.split(/([a-zA-Z]+)/);
    let result;
    if (!splitInput[1]) {
      result = 'none';
      if (error == "invalid number") {
        console.log("bad both")
        error = "invalid number and unit";
      } else {
        error = "invalid unit";
      };
    } else if (splitInput[1].toLowerCase() == 'l') {
      result = 'L';
    } else {
      result = splitInput[1].toLowerCase()
    }
    return result;
  };

  this.getReturnUnit = function(initUnit) {
    const returnedUnit = {
      "gal": "L",
      "L": "gal",
      "lbs": "kg",
      "kg": "lbs",
      "mi": "km",
      "km": "mi"
    }
    let result = returnedUnit[initUnit];
    // console.log('returnUnit: ', result)
    return result;
  };

  this.spellOutUnit = function(unit) {
    const units = {
      'gal': "gallons",
      'L': "liters",
      'lbs': "pounds",
      'kg': "kilos",
      'mi': "miles",
      'km': "kilo-meters"
    };
    let result = units[unit];
    // console.log("spellOutUnit: ", result);
    return result;
  };

  this.convert = function(initNum, initUnit, error) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    switch (initUnit) {
      case 'gal':
        return (initNum * galToL).toFixed(5);
      case 'L':
        return (initNum / galToL).toFixed(5);
      case 'lbs':
        return (initNum * lbsToKg).toFixed(5);
      case 'kg':
        return (initNum / lbsToKg).toFixed(5);
      case 'mi':
        return (initNum * miToKm).toFixed(5);
      case 'km':
        return (initNum / miToKm).toFixed(5);
      default:
        console.log("oops", error)
        if (error == "invalid number" || error == "invalid number and unit") {
          error = "invalid number and unit poop";
        } else {
          error = "invalid unit";
        };
        break;
    };
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    // console.log("string; ", result)
    return result;
  };

}

module.exports = ConvertHandler;
