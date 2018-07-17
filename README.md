---
# React Native Workshop
## All the things!

---
# JavaScript basics

To declare a variable, you can either use `const` (for constants), or `let` (for variables that can change over time).

tl;dr: Do not use `var`.

`var` is a variable that can have multiple values like `let`, but it's visible in the outer scope (which means, globally if declared outside a function, in the whole function body if declared inside). `let` will only be visible inside the scope it's declared in (e.g., a `for` loop inside a function).

```javascript
const count = 10;

for (let i = 0; i < count; i++) {
  console.log(`Hello ${count}`);
}
```

You can use single, double, and inverse quotes to create string literals, only backticks can interpolate variables though.

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

tl;dr: they're mostly interchangeable, but prefer arrow syntax over function.

There are 2 main differences between arrow and function syntax:
1. Arrow functions cannot be used as constructors (a function works as a class constructor of itself, kind of, `class` is just syntactical sugar).
2. The `this` keyword: in JS, it represents the _context_ with which the function is executed. In functions, the context might change depending on how the function is invoked (for example, you could provide a different `this` using `Function::apply(thisArg, args)`). In arrow functions, it doesn't change at runtime (it will inherit the parent context, in the current scope).

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

You can _spread_ objects and arrays, which applies their content to the current expression. The order in which you spread your object **matters**. In case of objects with the same fields, earlier declarations are overridden by the matching ones that come later.

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
const [first, second] = [1, 2, 3]; // first: 1, second: 2
const [, last] = [1, 2, 3]; // last: 3
const add = ([first, second]) => first + second;
add([1, 2]);

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
You can use `export` to export a variable/class/function. One of the exports can be declared as a `default` export.

You can use `import` to import other JS modules: you can access local files using a relative path, and dependencies installed via NPM using the name of the package in the import statement.

To import a default export:

```javascript
// hello.js
// you can export a class as default in one line
export default class Hello {};
// or, if you're exporting a variable
const Hello = "world";
export default Hello;

// anotherFile.js
import React from "react"; // importing from a dependency
import Hello from "./hello"; // importing from a local file
```

To import other exports:

```javascript
// hello.js
// to export a class as non default, you need to export it after being declared
class Hello {};
export {
  Hello
}
// you can export a variable in one line
export const Hello = "world";

// anotherFile.js
import {Component} from "react";
import {Hello} from "./hello";
// or alternatively, you can have one import and reference fields
import AnyName from "hello";
doSomething(AnyName.Hello)
```

# Getting started
1. Clone the kata
2. Install the dependencies with `yarn install`
3. Start your app with `yarn ios` or `yarn android`, remember that you'll need an Android emulator already running for it to work!
4. `cmd+M`/`cmd+D` (Android/iOS) opens the dev menu, try to make some changes and reload, try the auto reload! `R,R`/`cmd+R` reloads the page.
5. Attach the debugger and try to set a breakpoint in Chrome.

---
# Hello Todo!
Currently, `App.js` is quite boring, it would be great if instead of having the TODOs hardcoded, we could somehow cycle through an array of TODOs and show a `Text` per element.

First of all, we need to extract the data for the TODOs, in `App.js`:
```javascript
const todos = [{
    name: "Take the dog out",
  }, // ...
];
```

The `render` method must return a hierarchy of views that we want to display. We can `map` our todos to views inside that method.

```javascript
const todoElements = todos.map(todo => <Text>{todo.name}</Text>);
```

Inside a component you can include a JS expression with `{expression}`, in this case, `{todo.name}`.

Since `todoElements` is an expression, we can include it inside our `View`, instead of the 3 `Text` elements. Remember to use `{}`!

---
# Keys in loops

If you reloaded, you'll notice there's a small yellow warning on the bottom of the app. Components rendered with loops require a `key` property that identifies them.
Keys are important for React to be able to understand which views have been added, removed or altered.

