# Destructuring
### Without Destructuring
```js
const person = {
    name: 'Levi Ackerman', 
    age: 30,
}

const printName = (user) => {
    console.log(user.name);
}

printName(person);
```
Output:
```bash
Levi Ackerman
```
### With Destructing
```js
const person = {
    name: 'Levi Ackerman', 
    age: 30,
}

const printName = ({ name, age }) => {  // notice the curly braces
    console.log(`Name: ${name}, Age: ${age}`);
}

printName(person);
```
Output
```bash
Name: Levi Ackerman, Age: 30
```

- We add curly braces in the argument list, then we specifies the property of the incoming object that we are interested in
- Then this property is pulled out from the incoming object, and the property would be dropped for the function (as in example) 
- Destruction is not only used inside of the function, but also outside

```js
const { name, age } = person;

console.log(name, age);
```
Output
```bash
Levi Ackerman 30
```

- Not only Objects, arrays can also be destructured

```js
const arr = ["Tsunade", 106, { name: "Sakura", trash: true }];
const [character, size] = arr;  // notice square braces are used in case of array
console.log(character, size);
```
Output
```bash
Tsunade 106
```