const person = {
  // key: value    --> key-value pair syntaxing
  name: "Kyojuro Rengoku",
  age: 20,
  // greet: () => {
  //   console.log(`Hello, Flame Hashira: ${this.name}`);  // this would produce undfinded error as in arrow function `this` keyword refers to the Global Scope
  // },

  // greet: function() {
  //   console.log(`Hello, Flame Hashira: ${this.name}`);  // this could solve the previous problem
  // },

  greet() {
    console.log(`Hello, Flame Hashira: ${this.name}`);  // this could solve the previous problem
  },
};

person.greet();
