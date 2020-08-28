import React from "react";
import "./App.css";
import { FormControl, Select, MenuItem } from "@material-ui/core";

function App() {
  return (
    <div className="App">
      <div className="appHeader">
        <h1>Covid tracker</h1>
        <FormControl className="appDropdown">
          <Select variant="outlined" value="test">
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default App;
