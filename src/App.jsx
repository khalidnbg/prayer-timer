import { Container } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import MainContent from "./components/MainContent";
import Header from "./components/Header";
import About from "./components/About";

function App() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100vw",
          margin: "auto",
          height: "100vh",
          marginTop: "20px",
        }}>
        <Container maxWidth="xl">
          <Header />
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </div>
    </>
  );
}

export default App;