As you can do inside a component, you can use `propName={expression}` to pass properties. If it's a hardcoded string, prefer `propName="value"`.

Before moving to the next step, let's use `todo.name` as a key for our elements.

---
# Abstracting away

Now that our single TODO is well isolated, we can extract it to a separate component.

The simplest component (a **stateless** component) is a function that returns a tree of elements. It must have no side effects and return the same result given the same input.

```javascript
const Hello = ({name}) => (
  <Text>Hello {name}!</Text>
);
```

The first argument of the function is the properties passed to the component. We're destructuring it and accessing `name` directly.

You can then import your new component and use it as any other React component. If you declared the component in another file, make sure to export it!
To pass props to a component, add them as an attribute when you use it.

```javascript
<Hello name="Daniele" />
```

Note that, in this case, since we don't accept children (components inside our component), the component has only one tag, which is called self-closing, and terminates with `/>` instead of just `>`.

Extract a `TodoItem` component, that accepts a `name` parameter, and substitute the `Text`s with it.

---
# Lists
Our TODO list is coming together quite well, but it won't scroll!

There are a few possible solutions to it:

1. Using `ScrollView` instead of our `View` element would make it scrollable.
2. Using `FlatList`, a similar concept to `RecyclerView` on Android and `UICollectionView` on iOS.

`ScrollView` is usually picked when we have a fixed layout that might not fit in the container, `FlatList` is used when we have an arbitrary amount of data and we want to render only the components that are visible on the screen. We will go with `FlatList`.

`FlatList` accepts various properties, we will focus on 2 of them:

1. `data`, which represents the data we want to render.
2. `renderItem`, which is expected to be a function. It receives an object containing 2 keys: `item` and `index`, representing the current item in the list and its index, and must return a tree of elements.

We could reuse the same function we used with `todos.map()` earlier, as long as we change how we access the TODOs (the parameters are inside an object, you can destructure to access them directly).

Extract a `TodoList` element, that accepts a property `todos`, a list of TODOs, and uses `FlatList` to render `TodoItem`s.

---
# Lists - Keys

You should now have another warning: `FlatList` needs to somehow figure out the object key. There are 2 ways of solving this.

1. Add a unique `key` field to each one of our TODOs (the data).

```javascript
const todos = [{
  name: "Take the dog out",
  key: "abc"
}];
```

2. Alternatively, we can pass an additional property to `TodoList`: `keyExtractor`. This is a function that receives two parameters: `item` and `index` (not inside an object this time), and needs to return a string representing the key of this element.

Pick one of the two options and get rid of the warning, then remove the property `key` from the `TodoItem` element.

---
# State
It's time to tick some TODOs. let's add a new field to them: `completed`, and set it to `false`.

```javascript
const todos = [{
  name: "Take the dog out",
  completed: false
}];
```

Now, let's add that to our properties in `Todo`:

```javascript
const Todo = ({name, completed}) => ...
```

To display the two different states of a TODO (completed, incomplete), we can use a `Switch`, which accepts a property named `value`.

---
# Altering the state

