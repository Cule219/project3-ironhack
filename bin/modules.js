const mongoose = require("mongoose");
const Module = require("../models/Module");

mongoose
  .connect("mongodb://127.0.0.1/final-project-ironhack", {
    useNewUrlParser: true
  })
  .then(x => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch(err => {
    console.error("Error connecting to mongo", err);
  });

// load data from https://docs.google.com/document/d/1o6ADnP57i9QztARU-UDvCf2lhKLxgLQ-jpOyajkt5HI/edit... Ideally this wouldn't be manual, but :shruggie:

let modules = [
  {
    name: "Module I",
    number: 1,
    description: `
  <ul>
    <li>Recap the learning outcomes of the Module 0 (prework)</li>
    <li>Learn the foundational topics in Web Development:
      <ul>
        <li>HTML basics</li>
        <li>CSS basics</li>
        <li>Responsive Web Design using Flexbox and Bootstrap</li>
        <li>JS basics:
          <ul>
            <li>variables,</li>
            <li>data types (string, number, boolean, object, array)</li>
            <li>conditionals,</li>
            <li>functions,</li>
            <li>develop algorithm thinking and problem-solving skills</li>
          </ul>
        </li>
        <li>Object-Oriented Programming basic concepts:
          <ul>
            <li>class,</li>
            <li>inheritance,</li>
            <li>Objects,...</li>
          </ul>
        </li>
        <li>DOM manipulation,</li>
        <li>Git, GitHub, Version Control</li>
      </ul>
    </li>
    <li>Get ready to create and present game using DOM manipulation and/or canvas and gained knowledge in responsive design subjects.</li>
  </ul>`,
    technicalSkills: [
      {
        skill: "HTML & CSS Basics",
        goals: `
      <div>Recap of an HTML/CSS part of Module 0 (prework) to make sure students
        <ul>
          <li>are able to use HTML tags, </li>
          <li>are able to make differences between inline and block elements, </li>
          <li>can use style elements to add styles to the HTML bones,</li>
          <li>are able to work with different CSS properties and know which to use</li>
        </ul>
      </div>`
      },
      {
        skill: "Responsive Web Design",
        goals: `
        <div>
        <ul>
          <li>Teach the basics of responsive design,</li>
          <li>get students familiar with media queries, </li>
          <li>"mobile first" design,</li>
          <li>teach students to use flexbox, </li>
          <li>teach students how to use Bootstrap"</li>
        </ul>
        </div>`
      },
      {
        skill: "Basic JA Data Structures",
        goals: `
        <div>Recap of a JS part of Module 0 (prework) to make sure students understand: 
          <ul>
            <li>how to declare variables, </li>
            <li>let, var, const => why,</li>
            <li>how to use conditionals, </li>
            <li>how to use loops, </li>
            <li>how to create and invoke functions,</li>
            <li>what are different types of functions,</li>
            <li>how to work with objects, </li>
            <li>how to work with arrays, </li>
            <li>how to use array methods,</li>
            <li>promises</li>
          </ul>
        </div>`
      },
      {
        skill: "JS Basic Algorithms",
        goals: `
        <div>
          <ul>
            <li>Teach/practice with students how to problem-solve and </li>
            <li>how to develop analytical thinking, </li>
            <li>how to break down problems and </li>
            <li>how to reiterate their solutions in order to get proficient in creating cleaner code</li>      
          </ul>
        </div>`
      },
      {
        skill: "Object-Oriented Programming",
        goals: `
        <div>
          <ul>
            <li>
              Teach students about object-oriented programming concept,{" "}
            </li>
            <li>why is JS object-oriented language, </li>
            <li>
              cover basic concepts:
              <ul>
                <li>Class, </li>
                <li>inheritance, </li>
                <li>objects, and get them familiar with:</li>
                <li>abstraction, </li>
                <li>encapsulation, </li>
                <li>polymorphism</li>
              </ul>
            </li>
          </ul>
        </div>`
      },
      {
        skill: "DOM Manipulation",
        goals: `
        <div>
          <ul>
            <li>Teach students how to use Vanilla JS to 
              <ul>
                <li>traverse DOM: </li>
                <li>query and modify the DOM, </li>
                <li>add/remove classes and attributes,</li>
                <li>listen to events</li>
              </ul>
            </li>
            <li>For the ones who have more time, there's also material on how to use jQuery to do the same as above.</li>
          </ul>
        </div>`
      },
      {
        skill: "Debugging and Error Handling",
        goals: `
        <div>
          <ul>
            <li>Teach students what is debugging, </li>
            <li>how to properly use console object, </li>
            <li>how to use breakpoints, watch and call stack,</li>
            <li>what are the most common types of errors in JS,</li>
            <li>and what is and how to use JSHint</li>
          </ul>
        </div>`
      },
      {
        skill: "Intro to TDD (Test Driven Development)",
        goals: `
        <div>
          <ul>
            <li>Teach students about TDD, </li>
            <li>how to write and </li>
            <li>be able to read tests</li> 
          </ul>
        </div>`
      },
      {
        skill: "Canvas",
        goals: `
        <div>
          <ul>
            <li>Teach students how to use canvas HTML tag, </li>
            <li>how to draw on it, </li>
            <li>style it, </li>
            <li>add text and images to it, </li>
            <li>how to implement basic animations</li>
          </ul>
        </div>`
      },
      {
        skill: "Git + Github",
        goals: `
        <div>
          <ul>
            <li>Teach students what is a version control system, </li>
            <li>what is a git, </li>
            <li>how to create a new repo, </li>
            <li>how to clone a repo, </li>
            <li>how to check status, </li>
            <li>how to add files to a commit, </li>
            <li>how to commit, </li>
            <li>how to push the files to the remote repo, </li>
            <li>how to use git log, </li>
            <li>how to create and use GitHub and </li>
            <li>stress the importance of saving your code to GitHub on a daily basis</li>
          </ul>
        </div>`
      }
    ]
  },
  {
    name: "Module II",
    number: 2,
    description: `
    <ul>
      <li>Learn the Backend Framework:
        <ul>
          <li>how the Model-View-Controller works, </li>
          <li>how to create a database, </li>
          <li>how to connect your DB with the server, </li>
          <li>how to display data on the views, </li>
          <li>how to be able to pick up data users fill in the form and save them in the database, </li>
          <li>how to be able to create users in your apps, </li>
          <li>how to be able to authenticate users in your apps, </li>
          <li>how to be able to secure your apps (using middlewares, roles, etc)</li>
        </ul>
      </li>
      <li>Get ready to create and present full stack app having users and all CRUD operations</li>
    </ul>`
  },
  {
    name: "Module III", 
    number: 3,
    description: 
    `<ul>
      <li>Learn Frontend Framework - ReactJS:
      <ul>
        <li>get familiar with the concept of Single Page Applications and what are the reasons to build them,</li>
        <li>learn how to build components,</li>
        <li>learn how to manipulate with data in the components (to display the data or pick up data from the form),</li>
        <li>learn how to pass data from parent component to child components,</li>
        <li>learn how to pass data from child components to the parent component,</li>
        <li>learn how to maintain the state in the app,</li>
        <li>learn how to be able to have multiple routes in your app,</li>
        <li>learn how to connect the server (API) and client (React app)</li>
        <li>learn how to deploy MERN app to Heroku</li>
      </ul>
    </li>
    <li>Get ready to create and present full stack MERN app having users and all CRUD functions and being deployed to Heroku</li>
  </ul>`
  }
]

Module.create(modules)
  .then(ms => {
    console.log(ms);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
