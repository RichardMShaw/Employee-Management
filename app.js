const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')
const { dbKey } = require('./keys')
const db = mysql.createConnection(dbKey)

// const getSalary = (roles, roleId) => {
//   let len = roles.length
//   for (let i = 0; i < len; i++) {
//     if (roles[i].id === roleId) {
//       return roles[i].salary
//     }
//   }
//   return 0
// }

// const totalBudget = (departmentId) => {
//   db.query(`SELECT id FROM roles WHERE departmentId = ${departmentId}`,(err,depRoles)=>{
//     if(err){
//       console.log(err)
//       mainMenu()
//     } else {
//       let len = depRoles.length
//       for(let i = 0; i < len; i++){

//       }
//     }
//   })
//   db.query(`SELECT roleId FROM employees WHERE departmentId = ${departmentId}`, (err, employees) => {
//     if (err) {
//       console.log(err)
//       mainMenu()
//     } else {
//       db.query(`SELECT * FROM roles`, (err, roles) => {
//         if (err) {
//           mainMenu()
//           console.log(err)
//         } else {
//           let total = 0
//           let len = employees.length
//           for (let i = 0; i < len; i++) {
//             total += getSalary(roles, employees[i].roleId)
//           }
//           console.log(`This department currently spends a total of ${total}USD a year on employee salaries.`)
//           budgetMenu()
//         }
//       })
//     }
//   })
// }

// const budgetMenu = () => {
//   db.query('SELECT * FROM departments', (err, departments) => {
//     if (err) {
//       console.log(err)
//       mainMenu()
//     } else {
//       console.table(departments.sort((a, b) => { return a.id - b.id }))
//       inquirer.prompt([
//         {
//           type: 'list',
//           name: 'choice',
//           message: 'Select a department to check how much money you spend on salaries:',
//           choices: departments.map(department => {
//             return department.id
//           })
//             .concat(['Return to Main Menu'])
//             .sort((a, b) => { return a - b })
//         }
//       ])
//         .then(({ choice }) => {
//           if (choice === 'Return to Main Menu') {
//             mainMenu()
//           } else {
//             totalBudget(choice)
//           }
//         })
//         .catch(err => console.log(err))
//     }
//   })
// }
const deleteEmployee = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.log(err)
      mainMenu()
    } else {
      console.table(employees.sort((a, b) => { return a.id - b.id }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select an employee you want to delete:',
          choices: employees.map(employee => {
            return employee.id
          })
            .concat(['Return to Delete Menu', 'Return to Main Menu'])
            .sort((a, b) => { return a - b })

        }
      ])
        .then(({ choice }) => {
          switch (choice) {
            case 'Return to Delete Menu':
              deleteMenu()
              break
            case 'Return to Main Menu':
              mainMenu()
              break
            default:
              db.query(`DELETE FROM employees WHERE id = ${choice}`, err => {
                if (err) {
                  console.log(err)
                  deleteEmployee()
                } else {
                  console.log('Employee Deleted!')
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'option',
                      message: 'What would you like to do now',
                      choices: ['Delete Another Employee', 'Return to Delete Menu', 'Return to Main Menu']
                    }
                  ])
                    .then(({ option }) => {
                      switch (option) {
                        case 'Delete Another Employee':
                          deleteEmployee()
                          break
                        case 'Return to Delete Menu':
                          deleteMenu()
                          break
                        case 'Return to Main Menu':
                          mainMenu()
                          break
                      }
                    })
                }
              })
              break
          }
        })
        .catch(err => console.log(err))
    }
  })
}

