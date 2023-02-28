const fs = require("fs");

const scaffold = {};

scaffold.loadData = function () {
  try {
    const jsonString = fs.readFileSync("../Database/database.json");
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("Error loading data:", error);
  }
};

scaffold.saveData = function (data) {
  try {
    const jsonString = JSON.stringify(data);
    fs.writeFileSync("../Database/database.json", jsonString);
  } catch (error) {
    console.log("Error saving data:", error);
  }
};

module.exports = scaffold;
