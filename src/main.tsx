import React from "react";
import { createRoot } from "react-dom/client";
import { Buffer } from 'buffer';

// Полифилл для Buffer
window.Buffer = Buffer;

import "./index.css";
import App from "./App.tsx";

const ROOT_ID = 'root';
let rootElement = document.getElementById(ROOT_ID);
if (!rootElement) {
  rootElement = document.createElement('div');
  rootElement.id = ROOT_ID;
  document.body.appendChild(rootElement);
}

createRoot(rootElement).render(<React.StrictMode><App /></React.StrictMode>);
