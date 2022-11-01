import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";


function App() {
  return (
    <div  >
      <HashRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={ <Favorite />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