const deleteRole = () => {
  db.query('SELECT * FROM roles', (err, roles) => {
    if (err) {
      console.log(err)
      mainMenu()
    } else {
      console.table(roles.sort((a, b) => { return a.id - b.id }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select a role you want to delete:',
          choices: roles.map(role => {
            return role.id
          })
            .concat(['Return to Delete Menu', 'Return to Main Menu'])
            .sort((a, b) => { return a - b })
        }
      ])
        .then(({ choice }) => {
          switch (choice) {
            case 'Return to Delete Menu':
              deleteMenu()
              break
            case 'Return to Main Menu':
              mainMenu()
              break
            default:
              db.query(`DELETE FROM roles WHERE id = ${choice}`, err => {
                if (err) {
                  console.log(err)
                  deleteRole()
                } else {
                  console.log('Role Deleted!')
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'option',
                      message: 'What would you like to do now',
                      choices: ['Delete Another Role', 'Return to Delete Menu', 'Return to Main Menu']
                    }
                  ])
                    .then(({ option }) => {
                      switch (option) {
                        case 'Delete Another Role':
                          deleteRole()
                          break
                        case 'Return to Delete Menu':
                          deleteMenu()
                          break
                        case 'Return to Main Menu':
                          mainMenu()
                          break
                      }
                    })
                }
              })
              break
          }
        })
        .catch(err => console.log(err))
    }
  })
}

const deleteDepartment = () => {
  db.query('SELECT * FROM departments', (err, departments) => {
    if (err) {
      console.log(err)
      mainMenu()
    } else {
      console.table(departments.sort((a, b) => { return a.id - b.id }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'choice',
          message: 'Select a department you want to delete:',
          choices: departments.map(department => {
            return department.id
          })
            .concat(['Return to Delete Menu', 'Return to Main Menu'])
            .sort((a, b) => { return a - b })
        }
      ])
        .then(({ choice }) => {
          switch (choice) {
            case 'Return to Delete Menu':
              deleteMenu()
              break
            case 'Return to Main Menu':
              mainMenu()
              break
            default:
              db.query(`DELETE FROM departments WHERE id = ${choice}`, err => {
                if (err) {
                  console.log(err)
                  deleteDepartment()
                } else {
                  console.log('Department Deleted!')
                  inquirer.prompt([
                    {
                      type: 'list',
                      name: 'option',
                      message: 'What would you like to do now',
                      choices: ['Delete Another Department', 'Return to Delete Menu', 'Return to Main Menu']
                    }
                  ])
                    .then(({ option }) => {
                      switch (option) {
                        case 'Delete Another Department':
                          deleteDepartment()
                          break
                        case 'Return to Delete Menu':
                          deleteMenu()
                          break
                        case 'Return to Main Menu':
                          mainMenu()
                          break
                      }
                    })
                }
              })
              break
          }
        })
        .catch(err => console.log(err))
    }
  })
}

const deleteMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Which of the following would you like to delete:',
      choices: ['Departments', 'Roles', 'Employees', 'Return to Main Menu']
    }
  ])
    .then(({ option }) => {
      switch (option) {
        case 'Departments':
          deleteDepartment()
          break
        case 'Roles':
          deleteRole()
          break
        case 'Employees':
          deleteEmployee()
          break
        case 'Return to Main Menu':
          mainMenu()
          break
      }
    })
}

const matchEmployee = (employees, id) => {
  let len = employees.length
  for (let i = 0; i < len; i++) {
    if (employees[i].id === id) {
      return `${employees[i].firstName} ${employees[i].lastName}`
    }
  }
  return 'Nobody'
}

const matchRole = (roles, id) => {
  let len = roles.length
  for (let i = 0; i < len; i++) {
    if (roles[i].id === id) {
      return roles[i].title
    }
  }
  return 'Nothing'
}

