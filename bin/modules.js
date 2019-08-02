const mongoose = require("mongoose");
const Module = require("../models/Module");

mongoose
  .connect("mongodb://heroku_chsmp865:f6rjf7odat3pdah70k8jpt0iab@ds153947.mlab.com:53947/heroku_chsmp865", {
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
    </ul>`,
    technicalSkills: [
      {
        skill: "MongoDB",
        goals: `
      <div>Teach students
        <ul>
          <li>what is a database, </li>
          <li>why we need databases, </li>
          <li>how to setup environment (install, configure, launch/stop), </li>
          <li>how to use Compass,</li>
          <li>how to import and create database, </li>
          <li>how to add collections, </li>
          <li>how to use query operators when querying documents,</li>
          <li>how to structure your documents and collections using data models</li>
        </ul>
      </div>`
      },
      {
        skill: "Node",
        goals: `
        <div>Teach students
          <ul>
            <li>what is runtime, </li>
            <li>set up node environment, </li>
            <li>get familiar with npm packages, </li>
            <li>what are asynchronous code and event loop</li>
          </ul>
        </div>`
      },
      {
        skill: "Mongoose",
        goals: `
        <div>Teach students
          <ul>
            <li>what is Model-View-Controller (MVC) Pattern, </li>
            <li>what is Object Document Mapper (ODM) and that Mongoose is ODM for Node, </li>
            <li>how to install mongoose, </li>
            <li>how to implement schema in the data models, </li>
            <li>how to:
              <ul>
                <li>create, </li>
                <li>read, </li>
                <li>update and </li>
                <li>delete documents using Mongoose</li>
              </ul>
            </li>
          </ul>
        </div>`
      },
      {
        skill: "ExpressJS",
        goals: `
        <div>Teach students
          <ul>
            <li>what is Express, </li>
            <li>what are the benefits of using this Nodejs framework,</li>
            <li>how the GET method works,</li>
            <li>how route params works, </li>
            <li>how query string works, </li>
            <li>what is the difference between the two above, </li>
            <li>how the POST method works, </li>
            <li>how to retrieve data from a form using req.body, </li>
            <li>get familiar with middlewares, </li>
            <li>be able to create your own middlewares, </li>
            <li>how to install and use Irongenerator (or Express generator) to create your own apps</li>
          </ul>
        </div>`
      },
      {
        skill: "How the Internet works",
        goals: `
        <div>Teach students
          <ul>
            <li>about history and evolution of the Internet, </li>
            <li>how to properly explain how the Internet works, </li>
            <li>what is the difference between the Internet and the Web, </li>
            <li>what is Server, </li>
            <li>what is Client, </li>
            <li>how the two above communicate, </li>
            <li>what is Request, </li>
            <li>what is Response, </li>
            <li>what happens when a request-response cycle is over</li>
          </ul>
        </div>`
      },
      {
        skill: "HTTP",
        goals: `
        <div>Teach students
          <ul>
            <li>what is HTTP, </li>
            <li>which are HTTP (request) verbs:
              <ul>
                <li>GET, </li>
                <li>POST, </li>
                <li>PUT, </li>
                <li>DELETE (as the most used), </li>
              </ul>
            </li>
            <li>how to create "first server program" using HTTP npm package</li>
          </ul>
        </div>`
      },
      {
        skill: "API",
        goals: `
        <div>Teach students
          <ul>
            <li>what is Application Programming Interface (API), </li>
            <li>why do we need APIs,</li>
            <li>what is JSON, </li>
            <li>how to build API, </li>
            <li>how to use other public APIs    </li>
          </ul>
        </div>`
      },
      {
        skill: "Authorization",
        goals: `
        <div>Teach students
          <ul>
            <li>what is authorization, </li>
            <li>why it is necessary to have it in nowadays apps, </li>
            <li>how to protect their apps using security measurements,</li>
            <li>how to create user accounts using username/email and password</li>
          </ul>
        </div>`
      },
      {
        skill: "AXIOS",
        goals: `
        <div>Teach students
          <ul>          
            <li>what is AXIOS, </li>
            <li>how to use them in the frontend and in the backend,</li>
            <li>how to use it to get the data, </li>
            <li>how to use it to post the data</li>
          </ul>
        </div>`
      },
      {
        skill: "Authentication",
        goals: `
        <div>Teach students
          <ul>
            <li>what is authentication, </li>
            <li>how authentication is related to authorization, </li>
            <li>what is a session, </li>
            <li>what are cookies, </li>
            <li>how to authenticate users in the app (provide credentials and send them to the server), </li>
            <li>how to use social logins, </li>
            <li>how to secure your app using user roles</li>
          </ul>
        </div>`
      },
      {
        skills: "Deployment",
        goals: `
        <div>Teach students
          <ul>
            <li>what are environment variables, </li>
            <li>how to use them, </li>
            <li>why not expose them, </li>
            <li>how to configure an environment to be able to deploy the app, </li>
            <li>what is Heroku, </li>
            <li>what is MongoLab, </li>
            <li>how to deploy your app on Heroku</li>
          </ul>
        </div>`
      }
    ]
  },
  {
    name: "Module III",
    number: 3,
    description: `
    <ul>
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
  </ul>`,
    technicalSkills: [
      {
        skill: "React Intro",
        goals: `
        <div>Teach students
          <ul>
            <li>what are frameworks,</li>
            <li>what are libraries,</li>
            <li>what are Single Page Applications (SPA),</li>
            <li>about React features</li>
          </ul>
        </div>`
      },
      {
        skill: "JSX",
        goals: `
        <div>Teach students
          <ul>
            <li>what is JSX (JS eXtension), </li>
            <li>how to use JSX to create elements and </li>
            <li>how to use them in the React app          </li>
          </ul>
        </div>`
      },
      {
        skill: "Components",
        goals: `
        <div>Teach students
          <ul>
            <li>what are components, </li>
            <li>how to work with components, </li>
            <li>what kind of components there are</li>          
          </ul>
        </div>`
      },
      {
        skill: "Props",
        goals: `
        <div>Teach students
          <ul>
            <li>what are props (short for properties), </li>
            <li>why they are important for React apps, </li>
            <li>when to use them, </li>
            <li>how to use them          </li>
          </ul>
        </div>`
      },
      {
        skill: "State & Lifting State Up",
        goals: `
        <div>Teach students
          <ul>
            <li>what is a state, </li>
            <li>how to use it, </li>
            <li>how to define it, </li>
            <li>how to update it, </li>
            <li>how to pass data back to parent component (from child component), </li>
            <li>why is it important to have state available in the whole app but keep it as "unique source of truth"</li>          
          </ul>
        </div>`
      },
      {
        skill: "Dispalying data - list, keys, conditionals",
        goals: `
        <div>Teach students
          <ul>
            <li>how to manipulate a different kind of data to be able to display it, </li>
            <li>how to display a list, </li>
            <li>get familiar with "key" prop, </li>
            <li>implement conditional rendering in React </li>
          </ul>
        </div>`
      },
      {
        skill: "Forms",
        goals: `
        <div>Teach students
          <ul>
            <li>how to create forms, </li>
            <li>how to handle inputs, </li>
            <li>how to submit the form and process the data</li>          
          </ul>
        </div>`
      },
      {
        skill: "Lifecycle Methods",
        goals: `
        <div>Teach students
          <ul>
            <li>how each component lifecycle works, </li>
            <li>understand the most used ones, </li>
            <li>get familiar with the less used ones</li>          
          </ul>
        </div>`
      },
      {
        skill: "Routing",
        goals: `
        <div>Teach students
          <ul>
            <li>how to create routes, </li>
            <li>how to use react-router-dom, </li>
            <li>how to set dynamic routes depending on passed params</li>          
          </ul>
        </div>`
      },
      {
        skill: "Integration of server & client",
        goals: `
        <div>
          <ul>
            <li>Recap how to create a server (API), </li>
            <li>understand how to work with res.json(), </li>
            <li>understand how to use AXIOS to get or pass data between the two apps (server and client), </li>
            <li>understand how to integrate parts of these two apps</li>
          </ul>
        </div>`
      },
      {
        skill: "Authentication",
        goals: `
        <div>Teach students
          <ul>
            <li>how to create full MERN app with signup, login, and logout features</li>
          </ul>
        </div>`
      },
      {
        skill: "Deployment",
        goals: `
        <div>Teach students 
          <ul>        
            <li>how to bundle the React app, </li>
            <li>how to integrate the two apps before deployment, </li>
            <li>how to deploy a full stack MERN app on Heroku</li>
          </ul>
        </div>`
      }
    ]
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
