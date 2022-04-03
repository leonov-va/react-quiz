import React from "react";
import "./Loader.scss";

const Loader: React.FC = (props) => {
  return (
    <div className="loader">
      <div className="loader__circle">
        <div className="loader__item"></div>
      </div>
    </div>
  );
};

export default Loader;
