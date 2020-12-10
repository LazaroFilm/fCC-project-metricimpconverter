/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function (req, res) {
    console.log("---");
    let input = req.query.input;
    console.log("input: ", input);
    try {
      convertHandler.checkErrors(input);
    } catch (error) {
      console.log(error)
      const message = error.message
      res.send(message);
      throw message;
    }
    let initNum = convertHandler.getNum(input);
    let initUnit = convertHandler.getUnit(input);
    let returnNum = convertHandler.convert(initNum, initUnit);
    let returnUnit = convertHandler.getReturnUnit(initUnit);
    let toString = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );
    console.log(
      "init:",
      initNum,
      initUnit,
      "-- return:",
      returnNum,
      returnUnit
    );
    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString,
    });
  });
};
