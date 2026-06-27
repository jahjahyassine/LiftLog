import "../style.css"


function Hero() {
    return (
        <section className="h-screen flex flex-col lg:w-[50vw] gap-4 lg:px-25 md:px-10 justify-center lg:items-center lg:text-center text-text-primary/80">
            <h1 className="font-sora font-bold lg:text-6xl md:text-5xl tracking-wide">
                <span className="bg-gradient-to-r from-brand-soft to-text-primary/80 bg-clip-text text-transparent">Track every lift</span><br />
                <span className="bg-gradient-to-r from-brand to-text-primary/80 bg-clip-text text-transparent">Build real strength</span>
            </h1>

            <p className="text-text-muted max-w-[500px]">Log workouts, track progress, and stay consistent with a simple system built for serious training. LiftLog keeps your progress visible and your discipline sharp.</p>

            <div className="flex gap-2">

                <button className="px-4 py-2 bg-surface-2 text-text-secondary border border-stroke backdrop-blur-[5px] rounded-2xl border border-stroke hover:cursor-pointer bg-surface-1 text-text-primary duration-300 hover:scale-[1.05]">View Demo</button>
                <button className="px-5 py-2 bg-brand text-bg-primary rounded-2xl border border-brand-soft/35 hover:cursor-pointer bg-brand-hover text-bg-primary duration-300 hover:scale-[1.05]">
                    Get Started →
                </button>

            </div>

        </section>
    )
}


export default Hero;