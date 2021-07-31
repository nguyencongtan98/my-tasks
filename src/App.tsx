import React from 'react';
import { Box } from "rebass";
import './App.css';
import "./task.css";


function App() {
  return (
    <Box className="App">
      <Box aria-label="task" className="task details">
        My task
      </Box>
    </Box>
  );
}

export default App;
