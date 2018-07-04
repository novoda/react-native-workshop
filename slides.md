---
# React Native Workshop
## All the things!

---
# The tools

---
# JavaScript basics

To declare a variable, you can either use `const` (for constants), or `let` (for variables that can change over time).

TLDR: Do not use `var`.

Long explanation: `var` is a variable that can have multiple values as `let`, but it's visible in the outer scope (so: globally if outside a function, all the function inside a function). `let` will be visible only inside the scope it's declared in (e.g., a `for` loop inside a function).

```javascript
const count = 10;

for (let i = 0; i < count; i++) {
  console.log(`Hello ${count}`);
}
```

You can use single, double, and inverse quotes to create string literals, only inverse quotes can interpolate variables though.

```javascript
const name = "Daniele";

console.log("Hello " + name);
console.log('Hello ' + name);
console.log(`Hello ${name}`);
```

To create arrays, you can use square brackets `[]`.

```javascript
const anArray = [1, 2, 3];
```

To create objects (string indexed dictionaries), you can use curly brackets.
```javascript
const obj = {
  a: 1,
  b: "Hello",
  c: {
    nested: true
  }
};
```

To create a function, you can use both the `function` keyword, or use the arrow `=>` syntax. Arrow functions can directly return a value as an expression, and don't need `()` around a single argument. They need `()` around the return value if they return an object.

TLDR: they're mostly interchangeable, but prefer arrow syntax over function.

Long explanation: The main differences are:
1. Arrow functions cannot be used as constructors (a function works as a class constructor of itself, kind of, `class` is just syntactical sugar).
2. `this` in arrow functions is easier to reason about: it's the `this` of the scope in which the function is declared. In a normal function, `this` might change depending on how it's invoked.

```javascript
function say(name) {
  console.log(`Hello ${name}`);
};

const say = (name) => {
  console.log(`Hello ${name}`);
};

const double = n => n * 2;
const makeConfig = () => ({debug: true, log: false}); // returns the object
```

You can _spread_ objects and arrays, which applies their content to the current expression. The order in which you spread your object **matters**: to decide which ones overrides in case of objects with the same fields, earlier declarations are overridden.

```javascript
const numbers = [1, 2, 3];
const add = (a, b, c) => a + b + c;
const total = add(...numbers); // 6
const twice = [...numbers, ...numbers]; // [1,2,3,1,2,3]

const defaults = {
  log: false,
  debug: true
}

const options = {
  debug: false
}

const overrideOptions = {...options, ...defaults} // {log: false, debug: true}
const overrideDefaults = {...defaults, ...options} // {log: false, debug: false}
const overrideWithFields = {...defaults, debug: false} // {log: false, debug: false}
```

You can **destructure** (access their inner values directly) objects and arrays.
```javascript
const [first, second] = [1,2,3]; // first: 1, second: 2
const [, last] = [1,2,3]; // last: 3
const add = ([first, second]) => first + second;
add([1,2]);

const {a, b} = {a: 1, b: 2}; // a: 1, b: 2
const add = ({first, second}) => first + second;
add({first: 1, second: 2});
```

To check for equality, **always** use the triple equal `===`. Objects are **never** equal between each other. `==` casts the two object to the same type before comparing, and assumptions on the behaviour might lead to unexpected results because the implementation might be not intuitive.

```javascript
const a = 1;
const b = "1";
const c = 1;
a === b // false
a === c // true

{a: 1} === {a: 1} // false
```

To declare a class, use the `class` keyword. To reference fields, use the `this` keyword.

```javascript
class Hello extends World {
  constructor(options) {
    super(options);
    this.name = options.name;
  }

  speak() { // method declared as a function
    console.log(`Hi ${this.name}`);
  }

  fullName = () => this.name + this.surname; // method declared as arrow function
}
```

You can use `export` to export a variable/class/function. You can use `import` to import 3rd party libraries installed via npm and local files.

```javascript
// someFile.js
export const aFunction = () => {};
const anotherFunction = () => {};
export default anotherFunction; // this is a default export, only one per file!

// anotherFile.js
import React, {Component} from "react";
// anotherFunction is imported as a default, aFunction is imported from the module
import anotherFunction, {aFunction} from "./someFile";
```

# Getting started
1. Clone the kata
2. Install the dependencies with `yarn install`
3. Start your app with `yarn ios` or `yarn android`, remember that you'll need an Android emulator already running for it to work!
4. `cmd+M`/`cmd+D` (Android/iOS) opens the dev menu, try to make some changes and reload, try the auto reload! `R,R`/`cmd+R` reloads the page.
5. Attach the debugger and try to set a breakpoint in Chrome.

