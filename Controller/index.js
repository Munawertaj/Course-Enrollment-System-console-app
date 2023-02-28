const prompt = require("prompt-sync")();

const Admin = require("../Models/admin.js");
const Student = require("../Models/student.js");
const View = require("../Views/view.js");

let view = new View();
let admin = new Admin();
let student = new Student();

while (true) {
  view.show_userType();
  const user_type = prompt("Select which type of user you are or Exit: ");

  if (user_type == 1) {
    console.log("Please login:");
    const username = prompt("Username: ");
    const password = prompt("Password: ");
    if (admin.check_admin(username, password)) {
      console.log("Successfully Logged in as Admin:");

      let opcode = -1;
      while (opcode != 6) {
        view.show_admin_operations();
        opcode = prompt("(Admin)--> Enter operation: ");
        if (opcode == 1) admin.create_course();
        else if (opcode == 2) admin.update_course();
        else if (opcode == 3) admin.delete_course();
        else if (opcode == 4) view.show_courses();
        else if (opcode == 5) view.show_students();
        else if (opcode == 6) break;
        else console.log("Invalid Operation!!!");
      }
    } else console.log("Incorrect username or password!!!");
  } else if (user_type == 2) {
    view.show_student_log_reg();
    let opt = prompt("(Student)-->Enter operation: ");
    while (opt == 2) {
      student.get_register();
      view.show_student_log_reg();
      opt = prompt("(Student)-->Enter operation: ");
      if (opt == 3) break;
    }
    if (opt == 1) {
      const username = prompt("Username: ");
      const password = prompt("Password: ");
      let [name, id, index] = student.check_student(username, password);
      if (id == -1) console.log("Incorrect username or password!!!");
      else {
        console.log(`Welcome --------${name}--------`);
        let opcode = -1;
        while (opcode != 7) {
          view.show_student_operations();
          opcode = prompt(`(Student-${name})--> Enter operation: `);
          if (opcode == 1) view.show_courses();
          else if (opcode == 2) student.enroll_course(index);
          else if (opcode == 3) student.unenroll_course(index);
          else if (opcode == 4) view.show_enrolled_courses(index);
          else if (opcode == 5) view.show_unenrolled_courses(index);
          else if (opcode == 6) {
            student.delete_account(index);
            break;
          } else if (opcode == 7) break;
          else console.log("Invalid Operation!!!");
        }
      }
    }
  } else if (user_type == 3) break;
  else console.log("Invalid Operation!!!");
}