If you tried to click one of the switches, you will have noticed that the switch goes back in its original position. This happens because `Switch` is a (controlled component)[https://reactjs.org/docs/forms.html#controlled-components], which in short means that its state is only updated when invoking `setState()`.

Usually, React applications tend to have components that hold no state, and which are only responsible for displaying the current state of the app via properties. The state is then usually kept outside of them. In our case, it means we can hold the state inside the `App` component.

As your app grows, keeping the state inside `App` might become cumbersome. In that case, you might want to look at other solutions, for example, [Redux](https://redux.js.org/).

The first thing we need to do is to move the TODOs inside the state of component and use it:

```javascript
const todos = [...];

class App extends Component {
  state = {
    todos: todos
  }

  render() {
    return <TodoList todos={this.state.todos} />
  }
}
```

This will have the result to set the initial state and use it to render our list.

After this, we need to react to inputs by the user. To do that, we need to add a callback to the `Switch` components, and propagate the event up to the `App` component. A callback is just another property in the component, which expects a function as its value. In the case of `Switch`, the property name is `onValueChanged`, which receives a boolean representing the new value (`true`/`false`).

If we add a callback to `Todo`, `TodoList` can then react to the event. If we do that also in `TodoList`, we can intercept the event in the `App` component.

To alter the state of a component, you need to invoke `this.setState` inside that component. Writing directly to `this.state` will not ensure the propagation of the change. `setState` can be invoked in two ways:

1. `setState({key: newValue})`, which alters `key` to represent our new state. This merges the previous state with the keys provided, so if you alter only one of 2 keys in the state, the second one will remain untouched. Note that this is a **shallow** approach, and works only on the keys in the root.
2. `setState(oldState => newState)`, which accepts a function.

The second case is required when your update depends on the current state. The function receives the current state and must return the new state (which is then merged, like the previous case). Since state updates are asynchronous, this is necessary because you're not ensured to have the latest state inside `this.state`.

Add a callback to the various components, and update the state inside `App`.

# Promises

The standard interface to do asynchronous work in JS is `Promise`. A promise is an object representing something (for example, a network request) that will end in the future.

Unlike `Observable`, a `Promise` is immediately executed upon creation!

## Receiving results

To access the results of a promise (the promise was **resolved**), you need to invoke the `then` method and provide a callback to it. The callback will receive the result of the operation as the only parameter.

If you return a value inside that callback, you'll create a new promise which will resolve to that return value. You can also return a promise inside a promise, it will be resolved before calling the next step.

```javascript
Promise.resolve(2) // creates a promise that immediately resolves with value 2
  .then(n => n * 2) // n = 2
  .then(m => Promise.resolve(m * 3)) // m = 4
  .then(o => doSomething(o)) // o = 12
```
## Intercepting errors

To intercept eventual errors in a promise (the promise was **rejected**), you need to invoke the `catch` method and provide a callback to it. The callback will receive the error as the only parameter.

If you throw inside a `then` (or return a rejected promise, for example `Promise.reject`), the promise will be rejected and you can `catch` after it.

If you return a value in `catch`, it creates a new promise resolving to that value.

```javascript
Promise.resolve("Hello!")
  .then(n => { throw new Error("My mistake!") })
  .catch(e => "No problem");
  .then(value => Promise.reject("I don't like this"))
```

If you don't `catch` a rejected promise, it will throw an error and crash (the same as if you didn't catch an exception in a try/catch statement).

# Persisting the state

Let's make sure that changes in our list are persisted between apps restarts. To do that, we will be using [`AsyncStorage`](https://facebook.github.io/react-native/docs/asyncstorage.html).

To retrieve something stored, we can use `getItem`: it accepts a key and it returns a promise, the result will be either the previously stored data, or `null` if there isn't any.

To retrieve the state when the application is initialized, we can use one of the lifecycle callbacks of a component (they're present only in class components), [`componentDidMount`](https://reactjs.org/docs/react-component.html#componentdidmount) and set the retrieved state inside the promise callback.

```javascript
componentDidMount() {
  AsyncStorage.get('todos')
    .then(todos => this.setState({todos: todos}));
}
```

To store something, we can use `setItem`: it accepts a key and the value that we want to store, it returns a promise that will be resolved when the data is stored (in this case, when the promise is resolved, we won't receive any value).

There isn't a standard lifecycle method that we can use to persist our state. [`componentWillUnmount`](https://reactjs.org/docs/react-component.html#componentwillunmount) will be invoked when the application is shutting down, but it won't wait for `AsyncStorage` to write to disk. One possible option is to save the state every time we update it.

```javascript
const onTodoChanged = (todo, index) => {
  this.setState({todos: newTodos});
  AsyncStorage.set('todos', newTodos);
}
```

Try to toggle some todos and restart the app, the changes should now be kept!
