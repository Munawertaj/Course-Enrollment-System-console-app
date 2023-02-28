let database = require("../Database/database.json");
let { loadData, saveData } = require("./read_write");
const prompt = require("prompt-sync")();

class Admin {
  check_admin(username, password) {
    const data = loadData();
    for (const check of data.admins) {
      if (check.username == username && check.password == password) {
        return true;
      }
    }
    return false;
  }

  check_course(course) {
    let index = 0;
    const data = loadData();

    for (const check of data.courses) {
      if (check.name == course.name && check.id == course.id) {
        return index;
      }
      index++;
    }
    return -1;
  }

  select_course() {
    const name = prompt("Enter Course Name: ");
    const id = prompt("Enter Course ID: ");
    const course = { name, id };
    return course;
  }

  create_course() {
    const course = this.select_course();
    const data = loadData();
    data.courses.push(course);
    saveData(data);
    console.log("Course created successfully");
  }

  update_course() {
    const course = this.select_course();
    const index = this.check_course(course);
    if (index == -1) console.log("Invalid course!!!");
    else {
      const name = prompt("Enter new name: ");
      const id = prompt("Enter new ID: ");
      const update = { name, id };
      const data = loadData();
      data.courses[index] = update;
      saveData(data);
      console.log("Course Updated successfully");
    }
  }

  delete_course() {
    const course = this.select_course();
    const index = this.check_course(course);
    if (index == -1) console.log("Invalid course!!!");
    else {
      const data = loadData();
      data.courses.splice(index, 1);
      saveData(data);
      console.log("Course Deleted successfully");
    }
  }
}

module.exports = Admin;
