/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */

function ConvertHandler() {
  this.checkErrors = (input) => {
    let numberError = false;
    let unitError = false;
    const units = ["gal", "l", "lbs", "kg", "mi", "km"];
    const splitInput = input.split(/([a-zA-Z]+)/);
    if ((splitInput[0].match(/\//g) || []).length == 1) {
      const fraction = splitInput[0].split(/\//);
      if (isNaN(fraction[0]) || isNaN(fraction[1])) {
        numberError = true;
      }
    } else if (isNaN(splitInput[0])) {
      numberError = true;
    }
    if (!splitInput[1] || !units.includes(splitInput[1].toLowerCase())) {
      unitError = true;
    }
    if (numberError && unitError) {
      throw "invalid number and unit";
    } else if (numberError) {
      throw "invalid number";
    } else if (unitError) {
      throw "invalid unit";
    }
  };

  this.getNum = function (input) {
    const splitInput = input.split(/([a-zA-Z]+)/);
    let result;
    if (!splitInput[0]) {
      return 1;
    } else {
      return eval(splitInput[0]);
    }
  };

  this.getUnit = function (input) {
    const splitInput = input.split(/([a-zA-Z]+)/);
    let result;
    if (splitInput[1].toLowerCase() == "l") {
      return "L";
    } else {
      return splitInput[1].toLowerCase();
    }
  };

  this.getReturnUnit = function (initUnit) {
    const returnedUnit = {
      gal: "L",
      L: "gal",
      lbs: "kg",
      kg: "lbs",
      mi: "km",
      km: "mi",
    };
    return returnedUnit[initUnit];
  };

  this.spellOutUnit = function (unit) {
    const units = {
      gal: "gallons",
      L: "liters",
      lbs: "pounds",
      kg: "kilos",
      mi: "miles",
      km: "kilometers",
    };
    return units[unit];
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;

    switch (initUnit) {
      case "gal":
        return parseFloat((initNum * galToL).toFixed(5));
      case "L":
        return parseFloat((initNum / galToL).toFixed(5));
      case "lbs":
        return parseFloat((initNum * lbsToKg).toFixed(5));
      case "kg":
        return parseFloat((initNum / lbsToKg).toFixed(5));
      case "mi":
        return parseFloat((initNum * miToKm).toFixed(5));
      case "km":
        return parseFloat((initNum / miToKm).toFixed(5));
      default:
        break;
    }
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    let result = `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
    // console.log("string; ", result)
    return result;
  };
}

module.exports = ConvertHandler;
