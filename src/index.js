import React, { useState } from "react";
import ReactDOM from "react-dom";
import Configuration from "./components/Configuration";
import DayView from "./components/DayView";
import MonthView from "./components/MonthView";
import "semantic-ui-css/semantic.min.css";
import "./style/configuration.css";
import "./style/calendarView.css";
import "./style/app.css";

function App() {
  const [configurations, setConfigurations] = useState([]);
  const [isConfiguring, setIsConfiguring] = useState(true);

  const onExitConfiguring = confs => {
    setConfigurations(confs);
    setIsConfiguring(false);
  };

  return (
    <>
      {isConfiguring ? (
        <Configuration
          onExit={onExitConfiguring}
          configurations={configurations}
        />
      ) : (
        <MonthView
          onConfigure={() => setIsConfiguring(true)}
          configurations={configurations}
        />
      )}
    </>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
