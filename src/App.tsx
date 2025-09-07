import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/Home";
import { Header } from "./Header";
import Background from "./pages/Background";
import Petition from "./pages/Petition";
import Press from "./pages/Press";
import Candidates2021 from "./pages/Candidates2021";
import Elected2021 from "./pages/Elected2021";
import Candidates2026 from "./pages/Candidates2026";
import Request from "./pages/Request";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="request" element={<Home />} />
        <Route path="background" element={<Background />} />
        <Route path="holyrood21">
          <Route path="candidates" element={<Candidates2021 />} />
          <Route path="msps" element={<Elected2021 />} />
          <Route path="request" element={<Request />} />
        </Route>
        <Route path="holyrood26" element={<Candidates2026 />} />
        <Route path="petition" element={<Petition />} />
        <Route path="press" element={<Press />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
