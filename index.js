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


function addEmployee() {
    prompt([
      {
        name: "first_name",
        message: "What is the employee's first name?"
      },
      {
        name: "last_name",
        message: "What is the employee's last name?"
      }
    ])
      .then(res => {
        let firstName = res.first_name;
        let lastName = res.last_name;
  
        db.findAllRoles()
          .then(([rows]) => {
            let roles = rows;
            const roleChoices = roles.map(({ id, title }) => ({
              name: title,
              value: id
            }));
  
            prompt({
              type: "list",
              name: "roleId",
              message: "What is the employee's role?",
              choices: roleChoices
            })
              .then(res => {
                let roleId = res.roleId;
  
                db.findAllEmployees()
                  .then(([rows]) => {
                    let employees = rows;
                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                      name: `${first_name} ${last_name}`,
                      value: id
                    }));
  
                    managerChoices.unshift({ name: "None", value: null });
  
                    prompt({
                      type: "list",
                      name: "managerId",
                      message: "Who is the employee's manager?",
                      choices: managerChoices
                    })
                      .then(res => {
                        let employee = {
                          manager_id: res.managerId,
                          role_id: roleId,
                          first_name: firstName,
                          last_name: lastName
                        }
  
                        db.createEmployee(employee);
                      })
                      .then(() => console.log(
                        `Added ${firstName} ${lastName} to the database`
                      ))
                      .then(() => loadMainPrompts())
                  })
              })
          })
      })
  }