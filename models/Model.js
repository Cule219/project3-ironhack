const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const moduleSchema = Schema(
  {
    name: String,
    desc: String,
    overview: [{
        technicalSkills: String,
        goals: String,
      }],
    
  }
);

module.exports = mongoose.model("Module", moduleSchema);


let moduleI = {
  name: 'Module I',
  desc: `
  Recap the learning outcomes of the Module 0 (prework)
  Learn the foundational topics in Web Development:
  HTML basics
  CSS basics
  Responsive Web Design using Flexbox and Bootstrap
  JS basics:
  variables,
  data types (string, number, boolean, object, array)
  conditionals,
  functions,
  develop algorithm thinking and problem-solving skills
  Object-Oriented Programming basic concepts:
  class,
  inheritance,
  Objects,...
  DOM manipulation,
  Git, GitHub, Version Control
  Get ready to create and present game using DOM manipulation and/or canvas and gained knowledge in responsive design subjects.
  `,
  overview: [{
    technicalSkills:`Git + GitHub`,
    goals: `Teach students what is a version control system, 
    what is a git, 
    how to create a new repo, 
    how to clone a repo, 
    how to check status, 
    how to add files to a commit, 
    how to commit, 
    how to push the files to the remote repo, 
    how to use git log, 
    how to create and use GitHub and 
    stress the importance of saving your code to GitHub on a daily basis
    `
    },
    {
      technicalSkills:`Responsive Web Design`,
      goals:`Teach the basics of responsive design,
      get students familiar with media queries, 
      "mobile first" design,
      teach students to use flexbox, 
      teach students how to use Bootstrap
      `
    },
    {
      technicalSkills:`Basic JS Data Structures`,
      goals:`Recap of a JS part of Module 0 (prework) to make sure students understand: 
      how to declare variables, 
      let, var, const => why,
      how to use conditionals, 
      how to use loops, 
      how to create and invoke functions,
      what are different types of functions,
      how to work with objects, 
      how to work with arrays, 
      how to use array methods,
      promises
      `
    },
    {
      technicalSkills:`JS Basic Algorithms`,
      goals:`Teach/practice with students how to problem-solve and 
      how to develop analytical thinking, 
      how to break down problems and 
      how to reiterate their solutions in order to get proficient in creating cleaner code
      `
    },
    {
      technicalSkills:`Object-Oriented Programming`,
      goals:`
      Teach students about object-oriented programming concept, 
      why is JS object-oriented language, 
      cover basic concepts: 
      Class, 
      inheritance, 
      objects, and get them familiar with:
      abstraction, 
      encapsulation, 
      polymorphism
      `
    },
    {
      technicalSkills:`DOM Manipulation`,
      goals:`
      Teach students 
      how to use Vanilla JS to 
      traverse DOM: 
      query and modify the DOM, 
      add/remove classes and attributes,
      listen to events
      For the ones who have more time, there's also material on how to use jQuery to do the same as above.
      `
    },
    {
      technicalSkills: `Debugging and Error Handling`,
      goals: `
      Teach students what is debugging, 
      how to properly use console object, 
      how to use breakpoints, watch and call stack,
      what are the most common types of errors in JS,
      and what is and how to use JSHint
      `
    },
    {
      technicalSkills: `Intro to TDD (Test Driven Development)`,
      goals: `
      Teach students about TDD, 
      how to write and 
      be able to read tests
      `
    },
    {
      technicalSkills: `Canvas`,
      goals: `
      Teach students how to use canvas HTML tag, 
      how to draw on it, 
      style it, 
      add text and images to it, 
      how to implement basic animations
      `
    },
    {
      technicalSkills: `Git + GitHub`,
      goals: `
      Teach students what is a version control system, 
      what is a git, 
      how to create a new repo, 
      how to clone a repo, 
      how to check status, 
      how to add files to a commit, 
      how to commit, 
      how to push the files to the remote repo, 
      how to use git log, 
      how to create and use GitHub and 
      stress the importance of saving your code to GitHub on a daily basis
      `
    }
  ]
}

let moduleII = {
  name: 'Module II',
  desc: `
  Learn the Backend Framework:
  how the Model-View-Controller works, 
  how to create a database, 
  how to connect your DB with the server, 
  how to display data on the views, 
  how to be able to pick up data users fill in the form and save them in the database, 
  how to be able to create users in your apps, 
  how to be able to authenticate users in your apps, 
  how to be able to secure your apps (using middlewares, roles, etc)
  - Get ready to create and present full stack app having users and all CRUD operations
  `,
  overview: [
    {
      technicalSkills: `MongoDB`,
      goals: `
      Teach students
      what is a database, 
      why we need databases, 
      how to setup environment (install, configure, launch/stop), 
      how to use Compass,
      how to import and create database, 
      how to add collections, 
      how to use query operators when querying documents,
      how to structure your documents and collections using data models
      `
    },
    {
      technicalSkills: `Node`,
      goals: `
      Teach students
      what is runtime, 
      set up node environment, 
      get familiar with npm packages, 
      what are asynchronous code and event loop
      `
    },
    {
      technicalSkills: ``,
      goals: ``
    },
    {
      technicalSkills: ``,
      goals: ``
    },
    {
      technicalSkills: ``,
      goals: ``
    },
    {
      technicalSkills: ``,
      goals: ``
    },
    {
      technicalSkills: ``,
      goals: ``
    },
    {
      technicalSkills: ``,
      goals: ``
    },
  ]
}