import React from "react";
import "./Button.scss";

interface IButton {
  className?: string;
  onClick?: () => void;
}

const Button: React.FC<IButton> = React.memo((props) => {
  const { className = "", onClick, children } = props;

  return (
    <button className={`button ${className}`} type="button" onClick={onClick}>
      {children}
    </button>
  );
});

export default Button;