---
# Hello Todo!
Currently `App.js` is quite boring, it would be great if instead of having the todos hardcoded, we could somehow cycle through an array of todos and show a `Text` per element.

First of all, we need to extract the data for the todos, in `App.js`:
```javascript
const todos = [{
    name: "Take the dog out",
  }, // ...
];
```

Inside `render()`, you can then map those todos to a certain element:

```javascript
const todoElements = todos.map(todo => <Text>{todo.name}</Text>);
```

> Inside a component you can include a JS expression with `{expression}`, in this case `{todo.name}`.

Since `todoElements` is an expression, we can include it inside our `View`, instead of the 3 `Text` elements, remember to use `{}`!

---
# Keys in loops

If you reloaded, you'll notice there's a small yellow warning on the bottom of the app. Components rendered with loops require a `key` property that identifies them.
Keys are important for react to be able to understand which views have been added, removed or altered.

> As you can do inside a component, you can use `propName={expression}` to pass properties. If it's a hardcoded string, prefer `propName="value"`.

Before moving to the next step, let's use `todo.name` as a key for our elements.

---
# Conventions
- Sometimes I'll reference React Native components, such as `Text`. These can be imported with `import { ComponentName } from "react-native";`.
- When you need to create a new component, save it in `ComponentName.js` and import it with `import { ComponentName } from "./ComponentName';`.

---
# Abstracting away
The app looks amazing! But it would be great to have a component `Todo` instead of using `Text`. The simplest components can be functions that accept properties and return other components, strings or `null`. Pay attention to the brackets for the function, we'll go over that next.
```javascript
export const MyComponent = ({name}) => <Text>Hello {name}!</Text>;
<MyComponent name="Daniele" /> // Somewhere in the app
```
You can reference JS variables using `{curlyBraces}`.

---
# ({a, b, c})?!?
To write an anonymous function in JS, you can use `const add = (p2, p2) => { return p1 + p2; }`. There are some tricks to make it easier to write though.
- Instead of having the body, you can directly return an expression `(p1, p2) => p1 + p2`
- If your parameter is an object, you can directly reference its keys with `{k1, k2}`.
- React Components receive an object called `properties`, containing the attributes we pass to the component when we use it: `<MyComponent name="Daniele" />`.

---
# Lists
Our todo list is coming up quite well, but it won't scroll! We could use `ScrollView`, but then all our todos would be rendered at the same time, even the ones off screen.
To render arbitrary amount of data, we can use `FlatList`.
`FlatList` accepts these (and more) parameters:
1. `data`: is our array of todos
2. `renderItem`: this is a function which will return a component, it receives an object containing the keys `item` (our todo, in this case) and `index`.
Rewrite the array mapping with `FlatList`.

Extract the list inside a `TodoList` component.

---
# Lists - Keys
You should now have another warning, `FlatList` needs to figure out the object key somehow, you can solve it two ways:
1. Add a `key` field to our todos.
2. Add a new property to `FlatList`: `keyExtractor`. It's a function that receives 2 parameters `(item, index)` and needs to return a `string` key, you could return `todo.name` here. This function isn't receiving an object, don't use the `{}`.

---
# State & co
It's time to tick some todos, let's add a new field to them: `completed`, and set it to `false`.

Now, let's add that to our properties in `Todo`, and let's use a `Switch` to display it. The property to tell a `Switch` if it's active or not is `value`.

---
# Tick a todo! {.big}

---
# It lives..!
![](https://media.giphy.com/media/2wwJpbHZeSQ5G/giphy.gif)

---
# ... Or not?
![](https://media.giphy.com/media/MpceqYw3yRC9y/giphy.gif)

---
# State - getting and initial
To make the `Switch` work, we need to **change the state of our app**. React class components can be stateful, which means the `App` component can hold its state and react to events.

To access the state in a component, you can use `this.state`. This means our `App` component can pass the todo list as a property to `TodoList`, receiving it from the state.

The initial state can be set in the constructor of a component, or alternatively `state = initialState` inside the class.

---
# State - altering

To alter the state of a component, you invoke `this.setState()` inside a component; there are 2 ways of invoking it:

1. `setState({key: newValue})`, which alters `key` to represent our new state.
2. `setState(oldState => newState)`, when you need to alter the state of our component but depend on the previous state. Never use the first one and `this.state` as state changes are **asynchronous**.

---
# Adding state to the app

1. Add a new property to `Todo`: a callback `onTodoChanged`.
2. Add a new property to `TodoList`: a callback `onTodoChanged`.
3. Report the event in `App` and set the new state.
