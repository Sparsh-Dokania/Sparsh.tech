// src/App.jsx
import { useState } from "react";
import Preloader from "./components/Preloader";
// import Hero from "./components/Hero";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <>
      {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      {isLoaded && (
        <main className="relative">
          {/* <Hero /> */}
        </main>
      )}
    </>
  );
}

export default App;
