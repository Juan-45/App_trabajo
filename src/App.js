import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "theme";
import Context from "./Context";
import React from "react";
import {
  currentDate,
  currentDayNumber,
  currentMonthString,
  currentYear,
} from "helpers/date";
import NavigationBar from "components/NavigationBar";
import Home from "pages/Home";

const App = () => {
  const navArguments = [
    {
      name: "home",
      path: "/",
      label: "Home",
    },
    {
      name: "tours",
      path: "/tours",
      label: "Recorridas",
    },
  ];

  const initialContext = {
    currentDate: {
      object: currentDate,
      day: currentDayNumber,
      month: currentMonthString,
      year: currentYear,
    },
  };

  console.log("Context", initialContext);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Context.Provider value={initialContext}>
            <NavigationBar
              navArguments={navArguments}
              loggedUserName={"OSA Herrera Juan José"}
            />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='test' element={<h2>Prueba</h2>} />
            </Routes>
          </Context.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
