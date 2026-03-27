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
import Request26 from "./pages/Request26";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="request" element={<Home />} />
        <Route path="background" element={<Background />} />
        <Route path="holyrood21/candidates" element={<Candidates2021 />} />
        <Route path="holyrood21/msps" element={<Elected2021 />} />
        <Route path="holyrood21/request" element={<Request />} />
        <Route path="holyrood26/candidates" element={<Candidates2026 />} />
        <Route path="holyrood26/request" element={<Request26 />} />
        <Route path="holyrood26" element={<Candidates2026 />} />
        <Route path="petition" element={<Petition />} />
        <Route path="press" element={<Press />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
