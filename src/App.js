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
import Felonies from "pages/Felonies";
import { v4 as uuid } from "uuid";

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
    {
      name: "felonies",
      path: "/felonies",
      label: "Hechos",
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
      /* {
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
        id: "",
      },*/
    ],
    instructors: [
      /*{ label: "No hay datos", adjunct: "default", id: "default" }*/
    ],
    currentInstructor: null, //{ rank: "", instructor: "" },
    secretary: "OSA Herrera Juan José",
    prosecutions: [],
    courts: [
      { label: "Juzg. Gtias. Nro. 1", adjunct: "default", id: uuid() },
      { label: "Juzg. Gtias. Nro. 2", adjunct: "default", id: uuid() },
      { label: "Juzg. Gtias. Nro. 3", adjunct: "default", id: uuid() },
      { label: "Juzg. Gtias. del Menor", adjunct: "default", id: uuid() },
    ],

    involvedTypesOptions: [
      {
        label: "Víctima",
        adjunct: "víctima",
        id: uuid(),
      },
      {
        label: "Denunciante",
        adjunct: "denunciante",
        id: uuid(),
      },
      {
        label: "Causante",
        adjunct: "causante",
        id: uuid(),
      },
      {
        label: "Testigo",
        adjunct: "testigo",
        id: uuid(),
      },
      {
        label: "Imputado|a",
        adjunct: "imputado|a",
        id: uuid(),
      },
    ],
    involvedGenderOptions: [
      {
        label: "Masculino",
        adjunct: "masculino",
        id: uuid(),
      },
      {
        label: "Femenino",
        adjunct: "femenina",
        id: uuid(),
      },
    ],
    involvedCivilStatusOptions: [
      {
        label: "Solero|a",
        adjunct: "solero|a",
        id: uuid(),
      },
      {
        label: "Casado|a",
        adjunct: "casado|a",
        id: uuid(),
      },
      {
        label: "Divorciado|a",
        adjunct: "divorciad|a",
        id: uuid(),
      },
      {
        label: "Viudo|a",
        adjunct: "viudo|a",
        id: uuid(),
      },
    ],
    involvedOccupationOptions: [
      {
        label: "Empleado|a",
        adjunct: "empleado|a",
        id: uuid(),
      },
      {
        label: "Comerciante",
        adjunct: "comerciante",
        id: uuid(),
      },
      {
        label: "Monotributista",
        adjunct: "monotributista",
        id: uuid(),
      },
      {
        label: "Desempleado|a",
        adjunct: "desempleado|a",
        id: uuid(),
      },
      {
        label: "Estudiante",
        adjunct: "estudiante",
        id: uuid(),
      },
      {
        label: "Changarín",
        adjunct: "changarín",
        id: uuid(),
      },
      {
        label: "Ama/o de casa",
        adjunct: "ama/o de casa",
        id: uuid(),
      },
      {
        label: "Jubilado|a",
        adjunct: "jubilado|a",
        id: uuid(),
      },
      {
        label: "Pensionado|a",
        adjunct: "pensionado|a",
        id: uuid(),
      },
    ],
    involvedBinaryOptions: [
      {
        label: "Sí",
        adjunct: "sí",
        id: uuid(),
      },
      {
        label: "No",
        adjunct: "no",
        id: uuid(),
      },
    ],
    involvedVehicleTypeOptions: [
      {
        label: "Auto",
        adjunct: "auto",
        id: uuid(),
      },
      {
        label: "Moto",
        adjunct: "moto",
        id: uuid(),
      },
      {
        label: "Bicicleta",
        adjunct: "bicicleta",
        id: uuid(),
      },
      {
        label: "Camioneta",
        adjunct: "camioneta",
        id: uuid(),
      },
      {
        label: "Camión",
        adjunct: "camión",
        id: uuid(),
      },
      {
        label: "Colectivo",
        adjunct: "colectivo",
        id: uuid(),
      },
    ],
    felonies: [],
  });

  console.log("Context", contextState);

  return (
    <div className='App'>
      <ThemeProvider theme={theme}>
        <BrowserRouter /*basename='/App_trabajo'*/>
          <Context.Provider value={{ ...contextState, setContextState }}>
            <NavigationBar
              navArguments={navArguments}
              loggedUserName={"OSA Herrera Juan José"}
            />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/tours' element={<Tours />} />
              <Route path='/felonies' element={<Felonies />} />
            </Routes>
          </Context.Provider>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
