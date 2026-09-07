import { BrowserRouter } from "react-router-dom";
import AppRoute from "./routes/AppRoute";
import ScrollToTop from "./components/common/ScrollToTop";

const App = () => {
  return (
    <BrowserRouter>
    <ScrollToTop />
      <AppRoute />
    </BrowserRouter>
  );
};

export default App;
