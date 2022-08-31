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
import Tours from "pages/Tours";

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

  //Mantener fecha actualizada
  const [contextState, setContextState] = React.useState({
    currentDate: {
      object: currentDate,
      day: currentDayNumber,
      month: currentMonthString,
      year: currentYear,
    },
    toursCommonData: {
      policeStation: "Seccional Comando Patrulla Pergamino",
    },
    tours: [
      {
        frequency: "",
        day: "",
        month: "",
        year: "",
        policeStation: "Seccional Comando Patrulla Pergamino",
        prosecution: "",
        prosecutor: "",
        felony: "",
        victim: "",
        address: "",
        phone: "",
        endingDate: "",
        id: "default",
      },
    ],
    instructors: [
      /*{ label: "No hay datos", adjunct: "default", id: "default" }*/
    ],
    currentInstructor: { rank: "", instructor: "" },
    prosecutions: [],
  });

  console.log("Context", contextState);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Context.Provider value={{ ...contextState, setContextState }}>
            <NavigationBar
              navArguments={navArguments}
              loggedUserName={"OSA Herrera Juan José"}
            />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tours" element={<Tours />} />
            </Routes>
          </Context.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
