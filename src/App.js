import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import theme from "theme/theme";
import Home from "pages/Home";
import NavigationBar from "components/NavigationBar";

const App = () => {
  const navArguments = [
    {
      name: "home",
      path: "/",
      label: "Home",
    },
    {
      name: "test",
      path: "/test",
      label: "Prueba",
    },
  ];

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <NavigationBar navArguments={navArguments} />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="test" element={<h2>Prueba</h2>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
};

export default App;
