import React from "react";
import ReactDOM from "react-dom/client";
import Quiz from "./components/Quiz/Quiz";
import { QuizProvider } from "./contexts/quiz";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <QuizProvider>
      <Quiz />
    </QuizProvider>
  </React.StrictMode>
);
