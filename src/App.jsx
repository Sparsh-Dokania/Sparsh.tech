// src/App.jsx
import { useState } from "react";
import Preloader from "./components/Preloader";
import Navbar from "./components/Navbar";
// import Hero from "./se/Hero";
import Hero from "./components/Hero";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
    <Navbar />
      <Hero />
      {/* {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <main className="relative">
           
        </main>
      )} */}
    </>
  );
}

export default App;
