const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");
const logo = require("asciiart-logo");

function init() {
    const logoText = logo({ name: "Employee Manager" }).render();
  
    console.log(logoText);
  
    loadMainPrompts();
  };

init();  
