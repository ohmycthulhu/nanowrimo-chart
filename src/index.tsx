import "./styles.css";
import React from "react";
import ReactDOM from "react-dom";

import {NanowrimoChart} from "./nanowrimo/chart";
//

export default function App() {
  return (
    <main className="mainContainer">
      <div style={{height: '20rem'}}>
        <NanowrimoChart />
      </div>
    </main>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