const updateEmployee = (id) => {
  db.query(`SELECT * FROM employees WHERE id = ${id}`, (err, employee) => {
    if (err) {
      console.log(err)
      mainMenu()
    } else {
      console.table(employee.sort((a, b) => { return a.id - b.id }))
      inquirer.prompt([
        {
          type: 'list',
          name: 'option',
          message: 'Which data type do you want to change:',
          choices: ['firstName', 'lastName', 'roleId', 'managerId', 'Return to Update Menu', 'Return to Main Menu']
        }
      ])
        .then(({ option }) => {
          employee = employee[0]
          switch (option) {
            case 'firstName':
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'firstName',
                  message: `Their current First name is '${employee.firstName}'. What should their new First Name be:`
                }
              ])
                .then(({ firstName }) => {
                  employee.firstName = firstName
                  db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                    if (err) {
                      console.log(err)
                      updateMenu()
                    } else {
                      updateEmployee(id)
                    }
                  })
                })
              break
            case 'lastName':
              inquirer.prompt([
                {
                  type: 'input',
                  name: 'lastName',
                  message: `Their current Last Name is '${employee.lastName}'. What should their new Last Name be:`
                }
              ])
                .then(({ lastName }) => {
                  employee.lastName = lastName
                  db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                    if (err) {
                      console.log(err)
                      updateMenu()
                    } else {
                      updateEmployee(id)
                    }
                  })
                })
              break
            case 'roleId':
              db.query('SELECT * FROM roles', (err, roles) => {
                if (err) {
                  console.log(err)
                  mainMenu()
                } else {
                  console.table(roles)
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'role',
                      message: `Their current role is ${matchRole(roles, employee.roleId)}. What should their new role be:`,
                      validate: function (res) {
                        let roleId = parseInt(res)
                        return (!isNaN(roleId) && matchRole(roles, roleId) !== 'Nothing')
                      }
                    }
                  ])
                    .then(({ role }) => {
                      employee.roleId = role
                      db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                        if (err) {
                          console.log(err)
                          updateMenu()
                        } else {
                          updateEmployee(id)
                        }
                      })
                    })
                }
              })
              break
            case 'managerId':
              db.query('SELECT * FROM employees', (err, employees) => {
                if (err) {
                  console.log(err)
                  mainMenu()
                } else {
                  console.table(employees)
                  inquirer.prompt([
                    {
                      type: 'input',
                      name: 'manager',
                      message: `Their current manager is ${matchEmployee(employees, employee.managerId)}. What is the id of their new manager (leave blank for no manager):`,
                      validate: function (res) {
                        let managerId = parseInt(res)
                        return (!isNaN(managerId) && matchEmployee(employees, managerId) !== 'Nobody') || (res === '')
                      }
                    }
                  ])
                    .then(({ manager }) => {
                      if (manager === '') {
                        manager = null
                      }
                      employee.managerId = manager
                      db.query(`UPDATE employees SET ? WHERE id = ${id}`, employee, err => {
                        if (err) {
                          console.log(err)
                          updateMenu()
                        } else {
                          updateEmployee(id)
                        }
                      })
                    })
                }
              })
              break
            case 'Return to Update Menu':
              updateMenu()
              break
            case 'Return to Main Menu':
              mainMenu()
              break

          }
        })
        .catch(err => console.log(err))
    }
  })
}

const updateMenu = () => {
  db.query('SELECT * FROM employees', (err, employees) => {
    if (err) {
      console.log(err)
    } else {
      console.table(employees)
      inquirer.prompt([
        {
          type: 'input',
          name: 'id',
          message: 'Enter the id of the employee you wish to edit (leave blank to return to the main menu):',
          validate: function (res) {
            let id = parseInt(res)
            return (!isNaN(id) && id > 0) || (res === '')
          }
        }
      ])
        .then(({ id }) => {
          if (id === '') {
            mainMenu()
          } else {
            updateEmployee(id)
          }
        })
        .catch(err => console.log(err))
    }
  })
}

const addEmployee = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'What is their First Name:'
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'What is their Last Name:'
    },
    {
      type: 'input',
      name: 'roleId',
      message: `What is their role ID:`,
      validate: function (res) {
        return !isNaN(parseInt(res))
      }
    },
    {
      type: 'input',
      name: 'managerId',
      message: `Enter their manager's id (leave blank if they don't have one):`,
      validate: function (res) {
        return (res === '' || !isNaN(parseInt(res)))
      }
    }
  ])
    .then(employee => {
      if (employee.managerId === '') {
        employee.managerId = null
      }
      db.query(`INSERT INTO employees SET ?`, employee, err => {
        if (err) {
          console.log(err)
        } else {
          console.log('Employee Added!')
        }
        inquirer.prompt([
          {
            type: 'list',
            name: 'option',
            message: 'What would you like to do next:',
            choices: ['Add Another Employee', 'Return to Add Menu', 'Return to Main Menu']
          }
        ])
          .then(({ option }) => {
            switch (option) {
              case 'Add Another Employee':
                addEmployee()
                break
              case 'Return to Add Menu':
                addMenu()
                break
              case 'Return to Main Menu':
                mainMenu()
                break
            }
          })
      })
    })
    .catch(err => console.log(err))
}

