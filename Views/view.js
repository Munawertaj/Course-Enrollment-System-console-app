let database = require("../Database/database.json");
const { loadData } = require("../Models/read_write");

class View {
  show_userType() {
    console.log("1. Admin");
    console.log("2. Student");
    console.log("3. Exit");
  }
  show_student_log_reg() {
    console.log("1. Log in");
    console.log("2. Register");
    console.log("3. Exit");
  }
  show_admin_operations() {
    for (const op of database.adminOperations) {
      console.log(op);
    }
  }
  show_student_operations() {
    for (const op of database.studentOperations) {
      console.log(op);
    }
  }
  show_courses() {
    console.log("All courses:");
    let data = loadData();
    for (const course of data.courses) {
      console.log(course.id + ": " + course.name);
    }
  }

  show_students() {
    let data = loadData();
    console.log("All students:");
    for (const student of data.students) {
      console.log(student.id + ": " + student.name);
    }
  }

  show_enrolled_courses(index) {
    let data = loadData();
    if (data.students[index].enrolled.length) {
      console.log("All Enrolled Courses:");
      for (const course of data.students[index].enrolled) {
        console.log(course.id + ": " + course.name);
      }
    } else console.log("You have not enrolled in any course yet!!!");
  }

  show_unenrolled_courses(index) {
    let data = loadData();
    if (data.students[index].unenrolled.length) {
      console.log("All Unenrolled Courses:");
      for (const course of data.students[index].unenrolled) {
        console.log(course.id + ": " + course.name);
      }
    } else console.log("You have not unenrolled in any course!!!");
  }
}

module.exports = View;
