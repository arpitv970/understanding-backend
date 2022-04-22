# Working with Objects
```js
const person = {
  // key: value    --> key-value pair syntaxing
  name: "Kyojuro Rengoku",    // String
  age: 20,                    // Integer
  greet: () => {              // Functions (any type of it can be used)
     console.log(`Hello, Flame Hashira: ${this.name}`);  // this would produce undfinded error as in arrow function `this` keyword refers to the Global Scope
  },

  greet: function() {
     console.log(`Hello, Flame Hashira: ${this.name}`);  // this could solve the previous problem
  },

  greet() {
    console.log(`Hello, Flame Hashira: ${this.name}`);  // this could solve the previous problem
  },
};

person.greet();
```
- Thus Objects can have key-value pair for any type of *Datatypes* & *Functions* too