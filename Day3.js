// Student 1
const marks1 = [78, 95, 88, 100, 67];
let total1 = 0;
let highest1 = marks1[0];

for (let i = 0; i < marks1.length; i++) {
    total1 += marks1[i]; // add to total
    if (marks1[i] > highest1) {
        highest1 = marks1[i]; // update highest
    }
}

let average1 = total1 / marks1.length;

console.log("Example 1 (For Loop)");
console.log("Total:", total1);
console.log("Average:", average1);
console.log("Highest:", highest1);


// Student 2
const marks2 = [56, 72, 91, 85, 60];

const total2 = marks2.reduce((sum, m) => sum + m, 0);
const highest2 = marks2.reduce((max, m) => (m > max ? m : max), marks2[0]);
const average2 = total2 / marks2.length;

console.log("\nExample 2 (Reduce)");
console.log("Total:", total2);
console.log("Average:", average2);
console.log("Highest:", highest2);


// Student 3
const marks3 = [45, 67, 89, 92, 88, 76, 95];

const total3 = marks3.reduce((sum, m) => sum + m, 0);
const highest3 = Math.max(...marks3);
const average3 = total3 / marks3.length;

console.log("\nExample 3 (Math.max)");
console.log("Total:", total3);
console.log("Average:", average3);
console.log("Highest:", highest3);


// Student 4
const marks4 = [80, 65, 90, 75, 85];
const total4 = marks4.reduce((sum, m) => sum + m, 0);
const average4 = total4 / marks4.length;

marks4.sort((a, b) => b - a); // descending order
const highest4 = marks4[0];

console.log("\nExample 4 (Sort)");
console.log("Total:", total4);
console.log("Average:", average4);
console.log("Highest:", highest4);
