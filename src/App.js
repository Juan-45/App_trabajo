import "./App.css";
import Home from "pages/Home";
import { ThemeProvider } from "@mui/material/styles";
import theme from "theme";

const App = () => {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    </div>
  );
};

export default App;
