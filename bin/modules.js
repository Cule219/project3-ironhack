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
        skill: "Responsive Web Design"
      },
      {
        skill: "Basic JA Data Structures"
      },
      {
        skill: "JS Basic Algorithms"
      },
      {
        skill: "Object-Oriented Programming"
      },
      {
        skill: "DOM Manipulation"
      },
      {
        skill: "Debugging and Error Handling"
      },
      {
        skill: "Intro to TDD (Test Driven Development)"
      },
      {
        skill: "Canvas"
      },
      {
        skill: "Git + Github"
      }
    ]
  },
  {
    name: "Module II"
  },
  {
    name: "Module III"
  }
];

Module.create(modules)
  .then(ms => {
    console.log(ms);
    mongoose.connection.close();
  })
  .catch(err => {
    console.log(err);
  });
