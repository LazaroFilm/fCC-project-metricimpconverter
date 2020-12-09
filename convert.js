

module.exports = (input) => {
  let error;
  const splitInput = input.split(/([a-zA-Z]+)/);

  let initNum;
  if (!splitInput[0]) {
    initNum = 1;
  } else if ((splitInput[0].match(/\//g) || []).length === 1) {
    initNum = eval(splitInput[0]);
  } else if (isNaN(splitInput[0])) {
    initNum = 0;
    error = "invalid number";
  } else {
    initNum = splitInput[0];
  }

  let initUnit
  if (!splitInput[1]) {
    initUnit = 'none';
    if (error == "invalid number") {
        error = "invalid number and unit";
      } else {
        error = "invalid unit";
      };
  } else if (splitInput[1].toLowerCase() == 'l') {
    initUnit = 'L';
  } else {
    initUnit = splitInput[1].toLowerCase()
  }

  // console.log(`converting ${initNum} ${initUnit}.`)
  let returnNum;
  let returnUnit;


  const units = {
    'gal': "gallons",
    'L': "liters",
    'lbs': "pounds",
    'kg': "kilos",
    'mi': "miles",
    'km': "kilo-meters"
  };

  switch (initUnit) {
    case 'gal':
      returnNum = (initNum * 3.785410).toFixed(5);
      returnUnit = 'L';
      break;
    case 'L':
      returnNum = (initNum / 3.785410).toFixed(5);
      returnUnit = 'gal';
      break;
    case 'lbs':
      returnNum = (initNum * 0.453592).toFixed(5);
      returnUnit = 'kg';
      break;
    case 'kg':
      returnNum = (initNum / 0.453592).toFixed(5);
      returnUnit = 'lbs';
      break;
    case 'mi':
      returnNum = (initNum * 1.60934).toFixed(5);
      returnUnit = 'km';
      break;
    case 'km':
      returnNum = (initNum / 1.60934).toFixed(5);
      returnUnit = 'mi';
      break;
    default:
      if (error == "invalid number" || error == "invalid number and unit") {
        error = "invalid number and unit";
      } else {
        error = "invalid unit";
      };
      break;
  };

  // const initial_Units = (initNum > 1) ? units[initUnit]+"s" : units[initUnit];
  // const return_Units = (returnNum > 1) ? units[returnUnit]+"s" : units[returnUnit];
  const initial_Units = units[initUnit];
  const return_Units = units[returnUnit];

  return [initNum, initUnit, returnNum, returnUnit, initial_Units, return_Units, error];
};