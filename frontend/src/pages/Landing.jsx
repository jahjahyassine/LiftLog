import "../style.css"
import Side from '../assets/side.jpg'

import NavBar from "../components/Navbar.jsx"
import Hero from "../components/Hero.jsx"
import Features from "../components/Features.jsx"
import Demo from "../components/Demo.jsx"
import LiquidEther from "../components/LiquidEther.jsx";


function Landing() {

  return (
    <main className="relative min-h-screen bg-bg-primary overflow-x-hidden">

      <div className="fixed right-0 top-0 h-screen w-[50vw] pointer-events-none z-0">
        <img
          src={Side}
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-bg-primary via-bg-primary/60 to-transparent" />

      </div>

      <div className="absolute inset-0 z-0">
        <LiquidEther
          colors={[
            "#00E5FF",
            "#7C4DFF",
            "#4FC3F7"
          ]}
          mouseForce={35}
          cursorSize={120}
          autoDemo={true}
          autoSpeed={1.8}
          autoIntensity={4}
          autoResumeDelay={300}
        />
      </div>

      <section className="relative z-10 flex flex-col w-full">

        <NavBar />
        <Hero />
        <Features />
        <Demo />
      </section>

    </main>
  )

}

export default Landing;