import React, { useEffect } from 'react'
import { initLenis } from './utils/lenis'
// import Preloader from './components/Preloader'
// import Navbar from './components/Navbar'
// import Hero from './components/Hero'

useEffect(() => {
  initLenis()
}, [])

const App = () => {
  useEffect(() => {
    // Setup ScrollTrigger or Lenis here (optional init zone)
  }, [])

  return (
    <>
      
      <footer className="bg-black text-white">Footer</footer>
    </>
  )
}

export default App

