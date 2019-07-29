import React from "react";

const Collapsible = props => {
  return props.open !== true ? <div /> : <div>{props.children}</div>;
};

export default Collapsible;
