// const arr = ["Yoriichi", 106, { name: "Sakura", trash: true }];

// iterating through an array
// for (let element of arr) {
//   console.log(element);
// }

// meathods
// console.log(arr.map(element => `element: ${element}`));
// console.log(arr);
// arr.push({ Chakra: "Wind" });
// const cpyArr = [arr]; // this would create a nested array instead of copy of it
// const cpyArr = [...arr]; // yikes!! now it would create a true copy of array
// console.log(cpyArr);

// this would return only 3 arguments in output
// const displayArgs = (arg1, arg2, arg3) => {
//     return [arg1, arg2, arg3];
// }

// console.log(displayArgs(1, 2, 3, 4));   // In this case, only first three agruments would be returned

// this would return multiple arguments in output
// const displayArgs = (...args) => {
//     return args;
// }

// console.log(displayArgs(1, 2, 3, 4));   // In this case, all agruments would be returned


const person = {
    name: 'Levi Ackerman', 
    age: 30,
}

const printName = ({ name, age }) => {
    console.log(`Name: ${name}, Age: ${age}`);
}

const { name, age } = person;

// console.log(name, age);

// printName(person);

const arr = ["Tsunade", 106, { name: "Sakura", trash: true }];
const [character, size] = arr;
console.log(character, size);