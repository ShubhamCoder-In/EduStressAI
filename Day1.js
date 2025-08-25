// Define a student object
const student = {
  name: "Alice Johnson",
  age: 20,
  grade: "A",
  subjects: ["Math", "Science", "History"]
};

// Function to print student details
function printStudentDetails(student) {
  console.log("Student Details:");
  console.log(`Name: ${student.name}`);
  console.log(`Age: ${student.age}`);
  console.log(`Grade: ${student.grade}`);
  console.log("Subjects: " + student.subjects.join(", "));
}

// Call the function
printStudentDetails(student);
