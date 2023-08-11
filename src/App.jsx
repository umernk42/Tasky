import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import { DeleteContextProvider } from "./context/DeleteContext";
import { EditContextProvider } from "./context/EditContext";

function App() {
  const baseURL = "https://tasky-backend-w5sg.onrender.com";

  //const baseURL = "http://localhost:4000";

  return (
    <>
      <EditContextProvider>
        <DeleteContextProvider>
          <div className="App">
            <BrowserRouter>
              <NavBar />
              <div className="pages">
                <Routes>
                  <Route path="/Tasky/" element={<Home baseURL={baseURL} />} />
                </Routes>
              </div>
            </BrowserRouter>
          </div>
        </DeleteContextProvider>
      </EditContextProvider>
    </>
  );
}

export default App;
