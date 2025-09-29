const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const employees = [];

function displayMenu() {
  console.log('\n=== Employee Management System ===');
  console.log('1. Add Employee');
  console.log('2. List All Employees');
  console.log('3. Remove Employee');
  console.log('4. Exit');
  console.log('==================================');
  promptUser();
}

function promptUser() {
  rl.question('Please enter your choice (1-4): ', (choice) => {
    switch (choice.trim()) {
      case '1':
        addEmployee();
        break;
      case '2':
        listEmployees();
        break;
      case '3':
        removeEmployee();
        break;
      case '4':
        console.log('Exiting application. Goodbye!');
        rl.close();
        break;
      default:
        console.log('Invalid choice. Please enter a number between 1 and 4.');
        displayMenu();
        break;
    }
  });
}

function addEmployee() {
  rl.question('Enter employee name: ', (name) => {
    rl.question('Enter employee ID: ', (id) => {

      const existingEmployee = employees.find(emp => emp.id === id);
      if (existingEmployee) {
        console.log(`Error: An employee with ID ${id} already exists.`);
        displayMenu();
        return;
      }
      employees.push({ name, id });
      console.log(`Employee ${name} with ID ${id} has been added.`);
      displayMenu();
    });
  });
}


function listEmployees() {
  if (employees.length === 0) {
    console.log('No employees to display.');
  } else {
    console.log('\n=== Current Employees ===');
    console.table(employees);
    console.log('=========================');
  }
  displayMenu();
}


function removeEmployee() {
  rl.question('Enter the ID of the employee to remove: ', (id) => {
    const index = employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      const removedEmployee = employees.splice(index, 1);
      console.log(`Employee with ID ${id} (${removedEmployee[0].name}) has been removed.`);
    } else {
      console.log(`Error: No employee found with ID ${id}.`);
    }
    displayMenu();
  });
}


displayMenu();