const addRole = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'title',
      message: 'Give the new role a title:'
    },
    {
      type: 'input',
      name: 'salary',
      message: `What is the role's yearly salary in USD:`,
      validate: function (res) {
        return !isNaN(parseInt(res))
      }
    },
    {
      type: 'input',
      name: 'departmentId',
      message: 'Please enter the department Id for this role:',
      validate: function (res) {
        return !isNaN(parseInt(res))
      }
    }
  ])
    .then(role => {
      db.query(`INSERT INTO roles SET ?`, role, err => {
        if (err) {
          console.log(err)
        } else {
          console.log('Role Added!')
        }
        inquirer.prompt([
          {
            type: 'list',
            name: 'option',
            message: 'What would you like to do next:',
            choices: ['Add Another Role', 'Return to Add Menu', 'Return to Main Menu']
          }
        ])
          .then(({ option }) => {
            switch (option) {
              case 'Add Another Role':
                addRole()
                break
              case 'Return to Add Menu':
                addMenu()
                break
              case 'Return to Main Menu':
                mainMenu()
                break
            }
          })
      })
    })
    .catch(err => console.log(err))
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please give the new department a name:'
    }
  ])
    .then(department => {
      db.query(`INSERT INTO departments SET ?`, department, err => {
        if (err) {
          console.log(err)
        } else {
          console.log('Department Added!')
        }
        inquirer.prompt([
          {
            type: 'list',
            name: 'option',
            message: 'What would you like to do next:',
            choices: ['Add Another Department', 'Return to Add Menu', 'Return to Main Menu']
          }
        ])
          .then(({ option }) => {
            switch (option) {
              case 'Add Another Department':
                addDepartment()
                break
              case 'Return to Add Menu':
                addMenu()
                break
              case 'Return to Main Menu':
                mainMenu()
                break
            }
          })
      })
    })
    .catch(err => console.log(err))
}

const addMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Which of the following would you like to add:',
      choices: ['Departments', 'Roles', 'Employees', 'Return to Main Menu']
    }
  ])
    .then(({ option }) => {
      switch (option) {
        case 'Departments':
          addDepartment()
          break
        case 'Roles':
          addRole()
          break
        case 'Employees':
          addEmployee()
          break
        case 'Return to Main Menu':
          mainMenu()
          break
      }
    })
}

const viewMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Which of the following would you like to view:',
      choices: ['Departments', 'Roles', 'Employees', 'Return to Main Menu']
    }
  ])
    .then(({ option }) => {
      switch (option) {
        case 'Departments':
          db.query('SELECT * FROM departments', (err, departments) => {
            if (err) {
              console.log(err)
            } else {
              console.table(departments.sort((a, b) => { return a.id - b.id }))
              viewMenu()
            }
          })
          break
        case 'Roles':
          db.query('SELECT * FROM roles', (err, roles) => {
            if (err) {
              console.log(err)
            } else {
              console.table(roles.sort((a, b) => { return a.id - b.id }))
              viewMenu()
            }
          })
          break
        case 'Employees':
          db.query('SELECT * FROM employees', (err, employees) => {
            if (err) {
              console.log(err)
            } else {
              console.table(employees.sort((a, b) => { return a.id - b.id }))
              viewMenu()
            }
          })
          break
        case 'Return to Main Menu':
          mainMenu()
          break
      }
    })
    .catch(err => console.log(err))
}

const mainMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do:',
      choices: [
        'Add departments, roles, employees',
        'View departments, roles, employees',
        'Update employee roles',
        'Delete departments, roles, and employees'
      ]
    }
  ])
    .then(({ option }) => {
      switch (option) {
        case 'Add departments, roles, employees':
          addMenu()
          break
        case 'View departments, roles, employees':
          viewMenu()
          break
        case 'Update employee roles':
          updateMenu()
          break
        case 'Delete departments, roles, and employees':
          deleteMenu()
          break
      }
    })
    .catch(err => console.log(err))
}

mainMenu()