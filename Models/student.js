let database = require("../Database/database.json");
let { loadData, saveData } = require("./read_write");
const prompt = require("prompt-sync")();

class Student {
  get_register() {
    console.log("REGISTER:");
    const name = prompt("Enter name: ");
    const id = prompt("Enter Id: ");
    const username = prompt("Enter username: ");
    const password = prompt("Enter Password: ");
    let student = {
      name: name,
      id: Number(id),
      username: username,
      password: password,
      enrolled: [],
      unenrolled: [],
    };

    let data = loadData();
    data.students.push(student);
    saveData(data);
    console.log("Registration have been succesfull...");
  }

  check_student(user, pass) {
    let data = loadData();
    let index = 0;
    for (const check of data.students) {
      if (check.username == user && check.password == pass) {
        return [check.name, check.id, index];
      }
      index++;
    }
    return ["null", -1];
  }

  select_course() {
    const name = prompt("Enter Course Name: ");
    const id = prompt("Enter Course ID: ");
    const course = { name, id };
    return course;
  }

  check_enroll(course, indx) {
    const data = loadData();
    let index = 0;
    for (const check of data.students[indx].enrolled) {
      if (check.name == course.name && check.id == course.id) {
        return index;
      }
      index++;
    }
    return -1;
  }

  enroll_course(indx) {
    const course = this.select_course();
    const index = this.check_enroll(course, indx);
    if (index == -1) {
      const data = loadData();
      data.students[indx].enrolled.push(course);
      saveData(data);
      console.log("Course Enrolled successfully...");
    } else console.log("You have already enrolled to this course...");
  }

  unenroll_course(indx) {
    const course = this.select_course();
    let index = this.check_enroll(course, indx);
    if (index == -1) console.log("You are not enrolled to this course...");
    else {
      const data = loadData();
      data.students[indx].unenrolled.push(course);
      data.students[indx].enrolled.splice(index, 1);
      saveData(data);
      console.log("Course Unenrolled successfully...");
    }
  }

  delete_account(index) {
    let data = loadData();
    data.students.splice(index, 1);
    saveData(data);
  }
}

module.exports = Student;
