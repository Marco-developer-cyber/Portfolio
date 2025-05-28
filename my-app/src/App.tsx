import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Loader } from "./Components/Loader/Loader";
import Menu from "./Menu";
import "./App.css";

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Loading finished");
      setIsLoading(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Loader isLoading={isLoading} />
        {!isLoading && (
          <>
            <Routes>
              <Route path="/" element={<Menu />} />
            </Routes>
          </>
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;