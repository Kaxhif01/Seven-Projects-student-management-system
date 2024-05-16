#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// define student class
class Student {
    static counter = 10000;
    id;
    name;
    courses;
    balance;
    constructor(name) {
        this.id = Student.counter++;
        this.name = name;
        this.courses = [];
        this.balance = 1000;
    }
    //method to enrolled student in courses
    enrollCourse(course) {
        this.courses.push(course);
    }
    //method to view a student balane
    viewBalance() {
        console.log(chalk.green(`\n \t[${chalk.magentaBright(this.name)}] Your balance is : $${chalk.greenBright(this.balance)}\n`));
    }
    // method to pay student fees
    payFees(amount) {
        this.balance -= amount;
        console.log(chalk.yellowBright(`\n \t[${chalk.magentaBright(this.name)}] your $${chalk.greenBright(amount)} fees succesfully paid.\n`));
        console.log(chalk.magenta(`\n \tYour remaining balance is : $${chalk.greenBright(this.balance)}\n`));
    }
    //  method to display a student status
    showStatus() {
        console.log(chalk.blue(`ID: ${chalk.greenBright(this.id)}`));
        console.log(chalk.blue(`Name: ${chalk.greenBright(this.name)}`));
        console.log(chalk.blue(`Courses: ${chalk.greenBright(this.courses)}`));
        console.log(chalk.blue(`Balance: $${chalk.greenBright(this.balance)}`));
    }
}
// define a student manager class to manage students
class studentManagement {
    students;
    constructor() {
        this.students = [];
    }
    // method to add a new student
    addStudent(name) {
        let student = new Student(name);
        this.students.push(student);
        console.log(chalk.greenBright(`\n \tStudent [${chalk.magentaBright(name)}] added succssfully. Student ID: ${chalk.yellowBright(student.id)})\n`));
    }
    // method to enroll a student in a course
    enrollStudent(studentId, course) {
        let student = this.findStudent(studentId);
        if (student) {
            student.enrollCourse(course);
            console.log(chalk.greenBright(`\n \t[${chalk.magentaBright(student.name)}] enrolled in [${chalk.yellowBright(course)}] successfully\n`));
        }
        else {
            console.log(chalk.red("\n \tStudent not found. Please enter correct student ID\n"));
        }
    }
    // method to view a student balance
    viewstudentBalance(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.viewBalance();
        }
        else {
            console.log(chalk.red("\n \tStudent not found. Please enter correct student ID\n"));
        }
    }
    // method to pay student fees
    paystudentFees(studentId, amount) {
        let student = this.findStudent(studentId);
        if (student) {
            student.payFees(amount);
        }
        else {
            console.log(chalk.red("\n \tStudent not found. Please enter correct student ID\n"));
        }
    }
    // method to show student status
    showstudentStatus(studentId) {
        let student = this.findStudent(studentId);
        if (student) {
            student.showStatus();
        }
        else {
            console.log(chalk.red("\n \tStudent not found. Please enter correct student ID\n"));
        }
    }
    findStudent(studentId) {
        return this.students.find((std) => std.id === studentId);
    }
}
// main function to run our program
async function main() {
    console.log(chalk.magentaBright("\n \t Welcome to 'KAXH' - Student Management System\n"));
    console.log(chalk.yellowBright("-".repeat(60)));
    let studentManager = new studentManagement();
    // while loop to keep program running
    while (true) {
        let choice = await inquirer.prompt([
            {
                name: "choice",
                type: "list",
                message: chalk.yellow("\n Select an Option\n"),
                choices: [
                    "Add Student",
                    "Enroll Student",
                    "View Student Balance",
                    "Pay Fees",
                    "Show Student Status",
                    "Exit"
                ]
            }
        ]);
        // using switch case to handle user choice
        switch (choice.choice) {
            case "Add Student":
                let nameInput = await inquirer.prompt([
                    {
                        name: "name",
                        type: "input",
                        message: chalk.cyanBright("Enter a student name?"),
                    }
                ]);
                studentManager.addStudent(nameInput.name);
                break;
            case "Enroll Student":
                let courseInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.blueBright("Enter a student ID"),
                    },
                    {
                        name: "course",
                        type: "input",
                        message: chalk.blueBright("Enter a Course name?"),
                    }
                ]);
                studentManager.enrollStudent(courseInput.studentId, courseInput.course);
                break;
            case "View Student Balance":
                let balanceInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.blueBright("Enter a student ID"),
                    }
                ]);
                studentManager.viewstudentBalance(balanceInput.studentId);
                break;
            case "Pay Fees":
                let feesInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.blueBright("Enter a student ID"),
                    },
                    {
                        name: "amount",
                        type: "number",
                        message: chalk.green("Enter a amount to pay"),
                    },
                ]);
                studentManager.paystudentFees(feesInput.studentId, feesInput.amount);
                break;
            case "Show Student Status":
                let statusInput = await inquirer.prompt([
                    {
                        name: "studentId",
                        type: "number",
                        message: chalk.blueBright("Enter a student ID"),
                    },
                ]);
                studentManager.showstudentStatus(statusInput.studentId);
                break;
            case "Exit":
                console.log(chalk.red(`Existing.................`));
                process.exit();
        }
    }
}
// calling a main function
main();
