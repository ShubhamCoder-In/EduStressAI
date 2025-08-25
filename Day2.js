// using max function
const marks = [78, 95, 88, 100, 67];
const highest = Math.max(...marks);
console.log(highest); // 100

//forloop 
const marks1 = [78, 95, 88, 100, 67];
let highest1 = marks[0]; // assume first element is highest

for (let i = 1; i < marks.length; i++) {
    if (marks[i] > highest) {
        highest = marks[i];
    }
}

console.log(highest); // 100

// reduce
const marks2 = [78, 95, 88, 100, 67];
const highest2 = marks.reduce((max, current) => (current > max ? current : max), marks[0]);

console.log(highest); // 100

// sort()
const marks3 = [78, 95, 88, 100, 67];
marks.sort((a, b) => b - a); // descending order
console.log(marks[0]); // 100
