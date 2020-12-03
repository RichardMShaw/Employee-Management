const mysql = require('mysql2')
const inquirer = require('inquirer')
require('console.table')
const { dbKey } = require('./keys')
const db = mysql.createConnection(dbKey)

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
      message: 'What role do they have:',
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
    },
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do next:',
      choices: ['Add Another Employee', 'Add Something Else', 'Return to Main Menu']
    }
  ])
    .then(({ firstName, lastName, roleId, managerId, option }) => {
      if (managerId === '') {
        managerId = null
      }
      db.query(`INSERT INTO roles SET ?`, { firstName, lastName, roleId, managerId }, (err, employees) => {
        if (err) {
          console.log(err)
        } else {
          console.table(employees)
        }
      })
      switch (option) {
        case 'Add Another Employee':
          addEmployee()
          break
        case 'Add Something Else':
          addMenu()
          break
        case 'Return to Main Menu':
          mainMenu()
          break
      }
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
    },
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do next:',
      choices: ['Add Another Role', 'Add Something Else', 'Return to Main Menu']
    }
  ])
    .then(({ title, salary, departmentId, option }) => {
      db.query(`INSERT INTO roles SET ?`, { name, salary, departmentId }, (err, roles) => {
        if (err) {
          console.log(err)
        } else {
          console.table(roles)
        }
      })
      switch (option) {
        case 'Add Another Role':
          addRole()
          break
        case 'Add Something Else':
          addMenu()
          break
        case 'Return to Main Menu':
          mainMenu()
          break
      }
    })
    .catch(err => console.log(err))
}

const addDepartment = () => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Please give the new department a name:'
    },
    {
      type: 'list',
      name: 'option',
      message: 'What would you like to do next:',
      choices: ['Add Another Department', 'Add Something Else', 'Return to Main Menu']
    }
  ])
    .then(({ name, option }) => {
      db.query(`INSERT INTO departments SET ?`, { name }, (err, departments) => {
        if (err) {
          console.log(err)
        } else {
          console.table(departments)
        }
      })
      switch (option) {
        case 'Add Another Department':
          addDepartment()
          break
        case 'Add Something Else':
          addMenu()
          break
        case 'Return to Main Menu':
          mainMenu()
          break
      }
    })
    .catch(err => console.log(err))
}

const addMenu = () => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'option',
      message: 'Which of the following would you like to add',
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
      message: 'Which of the following would you like to view',
      choices: ['Departments', 'Roles', 'Employees']
    }
  ])
    .then(({ option }) => {
      switch (option) {
        case 'Departments':
          db.query('SELECT * FROM departments', (err, departments) => {
            if (err) {
              console.log(err)
            } else {
              console.table(departments)
            }
          })
          break
        case 'Roles':
          db.query('SELECT * FROM roles', (err, departments) => {
            if (err) {
              console.log(err)
            } else {
              console.table(departments)
            }
          })
          break
        case 'Employees':
          db.query('SELECT * FROM employees', (err, departments) => {
            if (err) {
              console.log(err)
            } else {
              console.table(departments)
            }
          })
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
          break
        case 'Update employee roles':
          break
        case 'Delete departments, roles, and employees':
          break
      }
    })
    .catch(err => console.log(err))
}

// db.query('SELECT * FROM departments', (err, departments) => {
//   if (err) { console.log(err) }
//   console.log(departments)
// })

// db.query(`
//   SELECT roles.id, roles.title, roles.salary, departments.name AS department
//   FROM roles
//   LEFT JOIN departments
//   ON roles.departmentId = departments.id
//   `, (err, roles) => {
//     if (err) { console.log(err) }
//     console.log(roles)
//   })

// db.query(`
//   SELECT employees.id, employees.firstName, employees.lastName, roles.title, roles.salary, departments.name AS department, CONCAT(manager.firstName, ' ', manager.lastName) AS manager
//   FROM employees LEFT JOIN roles ON employees.roleId = roles.id
//   LEFT JOIN departments ON roles.departmentId = departments.id
//   LEFT JOIN employees manager ON manager.id = employees.managerId
// `, (err, employees) => {
//   if (err) { console.log(err) }
//   console.log(employees)
// })
