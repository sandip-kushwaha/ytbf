import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";

const App = () => {
  return (
    <BrowserRouter>
      <AppRoute />
    </BrowserRouter>
  );
};

export default App;
