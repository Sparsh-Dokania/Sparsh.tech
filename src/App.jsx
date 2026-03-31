import { useEffect } from 'react'
import gsap from 'gsap'
import Cursor from './components/Cursor'
import Ticker from './components/Ticker'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import StackMarquee from './components/StackMarquee'
import About from './components/About'
import Work from './components/Work'
import HowIBuild from './components/HowIBuild'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './styles.css'
import { Analytics } from "@vercel/analytics/react"

function App() {
  useEffect(() => {
    const cursor = document.getElementById('cursor')
    const ring = document.getElementById('cursor-ring')
    const hasCursor = Boolean(cursor && ring)

    let mx = 0
    let my = 0
    let pmx = 0
    let pmy = 0
    let rx = 0
    let ry = 0
    let rafId = 0
    let speed = 0

    const onMouseMove = (event) => {
      pmx = mx
      pmy = my
      mx = event.clientX
      my = event.clientY

      speed = Math.sqrt((mx - pmx) ** 2 + (my - pmy) ** 2)

      if (hasCursor) {
        cursor.style.left = `${mx}px`
        cursor.style.top = `${my}px`

        // Scale cursor based on movement speed
        const speedScale = Math.min(1 + speed * 0.002, 1.15)
        gsap.to(cursor, {
          width: 12 * speedScale,
          height: 12 * speedScale,
          duration: 0.15,
          overwrite: false,
        })
      }

      // Magnetic pull on preview cards
      const previews = document.querySelectorAll('.project-preview')
      previews.forEach((preview) => {
        const rect = preview.getBoundingClientRect()
        const px = rect.left + rect.width / 2
        const py = rect.top + rect.height / 2
        const dist = Math.sqrt((mx - px) ** 2 + (my - py) ** 2)

        if (dist < 120) {
          const pullStrength = (120 - dist) / 120
          const pull = 8 * pullStrength
          const angle = Math.atan2(my - py, mx - px)
          gsap.to(preview, {
            x: Math.cos(angle) * pull * 0.6,
            y: Math.sin(angle) * pull * 0.6,
            duration: 0.3,
            overwrite: false,
          })
        } else {
          gsap.to(preview, {
            x: 0,
            y: 0,
            duration: 0.4,
            overwrite: false,
          })
        }
      })
    }

    if (hasCursor) {
      document.addEventListener('mousemove', onMouseMove)
    }

    const lerpRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (hasCursor) {
        ring.style.left = `${rx}px`
        ring.style.top = `${ry}px`
      }
      rafId = window.requestAnimationFrame(lerpRing)
    }

    if (hasCursor) {
      rafId = window.requestAnimationFrame(lerpRing)
    }

    document.documentElement.classList.add('reveal-ready')
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
    const hero = document.querySelector('#hero')
    const heroGrid = hero?.querySelector('[style*="backgroundImage"]')

    const onScroll = () => {
      if (!nav) {
        return
      }

      const scrollY = window.scrollY

      if (scrollY > 60) {
        nav.style.background = 'rgba(8,8,8,0.92)'
        nav.style.backdropFilter = 'blur(12px)'
        nav.style.borderBottom = '1px solid rgba(200,255,0,0.08)'
      } else {
        nav.style.background = 'none'
        nav.style.backdropFilter = 'none'
        nav.style.borderBottom = 'none'
      }

      // Hero parallax: subtle scale down as you scroll
      if (hero) {
        const heroScale = Math.max(0.96, 1 - scrollY * 0.0001)
        hero.style.transform = `scale(${heroScale})`
      }

      // Grid parallax: subtle shift
      if (heroGrid) {
        const gridShift = scrollY * 0.02
        heroGrid.style.transform = `translate(${gridShift}px, ${gridShift * 0.5}px)`
      }
    }

    window.addEventListener('scroll', onScroll)
    onScroll()

    const projectItems = document.querySelectorAll('.project-item')
    const onProjectEnter = () => {
      if (hasCursor) {
        gsap.to(cursor, {
          width: 60,
          height: 60,
          duration: 0.25,
          overwrite: true,
        })
      }
    }
    const onProjectLeave = () => {
      if (hasCursor) {
        gsap.to(cursor, {
          width: 12,
          height: 12,
          duration: 0.25,
          overwrite: true,
        })
      }
    }

    if (hasCursor) {
      projectItems.forEach((item) => {
        item.addEventListener('mouseenter', onProjectEnter)
        item.addEventListener('mouseleave', onProjectLeave)
      })

      if (window.matchMedia('(pointer: coarse)').matches) {
        cursor.style.display = 'none'
        ring.style.display = 'none'
        document.body.style.cursor = 'auto'
      }
    }

    return () => {
      document.documentElement.classList.remove('reveal-ready')
      if (hasCursor) {
        document.removeEventListener('mousemove', onMouseMove)
        window.cancelAnimationFrame(rafId)
      }
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
      if (hasCursor) {
        projectItems.forEach((item) => {
          item.removeEventListener('mouseenter', onProjectEnter)
          item.removeEventListener('mouseleave', onProjectLeave)
        })
      }
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
      <HowIBuild />
      <Experience />
      <Contact />
      <Analytics />
      <Footer />
    </>
  )
}

export default App
