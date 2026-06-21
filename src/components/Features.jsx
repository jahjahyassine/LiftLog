import "../style.css"
import Card from "./Card.jsx"
import featuresArray from "./featuresArray.jsx"

function Features() {


    return (
        <section id="features" className="h-screen flex flex-col items-center justify-center gap-25 text-text-primary font-sora">
            <div className="flex flex-col gap-3 items-center "> 
                <h2 className="md:text-3xl lg:text-4xl font-bold">Everything you need to <span className="bg-gradient-to-r from-white to-brand bg-clip-text text-transparent">Track real progress</span></h2>
                <p className="w-[500px] text-center text-text-muted">Stop guessing your progress. Log, analyze, and improve every workout with structured tracking built for consistency.</p>
            </div>


            <section className="flex w-full items-center justify-center gap-4 flex-wrap lg:w-[60vw] md:w-[100vw]">
                {
                    featuresArray.map((feature, index) => (
                        <Card key={index} title={feature.title} description={feature.description} icon={feature.icon} />
                    ))
                }
            </section>

            <section className="flex flex-col bg-gradient-to-tr from-brand-soft/10 to-transparent text-xl lg:w-[50vw] md:w-[70vw] text-center italic border border-stroke backdrop-blur-md rounded-xl p-4">
                <p>"It is a shame for a man to grow old without seeing the beauty and strength of which his body is capable."</p>
                <p className="self-end text-lg text-text-muted">~ Socrates</p>
            </section>
        </section>
    )
}

export default Features;