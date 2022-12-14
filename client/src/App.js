import React from "react";
import Routes from "./Routes";
import { cometInit } from "./config/comet-chat";

function App() {
  cometInit();
  return (
    <div className="App bg-[rgb(239,242,245)] h-full">
      <Routes />
    </div>
  );
}

export default App;
