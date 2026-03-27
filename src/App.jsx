import { useEffect } from 'react'
import Cursor from './components/Cursor'
import Ticker from './components/Ticker'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StackMarquee from './components/StackMarquee'
import About from './components/About'
import Work from './components/Work'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles.css'

function App() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')

    if (!cursor || !ring) {
      return undefined
    }

    let mx = 0
    let my = 0
    let rx = 0
    let ry = 0
    let rafId = 0

    const onMouseMove = (event) => {
      mx = event.clientX
      my = event.clientY
      cursor.style.left = `${mx}px`
      cursor.style.top = `${my}px`
    }

    document.addEventListener('mousemove', onMouseMove)

    const lerpRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      ring.style.left = `${rx}px`
      ring.style.top = `${ry}px`
      rafId = window.requestAnimationFrame(lerpRing)
    }

    rafId = window.requestAnimationFrame(lerpRing)

    const revealElements = document.querySelectorAll('.reveal')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12 }
    )

    revealElements.forEach((element) => observer.observe(element))

    const nav = document.querySelector('nav')
    const onScroll = () => {
      if (!nav) {
        return
      }

      if (window.scrollY > 60) {
        nav.style.background = 'rgba(8,8,8,0.92)'
        nav.style.backdropFilter = 'blur(12px)'
        nav.style.borderBottom = '1px solid rgba(200,255,0,0.08)'
      } else {
        nav.style.background = 'none'
        nav.style.backdropFilter = 'none'
        nav.style.borderBottom = 'none'
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    const projectItems = document.querySelectorAll('.project-item')
    const onProjectEnter = () => {
      cursor.style.width = '60px'
      cursor.style.height = '60px'
    }
    const onProjectLeave = () => {
      cursor.style.width = '12px'
      cursor.style.height = '12px'
    }

    projectItems.forEach((item) => {
      item.addEventListener('mouseenter', onProjectEnter)
      item.addEventListener('mouseleave', onProjectLeave)
    })

    if (window.matchMedia('(pointer: coarse)').matches) {
      cursor.style.display = 'none'
      ring.style.display = 'none'
      document.body.style.cursor = 'auto'
    }

    return () => {
      document.removeEventListener('mousemove', onMouseMove)
      window.cancelAnimationFrame(rafId)
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      projectItems.forEach((item) => {
        item.removeEventListener('mouseenter', onProjectEnter)
        item.removeEventListener('mouseleave', onProjectLeave)
      })
    }
  }, [])

  return (
    <>
      <Cursor />
      <Ticker />
      <Navbar />
      <Hero />
      <StackMarquee />
      <About />
      <Work />
      <Experience />
      <Contact />
      <Footer />
    </>
  )
}

export default App
