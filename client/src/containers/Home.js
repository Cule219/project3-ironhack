import React from "react";
import { Link } from "react-router-dom";
const Home = () => {
  return (
      <h1>
        <Link to="/dashboard">Dashboard</Link>
      </h1>
  );
};

export default Home;
